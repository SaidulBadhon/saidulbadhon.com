---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "ChatGPT Pro $200 is back at the same price with half the usage — its bulk discount is gone, while Claude Max 20x still gives 20x for $200."
destination: youtube
aspect: 1920x1080
language: en
audience: "Heavy ChatGPT / Codex users and AI-curious developers watching tech YouTube"
length: 2-2.5min
angle: narrative
narration: yes
---

## Intent

A YouTube explainer of the blog post "ChatGPT Pro $200 Is Back, With Half the Usage"
(content/blogs/chatgpt-pro-200-is-back-with-half-the-usage.mdx). User's words: "engaging,
educational, and funny to effectively capture people's attention", featuring "voiceover, on-screen
text, illustrations, graphics, charts, and sound effects".

Chosen pitch (#5, mixed with #1): **"But wait — there's LESS!"** A cheesy late-night infomercial
host enthusiastically sells the "NEW Pro $200!" while a deadpan fact-checker keeps freezing the
frame, drawing on it with a red marker, and swapping the hype for the real chart. Opening: "Same
great $200 price! Now with… half the usage?" — record scratch, freeze. The fact-checker's
recurring prop is a supermarket shelf **unit-price tag** (price per 1x of Plus) borrowed from the
"Shrinkflation" pitch: $10 → $20 per 1x, same as Plus, no bulk discount left.

## Customizations

- Two voices: the infomercial host (over-the-top, upbeat) and the fact-checker (dry, deadpan).
- Freeze-frame + red-marker annotation interrupts as the recurring comedic device.
- Unit-price shelf tag counting $10 → $20 with a checkout-scanner beep.
- Real charts rebuilt from the post's chart data (content/charts/chatgpt-pro-200-is-back-with-half-the-usage.tsx).
- Sound effects throughout (record scratch, scanner beep, ka-ching, whoosh, buzzer).

## Notes

- Every number comes from the post and its chart file, as of September 30, 2026. No new facts.
- Stay fair, like the post: concede the real wins (no 5-hour cap, $2,500 credit for existing
  subscribers, GPT-6 Sol users roughly break even, Luna users get ~20% more output tokens) and the
  caveat that the two "20x" figures are measured against different $20 plans.
- Burned-in captions skipped: frames are text- and chart-dense; YouTube's own CC covers subtitles.
- Mode: autonomous ("ok do it"). Rendering stays gated on the preview-or-render question.
- Audio: HeyGen (user signed in, free plan). HOST = Ewan (Bright & Energetic, speed 1.1),
  CHECKER = Meredith (Serious & Composed). `.hyperframes/two-voice-audio.mjs` runs the engine
  once per speaker (one speaker per frame). This machine's DNS blocks `resource2.heygen.ai`;
  `.hyperframes/fetch-rewrite.mjs` (node --import) fetches the same files from `resource.heygen.ai`.
- Mix: `.hyperframes/mix.mjs cues` (word-timed SFX from `.hyperframes/sfx-cues.json`) before
  assembly; `.hyperframes/mix.mjs bed` after transitions — music full under HOST frames, dead stop
  on the freeze, muffled low-pass bed under CHECKER frames, open on the end card.
- Added a silent 3s end card (frame 19) with the blog URL, since the outro line ends on its last word.

## 2026-10-02 — Bangla version (follow-on)

The user asked for "the same video but in bangla". It is built as a sibling project,
`../chatgpt-pro-200-but-wait-theres-less-bn/` (its own BRIEF.md has the answers: Gemini TTS
voices, Bangla on-screen text, everyday Bangladeshi register). Same story, frames and look.
