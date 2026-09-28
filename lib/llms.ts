import { formatDate, getPostSource, getPosts, type Post } from "@/content/blogs";
import { experiences } from "@/content/experience";
import { projects, toImage, type Project } from "@/content/projects";
import { skills } from "@/content/skills";
import { SITE_URL, absoluteUrl, site } from "./site";

// The site as plain markdown for AI assistants, following https://llmstxt.org:
// /llms.txt is a short index, and /llms-full.txt has every case study and post
// in full, so an assistant can read the whole site in one request.

const [currentRole] = experiences;

const projectTitle = (project: Project) => project.title.replace(" | ", ": ");

function header(): string {
  return `# ${site.name}

> ${site.description}

${site.name} is currently ${currentRole.title} at ${currentRole.company} (${currentRole.date}). Skills: ${skills.join(", ")}.

- Website: ${SITE_URL}
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Email: ${site.email}, or the contact form at ${absoluteUrl("/#contact")}`;
}

/** /llms.txt: who Saidul is, and a link to every page with a line about it. */
export function llmsTxt(): string {
  const projectLinks = projects.map(
    (project) =>
      `- [${projectTitle(project)}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.description} Role: ${project.role}, ${project.duration}.`
  );
  const postLinks = getPosts().map(
    (post) =>
      `- [${post.title}](${absoluteUrl(`/blogs/${post.slug}`)}): ${post.description} Published ${formatDate(post.date)}.`
  );

  return `${header()}

## Projects

Case studies of products ${site.name} built or helped ship.

${projectLinks.join("\n")}

## Blog

${postLinks.join("\n")}

## Optional

- [Everything in one file](${absoluteUrl("/llms-full.txt")}): every case study and blog post in full
- [RSS feed](${absoluteUrl(site.blog.feed)}): new blog posts
`;
}

/** /llms-full.txt: the whole site, with work history, case studies and posts. */
export function llmsFullTxt(): string {
  const work = experiences.map((job) =>
    [
      `### ${job.title}, ${job.company}`,
      [job.date, job.location, job.url].filter(Boolean).join(" · "),
      job.description,
      job.highlights?.map((highlight) => `- ${highlight}`).join("\n"),
      job.technologies && `Technologies: ${job.technologies.join(", ")}`,
      job.projects &&
        `Case studies: ${job.projects
          .map((project) => `[${projectTitle(project)}](${absoluteUrl(`/projects/${project.slug}`)})`)
          .join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n\n")
  );

  return `${header()}

## Experience

${work.join("\n\n")}

## Projects

${projects.map(projectMarkdown).join("\n\n")}

## Blog posts

${getPosts().map(postMarkdown).join("\n\n")}
`;
}

function projectMarkdown(project: Project): string {
  const links = [
    project.links.live && `Live site: ${project.links.live}`,
    project.links.github && `Source code: ${project.links.github}`,
  ].filter(Boolean);
  const captions = project.images.flatMap((entry) => toImage(entry).caption ?? []);

  return [
    `### ${projectTitle(project)}`,
    `${absoluteUrl(`/projects/${project.slug}`)}`,
    `Role: ${project.role} · Timeline: ${project.duration}`,
    ...links,
    `Technologies: ${project.technologies.join(", ")}`,
    project.longDescription,
    `Highlights:\n\n${project.features.map((feature) => `- ${feature}`).join("\n")}`,
    captions.length > 0 && `Screenshots:\n\n${captions.map((caption) => `- ${caption}`).join("\n")}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function postMarkdown(post: Post): string {
  return `### ${post.title}

${absoluteUrl(`/blogs/${post.slug}`)}

Published ${formatDate(post.date)} by ${site.name}${post.tags.length ? ` · ${post.tags.join(", ")}` : ""}

${toMarkdown(getPostSource(post))}`;
}

/**
 * Turns a post's MDX into plain markdown: drops the imports, replaces figures
 * with their alt text and caption, makes links to this site absolute, and
 * demotes headings to sit under the post's title. Code blocks are left alone.
 */
function toMarkdown(mdx: string): string {
  const withoutFigures = mdx.replace(/<figure>([\s\S]*?)<\/figure>/g, (_, figure: string) => {
    const alt = figure.match(/alt="([^"]*)"/)?.[1];
    const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1]?.trim();
    return `*[Image: ${[alt, caption].filter(Boolean).join(". ")}]*`;
  });

  let inCode = false;
  const lines = withoutFigures.split(/\r?\n/).flatMap((line) => {
    const fence = line.trimStart().startsWith("```");
    if (fence) inCode = !inCode;
    if (fence || inCode) return [line];
    if (/^(import|export)\s/.test(line)) return [];
    return [
      line
        .replace(/^(#{1,4})\s/, "##$1 ")
        .replace(/\]\(\//g, `](${SITE_URL}/`),
    ];
  });

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
