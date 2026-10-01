# Video direction — binding for every frame (copied verbatim from STORYBOARD.md)

## Video direction

**Two registers, one system (`frame.md`).** Every frame obeys BlockFrame's atoms: 4px black border
↔ 8px hard offset shadow (3px ↔ 4px on chrome), square corners, Inter 800–900 uppercase
negative-tracked display, Space Grotesk uppercase label chrome, label-pills, tilted decorations.
Fonts ship in `assets/fonts/` — declare `@font-face` with `url("assets/fonts/<file>")`:
`inter-500/700/800/900.woff2` (family "Inter"), `space-grotesk-500/600/700.woff2` (family "Space
Grotesk"), `permanent-marker-400.woff2` (family "Permanent Marker" — fact-checker handwriting ONLY).

- **HOST register (frames 1, 4, 6, 9, 12, 14, 18) — the infomercial.** Full-bleed pastel ground
  that cycles (yellow → pink → blue → green → cream → pink → yellow), a faint black dot-grid in one
  corner, 1–2 tilted stripe-blocks bleeding off an edge, star-bursts carrying prices, tilted
  badges. Loud, packed, toy-packaging. This register is EXPLICITLY PLAYFUL: star-bursts, stickers
  and the product box may use a spring-pop with a small overshoot (`spring-pop-entrance`,
  overshoot register). Type and cards still settle on long-tail `power3`.
  Every HOST frame that follows a fact-check (4, 6, 9, 12, 14, 18) opens with a VHS "▶ PLAY" OSD
  readout top-left (Space Grotesk 700, white with a 3px black text-stroke look via text-shadow,
  ~1.7cqw) visible 0.0–0.5s, then hard-cut off — the tape resuming.
- **CHECKER register (frames 2, 3, 5, 7, 8, 10, 11, 13, 15, 16) — the paused tape.** The SAME
  stage in every checker frame: full-bleed `freeze` (#1B1B1F) ground clip; faint horizontal
  scanlines (1px white lines every 4px at ~5% opacity); a ghosted grayscale echo of the
  infomercial (one star-burst outline + one tilted stripe-block at ~8% white opacity, bottom-right);
  top-left VHS OSD "⏸ PAUSE" (Space Grotesk 700, white, ~1.7cqw) and a small "SP" counter beside it;
  top-right a white "FACT CHECK" label-pill (black 3px border, 4px hard shadow). All three chrome
  pieces are present from t=0 (static — the stage is continuous across the cut). Content sits on
  WHITE card-elevated surfaces (4px border + 8px hard shadow) placed on the dark stage.
- **The red marker** (`marker` #E5322D) is the fact-checker's only voice on screen: hand-drawn SVG
  strokes (stroke ~0.45cqw ≈ 9px, round caps/joins, slightly wobbly paths) drawn on with
  `svg-path-draw`, and short handwritten notes in Permanent Marker (red, ~2.2–3cqw). Never a fill,
  ground, border or shadow. Strikes, circles, ticks, arrows, underlines and X marks only.
- **Recurring props** (draw them the same way everywhere they appear):
  - *The PRO box* — a toy-packaging product box: white card-elevated rectangle (portrait ~3:4),
    a colored top band with the product name (Inter 900), a big price on the front, a cartoon face
    (two black oval eyes with white glints + a wide black grin, simple SVG — the one illustration
    exception to square corners), and a vertical CONTENTS gauge on its right edge (black-bordered
    tube filled with a pink/black stripe-block; FULL = 100%, NEW PRO = 50%). Band colors: ChatGPT
    Pro $200 = pink; Plus = blue; Pro $500 = yellow; Claude Max 20x = green.
  - *The shelf* — a long plank across the frame (offwhite fill, 4px border, 8px hard shadow) with
    shelf TAGS hanging from its front edge: white card-small tags (3px border, 4px shadow), a
    Space Grotesk "UNIT PRICE" label, the unit price in Inter 900 ("$20 / 1x"), and a smaller line
    with the plan price and usage ("$20/MO · 1x PLUS"). Unit prices roll in with the installed
    `compositions/components/number-wheel.html` snippet (paste its style+script into your template;
    animate `.hf-number-wheel-strip` per its comment) — or a `counting-dynamic-scale` count.
- **Data series colors (every chart):** ChatGPT "until Oct 29" = `blue`; ChatGPT "from Oct 30" /
  OpenAI = `pink`; Claude = `green`. Bars: 3px black border + 4px hard shadow, square.
- **Visible copy** is short motion-graphics copy (labels, numbers, stamps) — never a sentence of
  the narration. No real logos: "ChatGPT", "OpenAI", "Claude" are set as type.

**Motion grammar.** One paused GSAP timeline per frame; reveal every piece ON its spoken word
(timestamps in each Scene line are measured from the real voice track — honor them to ±0.1s);
entrances via `fromTo`; long-tail `power3` settles (playful overshoot only where the HOST register
allows it); within-frame swaps are velocity-matched cuts (`cut-catalog.md`). Holds are still —
subtle jitter (`sine-wave-loop`, low amplitude, finite) on a HOST star-burst at most; no breathing,
no slow back-half pans/pushes. Camera moves are only the ones named (frame 5 pans, frame 11 pan).

**Rhythm.** Fast HOST frames (2–8s) alternate with longer CHECKER frames (9–14s). Held reads:
frame 2 (the freeze), the end of frame 8 ("That was the whole point."), frame 17's final beat, and
the end card (19). The HOST frames never hold long — they are interrupted.

**Never:** rounded cards, blurred shadows, gradients, purple-blue AI glow, bokeh, real logos,
stock-photo looks, narration sentences as on-screen text, red used as a fill or border, content
below y = 896px (83% keep-out), slideshow (everything on screen by 25% then frozen), screensaver
(many things floating independently), `repeat`/`yoyo`, `Math.random`.

## Canvas & timing facts

- Canvas 1920×1080. Captions: disabled — but keep ALL content above y = 896px (83% keep-out) anyway.
- Frame durations are fixed from the real voice track; Scene timestamps are measured word onsets from that track (seconds from frame start).
- Speakers: HOST frames 1, 4, 6, 9, 12, 14, 18 · CHECKER frames 3, 5, 7, 8, 10, 11, 13, 15, 16, 17 · silent frames 2, 19.
- Load GSAP inside your <template> with: <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
- Shared component for rolling prices: compositions/components/number-wheel.html (read its header comment; paste its <style> + <script> into your template, prefixed/scoped so siblings cannot collide).
