#!/usr/bin/env node
// gemini-paced.mjs — generate the SCRIPT.md lines that are still missing from
// audio_meta.json with Gemini TTS, one request at a time, paced for the free
// tier (3 requests/minute) and retrying on 429 after the delay the API names.
// Voice + delivery style per speaker come from .hyperframes/voices.json, plus
// each line's **Delivery:** note. Writes assets/voice/NN.wav and merges the
// line into audio_meta.json + audio_engine_meta.json (words left empty —
// .hyperframes/align.mjs fills them).
//
//   node .hyperframes/gemini-paced.mjs [--frames 1,5,7] [--gap 21] [--model gemini-3.8-flash-lite-tts]

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnvFromDir } from "file:///C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/lib/heygen.mjs";
import { synthesizeGemini } from "file:///C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/lib/gemini-tts.mjs";

const ROOT = resolve(import.meta.dirname, "..");
loadEnvFromDir(ROOT);
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const GAP_S = Number(arg("gap", "21"));
const MODEL = arg("model", undefined); // default: the engine's gemini-3.8-flash-tts
const only = arg("frames", null)?.split(",").map(Number);
const VOICES = JSON.parse(readFileSync(join(ROOT, ".hyperframes/voices.json"), "utf8"));
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const pad2 = (n) => String(n).padStart(2, "0");

const lines = [];
{
  let cur = null;
  for (const line of readFileSync(join(ROOT, "SCRIPT.md"), "utf8").split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)\s*\[(HOST|CHECKER)\]/i);
    if (h) {
      cur = { frame: Number(h[1]), speaker: h[2].toUpperCase(), text: "", delivery: "" };
      lines.push(cur);
      continue;
    }
    if (/^#{2,3}\s/.test(line)) cur = null;
    if (!cur) continue;
    const d = line.match(/^\s*\*\*Delivery:\*\*\s*(.+)$/);
    if (d) cur.delivery = d[1].trim();
    const m = line.match(/^(?: {4,}|\t)(.+)$/);
    if (m) cur.text += (cur.text ? " " : "") + m[1].trim();
  }
}

const metaPath = join(ROOT, "audio_meta.json");
const neutralPath = join(ROOT, "audio_engine_meta.json");
const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, "utf8")) : { bgm: null, voices: [], sfx: [] };
const neutral = existsSync(neutralPath) ? JSON.parse(readFileSync(neutralPath, "utf8")) : {};
neutral.voices ??= [];
const have = new Set(meta.voices.map((v) => v.frame));
const todo = lines.filter((l) => (only ? only.includes(l.frame) : !have.has(l.frame)));
console.log(`· ${todo.length} line(s) to generate: ${todo.map((l) => pad2(l.frame)).join(" ")}`);

const probe = (abs) =>
  Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", abs], { encoding: "utf8" }).stdout.trim());

for (let i = 0; i < todo.length; i++) {
  const l = todo[i];
  const cfg = VOICES[l.speaker];
  const rel = `assets/voice/${pad2(l.frame)}.wav`;
  const style = [cfg.style, l.delivery && `This line: ${l.delivery}`].filter(Boolean).join(" ");
  for (let attempt = 1; attempt <= 6; attempt++) {
    const r = await synthesizeGemini({ text: l.text, voiceId: cfg.voice_id, style, wavAbs: join(ROOT, rel), ...(MODEL ? { model: MODEL } : {}) });
    if (r.ok) {
      const dur = Math.round(probe(join(ROOT, rel)) * 1000) / 1000;
      meta.voices = meta.voices.filter((v) => v.frame !== l.frame);
      meta.voices.push({ frame: l.frame, speaker: l.speaker, path: rel, duration_s: dur, words: [], model: MODEL ?? "gemini-3.8-flash-tts" });
      meta.voices.sort((a, b) => a.frame - b.frame);
      neutral.voices = neutral.voices.filter((v) => Number(v.id) !== l.frame);
      neutral.voices.push({ id: pad2(l.frame), speaker: l.speaker, path: rel, duration_s: dur, words: [] });
      neutral.voices.sort((a, b) => Number(a.id) - Number(b.id));
      writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      writeFileSync(neutralPath, JSON.stringify(neutral, null, 2));
      console.log(`  ✓ ${pad2(l.frame)} ${l.speaker} ${dur}s`);
      break;
    }
    if (/per day/i.test(r.error || "")) {
      console.log(`  ✗ ${pad2(l.frame)}: daily quota reached for this model — stopping`);
      process.exit(2);
    }
    const wait = Number(r.error?.match(/retry in (\d+(?:\.\d+)?)s/)?.[1] ?? GAP_S) + 2;
    console.log(`  · ${pad2(l.frame)} attempt ${attempt} failed (${(r.error || "").slice(0, 90)}) — waiting ${wait}s`);
    if (!/429|too_many_requests|Rate limit/i.test(r.error || "")) {
      if (attempt >= 2) break;
    }
    await sleep(wait);
  }
  if (i < todo.length - 1) await sleep(GAP_S);
}
console.log(`✓ voices now: ${meta.voices.map((v) => pad2(v.frame)).join(" ")}`);
