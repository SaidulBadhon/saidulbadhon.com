import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";
import { parse } from "yaml";

/** A blog post, read from the frontmatter of content/blogs/<slug>.mdx. */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** Publish date, YYYY-MM-DD. */
  date: string;
  tags: string[];
  draft: boolean;
  /** File name of the cover image, in content/blogs/<slug>/. */
  cover?: string;
  /** Estimated minutes to read. */
  readingTime: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blogs");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const IMAGE_FILE = /^[\w.-]+\.(?:png|jpe?g|webp|avif|gif)$/i;
const WORDS_PER_MINUTE = 225;

// Drafts show on the dev server and on Vercel preview deployments, never on
// the live site.
const showDrafts =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview";

/** Published posts, newest first. */
export function getPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/** The posts either side of this one in the list. */
export function getAdjacentPosts(slug: string): {
  newer?: Post;
  older?: Post;
} {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return { newer: posts[index - 1], older: posts[index + 1] };
}

/** The post's MDX source, without the frontmatter. */
export function getPostSource(post: Post): string {
  return fs.readFileSync(path.join(POSTS_DIR, `${post.slug}.mdx`), "utf8").replace(FRONTMATTER, "");
}

/** The post's cover image, if it has one. */
export async function getCover(post: Post): Promise<StaticImageData | undefined> {
  if (!post.cover) return undefined;
  const { default: image } = await import(`./${post.slug}/${post.cover}`);
  return image;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string): string {
  return dateFormat.format(new Date(date));
}

/** Reads a post's frontmatter, failing the build with a clear message if
 *  anything is missing or malformed. */
function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const invalid = (problem: string) => new Error(`content/blogs/${file}: ${problem}`);

  if (!SLUG.test(slug)) {
    throw invalid("rename the file to lowercase words joined by hyphens, e.g. my-first-post.mdx");
  }
  const match = source.match(FRONTMATTER);
  if (!match) {
    throw invalid("add frontmatter (title, description, date) between --- lines at the top");
  }

  const { title, description, date, tags = [], draft = false, cover } = (parse(match[1]) ??
    {}) as Record<string, unknown>;

  if (typeof title !== "string" || !title.trim()) {
    throw invalid("frontmatter needs a title");
  }
  if (typeof description !== "string" || !description.trim()) {
    throw invalid("frontmatter needs a description");
  }
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(Date.parse(date))) {
    throw invalid("frontmatter needs a date written as YYYY-MM-DD");
  }
  if (!Array.isArray(tags) || !tags.every((tag): tag is string => typeof tag === "string")) {
    throw invalid("tags should be a list, e.g. tags: [Next.js, React]");
  }
  if (typeof draft !== "boolean") {
    throw invalid("draft should be true or false");
  }
  if (
    cover !== undefined &&
    (typeof cover !== "string" ||
      !IMAGE_FILE.test(cover) ||
      !fs.existsSync(path.join(POSTS_DIR, slug, cover)))
  ) {
    throw invalid(`cover should name an image in content/blogs/${slug}/, e.g. cover: screenshot.webp`);
  }

  const words = source.slice(match[0].length).split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title,
    description,
    date,
    tags,
    draft,
    cover,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}
