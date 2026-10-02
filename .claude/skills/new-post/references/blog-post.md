# Stage 1 — the blog post

## Read first

- Two recent posts, for voice and structure: `content/blogs/chatgpt-pro-200-is-back-with-half-the-usage.mdx`
  and `content/blogs/gpt-6-1-sol-is-a-really-good-model-i-will-never-use.mdx` (and their chart files in
  `content/charts/`).
- `content/blogs/index.ts` — frontmatter fields the site reads.
- `components/charts/` — the chart kit (bar, stacked bar, dot plot/dumbbell, line, stat tiles) and
  the colours in the `.viz` block of `src/app/globals.css` (add a `--viz-<thing>` colour there when a
  new product needs its own).

## Research

- Verify every number in the user's info against a primary source (vendor announcement, docs,
  pricing page, help-center article) or a reputable report. Keep the URLs; the post cites them
  inline and in the sources footer.
- Write down what you could not verify. Never fill a gap with a guess; leave it out or mark it as
  the author's estimate ("my arithmetic", "I think").
- Today's date matters: say "as of <date>" for anything that changes (prices, limits).

## Shape of a post

```mdx
---
title: "<specific, plain-language title>"
description: <one or two sentences: what happened + why it matters to the reader>
date: YYYY-MM-DD
tags: [AI, OpenAI, Claude]
draft: false
cover: <cover-file>.webp
---

import Image from "next/image";
import Callout from "@/components/callout";
import cover from "./<slug>/<cover-file>.webp";
import { AtAGlance, … } from "@/content/charts/<slug>";

<figure>
  <Image src={cover} alt="<describe the cover's words and chart>" sizes="(min-width: 768px) 768px, 100vw" placeholder="blur" />
  <figcaption><one-line caption></figcaption>
</figure>

<2–4 short paragraphs: the news, the catch, and the thesis in bold>

<AtAGlance />  — StatTiles: the 3–4 numbers that matter

## <section headings that make claims, not labels>
…charts placed right after the paragraph that sets them up…

## What I'd do / What this means for you   (practical, bulleted)

## The verdict   (2–3 paragraphs, ends on one quotable line)

---

_A note on sources: … every source, linked … Everything written as "I think" is my opinion._
```

Voice: first person, direct, conversational, short sentences, concrete numbers, fair to the side
it criticises (concede what's genuinely good), British spellings where the existing posts use them
("defence"). No hype words, no "in today's fast-paced world", no emoji. Links inline on the claim
they support.

## Charts (always built, never placeholders)

- Put the data and chart components in `content/charts/<slug>.tsx`, following the existing chart
  files: a header comment naming the sources and the as-of date, typed data arrays, one exported
  component per chart wrapped in `ChartFigure` (title, description, legend, source, and a `table`
  for accessibility).
- 2–4 charts per post is typical: the at-a-glance tiles plus the comparisons that carry the argument.
- Only leave a placeholder where data genuinely doesn't exist yet, as a draft `Callout`.

## Cover (always)

2048×1152 `.webp` in `content/blogs/<slug>/`, made with `scripts/make-cover.mjs` from a JSON spec:
a kicker (CAPS, the topic), a 2–3 line headline (first line ink, punchline in accent red), a legend +
a one-line source note, and a 2–4 bar chart of the post's key number (with a `delta` arrow when the
story is a change). Look at the result (Read the .webp) before using it. Set `cover:` in the
frontmatter and add the `<figure>` at the top.

## Verify before check-in ①

- `npm run typecheck` passes, and `npx eslint actions components content context lib src` has no errors (lint the source folders: a bare `npm run lint` also walks stray local worktrees under `.claude/worktrees/`).
- `npm run dev` → open `/blogs/<slug>`: the post renders, every chart renders, the cover shows.
  (Drafts show in dev; `draft: false` for the shipped post.)
- Every number in the post appears in a source you can name.

## Check-in ①

Post a short summary: title, description, the thesis, the section list, the charts, the cover
(show it), and anything unverified. Ask: "Approve, or what changes?" Revise until approved.

## Shipping (after approval)

- Branch from `main`: `git checkout -b <slug>`; commit the `.mdx`, the chart file, the cover (and
  any `globals.css` colour) — never the `videos/` folder — with a message in the repo's style
  ("Add the post on <subject>"), body explaining the angle; end with the attribution lines the
  harness provides.
- `git push -u origin <slug>` and open a PR into `main` (`gh pr create`), title = commit subject.
  Link the PR to the thread if the host offers `link_pull_request`.
- `main` only makes a Vercel preview; the live site deploys from `production`, which the user
  fast-forwards themselves. Say that in the report; don't move `production` unless asked.
