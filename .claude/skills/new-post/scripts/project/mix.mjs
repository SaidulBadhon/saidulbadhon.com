#!/usr/bin/env node
// mix.mjs — the series audio mix.
//
//   node .hyperframes/mix.mjs cues   (before assemble-index) — rewrites
//       audio_meta.json: sfx from .hyperframes/sfx-cues.json (word-timed
//       offsets, trimmed durations, per-cue volume) and sets the bed's base
//       volume to 1 (its level lives in the automation lane).
//   node .hyperframes/mix.mjs bed    (after transitions inject) — writes the
//       music bed's data-fx-chain (one low-pass) and data-automation (volume +
//       cutoff lanes) into index.html from the mounted frames' real start times.
//
// Each frame's role comes from its `- speaker:` line in STORYBOARD.md:
//   HOST    → full bed under the voice (the infomercial is "playing")
//   CHECKER → quiet, low-passed bed (the tape is paused)
//   none    → the LAST frame is the end card (bed opens up, then fades out);
//             any other silent frame is a freeze (dead stop on the scratch).
//
// sfx-cues.json: { "cues": [{ "frame": 1, "name": "record-scratch", "at": 0.0, "dur": 1.4, "vol": 0.6 }, …] }
// `name` is a file in assets/sfx/ without ".mp3"; `at` is seconds from the frame's start.

import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const mode = process.argv[2];
const LEVEL = { host: 0.16, checker: 0.035, end: 0.22 };
const CUTOFF = { open: 18000, muffled: 650 };

function frameRoles() {
  const roles = new Map();
  let cur = null;
  for (const line of readFileSync(join(ROOT, "STORYBOARD.md"), "utf8").split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+Frame\s+(\d+)/i);
    if (h) {
      cur = Number(h[1]);
      roles.set(cur, "NONE");
      continue;
    }
    const s = cur != null && line.match(/^-\s+speaker:\s*([A-Za-z]+)/i);
    if (s) roles.set(cur, s[1].toUpperCase());
  }
  return roles;
}

if (mode === "cues") {
  const metaPath = join(ROOT, "audio_meta.json");
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  const { cues } = JSON.parse(readFileSync(join(ROOT, ".hyperframes/sfx-cues.json"), "utf8"));
  meta.sfx = cues.map((c) => ({
    frame: c.frame,
    file: `assets/sfx/${c.name}.mp3`,
    offset_s: c.at,
    duration_s: c.dur,
    volume: c.vol,
  }));
  if (meta.bgm) meta.bgm.volume = 1;
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`✓ mix cues: ${meta.sfx.length} word-timed SFX cue(s); bed base volume → 1 (lane-driven)`);
} else if (mode === "bed") {
  const indexPath = join(ROOT, "index.html");
  let html = readFileSync(indexPath, "utf8");
  const roles = frameRoles();

  const frames = [];
  const tagRe = /<[a-z][^<>]*data-composition-src="compositions\/frames\/(\d\d)-[^"]*"[^<>]*>/gi;
  for (const m of html.matchAll(tagRe)) {
    const start = Number(m[0].match(/data-start="([\d.]+)"/)?.[1]);
    const dur = Number(m[0].match(/data-duration="([\d.]+)"/)?.[1]);
    frames.push({ n: Number(m[1]), start, dur });
  }
  frames.sort((a, b) => a.start - b.start);
  if (!frames.length) throw new Error("no frame hosts found in index.html");
  const lastN = frames.at(-1).n;
  const roleOf = (n) => {
    const r = roles.get(n) ?? "NONE";
    if (r === "HOST" || r === "CHECKER") return r;
    return n === lastN ? "END" : "FREEZE";
  };

  const bedTag = html.match(/<audio[^<>]*id="el-bgm"[^<>]*>/);
  if (!bedTag) throw new Error("no #el-bgm in index.html");
  const bedStart = Number(bedTag[0].match(/data-start="([\d.]+)"/)?.[1] ?? 0);
  const bedDur = Number(bedTag[0].match(/data-duration="([\d.]+)"/)?.[1]);

  const vol = [];
  const cut = [];
  const at = (t) => Math.max(0, t - bedStart);
  const push = (lane, t, v) => {
    t = Math.round(t * 1000) / 1000;
    const prev = lane.at(-1);
    if (prev && Math.abs(prev.t - t) < 1e-6) prev.v = v;
    else if (prev && t < prev.t) lane.push({ t: prev.t, v });
    else lane.push({ t, v });
  };
  for (const f of frames) {
    const t = at(f.start);
    const role = roleOf(f.n);
    if (role === "HOST") {
      push(vol, t, vol.length ? vol.at(-1).v : LEVEL.host);
      push(vol, t + 0.12, LEVEL.host);
      push(cut, t, cut.length ? cut.at(-1).v : CUTOFF.open);
      push(cut, t + 0.12, CUTOFF.open);
    } else if (role === "FREEZE") {
      push(vol, t, vol.at(-1)?.v ?? LEVEL.host);
      push(vol, t + 0.1, 0);
      push(cut, t, cut.at(-1)?.v ?? CUTOFF.open);
    } else if (role === "END") {
      push(vol, t, vol.at(-1)?.v ?? LEVEL.checker);
      push(vol, t + 0.4, LEVEL.end);
      push(vol, at(f.start + f.dur), 0);
      push(cut, t, cut.at(-1)?.v ?? CUTOFF.muffled);
      push(cut, t + 0.4, CUTOFF.open);
    } else {
      const wasSilent = (vol.at(-1)?.v ?? 0) === 0;
      push(vol, t, vol.at(-1)?.v ?? 0);
      push(vol, t + (wasSilent ? 0.6 : 0.15), LEVEL.checker);
      push(cut, t, wasSilent ? CUTOFF.muffled : (cut.at(-1)?.v ?? CUTOFF.open));
      push(cut, t + 0.15, CUTOFF.muffled);
    }
  }
  if (Number.isFinite(bedDur)) push(vol, bedDur, vol.at(-1).v);

  const chain = {
    version: 1,
    nodes: [{ type: "lowpass", id: "n1", label: "Paused-tape muffle", params: { frequency: CUTOFF.open, q: 0.707, poles: "2" } }],
  };
  const automation = {
    version: 1,
    lanes: [
      { target: "volume", points: vol },
      { target: "fx.n1.frequency", points: cut },
    ],
  };
  const enc = (o) => JSON.stringify(o).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  let tag = bedTag[0]
    .replace(/\s+data-fx-chain="[^"]*"/, "")
    .replace(/\s+data-automation="[^"]*"/, "")
    .replace(/data-volume="[\d.]+"/, 'data-volume="1"');
  tag = tag.replace(/\s*\/?>$/, (end) => ` data-fx-chain="${enc(chain)}" data-automation="${enc(automation)}"${end.trim() === "/>" ? " />" : ">"}`);
  html = html.replace(bedTag[0], tag);
  writeFileSync(indexPath, html);
  const counts = {};
  for (const f of frames) counts[roleOf(f.n)] = (counts[roleOf(f.n)] ?? 0) + 1;
  console.log(`✓ mix bed: ${frames.length} frames (${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", ")}) → volume ${vol.length} pts, cutoff ${cut.length} pts`);
} else {
  console.error("usage: node .hyperframes/mix.mjs cues|bed");
  process.exit(1);
}
