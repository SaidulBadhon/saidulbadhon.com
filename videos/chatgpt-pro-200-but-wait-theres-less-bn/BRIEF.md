---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "ChatGPT Pro $200 is back at the same price with half the usage — its bulk discount is gone, while Claude Max 20x still gives 20x for $200."
destination: youtube
aspect: 1920x1080
language: bn
audience: "Bangla-speaking (mainly Bangladeshi) ChatGPT / Codex users and developers watching tech YouTube"
length: ~3min
angle: narrative
narration: yes
version_of: ../chatgpt-pro-200-but-wait-theres-less
---

## Intent

The Bangla version of the approved English video "But wait — there's LESS!" (user, 2026-10-02:
"I loved it, can we do the same video but in bangla"). Same story, same 19 frames, same look,
same jokes — localized, not translated word for word.

## Customizations

- Voices: Google Gemini TTS (user's choice; HeyGen has no Bangla). HOST = Fenrir (excitable),
  CHECKER = Kore (firm); delivery directed per line via style prompts. Key in `.env` (git-ignored).
- On-screen text in Bangla (user's choice). Product names, model names, prices, multipliers and
  percentages stay as in the post ($200, 20x, GPT-6 Sol, 50%).
- Register: everyday Bangladeshi Bangla, English for tech terms (user's choice).

## Notes

- Decided (not asked): Western digits on screen everywhere (prices, charts, dates) to match the
  post's numbers and Bangladeshi tech-YouTube convention; VHS "⏸ PAUSE / ▶ PLAY" readouts stay in
  English like a real VCR; localized gags — "শর্ত প্রযোজ্য" (conditions apply), "সুপারশপ",
  "পাইকারি ছাড় নেই" (no wholesale discount), "অর্ধেক সত্যি" (half true).
- Fonts: Noto Sans Bengali 500–900 (display/body fallback after Inter), Atma 500–700 (marker
  handwriting fallback after Permanent Marker). Bengali text: letter-spacing 0, line-height ≥ 1.2.
- Timing: Gemini returns no word timestamps and no transcriber is installed, so
  `.hyperframes/align.mjs` derives word onsets from speech pauses (± ~0.2s within a phrase).
- Shared assets copied from the English project: frame.md, fonts, SFX, music bed, number-wheel.
- Separate sibling project (not inside the English one) because the workflow scripts, Studio
  preview and render each assume one index.html per project.
