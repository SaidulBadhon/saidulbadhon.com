---
name: new-post
description: Saidul's blog-post pipeline for saidulbadhon.com. From a topic, an idea and some info, research and write the post (English MDX with charts + a cover), check it in with the user, and ship it as a PR. Use when the user says /new-post, "new post", or hands over a topic for the blog. The Bangla videos made from posts live in the separate shorto-projojjo repo (its /new-video skill).
---

# /new-post — topic → researched blog post with charts and a cover → PR

One topic in, a shipped post out. The user's standing choices are baked in; don't re-ask them:

| Decision | Standing answer |
| --- | --- |
| Blog post | English MDX on saidulbadhon.com, with charts and a cover (always) |
| Check-in | Approve the draft before shipping. Everything else runs on its own. |
| Shipping | The post goes out as a branch + PR into `main`. Going live (`production`) stays the user's call. |
| Videos | Not made here. Once the post is merged, the Bangla video and Short for the শর্ত প্রযোজ্য (Shorto Projojjo) channel are made in the **shorto-projojjo** repo with `/new-video <slug>`. |

Inputs: a **topic**, the user's **idea/angle** (their take), and **info** (notes, links, numbers).
If one of the three is missing, ask for it once before starting. Everything else is decided
here; state decisions with a one-line reason instead of asking.

## The post

Follow `references/blog-post.md`. In short:

1. Research: verify every number the user gave, find primary sources (WebSearch/WebFetch),
   collect the links the post will cite. Never invent a figure; if data is missing, say so.
2. Write `content/blogs/<slug>.mdx` in the user's voice (read 2 recent posts first),
   charts in `content/charts/<slug>.tsx` using `components/charts/`, a cover via
   `scripts/make-cover.mjs`, and a "note on sources" footer.
3. Verify: `npm run typecheck` passes and `npx eslint actions components content context lib src` has no errors; open the post on the dev server
   (`npm run dev`, /blogs/<slug>) and check it renders, charts included.
4. **Check-in:** summarise the post (title, thesis, sections, charts, cover) and ask
   "approve, or what changes?". Revise until approved. Then branch + commit + PR
   (`references/blog-post.md` § Shipping).

## Finish

Report: the PR link, anything unverified, and what the user does next (merge → `production`;
then `/new-video <slug>` in the shorto-projojjo repo for the video). When an episode is
published, add it to `content/shorto-projojjo/index.ts` (with its YouTube link) so it shows on
saidulbadhon.com/shortoprojojjo.
