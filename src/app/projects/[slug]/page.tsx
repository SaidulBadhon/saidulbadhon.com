import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import ProjectDetailPage from "@/components/project-detail-page";
import {
  getNextProject,
  getProject,
  projects,
  toImage,
  type Project,
} from "@/content/projects";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { WEBSITE_ID, author, breadcrumbs, graph } from "@/lib/structured-data";

// Only the projects in content/projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** "Jutsu | AI Security Operations Platform" reads as "Jutsu: AI Security
 *  Operations Platform" in titles, which then get " | Saidul Badhon". */
const headline = (project: Project) => project.title.replace(" | ", ": ");

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const url = absoluteUrl(`/projects/${slug}`);
  const cover = project.images[0] && toImage(project.images[0]).image;

  const structuredData = graph(
    {
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      url,
      mainEntityOfPage: url,
      name: headline(project),
      abstract: project.description,
      description: project.longDescription,
      image: [`${url}/opengraph-image`, ...(cover ? [absoluteUrl(cover.src)] : [])],
      author: author(),
      keywords: [...new Set([...project.tags, ...project.technologies])],
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: headline(project), path: `/projects/${slug}` },
    ])
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectDetailPage project={project} nextProject={getNextProject(slug)} />
    </>
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

  return pageMetadata({
    path: `/projects/${slug}`,
    title: headline(project),
    // The one-line summary: the overview paragraph is too long for a search
    // result snippet.
    description: project.description,
  });
}
