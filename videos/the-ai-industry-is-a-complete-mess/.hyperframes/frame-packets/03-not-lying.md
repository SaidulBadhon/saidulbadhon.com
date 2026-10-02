# Frame packet: 03-not-lying

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 3 — He isn't lying

- scene: On the paused-tape stage, the host's claim on a small card gets a red tick; then a white chart card where a green "মডেল" line rises and a pink "নিয়ন্ত্রণ" line falls across it — scissors — and three tags pop: এজেন্ট · টাকা · প্রোডাক্ট
- voiceover: "উনি মিথ্যা বলছেন না। এটাই সমস্যা। মডেলগুলো সত্যিই আগের চেয়ে ভালো। কিন্তু যারা এগুলো বানাচ্ছে, তাদের নিয়ন্ত্রণ কমছে — তিন জায়গায়। এজেন্ট। টাকা। আর প্রোডাক্ট।"
- duration: 14.812s
- transition_in: cut
- status: outline
- src: compositions/frames/03-not-lying.html
- type: product_intro
- persuasion: Concession that becomes the accusation + a simple visual model (scissors)
- beat: recognition → unease
- speaker: CHECKER
- chapter: আসল সমস্যা
- blueprint: compose
- focal: the scissors chart (capability up, control down)
- roles: paused-tape stage = background · claim card = supporting · white chart card with two lines = foreground subject · red tick, red circle at the crossing = foreground annotations · three tags = supporting payoff
- sfx: marker squeak ×2, pop ×3

narrativeRole: Lands the thesis by beat 3 — the ad isn't lying; the facts are the problem.
keyMessage: Models are getting better while the industry's control is slipping — agents, money, product.

Scene 1 (0.0–2.3s): the paused-tape stage is on screen from t=0. At 0.2s a small white card slides down at top-centre (x 30–70%, y 13–25%): a grey label "বিজ্ঞাপন বলছে" over "“এজেন্টরা 'না' শোনে না!”" (Inter 800). On "না।" (1.65s) the red marker draws a tick to its right and writes "সত্যি" (handwritten, red).
Scene 2 (2.3–3.6s): on "সমস্যা।" (2.67s) the red marker underlines "সত্যি" twice, fast.
Scene 3 (3.6–9.4s): on "মডেলগুলো" (3.65s) a large white chart card slides up (x 12–88%, y 30–82%, power3), label-pill "2024 → 2026" at its top-left, a thin grid, no numbers (it is a picture of the idea). From "সত্যিই" (4.28s) a thick green (#99E885, 3px black outline) line draws from lower-left to upper-right (svg-path-draw, ~1.4s); on "ভালো।" (5.83s) its end label "মডেল ↑" (Inter 900) pops.
Scene 4 (9.4–12.0s): on "নিয়ন্ত্রণ" (9.54s) a thick pink (#FE90E8, 3px black outline) line draws from upper-left to lower-right, crossing the green one; on "কমছে" (10.35s) its end label "নিয়ন্ত্রণ ↓" pops. On "তিন" (11.19s) the red marker circles the crossing point.
Scene 5 (12.0–14.812s): three white tags with a pink dot pop in a row along the card's bottom edge: "এজেন্ট" on "এজেন্ট।" (12.22s), "টাকা" on "টাকা।" (13.12s), "প্রোডাক্ট" on "প্রোডাক্ট।" (14.07s). Hold.

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
