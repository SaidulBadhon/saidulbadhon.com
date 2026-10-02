# Frame packet: 05-one-day

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 5 — One day at DevDay

- scene: A timeline of one day panned by camera, four stations: GPT-6.1 Sol (red tick), Pro $200 ("20x" struck → "10x"), GPT-6.1 Astra ("বাতিল" stamp), and the keynote stage where a speech bubble says "Checking that now…", a 10-second timer runs, then "still checking"
- voiceover: "উনত্রিশে সেপ্টেম্বর, OpenAI-এর DevDay। একদিনেই: দারুণ নতুন মডেল GPT-6.1 Sol। দুইশো ডলারের Pro প্ল্যানে ইউসেজ অর্ধেক। সেফটি টেস্টে আটকে GPT-6.1 Astra বাতিল। আর স্টেজে নতুন এজেন্ট বলল, 'checking that now'… দশ সেকেন্ড চুপ… 'still checking'।"
- duration: 23.427s
- transition_in: cut
- status: outline
- src: compositions/frames/05-one-day.html
- type: social_proof
- persuasion: Compression (four headlines, one day) + a live-demo gag
- beat: momentum → irony
- speaker: CHECKER
- chapter: DevDay-এর একদিন
- blueprint: spatial-pan-stations (Adapt)
- focal: each station in turn; the stalled speech bubble last
- roles: paused-tape stage = background (OSD + pill stay fixed, outside the panning world) · fixed date header = supporting · timeline line + station markers = supporting · station cards = foreground subjects · red tick, strike + "10x", "বাতিল" stamp, timer = foreground annotations
- sfx: whoosh ×3, marker squeak ×2, rubber stamp, crickets, pop

narrativeRole: Shows the whole mess in one day — a great model, a halved plan, a shelved model, a stalled demo.
keyMessage: Sept 29: GPT-6.1 Sol launched, Pro $200 halved, GPT-6.1 Astra pulled over safety, the live agent stalled.

Adapt: evenly spaced stations on one horizontal timeline (world = 4 viewport widths); the `.world`
camera pans LEFT station to station (ease-in-out ~0.6s); landing held on the last. A fixed header
label-pill "29 SEP 2026 · OpenAI DevDay" sits outside the panning world at top-centre (y 9–15%).

Scene 1 (0.0–3.6s): the stage; a thin white timeline line at y ≈ 78% with four markers. At 0.1s the fixed header pill "29 SEP 2026" drops in; on "DevDay।" (2.62s) its second half "· OpenAI DevDay" appears and a small yellow chip "একদিন" pops beside it.
Scene 2 (3.6–8.6s): station 1 centred: on "দারুণ" (4.82s) a white product card slides up (≈ x 30–70%, y 24–70% of the viewport): label "নতুন মডেল", title "GPT-6.1 Sol" (Inter 900). On "Sol।" (7.82s) the red marker draws a big tick on the card's corner and writes "দারুণ" beside it.
Scene 3 (8.6–12.1s): on "দুইশো" (8.73s) the camera pans LEFT to station 2: a white card "PRO $200", label "ইউসেজ", a big "20x" (Inter 900). On "অর্ধেক।" (11.26s) the red marker strikes through "20x" and writes "10x" in red beside it.
Scene 4 (12.1–16.9s): on "সেফটি" (12.23s) pan to station 3: a white card "GPT-6.1 Astra" with a grey chip "সেফটি টেস্ট"; on "বাতিল।" (15.75s) a big white stamp "বাতিল" (Inter 900, 4px black border, tilted −8°) slams down from scale 1.4 → 1 across the card.
Scene 5 (16.9–23.427s): on "স্টেজে" (17.39s) pan to station 4: a simple keynote stage (a black-bordered big screen rectangle above a low stage plank). On "বলল," (18.91s) a white speech bubble pops from the screen: "Checking that now…" (Inter 800, English, as said on stage). On "দশ" (21.20s) a timer chip under the bubble counts 0s → 10s fast (counting, ~0.6s) with a label "চুপ…". On "still" (22.31s) a second bubble "still checking" pops, slightly smaller and tilted. Hold.

## Selected blueprint: spatial-pan-stations

# spatial-pan-stations — Spatial Pan / Stations

**intent**: Pre-place a sequence of labeled stations on one oversized canvas, then traverse it with a single virtual camera — repeated lateral/diagonal pans that center each station in turn and reveal a callout at every stop, landing held on a final station.

**roles served**

- Hook (from hook-pan-timeline): a horizontal timeline of evenly-spaced milestones, left-panned beat by beat, each marker getting a spring-popped callout, landing on the present moment ("evolution / milestone walk leading up to us").
- Problem (from problem-camera-pan-stations): a connected web of pain "stations" linked by hand-drawn leading lines, diagonally panned station to station, ending on a tangled scribble knot ("too many disconnected steps — it's a mess").
- Product_Intro (from concept-demo-decode-pan): a two-shot strip bridged by ONE lateral pan — shot 1 holds a static phrase whose accent word 3D-flap-DECODES (the concept lands), then the camera pans across the strip (with background parallax) into shot 2, where a cursor drives a live typing demo. Pairs this pan with `cursor-ui-demo`'s focal-locked tracked typing.

**duration**: 7–10s (union of Hook 8–10s, Problem ~7s, concept-demo ~7s)

**shot structure**
One oversized flat canvas on a solid `[bg color]`; all stations/markers pre-placed in world space; `[accent color]` text + simple line-icons; one virtual `.world` camera pans ease-in-out between stops. Each station holds ~1.0s.

- Scene 1 (0.0–~1.0s): Camera opens on station 1 — `[label 1 / first step]` centered. A reveal lands on it (see variants). Camera then begins to PAN toward station 2, sliding station 1 out of frame.
- Scene 2 → Scene N-1 (~1.0s each): Camera PANS (ease-in-out) to center the next station; on arrival its `[label k]` (+ optional `[secondary label]`) is REVEALED with the role reveal. Repeat per station.
- Scene N (final, ~last beat): One last pan lands on the terminal station; the final `[callout / landing element]` reveals and HOLDS to the end. Camera goes static on the punchline.

- Variant — Hook: stations sit as evenly-spaced `[markers]` on a thin horizontal `[timeline]` (lower third); pans are LEFT-only along the single axis (timeline scrolls left). Each callout is a bordered `[callout box]` + downward triangle (offset drop-shadow) that SPRING-POPS up (scale 0→100%, bouncy overshoot, transform-origin at triangle tip) reading `[label k]`; a `[secondary label, e.g. year]` fades in and RISES above it. Some mid markers arrive as plain static text revealed by the pan alone (no box). Final scene lands on the `[present-day label]`, springs, holds.
- Variant — Problem: stations are scattered across a 2D web; pans are DIAGONAL, STEERED by `[accent color]` hand-drawn lines — each station has a rough write-on line/arrow that draws toward the next and the camera follows it (Scene 1 also draws a loop/circle around the headline's key word). Each station = a white `[line-icon]` above its `[label]`, revealed plainly by the pan (no spring box). Final scene: the accent line spirals into a dense chaotic SCRIBBLE KNOT centered on the field; camera holds static on the tangle (visual punchline).

**motion vocabulary**
repeated ease-in-out camera pans (horizontal-left for Hook, diagonal-steered for Problem) across one large static canvas; pre-placed stations sliding through frame via the pan; spring-overshoot callout pop with triangle-tip origin (Hook); rise-and-fade secondary label (Hook); plain labels/icons arriving via the pan alone; rough hand-drawn "write-on" leading lines/arrows + loop/circle key-word mark (Problem); terminal chaotic-scribble knot draw (Problem); static hold on the final station/punchline.

**rule mapping**

- camera pan / traverse across the canvas (primary) → `viewport-change` (single `.world` wrapper transform; PAN mode)
- sequencing the repeated pan beats into stops → `multi-phase-camera`
- centering each station as the pan target → `coordinate-target-zoom` (used as pan-to-target, no zoom)
- spring-overshoot callout pop, triangle-tip origin (Hook) → `spring-pop-entrance`
- rise-and-fade secondary label + plain per-station label/icon reveals via the pan → `discrete-text-sequence`
- hand-drawn leading lines / arrows / loop-circle key-word mark / terminal scribble knot (Problem) → `svg-path-draw`
- station line-icons (Problem) → `svg-icon-enrichment`
- static hold on the final station / punchline → (no motion; sustained held frame, no rule needed)

**camera modifier**: The pan IS the camera. One `.world` virtual-camera transform in PAN mode — `viewport-change` — sequenced across stops by `multi-phase-camera`, each stop targeted via `coordinate-target-zoom` (pan-to-target). No depth push-in (that distinguishes this from the cluster-push-in / dataviz-pushthrough blueprints).
