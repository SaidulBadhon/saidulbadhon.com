"use client";

import React from "react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import { motion } from "motion/react";
import { useSectionInView } from "@/lib/hooks";
import { about } from "@/content/about";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

const linkClassName =
  "font-medium underline decoration-gray-400 underline-offset-4 transition hover:decoration-current dark:decoration-white/40";

/** A paragraph of text, with its markdown links turned into real links. */
function withLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const [whole, label, href] = match;
    parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>
      )
    );
    last = match.index + whole.length;
  }

  parts.push(text.slice(last));
  return parts;
}

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-180 text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>

      {about.map((paragraph) => (
        <p key={paragraph} className="mb-3 last:mb-0">
          {withLinks(paragraph)}
        </p>
      ))}
    </motion.section>
  );
}
