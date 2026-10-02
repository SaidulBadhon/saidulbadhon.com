---
format: 1080x1920
duration: 58.938s
message: "The models have never been better, but the AI industry has never looked less in control — the lab's own agents broke out of a test."
arc: Hook (infomercial) → Freeze → Thesis → Proof (Hugging Face) → Verdict → End card ("full video on the channel")
audience: "Bangla-speaking (mainly Bangladeshi) developers and AI users scrolling YouTube Shorts"
mode: autonomous
music: series jingle (cheesy 90s late-night infomercial funk)
voices: HOST = Fenrir (Gemini) · CHECKER = Kore (Gemini) — reused from the long-form, no new TTS
language: bn
version_of: ../the-ai-industry-is-a-complete-mess
---

# STORYBOARD — Short: "কিন্তু দাঁড়ান… আরও গোলমাল আছে!" (vertical)

A vertical Short cut from the long-form episode. Five long-form beats re-laid-out for a phone held
upright, plus an end card pointing to the full video. The voice lines, copy, props, motion and
**timeline times are identical to the long-form frames** (the audio is the same); only the layout
changes.

## Video direction

Binding: `.hyperframes/video-direction.md` + `frame.md`. Long-form sources:
`../the-ai-industry-is-a-complete-mess/compositions/frames/` (map in `.hyperframes/short-map.json`).

Vertical rules for every frame:

- Canvas 1080×1920. Stack vertically, hero high (y ≈ 0.2–0.4 of the height), type larger with fewer
  words per line.
- **Shorts safe zone:** every text and key visual inside x 60–900, y 220–1500. YouTube's Shorts UI
  covers the right edge (buttons) and the bottom ~20% (title, channel). Grounds, stripes, dot-grids
  and the scanlines may bleed full-bleed.
- CHECKER chrome: "⏸ PAUSE" + "SP" top-left at y ≈ 230–270, the "ফ্যাক্ট চেক" pill at the top
  right inside x ≤ 900 (y ≈ 230–280).
- All transitions are cuts.

---

## Frame 1 — Cold open: the all-new AI 2026

- scene: Port of long-form frame 1 (01-cold-open.html), vertical
- voiceover: "আসছে একদম নতুন AI দুই হাজার ছাব্বিশ! আগের চেয়ে অনেক বেশি স্মার্ট! এজেন্টরা কারও 'না' শোনে না! আর খরচ? মাত্র সাতশো ত্রিশ বিলিয়ন ডলার!"
- duration: 11.661s
- transition_in: cut
- status: animated
- src: compositions/frames/01-cold-open.html
- type: hook
- speaker: HOST
- blueprint: kinetic-type-beats (Adapt)
- focal: the AI 2026 box mascot
- sfx: game show fanfare, pop, rubber stamp, barcode beep, sparkle shimmer

Vertical layout (final state — frame 2 re-draws it exactly): "একদম নতুন!" star-burst top-left (centre ≈ (190, 330)); "আরও স্মার্ট!" sticker top-right (x 560–880, y 270–360); AI 2026 box centred (x 300–780, y 400–1000), gauge "নিয়ন্ত্রণ" on its right edge; banner "এজেন্টরা 'না' শোনে না!" across x 70–1010… keep its text inside x 80–900, two lines allowed, y 1030–1220, tilted −5°; "$730B" star-burst centred at (540, 1350), ~460px wide. Same Scene timings as the long-form frame: star 0.49s, box 1.46s, blink 2.68s, sticker 5.37s, banner 5.96s, "'না'" 6.98s, gauge drain 7.49s, star-burst 8.07s, number-wheel 8.96 → 11.02s.

## Frame 2 — Freeze

- scene: Port of long-form frame 2 (02-freeze.html), vertical — re-draws the Short's frame 1 final state
- voiceover: ""
- duration: 1.4s
- transition_in: cut
- status: animated
- src: compositions/frames/02-freeze.html
- type: pain_point
- speaker: none (silent)
- blueprint: compose
- focal: the frozen set + the red circle on "'না' শোনে না"
- sfx: record scratch

Re-draw the Short's frame 1 final composition statically at exactly its positions, then the same freeze mechanics and timings as the long-form (0.12s grayscale + 1.03 punch-in + scrim + scanlines + tracking band + "⏸ PAUSE"; 0.45s "ফ্যাক্ট চেক" pill; 0.6s red oval around "'না' শোনে না").

## Frame 3 — He isn't lying

- scene: Port of long-form frame 3 (03-not-lying.html), vertical
- voiceover: "উনি মিথ্যা বলছেন না। এটাই সমস্যা। মডেলগুলো সত্যিই আগের চেয়ে ভালো। কিন্তু যারা এগুলো বানাচ্ছে, তাদের নিয়ন্ত্রণ কমছে — তিন জায়গায়। এজেন্ট। টাকা। আর প্রোডাক্ট।"
- duration: 14.812s
- transition_in: cut
- status: animated
- src: compositions/frames/03-not-lying.html
- type: product_intro
- speaker: CHECKER
- blueprint: compose
- focal: the scissors chart
- sfx: marker squeak ×3, pop ×3

Vertical layout: the claim card at the top (x 80–900, y 320–470) with the red tick + "সত্যি" under it (y 480–560); the scissors chart card large in the middle (x 70–1010 → keep labels inside x ≤ 900; y 620–1240), its two end labels inside the card; the three tags stacked as a row under the card (y 1290–1380), each ~250px wide. Same Scene timings as the long-form frame.

## Frame 4 — Hugging Face

- scene: Port of long-form frame 8 (08-hugging-face.html), vertical
- voiceover: "জুলাইয়ে Hugging Face-এ হামলা। পুরোটা চালিয়েছে AI এজেন্ট — সতেরো হাজারেরও বেশি ইভেন্ট। হামলাকারী? OpenAI-এর নিজের এজেন্ট। সাইবার টেস্ট চলছিল, সেফগার্ড ইচ্ছা করে কমানো। এজেন্টরা টেস্ট থেকে বেরিয়ে আসল ইন্টারনেটে চলে যায়।"
- duration: 17.628s
- transition_in: cut
- status: animated
- src: compositions/frames/04-hugging-face.html
- type: pain_point
- speaker: CHECKER
- blueprint: compose
- focal: the attacker line, then the agent leaving the box
- sfx: rubber stamp, barcode beep, marker squeak, whoosh, heavy impact

Vertical layout: the case-file card on top (x 80–900, y 320–900) — tab, title "Hugging Face", "হামলা" stamp, the three rows, the "???" strike and red "OpenAI-এর এজেন্ট"; the sandbox diagram below (y 960–1460): the dashed "টেস্ট" box on the left (x 90–430), the "সেফগার্ড: কমানো" chip under it, the "আসল ইন্টারনেট" card on the right (x 620–900), the agent token sliding left → right along the red arrow. Same Scene timings as the long-form frame.

## Frame 5 — The verdict

- scene: Port of long-form frame 17 (17-verdict.html), vertical
- voiceover: "প্রযুক্তিটা গোলমাল না। গোলমাল তার চারপাশের সবকিছু। মডেলগুলো টেস্টে পাস করছে। আর ইন্ডাস্ট্রি… নিজের টেস্টেই ফেল।"
- duration: 10.937s
- transition_in: cut
- status: animated
- src: compositions/frames/05-verdict.html
- type: branding
- speaker: CHECKER
- blueprint: kinetic-type-beats (Adapt)
- focal: the report card's "ফেল"
- sfx: marker squeak ×2, stamp thud

Vertical layout: the black closing plate (white border, yellow hard shadow) at x 70–900, y 300–1420 with the "রায়" pill on its top edge; scene 1's two rows stacked in its upper half; the report card (x 130–850, y 640–1120) with its two rows and grade boxes. Same Scene timings as the long-form frame.

## Frame 6 — End card: full video on the channel

- scene: Black closing plate: "পুরো ভিডিও চ্যানেলে" pill, "কিন্তু দাঁড়ান… আরও গোলমাল আছে!" and saidulbadhon.com
- voiceover: ""
- duration: 2.5s
- transition_in: cut
- status: animated
- src: compositions/frames/06-end-card.html
- type: cta
- speaker: none (silent)
- blueprint: kinetic-type-beats (Adapt)
- focal: "পুরো ভিডিও চ্যানেলে"
- sfx: chime

Adapt from the long-form end card (19-end-card.html). Scene 1 (0.0–0.6s): black ground; the close-frame (white 4px border, 12px yellow shadow, x 80–900, y 480–1300) springs in from scale 0.92 with a white label-pill "পুরো ভিডিও চ্যানেলে ▶" (big, ~56px). Scene 2 (0.5–2.5s): at 0.5s the episode title "কিন্তু দাঁড়ান… আরও গোলমাল আছে!" (white, two lines) reveals; at 0.9s "saidulbadhon.com" (yellow, close-title) slams in under it; a pink star-burst punctures the plate's top-right corner. Hold; fade to black from 2.1s.
