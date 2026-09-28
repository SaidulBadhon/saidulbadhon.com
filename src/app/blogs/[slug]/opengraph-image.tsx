import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/content/blogs";
import { ogImage, ogSize } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = `A post on ${site.blog.name}`;
export const size = ogSize;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return ogImage({
    eyebrow: post.tags[0] ? `Blog · ${post.tags[0]}` : "Blog",
    title: post.title,
    description: post.description,
    meta: `${formatDate(post.date)} · ${post.readingTime} min read`,
  });
}
