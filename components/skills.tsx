"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "motion/react";
import { skillGroups } from "@/content/skills";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 w-full max-w-212 scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-200 bg-white/70 text-left shadow-xl shadow-gray-900/5 backdrop-blur dark:divide-white/5 dark:border-white/10 dark:bg-white/3 dark:shadow-black/20">
        {skillGroups.map((group, index) => {
          const GroupIcon = group.icon;

          return (
            <motion.li
              className="grid gap-4 px-5 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:px-7 sm:py-6"
              key={group.name}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
            >
              <h3 className="flex items-center gap-3 self-start text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase sm:pt-0.5 dark:text-slate-400">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <GroupIcon className="h-4.5 w-4.5" />
                </span>
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20"
                  >
                    <Icon
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-gray-800 dark:text-slate-200"
                      style={color ? { color } : undefined}
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
