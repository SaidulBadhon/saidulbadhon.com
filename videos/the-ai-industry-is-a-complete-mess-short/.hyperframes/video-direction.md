# Video direction — binding for every frame of a "কিন্তু দাঁড়ান…" episode

**Two registers, one system (`frame.md`).** Every frame obeys BlockFrame's atoms: 4px black border
↔ 8px hard offset shadow (3px ↔ 4px on chrome), square corners, Inter 800–900 display, Space Grotesk
uppercase label chrome, label-pills, tilted decorations. Fonts ship in `assets/fonts/` — declare
`@font-face` inside your template with `url("assets/fonts/<file>")`: `inter-500/700/800/900`,
`space-grotesk-500/600/700`, `permanent-marker-400`, `noto-sans-bengali-500/600/700/800/900`,
`atma-500/600/700`. Stacks are Latin-first, Bengali-fallback: `"Inter","Noto Sans Bengali"` ·
`"Space Grotesk","Noto Sans Bengali"` · `"Permanent Marker","Atma"`. Bengali text: `letter-spacing: 0`,
multi-line `line-height ≥ 1.2`, re-fit sizes so nothing overflows (Bangla runs longer than English).

- **HOST register — the infomercial.** Full-bleed pastel ground that cycles (yellow → pink → blue →
  green → cream …), a faint black dot-grid in one corner, 1–2 tilted stripe-blocks bleeding off an
  edge, star-bursts carrying prices, tilted badges. Loud, packed, toy-packaging. EXPLICITLY PLAYFUL:
  star-bursts, stickers and the product box may spring-pop with a small overshoot; type and cards
  still settle on long-tail `power3`. Every HOST frame that follows a CHECKER frame opens with a VHS
  "▶ PLAY" readout top-left (Space Grotesk 700, white with a dark text-shadow) visible 0.0–0.5s, then
  hard-cut off.
- **CHECKER register — the paused tape.** The SAME stage in every checker frame: full-bleed
  `#1B1B1F` ground clip; faint scanlines (1px white lines every 4px at ~5%); a ghosted grey star-burst
  outline + stripe-block (~8% white, bottom-right); top-left "⏸ PAUSE" + small "SP" counter; top-right
  a white "ফ্যাক্ট চেক" label-pill (3px border, 4px shadow) — all present and static from t=0.
  Content sits on WHITE card-elevated surfaces.
- **The red marker** (`#E5322D`) is the fact-checker's only voice on screen: hand-drawn SVG strokes
  (~9px, round caps, slightly wobbly) drawn on with `svg-path-draw`, and short handwritten notes in
  "Permanent Marker","Atma" (red). Never a fill, ground, border or shadow.
- **Recurring props:** the product box mascot (white box, coloured top band with the product name,
  price on its face, cartoon oval eyes + grin — the one illustration exception to square corners —
  and a vertical CONTENTS gauge labelled "পরিমাণ"); the shelf (plank + hanging tags: "ইউনিট দাম",
  a big "$X / 1x" rolled in with `compositions/components/number-wheel.html`, a small plan line);
  white chart cards; the black closing plate (white border, 12px yellow shadow).
- **Data colours** (fixed per episode): old/before = `#C0F7FE` blue · new/hype = `#FE90E8` pink ·
  the alternative = `#99E885` green. Bars: 3px black border + 4px hard shadow.
- **Visible copy** is short motion-graphics copy (labels, numbers, stamps) — never a sentence of the
  narration. No real logos: product names are set as type. Western digits on screen.

**Motion grammar.** One paused GSAP timeline per frame; reveal every piece ON its spoken word (the
Scene timestamps are aligned word onsets from the Bangla voice track — honour them to ±0.1s);
entrances via `fromTo`; long-tail `power3` settles; holds are still (subtle finite jitter on a HOST
star-burst at most). Never set `visibility: "visible"` from JS (use `"inherit"`/`"hidden"`, or
`autoAlpha`) — an explicit "visible" leaks the element into every other frame of the video.

**Never:** rounded cards, blurred shadows, gradients, purple-blue AI glow, real logos, narration
sentences as on-screen text, red as a fill or border, content below 83% of the canvas height,
everything on screen by 25% then frozen, many things floating independently, `repeat`/`yoyo`,
`Math.random`, exit animations (except the end card's final fade).
