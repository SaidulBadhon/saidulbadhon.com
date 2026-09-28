import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { accentFrom, ogImage, ogSize, projectCover } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = `A case study from ${site.name}'s portfolio`;
export const size = ogSize;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const [name, tagline] = project.title.split(" | ");

  return ogImage({
    eyebrow: "Case study",
    title: name,
    subtitle: tagline,
    description: project.description,
    accent: accentFrom(project.gradient),
    image: await projectCover(project),
  });
}
