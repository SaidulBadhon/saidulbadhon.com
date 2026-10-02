#!/usr/bin/env node
// gemini-paced.mjs — generate the SCRIPT.md lines still missing from
// audio_meta.json with Gemini TTS, one request at a time.
//
// Gemini's free tier allows 3 requests/minute and 10 requests/day *per model*.
// Requests are paced (--gap seconds apart), a per-minute 429 is retried after
// the delay the API names, and a per-day 429 moves on to the next model in
// MODELS (same prebuilt voices, separate quota). Voice + delivery style per
// speaker come from .hyperframes/voices.json, plus each line's **Delivery:**
// note. Writes assets/voice/NN.wav and merges the line into audio_meta.json +
// audio_engine_meta.json (words left empty — .hyperframes/align.mjs fills them).
// The model that voiced each line is recorded on it (`model`).
//
//   node .hyperframes/gemini-paced.mjs [--frames 1,5,7] [--gap 21] [--model <first model to try>]

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const MEDIA_AUDIO_LIB = join(
  process.env.HF_MEDIA_DIR || join(homedir(), ".agents", "skills", "media-use"),
  "audio",
  "scripts",
  "lib",
);
const { loadEnvFromDir } = await import(pathToFileURL(join(MEDIA_AUDIO_LIB, "heygen.mjs")).href);
const { synthesizeGemini } = await import(pathToFileURL(join(MEDIA_AUDIO_LIB, "gemini-tts.mjs")).href);

const ROOT = resolve(import.meta.dirname, "..");
loadEnvFromDir(ROOT);
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const GAP_S = Number(arg("gap", "21"));
const MODELS = ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts", "gemini-2.5-flash-preview-tts"];
let modelIdx = Math.max(0, MODELS.indexOf(arg("model", MODELS[0])));
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
meta.voices ??= [];
neutral.voices ??= [];
const have = new Set(meta.voices.map((v) => v.frame));
const todo = lines.filter((l) => (only ? only.includes(l.frame) : !have.has(l.frame)));
console.log(`· ${todo.length} line(s) to generate: ${todo.map((l) => pad2(l.frame)).join(" ")}`);

const probe = (abs) =>
  Number(
    spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", abs], {
      encoding: "utf8",
    }).stdout.trim(),
  );

for (let i = 0; i < todo.length; i++) {
  const l = todo[i];
  const cfg = VOICES[l.speaker];
  const rel = `assets/voice/${pad2(l.frame)}.wav`;
  const style = [cfg.style, l.delivery && `This line: ${l.delivery}`].filter(Boolean).join(" ");
  let done = false;
  for (let attempt = 1; attempt <= 8 && !done; attempt++) {
    const model = MODELS[modelIdx];
    const r = await synthesizeGemini({ text: l.text, voiceId: cfg.voice_id, style, wavAbs: join(ROOT, rel), model });
    if (r.ok) {
      const dur = Math.round(probe(join(ROOT, rel)) * 1000) / 1000;
      const entry = { frame: l.frame, speaker: l.speaker, path: rel, duration_s: dur, words: [], model };
      meta.voices = meta.voices.filter((v) => v.frame !== l.frame).concat(entry).sort((a, b) => a.frame - b.frame);
      neutral.voices = neutral.voices
        .filter((v) => Number(v.id) !== l.frame)
        .concat({ id: pad2(l.frame), speaker: l.speaker, path: rel, duration_s: dur, words: [], model })
        .sort((a, b) => Number(a.id) - Number(b.id));
      writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      writeFileSync(neutralPath, JSON.stringify(neutral, null, 2));
      console.log(`  ✓ ${pad2(l.frame)} ${l.speaker} ${dur}s (${model})`);
      done = true;
      break;
    }
    const err = r.error || "";
    if (/per day/i.test(err)) {
      if (modelIdx + 1 >= MODELS.length) {
        console.log(`  ✗ ${pad2(l.frame)}: daily quota reached on every model — stopping. Re-run tomorrow, or enable billing on the Gemini key.`);
        process.exit(2);
      }
      modelIdx++;
      console.log(`  · daily quota reached — switching to ${MODELS[modelIdx]} (same voices, separate quota)`);
      continue;
    }
    if (!/429|too_many_requests|Rate limit/i.test(err) && attempt >= 2) {
      console.log(`  ✗ ${pad2(l.frame)}: ${err.slice(0, 200)}`);
      break;
    }
    const wait = Number(err.match(/retry in (\d+(?:\.\d+)?)s/)?.[1] ?? GAP_S) + 2;
    console.log(`  · ${pad2(l.frame)} attempt ${attempt} failed (${err.slice(0, 90)}) — waiting ${wait}s`);
    await sleep(wait);
  }
  if (i < todo.length - 1) await sleep(GAP_S);
}
const missing = lines.filter((l) => !meta.voices.some((v) => v.frame === l.frame)).map((l) => pad2(l.frame));
console.log(`✓ voices now: ${meta.voices.map((v) => pad2(v.frame)).join(" ")}${missing.length ? ` · MISSING: ${missing.join(" ")}` : ""}`);
