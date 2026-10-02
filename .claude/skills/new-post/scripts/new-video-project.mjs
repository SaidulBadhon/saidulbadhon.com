#!/usr/bin/env node
// new-video-project.mjs — scaffold a series video project.
//
// Runs `hyperframes init` (blank, faceless-explainer), then copies in the
// series kit: frame.md (BlockFrame + series + Bangla type rules), fonts, the
// SFX library, the series jingle (seeded as the music bed), the number-wheel
// component, voices.json and the project helper scripts (.hyperframes/*.mjs).
//
//   node .claude/skills/new-post/scripts/new-video-project.mjs --dir videos/<slug> [--format 1920x1080|1080x1920]
//
// Run from the repo root. Leaves BRIEF.md / STORYBOARD.md / SCRIPT.md to you.

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const SKILL = resolve(import.meta.dirname, "..");
const SERIES = join(SKILL, "assets", "series");
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const dir = arg("dir");
const format = arg("format", "1920x1080");
if (!dir) {
  console.error("usage: new-video-project.mjs --dir videos/<slug> [--format 1920x1080|1080x1920]");
  process.exit(1);
}
const root = resolve(dir);
if (existsSync(root) && readdirSync(root).length) {
  console.error(`✗ ${dir} already exists and is not empty`);
  process.exit(1);
}

const init = spawnSync(`npx hyperframes init "${dir}" --non-interactive --example=blank --skill=faceless-explainer`, {
  stdio: "inherit",
  shell: true,
});
if (init.status !== 0) process.exit(init.status ?? 1);

const copy = (from, to) => cpSync(join(SERIES, from), join(root, to), { recursive: true });
copy("frame.md", "frame.md");
copy("fonts", "assets/fonts");
copy("sfx", "assets/sfx");
mkdirSync(join(root, "assets", "bgm"), { recursive: true });
copy("bgm/series-jingle.mp3", "assets/bgm/track.mp3");
copy("components", "compositions/components");
mkdirSync(join(root, ".hyperframes"), { recursive: true });
copy("voices.json", ".hyperframes/voices.json");
cpSync(join(SKILL, "scripts", "project"), join(root, ".hyperframes"), { recursive: true });

// Seed the music bed so the assembler mounts it (the jingle is 26s; assemble-index loops it).
const bgm = { path: "assets/bgm/track.mp3", volume: 1, query: "series jingle", duration_s: 26 };
writeFileSync(join(root, "audio_engine_meta.json"), JSON.stringify({ bgm, bgm_pending: false, voices: [] }, null, 2));
writeFileSync(join(root, "audio_meta.json"), JSON.stringify({ bgm, bgm_pending: false, voices: [], sfx: [] }, null, 2));

console.log(`✓ series project ready: ${dir} (${format})`);
console.log("  next: BRIEF.md → capture/extracted/ → STORYBOARD.md + SCRIPT.md → .hyperframes/gemini-paced.mjs");
