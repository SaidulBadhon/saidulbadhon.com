import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import JsonLd from "@/components/json-ld";
import { PostMeta, PostTags } from "@/components/post-meta";
import { getAdjacentPosts, getCover, getPost, getPosts, type Post } from "@/content/blogs";
import { SITE_URL, absoluteUrl, pageMetadata } from "@/lib/site";
import { BLOG_ID, author, breadcrumbs, graph } from "@/lib/structured-data";

// Only the posts in content/blogs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/content/blogs/${slug}.mdx`);
  const { newer, older } = getAdjacentPosts(slug);
  const cover = await getCover(post);
  const url = absoluteUrl(`/blogs/${slug}`);

  const structuredData = graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      url,
      mainEntityOfPage: url,
      headline: post.title,
      description: post.description,
      image: [`${url}/opengraph-image`, ...(cover ? [absoluteUrl(cover.src)] : [])],
      datePublished: post.date,
      dateModified: post.date,
      author: author(),
      publisher: author(),
      keywords: post.tags,
      timeRequired: `PT${post.readingTime}M`,
      inLanguage: "en",
      isPartOf: { "@id": BLOG_ID },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blogs" },
      { name: post.title, path: `/blogs/${slug}` },
    ])
  );

  return (
    <main className="px-4 pb-28 sm:px-6">
      <JsonLd data={structuredData} />
      <article className="mx-auto max-w-6xl">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950 dark:text-slate-400 dark:hover:text-white"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          All posts
        </Link>

        <header className="mt-10 border-b border-gray-200 pb-10 dark:border-white/10">
          <PostMeta post={post} byline />
          <h1 className="mt-4 text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-gray-600 sm:text-xl dark:text-slate-400">
            {post.description}
          </p>
          <PostTags tags={post.tags} className="mt-6" />
        </header>

        <div className="prose prose-gray mt-10 max-w-none sm:prose-lg dark:prose-invert prose-headings:scroll-mt-32 prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-4 prose-img:rounded-xl">
          <Content />
        </div>
      </article>

      {(older || newer) && (
        <nav aria-label="More posts" className="mx-auto mt-20 grid max-w-6xl gap-4 sm:grid-cols-2">
          {older && <AdjacentPost post={older} label="Previous post" />}
          {newer && <AdjacentPost post={newer} label="Next post" next />}
        </nav>
      )}
    </main>
  );
}

function AdjacentPost({ post, label, next = false }: { post: Post; label: string; next?: boolean }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group flex flex-col rounded-2xl border border-gray-200 bg-white/70 p-6 backdrop-blur transition-colors hover:border-gray-300 dark:border-white/10 dark:bg-white/3 dark:hover:border-white/20 ${next ? "sm:col-start-2 sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase dark:text-slate-500">
        {!next && <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />}
        {label}
        {next && <FiArrowRight className="transition-transform group-hover:translate-x-1" />}
      </span>
      <span className="mt-3 font-semibold tracking-tight text-balance text-gray-950 dark:text-white">
        {post.title}
      </span>
    </Link>
  );
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return pageMetadata({
    path: `/blogs/${slug}`,
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.tags,
    },
  });
}
