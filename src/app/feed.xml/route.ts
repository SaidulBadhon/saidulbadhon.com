import { getPosts } from "@/content/blogs";
import { absoluteUrl, site } from "@/lib/site";

// Built once at build time, like the pages.
export const dynamic = "force-static";

const entities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};
const escape = (text: string) => text.replace(/[&<>"']/g, (char) => entities[char]);

const rfc822 = (date: string) => new Date(date).toUTCString();

/** The blog as an RSS 2.0 feed, for feed readers. */
export function GET() {
  const posts = getPosts();

  const items = posts.map((post) => {
    const url = absoluteUrl(`/blogs/${post.slug}`);
    return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <dc:creator>${escape(site.name)}</dc:creator>
      <description>${escape(post.description)}</description>${post.tags
        .map((tag) => `\n      <category>${escape(tag)}</category>`)
        .join("")}
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(site.blog.name)}</title>
    <link>${absoluteUrl("/blogs")}</link>
    <description>${escape(site.blog.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl(site.blog.feed)}" rel="self" type="application/rss+xml"/>${
      posts[0] ? `\n    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>` : ""
    }${items.join("")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
