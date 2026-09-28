# Saidul Badhon — Portfolio

Personal portfolio site built with Next.js 16, React 19, Tailwind CSS 4 and
Motion. All content is hardcoded in the repo, so there is no database or API
to run, and every page is statically generated.

Originally based on ByteGrad's [portfolio tutorial](https://youtu.be/sUKptmUVIBM).

## Requirements

- Node.js 20.9 or newer
- [Bun](https://bun.sh) (package manager)

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

The contact form emails messages through [Resend](https://resend.com). Set
`RESEND_API_KEY` in `.env.local` (see `.env.local.example`).
Without it the rest of the site works, and the form asks visitors to email
directly.

## Editing content

Everything lives in `content`:

```
content/
├── projects/
│   ├── index.ts              # which projects are shown, in order
│   ├── types.ts              # the Project shape
│   └── <project-slug>/
│       ├── index.ts          # title, description, tags, links, ...
│       └── cover.png         # images for this project
├── blogs/
│   ├── index.ts              # reads the posts and their frontmatter
│   └── <post-slug>.mdx       # one file per blog post
├── experience/
│   ├── index.ts              # work history timeline
│   └── logos/
└── skills.ts
```

**Add a project:** copy an existing project folder, rename it (the folder name
becomes the URL, `/projects/<slug>`), update its `index.ts` and images, then add
it to the list in `content/projects/index.ts`.

**Add screenshots to a project:** put the files in the project's folder, import
them in its `index.ts`, and add them to `images`. The first image is the cover;
the rest appear in the gallery on the project page, and any of them opens full
screen when clicked. To give an image a caption, list it as
`{ image: screenshot, caption: "What it shows" }` instead of just `screenshot`.

**Write a blog post:** add an `.mdx` file to `content/blogs`. The file name
becomes the URL (`my-first-post.mdx` is served at `/blogs/my-first-post`), and
the post appears on `/blogs`, newest first. Start the file with frontmatter:

```mdx
---
title: My first post
description: One or two sentences, shown under the title and on /blogs.
date: 2026-09-28
tags: [Next.js, React] # optional
cover: screenshot.webp # optional: an image in content/blogs/my-first-post/, shown on /blogs
draft: true # optional: keeps the post off the live site
---

Write the post in markdown here.
```

Drafts show on the dev server and on Vercel preview deployments, never on the
live site; delete the `draft` line to publish. Code blocks are highlighted, and
you can give them a file name and highlight lines, e.g. ` ```ts title="app.ts" {2-3} `.
Because posts are MDX, you can import images and React components and use them
as JSX (keep a post's images in a folder next to it). See
`content/blogs/env-file-on-github-for-three-years.mdx` for a post with an
image and code blocks. If a post's
frontmatter is missing or malformed, the build fails with a message naming the
file and what to fix.

## SEO and AI search

Site-wide details (name, job title, home page description, social links) live
in `lib/site.ts`. Everything below is generated from the content at build
time, so adding a project or post needs no extra steps:

- A title, description, canonical URL and Open Graph tags on every page
- A share image for every page (`opengraph-image.tsx`, drawn by `lib/og-image.tsx`);
  project cards include the cover screenshot and the project's gradient
- Structured data (JSON-LD) describing Saidul, the blog, each post and each case study
- `/sitemap.xml`, `/robots.txt` and an RSS feed at `/feed.xml`
- `/llms.txt` and `/llms-full.txt`, the site as markdown for AI assistants

The `description` of each post and project becomes its snippet in search
results, so keep it to a sentence or two.

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `bun run dev`       | Start the dev server         |
| `bun run build`     | Production build             |
| `bun run start`     | Serve the production build   |
| `bun run lint`      | Lint with ESLint             |
| `bun run typecheck` | Type-check with TypeScript   |
