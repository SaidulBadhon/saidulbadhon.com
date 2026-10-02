# Frame packet: 15-the-loop

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 15 — The loop

- scene: A ring arrow labelled "চক্র"; four nodes appear around it — "বড় মডেল = বড় খরচ" → "আরও টাকা তোলা" → "দ্রুত শিপ" → "কম্পিউট কম" with chips "সাইন-আপ বন্ধ · প্ল্যান অর্ধেক · at capacity" — then a red-marker arrow out of the centre to "এজেন্টে আরও ঠেলা" and "টেস্ট ↔ আসল ইন্টারনেট"
- voiceover: "এটাই আসল কারণ। পুরোটা একটা চক্র। বড় মডেল, বড় খরচ — তাই আরও টাকা তোলা। বেশি টাকা মানে দ্রুত শিপ। দ্রুত শিপ মানে কম্পিউট কম — তাই ইউজারদের রেশন। আর সবার আগে থাকতে এজেন্টদের আরও জোরে ঠেলা, এমন টেস্টে যেটা আসল ইন্টারনেটে খোলা।"
- duration: 24.107s
- transition_in: cut
- status: outline
- src: compositions/frames/15-the-loop.html
- type: benefit_highlight
- persuasion: Causal model (one loop explains all three messes)
- beat: understanding
- speaker: CHECKER
- chapter: কেন এমন হচ্ছে
- blueprint: compose
- focal: the ring, then each node as it lands, then the branch card
- roles: paused-tape stage = background · ring arrow + centre pill = foreground subject · four node cards = foreground subjects · rationing chips = supporting · branch card + chip = foreground payoff · red arrow, red circle = foreground annotations
- sfx: whoosh, pop ×5, marker squeak ×2

narrativeRole: The concept-teaching frame — why it is messy: one race-driven loop.
keyMessage: Big models cost more → raise more → ship faster → compute runs short → users rationed; and agents get pushed harder in tests open to the internet.

Scene 1 (0.0–3.9s): the stage; on "চক্র।" (3.04s) a big white ring arrow (4px, three-quarters circle with an arrowhead, centred at 46%, 47%, radius ≈ 27% of the frame height) draws on clockwise (svg-path-draw, ~0.8s) and a white label-pill "চক্র" pops at its centre.
Scene 2 (3.9–8.2s): on "বড়" (3.90s) node 1 pops at 12 o'clock (white card-small, ≈ x 34–58%, y 11–23%): "বড় মডেল = বড় খরচ"; on "টাকা" (7.20s) node 2 pops at 3 o'clock (≈ x 66–90%, y 40–52%): "আরও টাকা তোলা".
Scene 3 (8.2–11.4s): on "দ্রুত" (9.84s) node 3 pops at 6 o'clock (≈ x 34–58%, y 70–82%): "দ্রুত শিপ".
Scene 4 (11.4–16.6s): on "কম্পিউট" (12.80s) node 4 pops at 9 o'clock (≈ x 4–28%, y 40–52%): "কম্পিউট কম"; on "রেশন।" (15.51s) three small chips stack under it (pink dot each): "সাইন-আপ বন্ধ", "প্ল্যান অর্ধেক", "at capacity".
Scene 5 (16.6–24.107s): on "এজেন্টদের" (18.21s) the centre pill swaps (cut) to a small pink agent token; on "ঠেলা," (20.24s) the red marker draws an arrow from the centre to the lower-right, where a white card lands (x 66–94%, y 64–80%): "এজেন্টে আরও ঠেলা"; on "ইন্টারনেটে" (22.87s) a chip "টেস্ট ↔ আসল ইন্টারনেট" pops under its title, and on "খোলা।" (23.61s) the red marker circles the chip. Hold.

## Selected motion rule: svg-path-draw

---
name: svg-path-draw
description: Animate SVG paths drawing progressively using stroke-dasharray and stroke-dashoffset.
metadata:
  tags: svg, stroke, draw, path, reveal, icon, vector
---

# SVG Path Draw

Reveals an SVG shape by animating its stroke as if a pen were tracing it. Two stroke properties together: **`stroke-dasharray = <pathLength>`** makes the entire path one dash; **`stroke-dashoffset`** starts at the path length (dash shifted fully out of view → invisible) and tweens to `0` (fully drawn). The length comes from the DOM API `path.getTotalLength()` — measured, never guessed.

Works on anything with a stroke: `<path>`, `<circle>`, `<rect>`, `<line>`, `<polyline>`, `<polygon>`, `<ellipse>`.

## Recipe

```html
<!-- inside a standard scene clip -->
<svg class="logo-mark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path id="bar-left" d="M 60 40 L 60 160" />
  <path id="bar-right" d="M 140 40 L 140 160" />
  <path id="bar-mid" d="M 60 100 L 140 100" />
</svg>
```

```css
.logo-mark path {
  fill: none; /* outline-only draw — a fill would appear immediately and ruin the reveal */
  stroke: {accentColor};
  stroke-width: 12;
  stroke-linecap: round; /* softer endpoints */
  stroke-linejoin: round;
}
```

```js
// Setup: measure each path and set its dash pattern. Real measured geometry, not a magic number.
document.querySelectorAll(".logo-mark path").forEach((p) => {
  const len = p.getTotalLength();
  p.style.strokeDasharray = `${len}`;
  p.style.strokeDashoffset = `${len}`;
});

// Stagger draws so the eye reads continuous motion — each segment starts at
// ~70-80% of the previous segment's duration, before it finishes.
tl.to(
  "#bar-left",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_1_START,
);
tl.to(
  "#bar-right",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_2_START,
);
tl.to(
  "#bar-mid",
  { strokeDashoffset: 0, duration: FINAL_SEGMENT_DUR, ease: "power2.out" },
  SEG_3_START,
);

// Companion wordmark fades in only after the last stroke settles.
tl.to(
  ".brand-line",
  { opacity: 1, duration: BRAND_FADE_DUR, ease: "power1.out" },
  BRAND_FADE_START,
);
```

## Variations

- **Ring starting at 12 o'clock** — `<circle>` / `<rect>` strokes start at 3 o'clock by default; rotate the element `-90deg` so a progress ring draws from the top:

```html
<circle
  cx="100"
  cy="100"
  r="60"
  id="ring"
  style="transform-origin: 100px 100px; transform: rotate(-90deg)"
/>
```

- **Linear (constant-speed) draw** — `ease: "none"` for a steady-rate "real pen" trace.
- **Draw then fill** — for filled shapes, tween `fillOpacity: 0 → 1` AFTER the stroke completes (requires `fill-opacity: 0` initially and a real `fill` in CSS):

```js
tl.to(
  "#path",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_1_START,
);
tl.to(
  "#path",
  { fillOpacity: 1, duration: FILL_FADE_DUR, ease: "power1.out" },
  SEG_1_START + SEGMENT_DRAW_DUR,
);
```

## Values

| token             | range                                   | notes                                                                                              |
| ----------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| SEGMENT_DRAW_DUR  | 0.3–0.8s                                | fast snap vs deliberate pen trace; >~1s feels sluggish for a logo reveal                           |
| FINAL_SEGMENT_DUR | 60–80% of SEGMENT_DRAW_DUR              | proportional to segment length — a short connector at full duration reads slower than its siblings |
| SEG_N_START       | previous start + 70–80% of its duration | reads as continuous motion, not N isolated animations                                              |
| SEG_1_START       | 0–0.4s                                  | a small ~0.2s lead-in lets the viewer settle before motion                                         |
| BRAND_FADE_START  | ≥ last stroke end (+ ~0.2s beat)        | earlier and the wordmark competes with the draw                                                    |
| BRAND_FADE_DUR    | 0.3–0.8s                                | snap (urgent) vs glide (premium)                                                                   |

Ease families are discrete choices: **stroke draws** use `power2.out` (a hand lifting at end of stroke) or `none` for constant speed — never `back.out` / `elastic.out` (pens don't bounce). **Fades** use `power1.out`.

## Critical Constraints

- **`fill: none`** for outline-only draws — otherwise the fill appears immediately.
- **Dasharray/dashoffset = the measured `getTotalLength()`**, set at setup; requires the SVG in the DOM (inline SVG is fine; a loaded `<image>` SVG is not).
- **Complex paths**: if `getTotalLength()` looks wrong, overestimate slightly (`len * 1.05`) — too large is invisible at animation start; too small clips the end.
- **Stagger multi-path draws at ~70–80%** of the previous segment's duration.
- **A drawn line must land on something.** When the path is a connector (rail, beam, underline, callout) rather than a shape, both endpoints must sit on real elements and the draw must do a job — reveal, route, validate, or emphasize. A stroke that only decorates empty space reads as filler; attach it or cut it.

## See also

`svg-icon-enrichment` (internal parts animate after the outline draws) · `counting-dynamic-scale` (stroke draws an icon while a number counts up) · `hacker-flip-3d` (logo draws, wordmark decodes beneath).
