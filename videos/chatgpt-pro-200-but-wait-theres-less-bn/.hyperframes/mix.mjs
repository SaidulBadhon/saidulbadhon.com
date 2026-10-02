#!/usr/bin/env node
// mix.mjs — project-local audio mix for the two-register video.
//
//   node .hyperframes/mix.mjs cues   (before assemble-index) — rewrites
//       audio_meta.json: sfx from .hyperframes/sfx-cues.json (word-timed
//       offsets, trimmed durations, per-cue volume) and the bed's base level.
//   node .hyperframes/mix.mjs bed    (after transitions inject) — writes the
//       music bed's data-fx-chain (one low-pass) and data-automation (volume +
//       cutoff lanes) into index.html from the mounted frames' real start times:
//       full bed under HOST frames, a dead stop on the freeze, a muffled
//       low-pass bed under CHECKER frames (the tape is paused), and an open
//       bed + fade-out on the end card.

import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const mode = process.argv[2];

const HOST = new Set([1, 4, 6, 9, 12, 14, 18]);
const FREEZE = 2;
const END = 19;
const LEVEL = { host: 0.16, checker: 0.035, end: 0.22 };
const CUTOFF = { open: 18000, muffled: 650 };

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
  if (meta.bgm) meta.bgm.volume = 1; // the bed's level lives in its automation lane
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`✓ mix cues: ${meta.sfx.length} word-timed SFX cue(s); bed base volume → 1 (lane-driven)`);
} else if (mode === "bed") {
  const indexPath = join(ROOT, "index.html");
  let html = readFileSync(indexPath, "utf8");

  // Frame hosts: elements whose data-composition-src points at compositions/frames/NN-*.html
  const frames = [];
  const tagRe = /<[a-z][^<>]*data-composition-src="compositions\/frames\/(\d\d)-[^"]*"[^<>]*>/gi;
  for (const m of html.matchAll(tagRe)) {
    const start = Number(m[0].match(/data-start="([\d.]+)"/)?.[1]);
    const dur = Number(m[0].match(/data-duration="([\d.]+)"/)?.[1]);
    frames.push({ n: Number(m[1]), start, dur });
  }
  frames.sort((a, b) => a.start - b.start);
  if (!frames.length) throw new Error("no frame hosts found in index.html");

  const bedTag = html.match(/<audio[^<>]*id="el-bgm"[^<>]*>/);
  if (!bedTag) throw new Error("no #el-bgm in index.html");
  const bedStart = Number(bedTag[0].match(/data-start="([\d.]+)"/)?.[1] ?? 0);
  const bedDur = Number(bedTag[0].match(/data-duration="([\d.]+)"/)?.[1]);

  const vol = [];
  const cut = [];
  const at = (t) => Math.max(0, Math.round((t - bedStart) * 1000) / 1000);
  const push = (lane, t, v) => {
    t = Math.round(t * 1000) / 1000;
    const prev = lane.at(-1);
    if (prev && Math.abs(prev.t - t) < 1e-6) prev.v = v;
    else if (prev && t < prev.t) lane.push({ t: prev.t, v });
    else lane.push({ t, v });
  };
  for (const f of frames) {
    const t = at(f.start);
    if (HOST.has(f.n)) {
      push(vol, t, vol.length ? vol.at(-1).v : LEVEL.host);
      push(vol, t + 0.12, LEVEL.host);
      push(cut, t, cut.length ? cut.at(-1).v : CUTOFF.open);
      push(cut, t + 0.12, CUTOFF.open);
    } else if (f.n === FREEZE) {
      push(vol, t, LEVEL.host);
      push(vol, t + 0.1, 0);
      push(cut, t, CUTOFF.open);
    } else if (f.n === END) {
      push(vol, t, vol.at(-1)?.v ?? LEVEL.checker);
      push(vol, t + 0.4, LEVEL.end);
      push(vol, at(f.start + f.dur), 0);
      push(cut, t, cut.at(-1)?.v ?? CUTOFF.muffled);
      push(cut, t + 0.4, CUTOFF.open);
    } else {
      // CHECKER: muffled, quiet bed (fade in from the freeze's silence, or step down from HOST)
      const wasSilent = (vol.at(-1)?.v ?? 0) === 0;
      push(vol, t, vol.at(-1)?.v ?? 0);
      push(vol, t + (wasSilent ? 0.6 : 0.15), LEVEL.checker);
      push(cut, t, wasSilent ? CUTOFF.muffled : (cut.at(-1)?.v ?? CUTOFF.open));
      push(cut, t + 0.15, CUTOFF.muffled);
    }
  }
  if (Number.isFinite(bedDur)) push(vol, bedDur, vol.at(-1).v);

  const chain = { version: 1, nodes: [{ type: "lowpass", id: "n1", label: "Paused-tape muffle", params: { frequency: CUTOFF.open, q: 0.707, poles: "2" } }] };
  const automation = { version: 1, lanes: [{ target: "volume", points: vol }, { target: "fx.n1.frequency", points: cut }] };
  const enc = (o) => JSON.stringify(o).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  let tag = bedTag[0]
    .replace(/\s+data-fx-chain="[^"]*"/, "")
    .replace(/\s+data-automation="[^"]*"/, "")
    .replace(/data-volume="[\d.]+"/, 'data-volume="1"');
  tag = tag.replace(/\s*\/?>$/, (end) => ` data-fx-chain="${enc(chain)}" data-automation="${enc(automation)}"${end.trim() === "/>" ? " />" : ">"}`);
  html = html.replace(bedTag[0], tag);
  writeFileSync(indexPath, html);
  console.log(`✓ mix bed: ${frames.length} frames → volume lane ${vol.length} pts, cutoff lane ${cut.length} pts`);
} else {
  console.error("usage: node .hyperframes/mix.mjs cues|bed");
  process.exit(1);
}
