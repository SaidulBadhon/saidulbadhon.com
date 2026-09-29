"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";
import { FaStar } from "react-icons/fa";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiImage,
  FiMaximize2,
} from "react-icons/fi";
import BrowserFrame from "@/components/browser-frame";
import ImageLightbox, { type LightboxImage } from "@/components/image-lightbox";
import {
  fiverrProfile,
  fiverrProjects,
  formatMonth,
  formatSpan,
  getClients,
  getFeaturedReview,
  getProjectOrders,
  getReviews,
  getStats,
  type FiverrOrder,
  type FiverrProject,
} from "@/content/fiverr";

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

/** Fiverr's green, as a Tailwind gradient. */
const GRADIENT = "from-emerald-500 to-teal-400";

/** Stack filters for the order list. */
const FILTERS = ["All", "React Native", "Next.js", "React", "Node.js"] as const;
type Filter = (typeof FILTERS)[number];

/** Shortens text to about `max` characters, at a word break. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[\s,.;:!-]+$/, "")}…`;
}

/** A project's orders, and the longest review among them. */
function projectDetails(project: FiverrProject) {
  const orders = getProjectOrders(project.slug);
  const review = orders
    .filter((order) => order.review)
    .sort((a, b) => b.review!.length - a.review!.length)[0];
  const span = formatSpan(orders[orders.length - 1].placed, orders[0].delivered);
  return { orders, review, span };
}

export default function FiverrPage() {
  const [viewing, setViewing] = useState<{ slug: string; index: number } | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const stats = getStats();
  const reviews = getReviews();
  const featured = getFeaturedReview();
  const clients = getClients()
    .map((client) => ({
      ...client,
      shown:
        filter === "All"
          ? client.orders
          : client.orders.filter((order) => order.tags.includes(filter)),
    }))
    .filter((client) => client.shown.length > 0);
  const shownOrders = clients.reduce((sum, client) => sum + client.shown.length, 0);

  const open = viewing && fiverrProjects.find((project) => project.slug === viewing.slug);
  const lightboxImages: LightboxImage[] = open
    ? open.images.map(({ image, caption }) => ({
        image,
        caption,
        alt: `${open.title}: ${caption}`,
      }))
    : [];

  const [lead, ...rest] = fiverrProjects;

  const meta = [
    { label: "Orders completed", value: String(stats.orders), note: "all delivered" },
    {
      label: "Clients",
      value: String(stats.clients),
      note: `${stats.repeatClients} came back for more`,
    },
    { label: "Rating", value: stats.rating, note: `from ${stats.reviews} reviews`, star: true },
    {
      label: "On Fiverr",
      value: `${new Date(stats.first).getUTCFullYear()}–${new Date(stats.last).getUTCFullYear()}`,
      note: `${formatMonth(stats.first)} to ${formatMonth(stats.last)}`,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate -mt-28 overflow-hidden bg-gray-50 pt-32 pb-24 sm:-mt-36 sm:pt-40 dark:bg-gray-900">
        {/* Backdrop: a faint grid fading out, and a glow in Fiverr's green. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem]">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div
            className={`absolute left-1/2 top-0 h-112 w-5xl max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-linear-to-br ${GRADIENT} opacity-20 blur-[120px] dark:opacity-15`}
          />
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...enter(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 py-1 pr-4 pl-1 text-sm font-medium text-gray-600 shadow-xs backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br ${GRADIENT}`}
            >
              <FiBriefcase size={13} className="text-white" />
            </span>
            Freelance work history
          </motion.div>

          <motion.h1
            {...enter(1)}
            className="mt-6 max-w-4xl text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl dark:text-white"
          >
            My work on Fiverr
            <span
              className={`mt-2 block bg-linear-to-r ${GRADIENT} bg-clip-text pb-2 text-transparent`}
            >
              {stats.orders} orders for {stats.clients} clients
            </span>
          </motion.h1>

          <motion.p
            {...enter(2)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-gray-600 sm:text-xl dark:text-slate-400"
          >
            From {formatMonth(stats.first)} to {formatMonth(stats.last)} I built web apps, React
            Native apps and fixes for clients on Fiverr, most of them in React, Next.js and
            Node.js. Here is every order, the projects I can show from the deliveries, and what
            clients wrote about the work.
          </motion.p>

          <motion.div {...enter(3)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={fiverrProfile}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 rounded-full bg-linear-to-r ${GRADIENT} px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0`}
            >
              My Fiverr profile
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#reviews"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-xs transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
              <FaStar className="text-amber-400" />
              Read the reviews
            </a>
            <a
              href="#orders"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-900/5 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Every order
              <span className="text-gray-400 dark:text-slate-500">{stats.orders}</span>
            </a>
          </motion.div>

          <motion.dl
            {...enter(4)}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
          >
            {meta.map(({ label, value, note, star }) => (
              <div
                key={label}
                className="bg-white/85 px-5 py-4 backdrop-blur sm:px-6 sm:py-5 dark:bg-gray-900/85"
              >
                <dt className="text-xs font-medium tracking-[0.15em] text-gray-400 uppercase dark:text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-2 text-3xl font-semibold tracking-tight text-gray-950 tabular-nums dark:text-white">
                  {value}
                  {star && <FaStar size={20} className="text-amber-400" />}
                </dd>
                <dd className="mt-1 text-sm text-gray-500 dark:text-slate-400">{note}</dd>
              </div>
            ))}
          </motion.dl>
        </section>

        {/* The review quoted up front. */}
        <motion.section
          {...reveal}
          className="mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8"
        >
          <figure className="relative isolate overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-xl shadow-gray-900/5 backdrop-blur sm:p-12 dark:border-white/10 dark:bg-white/3 dark:shadow-black/20">
            <div
              aria-hidden
              className={`absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-linear-to-br ${GRADIENT} opacity-20 blur-3xl`}
            />
            <span
              aria-hidden
              className={`block bg-linear-to-br ${GRADIENT} bg-clip-text font-serif text-7xl leading-none text-transparent`}
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4 max-w-4xl text-xl leading-relaxed font-medium text-pretty text-gray-800 sm:text-2xl sm:leading-relaxed dark:text-slate-200">
              {featured.review}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              <Avatar username={featured.client} />
              <div>
                <p className="font-semibold text-gray-950 dark:text-white">{featured.client}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Zodi World, {formatMonth(featured.delivered)}
                </p>
              </div>
              <Stars rating={featured.rating} className="sm:ml-auto" />
            </figcaption>
          </figure>
        </motion.section>

        {/* Projects */}
        <section id="projects" className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <SectionLabel index={1} title="Selected work" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                Projects from the deliveries
              </h2>
              <p className="max-w-sm text-sm text-gray-500 dark:text-slate-400">
                Screenshots from what I delivered to clients. Click any screen to see the rest.
              </p>
            </div>
          </motion.div>

          {lead && (
            <ProjectCard
              project={lead}
              wide
              onOpen={(index) => setViewing({ slug: lead.slug, index })}
            />
          )}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={(index) => setViewing({ slug: project.slug, index })}
              />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <SectionLabel index={2} title="Reviews" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                What clients said
              </h2>
              <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <Stars rating={Number(stats.rating)} />
                {stats.rating} from {stats.reviews} reviews, quoted as written
              </p>
            </div>
          </motion.div>

          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {reviews.map((order) => (
              <ReviewCard key={`${order.client}-${order.delivered}-${order.summary}`} order={order} />
            ))}
          </div>
        </section>

        {/* Every order */}
        <section id="orders" className="mx-auto mt-24 max-w-6xl scroll-mt-32 px-4 sm:mt-32 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <SectionLabel index={3} title="Every order" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                All {stats.orders} orders, by client
              </h2>
              <p className="max-w-sm text-sm text-gray-500 dark:text-slate-400">
                Newest first. Stars mark the orders the client rated.
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter orders by stack">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  filter === option
                    ? "border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-gray-950"
                    : "border-gray-200 bg-white/70 text-gray-600 hover:border-gray-300 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
            <span className="ml-1 text-sm text-gray-500 tabular-nums dark:text-slate-400">
              {shownOrders} {shownOrders === 1 ? "order" : "orders"} · {clients.length}{" "}
              {clients.length === 1 ? "client" : "clients"}
            </span>
          </div>

          <ol className="mt-8 divide-y divide-gray-200 border-y border-gray-200 dark:divide-white/10 dark:border-white/10">
            {clients.map((client) => (
              <li
                key={client.username}
                className="grid gap-5 py-8 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10"
              >
                <div className="flex items-start gap-3">
                  <Avatar username={client.username} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-950 dark:text-white">
                      {client.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {client.orders.length} {client.orders.length === 1 ? "order" : "orders"} ·{" "}
                      {formatSpan(
                        client.orders[client.orders.length - 1].placed,
                        client.orders[0].delivered
                      )}
                    </p>
                    {client.orders.length > 1 && (
                      <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20">
                        Returning client
                      </span>
                    )}
                    {client.projects.map((project) => (
                      <a
                        key={project.slug}
                        href={`#${project.slug}`}
                        className="group mt-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {project.title}
                        <FiArrowRight className="transition group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <ul className="space-y-5">
                  {client.shown.map((order) => (
                    <OrderRow key={`${order.delivered}-${order.summary}`} order={order} />
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section className="mx-auto mt-28 max-w-6xl px-4 sm:mt-36 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-white/10 dark:bg-white/3"
          >
            <div
              aria-hidden
              className={`absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-linear-to-br ${GRADIENT} opacity-20 blur-3xl`}
            />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
                Have something to build?
              </h2>
              <p className="mt-3 max-w-md text-gray-600 dark:text-slate-400">
                Tell me about it through the contact form, or see the products I have built
                since in the case studies.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 dark:bg-white dark:text-gray-950"
              >
                Get in touch
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-white/15 dark:text-white dark:hover:border-white/30"
              >
                Case studies
              </Link>
            </div>
          </motion.div>
        </section>

        <ImageLightbox
          images={lightboxImages}
          index={viewing ? viewing.index : null}
          onChange={(index) =>
            setViewing(index === null || !viewing ? null : { slug: viewing.slug, index })
          }
        />
      </main>
    </MotionConfig>
  );
}

function ProjectCard({
  project,
  wide = false,
  onOpen,
}: {
  project: FiverrProject;
  wide?: boolean;
  onOpen: (index: number) => void;
}) {
  const { orders, review, span } = projectDetails(project);
  const screens = project.images.length;

  return (
    <motion.article
      {...reveal}
      id={project.slug}
      className={`group/card flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur transition-shadow duration-500 hover:shadow-xl hover:shadow-gray-900/5 dark:border-white/10 dark:bg-white/3 dark:hover:shadow-black/30 ${
        wide ? "mt-10 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""
      }`}
    >
      <ProjectCover project={project} wide={wide} onOpen={onOpen} />

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${wide ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase dark:text-emerald-400">
          {project.kind}
        </p>
        <h3
          className={`mt-2 font-semibold tracking-tight text-gray-950 dark:text-white ${
            wide ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
          For <span className="font-medium text-gray-700 dark:text-slate-300">{project.client}</span>{" "}
          · {span} · {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
        <p className="mt-4 leading-relaxed text-pretty text-gray-600 dark:text-slate-400">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {review?.review && (
          <figure className="mt-6 border-l-2 border-emerald-500 pl-4">
            <blockquote className="text-sm leading-relaxed text-gray-700 italic dark:text-slate-300">
              &ldquo;{clip(review.review, 240)}&rdquo;
            </blockquote>
            <figcaption className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
              <Stars rating={review.rating!} size={11} />
              {review.client}, {formatMonth(review.delivered)}
            </figcaption>
          </figure>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-950 dark:text-white"
            >
              Read the case study
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          {screens > 1 && (
            <button
              type="button"
              onClick={() => onOpen(0)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-gray-950 dark:text-slate-300 dark:hover:text-white"
            >
              <FiImage />
              View {screens} screens
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** A project's cover: a browser window, phone screens side by side, or the
 *  image as is. Clicking it opens the screenshots full screen. */
function ProjectCover({
  project,
  wide,
  onOpen,
}: {
  project: FiverrProject;
  wide: boolean;
  onOpen: (index: number) => void;
}) {
  const [cover] = project.images;
  const sizes = wide
    ? "(min-width: 1152px) 640px, (min-width: 1024px) 58vw, 100vw"
    : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw";

  if (project.frame === "none") {
    return (
      <ZoomButton
        label={`Open the ${project.title} cover full screen`}
        onClick={() => onOpen(0)}
        className="h-full"
      >
        <Image
          src={cover.image}
          alt={`${project.title}: ${cover.caption}`}
          sizes={sizes}
          placeholder="blur"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </ZoomButton>
    );
  }

  if (project.frame === "phone") {
    const phones = project.images
      .map((entry, index) => ({ ...entry, index }))
      .filter(({ image }) => image.height > image.width)
      .slice(0, 3);
    return (
      <div
        className={`relative flex items-start justify-center gap-3 overflow-hidden bg-linear-to-br from-emerald-50 to-teal-50 px-6 pt-8 sm:gap-4 dark:from-emerald-500/10 dark:to-teal-500/5 ${
          wide ? "" : "aspect-16/10"
        }`}
      >
        {phones.map(({ image, caption, index }) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Open "${caption}" full screen`}
            onClick={() => onOpen(index)}
            className="relative w-[28%] max-w-40 translate-y-6 cursor-zoom-in overflow-hidden rounded-t-[1.4rem] border-4 border-b-0 border-gray-900 bg-white shadow-xl shadow-gray-900/20 transition-transform duration-500 hover:translate-y-3 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-gray-700"
          >
            <Image
              src={image}
              alt={`${project.title}: ${caption}`}
              sizes="160px"
              placeholder="blur"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-emerald-50 to-teal-50 px-5 pt-6 sm:px-8 sm:pt-8 dark:from-emerald-500/10 dark:to-teal-500/5">
      <ZoomButton
        label={`Open "${cover.caption}" full screen`}
        onClick={() => onOpen(0)}
        className="translate-y-2 transition-transform duration-500 group-hover/card:translate-y-0"
      >
        <BrowserFrame className="rounded-b-none! shadow-xl! sm:rounded-b-none!">
          <Image
            src={cover.image}
            alt={`${project.title}: ${cover.caption}`}
            sizes={sizes}
            placeholder="blur"
            className="aspect-2/1 h-auto w-full object-cover object-top"
          />
        </BrowserFrame>
      </ZoomButton>
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
      <span className="pointer-events-none absolute right-4 bottom-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white/95 text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-900/95 dark:text-white">
        <FiMaximize2 size={15} />
      </span>
    </button>
  );
}

function ReviewCard({ order }: { order: FiverrOrder & { rating: number; review: string } }) {
  const project = fiverrProjects.find((item) => item.slug === order.project);
  return (
    <motion.figure
      {...reveal}
      className="mb-6 break-inside-avoid rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xs backdrop-blur dark:border-white/10 dark:bg-white/3"
    >
      <Stars rating={order.rating} size={13} />
      <blockquote className="mt-4 leading-relaxed text-pretty text-gray-700 dark:text-slate-300">
        &ldquo;{order.review}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar username={order.client} size="sm" />
        <div className="min-w-0 text-sm">
          <p className="truncate font-semibold text-gray-950 dark:text-white">{order.client}</p>
          <p className="truncate text-gray-500 dark:text-slate-400">
            {project ? `${project.title}, ` : ""}
            {formatMonth(order.delivered)}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

function OrderRow({ order }: { order: FiverrOrder }) {
  return (
    <li className="flex gap-4 sm:gap-6">
      <time
        dateTime={order.delivered}
        className="w-18 shrink-0 pt-0.5 font-mono text-xs text-gray-400 dark:text-slate-500"
      >
        {formatMonth(order.delivered)}
      </time>
      <div className="min-w-0">
        <p className="leading-relaxed text-gray-800 dark:text-slate-200">{order.summary}</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {order.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200 bg-white/70 px-2 py-0.5 text-xs text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
          {order.rating !== undefined && (
            <span className="inline-flex items-center gap-1 px-1 text-xs font-medium text-amber-600 tabular-nums dark:text-amber-400">
              <FaStar size={11} aria-hidden />
              {order.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

/** Five stars, filled to the nearest whole star. */
function Stars({
  rating,
  size = 15,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      className={`inline-flex gap-0.5 ${className}`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={
            star <= Math.round(rating) ? "text-amber-400" : "text-gray-200 dark:text-white/15"
          }
        />
      ))}
    </span>
  );
}

const AVATAR_COLORS = [
  "from-emerald-500 to-teal-400",
  "from-sky-500 to-indigo-400",
  "from-orange-400 to-rose-400",
  "from-violet-500 to-fuchsia-400",
  "from-amber-400 to-orange-500",
  "from-cyan-500 to-blue-500",
];

/** The client's initial on a colour picked from their username. */
function Avatar({ username, size = "md" }: { username: string; size?: "sm" | "md" }) {
  const hash = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-br font-semibold text-white uppercase ${
        AVATAR_COLORS[hash % AVATAR_COLORS.length]
      } ${size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11"}`}
    >
      {username[0]}
    </span>
  );
}

function SectionLabel({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-gray-400 dark:text-slate-500">{pad(index)}</span>
      <span className={`h-px w-10 bg-linear-to-r ${GRADIENT}`} />
      <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-900 uppercase dark:text-white">
        {title}
      </h2>
    </div>
  );
}
