# Series bible — "কিন্তু দাঁড়ান…" (But wait…)

The channel's recurring format, first made for "ChatGPT Pro $200 Is Back, With Half the Usage"
(`videos/chatgpt-pro-200-but-wait-theres-less-bn/` is the reference episode — open its frames when
in doubt). Every episode keeps the format, the look, the voices and the sound; only the content
changes.

## The idea

A cheesy late-night **infomercial HOST** sells the hype version of the topic — loudly, happily, as
if the bad part were a feature. A deadpan **FACT-CHECKER** keeps pausing the tape: the picture
freezes, goes grey, a "⏸ PAUSE" readout appears, and she replaces the hype with the post's real
numbers, a red marker in hand. The hard cuts between the two registers are the joke; the
fact-checker's honesty (she concedes what's genuinely good) is the credibility.

It fits most topics: the HOST is *the most enthusiastic wrong take* (a vendor's pitch, the hype,
the common belief, the "just do X" advice); the CHECKER is *the post*. If a topic has no product,
the "product box" is the claim itself (e.g. "PUSH YOUR .ENV! FREE SECRETS FOR EVERYONE!").

## Beat sheet (14–19 frames, ~2.5–3.5 min in Bangla)

| # | Speaker | Beat | Notes |
| --- | --- | --- | --- |
| 1 | HOST | Cold open: the hype, sold proudly | the product box mascot slams in; the bad news sold as a feature |
| 2 | silent | **Freeze** (1.4s) | record scratch; the frame-1 set re-drawn, then grey + PAUSE + red circle on the key word |
| 3 | CHECKER | The real numbers | the thesis lands here (beat 3), struck-and-rewritten numbers |
| 4 | HOST | Title sting | "কিন্তু দাঁড়ান… <twist>!" — the episode's title card, ~2s |
| 5 | CHECKER | How we got here | a timeline / mechanism with a camera pan |
| 6 | HOST | The sweeteners | what the vendor/hype offers |
| 7 | CHECKER | Fair is fair | grade each sweetener honestly (ticks, "?", notes) |
| 8–13 | alternating | The argument | each HOST claim answered by a CHECKER proof frame (charts, shelf tags, comparisons); 1 concept-teaching frame |
| N-3 | CHECKER | What to do | a decision card per kind of viewer |
| N-2 | CHECKER | Verdict | inverted black closing plate, one quotable line |
| N-1 | HOST | Outro gag | the title gag again + "শর্ত প্রযোজ্য" speed-read + "সব সোর্স ডেসক্রিপশনে" |
| N | silent | End card (3s) | the channel sign-off — not a worker frame: copy `compositions/components/end-card-16x9.html`, set `{{ID}}` and `{{PILL}}` (see § Channel) |

Every HOST frame after a CHECKER frame opens with a "▶ PLAY" readout (0.0–0.5s). Mark the frames
that start YouTube chapters with a `- chapter:` line (Bangla title) — ~8–10 chapters.

## Look (frame.md = BlockFrame + series extensions + Bangla type rules)

`assets/series/frame.md` is copied into every project. Two registers:

- **HOST** — loud BlockFrame: pastel ground cycling yellow → pink → blue → green → cream; dot grid,
  stripe blocks, star-bursts carrying prices; playful spring-pop overshoot allowed.
- **CHECKER** — the same paused-tape stage every time: `#1B1B1F` ground, faint scanlines, ghosted
  grey star + stripe (~8%), "⏸ PAUSE" + "SP" top-left, white "ফ্যাক্ট চেক" pill top-right; content on
  white cards; the **red marker** (`#E5322D`) is the only non-black stroke (strikes, circles, ticks,
  arrows, handwriting in Atma/Permanent Marker).

Recurring props (draw them the same way every episode):

- **The product box mascot** — white toy-packaging box, coloured top band with the product name,
  price on the face, cartoon eyes + grin, a vertical CONTENTS gauge (`পরিমাণ`). Its grin flattens on
  bad news; it winks on the outro.
- **The shelf** — a plank with hanging shelf tags (`ইউনিট দাম`, a big `$X / 1x`, a small plan line),
  laser sweep + scanner beep when a price rolls in (number-wheel).
- **Charts** — white chart cards on the paused stage, bars with 3px borders + hard shadows; data
  colours fixed per episode (old = blue, new/hype = pink, alternative = green).
- **Closing plate** — black ground, white-bordered frame, 12px yellow shadow.

## Channel

The series runs on the channel **শর্ত প্রযোজ্য** ("Shorto Projojjo", *Conditions Apply*), by Saidul
Badhon. Every video ends on the same sign-off card: the circled-asterisk mark, the wordmark
"শর্ত প্রযোজ্য", the byline "Shorto Projojjo · by Saidul Badhon", a call-to-action pill and
saidulbadhon.com. Templates: `assets/series/components/end-card-16x9.html` (long-form, 3.0s) and
`end-card-9x16.html` (Short, 2.5s). Copy to `compositions/frames/NN-end-card.html`, strip the
leading comment, replace `{{ID}}` with the frame id and `{{PILL}}` with the pill text
("পুরো লেখা + সব সোর্স" long-form, "পুরো ভিডিও চ্যানেলে ▶" Short). Channel art (logo, YouTube
banner, Facebook cover) is built by `videos/channel/build.mjs`.

## Voices (Gemini TTS, `assets/series/voices.json`)

- HOST = **Fenrir** (excitable, male) — a Bangladeshi late-night infomercial host.
- CHECKER = **Kore** (firm, female) — dry, deadpan, unhurried.
- Style prompts live in voices.json; each SCRIPT line adds a `**Delivery:**` note.
- One speaker per frame (the engine takes one voice per request).

## Sound

- Music: `series-jingle.mp3` (cheesy 90s infomercial funk) — full under HOST frames, dead stop on
  the freeze, muffled and quiet under CHECKER frames (the tape is paused), opens up on the end card.
  `mix.mjs bed` does this from each frame's `- speaker:` line.
- SFX palette (`assets/sfx/`, all 19): `game-show-fanfare` (cold open, outro), `sparkle-shimmer`
  (payoff banner), `record-scratch` (every freeze), `orchestra-hit` (title sting), `marker-squeak`
  (every red-marker stroke), `rubber-stamp` / `stamp-thud` (stamps, banners), `barcode-scanner-beep`
  (every price tag), `sad-trombone` (the host's deflation), `cash-register-ka-ching`,
  `crickets-chirping` (after the host's "…right?"), `whoosh` (camera pans, crash-ins), `heavy-impact`,
  `telephone-ring` ("call now"), `ding-bell` (bonus cards), `pop` (badges/rows), `sign-flip`,
  `metal-clang` (things falling), `chime` (end card). Trim long ones with `dur`; SFX sit at
  0.25–0.45 volume (the scratch at 0.6).

## Bangla copy conventions

- Register: everyday Bangladeshi Bangla, English kept for tech terms and product names (ChatGPT,
  Codex, plan, usage, unit price) — the way Bangladeshi tech YouTubers talk.
- Localize the jokes, don't translate them: "শর্ত প্রযোজ্য" (conditions apply), "সুপারশপ",
  "পাইকারি ছাড়" (wholesale discount), "অফার", wordplay like "অর্ধেক সত্যি" (half true).
- On screen: Western digits for prices, multipliers, percentages, dates and chart values; product
  names as written; VHS readouts (⏸ PAUSE, ▶ PLAY, SP) stay English.
- Spoken numbers in words ("দুইশো ডলার", "বিশ গুণ") so TTS reads them naturally.
- Fonts: Latin first, Bengali fallback — "Inter","Noto Sans Bengali" / "Space Grotesk","Noto Sans
  Bengali" / "Permanent Marker","Atma"; Bengali text `letter-spacing: 0`, multi-line
  `line-height ≥ 1.2`.
