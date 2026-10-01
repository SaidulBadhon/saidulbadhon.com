# Frame packet: 11-one-shelf-over

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\chatgpt-pro-200-but-wait-theres-less
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\chatgpt-pro-200-but-wait-theres-less\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 11 — One shelf over

- scene: The camera pans one shelf over to a full "CLAUDE MAX 20x" box at the same $200 — tag "$10 / 1x"; two "LIMITS RAISED" stickers (MAY 6, SEPT 22); a fine-print caveat
- voiceover: "Meanwhile, one shelf over: Claude Max twenty-x. Same two hundred dollars. Still twenty-x. Still ten a unit. Different base plans, sure — but Anthropic raised its limits twice this year."
- duration: 12.304s
- transition_in: push-slide LEFT
- status: outline
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

## Selected blueprint: comparison-split

# comparison-split — Comparison Split-Cards

**intent**: Two paired items of equal weight shown side-by-side with mirrored 3D "book-open" tilts — the eye reads them as a balanced comparison, then a pill badge lands at each card's inner edge to punctuate. The motion IS the symmetry: two cards arriving from opposite wings into a held spread.

**roles served**

- Key_Feature (from `comparison-split-cards`): when two complementary features / capabilities of equal weight should be presented **simultaneously, not sequentially** — an A/B, a "X + Y together," paired concepts the viewer must weigh side-by-side. Not for >2 items (use `grid-card-assemble`) or sequential steps.

**duration**: 4–6s

**shot structure** (a `[bg]` canvas carrying two faint ambient glow blooms — `[accent A]` near 30%, `[accent B]` near 70% — so each side owns a color identity across a 50% symmetry axis; equal-width cards under one shared perspective parent)

- **Scene 1 (0.0–~0.8s) — title sets the concept.** A centered `[title line]` with an `[accent keyword]` slides DOWN into place from just above (a short smooth settle). The downward arrival is deliberate: it forms a non-conflicting T-shape against the cards, which arrive from the sides next.
- **Scene 2 (~0.4–1.9s) — the split-tilt entry (signature move).** Two equal-width feature cards arrive from opposite wings — `[left card]` from the left, `[right card]` from the right ~0.2s behind — each carrying a **mirrored 3D `rotateY` tilt** (left faces right, right faces left, opening like a book) and scaling ~0.85→1 as it lands. The entry overlaps the title's tail so the whole thing reads as ONE arrival, not two beats. Each card holds `[image / label / subtitle]`; box-shadows fall **outward** from the tilt (left shadow right, right shadow left).
- **Scene 3 (~1.9–end) — badges punctuate, then hold.** A pill `[badge]` lands at each card's **inner edge** (left then right, ~0.3s apart), overlapping its card ~15% so it reads as attached, not orbiting. This is the lone overshoot in the shot — it earns the punctuation. Settles and holds.

**motion vocabulary**: title slide-down from above; mirrored opposite-wing card entry; static book-open `rotateY` tilt (`+tilt` left, `−tilt` right); tilt-matched outward box-shadow; inner-edge badge spring-pop; gentle phase-opposed idle float (left vs right, never synchronized) registered as subtle jitter; dual side-glow ambient.

**rule mapping**

- two cards entering from opposite wings with mirrored `rotateY` tilts + tilt-matched shadow → `split-tilt-cards` (the signature; keep the two-layer split so the entry `x`/`scale` and the idle never collide on one alias)
- title slide-down settle → `gsap-effects` (translate + opacity on a long-tail `power3`)
- inner-edge pill badge pop (the one overshoot) → `spring-pop-entrance` (overshoot register — earns the punctuation)
- phase-opposed idle float on the pair → `sine-wave-loop` (low-amplitude register — subtle jitter, NOT lazy breathing; left `sin(t)`, right `sin(t+π)` so they never conveyor-belt)
- the two faint side glows behind the cards → `ambient-glow-bloom` (un-triggered soft bloom, one per accent)

**camera modifier**: camera-static by default — the symmetry is the subject and a move would break the balance.
