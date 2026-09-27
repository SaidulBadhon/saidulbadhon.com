"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiGithub,
  FiImage,
  FiLock,
  FiMaximize2,
} from "react-icons/fi";
import ImageLightbox, { type LightboxImage } from "@/components/image-lightbox";
import { useIsClient } from "@/lib/hooks";
import { projectIconMap } from "@/lib/projectIcons";
import { toImage, type Project } from "@/content/projects";

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

/** Gallery rhythm: one full-width screen, then a pair, repeated. A lone
 *  screen at the end goes full width; a pair at the end stays a pair. */
function isWide(index: number, total: number) {
  if (total % 3 === 2 && index === total - 2) return false;
  return index % 3 === 0;
}

type ProjectDetailPageProps = {
  project: Project;
  nextProject: Project;
};

export default function ProjectDetailPage({
  project,
  nextProject,
}: ProjectDetailPageProps) {
  const [viewing, setViewing] = useState<number | null>(null);

  const Icon = projectIconMap[project.icon];
  const { gradient, features } = project;
  const [name, tagline] = project.title.split(" | ");
  const technologies = project.technologies.length
    ? project.technologies
    : project.tags;
  const { live: liveUrl, github: githubUrl } = project.links;
  const host = liveUrl && new URL(liveUrl).hostname.replace(/^www\./, "");

  const images: LightboxImage[] = project.images.map((entry, index) => {
    const { image, caption } = toImage(entry);
    return {
      image,
      caption,
      alt: caption ?? `${project.title} screenshot ${index + 1}`,
    };
  });
  const [cover, ...screenshots] = images;
  const nextCover = nextProject.images[0] && toImage(nextProject.images[0]).image;

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.duration },
    { label: "Type", value: project.type },
    {
      label: "Stack",
      value:
        technologies.length > 2
          ? `${technologies.slice(0, 2).join(", ")} +${technologies.length - 2}`
          : technologies.join(", "),
    },
  ].filter((item) => item.value);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate -mt-28 overflow-hidden bg-gray-50 pt-32 sm:-mt-36 sm:pt-40 dark:bg-gray-900">
        <ScrollProgress gradient={gradient} />

        {/* Backdrop: a faint grid fading out, and a glow in the project's colours. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem]">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div
            className={`absolute left-1/2 top-0 h-112 w-5xl max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-linear-to-br ${gradient} opacity-25 blur-[120px] dark:opacity-20`}
          />
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div {...enter(0)}>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950 dark:text-slate-400 dark:hover:text-white"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              All projects
            </Link>
          </motion.div>

          <motion.div
            {...enter(1)}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 py-1 pl-1 pr-4 text-sm font-medium text-gray-600 shadow-xs backdrop-blur sm:mt-14 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br ${gradient}`}
            >
              <Icon size={13} className="text-white" />
            </span>
            Case study
          </motion.div>

          <motion.h1
            {...enter(2)}
            className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {name}
            {tagline && (
              <span
                className={`block bg-linear-to-r ${gradient} bg-clip-text pb-2 text-transparent`}
              >
                {tagline}
              </span>
            )}
          </motion.h1>

          <motion.p
            {...enter(3)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-gray-600 sm:text-xl dark:text-slate-400"
          >
            {project.description}
          </motion.p>

          {(liveUrl || githubUrl || screenshots.length > 0) && (
            <motion.div {...enter(4)} className="mt-10 flex flex-wrap items-center gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full bg-linear-to-r ${gradient} px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0`}
                >
                  Visit {host}
                  <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-xs transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
                >
                  <FiGithub />
                  Source code
                </a>
              )}
              {screenshots.length > 0 && (
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-900/5 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  <FiImage />
                  View gallery
                  <span className="text-gray-400 dark:text-slate-500">{screenshots.length}</span>
                </a>
              )}
            </motion.div>
          )}

          <motion.dl
            {...enter(5)}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
          >
            {meta.map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/85 px-5 py-4 backdrop-blur sm:px-6 sm:py-5 dark:bg-gray-900/85"
              >
                <dt className="text-xs font-medium tracking-[0.15em] text-gray-400 uppercase dark:text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1.5 font-medium text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </section>

        {/* Showcase: the cover, uncropped, in a browser window. */}
        {cover && (
          <motion.section
            className="relative mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8"
            style={{ transformPerspective: 1600 }}
            initial={{ opacity: 0, y: 60, rotateX: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          >
            <div
              aria-hidden
              className={`absolute inset-x-12 -inset-y-4 -z-10 rounded-full bg-linear-to-r ${gradient} opacity-30 blur-3xl dark:opacity-25`}
            />
            <BrowserFrame url={host}>
              <ZoomButton label="Open the cover image full screen" onClick={() => setViewing(0)}>
                <Image
                  src={cover.image}
                  alt={cover.alt}
                  sizes="(min-width: 1152px) 1104px, 100vw"
                  placeholder="blur"
                  preload
                  className="h-auto w-full"
                />
              </ZoomButton>
            </BrowserFrame>
          </motion.section>
        )}

        {/* Overview, with the details alongside. */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-12 px-4 sm:mt-32 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20 lg:px-8">
          <motion.section {...reveal}>
            <SectionLabel index={1} title="Overview" gradient={gradient} />
            <p className="mt-6 text-lg leading-8 text-pretty text-gray-700 sm:text-xl sm:leading-9 dark:text-slate-300">
              {project.longDescription}
            </p>
          </motion.section>

          <aside>
            <motion.div
              {...reveal}
              className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-xs backdrop-blur dark:border-white/10 dark:bg-white/3"
            >
              <AsideHeading>Built with</AsideHeading>
              <ul className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {project.tags.length > 0 && (
                <>
                  <div className="my-6 h-px bg-gray-200 dark:bg-white/10" />
                  <AsideHeading>Focus</AsideHeading>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    {project.tags.join(" · ")}
                  </p>
                </>
              )}

              {(liveUrl || githubUrl) && (
                <>
                  <div className="my-6 h-px bg-gray-200 dark:bg-white/10" />
                  <AsideHeading>Links</AsideHeading>
                  <ul className="mt-3 space-y-1">
                    {liveUrl && <AsideLink href={liveUrl} label={host ?? "Live site"} />}
                    {githubUrl && <AsideLink href={githubUrl} label="Source code" />}
                  </ul>
                </>
              )}
            </motion.div>
          </aside>
        </div>

        {features.length > 0 && (
          <motion.section
            {...reveal}
            className="mx-auto mt-24 max-w-6xl px-4 sm:mt-32 sm:px-6 lg:px-8"
          >
            <SectionLabel index={2} title="Highlights" gradient={gradient} />
            <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="group flex gap-4 border-t border-gray-200 py-6 dark:border-white/10"
                >
                  <span
                    className={`bg-linear-to-br ${gradient} bg-clip-text pt-0.5 font-mono text-sm font-semibold text-transparent`}
                  >
                    {pad(index + 1)}
                  </span>
                  <span className="leading-relaxed text-gray-700 transition-colors group-hover:text-gray-950 dark:text-slate-300 dark:group-hover:text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        {/* Gallery */}
        {screenshots.length > 0 && (
          <section
            id="gallery"
            className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8"
          >
            <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel index={3} title="Gallery" gradient={gradient} />
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                  Inside the product
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {screenshots.length} screens · click any to enlarge
              </p>
            </motion.div>

            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {screenshots.map((shot, index) => {
                const wide = isWide(index, screenshots.length);
                return (
                  <motion.figure
                    key={shot.image.src}
                    {...reveal}
                    className={wide ? "md:col-span-2" : undefined}
                  >
                    <ZoomButton
                      label={`Open "${shot.alt}" full screen`}
                      onClick={() => setViewing(index + 1)}
                      className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/10 sm:rounded-2xl dark:border-white/10 dark:bg-gray-950 dark:hover:shadow-black/40"
                    >
                      <Image
                        src={shot.image}
                        alt={shot.alt}
                        sizes={
                          wide
                            ? "(min-width: 1152px) 1104px, 100vw"
                            : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
                        }
                        placeholder="blur"
                        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </ZoomButton>
                    {shot.caption && (
                      <figcaption className="mt-4 flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                        <span className="pt-px font-mono text-xs text-gray-400 dark:text-slate-500">
                          {pad(index + 1)}
                        </span>
                        {shot.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Next project */}
        <section className="mx-auto mt-28 max-w-6xl px-4 pb-24 sm:mt-36 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition-colors hover:border-gray-300 sm:flex-row sm:items-center sm:p-10 dark:border-white/10 dark:bg-white/3 dark:hover:border-white/20"
            >
              <div
                aria-hidden
                className={`absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-linear-to-br ${nextProject.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
              />
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase dark:text-slate-500">
                  Next project
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                  {nextProject.title}
                </h2>
                <p className="mt-3 max-w-md text-gray-600 dark:text-slate-400">
                  {nextProject.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  View case study
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              {nextCover && (
                <div className="w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-lg sm:w-80 dark:border-white/10">
                  <Image
                    src={nextCover}
                    alt=""
                    sizes="(min-width: 640px) 320px, 100vw"
                    placeholder="blur"
                    className="aspect-16/10 h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </Link>
          </motion.div>
        </section>

        <ImageLightbox images={images} index={viewing} onChange={setViewing} />
      </main>
    </MotionConfig>
  );
}

/** Reading progress, pinned above the site header. */
function ScrollProgress({ gradient }: { gradient: string }) {
  const isClient = useIsClient();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  if (!isClient) return null;
  return createPortal(
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-1000 h-0.5 origin-left bg-linear-to-r ${gradient}`}
    />,
    document.body
  );
}

function BrowserFrame({
  url,
  children,
}: {
  url?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 sm:rounded-2xl dark:border-white/10 dark:bg-gray-950 dark:shadow-black/50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/3">
        <div className="flex w-12 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500 ring-1 ring-gray-200 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10">
            <FiLock size={10} className="shrink-0" />
            {url}
          </div>
        )}
        <div className="ml-auto w-12" />
      </div>
      {children}
    </div>
  );
}

/** An image that opens the full-screen viewer, with a hover hint. */
function ZoomButton({
  label,
  onClick,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white/95 text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-900/95 dark:text-white">
        <FiMaximize2 size={15} />
      </span>
    </button>
  );
}

function SectionLabel({
  index,
  title,
  gradient,
}: {
  index: number;
  title: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-gray-400 dark:text-slate-500">{pad(index)}</span>
      <span className={`h-px w-10 bg-linear-to-r ${gradient}`} />
      <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-900 uppercase dark:text-white">
        {title}
      </h2>
    </div>
  );
}

function AsideHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase dark:text-slate-500">
      {children}
    </h3>
  );
}

function AsideLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group -mx-2 flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-900/5 dark:text-slate-200 dark:hover:bg-white/5"
      >
        {label}
        <FiArrowUpRight className="text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-500" />
      </a>
    </li>
  );
}
