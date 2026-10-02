#!/usr/bin/env node
// tighten.mjs — cap the pauses inside each voice line. Gemini's deadpan read
// leaves 0.7–1.0s gaps between sentences; this keeps a beat but drops the dead
// air. Originals are kept in assets/voice/raw/ (re-running starts from them).
// Every cut lands inside a detected silence, so there are no clicks.
// Updates duration_s in audio_meta.json + audio_engine_meta.json.
//
//   node .hyperframes/tighten.mjs [--cap 0.45] [--lead 0.08] [--tail 0.2]

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? Number(process.argv[i + 1]) : def;
};
const CAP = arg("cap", 0.45);
const LEAD = arg("lead", 0.08);
const TAIL = arg("tail", 0.2);
const r3 = (x) => Math.round(x * 1000) / 1000;

function silences(abs) {
  const out = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", abs, "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const dur = Number(out.match(/Duration: (\d+):(\d+):([\d.]+)/).slice(1).reduce((a, v, i) => a + Number(v) * [3600, 60, 1][i], 0));
  const sil = [];
  let s = null;
  for (const line of out.split(/\r?\n/)) {
    const a = line.match(/silence_start: ([\d.]+)/);
    const b = line.match(/silence_end: ([\d.]+)/);
    if (a) s = Number(a[1]);
    if (b) {
      sil.push({ s: s ?? 0, e: Number(b[1]) });
      s = null;
    }
  }
  if (s != null) sil.push({ s, e: dur });
  return { dur, sil };
}

const metaPath = join(ROOT, "audio_meta.json");
const neutralPath = join(ROOT, "audio_engine_meta.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const neutral = JSON.parse(readFileSync(neutralPath, "utf8"));
mkdirSync(join(ROOT, "assets/voice/raw"), { recursive: true });

for (const v of meta.voices) {
  const abs = join(ROOT, v.path);
  const raw = join(ROOT, "assets/voice/raw", basename(v.path));
  if (!existsSync(raw)) copyFileSync(abs, raw);
  const { dur, sil } = silences(raw);
  let speechStart = 0;
  let speechEnd = dur;
  const inner = [];
  for (const p of sil) {
    if (p.s <= 0.02) speechStart = p.e;
    else if (p.e >= dur - 0.02) speechEnd = p.s;
    else inner.push(p);
  }
  const keep = [];
  let cur = Math.max(0, speechStart - LEAD);
  for (const p of inner) {
    if (p.e - p.s <= CAP) continue;
    keep.push([cur, p.s + CAP / 2]);
    cur = p.e - CAP / 2;
  }
  keep.push([cur, Math.min(dur, speechEnd + TAIL)]);
  const parts = keep.map(([a, b], i) => `[0:a]atrim=start=${a.toFixed(4)}:end=${b.toFixed(4)},asetpts=PTS-STARTPTS[a${i}]`);
  const filter = `${parts.join(";")};${keep.map((_, i) => `[a${i}]`).join("")}concat=n=${keep.length}:v=0:a=1[out]`;
  const r = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-filter_complex", filter, "-map", "[out]", abs], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(`✗ ${v.path}: ${r.stderr}`);
    continue;
  }
  const newDur = r3(Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", abs], { encoding: "utf8" }).stdout.trim()));
  console.log(`  ${v.path}: ${r3(dur)}s → ${newDur}s (${keep.length - 1} long pause(s) capped at ${CAP}s)`);
  v.duration_s = newDur;
  const nv = (neutral.voices ?? []).find((x) => Number(x.id) === v.frame);
  if (nv) nv.duration_s = newDur;
}
writeFileSync(metaPath, JSON.stringify(meta, null, 2));
writeFileSync(neutralPath, JSON.stringify(neutral, null, 2));
const total = meta.voices.reduce((a, v) => a + v.duration_s, 0);
console.log(`✓ tighten: ${meta.voices.length} line(s), total voice ${r3(total)}s`);
