#!/usr/bin/env node
// two-voice-audio.mjs — project-local wrapper around the shared media-use audio
// engine. The faceless-explainer audio adapter sends every SCRIPT.md line to ONE
// voice; this video has two speakers (HOST / CHECKER, tagged on each `## Line`
// heading). It runs the engine once per speaker (TTS only), once for BGM, merges
// the results into audio_engine_meta.json (the engine's neutral sidecar, so a
// later `audio.mjs fetch-sfx` still merges correctly) and writes audio_meta.json
// in the frame-keyed shape assemble-index.mjs / sync-durations read.
//
//   node .hyperframes/two-voice-audio.mjs [--only tts|bgm|tts,bgm]

import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const ENGINE = "C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/audio.mjs";
const VOICES = JSON.parse(readFileSync(join(ROOT, ".hyperframes/voices.json"), "utf8"));
const only = new Set(
  (process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : "tts,bgm").split(","),
);
const pad2 = (n) => String(n).padStart(2, "0");

// SCRIPT.md → [{ frame, speaker, text }]
function parseScript(md) {
  const out = [];
  let cur = null;
  const flush = () => cur && cur.text.trim() && out.push({ ...cur, text: cur.text.trim() });
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)\s*\[(HOST|CHECKER)\]/i);
    if (h) {
      flush();
      cur = { frame: Number(h[1]), speaker: h[2].toUpperCase(), text: "" };
      continue;
    }
    if (/^#{2,3}\s/.test(line)) {
      flush();
      cur = null;
      continue;
    }
    if (!cur || /^\s*\*\*/.test(line)) continue;
    const m = line.match(/^(?: {4,}|\t)(.+)$/);
    if (m) cur.text += (cur.text ? " " : "") + m[1].trim();
  }
  flush();
  return out;
}

function runEngine(name, request, onlyArg) {
  const dir = join(ROOT, ".hyperframes", `audio-${name}`);
  mkdirSync(dir, { recursive: true });
  const reqPath = join(dir, "request.json");
  const outPath = join(dir, "neutral.json");
  writeFileSync(reqPath, JSON.stringify(request, null, 2));
  const r = spawnSync(
    "node",
    ["--import", pathToFileURL(join(ROOT, ".hyperframes/fetch-rewrite.mjs")).href, ENGINE, "--request", reqPath, "--hyperframes", ROOT, "--out", outPath, "--only", onlyArg],
    { stdio: "inherit" },
  );
  if (r.status !== 0) throw new Error(`engine (${name}) exited ${r.status}`);
  return JSON.parse(readFileSync(outPath, "utf8"));
}

const lines = parseScript(readFileSync(join(ROOT, "SCRIPT.md"), "utf8"));
const storyboard = readFileSync(join(ROOT, "STORYBOARD.md"), "utf8");
const fm = (key) => storyboard.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";

const neutralPath = join(ROOT, "audio_engine_meta.json");
const neutral = existsSync(neutralPath) ? JSON.parse(readFileSync(neutralPath, "utf8")) : {};

if (only.has("tts")) {
  const voices = [];
  for (const [speaker, cfg] of Object.entries(VOICES)) {
    const mine = lines.filter((l) => l.speaker === speaker).map((l) => ({ id: pad2(l.frame), text: l.text }));
    if (!mine.length) continue;
    console.error(`· ${speaker}: ${cfg.name} (${cfg.voice_id}) · speed ${cfg.speed} · ${mine.length} line(s)`);
    const meta = runEngine(
      speaker.toLowerCase(),
      { provider: "heygen", voice: cfg.voice_id, speed: cfg.speed, lang: "en", lines: mine, bgm: { mode: "none" } },
      "tts",
    );
    for (const v of meta.voices ?? []) voices.push({ ...v, speaker });
    if (mine.length !== (meta.voices ?? []).length)
      console.error(`⚠ ${speaker}: ${mine.length} line(s) requested, ${(meta.voices ?? []).length} generated`);
  }
  voices.sort((a, b) => Number(a.id) - Number(b.id));
  neutral.voices = voices;
  neutral.tts_provider = "heygen";
}

if (only.has("bgm")) {
  const meta = runEngine(
    "bgm",
    {
      provider: "heygen",
      lines: [],
      bgm: { mode: "retrieve", query: fm("music") || fm("message"), blob: fm("message"), arc: fm("arc") },
    },
    "bgm",
  );
  for (const [k, v] of Object.entries(meta)) if (k.startsWith("bgm")) neutral[k] = v;
}

writeFileSync(neutralPath, JSON.stringify(neutral, null, 2));

// neutral (id-keyed) → frame-keyed meta (same mapping as faceless-explainer/scripts/audio.mjs)
const prevPl = existsSync(join(ROOT, "audio_meta.json"))
  ? JSON.parse(readFileSync(join(ROOT, "audio_meta.json"), "utf8"))
  : {};
const pl = {
  bgm: neutral.bgm
    ? {
        path: neutral.bgm.path,
        volume: neutral.bgm.volume,
        query: neutral.bgm.query ?? null,
        duration_s: neutral.bgm.duration_s ?? null,
      }
    : null,
  bgm_pending: !!neutral.bgm_pending,
  voices: (neutral.voices ?? []).map((v) => ({
    frame: Number(v.id),
    speaker: v.speaker,
    path: v.path,
    duration_s: v.duration_s,
    words: (v.words ?? []).map((w) => ({ id: w.id, text: w.text, start: w.start, end: w.end })),
  })),
  sfx: prevPl.sfx ?? [],
};
writeFileSync(join(ROOT, "audio_meta.json"), JSON.stringify(pl, null, 2));
console.log(
  `✓ two-voice audio: ${pl.voices.length} voice line(s) (${pl.voices
    .map((v) => `${pad2(v.frame)}:${v.speaker[0]}:${v.duration_s}s`)
    .join(" ")}) · bgm ${pl.bgm ? pl.bgm.path : "none"}`,
);
