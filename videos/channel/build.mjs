#!/usr/bin/env node
// build.mjs — channel art for "শর্ত প্রযোজ্য" (Conditions Apply), in the series look.
//
//   logo.png   800×800   YouTube profile picture (shown as a circle, down to 98px):
//                        a pink star-burst on yellow, a black fine-print asterisk,
//                        and the fact-checker's red marker loop around it.
//   banner.png 2560×1440 YouTube banner. The two registers side by side: the loud
//                        yellow infomercial on the left, the paused tape on the right,
//                        the wordmark across the seam. Everything that matters sits in
//                        YouTube's safe area (1546×423, centred); the rest is decoration
//                        that only TVs and wide screens show.
//   banner-check.png     the banner with the safe area and desktop strip outlined
//                        (for checking only, not for upload).
//
//   node videos/channel/build.mjs        (from the repo root)
//
// The logo is pure shapes (sharp renders the SVG). The banner has Bangla text, so it is
// rendered in headless Edge with the series fonts embedded, which shapes Bengali properly.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";

const OUT = resolve(import.meta.dirname);
const FONTS = resolve(OUT, "../../.claude/skills/new-post/assets/series/fonts");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const C = {
  black: "#000000",
  white: "#FFFFFF",
  pink: "#FE90E8",
  blue: "#C0F7FE",
  green: "#99E885",
  yellow: "#F7CB46",
  marker: "#E5322D",
  freeze: "#1B1B1F",
};

/** Points of an n-point star-burst centred on (cx, cy). */
function star(cx, cy, n, outer, inner, rotateDeg = 0) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((i * 180) / n - 90 + rotateDeg) * (Math.PI / 180);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

/** A thick six-armed asterisk: three bars through the centre. */
function asterisk(cx, cy, length, width, fill) {
  return [0, 60, 120]
    .map(
      (deg) =>
        `<rect x="${cx - width / 2}" y="${cy - length / 2}" width="${width}" height="${length}" fill="${fill}" transform="rotate(${deg} ${cx} ${cy})"/>`,
    )
    .join("");
}

// ---------------------------------------------------------------- logo
{
  const S = 800;
  const cx = 400;
  const cy = 400;
  // The red marker loop: a hand-drawn oval that overshoots where it closes.
  const loop =
    "M 392 214 C 528 206 600 300 590 404 C 580 516 476 590 382 584 C 270 578 200 498 206 396 C 212 290 300 220 420 226 C 470 229 512 246 540 270";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <rect width="${S}" height="${S}" fill="${C.yellow}"/>
  <polygon points="${star(cx + 18, cy + 18, 12, 318, 250, 8)}" fill="${C.black}"/>
  <polygon points="${star(cx, cy, 12, 318, 250, 8)}" fill="${C.pink}" stroke="${C.black}" stroke-width="12" stroke-linejoin="miter"/>
  ${asterisk(cx + 10, cy + 10, 300, 82, C.black)}
  ${asterisk(cx, cy, 300, 82, C.white)}
  <g fill="none" stroke="${C.black}" stroke-width="10">${[0, 60, 120]
    .map((deg) => `<rect x="${cx - 41}" y="${cy - 150}" width="82" height="300" transform="rotate(${deg} ${cx} ${cy})"/>`)
    .join("")}</g>
  ${asterisk(cx, cy, 280, 62, C.white)}
  <path d="${loop}" fill="none" stroke="${C.marker}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 400 400)"/>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(join(OUT, "logo.png"));
  // How it reads where YouTube actually shows it: a 98px circle.
  const small = await sharp(Buffer.from(svg)).resize(98, 98).png().toBuffer();
  const mask = Buffer.from(`<svg width="98" height="98"><circle cx="49" cy="49" r="49" fill="#fff"/></svg>`);
  await sharp(small)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(join(OUT, "logo-98-preview.png"));
  console.log("✓ logo.png (800×800) + logo-98-preview.png");
}

// ---------------------------------------------------------------- shared by the banner and the cover
const font = (file, family, weight) =>
  `@font-face{font-family:"${family}";src:url(data:font/woff2;base64,${readFileSync(join(FONTS, `${file}.woff2`)).toString("base64")}) format("woff2");font-weight:${weight};font-display:block}`;
const faces = [
  font("inter-800", "Inter", 800),
  font("inter-900", "Inter", 900),
  font("noto-sans-bengali-700", "Noto Sans Bengali", 700),
  font("noto-sans-bengali-800", "Noto Sans Bengali", 800),
  font("noto-sans-bengali-900", "Noto Sans Bengali", 900),
  font("space-grotesk-700", "Space Grotesk", 700),
  font("permanent-marker-400", "Permanent Marker", 400),
].join("\n");

/** Page styles: the yellow infomercial and the paused tape, split on a slant from
 *  x = seamTop at the top edge to x = seamBottom at the bottom edge. */
const pageCss = (W, H, seamTop, seamBottom) => `
${faces}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.freeze}}
.bn{font-family:"Inter","Noto Sans Bengali",sans-serif;letter-spacing:0}
.abs{position:absolute}
.card{background:${C.white};border:8px solid ${C.black};box-shadow:16px 16px 0 ${C.black}}
.pill{border:5px solid ${C.black};box-shadow:8px 8px 0 ${C.black};border-radius:999px}
.hype{inset:0;background:${C.yellow};clip-path:polygon(0 0,${seamTop}px 0,${seamBottom}px 100%,0 100%)}
.tape{inset:0;background:${C.freeze};clip-path:polygon(${seamTop}px 0,100% 0,100% 100%,${seamBottom}px 100%)}
.scan{inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 2px,transparent 2px 6px);clip-path:polygon(${seamTop}px 0,100% 0,100% 100%,${seamBottom}px 100%)}
.dots{background-image:radial-gradient(${C.black} 3.2px,transparent 3.6px);background-size:30px 30px;opacity:.55}
.stripes{background:repeating-linear-gradient(45deg,${C.black} 0 26px,${C.pink} 26px 52px);border:8px solid ${C.black}}
.ghost{background:repeating-linear-gradient(45deg,rgba(255,255,255,.09) 0 26px,transparent 26px 52px)}`;

/** The logo's mark: a white asterisk outlined in black, circled in red marker. */
const mark = (left, top, size) => `<svg class="abs" style="left:${left}px;top:${top}px" width="${size}" height="${size}" viewBox="200 200 400 400">
  ${asterisk(410, 410, 300, 82, C.black)}
  ${asterisk(400, 400, 300, 82, C.white)}
  <g fill="none" stroke="${C.black}" stroke-width="10">${[0, 60, 120]
    .map((deg) => `<rect x="359" y="250" width="82" height="300" transform="rotate(${deg} 400 400)"/>`)
    .join("")}</g>
  ${asterisk(400, 400, 280, 62, C.white)}
  <path d="M 392 214 C 528 206 600 300 590 404 C 580 516 476 590 382 584 C 270 578 200 498 206 396 C 212 290 300 220 420 226 C 470 229 512 246 540 270" fill="none" stroke="${C.marker}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 400 400)"/>
</svg>`;

/** A blue "অফার!" star-burst sticker. */
const offer = (left, top, size, fontSize) => `<svg class="abs" style="left:${left}px;top:${top}px" width="${size}" height="${size}" viewBox="0 0 300 300">
  <polygon points="${star(158, 158, 10, 138, 98, 0)}" fill="${C.black}"/>
  <polygon points="${star(150, 150, 10, 138, 98, 0)}" fill="${C.blue}" stroke="${C.black}" stroke-width="7"/>
</svg>
<div class="abs bn" style="left:${left}px;top:${top}px;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:${fontSize}px;transform:rotate(-10deg)">অফার!</div>`;

/** The VHS "⏸ PAUSE SP" readout. */
const pause = (left, top, fontSize) => `<div class="abs" style="left:${left}px;top:${top}px;display:flex;align-items:center;gap:${fontSize * 0.36}px;color:#fff;font:700 ${fontSize}px 'Space Grotesk'">
  <span style="display:inline-flex;gap:${fontSize * 0.18}px"><i style="width:${fontSize * 0.28}px;height:${fontSize * 0.88}px;background:#fff;display:block"></i><i style="width:${fontSize * 0.28}px;height:${fontSize * 0.88}px;background:#fff;display:block"></i></span>PAUSE<span style="font-size:${fontSize * 0.6}px;opacity:.8">SP</span>
</div>`;

/** Renders a page in headless Edge and writes it as <name>.png, plus <name>-check.png
 *  with the given safe-area overlay (for checking only, not for upload). */
async function render(name, W, H, body, seam, overlayRects) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss(W, H, ...seam)}</style></head><body>
<div class="abs hype"></div>
<div class="abs tape"></div>
<div class="abs scan"></div>
${body}
</body></html>`;
  const dir = join(tmpdir(), `channel-art-${name}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const page = join(dir, `${name}.html`);
  writeFileSync(page, html);
  const shot = join(dir, `${name}.png`);
  const run = spawnSync(
    EDGE,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${W},${H}`,
      "--virtual-time-budget=4000",
      `--user-data-dir=${join(dir, "profile")}`,
      `--screenshot=${shot}`,
      `file:///${page.replace(/\\/g, "/")}`,
    ],
    { encoding: "utf8" },
  );
  if (run.status !== 0) {
    console.error(run.stderr);
    process.exit(1);
  }
  // On Windows the Edge launcher can return before its headless child writes the file.
  for (let waited = 0; !existsSync(shot); waited += 250) {
    if (waited > 30_000) throw new Error(`Edge never wrote ${shot}`);
    await new Promise((r) => setTimeout(r, 250));
  }
  await new Promise((r) => setTimeout(r, 500));
  await sharp(shot).resize(W, H).png({ compressionLevel: 9 }).toFile(join(OUT, `${name}.png`));

  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${overlayRects}</svg>`);
  await sharp(join(OUT, `${name}.png`))
    .composite([{ input: overlay }])
    .png()
    .toFile(join(OUT, `${name}-check.png`));
  console.log(`✓ ${name}.png (${W}×${H}) + ${name}-check.png`);
}

// ---------------------------------------------------------------- YouTube banner, 2560×1440
// Safe area (every device): x 507–2053, y 508–931. Desktop strip: full width, y 508–931.
await render(
  "banner",
  2560,
  1440,
  `
<!-- yellow side: dot-grid, stripes, the hype star-burst, the mascot box (wide screens) -->
<div class="abs dots" style="left:40px;top:120px;width:520px;height:330px"></div>
<div class="abs stripes" style="left:-60px;top:1010px;width:760px;height:120px;transform:rotate(-6deg)"></div>
<div class="abs stripes" style="left:820px;top:-40px;width:330px;height:110px;transform:rotate(8deg)"></div>
${offer(520, 500, 300, 64)}
<div class="abs card" style="left:140px;top:560px;width:300px;height:360px;transform:rotate(-4deg)">
  <div class="bn" style="height:84px;border-bottom:8px solid ${C.black};background:${C.pink};font-weight:900;font-size:54px;display:flex;align-items:center;justify-content:center">হাইপ</div>
  <svg width="284" height="150" viewBox="0 0 284 150" style="display:block">
    <ellipse cx="100" cy="56" rx="17" ry="25"/><ellipse cx="184" cy="56" rx="17" ry="25"/>
    <circle cx="105" cy="46" r="6" fill="#fff"/><circle cx="189" cy="46" r="6" fill="#fff"/>
    <path d="M 70 98 Q 142 148 214 98 Z"/>
  </svg>
  <div class="bn" style="text-align:center;font-weight:900;font-size:62px;margin-top:-8px">$???</div>
</div>

<!-- dark side: VHS readout, ghosted star + stripes -->
${pause(1780, 800, 50)}
<svg class="abs" style="left:2130px;top:860px" width="420" height="420" viewBox="0 0 420 420">
  <polygon points="${star(210, 210, 10, 190, 134, 6)}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="8"/>
</svg>
<div class="abs ghost" style="left:1900px;top:1060px;width:700px;height:120px;transform:rotate(-6deg)"></div>
<div class="abs dots" style="right:60px;top:110px;width:440px;height:300px;opacity:.14;filter:invert(1)"></div>

<!-- the wordmark across the seam, the mark on its corner, the tagline -->
<div class="abs card bn" style="left:800px;top:532px;width:1010px;height:230px;transform:rotate(-2deg);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:150px;line-height:1.2;padding-bottom:10px">শর্ত প্রযোজ্য</div>
${mark(1722, 508, 232)}
<div class="abs pill bn" style="left:50%;top:796px;transform:translateX(-50%) rotate(1deg);background:${C.pink};padding:6px 46px 14px;font-weight:800;font-size:58px;line-height:1.25;white-space:nowrap">টেক হাইপের ফাইন প্রিন্ট — বাংলায়</div>`,
  [1290, 1170],
  `<rect x="0" y="508" width="2560" height="423" fill="none" stroke="#00E5FF" stroke-width="6" stroke-dasharray="24 14"/>
   <rect x="507" y="508" width="1546" height="423" fill="none" stroke="#FF00FF" stroke-width="6"/>`,
);

// ---------------------------------------------------------------- Facebook Page cover, 1640×924
// Phones show the whole image (640×360 at 1x). Desktops crop it to 820×312, the middle
// 1640×624 band (y 150–774) at 2x. The profile picture sits over the bottom-left corner,
// so that corner stays decoration only.
await render(
  "facebook-cover",
  1640,
  924,
  `
<!-- yellow side -->
<div class="abs dots" style="left:30px;top:30px;width:420px;height:210px"></div>
<div class="abs stripes" style="left:-60px;top:800px;width:560px;height:96px;transform:rotate(-6deg)"></div>
<div class="abs stripes" style="left:560px;top:-34px;width:250px;height:84px;transform:rotate(8deg)"></div>
${offer(170, 290, 240, 52)}

<!-- dark side -->
${pause(1300, 588, 40)}
<svg class="abs" style="left:1340px;top:660px" width="320" height="320" viewBox="0 0 420 420">
  <polygon points="${star(210, 210, 10, 190, 134, 6)}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="10"/>
</svg>
<div class="abs ghost" style="left:1180px;top:830px;width:520px;height:96px;transform:rotate(-6deg)"></div>
<div class="abs dots" style="right:30px;top:30px;width:360px;height:210px;opacity:.14;filter:invert(1)"></div>

<!-- the wordmark across the seam, the mark on its corner, the tagline -->
<div class="abs card bn" style="left:420px;top:332px;width:860px;height:196px;transform:rotate(-2deg);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:126px;line-height:1.2;padding-bottom:8px">শর্ত প্রযোজ্য</div>
${mark(1216, 308, 196)}
<div class="abs pill bn" style="left:850px;top:564px;transform:translateX(-50%) rotate(1deg);background:${C.pink};padding:4px 38px 12px;font-weight:800;font-size:46px;line-height:1.25;white-space:nowrap">টেক হাইপের ফাইন প্রিন্ট — বাংলায়</div>`,
  [880, 780],
  `<rect x="0" y="150" width="1640" height="624" fill="none" stroke="#00E5FF" stroke-width="5" stroke-dasharray="20 12"/>
   <rect x="0" y="640" width="440" height="284" fill="rgba(255,0,255,.18)" stroke="#FF00FF" stroke-width="5"/>`,
);
