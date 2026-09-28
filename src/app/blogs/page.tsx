import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { PostMeta, PostTags } from "@/components/post-meta";
import { getPosts } from "@/content/blogs";

export const metadata: Metadata = {
  title: "Blog | Saidul Badhon",
  description: "Writing by Saidul Badhon on software engineering and building products.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 sm:px-6">
      <header className="text-center">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          Blog
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">
          Notes &amp; writing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-gray-600 dark:text-slate-400">
          Thoughts on software engineering, the things I&apos;m building, and what I
          learn along the way.
        </p>
      </header>

      {posts.length > 0 ? (
        <ol className="mt-14 space-y-5 sm:mt-16">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group block rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/5 sm:p-8 dark:border-white/10 dark:bg-white/3 dark:hover:border-white/20 dark:hover:shadow-black/30"
              >
                <PostMeta post={post} />
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white">
                  {post.title}
                </h2>
                <p className="mt-2 leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
                  {post.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <PostTags tags={post.tags} />
                  <span className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Read post
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-16 rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-500 dark:border-white/15 dark:text-slate-400">
          No posts yet. Check back soon.
        </p>
      )}
    </main>
  );
}
