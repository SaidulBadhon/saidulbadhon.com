#!/usr/bin/env node
// chapters.mjs — YouTube chapter list from the assembled video.
//
// A frame starts a chapter when its STORYBOARD.md block has a `- chapter:` line
// (the chapter title, in the video's language). Start times come from the
// mounted frame hosts in index.html, so transitions and real voice durations
// are already accounted for. YouTube's rules are enforced: the first chapter is
// 00:00, there are at least 3, and each lasts at least 10 seconds (a too-short
// chapter is merged into the one before it).
//
//   node .hyperframes/chapters.mjs            → prints "MM:SS title" lines
//   node .hyperframes/chapters.mjs --json     → prints [{ t, title }]

import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const titles = new Map();
let cur = null;
for (const line of readFileSync(join(ROOT, "STORYBOARD.md"), "utf8").split(/\r?\n/)) {
  const h = line.match(/^#{2,3}\s+Frame\s+(\d+)/i);
  if (h) {
    cur = Number(h[1]);
    continue;
  }
  const c = cur != null && line.match(/^-\s+chapter:\s*(.+)$/i);
  if (c) titles.set(cur, c[1].trim().replace(/^"|"$/g, ""));
}

const html = readFileSync(join(ROOT, "index.html"), "utf8");
const starts = new Map();
for (const m of html.matchAll(/<[a-z][^<>]*data-composition-src="compositions\/frames\/(\d\d)-[^"]*"[^<>]*>/gi)) {
  starts.set(Number(m[1]), Number(m[0].match(/data-start="([\d.]+)"/)?.[1]));
}
const total = Math.max(...[...html.matchAll(/data-composition-id="main"[^>]*data-duration="([\d.]+)"/g)].map((m) => Number(m[1])), 0);

let chapters = [...titles.entries()]
  .filter(([n]) => starts.has(n))
  .map(([n, title]) => ({ t: Math.floor(starts.get(n)), title }))
  .sort((a, b) => a.t - b.t);
if (!chapters.length || chapters[0].t !== 0) chapters.unshift({ t: 0, title: chapters[0]?.title ?? "শুরু" });
chapters[0].t = 0;
// merge chapters shorter than 10s: a short chapter is absorbed into the one before it;
// a short FIRST chapter (00:00) absorbs the chapter after it instead
const end = total || Infinity;
const merged = [];
for (const c of chapters) {
  const prev = merged.at(-1);
  if (prev && c.t - prev.t < 10) {
    if (merged.length === 1) continue; // keep 00:00, drop the chapter that starts too soon after it
    merged.pop(); // the previous chapter was too short: this one replaces it
  }
  merged.push(c);
}
while (merged.length > 1 && end - merged.at(-1).t < 10) merged.pop();
if (merged.length < 3) console.error(`⚠ only ${merged.length} chapter(s) — YouTube needs at least 3; add more \`- chapter:\` lines`);
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
if (process.argv.includes("--json")) console.log(JSON.stringify(merged, null, 2));
else console.log(merged.map((c) => `${mmss(c.t)} ${c.title}`).join("\n"));
