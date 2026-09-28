import type { Metadata } from "next";

/** The live site. Canonical URLs, the sitemap, feeds and structured data all
 *  point here, so preview deployments never compete with it in search. */
export const SITE_URL = "https://saidulbadhon.com";

export const site = {
  name: "Saidul Badhon",
  jobTitle: "Senior Software Engineer",
  /** Title of the home page, and the default for pages without one. */
  title: "Saidul Badhon | Senior Software Engineer",
  /** Meta description of the home page. Keep it under about 160 characters. */
  description:
    "Saidul Badhon is a senior software engineer building AI products. Case studies of Jutsu, Postt.ai and Dokan.gg, plus writing on AI agents and security.",
  email: "Saidulbadhon@gmail.com",
  /** Profile photo, in public/. */
  image: "/profileImg.jpeg",
  worksFor: { name: "Jutsu", url: "https://jutsu.ai" },
  /** Where Saidul is based. `countryCode` is ISO 3166-1 alpha-2. */
  location: { city: "Dhaka", country: "Bangladesh", countryCode: "BD" },
  linkedin: "https://www.linkedin.com/in/saidulbadhon",
  github: "https://github.com/SaidulBadhon",
  blog: {
    name: "Saidul Badhon's blog",
    description:
      "Notes and writing by Saidul Badhon on software engineering, AI agents, security and building products.",
    /** RSS feed, at src/app/feed.xml. */
    feed: "/feed.xml",
  },
} as const;

/** A path on this site as a full URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Metadata for a page: its title and description, a canonical URL, and
 * matching Open Graph tags. Next.js replaces nested fields like `openGraph`
 * and `alternates` wholesale rather than merging them with the root layout's,
 * so the shared parts are repeated here. The page's opengraph-image file
 * supplies the share image.
 */
export function pageMetadata({
  path,
  title,
  description,
  openGraph,
}: {
  path: string;
  /** Shown in the tab as "<title> | Saidul Badhon"; omit on the home page. */
  title?: string;
  description: string;
  openGraph?: Metadata["openGraph"];
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: site.blog.feed, title: site.blog.name }] },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: title ?? site.title,
      description,
      ...openGraph,
    },
  };
}
