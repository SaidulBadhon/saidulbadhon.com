#!/usr/bin/env node
// make-thumbnails.mjs — three 1280×720 YouTube thumbnails in the series look,
// for YouTube's "Test & Compare" (A/B/C):
//   A · HYPE        — yellow infomercial set: the mascot product box, the headline
//                     with its second line on a pink banner, a number star-burst
//   B · FACT CHECK  — paused-tape stage: old value struck in red marker → new value
//                     handwritten in red, headline in white
//   C · BEFORE/AFTER — pink set: two cards (before → after) with the red circle
// Rendered through HyperFrames (headless Chrome), so Bangla shapes correctly in the
// series fonts. Writes <video>/youtube/thumbnail-{a,b,c}.jpg (each well under 2 MB).
//
//   node .claude/skills/new-post/scripts/make-thumbnails.mjs --video videos/<slug> --spec thumbs.json
//
// thumbs.json (keep headline lines SHORT — ≤ 3 words each; thumbnails are read at phone size):
// {
//   "headline": ["একই দাম", "অর্ধেক ইউসেজ!"],
//   "kicker": "ChatGPT Pro $200",
//   "old": "20x", "new": "10x",
//   "number": "−50%",
//   "box": { "label": "CHATGPT PRO", "price": "$200", "gauge": 0.5 },
//   "labels": { "before": "আগে", "after": "এখন" }
// }

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const SKILL = resolve(import.meta.dirname, "..");
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const VIDEO = resolve(arg("video", ""));
const spec = JSON.parse(readFileSync(resolve(arg("spec", "")), "utf8"));
const THUMBS = join(VIDEO, ".thumbs");
const OUT = join(VIDEO, "youtube");
rmSync(THUMBS, { recursive: true, force: true });
mkdirSync(join(THUMBS, "assets"), { recursive: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(SKILL, "assets", "series", "fonts"), join(THUMBS, "assets", "fonts"), { recursive: true });
writeFileSync(join(THUMBS, "hyperframes.json"), JSON.stringify({ paths: { assets: "assets" } }, null, 2));
writeFileSync(join(THUMBS, "meta.json"), JSON.stringify({ id: "thumbnails", name: "thumbnails" }, null, 2));

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const [h1, h2] = [spec.headline?.[0] ?? "", spec.headline?.[1] ?? ""];
const gauge = Math.max(0, Math.min(1, spec.box?.gauge ?? 0.5));
// star-burst text: fit the number inside the star's inner area (~50% of its width)
const starFont = (w) => Math.floor((w * 0.5) / (Math.max(2, [...String(spec.number ?? "")].length) * 0.62));
const faces = [
  ["inter-800", "Inter", 800], ["inter-900", "Inter", 900],
  ["noto-sans-bengali-800", "Noto Sans Bengali", 800], ["noto-sans-bengali-900", "Noto Sans Bengali", 900],
  ["space-grotesk-700", "Space Grotesk", 700], ["permanent-marker-400", "Permanent Marker", 400], ["atma-700", "Atma", 700],
].map(([f, fam, w]) => `@font-face{font-family:"${fam}";src:url("assets/fonts/${f}.woff2") format("woff2");font-weight:${w};font-display:block}`).join("\n");

const star = "polygon(50% 0%,61% 18%,82% 10%,79% 32%,100% 40%,84% 55%,96% 75%,73% 76%,68% 98%,50% 85%,32% 98%,27% 76%,4% 75%,16% 55%,0% 40%,21% 32%,18% 10%,39% 18%)";
const mascot = `
<div class="box">
  <div class="band">${esc(spec.box?.label)}</div>
  <svg class="face" viewBox="0 0 200 110"><ellipse cx="66" cy="36" rx="13" ry="19"/><ellipse cx="134" cy="36" rx="13" ry="19"/>
    <circle cx="70" cy="28" r="5" fill="#fff"/><circle cx="138" cy="28" r="5" fill="#fff"/><path d="M40 66 Q100 124 160 66 Q100 84 40 66 Z"/></svg>
  <div class="price">${esc(spec.box?.price)}</div>
  <div class="gauge"><div class="fill" style="height:${Math.round(gauge * 100)}%"></div></div>
</div>`;

const html = `<!doctype html><html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280, height=720">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1280px;height:720px;overflow:hidden;background:#000}
#root{position:relative;width:1280px;height:720px}
.v{position:absolute;inset:0;overflow:hidden;font-family:"Inter","Noto Sans Bengali",sans-serif;color:#000}
.bn{font-family:"Inter","Noto Sans Bengali",sans-serif;font-weight:900;letter-spacing:0;line-height:1.18}
.card{background:#fff;border:6px solid #000;box-shadow:12px 12px 0 #000}
.dots{position:absolute;width:300px;height:220px;background-image:radial-gradient(#000 1.8px,transparent 2px);background-size:22px 22px;opacity:.35}
.stripe{position:absolute;border:5px solid #000;background:repeating-linear-gradient(45deg,#000 0 14px,var(--c,#FE90E8) 14px 28px)}
.star{position:absolute;display:flex;align-items:center;justify-content:center;clip-path:${star};background:#000}
.star>div{position:absolute;inset:7px;clip-path:${star};display:flex;align-items:center;justify-content:center;font-weight:900;font-family:"Inter","Noto Sans Bengali";letter-spacing:-1px}
.box{position:absolute;width:300px;height:400px;background:#fff;border:6px solid #000;box-shadow:12px 12px 0 #000}
.band{height:84px;background:#FE90E8;border-bottom:6px solid #000;display:flex;align-items:center;justify-content:center;font:900 34px "Inter";letter-spacing:-1px;text-align:center;padding:0 10px}
.face{display:block;width:170px;margin:26px 0 0 34px}
.face ellipse,.face path{fill:#000}
.price{font:900 72px "Inter";letter-spacing:-3px;margin:8px 0 0 22px}
.gauge{position:absolute;right:16px;top:110px;width:34px;height:250px;border:5px solid #000;background:#fff;display:flex;align-items:flex-end}
.fill{width:100%;background:repeating-linear-gradient(45deg,#000 0 6px,#FE90E8 6px 12px);border-top:5px solid #000}
.pill{position:absolute;background:#fff;border:4px solid #000;box-shadow:5px 5px 0 #000;border-radius:999px;padding:8px 22px;font:700 26px "Space Grotesk","Noto Sans Bengali";letter-spacing:.06em;text-transform:uppercase}
.marker{font-family:"Permanent Marker","Atma";color:#E5322D;font-weight:700}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="3" data-width="1280" data-height="720">

<!-- A · HYPE -->
<div class="v clip" data-start="0" data-duration="1" data-track-index="0" style="background:#F7CB46">
  <div class="dots" style="right:40px;top:30px"></div>
  <div class="stripe" style="--c:#FE90E8;left:-60px;bottom:40px;width:360px;height:70px;transform:rotate(-8deg)"></div>
  <div style="position:absolute;left:70px;top:150px;transform:rotate(-5deg)">${mascot.replace('class="box"', 'class="box" style="position:relative"')}</div>
  <div class="bn" data-fit style="position:absolute;left:450px;top:120px;width:780px;font-size:120px">${esc(h1)}</div>
  <div class="card bn" data-fit style="position:absolute;left:430px;top:330px;width:800px;padding:16px 28px;background:#FE90E8;font-size:118px;transform:rotate(-3deg)">${esc(h2)}</div>
  <div class="star" style="right:44px;top:425px;width:240px;height:240px;transform:rotate(10deg)"><div style="background:#C0F7FE;font-size:${starFont(240)}px">${esc(spec.number)}</div></div>
</div>

<!-- B · FACT CHECK -->
<div class="v clip" data-start="1" data-duration="1" data-track-index="0" style="background:#1B1B1F">
  <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 2px,transparent 2px 5px)"></div>
  <div style="position:absolute;left:44px;top:34px;display:flex;align-items:center;gap:14px;color:#fff;font:700 40px 'Space Grotesk'"><span style="display:inline-flex;gap:7px"><i style="width:11px;height:36px;background:#fff;display:block"></i><i style="width:11px;height:36px;background:#fff;display:block"></i></span>PAUSE</div>
  <div class="pill" style="right:44px;top:30px">ফ্যাক্ট চেক</div>
  <div class="bn" data-fit style="position:absolute;left:60px;top:120px;width:1160px;color:#fff;font-size:96px;text-align:center">${esc(h1)} ${esc(h2)}</div>
  <div class="card" style="position:absolute;left:150px;top:330px;width:980px;height:330px;display:flex;align-items:center;justify-content:center;gap:80px">
    <div style="position:relative;font:900 210px 'Inter';letter-spacing:-8px;color:#000">${esc(spec.old)}
      <svg viewBox="0 0 400 100" preserveAspectRatio="none" style="position:absolute;left:-20px;top:42%;width:calc(100% + 40px);height:70px;overflow:visible"><path d="M6 64 C120 40 250 52 394 24" fill="none" stroke="#E5322D" stroke-width="16" stroke-linecap="round"/></svg></div>
    <div class="marker" style="font-size:210px;line-height:1;transform:rotate(-6deg)">${esc(spec.new)}</div>
  </div>
</div>

<!-- C · BEFORE / AFTER -->
<div class="v clip" data-start="2" data-duration="1" data-track-index="0" style="background:#FE90E8">
  <div class="dots" style="left:30px;bottom:24px"></div>
  <div class="bn" data-fit style="position:absolute;left:60px;top:40px;width:1160px;font-size:104px;text-align:center">${esc(h1)} <span style="background:#fff;border:6px solid #000;box-shadow:10px 10px 0 #000;padding:0 18px;display:inline-block;transform:rotate(-2deg)">${esc(h2)}</span></div>
  <div class="card" style="position:absolute;left:110px;top:300px;width:420px;height:330px;background:#C0F7FE;transform:rotate(-3deg);text-align:center">
    <div class="bn" style="font-size:52px;margin-top:22px">${esc(spec.labels?.before ?? "আগে")}</div>
    <div style="font:900 170px 'Inter';letter-spacing:-6px;line-height:1.05">${esc(spec.old)}</div></div>
  <svg viewBox="0 0 160 80" style="position:absolute;left:560px;top:420px;width:160px;height:80px"><path d="M8 40 H120 M100 14 L140 40 L100 66" fill="none" stroke="#000" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="card" style="position:absolute;left:750px;top:300px;width:420px;height:330px;background:#F7CB46;transform:rotate(3deg);text-align:center">
    <div class="bn" style="font-size:52px;margin-top:22px">${esc(spec.labels?.after ?? "এখন")}</div>
    <div style="position:relative;display:inline-block;font:900 170px 'Inter';letter-spacing:-6px;line-height:1.05">${esc(spec.new)}
      <svg viewBox="0 0 300 200" preserveAspectRatio="none" style="position:absolute;left:-36px;top:-8px;width:calc(100% + 72px);height:calc(100% + 16px);overflow:visible"><path d="M150 12 C40 10 8 70 18 120 C30 180 230 196 280 130 C312 84 268 14 140 20" fill="none" stroke="#E5322D" stroke-width="10" stroke-linecap="round"/></svg></div></div>
  <div class="star" style="right:30px;top:170px;width:220px;height:220px;transform:rotate(-8deg)"><div style="background:#C0F7FE;font-size:${starFont(220)}px">${esc(spec.number)}</div></div>
</div>

</div>
<script>
  // Fit long headlines to their box (static layout, runs once).
  document.fonts.ready.then(function () {
    document.querySelectorAll("[data-fit]").forEach(function (el) {
      var size = parseFloat(getComputedStyle(el).fontSize);
      while ((el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > size * 2.6) && size > 40) {
        size -= 2;
        el.style.fontSize = size + "px";
      }
    });
  });
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = gsap.timeline({ paused: true });
</script>
</body></html>`;
writeFileSync(join(THUMBS, "index.html"), html);

const snap = spawnSync(process.platform === "win32" ? "npx hyperframes snapshot --at 0.5,1.5,2.5" : "npx hyperframes snapshot --at 0.5,1.5,2.5", {
  cwd: THUMBS,
  encoding: "utf8",
  shell: true,
});
if (snap.status !== 0) {
  console.error(snap.stdout, snap.stderr);
  process.exit(1);
}
const shots = readdirSync(join(THUMBS, "snapshots")).filter((f) => /^frame-\d+-at-.*\.png$/.test(f)).sort();
const names = ["a", "b", "c"];
for (let i = 0; i < Math.min(3, shots.length); i++) {
  const out = join(OUT, `thumbnail-${names[i]}.jpg`);
  await sharp(join(THUMBS, "snapshots", shots[i])).resize(1280, 720).jpeg({ quality: 90 }).toFile(out);
  console.log(`✓ thumbnail ${names[i].toUpperCase()} → ${out}`);
}
rmSync(THUMBS, { recursive: true, force: true }); // scratch project, regenerated on every run
if (!existsSync(join(OUT, "thumbnail-a.jpg"))) process.exit(1);
