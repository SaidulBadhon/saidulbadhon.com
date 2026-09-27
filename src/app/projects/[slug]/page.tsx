import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailPage from "@/components/project-detail-page";
import {
  getNextProject,
  getProject,
  projects,
  toImage,
} from "@/content/projects";

// Only the projects in content/projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailPage project={project} nextProject={getNextProject(slug)} />
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const cover = project.images[0] && toImage(project.images[0]).image;

  return {
    title: `${project.title} | Projects`,
    description: project.longDescription || project.description,
    openGraph: {
      title: project.title,
      description: project.longDescription || project.description,
      images: cover ? [{ url: cover.src }] : undefined,
    },
  };
}
