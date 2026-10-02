#!/usr/bin/env node
// align.mjs — word timings for TTS lines that came back without them (Gemini;
// no local transcriber on this machine). For each voice line in
// audio_meta.json: find the speech span and its internal pauses with ffmpeg
// silencedetect, match pauses to the script's phrase breaks (punctuation) in
// order by expected position, then spread each phrase's words across its
// speech segment by character weight. Writes words[] back into audio_meta.json
// and audio_engine_meta.json, and prints a word@time table per frame.
//
//   node .hyperframes/align.mjs [--noise -38dB] [--min-pause 0.12]

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const NOISE = arg("noise", "-38dB");
const MIN_PAUSE = Number(arg("min-pause", "0.12"));
const r3 = (x) => Math.round(x * 1000) / 1000;

// SCRIPT.md → Map(frame → spoken text)
const script = new Map();
{
  let cur = null;
  for (const line of readFileSync(join(ROOT, "SCRIPT.md"), "utf8").split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)/i);
    if (h) {
      cur = Number(h[1]);
      script.set(cur, "");
      continue;
    }
    if (/^#{2,3}\s/.test(line)) cur = null;
    const m = cur != null && line.match(/^(?: {4,}|\t)(.+)$/);
    if (m) script.set(cur, (script.get(cur) ? script.get(cur) + " " : "") + m[1].trim());
  }
}

function silences(wavAbs) {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", wavAbs, "-af", `silencedetect=noise=${NOISE}:d=${MIN_PAUSE}`, "-f", "null", "-"], { encoding: "utf8" });
  const out = r.stderr || "";
  const dur = Number(out.match(/Duration: (\d+):(\d+):([\d.]+)/)?.slice(1).reduce((a, v, i) => a + Number(v) * [3600, 60, 1][i], 0));
  const sil = [];
  let start = null;
  for (const line of out.split(/\r?\n/)) {
    const s = line.match(/silence_start: ([\d.]+)/);
    const e = line.match(/silence_end: ([\d.]+)/);
    if (s) start = Number(s[1]);
    if (e) {
      sil.push({ s: start ?? 0, e: Number(e[1]) });
      start = null;
    }
  }
  if (start != null) sil.push({ s: start, e: dur });
  return { dur, sil };
}

// Weight of a word ~ how long it takes to say: letters/marks, not spaces or punctuation.
const weight = (w) => Math.max(1, w.replace(/[\s.,!?…:;—–\-"“”'‘’()।]/g, "").length);

function align(text, wavAbs) {
  const { dur, sil } = silences(wavAbs);
  let speechStart = 0;
  let speechEnd = dur;
  const inner = [];
  for (const p of sil) {
    if (p.s <= 0.02) speechStart = p.e;
    else if (p.e >= dur - 0.02) speechEnd = p.s;
    else inner.push(p);
  }
  const words = text.split(/\s+/).filter(Boolean);
  const wts = words.map(weight);
  const total = wts.reduce((a, b) => a + b, 0);
  const cum = [0];
  for (const w of wts) cum.push(cum.at(-1) + w); // cum[i] = weight of words[0..i-1]
  // phrase breaks: a pause may follow word i; strong = sentence end
  const breaks = [];
  words.forEach((w, i) => {
    if (i === words.length - 1) return;
    const strong = /[।?!…]["”’]?$/.test(w);
    const weak = /[,:;]["”’]?$/.test(w) || /[—–]$/.test(w) || /^[—–]$/.test(words[i + 1]) || /^…/.test(words[i + 1]);
    if (strong || weak) breaks.push({ w: i, strong });
  });
  const pauseLen = (p) => p.e - p.s;
  const speechBetween = (t0, t1, fromPi, toPi) => {
    let t = t1 - t0;
    for (let q = fromPi + 1; q < toPi; q++) t -= pauseLen(inner[q]);
    return t;
  };
  const totalSpeech = speechBetween(speechStart, speechEnd, -1, inner.length);
  const rate = total / totalSpeech;
  // DP over matched (pause, break) pairs, plus virtual start/end nodes
  const nodes = [{ pi: -1, bi: -1, w: -1, tIn: speechStart, tOut: speechStart }];
  inner.forEach((p, pi) => breaks.forEach((b, bi) => nodes.push({ pi, bi, w: b.w, tIn: p.s, tOut: p.e })));
  nodes.push({ pi: inner.length, bi: breaks.length, w: words.length - 1, tIn: speechEnd, tOut: speechEnd });
  const segCost = (a, b) => {
    if (b.pi <= a.pi || b.bi <= a.bi) return Infinity;
    const wSeg = cum[b.w + 1] - cum[a.w + 1];
    if (wSeg <= 0) return Infinity;
    const sp = speechBetween(a.tOut, b.tIn, a.pi, b.pi);
    if (sp <= 0.08) return Infinity;
    let c = (wSeg / total) * 20 * Math.log(wSeg / sp / rate) ** 2;
    for (let q = a.pi + 1; q < b.pi; q++) c += 3 * Math.max(0, pauseLen(inner[q]) - 0.2); // skipped long pause
    for (let q = a.bi + 1; q < b.bi; q++) if (breaks[q].strong) c += 0.4; // skipped sentence end
    return c;
  };
  const best = nodes.map(() => ({ cost: Infinity, prev: -1 }));
  best[0].cost = 0;
  const order = nodes.map((_, i) => i).sort((x, y) => nodes[x].pi - nodes[y].pi || nodes[x].bi - nodes[y].bi);
  for (const j of order) {
    if (j === 0) continue;
    for (const i of order) {
      if (!Number.isFinite(best[i].cost)) continue;
      const c = best[i].cost + segCost(nodes[i], nodes[j]);
      if (c < best[j].cost) best[j] = { cost: c, prev: i };
    }
  }
  const path = [];
  for (let j = nodes.length - 1; j !== -1; j = best[j].prev) path.unshift(nodes[j]);
  // spread each segment's words over its speech time, skipping unmatched pauses
  const out = [];
  for (let s = 0; s + 1 < path.length; s++) {
    const a = path[s];
    const b = path[s + 1];
    const gaps = inner.slice(a.pi + 1, b.pi);
    const sp = speechBetween(a.tOut, b.tIn, a.pi, b.pi);
    const wSeg = cum[b.w + 1] - cum[a.w + 1];
    const timeAt = (frac) => {
      // speech-time offset → clock time, stepping over the unmatched pauses
      let t = a.tOut + frac * sp;
      for (const g of gaps) if (t >= g.s) t += pauseLen(g);
      return t;
    };
    for (let i = a.w + 1; i <= b.w; i++) {
      const f0 = (cum[i] - cum[a.w + 1]) / wSeg;
      const f1 = (cum[i + 1] - cum[a.w + 1]) / wSeg;
      out.push({ id: `w${i}`, text: words[i], start: r3(timeAt(f0)), end: r3(Math.min(timeAt(f1), b.tIn)) });
    }
  }
  return { words: out, matched: path.length - 2, pauses: inner.length, breaks: breaks.length, dur: r3(dur) };
}

const metaPath = join(ROOT, "audio_meta.json");
const neutralPath = join(ROOT, "audio_engine_meta.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const neutral = JSON.parse(readFileSync(neutralPath, "utf8"));
for (const v of meta.voices) {
  const text = script.get(v.frame);
  if (!text) continue;
  const res = align(text, join(ROOT, v.path));
  v.words = res.words;
  const nv = (neutral.voices ?? []).find((x) => Number(x.id) === v.frame);
  if (nv) nv.words = res.words;
  console.log(
    `F${String(v.frame).padStart(2, "0")} ${v.speaker} ${v.duration_s}s · pauses ${res.pauses}, breaks ${res.breaks}, matched ${res.matched}: ` +
      res.words.map((w) => `${w.text}@${w.start.toFixed(2)}`).join(" "),
  );
}
writeFileSync(metaPath, JSON.stringify(meta, null, 2));
writeFileSync(neutralPath, JSON.stringify(neutral, null, 2));
