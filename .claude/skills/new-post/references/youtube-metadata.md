# Stage 4 — thumbnails, titles, descriptions

Everything lands in `videos/<slug>/youtube/`.

## Thumbnails (long-form only; three variants for YouTube "Test & Compare")

Write `videos/<slug>/youtube/thumbs.json` and run
`node .claude/skills/new-post/scripts/make-thumbnails.mjs --video videos/<slug> --spec videos/<slug>/youtube/thumbs.json`.

```json
{
  "headline": ["একই দাম", "অর্ধেক ইউসেজ!"],
  "kicker": "ChatGPT Pro $200",
  "old": "20x", "new": "10x",
  "number": "−50%",
  "box": { "label": "CHATGPT PRO", "price": "$200", "gauge": 0.5 },
  "labels": { "before": "আগে", "after": "এখন" }
}
```

- Headline: two lines, ≤ 3 Bangla words each — the episode's whole story at phone size. Line 2 is
  the punch (it goes on the pink banner / white chip).
- `old` → `new`: the one number change the video is about (or two short values to contrast).
- `number`: ≤ 5 characters for the star-burst ("−50%", "2x", "$0").
- Read all three JPGs after rendering: nothing clipped, Bangla shaped correctly, readable when
  imagined at 320 px wide. Fix the spec and re-run if not. The Short needs no custom thumbnail.

## Chapters

`node videos/<slug>/.hyperframes/chapters.mjs` (needs `- chapter:` lines in STORYBOARD.md; it
enforces 00:00 first, ≥ 3 chapters, ≥ 10s each).

## PUBLISH.md

```markdown
# Publish — <post title>

## Long-form (videos/<slug>/renders/<slug>-bn.mp4 · <m:ss>)

**Title** (pick one; ≤ 60 characters reads in full)
1. <Bangla title — curiosity + the number> ← recommended (why)
2. <alternative>
3. <alternative>

**Thumbnail test:** thumbnail-a.jpg, thumbnail-b.jpg, thumbnail-c.jpg (upload all three to Test & Compare)

**Description**
<2–3 Bangla lines: the hook and what the viewer learns — the first ~150 characters show in search>

📖 পুরো লেখা ও সব সোর্স: https://saidulbadhon.com/blogs/<slug>

⏱️ অধ্যায়
<chapters.mjs output>

🔗 সোর্স
- <source 1 title> — <url>
- …

<3 hashtags, e.g. #ChatGPT #AI #বাংলা>

**Tags** (≤ 500 characters): <Bangla + English keywords, product names, common misspellings>
**Category:** Science & Technology · **Language:** Bengali · **Captions:** auto (Bengali)
**Pinned comment:** <a question that invites replies, in Bangla>
**AI disclosure:** the voices are AI-generated (Gemini TTS); decide on YouTube's
altered/synthetic-content setting at upload.

## Short (videos/<slug>-short/renders/<slug>-short-bn.mp4 · <s>s)

**Title:** <≤ 60 characters, Bangla, the hook> #Shorts
**Description:** <one line> · পুরো ভিডিও: <long-form link after upload> · লেখা: https://saidulbadhon.com/blogs/<slug>
**Related video:** set the long-form as the Short's related video after both are up.
```

Title craft: Bangla first with the product name in English, one concrete number, a curiosity gap
("দাম একই, কিন্তু…"), no all-caps, no clickbait the video doesn't pay off. The description's sources
are the post's sources.
