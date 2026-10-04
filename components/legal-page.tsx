import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { formatDate } from "@/content/blogs";
import { channel, publisher } from "@/content/shorto-projojjo";

/** The layout of the upload app's legal pages: a header with the title, a lead
 *  paragraph and the last-updated date, then the text as prose. */
export default function LegalPage({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead: ReactNode;
  /** When the text last changed, YYYY-MM-DD. */
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-6xl">
      <Link
        href="/shortoprojojjo"
        className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950 dark:text-slate-400 dark:hover:text-white"
      >
        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        {channel.name}
      </Link>

      <header className="mt-10 border-b border-gray-200 pb-10 dark:border-white/10">
        <p className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase dark:text-slate-400">
          {publisher.name}
        </p>
        <h1 className="mt-4 text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-gray-600 sm:text-xl dark:text-slate-400 [&_a]:text-gray-800 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-slate-200">
          {lead}
        </p>
        <p className="mt-6 text-sm text-gray-500 dark:text-slate-400">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </header>

      <div className="prose prose-gray mt-10 max-w-none sm:prose-lg dark:prose-invert prose-headings:scroll-mt-32 prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-4">
        {children}
      </div>
    </article>
  );
}
