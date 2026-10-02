"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";
import { FiArrowRight, FiArrowUpRight, FiBookOpen, FiFacebook, FiPlay, FiYoutube } from "react-icons/fi";
import { channel, format } from "@/content/shorto-projojjo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade and rise into place the first time the element scrolls into view. */
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: EASE },
} satisfies HTMLMotionProps<"div">;

/** Staggered entrance for the hero, keyed by position. */
const enter = (step: number) =>
  ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.08 * step, ease: EASE },
  }) satisfies HTMLMotionProps<"div">;

const pad = (n: number) => String(n).padStart(2, "0");

/** The channel's yellow and pink, as a Tailwind gradient. */
const GRADIENT = "from-yellow-400 to-pink-500";

/** An episode, with the title and date of the post it was made from. */
export type EpisodeCard = {
  post: string;
  postTitle: string;
  postDate: string;
  titleBn: string;
  length: string;
  short: boolean;
  thumbnail: StaticImageData;
  youtube?: string;
};

export default function ShortoProjojjoPage({
  episodes,
  bengaliClassName,
}: {
  episodes: EpisodeCard[];
  /** Noto Sans Bengali, for the Bangla text. */
  bengaliClassName: string;
}) {
  const meta = [
    { label: "Episodes", value: String(episodes.length), note: "and counting" },
    { label: "Language", value: "বাংলা", note: "Bangla, with English tech terms", bangla: true },
    { label: "Every episode", value: "3 parts", note: "a video, a Short and a written post" },
    { label: "Sources", value: "All of them", note: "linked in every description" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate -mt-28 overflow-hidden bg-gray-50 pt-32 pb-24 sm:-mt-36 sm:pt-40 dark:bg-gray-900">
        {/* Backdrop: a faint grid fading out, and a glow in the channel's colours. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem]">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div
            className={`absolute left-1/2 top-0 h-112 w-5xl max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-linear-to-br ${GRADIENT} opacity-20 blur-[120px] dark:opacity-15`}
          />
        </div>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div>
            <motion.div
              {...enter(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 py-1 pr-4 pl-1 text-sm font-medium text-gray-600 shadow-xs backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br ${GRADIENT}`}>
                <FiPlay size={12} className="translate-x-px fill-white text-white" />
              </span>
              A video channel on YouTube and Facebook
            </motion.div>

            <motion.h1
              {...enter(1)}
              className="mt-6 text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl dark:text-white"
            >
              <span lang="bn" className={`${bengaliClassName} block leading-[1.3]`}>
                {channel.nameBn}
              </span>
              <span className={`mt-1 block bg-linear-to-r ${GRADIENT} bg-clip-text pb-2 text-transparent`}>
                {channel.tagline}
              </span>
            </motion.h1>

            <motion.p
              {...enter(2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-gray-600 sm:text-xl dark:text-slate-400"
            >
              Tech companies say it in big letters: &ldquo;New! Better! Cheaper!&rdquo;{" "}
              {channel.name} (<em>{channel.meaning.toLowerCase()}</em>) reads the small print, in
              Bangla. In every episode, an over-excited infomercial host sells the hype, and a
              deadpan fact-checker pauses the tape to show the real numbers.
            </motion.p>

            <motion.div {...enter(3)} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={channel.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >
                <FiYoutube />
                Watch on YouTube
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={channel.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-xs transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
              >
                <FiFacebook className="text-blue-600 dark:text-blue-400" />
                Follow on Facebook
              </a>
              <a
                href="#episodes"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-900/5 dark:text-slate-300 dark:hover:bg-white/5"
              >
                Episodes
                <span className="text-gray-400 dark:text-slate-500">{episodes.length}</span>
              </a>
            </motion.div>
          </div>

          {/* The channel, as it looks on YouTube: cover, avatar, name. */}
          <motion.div {...enter(2)}>
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 dark:border-white/10 dark:bg-gray-950 dark:shadow-black/40">
              <Image
                src={channel.cover}
                alt={`The ${channel.name} cover: the infomercial and the paused tape side by side, the name ${channel.nameBn} with a circled asterisk, and the tagline “the fine print of tech hype, in Bangla”`}
                sizes="(min-width: 1024px) 560px, 100vw"
                placeholder="blur"
                preload
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-wrap items-center gap-4 px-5 pb-5 sm:px-6">
                <Image
                  src={channel.logo}
                  alt={`The ${channel.name} logo: a circled asterisk on a pink star-burst`}
                  width={96}
                  height={96}
                  className="-mt-10 h-20 w-20 shrink-0 rounded-full ring-4 ring-white sm:h-24 sm:w-24 dark:ring-gray-950"
                />
                <div className="mt-3 min-w-0">
                  <p lang="bn" className={`${bengaliClassName} text-xl leading-snug text-gray-950 dark:text-white`}>
                    {channel.nameBn}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {channel.handle} · by Saidul Badhon
                  </p>
                </div>
                <a
                  href={channel.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 ml-auto rounded-full bg-gray-950 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-gray-950"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.dl
            {...enter(4)}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
          >
            {meta.map(({ label, value, note, bangla }) => (
              <div key={label} className="bg-white/85 px-5 py-4 backdrop-blur sm:px-6 sm:py-5 dark:bg-gray-900/85">
                <dt className="text-xs font-medium tracking-[0.15em] text-gray-400 uppercase dark:text-slate-500">
                  {label}
                </dt>
                <dd
                  lang={bangla ? "bn" : undefined}
                  className={`mt-1.5 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white ${bangla ? bengaliClassName : ""}`}
                >
                  {value}
                </dd>
                <dd className="mt-1 text-sm text-gray-500 dark:text-slate-400">{note}</dd>
              </div>
            ))}
          </motion.dl>
        </section>

        {/* The format */}
        <section id="format" className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <SectionLabel index={1} title="The format" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                &ldquo;But wait…&rdquo;
              </h2>
              <p className="max-w-sm text-sm text-gray-500 dark:text-slate-400">
                Every episode is part of the same recurring series,{" "}
                <span lang="bn" className={bengaliClassName}>কিন্তু দাঁড়ান…</span>, so the joke lands the
                same way every time.
              </p>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {format.map((step, index) => (
              <motion.figure
                key={step.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.08 * index }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/3"
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  sizes="(min-width: 768px) 360px, 100vw"
                  placeholder="blur"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="p-5 sm:p-6">
                  <p className="font-mono text-xs text-gray-400 dark:text-slate-500">{pad(index + 1)}</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{step.body}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Episodes */}
        <section id="episodes" className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <SectionLabel index={2} title="Episodes" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                Every episode, and the post behind it
              </h2>
              <p className="max-w-sm text-sm text-gray-500 dark:text-slate-400">
                Each video starts as a post on this blog, with every source linked. The video
                turns it into a few minutes you can watch.
              </p>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {episodes.map((episode) => (
              <motion.article
                key={episode.post}
                {...reveal}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/5 dark:border-white/10 dark:bg-white/3"
              >
                <div className="relative">
                  <Image
                    src={episode.thumbnail}
                    alt={`Thumbnail for ${episode.titleBn}`}
                    sizes="(min-width: 768px) 540px, 100vw"
                    placeholder="blur"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <span className="absolute right-3 bottom-3 rounded-md bg-gray-950/85 px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
                    {episode.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p lang="bn" className={`${bengaliClassName} text-xl leading-snug text-gray-950 dark:text-white`}>
                    {episode.titleBn}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    From the post{" "}
                    <span className="font-medium text-gray-800 dark:text-slate-200">{episode.postTitle}</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">Posted {episode.postDate}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-gray-600 dark:text-slate-300">
                    <span className="rounded-full border border-gray-200 px-2.5 py-1 dark:border-white/10">Bangla</span>
                    <span className="rounded-full border border-gray-200 px-2.5 py-1 dark:border-white/10">
                      {episode.length} video
                    </span>
                    {episode.short && (
                      <span className="rounded-full border border-gray-200 px-2.5 py-1 dark:border-white/10">+ a Short</span>
                    )}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
                    {episode.youtube ? (
                      <a
                        href={episode.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-rose-600 transition hover:text-rose-500 dark:text-rose-400"
                      >
                        <FiYoutube />
                        Watch the episode
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-400 dark:text-slate-500">
                        <FiYoutube />
                        On YouTube soon
                      </span>
                    )}
                    <Link
                      href={`/blogs/${episode.post}`}
                      className="inline-flex items-center gap-1.5 text-gray-800 transition hover:text-gray-950 dark:text-slate-200 dark:hover:text-white"
                    >
                      <FiBookOpen />
                      Read the post
                      <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Closing call to action */}
        <section className="mx-auto mt-28 max-w-6xl px-4 sm:mt-36 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-white/10 dark:bg-white/3"
          >
            <div
              aria-hidden
              className={`absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-linear-to-br ${GRADIENT} opacity-20 blur-3xl`}
            />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                Read the fine print with us
              </h2>
              <p className="mt-3 max-w-md text-gray-600 dark:text-slate-400">
                New episodes go up on YouTube and Facebook. The research and the sources behind
                each one stay here, on the blog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={channel.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 dark:bg-white dark:text-gray-950"
              >
                <FiYoutube />
                Subscribe
              </a>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-white/15 dark:text-white dark:hover:border-white/30"
              >
                The blog
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}

function SectionLabel({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-gray-400 dark:text-slate-500">{pad(index)}</span>
      <span className={`h-px w-10 bg-linear-to-r ${GRADIENT}`} />
      <p className="text-xs font-semibold tracking-[0.25em] text-gray-900 uppercase dark:text-white">{title}</p>
    </div>
  );
}
