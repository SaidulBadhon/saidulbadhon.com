#!/usr/bin/env node
// make-cover.mjs — the blog's 2048×1152 cover image, from a JSON spec.
//
// Matches the existing covers: light gradient ground, a letter-spaced kicker,
// a big two-colour headline on the left, a legend + source note at the bottom
// left, and a simple bar chart on the right (value labels on top, category
// labels below, an optional dashed "delta" arrow between two bars).
// Rendered as SVG with sharp (already in the repo's node_modules), written as
// .webp. Run from the repo root.
//
//   node .claude/skills/new-post/scripts/make-cover.mjs cover.json
//
// cover.json:
// {
//   "out": "content/blogs/<slug>/<name>.webp",
//   "kicker": "CHATGPT PRO $200 — IT'S BACK",
//   "headline": [ { "text": "Same $200.", "tone": "ink" }, { "text": "Half the", "tone": "accent" }, { "text": "usage.", "tone": "accent" } ],
//   "legend": [ { "label": "Until Oct 29", "color": "#b6bcc6" }, { "label": "From Oct 30", "color": "#1baf7a" } ],
//   "note": "Codex and ChatGPT Work usage, as a multiple of Plus · OpenAI",
//   "bars": [ { "label": "Old Pro $200", "value": 20, "display": "20x", "color": "#b6bcc6" },
//             { "label": "New Pro $200", "value": 10, "display": "10x", "color": "#1baf7a" } ],
//   "delta": { "from": 0, "to": 1, "text": "−50%" }          // optional
//   "barNote": { "bar": 0, "text": "Model is at capacity" }   // optional small label inside/above a bar
// }
// Colours: use the post's chart colours from the `.viz` block of src/app/globals.css.

import { readFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const spec = JSON.parse(readFileSync(process.argv[2], "utf8"));
const W = 2048;
const H = 1152;
const INK = "#111827";
const ACCENT = spec.accent ?? "#de4a3f";
const MUTED = "#4b5563";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const FONT = "Segoe UI, Inter, Helvetica, Arial, sans-serif";

// headline: size it so the longest line fits ~1000px
const lines = spec.headline ?? [];
const longest = Math.max(...lines.map((l) => l.text.length), 1);
const hSize = Math.min(150, Math.floor(1000 / (longest * 0.56)));
const hLead = Math.round(hSize * 0.98);
const hTop = 300 + hSize * 0.82;
const headline = lines
  .map(
    (l, i) =>
      `<text x="150" y="${Math.round(hTop + i * hLead)}" font-family="${FONT}" font-weight="900" font-size="${hSize}" letter-spacing="-3" fill="${l.tone === "accent" ? ACCENT : INK}">${esc(l.text)}</text>`,
  )
  .join("\n");

// legend + note
let lx = 150;
const legend = (spec.legend ?? [])
  .map((g) => {
    const out = `<rect x="${lx}" y="905" width="30" height="30" rx="5" fill="${g.color}"/><text x="${lx + 44}" y="932" font-family="${FONT}" font-size="34" font-weight="600" fill="${INK}">${esc(g.label)}</text>`;
    lx += 44 + g.label.length * 18 + 40;
    return out;
  })
  .join("\n");
const note = spec.note ? `<text x="150" y="995" font-family="${FONT}" font-size="31" fill="${MUTED}">${esc(spec.note)}</text>` : "";

// bars (right half: x 1180–1880, baseline 995)
const bars = spec.bars ?? [];
const base = 995;
const top = 400;
const maxV = Math.max(...bars.map((b) => b.value), 1);
const slot = 700 / Math.max(bars.length, 1);
const bw = Math.min(170, slot * 0.6);
const barGeo = bars.map((b, i) => {
  const cx = 1180 + slot * (i + 0.5);
  const h = ((base - top) * b.value) / maxV;
  return { ...b, cx, x: cx - bw / 2, y: base - h, h };
});
const barsSvg = barGeo
  .map(
    (b) => `<rect x="${b.x.toFixed(1)}" y="${b.y.toFixed(1)}" width="${bw.toFixed(1)}" height="${b.h.toFixed(1)}" rx="12" fill="${b.color}"/>
<text x="${b.cx.toFixed(1)}" y="${(b.y - 26).toFixed(1)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="52" fill="${INK}">${esc(b.display ?? b.value)}</text>
<text x="${b.cx.toFixed(1)}" y="${base + 58}" text-anchor="middle" font-family="${FONT}" font-size="34" fill="${MUTED}">${esc(b.label)}</text>`,
  )
  .join("\n");
const axis = `<line x1="1150" y1="${base + 2}" x2="1880" y2="${base + 2}" stroke="#d1d5db" stroke-width="3"/>`;

let deltaSvg = "";
if (spec.delta && barGeo[spec.delta.from] && barGeo[spec.delta.to]) {
  const a = barGeo[spec.delta.from];
  const b = barGeo[spec.delta.to];
  const x1 = a.x + bw + 20;
  const y1 = a.y + 20;
  const x2 = b.cx;
  const y2 = b.y - 110;
  deltaSvg = `<path d="M ${x1} ${y1} C ${x2 - 60} ${y1 - 10}, ${x2} ${y1 + 40}, ${x2} ${y2}" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-dasharray="16 12"/>
<path d="M ${x2 - 18} ${y2 - 22} L ${x2} ${y2} L ${x2 + 18} ${y2 - 22}" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-linecap="round"/>
<text x="${(x1 + x2) / 2 + 40}" y="${y1 - 30}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="46" fill="${ACCENT}">${esc(spec.delta.text)}</text>`;
}
let barNote = "";
if (spec.barNote && barGeo[spec.barNote.bar]) {
  const b = barGeo[spec.barNote.bar];
  barNote = `<text x="${b.cx}" y="${Math.min(base - 30, b.y + 60)}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="26" fill="#ffffff">${esc(spec.barNote.text)}</text>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f3e9e6"/><stop offset="0.45" stop-color="#efece6"/><stop offset="1" stop-color="#e9e7f1"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<text x="150" y="210" font-family="${FONT}" font-size="36" font-weight="600" letter-spacing="9" fill="#6b7280">${esc(spec.kicker ?? "")}</text>
${headline}
${legend}
${note}
${axis}
${barsSvg}
${deltaSvg}
${barNote}
</svg>`;

const out = resolve(spec.out);
mkdirSync(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
console.log(`✓ cover → ${spec.out} (${W}×${H})`);
