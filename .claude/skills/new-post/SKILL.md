---
name: new-post
description: Saidul's content pipeline for saidulbadhon.com. From a topic, an idea and some info, write the blog post (English MDX with charts + cover), then make the Bangla YouTube video in the "কিন্তু দাঁড়ান…" host-vs-fact-checker series, a vertical Bangla Short cut from it, three thumbnails, and the YouTube titles + descriptions. Use when the user says /new-post, "new post", "write a post and make the videos", or hands over a topic for the blog + YouTube.
---

# /new-post — blog post → Bangla video + Short → thumbnails → YouTube metadata

One topic in, a full content drop out. The user's standing choices (2026-10-02) are baked in;
don't re-ask them:

| Decision | Standing answer |
| --- | --- |
| Blog post | English MDX on saidulbadhon.com, with charts and a cover (always) |
| Videos | **Bangla long-form (16:9)** + **Bangla vertical Short (9:16)**. No English video. |
| Video format | The recurring series: infomercial **HOST** vs. deadpan **FACT-CHECKER** (`references/series-bible.md`). No concept pitch round. |
| Check-ins | ① approve the blog draft before any video work; ② "render now?" before each render. Everything else runs on its own. |
| Shipping | The post goes out as a branch + PR into `main`. Going live (`production`) stays the user's call. |
| Thumbnails | Three variants (A/B/C) for YouTube Test & Compare, long-form only. |

Inputs: a **topic**, the user's **idea/angle** (their take), and **info** (notes, links, numbers).
If one of the three is missing, ask for it once before starting. Everything else is decided
here; state decisions with a one-line reason instead of asking.

## Stage 1 — Blog post (→ check-in ①)

Follow `references/blog-post.md`. In short:

1. Research: verify every number the user gave, find primary sources (WebSearch/WebFetch),
   collect the links the post will cite. Never invent a figure; if data is missing, say so.
2. Write `content/blogs/<slug>.mdx` in the user's voice (read 2 recent posts first),
   charts in `content/charts/<slug>.tsx` using `components/charts/`, a cover via
   `scripts/make-cover.mjs`, and a "note on sources" footer.
3. Verify: `npm run typecheck` passes and `npx eslint actions components content context lib src` has no errors; open the post on the dev server
   (`npm run dev`, /blogs/<slug>) and check it renders, charts included.
4. **Check-in ①:** summarise the post (title, thesis, sections, charts, cover) and ask
   "approve, or what changes?". Revise until approved. Then branch + commit + PR
   (`references/blog-post.md` § Shipping). Do not start Stage 2 before approval.

## Stage 2 — Bangla long-form video

Follow `references/video-longform.md` (the full build, step by step). In short:

1. Scaffold `videos/<slug>/` with `scripts/new-video-project.mjs` (series kit included).
2. Write the beat sheet (`STORYBOARD.md`, 14–19 frames, the series template) and the Bangla
   script (`SCRIPT.md`, one speaker per frame) from the **approved post**.
3. Voice it: `.hyperframes/gemini-paced.mjs` (Gemini Fenrir/Kore, paced for the free tier,
   auto-falls back to the lite model at the daily cap) → `tighten.mjs` → `align.mjs` →
   `sync-durations`.
4. Shot design with the aligned Bangla word times → frame packets → frame workers
   (**Sonnet, waves of 5**) → SFX cues → assemble → transitions → `mix.mjs bed`.
5. `npx hyperframes check` must pass (known fixes in `references/video-longform.md` § Checks);
   contact sheet. **Check-in ②:** "render now, or preview first?" → render.

## Stage 3 — Bangla vertical Short

Follow `references/video-short.md`: 4–6 beats lifted from the long-form (its voice lines are
reused, so no new TTS), re-laid-out for 1080×1920, ≤ 60s, ending on a "full video" card.
Seed with `scripts/short-from-long.mjs`, port frames with Sonnet workers, check, **check-in ②**,
render.

## Stage 4 — Thumbnails, titles, descriptions

Follow `references/youtube-metadata.md`:

- `scripts/make-thumbnails.mjs` → `videos/<slug>/youtube/thumbnail-{a,b,c}.jpg` (look at all
  three; fix and re-run if any text clips).
- `.hyperframes/chapters.mjs` → chapters for the long-form description.
- Write `videos/<slug>/youtube/PUBLISH.md`: Bangla titles (3 options + pick), description,
  chapters, tags, hashtags, pinned comment, and the Short's title + description.

## Finish

Report, in plain terms: the PR link (post), both MP4 paths with durations, the thumbnails,
`PUBLISH.md`, anything unverified (pronunciation can't be checked by ear; which lines used the
lite voice model), and what the user does next (merge → production; upload; link the Short to
the long-form). Keep `videos/` output out of the post's PR.

## Budgets and limits (learned the hard way)

- **Gemini TTS free tier:** 3 requests/min and **10 requests/day per model**. A long-form is
  ~15–18 lines; `gemini-paced.mjs` spreads them across models automatically. The Short reuses
  long-form audio. If every model is capped, stop and say so (resets daily; or the user can
  enable billing on the key). The key lives in the repo-root `.env` (`GEMINI_API_KEY`); never
  create a `.env` in a video project (the loader stops at the first `.env` it finds).
- **Session usage:** never fan out 19 Opus workers at once (that hit the account limit).
  Frame workers run on `model: "sonnet"`, ≤ 5 concurrent, refilling as each finishes.
- **No transcriber on this machine:** word timings come from `align.mjs` (pause-based,
  ±0.2s). Good enough for reveals; say so in the report.
- HeyGen TTS does not speak Bangla; don't route voices there.
