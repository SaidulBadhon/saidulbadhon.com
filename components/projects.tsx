"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "motion/react";
import { FaStar } from "react-icons/fa";
import { FiArrowRight, FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import BrowserFrame from "./browser-frame";
import { useSectionInView } from "@/lib/hooks";
import { projectIconMap } from "@/lib/projectIcons";
import { fiverrProjects, getStats } from "@/content/fiverr";
import { projects, toImage, type Project } from "@/content/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade and rise into place the first time it scrolls into view. */
const reveal = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: EASE },
  }) satisfies HTMLMotionProps<"div">;

const pad = (n: number) => String(n).padStart(2, "0");

const coverOf = (project: Project) =>
  project.images[0] && toImage(project.images[0]).image;

type CardLayout = {
  span: string;
  card: string;
  cover: string;
  body: string;
  title: string;
  sizes: string;
};

/**
 * Where a grid card sits: two columns on tablets, three on desktops (a
 * six-column grid, so a last pair can split a row evenly). A card left alone
 * on the last row spans it and turns sideways. Class names are spelled out in
 * full for each case because Tailwind only generates classes it can see.
 */
function cardLayout(index: number, total: number): CardLayout {
  const last = index === total - 1;
  const tabletWide = last && total % 2 === 1;
  const desktopWide = last && total % 3 === 1;
  const desktopHalf = total % 3 === 2 && index >= total - 2;
  const desktopSpan = desktopHalf ? "lg:col-span-3" : "lg:col-span-2";
  const sizes = desktopHalf
    ? "(min-width: 1152px) 564px, (min-width: 768px) 50vw, 100vw"
    : "(min-width: 1152px) 368px, (min-width: 768px) 50vw, 100vw";
  const sideways = {
    span: "",
    card: "",
    cover: "",
    body: "",
    title: "",
    sizes: "(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw",
  };

  if (tabletWide && desktopWide) {
    return {
      ...sideways,
      span: "md:col-span-2 lg:col-span-6",
      card: "md:flex-row",
      cover: "md:aspect-auto md:min-h-72 md:w-1/2",
      body: "md:justify-center md:p-10",
      title: "text-xl md:text-3xl",
    };
  }
  if (tabletWide) {
    return {
      ...sideways,
      span: `md:col-span-2 ${desktopSpan}`,
      card: "md:flex-row lg:flex-col",
      cover: "md:aspect-auto md:min-h-72 md:w-1/2 lg:aspect-16/10 lg:min-h-0 lg:w-auto",
      body: "md:justify-center md:p-10 lg:justify-start lg:p-6",
      title: "text-xl md:text-3xl lg:text-xl",
      sizes,
    };
  }
  if (desktopWide) {
    return {
      ...sideways,
      span: "lg:col-span-6",
      card: "lg:flex-row",
      cover: "lg:aspect-auto lg:min-h-72 lg:w-1/2",
      body: "lg:justify-center lg:p-10",
      title: "text-xl md:text-2xl lg:text-3xl",
    };
  }
  return {
    span: desktopSpan,
    card: "",
    cover: "",
    body: "",
    title: "text-xl md:text-2xl lg:text-xl",
    sizes,
  };
}

export default function Projects() {
  // The section is taller than the screen, so it counts as in view while it
  // crosses the middle of the viewport rather than when mostly visible.
  const { ref } = useSectionInView("Projects", 0, "-45% 0px -45% 0px");
  const [featured, ...rest] = projects;

  return (
    <section ref={ref} id="projects" className="mb-28 w-full scroll-mt-28 sm:mb-40">
      <div className="mx-auto max-w-6xl">
        <motion.header {...reveal()} className="mb-12 text-center sm:mb-16">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            Selected work
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
            My projects
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-slate-400">
            Products I've built and helped ship, from AI security operations to
            Web3 developer tools. Open any of them for the full case study.
          </p>
        </motion.header>

        {featured && <FeaturedProject project={featured} />}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              number={index + 2}
              layout={cardLayout(index, rest.length)}
              delay={(index % 3) * 0.08}
            />
          ))}
        </div>

        <FiverrCard />
      </div>
    </section>
  );
}

/** Where each screenshot sits in the Fiverr card's stack, back to front. */
const FIVERR_STACK = [
  "top-0 left-0 -rotate-6 group-hover:-translate-x-2 group-hover:-rotate-8",
  "top-[12%] right-0 rotate-3 group-hover:translate-x-2 group-hover:rotate-5",
  "bottom-0 left-[11%] group-hover:-translate-y-2",
];

/** The freelance work on Fiverr, linking to /fiverr, below the case studies. */
function FiverrCard() {
  const stats = getStats();
  // The first three browser screenshots, with the first on top.
  const previews = fiverrProjects
    .filter((project) => project.frame === "browser")
    .slice(0, 3)
    .reverse();
  const gradient = "from-emerald-500 to-teal-400";

  return (
    <motion.div {...reveal()} className="mt-6">
      <Link
        href="/fiverr"
        className="group relative isolate grid items-center gap-10 overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-xl shadow-gray-900/5 backdrop-blur transition-colors duration-500 hover:border-gray-300 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:p-12 dark:border-white/10 dark:bg-white/3 dark:shadow-black/20 dark:hover:border-white/20"
      >
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]"
        />
        <div
          aria-hidden
          className={`absolute -right-32 -bottom-32 -z-10 h-112 w-md rounded-full bg-linear-to-br ${gradient} opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
        />

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 py-1 pr-3 pl-1 text-xs font-semibold tracking-[0.15em] text-gray-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br ${gradient}`}
            >
              <FiBriefcase size={11} className="text-white" />
            </span>
            Freelance on Fiverr
          </span>

          <h3 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl dark:text-white">
            Fiverr work history
            <span className={`block bg-linear-to-r ${gradient} bg-clip-text pb-1 text-transparent`}>
              {stats.orders} orders for {stats.clients} clients
            </span>
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
            Web apps, React Native apps and fixes I built for clients on Fiverr, with screenshots
            from the deliveries and every review they left.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ["Rating", `${stats.rating} from ${stats.reviews} reviews`],
              ["Returning clients", String(stats.repeatClients)],
              [
                "Timeline",
                `${new Date(stats.first).getUTCFullYear()} – ${new Date(stats.last).getUTCFullYear()}`,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs tracking-[0.15em] text-gray-400 uppercase dark:text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                  {label === "Rating" && <FaStar size={12} className="text-amber-400" />}
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition group-hover:shadow-xl dark:bg-white dark:text-gray-950">
            See the work history
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        {/* Delivery screenshots, fanned out a little more on hover. */}
        <div aria-hidden className="relative mx-auto aspect-16/10 w-full max-w-xl">
          {previews.map((project, index) => (
            <div
              key={project.slug}
              className={`absolute w-[78%] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/15 transition-transform duration-700 ease-out dark:border-white/10 dark:bg-gray-950 dark:shadow-black/40 ${FIVERR_STACK[index]}`}
            >
              <Image
                src={project.images[0].image}
                alt=""
                sizes="(min-width: 1152px) 440px, (min-width: 1024px) 38vw, 78vw"
                placeholder="blur"
                className="aspect-2/1 h-auto w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const Icon = projectIconMap[project.icon];
  const { gradient } = project;
  const [name, tagline] = project.title.split(" | ");
  const cover = coverOf(project);
  const host =
    project.links.live && new URL(project.links.live).hostname.replace(/^www\./, "");

  return (
    <motion.div {...reveal()}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative isolate grid items-center gap-10 overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-xl shadow-gray-900/5 backdrop-blur transition-colors duration-500 hover:border-gray-300 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-12 dark:border-white/10 dark:bg-white/3 dark:shadow-black/20 dark:hover:border-white/20"
      >
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        />
        <div
          aria-hidden
          className={`absolute -top-32 -right-32 -z-10 h-112 w-md rounded-full bg-linear-to-br ${gradient} opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
        />

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 py-1 pr-3 pl-1 text-xs font-semibold tracking-[0.15em] text-gray-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br ${gradient}`}
            >
              <Icon size={11} className="text-white" />
            </span>
            Featured project
          </span>

          <h3 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl dark:text-white">
            {name}
            {tagline && (
              <span
                className={`block bg-linear-to-r ${gradient} bg-clip-text pb-1 text-transparent`}
              >
                {tagline}
              </span>
            )}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
            {project.description}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ["Role", project.role],
              ["Timeline", project.duration],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs tracking-[0.15em] text-gray-400 uppercase dark:text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1 font-medium text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <Tags tags={project.tags} className="mt-6" />

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition group-hover:shadow-xl dark:bg-white dark:text-gray-950">
            View case study
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        {cover && (
          <div className="relative">
            <div
              aria-hidden
              className={`absolute inset-x-8 inset-y-4 -z-10 rounded-full bg-linear-to-r ${gradient} opacity-30 blur-3xl`}
            />
            <BrowserFrame
              url={host}
              className="transition-transform duration-700 ease-out group-hover:transform-[perspective(1600px)_rotateY(-5deg)_rotateX(2deg)_scale(1.02)]"
            >
              <Image
                src={cover}
                alt={`${project.title} screenshot`}
                sizes="(min-width: 1152px) 620px, (min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="h-auto w-full"
              />
            </BrowserFrame>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

function ProjectCard({
  project,
  number,
  layout,
  delay,
}: {
  project: Project;
  number: number;
  layout: CardLayout;
  delay: number;
}) {
  const Icon = projectIconMap[project.icon];
  const { gradient } = project;
  const cover = coverOf(project);

  // Feed the cursor position to the spotlight layer.
  const trackPointer = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div {...reveal(delay)} className={layout.span}>
      <Link
        href={`/projects/${project.slug}`}
        onPointerMove={trackPointer}
        className="group relative block h-full rounded-2xl p-px transition-transform duration-500 ease-out hover:-translate-y-1"
      >
        {/* The border: neutral at rest, the project's gradient on hover. */}
        <span aria-hidden className="absolute inset-0 rounded-2xl bg-gray-200 dark:bg-white/10" />
        <span
          aria-hidden
          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-gray-900/10 dark:bg-gray-900 dark:group-hover:shadow-black/40 ${layout.card}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(0_0_0/0.04),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(255_255_255/0.07),transparent_45%)]"
          />

          <div
            className={`relative aspect-16/10 shrink-0 overflow-hidden bg-linear-to-br ${gradient} ${layout.cover}`}
          >
            {cover && (
              <Image
                src={cover}
                alt={`${project.title} screenshot`}
                fill
                sizes={layout.sizes}
                placeholder="blur"
                className="object-cover object-top opacity-90 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg backdrop-blur transition duration-500 group-hover:rotate-45 dark:bg-gray-950/80 dark:text-white">
              <FiArrowUpRight size={18} />
            </span>
          </div>

          <div className={`flex flex-1 flex-col p-6 ${layout.body}`}>
            <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-slate-400">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br ${gradient} shadow-sm`}
              >
                <Icon size={13} className="text-white" />
              </span>
              <span className="font-mono text-gray-400 dark:text-slate-500">{pad(number)}</span>
              <span className="h-px w-4 bg-gray-300 dark:bg-slate-700" />
              {project.duration}
            </div>

            <h3
              className={`mt-4 font-semibold tracking-tight text-gray-950 dark:text-white ${layout.title}`}
            >
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 leading-relaxed text-gray-600 dark:text-slate-400">
              {project.description}
            </p>

            <Tags tags={project.tags} className="mt-auto pt-5" max={4} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Tags({
  tags,
  className = "",
  max = 5,
}: {
  tags: string[];
  className?: string;
  max?: number;
}) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.slice(0, max).map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          {tag}
        </li>
      ))}
      {tags.length > max && (
        <li className="rounded-full px-1.5 py-0.5 text-xs text-gray-400 dark:text-slate-500">
          +{tags.length - max}
        </li>
      )}
    </ul>
  );
}
