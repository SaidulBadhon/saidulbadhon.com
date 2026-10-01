---
format: 1920x1080
duration: 169s
message: "ChatGPT Pro $200 is back at the same price with half the usage — its bulk discount is gone, while Claude Max 20x still gives 20x for $200."
arc: story-explainer with listicle — Hook (infomercial) → Freeze → Thesis → Title → Timeline → Concession → Unit price → Every plan the same → Claude comparison → "Models got cheaper" → Model math → $500 upsell → Why → What to do → Verdict → Outro → End card
audience: "Heavy ChatGPT / Codex users and AI-curious developers watching tech YouTube"
mode: autonomous
music: cheesy upbeat 90s late-night infomercial jingle, bright retro synth funk, game-show energy
voices: HOST = Ewan (HeyGen) over-the-top infomercial pitchman · CHECKER = Meredith (HeyGen) dry, deadpan fact-checker
---

# STORYBOARD — "But wait — there's LESS!"

This video tells heavy ChatGPT / Codex users that **ChatGPT Pro $200 came back at the same price
with half the usage, so its bulk discount is gone, while Claude Max 20x still gives 20x for $200.**

Two speakers, **one per frame**: a cheesy infomercial HOST sells the "all-new Pro $200"; a deadpan
fact-CHECKER keeps pausing the tape (freeze-frame, grayscale, red marker) and replacing the hype
with the real numbers from the post. Every number traces to the post or its chart data
(`capture/extracted/visible-text.txt`). Hard cuts between the two registers ARE the joke.

Hook strategy: **counterintuitive claim** delivered as an ad ("same great price… now with half the
usage!"). The thesis lands in beat 3 (the first fact-check), right after the freeze.

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

---

## Frame 1 — Cold open: the all-new Pro

- scene: Loud infomercial set — the "CHATGPT PRO" product box (a cartoon mascot with eyes) slams in, a $200 starburst pops, a "NOW WITH ½ THE USAGE!" banner slaps across
- voiceover: "Introducing the all-new ChatGPT Pro! Same great two-hundred-dollar price… now with HALF the usage!"
- duration: 6.452s
- transition_in: cut
- status: animated
- src: compositions/frames/01-cold-open.html
- type: hook
- persuasion: Counterintuitive claim + parody (the ad says the bad part out loud)
- beat: surprise + amusement
- speaker: HOST
- blueprint: kinetic-type-beats (Adapt)
- focal: the PRO box mascot
- roles: yellow ground + dot-grid + stripe-blocks = background · PRO box = foreground subject · "ALL NEW!" star-burst, "$200" star-burst, "AS SEEN AT DEVDAY" pill = supporting · "NOW WITH ½ THE USAGE!" banner = foreground payoff
- sfx: game show fanfare, sparkle shimmer

narrativeRole: Opens the curiosity gap with a joke that is literally true — an ad proudly announcing less.
keyMessage: Pro $200 is back at the same price, with half the usage.

Adapt: keep the escalating multi-beat statement landing a spring-pop payoff (sub-shape B); the
beats' payloads are props (box, star-burst, banner) rather than bare words. Final layout must match
frame 2's freeze: PRO box spanning x 16–42%, y 16–80% of the frame; "$200" star-burst centered at
(72%, 36%), ~30% of frame width; banner spanning x 20–84%, y 64–80%, tilted −5°.

Scene 1 (0.0–1.4s): yellow ground with a black dot-grid patch top-right and two tilted stripe-blocks (pink/black) bleeding off the left and bottom-right edges — on screen from t=0. On "all-new" (0.93s) a pink 10-point "ALL NEW!" star-burst spring-pops (playful overshoot) at the upper-left (around 12%, 14%), tilted −10°.
Scene 2 (1.4–2.9s): on "ChatGPT" (1.44s) the PRO box drops from above the frame and lands heavy at left-center (squash 0.94 → settle, `spring-pop-entrance`), pink band "CHATGPT PRO", "$200" on its face, contents gauge FULL. On "Pro!" (2.21s) a small white "AS SEEN AT DEVDAY" label-pill pops beside the box's top-right corner; the mascot blinks once at ~2.6s (eyes scaleY 1 → 0.1 → 1).
Scene 3 (2.9–4.8s): on "two-hundred-dollar" (3.57s) a big blue star-burst spring-pops at the right with "ONLY" (label) over "$200" (stat-number, number-wheel roll to 200) and "/MO" — the price lands by 4.2s.
Scene 4 (4.8–6.452s): on "HALF" (5.35s) the pink banner card "NOW WITH ½ THE USAGE!" slaps in from the right (fast `power3` arrival, tilted −5°, 4px border + 8px shadow) with "½" in a white box; in the same beat the box's contents gauge drains from 100% to 50% (`stat-bars-and-fills`) and the mascot's grin widens. Hold to the end (no exit).

## Frame 2 — Freeze

- scene: Record scratch — the infomercial set freezes, snaps to grayscale under a dark scrim, a VHS "⏸ PAUSE" readout appears and a "FACT CHECK" pill slams in; a red marker circles the "½"
- voiceover: ""
- duration: 1.4s
- transition_in: cut
- status: animated
- src: compositions/frames/02-freeze.html
- type: pain_point
- persuasion: Pattern interrupt (the fact-checker stops the tape)
- beat: puzzlement → focus
- speaker: none (silent)
- blueprint: compose
- focal: the frozen infomercial + the red circle on "½"
- roles: re-drawn frame-1 set (yellow ground, PRO box with gauge at 50%, "$200" star-burst, "NOW WITH ½ THE USAGE!" banner) = background · freeze scrim + scanlines = background overlay · "⏸ PAUSE" OSD + "FACT CHECK" pill = supporting · red marker circle = foreground subject
- sfx: record scratch

narrativeRole: Establishes the video's recurring device — every hype claim gets paused and checked.
keyMessage: Wait. Is that real?

Scene 1 (0.0–0.12s): frame 1's final composition, re-drawn statically in full color at exactly the frame-1 positions (PRO box x 16–42% / y 16–80% with gauge at 50% and a wide grin; "$200" blue star-burst centered (72%, 36%); pink banner x 20–84% / y 64–80% tilted −5° reading "NOW WITH ½ THE USAGE!"; yellow ground, dot-grid, stripe-blocks; "ALL NEW!" star-burst top-left).
Scene 2 (0.12–0.45s): FREEZE — hard set at 0.12s: the whole set wrapper goes grayscale (filter grayscale(0.9)) and punches in to scale 1.03; a `freeze` (#1B1B1F) scrim fades from 0 to 45% over 0.2s; scanlines appear; one VHS tracking band (a 70px white strip at ~7% opacity) sweeps top → bottom once; the "⏸ PAUSE" OSD hard-cuts on at top-left.
Scene 3 (0.45–1.4s): the white "FACT CHECK" label-pill drops into the top-right with a playful spring; from 0.6s the red marker draws a rough, slightly overshooting circle around the "½" on the banner (`svg-path-draw`, ~0.35s). Hold still to the end.

## Frame 3 — It's real

- scene: On the paused-tape stage, a white stat card: "20x" struck through by red marker → "10x" scribbled; "200" struck → "100"; a "−50%" badge
- voiceover: "He's not kidding. OpenAI just reopened its two-hundred-dollar Pro plan… and it now buys half as much. Codex usage: twenty times Plus — now ten. GPT-6 Pro messages: two hundred a week — now one hundred."
- duration: 14.106s
- transition_in: cut
- status: animated
- src: compositions/frames/03-its-real.html
- type: product_intro
- persuasion: Before/after + statistical proof
- beat: recognition + disbelief
- speaker: CHECKER
- blueprint: compose
- focal: the stat card with its two struck-and-rewritten numbers
- roles: paused-tape stage = background · white stat card = foreground subject · "REOPENED SEPT 30" chip, row labels = supporting · red strikes + handwritten 10x / 100 + "−50%" sticker = foreground annotations
- sfx: marker squeak, pop

narrativeRole: Lands the thesis by beat 3 — the joke was the actual deal, in hard numbers.
keyMessage: Same $200, half the usage: 20x Plus → 10x; 200 → 100 GPT-6 Pro messages a week.

Scene 1 (0.0–2.9s): the paused-tape stage (OSD, FACT CHECK pill, scanlines, ghost decor) is on screen from t=0. On "OpenAI" (1.28s) a large white card-elevated slides up into the center (x 14–86%, y 15–82%) on `power3`; a label-pill "CHATGPT PRO $200" opens its top-left. On "reopened" (2.35s) a green chip "REOPENED · SEPT 30" pops at the card's top-right.
Scene 2 (2.9–6.2s): the card headline builds per word (`dynamic-content-sequencing`): "SAME $200." on "two-hundred-dollar" (2.94s); "HALF THE USAGE." on "half" (5.16s). At 5.45s the red marker underlines "HALF" (`svg-path-draw`).
Scene 3 (6.2–9.4s): row 1 slides in under the headline — Space Grotesk label "CODEX + CHATGPT WORK USAGE" on "Codex" (6.23s); "20x" in black stat-number on "twenty" (7.34s) with a small "PLUS" suffix on "Plus" (8.11s). On "now" (8.53s) the red marker strikes through "20x"; on "ten" (8.75s) "10x" is written beside it in red Permanent Marker (clip-reveal left → right, ~0.35s).
Scene 4 (9.4–13.6s): row 2 slides in — label "GPT-6 PRO MESSAGES / WEEK" on "GPT-6" (9.52s); "200" on "two" (12.07s). On "now" (12.97s) the strike; on "one" (13.36s) "100" is written in red.
Scene 5 (13.6–14.106s): a pink "−50%" sticker (card-small, tilted +8°) spring-pops onto the card's right edge at 13.6s and holds.

## Frame 4 — Title: But wait… there's LESS!

- scene: The infomercial roars back — "BUT WAIT…" slams in, then "THERE'S LESS!" explodes over a starburst
- voiceover: "But wait… there's LESS!"
- duration: 1.776s
- transition_in: cut
- status: animated
- src: compositions/frames/04-title.html
- type: branding
- persuasion: Coined term / mnemonic (the video's title and running gag)
- beat: delight
- speaker: HOST
- blueprint: kinetic-type-beats (Reproduce)
- focal: "THERE'S LESS!"
- roles: pink ground + stripe-blocks + dot-grid = background · yellow star-burst = supporting · "BUT WAIT…" + "THERE'S LESS!" = foreground subject · "▶ PLAY" OSD = supporting
- sfx: orchestra hit

narrativeRole: The title card — names the running joke that frames everything after.
keyMessage: But wait — there's LESS.

Scene 1 (0.0–1.0s): pink ground with stripe-blocks bleeding off two corners; "▶ PLAY" OSD 0.0–0.5s. On "But" (0.27s) "BUT WAIT…" hard-cut flashes in at the upper-center (heading-lg, black, tilted −3°).
Scene 2 (1.0–1.776s): on "there's" (1.05s) a big yellow 10-point star-burst explodes behind center (scale 0 → 1, playful overshoot); on "LESS!" (1.28s) "THERE'S LESS!" slams in at heading-xl (`kinetic-beat-slam`) with "LESS!" inside a white card-elevated tilted +4°. Hold.

## Frame 5 — The tin

- scene: A timeline of three stations panned by camera: a tin can labeled "20x" ("does exactly what it says on the tin"), a "SIGN-UPS PAUSED" stamp, then DevDay — red marker crosses out the tin's 20x and writes 10x
- voiceover: "August thirtieth: OpenAI's Codex lead says twenty-x 'does exactly what it says on the tin.' September tenth: sign-ups paused — demand for its new model, Astra, is 'unprecedented.' Then DevDay. And the tin… now says ten-x."
- duration: 13.688s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/05-the-tin.html
- type: social_proof
- persuasion: Causal chain + callback (the tin quote turned literal)
- beat: momentum → irony
- speaker: CHECKER
- blueprint: spatial-pan-stations (Adapt)
- focal: the tin can
- roles: paused-tape stage = background (OSD + FACT CHECK pill stay fixed, outside the panning world) · timeline line + date callouts = supporting · tin can (stations 1 and 3) = foreground subject · quote cards, "SIGN-UPS PAUSED" stamp, "UNPRECEDENTED" chip = supporting · red strike + "10x" = foreground annotation
- sfx: whoosh, rubber stamp, whoosh, marker squeak

narrativeRole: Shows how fast it happened — one month from "exactly what it says on the tin" to half.
keyMessage: Aug 30 "exactly 20x" → Sept 10 paused for Astra demand → DevDay: 10x.

Adapt: keep the Hook-variant pan — evenly spaced stations on one horizontal timeline, the `.world`
camera pans LEFT station to station, each station gets a spring-popped date callout; landing held on
the last. Stations carry illustrations (the tin) and stamps rather than icons.

Scene 1 (0.0–5.45s): world = 3 viewport widths; a thin white timeline line runs at y ≈ 76% with three markers. Station 1 centered: the TIN CAN (SVG cylinder, ~38% of frame height: offwhite body, 4px black outline, elliptical rim lines, a white label band reading "PRO $200" small over a big "20x" in Inter 900) at left-center. On "August" (0.30s) the "AUG 30" callout box spring-pops above marker 1. On "OpenAI's" (1.20s) a small label-pill "OPENAI'S CODEX LEAD" appears to the right of the tin; on "twenty-x" (2.99s) the tin's "20x" pulses once (scale 1 → 1.08 → 1); from "does" (3.52s) to "tin." (4.91s) a white quote card builds per word: "“DOES EXACTLY WHAT IT SAYS ON THE TIN.”" (quote-text register, Inter 900 uppercase).
Scene 2 (5.45–10.55s): on "September" (5.59s) the camera pans LEFT to station 2 (ease-in-out ~0.6s, `viewport-change`); "SEPT 10" callout pops on "tenth" (5.97s). On "sign-ups" (6.61s) a big white stamp "SIGN-UPS PAUSED" (Inter 900, 4px border, tilted −8°) slams down from scale 1.4 → 1 with a tiny settle. On "demand" (7.47s) a label "DEMAND FOR ASTRA:" appears under it; on "unprecedented" (9.41s) a yellow quote chip "“UNPRECEDENTED”" pops.
Scene 3 (10.55–13.688s): on "Then DevDay" (10.62s) the camera pans LEFT to station 3; "DEVDAY · SEPT 28–29" callout pops on "DevDay" (10.79s). Station 3 holds the same tin can (identical drawing), with a small grey-on-white footnote card "“…HALF THE DOLLAR IN API SPEND.” — OPENAI" fading in at 11.0s. On "tin…" (11.95s) the camera eases slightly in toward the tin (scale 1 → 1.06); on "now" (12.46s) the red marker strikes through the label's "20x"; on "ten-x" (12.88s) "10x" is written in red Permanent Marker on the label. Hold.

## Frame 6 — Amazing extras!

- scene: Three bonus cards pop in on a blue infomercial set — "NO 5-HOUR LIMIT!", "$2,500 CREDIT!", "UNMETERED EXTRAS*!" — with a tiny asterisk footnote
- voiceover: "But look at these amazing extras! No five-hour limit! A twenty-five-hundred-dollar credit! And… unmetered extras!"
- duration: 7.628s
- transition_in: cut
- status: animated
- src: compositions/frames/06-extras.html
- type: feature_showcase
- persuasion: Rule of three (the sales pitch)
- beat: amusement + skepticism
- speaker: HOST
- blueprint: grid-card-assemble (Reproduce)
- focal: the three bonus cards
- roles: blue ground + dot-grid + stripe-block = background · "AMAZING EXTRAS!" heading + "BONUS!" star-burst = supporting · 3 bonus cards = foreground subject · asterisk footnote = supporting
- sfx: ding bell

narrativeRole: Gives OpenAI's side its due as the pitch — the real sweeteners, sold loudly.
keyMessage: OpenAI is offering no 5-hour cap, a $2,500 credit, and unnamed "extras".

Scene 1 (0.0–2.2s): blue ground, dot-grid top-left, a stripe-block bleeding off the right edge; "▶ PLAY" OSD 0.0–0.5s. On "look" (0.43s) a pink "BONUS!" star-burst pops upper-right; on "amazing" (0.93s) the heading "AMAZING EXTRAS!" slams in across the top (heading-lg, black) with a label-pill "LIMITED TIME" above it.
Scene 2 (2.2–3.4s): on "No" (2.25s) card 1 spring-pops into the left third (card-elevated, tilted −2°): a pastel icon-square with a black clock whose face reads "5H" crossed by a thick black slash, title "NO 5-HOUR LIMIT!" (card-title).
Scene 3 (3.4–5.1s): on "twenty-five-hundred-dollar" (3.57s) card 2 pops into the center (tilted +2°): icon-square with a stack of bills, title "$2,500 CREDIT!" — the 2,500 rolls in via number-wheel, landing by 4.6s.
Scene 4 (5.1–7.628s): on "And…" (5.16s) the right slot shows a dashed-outline placeholder with a big "?" that jitters once; on "unmetered" (6.44s) card 3 pops in over it (tilted −2°): a gift-box icon with a "?" on it, title "UNMETERED EXTRAS*!"; on "extras!" (6.90s) a tiny Space Grotesk footnote fades in at bottom-right (above y 880px): "*EXTRAS NOT SPECIFIED". Hold.

## Frame 7 — Fair is fair

- scene: Paused tape; the three bonus cards come back as a grading sheet — red marker ticks "NO 5-HOUR CAP: LEGIT", annotates the credit "EXISTING SUBS ONLY · OLD QUOTA ENDS OCT 29", scribbles "NEVER NAMED" on the extras; a final row slams: "OCT 30 → EVERYONE GETS 10x"
- voiceover: "Fair's fair: no five-hour cap is genuinely nice. The credit is real — but only for existing subscribers, and the old quota ends October twenty-ninth. The 'extras'? Never named. From October thirtieth, everyone gets ten-x."
- duration: 13.793s
- transition_in: cut
- status: animated
- src: compositions/frames/07-fair-is-fair.html
- type: benefit_highlight
- persuasion: Concession + counterexample (credit where due, then the catch)
- beat: fairness → resolve
- speaker: CHECKER
- blueprint: agent-progress-theater (Adapt)
- focal: the graded checklist card
- roles: paused-tape stage = background · white checklist card = foreground subject · red ticks / notes / scribble = foreground annotations · pink "OCT 30" banner row = foreground payoff
- sfx: marker squeak, marker squeak, marker squeak, stamp thud

narrativeRole: Keeps the video honest — concedes the real wins before the catch.
keyMessage: The sweeteners are real but temporary; from Oct 30 everyone is on 10x.

Adapt: keep the receipt card whose rows cascade in and CHANGE STATE (the signature); the state
mutation is done by the red marker (ticks, notes, a "?" scribble) instead of badges flipping.
No loaders, no trigger beat — the card IS the receipt.

Scene 1 (0.0–1.1s): paused-tape stage from t=0. On "Fair's" (0.26s) a white card-elevated slides up center-left (x 10–74%, y 14–80%) headed by a label-pill "THE FINE PRINT".
Scene 2 (1.1–3.9s): on "no" (1.15s) row 1 slides up into the card: "NO 5-HOUR CAP" (card-title). On "genuinely" (2.56s) a red check mark draws beside it; on "nice." (3.20s) red handwriting "LEGIT" appears to its right.
Scene 3 (3.9–9.3s): on "The credit" (3.92s) row 2: "$2,500 CREDIT". On "real" (4.48s) a red check; on "only" (4.99s) red handwriting "EXISTING SUBS ONLY" writes in below the row; on "quota" (7.25s) a red arrow draws to a second note "OLD QUOTA ENDS OCT 29".
Scene 4 (9.3–11.3s): on "extras" (9.43s) row 3: "UNMETERED EXTRAS"; a red "?" scribble draws at 9.7s; on "Never" (10.28s) red handwriting "NEVER NAMED".
Scene 5 (11.3–13.793s): on "From" (11.35s) a pink banner row (card-elevated, tilted −2°) slams in across the card bottom and overhangs its right edge: "OCT 30 → EVERYONE GETS" + "10x" in a white box (heading-md); on "ten-x" (13.06s) the "10x" box gives one hard jolt (x ±6px, finite). Hold.

## Frame 8 — The unit price

- scene: A supermarket shelf on the paused-tape stage: a small "PLUS $20" box and a big "PRO $200 (OLD)" box, each with a shelf tag; the unit prices tick in with a scanner beep — "$20 / 1x" and "$10 / 1x" — and red marker circles $10: "HALF PRICE"
- voiceover: "Now read it like a supermarket shelf tag. Plus: twenty dollars for one-x of usage — twenty a unit. The old Pro: two hundred for twenty-x. Ten a unit. Half price. That was the whole point."
- duration: 12.042s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/08-unit-price.html
- type: feature_showcase
- persuasion: Analogy (shelf unit price) + worked example with real numbers
- beat: comprehension + "aha"
- speaker: CHECKER
- blueprint: compose
- focal: the two shelf tags' unit prices
- roles: paused-tape stage = background · shelf plank = supporting · PLUS box + OLD PRO box = supporting · two shelf tags = foreground subject · "UNIT PRICE = PRICE ÷ USAGE" chip = supporting · red circle + "HALF PRICE!" = foreground annotation
- sfx: barcode scanner beep, barcode scanner beep, marker squeak

narrativeRole: Teaches the one concept that makes the cut matter — price per unit of usage.
keyMessage: Old Pro $200 = $10 per 1x of Plus, half the price of Plus's $20 per 1x.

Scene 1 (0.0–2.25s): paused-tape stage. On "Now" (0.30s) the shelf plank slides in from the left across the frame at y ≈ 60–66%. On "shelf" (1.45s) a white chip "UNIT PRICE = PRICE ÷ USAGE" pops at the top-center (label + Inter 800).
Scene 2 (2.25–6.4s): on "Plus:" (2.30s) a small PLUS box (blue band "PLUS", "$20", face with a neutral smile, gauge full) drops onto the left side of the plank (x ≈ 22%). On "twenty" (2.99s) its tag swings down from the plank edge (rotate −12° → 0, `power3`): "$20/MO · 1x PLUS". On "twenty a unit" (5.25s) a thin red laser line sweeps across the tag once and the big unit price "$20 / 1x" rolls in (number-wheel).
Scene 3 (6.4–10.8s): on "The old Pro" (6.53s) a BIG OLD PRO box (pink band "PRO $200", gauge full, grin, a small "OLD" sticker) drops onto the right side of the plank (x ≈ 66%), visibly ~1.6× the Plus box. On "two hundred" (7.34s) its tag swings down: "$200/MO · 20x PLUS". On "Ten" (8.83s) laser sweep + "$10 / 1x" rolls in. On "Half" (9.77s) the red marker circles "$10"; on "price." (10.03s) red handwriting "HALF PRICE!" writes beside it.
Scene 4 (10.8–12.042s): on "whole point" (11.44s) the marker double-underlines "HALF PRICE!". Hold still (a deliberate held read).

## Frame 9 — Same as Plus!

- scene: Back on the infomercial set: the NEW Pro box (contents gauge at half) sits on the shelf; its tag rolls from $10 to $20; a "SAME AS PLUS!" starburst pops… then droops on "deal?"
- voiceover: "And the new Pro? Just twenty dollars a unit! The same as Plus! What a… deal?"
- duration: 6.269s
- transition_in: cut
- status: animated
- src: compositions/frames/09-same-as-plus.html
- type: pain_point
- persuasion: Callback (the shelf tag) + deflation gag
- beat: amusement → unease
- speaker: HOST
- blueprint: compose
- focal: the NEW PRO shelf tag rolling to $20
- roles: green ground + stripe-block + dot-grid = background · shelf plank = supporting · NEW PRO box = foreground subject · its shelf tag = foreground subject · "SAME AS PLUS!" star-burst = foreground payoff · small PLUS reference tag = supporting
- sfx: barcode scanner beep, sad trombone

narrativeRole: The host accidentally sells the bad news — the discount is gone.
keyMessage: New Pro $200 = $20 per 1x, exactly the same as Plus.

Scene 1 (0.0–1.45s): green ground, dot-grid, a stripe-block off the top edge; the shelf plank at y ≈ 60–66%; "▶ PLAY" OSD 0.0–0.5s. On "new" (0.50s) the NEW PRO box (pink band "PRO $200", a "10x" sticker, gauge at HALF, big grin) slides in onto the plank at x ≈ 36%; on "Pro?" (0.62s) a yellow "NEW!" star-burst pops at its top-left corner.
Scene 2 (1.45–3.1s): its shelf tag hangs below, showing "UNIT PRICE $10 / 1x"; on "twenty" (1.71s) the unit price rolls $10 → $20 (number-wheel, double spin) and lands on "unit!" (2.52s).
Scene 3 (3.1–4.5s): on "same" (3.30s) a big yellow star-burst "SAME AS PLUS!" spring-pops (playful overshoot) at the right (≈ 72%, 36%); on "Plus!" (3.65s) a small reference tag "PLUS · $20 / 1x" slides in under it.
Scene 4 (4.5–6.269s): on "What" (4.54s) everything stops dead; from 4.9s the "SAME AS PLUS!" star-burst droops — rotates ~+22° and sags down ~40px on a slow `power2.in` (gravity, no bounce); on "deal?" (5.55s) its "!" hard-swaps to "?" and the box's grin flattens to a straight line. Hold.

## Frame 10 — Every plan, twenty dollars

- scene: Bar chart "PRICE PER 1x OF PLUS" — Plus, Pro $100, Pro $200, Pro $500; before (blue) vs. after (pink); Pro $200 doubles from $10 to $20; red marker rules a flat line across every bar at $20: "ALL $20"
- voiceover: "Every ChatGPT plan now costs twenty dollars a unit. Plus. Pro one hundred. Pro two hundred. Even the brand-new five-hundred-dollar plan. No bulk discount. Anywhere."
- duration: 11.416s
- transition_in: cut
- status: animated
- src: compositions/frames/10-every-plan.html
- type: social_proof
- persuasion: Statistical proof + enumeration
- beat: conviction
- speaker: CHECKER
- blueprint: compose
- focal: the grouped bar chart
- roles: paused-tape stage = background · white chart card = foreground subject · bars (blue = until Oct 29, pink = from Oct 30) = foreground subject · axis, legend, "DOUBLED" tag, "NEW" chip = supporting · red flat line + "ALL $20" + "NO BULK DISCOUNT" stamp = foreground annotations
- sfx: marker squeak, stamp thud

narrativeRole: Generalizes the shelf tag to the whole lineup — no plan rewards paying more.
keyMessage: Every ChatGPT plan now costs $20 per 1x of Plus; Pro $200 doubled from $10.

Data (from the post's chart file — exact): Plus before $20, after $20 · Pro $100 before $20, after $20 · Pro $200 before $10, after $20 · Pro $500 before — (didn't exist), after $20. Y axis $0–$25, ticks $0 / $10 / $20.

Scene 1 (0.0–3.7s): paused-tape stage. On "Every" (0.30s) a wide white chart card slides up (x 8–92%, y 14–84%) with a label-pill title "PRICE PER 1x OF PLUS USAGE". On "plan" (1.36s) the y-axis and baseline draw (`svg-path-draw`) with tick labels; on "twenty" (2.39s) a dotted guide line appears at $20. On "unit." (3.12s) legend chips pop: blue "UNTIL OCT 29", pink "FROM OCT 30".
Scene 2 (3.7–6.9s): bars grow from the baseline on cue (`stat-bars-and-fills`, `power3`), each group's category label beneath: "PLUS" on "Plus." (3.75s) — blue $20 + pink $20; "PRO $100" on "Pro one hundred" (4.61s) — $20 + $20; "PRO $200" on "Pro two hundred" (5.80s) — the blue bar grows only to $10, then (6.36s) the pink bar grows to $20 and a pink "DOUBLED" tag pops above it. Value labels sit on each bar top.
Scene 3 (6.9–9.4s): on "brand-new" (7.47s) the "PRO $500" group appears with only a pink $20 bar and a small "NEW" chip; a grey "—" marks the missing before-bar.
Scene 4 (9.4–11.416s): on "No" (9.43s) the red marker draws one ruler-straight line across the tops of all four pink bars at $20; on "discount." (9.98s) red handwriting "ALL $20" at its right end; on "Anywhere." (10.75s) a white stamp "NO BULK DISCOUNT" (Inter 900, 4px border, tilted −6°) slams onto the upper-right of the card. Hold.

## Frame 11 — One shelf over

- scene: The camera pans one shelf over to a full "CLAUDE MAX 20x" box at the same $200 — tag "$10 / 1x"; two "LIMITS RAISED" stickers (MAY 6, SEPT 22); a fine-print caveat
- voiceover: "Meanwhile, one shelf over: Claude Max twenty-x. Same two hundred dollars. Still twenty-x. Still ten a unit. Different base plans, sure — but Anthropic raised its limits twice this year."
- duration: 12.304s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/11-one-shelf-over.html
- type: social_proof
- persuasion: Comparison of two options + honest caveat
- beat: contrast + conviction
- speaker: CHECKER
- blueprint: comparison-split (Adapt)
- focal: the two $200 products side by side
- roles: paused-tape stage = background · shelf plank = supporting · NEW PRO box card (left) + CLAUDE MAX 20x box card (right) = foreground subject · inner-edge badges / unit-price tags = supporting · caveat footnote = supporting · "LIMITS ↑" stickers = supporting
- sfx: whoosh, barcode scanner beep, pop, pop

narrativeRole: Shows the alternative at the same price didn't get cut — it got better.
keyMessage: For the same $200, Claude Max 20x still gives 20x ($10 per 1x), and its limits went up twice this year.

Adapt: keep the split-tilt signature — two equal product cards enter from opposite wings with
mirrored book-open rotateY tilts and tilt-matched outward shadows, then inner-edge badges pop. The
cards are the two $200 products sitting on the shared shelf; the pan before them is the "one shelf
over" beat.

Scene 1 (0.0–2.25s): paused-tape stage. On "Meanwhile" (0.30s) a shelf plank enters and slides from right to left across the lower frame (y ≈ 64–70%) like a camera tracking one shelf over (~1.3s, ease-in-out); a white aisle sign "AISLE 2: $200 PLANS" swings in at top-center on "shelf" (1.41s).
Scene 2 (2.25–5.3s): on "Claude" (2.30s) the split-tilt entry: LEFT card = the NEW PRO box (pink band "CHATGPT PRO", gauge HALF, "10x" on its face) from the left wing; RIGHT card = the CLAUDE MAX box (green band "CLAUDE MAX", gauge FULL, "20x" on its face, a calm smile) from the right wing ~0.2s later; both land standing on the plank (left x ≈ 30%, right x ≈ 70%). On "two hundred" (4.31s) identical white price tags "$200/MO" drop under both.
Scene 3 (5.3–8.0s): on "Still twenty-x" (5.72s) a green inner-edge badge "STILL 20x" spring-pops on the Claude card's left edge; on "ten a unit" (6.87s) the Claude tag's unit price "$10 / 1x" rolls in with a laser sweep, while the ChatGPT tag shows "$20 / 1x" (revealed at the same moment, dimmed to 70%).
Scene 4 (8.0–10.0s): on "Different" (8.11s) a fine-print footnote fades up beneath the shelf (above y 880px), Space Grotesk ~1.2cqw white: "*EACH VS. ITS OWN $20 PLAN — COMPARE THE DIRECTION, NOT THE EXACT AMOUNT".
Scene 5 (10.0–12.304s): on "raised" (10.62s) a green sticker "LIMITS ↑ MAY 6" pops on the Claude card's upper-right (tilted +8°); on "twice" (11.35s) a second sticker "LIMITS ↑ SEPT 22" pops just below it (tilted −6°). Hold.

## Frame 12 — The models got cheaper!

- scene: Cream infomercial set: "MODELS NOW 50% OFF!" sale starburst, a cheesy equation "½ $ × ½ PRICE = SAME!", then a nervous "…?" beat
- voiceover: "But wait! The models got CHEAPER! So half the dollars buys just as much! …Right?"
- duration: 4.598s
- transition_in: cut
- status: animated
- src: compositions/frames/12-models-cheaper.html
- type: pain_point
- persuasion: Common belief (OpenAI's defence) set up for testing
- beat: hope → doubt
- speaker: HOST
- blueprint: kinetic-type-beats (Adapt)
- focal: the "MODELS NOW 50% OFF!" star-burst, then the equation
- roles: cream ground + stripe-blocks = background · "BUT WAIT!" = supporting · sale star-burst = foreground subject · equation cards = foreground payoff · "?" = payoff
- sfx: cash register ka-ching, crickets chirping

narrativeRole: Voices OpenAI's actual argument so the next frame can test it.
keyMessage: OpenAI says cheaper models make up for half the allowance.

Adapt: escalation sub-shape — beats land one after another and resolve on a payoff; the payoff is
then undercut by a single hard token swap ("!" → "?"), the fixed-line swap used as the joke.

Scene 1 (0.0–0.97s): cream ground, two stripe-blocks; "▶ PLAY" OSD 0.0–0.5s. On "wait!" (0.43s) "BUT WAIT!" flashes in at the top-left (heading-md, tilted −4°).
Scene 2 (0.97–2.17s): on "CHEAPER!" (1.47s) a big pink 10-point sale star-burst spring-pops at the upper-center: "MODELS NOW" (label) / "50% OFF!" (stat-number).
Scene 3 (2.17–3.8s): the equation builds per term in a row of white card-small tiles across the lower-middle: "½ $" on "half" (2.33s), "×" + "½ PRICE" on "buys" (2.83s), "= SAME!" on "as much!" (3.26s) — "SAME!" in a yellow tile.
Scene 4 (3.8–4.598s): on "Right?" (3.85s) everything freezes; the "!" in "SAME!" hard-swaps to "?" and a small white "?" speech-bubble pops beside the star-burst. Hold dead still.

## Frame 13 — The model math

- scene: Horizontal bar chart "TOKENS YOU GET vs. THE OLD PRO $200" with a 100% line: GPT-6 Sol 100% (BREAK EVEN), GPT-6 Luna output 120% (+20%), GPT-6 Astra 50%, GPT-5.6 Sol 50%; red marker circles Astra with "← THE ONE YOU PAID FOR"
- voiceover: "Partly. GPT-6 Sol is half price, so Sol users roughly break even. Luna users even get about twenty percent more output. But Astra didn't get cheaper. Astra users get half. And Astra is why most people bought Pro two hundred."
- duration: 13.845s
- transition_in: cut
- status: animated
- src: compositions/frames/13-model-math.html
- type: feature_showcase
- persuasion: Counterexample (here is when it breaks) + worked example
- beat: fascination → unease
- speaker: CHECKER
- blueprint: compose
- focal: the horizontal bar chart (Astra's half bar)
- roles: paused-tape stage = background · white chart card = foreground subject · pink bars = foreground subject · 100% "NO CHANGE" line, price details, tags = supporting · red circle + note = foreground annotation
- sfx: marker squeak

narrativeRole: Tests the defence model by model — it holds for Sol, fails for Astra.
keyMessage: Sol ≈ break even, Luna +20%, but Astra — the reason people bought Pro $200 — gets half.

Data (the post's own arithmetic — exact): GPT-6 Sol 100% ($2 / $10, down from GPT-5.6 Sol's $4 / $20) · GPT-6 Luna, output 120% ($0.50, down from $1.20) · GPT-6 Astra 50% ($10 / $50, unchanged) · GPT-5.6 Sol 50% ($4 / $20, still on sale). X axis 0–130%.

Scene 1 (0.0–1.15s): paused-tape stage. On "Partly." (0.30s) a wide white chart card slides up (x 8–92%, y 13–84%) with a label-pill "TOKENS YOU GET vs. THE OLD PRO $200"; at 0.7s a vertical dashed line draws at 100% labeled "NO CHANGE".
Scene 2 (1.15–5.3s): on "GPT-6" (1.15s) row 1 label "GPT-6 SOL" with small grey detail "$2 / $10 ← $4 / $20"; on "half price" (2.52s) its pink bar grows to 100%; on "break" (4.52s) a tag "BREAK EVEN" pops at the bar end.
Scene 3 (5.3–7.95s): on "Luna" (5.33s) row 2 "GPT-6 LUNA · OUTPUT" ("$0.50 ← $1.20"); on "twenty percent" (6.49s) its bar grows to 120% (past the 100% line) and a green tag "+20%" pops.
Scene 4 (7.95–11.2s): on "Astra" (8.11s) row 3 "GPT-6 ASTRA" ("$10 / $50 · UNCHANGED"); on "half" (10.45s) its bar grows only to 50% and a pink tag "HALF" pops; at the same moment row 4 "GPT-5.6 SOL" ("$4 / $20 · STILL ON SALE") fills to 50%, dimmed to 60% (supporting).
Scene 5 (11.2–13.845s): on "And Astra" (11.39s) the red marker circles the Astra row; on "most people" (12.16s) a red arrow draws from the right margin to the circle with handwriting "THE ONE YOU PAID FOR". Hold.

## Frame 14 — Pro $500!

- scene: A GIANT "PRO $500" box crashes in and shoves the little $200 box off-frame; "25x!" and "ULTRAFAST!" starbursts with speed lines; a yellow "CALL NOW" button presses
- voiceover: "Still not enough? Upgrade to the all-new Pro five hundred! Twenty-five-x! Ultrafast speed! Call now!"
- duration: 5.825s
- transition_in: cut
- status: animated
- src: compositions/frames/14-pro-500.html
- type: feature_showcase
- persuasion: Upsell parody
- beat: escalation + amusement
- speaker: HOST
- blueprint: ticker-takeover (Adapt)
- focal: the giant PRO $500 box
- roles: pink ground + speed lines + stripe-block = background · small PRO $200 box = supporting (gets shoved) · giant PRO $500 box = foreground subject · "25x!" star-burst, "ULTRAFAST!" streak, "CALL NOW" button = supporting
- sfx: whoosh, heavy impact, telephone ring

narrativeRole: The upsell — the new top tier OpenAI launched alongside the cut.
keyMessage: There is a new $500 plan: 25x, with Ultrafast speed.

Adapt: keep the collision — the hero crashes in from off-screen and physically SHOVES the existing
element aside (`reactive-displacement`), landing heavy; the "text group" being shoved is the small
PRO $200 box and its "NOT ENOUGH?" pill. No typewriter lead-in.

Scene 1 (0.0–1.24s): pink ground, a stripe-block; "▶ PLAY" OSD 0.0–0.5s. The small PRO $200 box (pink band, gauge half) sits at center from t=0; on "enough?" (0.66s) a white label-pill "NOT ENOUGH?" pops above it.
Scene 2 (1.24–3.2s): on "Upgrade" (1.24s) horizontal black speed lines streak in from the right; on "Pro" (2.21s) a GIANT PRO $500 box (yellow band "PRO $500", ~1.7× the small box, a confident grin, gauge FULL, "$500" on its face) crashes in from off-screen right with `motion-blur-streak` and SHOVES the small box + pill off the left edge (they are displaced, tumbling −15°); the big box lands heavy at center-left on "hundred!" (2.72s).
Scene 3 (3.2–5.0s): on "Twenty-five-x!" (3.22s) a blue star-burst "25x!" spring-pops upper-right; on "Ultrafast" (4.11s) "ULTRAFAST!" whips in under it with a motion-blur streak (heading-lg, tilted −4°) and a tiny Space Grotesk line "UP TO 300 TOKENS/SEC IN CODEX*".
Scene 4 (5.0–5.825s): on "Call" (5.08s) a yellow button-primary "CALL NOW" pops lower-right and presses (`press-release-spring`) on "now!" (5.31s). Hold.

## Frame 15 — Why do this?

- scene: Paused tape: the $500 shelf tag reads "$20 / 1x" — red marker: "= SPEED, NOT VALUE"; then "CAPACITY" in huge type beside an overheating GPU rack with an "UNPRECEDENTED" quote chip; a "SIGN-UPS: CLOSED" sign flips to "OPEN" while "2× GPUs" gets crossed out
- voiceover: "Also twenty dollars a unit. You're buying speed, not value. So why do this? Capacity. Astra demand was 'unprecedented,' and halving the allowance reopens sign-ups without buying twice the GPUs."
- duration: 12.539s
- transition_in: cut
- status: animated
- src: compositions/frames/15-why.html
- type: benefit_highlight
- persuasion: Causal chain (demand → capacity → halve the allowance → reopen)
- beat: clarity
- speaker: CHECKER
- blueprint: compose
- focal: the PRO $500 shelf tag (Scene 1) → "CAPACITY" + the GPU rack (Scenes 2–4)
- roles: paused-tape stage = background · shelf tag = foreground subject (S1) · "CAPACITY" hero word + GPU rack illustration = foreground subject (S2–4) · "UNPRECEDENTED" chip, "ALLOWANCE ÷ 2" chip, door sign = supporting · red underline, note, strike = foreground annotations
- sfx: marker squeak, sign flip, marker squeak

narrativeRole: Explains the motive — a capacity decision, reasonable for OpenAI, bad for subscribers.
keyMessage: Pro $500 is also $20 per 1x; OpenAI halved the plan because it ran out of capacity.

Scene 1 (0.0–4.4s): paused-tape stage. On "Also" (0.26s) a large shelf tag (white card-small, hanging from a short plank stub) swings in at center-left: "PRO $500 · $500/MO · 25x PLUS"; on "twenty" (0.64s) its unit price "$20 / 1x" rolls in; on "unit." (1.28s) the red marker underlines it; on "buying speed" (2.22s) red handwriting "= SPEED," writes, and on "not value." (3.20s) "NOT VALUE" completes it beneath.
Scene 2 (4.4–6.5s): on "So why" (4.48s) the tag + notes scale-swap away to the upper-left corner at 40% size (`scale-swap-transition`); on "Capacity." (5.55s) "CAPACITY." slams in at the top-center (heading-xl, white).
Scene 3 (6.5–8.7s): on "Astra" (6.61s) a GPU rack illustration rises in at the lower-left (SVG: a black-outlined white cabinet with 4 stacked server units, each with a row of small yellow LED squares, and three wavy black heat lines rising from the top that draw on with `svg-path-draw`); on "unprecedented" (7.59s) a yellow quote chip "“UNPRECEDENTED” DEMAND" pops beside it.
Scene 4 (8.7–12.539s): on "halving" (8.92s) a pink chip "ALLOWANCE ÷ 2" pops at center-right; on "reopens sign-ups" (9.86s) a hanging door sign "SIGN-UPS: CLOSED" flips on its Y axis (3D card flip, ~0.4s) to "SIGN-UPS: OPEN" (green); on "twice" (11.22s) a white chip "2× GPUs" pops under it and on "GPUs." (11.69s) the red marker strikes it through. Hold.

## Frame 16 — What to do

- scene: A decision card "IF YOU MOSTLY USE… → DO THIS" with three rows arriving on cue: GPT-6 SOL → RELAX · ASTRA / GPT-6 PRO → SPEND THE OLD QUOTA + CREDIT, THEN DECIDE · HEAVY CODEX → TRY CLAUDE MAX 20x FOR A MONTH
- voiceover: "So what do you do? Mostly on GPT-6 Sol? Relax. Rely on Astra or GPT-6 Pro? You're losing half — use up the old quota and the credit, then decide. Heavy Codex user? Try Claude Max twenty-x for a month."
- duration: 13.636s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/16-what-to-do.html
- type: cta
- persuasion: Frame-then-fill + numbered enumeration
- beat: resolve
- speaker: CHECKER
- blueprint: grid-card-assemble (Reproduce)
- focal: the three-row decision card
- roles: paused-tape stage = background · white decision card = foreground subject · row pills + action text + status chips = foreground subject · column headers = supporting
- sfx: pop, pop, pop

narrativeRole: Turns the analysis into action for each kind of subscriber.
keyMessage: Sol users: fine. Astra users: spend the old quota, then decide. Heavy Codex: try Claude Max 20x.

Reproduce: Benefits vertical-list, BUILD sub-mode — each row enters with a marker spring-pop
(the row number in a pastel square), a check/icon draw-in, and a pill mask-wipe of its action text;
rows accumulate and stay lit.

Scene 1 (0.0–1.24s): paused-tape stage. On "So what" (0.30s) a wide white card-elevated slides up (x 7–93%, y 12–84%): label-pill "WHAT TO DO", and two column headers in Space Grotesk — "IF YOU MOSTLY USE…" (left 38%) and "DO THIS" (right 62%).
Scene 2 (1.24–3.97s): on "Mostly" (1.24s) row 1 number square "1" (green) pops; on "GPT-6 Sol?" (1.75s) the left pill "GPT-6 SOL" mask-wipes in; on "Relax." (3.20s) the right action "RELAX — YOU'LL BARELY NOTICE" mask-wipes in with a green chip "≈ SAME".
Scene 3 (3.97–10.24s): on "Rely" (3.97s) row 2 square "2" (yellow) pops; on "Astra or GPT-6 Pro?" (4.35s) left pill "ASTRA / GPT-6 PRO"; on "losing half" (6.61s) a pink chip "−50%" pops at the pill's end; on "use up" (7.17s) the action "USE THE OLD QUOTA (TO OCT 29) + THE $2,500 CREDIT" mask-wipes in, and on "then decide" (9.00s) a second line "…THEN DECIDE".
Scene 4 (10.24–13.636s): on "Heavy" (10.24s) row 3 square "3" (pink) pops; on "Codex user?" (10.50s) left pill "HEAVY CODEX USE"; on "Try Claude Max" (11.48s) the action "TRY CLAUDE MAX 20x FOR A MONTH" mask-wipes in with a green chip "SAME $200" on "month." (13.18s). Hold.

## Frame 17 — The verdict

- scene: Inverted black closing plate: "NAME ✓  PRICE ✓  PLAN ✗" (red marker X); then a "BEST VALUE IN AI CODING" award ribbon whose "OPENAI" name plate drops off on "doesn't"
- voiceover: "OpenAI brought back the name and the price. Just not the plan. The best subscription in AI coding used to have OpenAI's name on it. Today… it doesn't."
- duration: 9.064s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/17-verdict.html
- type: branding
- persuasion: Distillation + callback
- beat: inevitability
- speaker: CHECKER
- blueprint: kinetic-type-beats (Adapt)
- focal: the checklist → the award ribbon and its falling name plate
- roles: black ground = background · close-frame (white 4px border + 12px yellow shadow) = foreground container · checklist rows = foreground subject (S1–2) · award rosette + name plate = foreground subject (S3–4) · red X = foreground annotation
- sfx: marker squeak, metal clang

narrativeRole: Lands the thesis as one line the viewer can repeat.
keyMessage: Same name, same price, not the same plan — the best value in AI coding is no longer OpenAI's.

Adapt: CTA beat-chain — 2 message beats, each with its own kinetic gag (the X, the falling plate),
inside BlockFrame's inverted closing plate. No logo.

Scene 1 (0.0–2.9s): black ground; the close-frame (white 4px border, 12px yellow hard shadow, x 18–82%, y 14–80%) is present from t=0 with a white label-pill "THE VERDICT". On "name" (1.36s) row "THE NAME" (close-title, white) + a white check ✓ draws; on "price." (2.22s) row "THE PRICE" + ✓.
Scene 2 (2.9–4.2s): on "plan." (3.50s) row "THE PLAN" appears and the red marker draws a big X over the space where its check would be (two strokes, ~0.3s).
Scene 3 (4.2–7.6s): on "The best" (4.27s) the three rows scale-swap out (shrink + fade toward the top) and a yellow 10-point award rosette with two black-bordered ribbon tails springs in at center: "BEST VALUE" (Inter 900) over "IN AI CODING" (label); on "OpenAI's" (6.49s) a white name plate "OPENAI" (card-small) drops in on two small hooks below the rosette and settles.
Scene 4 (7.6–9.064s): on "Today…" (7.72s) the plate's left hook releases — the plate swings down, pivoting on its right hook (smooth pendulum, `power2.inOut`); on "doesn't." (8.53s) it drops straight out of frame (`power3.in`), leaving two empty hooks. Hold.

## Frame 18 — Outro: now with less!

- scene: The infomercial resumes one last time: the half-empty mascot box, "PRO $200 — NOW WITH LESS!" banner, a super-fast fine-print crawl, and a "SOURCES ↓ IN THE DESCRIPTION" pill
- voiceover: "ChatGPT Pro two hundred! Now with less! Terms and conditions apply. Sources in the description!"
- duration: 5.747s
- transition_in: cut
- status: animated
- src: compositions/frames/18-outro.html
- type: cta
- persuasion: Callback (the title gag) + fast-disclaimer parody
- beat: delight
- speaker: HOST
- blueprint: kinetic-type-beats (Adapt)
- focal: the "NOW WITH LESS!" banner
- roles: yellow ground + dot-grid + stripe-blocks = background · PRO box (gauge half) = supporting · "$200" star-burst = supporting · banner = foreground subject · fine-print crawl = supporting · sources pill = foreground payoff
- sfx: game show fanfare

narrativeRole: Ends on the laugh and points to the full write-up and sources.
keyMessage: Now with less — sources and the full breakdown are in the description.

Adapt: CTA kinetic-type — the closing line snaps in beat by beat and lands on the "sources" pill.

Scene 1 (0.0–2.2s): yellow ground, dot-grid, stripe-blocks; "▶ PLAY" OSD 0.0–0.5s. On "ChatGPT" (0.27s) the PRO box (pink band, gauge HALF, big grin) drops in at left-center (x 14–40%); on "hundred!" (1.47s) a blue "$200" star-burst pops at upper-right.
Scene 2 (2.2–3.3s): on "Now" (2.21s) a pink banner "NOW WITH LESS!" slaps across the middle-right (heading-lg, tilted −5°, 4px border, 8px shadow); on "less!" (2.64s) the mascot winks (one eye scaleY 1 → 0.1 → 1) and its gauge stays at HALF.
Scene 3 (3.3–4.6s): on "Terms" (3.34s) a single-line fine-print crawl (Space Grotesk 600, ~0.9cqw, black on a white strip with 3px borders) zips right-to-left across y ≈ 78% fast (linear, ~1.3s for its full length): "*TERMS AND CONDITIONS APPLY · 10x PLUS FROM OCT 30 · $20 PER 1x · GPT-6 PRO 100/WEEK · EXTRAS UNSPECIFIED · NO BULK DISCOUNT · SAME $200".
Scene 4 (4.6–5.747s): on "Sources" (4.62s) a white label-pill "FULL BREAKDOWN + SOURCES ↓ IN THE DESCRIPTION" spring-pops under the banner. Hold.

## Frame 19 — End card

- scene: Black closing plate: "FULL BREAKDOWN + SOURCES" with the blog post title and saidulbadhon.com
- voiceover: ""
- duration: 3.0s
- transition_in: cut
- status: animated
- src: compositions/frames/19-end-card.html
- type: cta
- persuasion: Distillation (where to read more)
- beat: satisfaction
- speaker: none (silent)
- blueprint: kinetic-type-beats (Adapt)
- focal: the URL
- roles: black ground = background · close-frame (white border, 12px yellow shadow) = foreground container · post title + URL = foreground subject · pink star-burst = supporting
- sfx: chime

narrativeRole: The end card — the full write-up with every source lives on the blog.
keyMessage: Read the full breakdown at saidulbadhon.com.

Adapt: Brand_Outro relay-to-URL — a short beat, then the URL end card held for most of the shot.
This is the FINAL frame: a gentle 0.4s fade to black at the very end is allowed.

Scene 1 (0.0–0.9s): black ground; the close-frame (white 4px border, 12px yellow shadow, x 16–84%, y 18–78%) springs in from scale 0.92; inside, a white label-pill "THE FULL BREAKDOWN + SOURCES".
Scene 2 (0.9–3.0s): at 0.5s the post title "CHATGPT PRO $200 IS BACK, WITH HALF THE USAGE" (heading-md, white) reveals per word; at 1.1s "saidulbadhon.com" (close-title, yellow) slams in beneath it, and a pink star-burst punctures the frame's top-right corner. Hold; from 2.6s fade the whole frame to black.
