"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { experiences } from "@/content/experience";

function CompanyIcon({
  company,
  logo,
}: {
  company: string;
  logo?: StaticImageData;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${company} logo`}
        width={60}
        height={60}
        className="w-full h-full rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-xl font-bold">
      {company.charAt(0)}
    </div>
  );
}

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiences.map((item, index) => (
          <React.Fragment key={`${item.company}-${item.title}-${index}`}>
            <VerticalTimelineElement
              contentStyle={{
                background: "var(--timeline-card-bg)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight: "0.4rem solid var(--timeline-arrow-color)",
              }}
              date={item.date}
              icon={<CompanyIcon company={item.company} logo={item.logo} />}
              iconStyle={{
                background: "var(--timeline-icon-bg)",
                boxShadow:
                  "0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
              }}
            >
              <h3 className="text-xl font-bold mt-0! text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-1! text-sm! font-semibold text-gray-800 dark:text-gray-300">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {item.company}
                  </a>
                ) : (
                  <span>{item.company}</span>
                )}

                <span className="px-2">•</span>

                <span className="mt-1! text-sm font-normal text-gray-500 dark:text-gray-400">
                  {item.location}
                </span>
              </p>
              <p className="mt-3! text-sm! leading-relaxed text-gray-700 dark:text-white/75">
                {item.description}
              </p>

              {item.highlights && (
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-700 marker:text-gray-400 dark:text-white/75 dark:marker:text-white/40">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              {item.technologies && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-gray-200 bg-white/70 px-2.5 py-0.5 text-xs text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              )}

              {item.projects && (
                <p className="mt-4! flex flex-wrap items-center gap-x-4 gap-y-1 text-sm!">
                  <span className="text-gray-500 dark:text-gray-400">
                    Case studies:
                  </span>
                  {item.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white"
                    >
                      {project.title.split(" | ")[0]}
                      <FiArrowRight className="transition group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </p>
              )}
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
