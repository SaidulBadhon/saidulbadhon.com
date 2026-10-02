# Frame packet: 14-were-first

## Project inputs

- Project: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess
- Design tokens: C:\Users\sb_sa\Documents\GitHub\saidulbadhon.com\videos\the-ai-industry-is-a-complete-mess\frame.md
- RULES_DIR: C:\Users\sb_sa\.agents\skills\hyperframes-animation\rules

## Assigned storyboard block

## Frame 14 — We're first!

- scene: The infomercial at full speed: a "সবার আগে!" star-burst, speed lines and a "সবচেয়ে দ্রুত!" badge, a calendar flipping "সেপ 22 → সেপ 29", a "নতুন মডেল!" ticker, and a "থামা নেই!" badge
- voiceover: "কারণ আমরা সবার আগে! সবচেয়ে দ্রুত! প্রতি সপ্তাহে নতুন মডেল! থামার কোনো সময় নেই!"
- duration: 5.853s
- transition_in: cut
- status: outline
- src: compositions/frames/14-were-first.html
- type: feature_showcase
- persuasion: The race, sold as a virtue
- beat: frenzy
- speaker: HOST
- blueprint: ticker-takeover (Adapt)
- focal: the ticker strip
- roles: pink ground + stripes = background · star-burst, badges = supporting · calendar card = supporting · ticker strip = foreground subject · "থামা নেই!" badge = foreground payoff
- sfx: pop, whoosh, sign flip, rubber stamp

narrativeRole: The hype names the cause without knowing it — the race.
keyMessage: First, fastest, a new model every week, no time to stop.

Scene 1 (0.0–1.6s): "▶ PLAY" OSD 0.0–0.5s; pink ground, dot-grid, stripe-blocks; on "সবার" (0.82s) a yellow star-burst "সবার আগে!" spring-pops at upper-left (≈ 22%, 26%).
Scene 2 (1.6–2.7s): on "দ্রুত!" (2.17s) four black speed-line bars zip right-to-left across the upper-right and a white badge "সবচেয়ে দ্রুত!" (tilted +5°) lands at upper-right (x 58–90%, y 14–28%).
Scene 3 (2.7–4.5s): on "প্রতি" (2.76s) a white calendar card (x 40–60%, y 34–56%) shows "সেপ 22"; on "সপ্তাহে" (3.16s) its page flips to "সেপ 29" (sign-flip); on "মডেল!" (4.04s) a black ticker strip (white Inter 900 text) takes over y 60–70% scrolling fast right-to-left: "নতুন মডেল! · নতুন মডেল! · নতুন মডেল! ·".
Scene 4 (4.5–5.853s): on "থামার" (4.51s) a white badge "থামা নেই!" (4px border, 8px shadow, tilted −6°) slams at lower-right (x 62–90%, y 72–82%). Hold (the ticker keeps scrolling to the end, linear).

## Selected blueprint: ticker-takeover

# ticker-takeover — Ticker Displace / Takeover

**intent**: A context phrase types in, an accent word cycles through options like a slot-machine to suggest "this could be many things," then a hero CRASHES in from off-screen and physically shoves the text aside — "actually, this is what it is." A collision, not a fade.

**roles served**

- Hook (from `takeover-ticker-displace`): when a static lead-in phrase + a cycling accent word should be **physically replaced** (not cross-dissolved) by a hero arriving with momentum, and the final frame is the hero alone. Reach for it when the takeover should read as an impact.
- Brand_Outro: the same collision used as a sign-off — options cycle, the brand mark crashes in and owns the frame.

**duration**: 5–7s

**shot structure** (a `[bg]` canvas; one text group on the left/center that gets ejected by an incoming hero)

- **Scene 1 (0.0–~1.4s) — context build.** A typewriter lays down a `[lead-in phrase]` character-by-character (smooth, no typos — selling confidence, not human chaos). Camera static.
- **Scene 2 (~1.4–3.0s) — the cycling beat.** An `[accent word]` slot inside the line ticks through 2–3 `[options]` on a vertical spring-roll (each click a new word), suggesting breadth — "many things this could be." (More than ~3 reads as filler.)
- **Scene 3 (~3.0–4.2s) — the collision (signature move).** A `[hero]` crashes in from off-screen with momentum and physically SHOVES the whole text group aside — the text reacts to the impact (gets displaced), it does not fade. The hero lands **heavy** — a longer settle, not a zip — so it reads as mass, not speed.
- **Scene 4 (~4.2–end) — the hero alone.** The hero settles dead-center and reads still. Holds.

**motion vocabulary**: smooth character typewriter; vertical spring-ticker word roll (2–3 steps); off-screen hero crash-in with momentum; reactive displacement of the struck text group; heavy long-tail landing (not bouncy); dual-axis subtle jitter on the resting hero.

**rule mapping**

- smooth single-phrase typewriter lead-in → `discrete-text-sequence` (smooth-slice / continuous `floor(progress)` form — no typo machinery)
- accent word slot-machine cycling through options → `vertical-spring-ticker` (`STEPS` = number of options the hero will replace; the rule's footer-reveal is unused — Scene 3 takes its place)
- hero shoves the text group aside on impact → `reactive-displacement` (the text is the displaced mass; express the hero's "heavy land" as a longer `power2` settle, not the rule's default `back.out`)
- hero's fast off-screen crash-in → `motion-blur-streak` (directional velocity blur resolving sharp as it lands)
- resting-hero aliveness → `sine-wave-loop` (low-amplitude dual-frequency register — scale + rotation jitter composing onto the hero's final landed scale; never a yoyo around 1)

**camera modifier**: camera-static — the displacement happens in element space (the hero moves the text), so there is no real camera move; the impact is the only motion.
