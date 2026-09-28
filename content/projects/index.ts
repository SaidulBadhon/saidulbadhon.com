import type { StaticImageData } from "next/image";
import type { Project, ProjectImage } from "./types";
import jutsuAi from "./jutsu-ai";
import jutsuIde from "./jutsu-ide";
import posttAi from "./postt-ai";
import aiDeveloperWorkspace from "./ai-developer-workspace";
import nearconTicketing from "./nearcon-ticketing";
import cystellarDashboard from "./cystellar-dashboard";
import dokanGg from "./dokan-gg";
import skillsynk from "./skillsynk";

export type { Project, ProjectIconKey, ProjectImage } from "./types";

/** Projects in the order they appear on the site. */
export const projects: Project[] = [
  jutsuAi,
  jutsuIde,
  posttAi,
  aiDeveloperWorkspace,
  nearconTicketing,
  cystellarDashboard,
  dokanGg,
  skillsynk,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after this one, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** An image entry as an image plus its caption, if it has one. */
export function toImage(entry: ProjectImage): {
  image: StaticImageData;
  caption?: string;
} {
  return "image" in entry ? entry : { image: entry };
}
