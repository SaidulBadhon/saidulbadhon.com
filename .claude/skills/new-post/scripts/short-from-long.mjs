#!/usr/bin/env node
// short-from-long.mjs — seed a vertical Short project from the long-form one.
//
// The Short reuses the long-form's voice lines (no new TTS requests): pick the
// frames whose lines stand on their own (hook, freeze, thesis, one proof beat,
// verdict). Their wavs + aligned word timings are copied and renumbered 01..N;
// silent frames (the freeze) are carried as silent frames. Writes the Short's
// audio_meta.json / audio_engine_meta.json voices, SCRIPT.md (the reused lines)
// and .hyperframes/short-map.json (short frame → long frame, for the porters).
// The Short project must already exist (new-video-project.mjs --format 1080x1920).
//
//   node .claude/skills/new-post/scripts/short-from-long.mjs --long videos/<slug> --short videos/<slug>-short --frames 1,2,3,9,17

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const LONG = resolve(arg("long", ""));
const SHORT = resolve(arg("short", ""));
const pick = (arg("frames", "") || "").split(",").map(Number).filter(Boolean);
if (!pick.length) {
  console.error("usage: short-from-long.mjs --long <dir> --short <dir> --frames 1,2,3,9,17");
  process.exit(1);
}
const pad2 = (n) => String(n).padStart(2, "0");

const longMeta = JSON.parse(readFileSync(join(LONG, "audio_meta.json"), "utf8"));
const script = readFileSync(join(LONG, "SCRIPT.md"), "utf8");
const lineFor = (n) => {
  const m = script.match(new RegExp(`(^#{2,3}\\s+.*?\\(Frame ${n}\\)[^\\n]*\\n[\\s\\S]*?)(?=^#{2,3}\\s|$(?![\\s\\S]))`, "im"));
  return m ? m[1].trim() : null;
};

const shortMeta = JSON.parse(readFileSync(join(SHORT, "audio_meta.json"), "utf8"));
const shortNeutral = JSON.parse(readFileSync(join(SHORT, "audio_engine_meta.json"), "utf8"));
shortMeta.voices = [];
shortNeutral.voices = [];
mkdirSync(join(SHORT, "assets", "voice"), { recursive: true });
const map = [];
const scriptOut = ["# SCRIPT — Short (lines reused from the long-form)", ""];
pick.forEach((longN, i) => {
  const n = i + 1;
  const v = longMeta.voices.find((x) => x.frame === longN);
  map.push({ short: n, long: longN, speaker: v?.speaker ?? "none", duration_s: v?.duration_s ?? null });
  if (!v) return; // silent frame (freeze): no voice
  const rel = `assets/voice/${pad2(n)}.wav`;
  copyFileSync(join(LONG, v.path), join(SHORT, rel));
  shortMeta.voices.push({ ...v, frame: n, path: rel });
  shortNeutral.voices.push({ id: pad2(n), speaker: v.speaker, path: rel, duration_s: v.duration_s, words: v.words, model: v.model });
  const block = lineFor(longN);
  if (block) scriptOut.push(block.replace(/\(Frame \d+\)/i, `(Frame ${n})`), "");
});
writeFileSync(join(SHORT, "audio_meta.json"), JSON.stringify(shortMeta, null, 2));
writeFileSync(join(SHORT, "audio_engine_meta.json"), JSON.stringify(shortNeutral, null, 2));
writeFileSync(join(SHORT, "SCRIPT.md"), scriptOut.join("\n"));
mkdirSync(join(SHORT, ".hyperframes"), { recursive: true });
writeFileSync(join(SHORT, ".hyperframes", "short-map.json"), JSON.stringify(map, null, 2));
const total = map.reduce((a, m) => a + (m.duration_s ?? 1.4), 0);
console.log(map.map((m) => `  short ${pad2(m.short)} ← long ${pad2(m.long)} (${m.speaker}, ${m.duration_s != null ? m.duration_s + "s" : "silent"})`).join("\n"));
console.log(`✓ Short seeded: ${map.length} frames, ~${total.toFixed(1)}s of voice${total > 60 ? " — over 60s, drop a beat" : ""}`);
