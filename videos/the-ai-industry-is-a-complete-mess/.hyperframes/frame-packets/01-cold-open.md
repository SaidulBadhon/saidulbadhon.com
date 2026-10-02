# Frame packet: 01-cold-open

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 1 — Cold open: the all-new AI 2026

- scene: Loud infomercial set — the "AI 2026" product box mascot slams in, an "একদম নতুন!" star-burst and an "আরও স্মার্ট!" sticker pop, a banner "এজেন্টরা 'না' শোনে না!" slaps across, and a "$730B" star-burst rolls in as the price
- voiceover: "আসছে একদম নতুন AI দুই হাজার ছাব্বিশ! আগের চেয়ে অনেক বেশি স্মার্ট! এজেন্টরা কারও 'না' শোনে না! আর খরচ? মাত্র সাতশো ত্রিশ বিলিয়ন ডলার!"
- duration: 11.661s
- transition_in: cut
- status: outline
- src: compositions/frames/01-cold-open.html
- type: hook
- persuasion: Counterintuitive claim + parody (the ad sells the bad parts as features)
- beat: surprise + amusement
- speaker: HOST
- chapter: শুরু: একদম নতুন AI 2026
- blueprint: kinetic-type-beats (Adapt)
- focal: the AI 2026 box mascot
- roles: yellow ground + dot-grid + stripe-blocks = background · AI 2026 box = foreground subject · "একদম নতুন!" star-burst, "আরও স্মার্ট!" sticker = supporting · "এজেন্টরা 'না' শোনে না!" banner = foreground payoff · "$730B" star-burst = foreground payoff 2
- sfx: game show fanfare, rubber stamp, barcode beep, sparkle shimmer

narrativeRole: Opens the curiosity gap with an ad that proudly lists the industry's worst facts as features.
keyMessage: AI is smarter than ever — and its agents don't take no for an answer, for only $730 billion.

Adapt: escalating multi-beat statement landing spring-pop payoffs; the beats' payloads are props.
Final layout must match frame 2's freeze: box x 16–42% / y 16–80%; "$730B" star-burst centred at
(72%, 36%), ~30% of frame width; banner x 20–84% / y 64–80%, tilted −5°; "আরও স্মার্ট!" sticker
x 46–66% / y 7–17%; "একদম নতুন!" star-burst around (11%, 13%).

Scene 1 (0.0–1.4s): yellow ground with a black dot-grid patch top-right and two tilted pink/black stripe-blocks bleeding off the left and bottom-right edges — on screen from t=0. On "একদম" (0.49s) a pink 10-point star-burst "একদম নতুন!" spring-pops at the upper-left (≈11%, 13%), tilted −10°.
Scene 2 (1.4–3.7s): on "AI" (1.46s) the AI 2026 box drops from above and lands heavy at left-centre (squash 0.94 → settle): pink top band "AI 2026" (Inter 900), on its face a small label "দাম" over "$730B", cartoon eyes + grin, the vertical gauge on its right edge labelled "নিয়ন্ত্রণ", FULL. On "ছাব্বিশ!" (2.68s) the mascot blinks once (eyes scaleY 1 → 0.1 → 1, ~0.2s).
Scene 3 (3.7–5.9s): on "স্মার্ট!" (5.37s) a blue sticker "আরও স্মার্ট! ↑" (card-small, tilted +6°) spring-pops at x 46–66% / y 7–17%.
Scene 4 (5.9–8.0s): on "এজেন্টরা" (5.96s) the pink banner card "এজেন্টরা 'না' শোনে না!" slaps in from the right (fast power3 arrival, tilted −5°, 4px border + 8px shadow), with "'না'" set inside a white box; on "না!" (7.49s) the gauge drains from 100% to 30% (stat-bars-and-fills) and the grin widens.
Scene 5 (8.0–11.661s): on "খরচ?" (8.07s) a big blue 10-point star-burst spring-pops centred at (72%, 36%): label "মাত্র" over "$730B" — the number rolls up with the number-wheel from "সাতশো" (8.96s), landing on "ডলার!" (11.02s) — and a small "/ বছর" under it. Hold to the end (no exit).

## Selected blueprint: kinetic-type-beats

# kinetic-type-beats — Kinetic-Type Beats

**intent**: A flat, centered, bold-type shot where the motion IS the word/phrase changing — the line either swaps tokens in place by hard cut, or builds a statement across full-screen beats (each with its own move) that lands a spring-pop payoff.

**roles served**

- Hook (from `hook-kinetic-type-flash`): when one stationary line lands a punchy rhetorical question or "you keep doing X" callout and the in-place token swap itself is the joke.
- Hook (from `hook-kinetic-type-escalation`): when ONE statement should escalate across distinct full-screen beats (each a different move) and punctuate on a spring-pop payoff element — a rising-intensity / "transform X into Y" opener.
- Hook (from `kinetic-type-to-logo-reveal`): when rapid centered word beats are the warm-up for a typography-to-brand arc — the swaps resolve into a logo reveal (pop-in whole, or 3D parts assemble and flatten into the flat mark) that hands off to a value card / browser mockup sliding in.
- Hook (from `centered-beat-triptych`): when the open is three center-stage beats on a constant field, each element ALONE on screen — and a beat's payload may be non-text (a logo-lockup rotation-snap, a CTA button spring-pop with a one-shot glow-ring pulse, a benchmark chart that builds and holds); the last beat holds to the end.
- Problem (from `problem-kinetic-type-beats`): when the script is 3–5 short pain statements (or a "what-if?" framing) that should each land alone, on a bare canvas, before the next replaces it — no product visible yet.
- Problem (from `centered-phrase-relay-question-hook`): when the pain is an ordered chain of question/hook phrases that scale-pop through center relay-style (each exits as the next arrives) and land a specially-styled climax word — OR resolve the question on a `[product surface]` entering as an element move, never a camera zoom.
- Product_Intro (from `product-intro-kinetic-type-namedrop`): when the hook IS the words — hard-cut through "Introducing…" / tagline / value beats and resolve on the brand name or logo.
- Product_Intro (from `fixed-line-word-swap`): when a fixed headline holds and ONLY one word-slot changes — cursor-deleted-and-retyped once (optionally by a labeled collaborative cursor) or rapid-cycled through a `[role]` list — then hands off to the product/brand payoff; the purest sub-shape A.
- Product_Intro (from `flat-field-kinetic-word-run`): when a sentence builds word-by-word on a flat brand-color field and each `[hero word]` earns a bespoke one-shot effect payoff (letter-scramble, chromatic glitch, confetti burst, emoji morph) before a punch-word finale.
- Product_Intro (from `anchored-wordmark-transform`): when the anchored type itself mutates — an "Introducing" / predecessor beat builds or swaps into the `[wordmark]` in place, which then TRANSFORMS (a UI collage rushes outward from behind it, a word morphs into a pulsing icon, the title zoom-blurs away) into a short payoff beat.
- Benefits (from `benefits-kinetic-type`): when "what you get" is a rapid-fire staccato montage — 8–12 short value phrases, each flashing and clearing before the next at high tempo.
- Benefits (from `flat-void-statement-relay`): when the value reads as a SLOW statement relay — 2–4 full statements on a flat void, each built by its own engine (typewriter, oversized element-scroll, outline-echo stack, wave-mapped pattern) and held ~1.5s+ before the hard cut; the low-tempo sibling of the staccato montage.
- CTA (from `cta-kinetic-type`): when the sign-off is a punchy closing line (or a short stack of value lines) that snaps/fades in beat-by-beat and lands on the brand lockup or URL — no spatial set, no clicked button.
- CTA (from `kinetic-beat-chain-to-logo`): when the sign-off chains 3–5 message beats and each beat carries a DIFFERENT kinetic gag (marquee scroll-through, flash-swap word list, brief 3D letter extrude, spring-bounce prop, one interleaved mock-UI beat) before the logo/URL forms — optionally out of a preceding glow pulse — and holds.
- Brand_Outro (from `brand-outro-kinetic-type-resolve`): when the close is a rapid center-channel barrage of single-word verbs asserting breadth, resolving on the brand's one defining word (motion-is-the-message, no logo lockup).
- Brand_Outro (from `centered-beat-relay-to-url`): when the close is a short relay of full-frame beats — fade/scale swaps, a spring shrink-to-0, an `[icon]` bounce, a gradient-swept title card — terminating in a centered `[URL / domain]` end card held for the longest stretch of the shot (~40–75% of runtime); an optional `[product UI]` prologue scales down and fades to the canvas first.

**duration**: 3.0–12.9s (Benefits staccato fastest ~3.5–4s at 8–12 sub-0.5s beats, statement-relay Benefits up to ~8.3s; Product_Intro fixed-line as short as ~3.0s; Problem 4.1–12s; CTA spans 3.6–12.9s with beat count; Brand_Outro ~3.6s as a verb barrage, up to ~12.6s when the terminal URL hold carries 40–75% of the runtime)

**shot structure** (flat, fixed center anchor; bold sans-serif text on a solid `[bg color]`; type/tokens are the default subject, though a beat's payload may be ONE non-text center-stage element — a logo lockup, a CTA button, a chart — obeying the same arrive-hold-clear law; camera locked unless a modifier is noted; two folded sub-shapes — **(A) fixed-line token swap** and **(B) multi-beat statement build**)

- **Scene 1 (0.0–~1.0s) — first beat lands.** Solid `[bg color]` field. Bold `[type color]` text arrives dead-center via ONE entrance: type-on character-by-character with a trailing blinking caret, OR a hard-cut FLASH-in (no fade/slide), OR a per-word staggered fade/blur, OR an oversized word that smoothly SCALES DOWN to a small centered word. An optional `[accent color]` move plays on the key word(s): a left→right drawn underline / strike-through, a small particle/dot burst from behind the text, or a `[accent color]` selection-box framing the word.
  - _Variant — Hook (flash)_: just the fixed `[hook line]` (or its first word) parks at center; no escalation move.
  - _Variant — Hook (escalation)_: `[beat 1 text]` arrives big and scale-downs to centered, OR sits over a glowing `[motif]` with a slow camera push-in (see camera modifier); ends on a hard cut.
  - _Variant — Hook (logo reveal)_: centered bold words swap in with quick spring-scale pops on a flat/gradient field while flat `[accent]` circles/dots drift idly; a beat may hard-cut to a contrast bg and enter with an RGB-split glitch stretch that snaps sharp.
  - _Variant — Hook (triptych)_: beat 1 may be non-text — a `[logo mark]` rotates in 3D and snaps flat beside a `[version tag]`, or a statement resolves via a horizontal stretch/slice glitch on a subtle `[grid card]` — holds, then clears (scale-down + fade, or hard cut).
  - _Variant — Problem_: centered `[pain line 1]` reveals in chunks across one or two lines with its `[accent]` underline / particle burst.
  - _Variant — Problem (relay)_: `[hook phrase 1]` scale-pops into center with a quick spring on a flat solid OR drifting-gradient field — optionally the background itself morphs open first (a rounded `[accent shape]` expands into the full-bleed gradient); as the phrase holds, its word-spacing spreads slightly.
  - _Variant — Product_Intro_: bold `[hook word, e.g. "Introducing"]` enters with a typographic accent (split-and-slide apart, drawn underline, or `[accent]` selection-box).
  - _Variant — Product_Intro (fixed-line)_: the full fixed headline `[fixed phrase] [swap-slot]` parks centered (a faint `[plexus / ambient pattern]` may drift behind); no escalation move — the slot is the show.
  - _Variant — Product_Intro (word-run)_: a field-claiming open — horizontal `[brand color]` stripe wipes reveal the `[logo lockup]` then clear, or a giant blob expands from center repainting the frame in the brand color — before the sentence starts building.
  - _Variant — Product_Intro (wordmark transform)_: "Introducing" fades in over ambient sine-wave lines that undulate then snap taut, OR the `[old version wordmark]` holds and swaps away, OR oversized scattered `[gradient]` letters bounce-assemble into the `[name]` while the whole word scales down to center.
  - _Variant — Brand_Outro_: optional single-frame flash of `[product UI / hero asset]` precedes the verb channel, then `[verb 1]` hard-cuts in centered.
  - _Variant — Brand_Outro (relay-to-URL)_: optional prologue — the `[product UI window]` scrolls its content, then scales down and fades out to the flat canvas; the first text beat fades/scales in centered.

- **Scene 2..N — beats replace each other in place (the engine).** The center anchor advances one beat at a time; nothing from the prior beat lingers. Choose the swap mechanism by sub-shape:
  - **Sub-shape A (fixed-line token swap)**: the line stays fixed and only the variable slot changes by an instant hard CUT (no roll/scroll/blur) — `[token A]` → `[token B]` → `[token C]` — OR the final word(s) backspace out and a new word retypes (`[word A]` → `[word B]`). The rest of the line holds. The cycle may run a rapid `[role word]` list at the fixed slot, and the delete-retype may be performed by a labeled collaborative cursor; a faint `[plexus / ambient pattern]` may keep drifting behind the fixed line.
  - **Sub-shape B (multi-beat statement build)**: each full-screen beat hard-cuts to a NEW background/line, and each gets its own distinct entrance/exit MOVE — springy scale-in/scale-out overshoot, 3D letter-tumble (glyphs scatter into a rotating depth cloud, then reassemble into the next phrase), motion-blur fly-in that resolves sharp at center, prior text accelerates/zooms past the camera while fading, letter-spacing collapse, or a bottom-up masked slide. Background may hard-flip `[bg A]`↔`[bg B]` on selected beats with `[type color]` inverting to stay legible.
  - _Variant — Hook (escalation)_: beat 2 `[beat 2 text]` (more emphatic) snaps in; beat 3 `[beat 3 text]` (climax) holds, then a transition-out move on the type itself — a Z-dolly forward THROUGH an oversized glyph, OR a per-word karaoke highlight sweep lighting words left→right.
  - _Variant — Hook (triptych)_: a mid beat may be non-text — a `[CTA button]` spring-pops with overshoot, fires a one-shot blurry glow-ring pulse outward, and settles smaller — the element alone on screen, then cleared like any other beat.
  - _Variant — Problem_: each `[pain line k]` enters by chunk-reveal or motion-blur fly-in as the prior blurs/zooms off; an optional `[accent color]` interstitial word ("[what-if hook]") scales up from center, holds, then zooms past the camera and fades.
  - _Variant — Problem (relay)_: each `[phrase]` scale-pops into center while the prior shrinks and split-slides off toward BOTH left/right edges (clipping off-screen) with fade; an optional emphasis beat lands on a hard-cut contrast bg — a single `[word]` letter-tracking-tightens from wide spacing while scaling up as four thin `[accent]` arrows shoot in diagonally from the corners, converging on it; a left-aligned line-by-line value build may interleave.
  - _Variant — Product_Intro_: each `[tagline phrase]` is a hard-cut/push-through inverted-text beat with its own one-shot accent (strike-through, slider/toggle shapes sliding in, or a bg-invert cycle white→`[accent]`→black flipping fg/bg).
  - _Variant — Product_Intro (word-run)_: the `[sentence]` builds word-by-word with snappy pops (lines re-center as they add; an underline may draw beneath key words), then one beat per `[hero word]` — each lands large and performs its own one-shot effect: a letter-scramble resolve (with thin divider ticks), a chromatic-glitch jitter (offset color copies snapping back clean), a spring bounce + confetti burst that erupts up and drifts down, or a letter-slot swapped for a springing `[emoji / mark]` that morphs; the finale may run an alternating huge/small word scale chain.
  - _Variant — Product_Intro (wordmark transform)_: the `[wordmark]` completes in place — staggered part-by-part pop (`[part 1]` then `[part 2]`), an in-place swap replacing "Introducing", or a `[second phrase]` appending — with a gradient hue-sweep across the type that settles to a solid color snap.
  - _Variant — Benefits_: high tempo (~0.4s/beat) — each `[benefit phrase]` pops via springy scale-in/out or 3D letter-tumble; multiple bg light↔dark flips across the run with text-color invert.
  - _Variant — Benefits (statement relay)_: low tempo — each `[statement]` builds by its own engine and HOLDS ~1.5s+ before the hard cut: line 2 types char-by-char under a static line 1; an oversized `[phrase]` element-scrolls right→left through the frame (a moving window onto a wider line, a gradient sweeping the letters); a solid `[word]` holds while stacked outline-only echo copies cycle vertically behind it; a multi-line block builds fast as small `[accent shapes]` fly in from the edges then drift outward and thin (text may form as a masked grey fill, then snap solid).
  - _Variant — CTA_: each `[value line]` → `[value line]` → `[CTA verb line]` clears by hard cut / zoom-blur cut through near-black / fade-out, then the next pops/fades/slides in. Optional `[accent motif]` draws on behind (rising line-graph trim-path, thin wireframe guides, gutter geometry tiles).
  - _Variant — CTA (beat-chain)_: individual beats carry their own gag — a line enters right and marquee-scrolls continuously left across the frame (exiting); a `[use-case word]` list flash-swaps in place; a beat's letters briefly extrude into simple 3D and flatten back; a `[glyph + prop]` group spring-bounces in then slides off; ONE mock `[compose-window / product UI]` beat may interleave without breaking the chain.
  - _Variant — Brand_Outro_: a centered single `[verb / keyword]` HARD-CUTS to the next at a steady ~0.2s cadence (no fade/scale) over a continuous moving field (see camera modifier).
  - _Variant — Brand_Outro (relay-to-URL)_: 2–3 full-frame beats swap wholesale at a relaxed cadence — each fades/scales in and out, or scales up slightly then spring-shrinks to 0%, or an `[icon]` bounce-pops in from 0% and shrinks back out, or a `[title card]` holds with a continuous in-text horizontal gradient sweep before a HARD CUT to the bare canvas.

- **Scene N (final beat → end) — resolve and HOLD.** The last beat lands and holds to the end (settle only, no further scale-out). Resolution diverges by role:
  - _Variant — Hook (flash)_: last token swap lands and holds; optional tiny punctuation/emphasis snap (`?` → `?!`, or fill snaps to `[accent color]`).
  - _Variant — Hook (escalation)_: resolve on `[payoff bg]` — a `[payoff element]` (colored square / heart-eyes reaction emoji) SPRING-POPS in center; small `[accent motes]` drift outward; subtle settle.
  - _Variant — Hook (logo reveal)_: the word beats resolve on the brand — the `[logo]` pops in whole, or floating 3D `[shapes]` assemble and FLATTEN into the flat 2D mark as the `[wordmark]` slides in beside it; then a `[browser mockup / value card]` slides/scales in on a fresh bg and holds (a bottom caption may build).
  - _Variant — Hook (triptych)_: the final beat may be non-text — a `[benchmark chart]` fades in its framework and grows bars from zero width in a top-down stagger (the `[hero row]` bold/highlighted), then holds static for the back half of the shot; or a closing statement glitch-reveals and holds.
  - _Variant — Problem_: final `[pain line]` reveals (left→right swipe with leading-edge blur, OR letters explode radially then the resolving line fades up); holds the pain on screen.
  - _Variant — Problem (relay)_: the climax `[word]` scales in with special treatment (gradient fill, slight ~-8° rotation) and holds — OR the question resolves on a `[product surface]` as an ELEMENT move: a `[pill / search bar]` slides in from the right and keeps traveling leftward while its text progressively reveals (may end mid-slide, phrase cropped at the frame edge), or the `[page canvas]` scales down while `[app chrome + side panels]` slide in and frame it.
  - _Variant — Product_Intro_: resolve on the brand — `[logo mark]` / `[wordmark]` pops in centered (optional sting: liquid/ink splash, blob backing), OR the final value word holds inside an expanding-iris `[accent]` circle that scales to fill frame and hard-cuts the closing word through it.
  - _Variant — Product_Intro (wordmark transform)_: with the completed `[wordmark]` anchored dead-center, a dense `[UI-screenshot collage]` rushes in and expands outward from behind the text toward the frame edges with parallax (fast pull-back feel), then clears quickly to a clean `[wordmark]` end card; OR one `[word]` morphs into a pulsing `[icon]` completing an icon+text lockup before the field dissolves to its inverse; OR the title rapidly scales up and zoom-blurs away as the next context fades in.
  - _Variant — Benefits_: the last `[benefit phrase]` arrives (optionally on the inverted bg) and SETTLES — does not scale/tumble back out.
  - _Variant — CTA_: land on the lockup — `[logo mark]` SCALES UP small→full and holds, OR a `[logo]`/`[url]` builds segment-by-segment beside its icon. End-card holds dead static.
  - _Variant — CTA (glow-preceded formation)_: the prior letters scatter/clear, a soft `[accent]` glow pulses on the empty field, and the `[logo mark]` FORMS out of the glow with the `[url]` wordmark below; holds to the final frame.
  - _Variant — Brand_Outro_: hard cut to the `[resolve word / brand keyword]` (longest, still centered); HOLDS ~0.5s while the background field keeps moving.
  - _Variant — Brand_Outro (relay-to-URL)_: the centered `[URL / domain]` (+ optional CTA line above) fades/scales in and holds — the LONGEST beat of the shot, ~40–75% of the runtime — optionally fading at the very tail.

**motion vocabulary**: hard-cut / flash word swaps; in-place token cycle (instant cut, no roll/scroll/blur); type-on with trailing blinking caret; backspace-and-retype; per-word staggered fade/blur reveal; big→small scale-down; springy scale-in/scale-out overshoot; 3D letter-tumble scatter-and-reassemble; motion-blur fly-in / blur-off; prior text zoom-through-camera; letter-spacing collapse; bottom-up masked slide; drawn-on `[accent]` underline / strike-through; particle/dot burst from text; `[accent]` selection-box frame; bg-invert hard-flip with text-color invert; karaoke per-word highlight sweep; radial letter-explode; expanding-iris circle wipe-to-next; final spring-pop payoff element (square / emoji / logo mark); drifting `[accent]` motes / ambient shapes; segment-by-segment URL/wordmark build; final-token punctuation snap; settle-and-hold; scale-pop phrase relay (prior shrinks + split-slides off both edges with clip-fade); letter-tracking tighten-from-wide while scaling; corner arrows converging on a word; gradient-fill / hue-sweep across type with settle-to-solid snap; in-text traveling gradient sweep; background shape morph-open into a full-bleed field; RGB-split / chromatic-glitch jitter; horizontal stretch/slice glitch reveal; letter-scramble resolve with divider ticks; confetti burst up-and-drift; letter-slot emoji/mark swap + morph; alternating huge/small word scale chain; color-stripe wipes / blob expand frame-repaint; oversized phrase element-scroll (moving window); right→left marquee scroll-through; stacked outline-echo copies cycling behind a solid word; full-frame repeating-word pattern on a rolling 3D wave; accent shapes fly-in then drift-out-and-thin; masked grey fill snapping solid; brief 3D letter extrude-then-flatten; spring-bounce glyph+prop drop-in; glow-pulse-preceded logo formation; 3D shapes assemble-and-flatten into the mark; logo-lockup 3D rotation-snap; one-shot glow-ring pulse; chart bars growing in a top-down stagger; labeled collaborative cursor delete-and-retype; in-place role-word cycle; ambient plexus/pattern drift; spring shrink-to-0 exit / bounce-in from 0%; scattered-letter bounce-assembly with baseline settle; staggered wordmark part pop; phrase append; word→icon morph with continuous pulse; UI-collage rush-out with parallax from behind anchored type; zoom-blur title exit; long-held URL end card.

**rule mapping**

- hard-cut / flash word swaps, in-place token cycle, whole-line state swaps at time thresholds → `discrete-text-sequence`
- type-on character-by-character + blinking trailing caret → `discrete-text-sequence` (text/typing state progression) + `context-sensitive-cursor` (caret blink/color-switch)
- backspace-and-retype final word(s) → `discrete-text-sequence` (typos/holds/backspace is explicitly in-scope)
- one short distinct phrase per beat / script-driven phrase windows / word-by-word tagline assembly → `dynamic-content-sequencing`
- percussive per-beat phrase entrances on a shared beat array (distinct entrance per phrase, steady cadence) → `kinetic-beat-slam` (best fit for the multi-beat statement-build engine and the ~0.2s Brand_Outro verb march)
- per-word staggered fade/blur reveal → `kinetic-beat-slam` (per-phrase/per-word distinct entrances); the soft-focus blur component → `depth-of-field-blur` (selective-focus blur on the off-focus words)
- big→small scale-down on a word; springy scale-in/scale-out overshoot → `spring-pop-entrance` (spring pop/settle) backed by `gsap-effects` for the plain scale tween
- 3D letter-tumble scatter-into-depth-cloud then reassemble → `depth-scatter-assemble` (glyphs scatter into a 3D depth cloud and reassemble into the next phrase; combine w/ `3d-text-depth-layers` for the extruded read, or `hacker-flip-3d` for an in-place per-char flip flavor)
- karaoke per-word highlight sweep synced across words → `asr-keyword-glow` (keyword glow+scale on a synced rail) OR `css-marker-patterns` (highlight sweep) — choose ASR-driven vs. static-timeline sweep
- drawn-on `[accent]` underline / strike-through / loop / scribble under key word → `css-marker-patterns` (highlight sweep / circle / burst / scribble / sketchout)
- particle/dot burst from behind text → `css-marker-patterns` (burst) backed by `gsap-effects`
- `[accent]` selection-box frame around a word → `css-marker-patterns` (circle/box marker) + `gsap-effects`
- bg-invert hard-flip (light↔dark / white→accent→black) with text-color invert → `discrete-text-sequence` (whole-text/state swap covers the synchronized fg/bg state change)
- letter-spacing collapse; bottom-up masked slide → `gsap-effects` (tween letter-spacing / masked translate) + techniques: per-word kinetic typography / clip-path reveal
- expanding-iris circle wipe that morphs the current word into the next at the same center → `scale-swap-transition` (morph two elements at same center)
- final spring-pop payoff element (colored square / reaction emoji / logo mark) → `spring-pop-entrance` (or `physics-press-reaction` for a weightier pop)
- drifting `[accent]` motes / ambient shapes / soft drifting gradient field beneath the type → `sine-wave-loop` (idle drift loop)
- segment-by-segment URL / wordmark build beside its icon → `discrete-text-sequence` (segment-by-segment state reveal) or `dynamic-content-sequencing`
- final-token punctuation / emphasis snap (`?`→`?!`, fill→accent) → `discrete-text-sequence`
- settle-and-hold final frame → `spring-pop-entrance` (settle phase) / static hold (no rule needed)
- motion-blur fly-in / blur-off / zoom-through-camera streak on type → `motion-blur-streak` (directional velocity blur on a fast fly-in / zoom-through; the heavy motion-blur smear resolves sharp at center)
- radial letter-explode (glyphs explode outward radially then resolve) → `depth-scatter-assemble` (radial per-letter explode-and-resolve is in scope alongside the depth-cloud scatter)
- 3D letter-tumble depth-cloud scatter-and-reassemble → `depth-scatter-assemble` (free tumbling depth-cloud that flies out and snaps back into the next phrase)
- scale-pop phrase relay → `spring-pop-entrance` (the arriving phrase) + `gsap-effects` (the prior phrase's shrink + split-slide clear toward both edges)
- letter-tracking tighten-from-wide while scaling → `gsap-effects` (letter-spacing tween — the inverse of the letter-spacing collapse mapped above)
- corner arrows converging on a word → `css-marker-patterns` (burst geometry with inverted travel — lines converge instead of radiate) + `gsap-effects`
- gradient-fill climax word / hue-sweep across type / in-text traveling gradient sweep → `gradient-text-sweep` (gradient tweened THROUGH letterforms — position/hue sweep with settle-to-solid snap, seek-safe)
- background shape morph-open into a full-bleed field → `card-morph-anchor` (uniform scale + borderRadius paint tween, then the field takes over)
- RGB-split / chromatic-glitch jitter; horizontal stretch/slice glitch reveal → `chromatic-glitch` (deterministic offset color-copy layers, jitter + snap-clean; covers the stretch/slice glitch reveal)
- letter-scramble resolve with divider ticks → `hacker-flip-3d` (the deterministic glyph-substitution decode, minus the 3D rotation)
- 3D shapes assemble-and-flatten into the mark; scattered-letter bounce-assembly → `depth-scatter-assemble` (scatter-to-clean-layout settle) + `spring-pop-entrance` (the bounce settle)
- logo-lockup 3D rotation-snap → `orbit-3d-entry` (the 3D flip-in entry, skipping the orbit phase)
- one-shot glow-ring pulse; glow-pulse-preceded logo formation → `ambient-glow-bloom` (single-pass bloom-and-fade) + `spring-pop-entrance` (the mark forming out of it)
- chart framework fade-in + bars growing from zero width top-down; radial gauge arc-draw + count-up → `stat-bars-and-fills` (+ `counting-dynamic-scale` for the ticking value)
- labeled collaborative cursor delete-and-retype; in-place role-word cycle → `discrete-text-sequence` + `context-sensitive-cursor` (the labeled-pointer look itself is oversized-cursor doctrine, not a rule)
- ambient plexus/pattern drift; accent shapes drift-out-and-thin → `sine-wave-loop` (finite drift) after a `spring-pop-entrance` arrival
- letter-slot emoji/mark swap + morph; word→icon morph with continuous pulse → `scale-swap-transition` (same-center morph) + `svg-icon-enrichment` (the icon's internal pulse)
- oversized phrase element-scroll; right→left marquee scroll-through → `gsap-effects` (linear translate of an oversized element through a static frame)
- stacked outline-echo copies cycling behind a solid word → `3d-text-depth-layers` (the offset echo stack) + `vertical-spring-ticker` (the vertical cycle)
- brief 3D letter extrude-then-flatten → `3d-text-depth-layers` (build the extrusion offsets, then collapse them)
- full-frame repeating-word pattern on a rolling 3D wave → flagged special — a 3D wave-mapped text field is out of rule scope; `sine-wave-loop` only drives the undulation oscillator
- alternating huge/small word scale chain → `kinetic-beat-slam` (distinct per-beat entrances on the shared beat array)
- color-stripe wipes → `gsap-effects` (masked translate tweens); blob expand frame-repaint → `card-morph-anchor`
- UI-collage rush-out with parallax from behind anchored type → `center-outward-expansion` (clustered-at-center → outward to final positions; vary per-tile rates/scales for the parallax read)
- spring shrink-to-0 exit / bounce-in from 0% → `spring-pop-entrance` (in) / `gsap-effects` `back.in` shrink (out)
- product-surface resolve (pill slide with progressive text reveal; canvas scale-down as chrome frames in) → `nudge-curve` (the slide that reveals during travel) + `gsap-effects` (coordinated scale + panel slides)
- zoom-blur title exit as an in-shot beat handoff → `motion-blur-streak`; as a scene-out into the next scene it belongs to the transition layer
- staggered wordmark part pop / phrase append → `spring-pop-entrance` + `dynamic-content-sequencing`

**camera modifier** (optional, layered over the flat shot; most variants are camera-locked)

- Slow continuous global zoom-in / uniform push-in running underneath the whole sequence (Problem, Brand_Outro) → `multi-phase-camera` (push phase) — gives parallax between the fixed type and a moving background field.
- Camera dolly/zoom forward THROUGH an oversized glyph along Z as a beat transition-out (Hook escalation, Product_Intro push-through) → `coordinate-target-zoom` (target the glyph center) or `multi-phase-camera` (push).
- Slow push-in on Scene 1 over a glowing `[motif]` (Hook escalation) → `multi-phase-camera` (push) or `coordinate-target-zoom`.
- Slow continuous card/scene scale-up running UNDER hard-cut beats (Hook triptych) — a push-in feel rendered as element scale on the scene group, never a real dolly → `multi-phase-camera` (push phase) or a plain `gsap-effects` scale tween.
- Note: the in-place token swap (sub-shape A) and most Benefits/Hook-flash/CTA variants are fully camera-static — the swap is the only motion.

## Selected motion rule: stat-bars-and-fills

---
name: stat-bars-and-fills
description: Data-viz primitives that pair a number with a graphic — growth bars (CSS scaleY stagger), a progress fill (bar or ring), and a partial star-rating wipe. Seek-safe, deterministic.
metadata:
  tags: data, stats, chart, bars, progress, ring, stars, rating, infographic, number
---

# Stat Bars & Fills

The graphics that give a stat **visual weight** beside its number: a small bar chart, a progress bar/ring filling to a percentage, or a star row filling to a fractional rating. Pair these with [counting-dynamic-scale.md](counting-dynamic-scale.md) (the number) for a complete stat scene.

**Layout blueprint — pick ONE and hold it across all stats:**

- **Single-focus** — one centered frame, the number is the hero, a ring or bar sits under/around it. Cleanest for a sequential reveal (stat 1 → stat 2 → stat 3 in the same frame).
- **Split-frame** — big number on the left, paired graphic on the right. Better when stats are shown together or each needs a distinct visual.

Don't mix blueprints between stats in one piece — that reads as inconsistent.

## Recipe

### 1 — Growth Bars (CSS `scaleY` stagger)

Bars grow from the baseline with a stagger; the last bar is the accent. Heights are authored in CSS (inline height per bar); GSAP only reveals `scaleY: 0 → 1` — never animate `height`.

```css
.bars {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  height: 280px;
}
.bar {
  width: 48px;
  background: #3a4a64;
  transform: scaleY(0);
  transform-origin: bottom center; /* grow UP from the baseline, not from center */
}
.bar:last-child {
  background: #ffc300; /* accent the final/current bar */
}
```

```js
tl.to(".bar", { scaleY: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.3);
```

### 2 — Progress Fill

**Bar form** — `scaleX` from a left origin:

```css
.track {
  width: 520px;
  height: 16px;
  background: #1b263b;
  border-radius: 8px;
  overflow: hidden;
}
/* width:100% is REQUIRED — an absolutely-positioned fill with no width is 0px, and scaleX of 0 is
   still 0 → the bar renders invisible (automated gates may miss a zero-width scaled element). */
.fill {
  width: 100%;
  height: 100%;
  background: #ffc300;
  transform: scaleX(0);
  transform-origin: left center;
}
```

```js
const PCT = 0.92; // 92%
tl.to(".fill", { scaleX: PCT, duration: 1.0, ease: "power2.out" }, 0.3);
```

**Ring form** — measured stroke draw (mechanics in [svg-path-draw.md](svg-path-draw.md)):

```js
const ring = document.querySelector("#ring");
const LEN = ring.getTotalLength(); // measure, don't hard-code the circumference
ring.style.strokeDasharray = LEN;
ring.style.strokeDashoffset = LEN; // empty
// rotate the <circle> -90deg in CSS so the fill starts at 12 o'clock
tl.to(ring, { strokeDashoffset: LEN * (1 - 0.92), duration: 1.1, ease: "power2.out" }, 0.3);
```

### 3 — Star-Rating Fill (fractional)

A gold star row revealed left-to-right to a fractional value (e.g. 4.6 / 5) via a clip wipe over a gold layer sitting on a gray layer.

```html
<div class="stars">
  <div class="stars-gray">★★★★★</div>
  <div class="stars-gold" id="goldStars">★★★★★</div>
</div>
```

```css
.stars {
  position: relative;
  font-size: 64px;
  letter-spacing: 8px;
}
.stars-gray {
  color: #2b3548;
}
.stars-gold {
  position: absolute;
  inset: 0;
  color: #ffc300;
  width: 100%;
  clip-path: inset(0 100% 0 0);
}
```

```js
const RATING = 4.6,
  MAX = 5;
tl.to(
  "#goldStars",
  { clipPath: `inset(0 ${100 - (RATING / MAX) * 100}% 0 0)`, duration: 1.0, ease: "power2.out" },
  0.3,
);
```

## Values

| token         | range       | notes                                                                               |
| ------------- | ----------- | ----------------------------------------------------------------------------------- |
| bar count     | 4–6         | reads as "a trend" without clutter; the last bar is the current/accent value        |
| fill duration | 0.8–1.2s    | matched to the paired count-up so number and graphic land together (share the ease) |
| stagger       | 0.06–0.1s   | larger feels sluggish, 0 loses the build                                            |
| accent hue    | exactly one | bars/fill/stars all use the same accent, the rest is muted                          |

## Critical Constraints

- **`scaleY` / `scaleX` / `clipPath`, never `height`/`width` tweens** — author each bar's final height in CSS and scale from 0.
- **`transform-origin`** must be `bottom` (bars grow up) / `left` (fills grow right) — the default center origin scales from the middle and looks wrong.
- **`.fill` needs `width: 100%`** — a zero-width fill scaled by any factor is still invisible, and automated gates may miss it.
- **Measure, don't hard-code** — ring length via `getTotalLength()`; a hard-coded circumference breaks if the radius changes.
- **Match the number's timing** — the fill and the count-up peak together (same start + ease) so the stat resolves as one beat, not two; a paired counter's `onUpdate` must be O(1) (see [counting-dynamic-scale.md](counting-dynamic-scale.md)).
- **One accent hue, consistent blueprint** — see `hyperframes-creative/references/data-in-motion.md`.

## See also

`counting-dynamic-scale` (the number beside the graphic — same ease/duration) · `svg-path-draw` (progress-ring draw mechanics) · `hyperframes-creative/references/data-in-motion.md` (stat layout + visual weight).
