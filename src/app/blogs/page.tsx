import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/json-ld";
import { PostMeta } from "@/components/post-meta";
import { getCover, getPosts, type Post } from "@/content/blogs";
import { absoluteUrl, pageMetadata, site } from "@/lib/site";
import { BLOG_ID, WEBSITE_ID, author, breadcrumbs, graph } from "@/lib/structured-data";

export const metadata = pageMetadata({
  path: "/blogs",
  title: "Blog",
  description: site.blog.description,
  // Shared links show only this title, so it names whose blog it is.
  openGraph: { title: site.blog.name },
});

/** Fade and rise into place on load; pair with an animation delay to stagger. */
const rise =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:fill-mode-both";

export default async function BlogPage() {
  const posts = getPosts();
  const covers = await Promise.all(posts.map(getCover));
  const [lead, ...rest] = posts.map((post, index) => ({ post, cover: covers[index] }));

  const structuredData = graph(
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      url: absoluteUrl("/blogs"),
      name: site.blog.name,
      description: site.blog.description,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      author: author(),
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blogs/${post.slug}`)}#article`,
        url: absoluteUrl(`/blogs/${post.slug}`),
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: author(),
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blogs" },
    ])
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
      <JsonLd data={structuredData} />
      <header
        className={`${rise} flex flex-col gap-6 border-b border-gray-200 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 dark:border-white/10`}
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase dark:text-slate-400">
            Blog
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl dark:text-white">
            Notes &amp; writing
          </h1>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
          Thoughts on software engineering, the things I&apos;m building, and what I learn along
          the way.
        </p>
      </header>

      {lead ? (
        <>
          <div className={`${rise} mt-12 [animation-delay:120ms] sm:mt-16`}>
            <LeadStory post={lead.post} cover={lead.cover} />
          </div>

          {rest.length > 0 && (
            <section
              aria-labelledby="more-posts"
              className={`${rise} mt-20 [animation-delay:240ms] sm:mt-28`}
            >
              <div className="flex items-center gap-4">
                <h2
                  id="more-posts"
                  className="text-xs font-semibold tracking-[0.2em] text-gray-900 uppercase dark:text-white"
                >
                  More posts
                </h2>
                <span className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map(({ post, cover }) => (
                  <li key={post.slug}>
                    <PostCard post={post} cover={cover} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <p className="mt-16 rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-500 dark:border-white/15 dark:text-slate-400">
          No posts yet. Check back soon.
        </p>
      )}
    </main>
  );
}

type StoryProps = { post: Post; cover?: StaticImageData };

function LeadStory({ post, cover }: StoryProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group grid items-center gap-8 focus-visible:outline-2 focus-visible:outline-offset-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
    >
      <Cover
        image={cover}
        sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
        preload
      />
      <div>
        <Eyebrow post={post} latest />
        <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl dark:text-white">
          <Underlined>{post.title}</Underlined>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
          {post.description}
        </p>
        <PostMeta post={post} className="mt-6" />
      </div>
    </Link>
  );
}

/** "Latest post" on the lead story, then the post's first tag. */
function Eyebrow({
  post,
  latest = false,
  className = "",
}: {
  post: Post;
  latest?: boolean;
  className?: string;
}) {
  const [topic] = post.tags;
  if (!latest && !topic) return null;
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase dark:text-slate-400 ${className}`}
    >
      {latest && <span className="text-gray-950 dark:text-white">Latest post</span>}
      {latest && topic && <span aria-hidden className="h-px w-6 bg-gray-300 dark:bg-white/20" />}
      {topic}
    </p>
  );
}

function PostCard({ post, cover }: StoryProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-8"
    >
      <Cover
        image={cover}
        sizes="(min-width: 1152px) 352px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
      />
      <Eyebrow post={post} className="mt-6" />
      <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight text-balance text-gray-950 dark:text-white">
        <Underlined>{post.title}</Underlined>
      </h3>
      <p className="mt-2 line-clamp-2 leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
        {post.description}
      </p>
      <PostMeta post={post} className="mt-4" />
    </Link>
  );
}

/** The cover image. Posts without one get a soft wash in the site's colours
 *  instead. */
function Cover({
  image,
  sizes,
  preload = false,
}: {
  image?: StaticImageData;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-gray-900/10 dark:border-white/10 dark:bg-white/5 dark:group-hover:shadow-black/40">
      {image ? (
        <Image
          src={image}
          alt=""
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          fill
          className="object-cover object-top-left transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-[#fbe2e3] to-[#dbd7fb] dark:from-[#946263]/40 dark:to-[#676394]/40">
          <div className="bg-grid absolute inset-0" />
        </div>
      )}
    </div>
  );
}

/** Text whose underline draws in when its link is hovered. */
function Underlined({ children }: { children: ReactNode }) {
  return (
    <span className="bg-linear-to-r from-current to-current bg-size-[0%_2px] bg-bottom-left bg-no-repeat box-decoration-clone transition-[background-size] duration-500 ease-out group-hover:bg-size-[100%_2px]">
      {children}
    </span>
  );
}
