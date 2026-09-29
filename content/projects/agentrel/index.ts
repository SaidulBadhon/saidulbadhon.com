import type { Project } from "../types";
import cover from "./cover.webp";
import dashboard from "./dashboard.webp";
import sources from "./sources.webp";
import sourceGithub from "./source-github.webp";
import sourceGithubConfig from "./source-github-config.webp";
import jobs from "./jobs.webp";
import jobDetail from "./job-detail.webp";
import jobTokensItems from "./job-tokens-items.webp";
import jobLogs from "./job-logs.webp";
import knowledgeBase from "./knowledge-base.webp";
import widgetEmbed from "./widget-embed.webp";
import orgOverview from "./org-overview.webp";
import loginBranded from "./login-branded.webp";
import marketingHome from "./marketing-home.webp";
import marketingProject from "./marketing-project.webp";
import marketingProjectChat from "./marketing-project-chat.webp";

const project: Project = {
  slug: "agentrel",
  title: "AgentRel | AI Assistants Grounded in Your Docs",
  description:
    "A multi-tenant platform that turns a product's docs, GitHub repos, websites and videos into an AI assistant that answers with cited sources, in a dashboard and an embeddable chat widget.",
  longDescription:
    "AgentRel is a platform Jutsu built for AI developer relations, which it called \"the AI agent relationship platform\": a team connects its documentation and gets an AI assistant that answers developers' questions from it, with sources. Each company gets an organization with its own subdomain and branded sign-in, invites its team with fine-grained permissions, and creates a project per product. A project pulls in GitHub docs repositories (with the docs framework detected automatically), website sitemaps, YouTube channels and uploaded PDF, Word and CSV files. Each ingestion runs as a job that logs every file and the tokens each model used, and the content is chunked and embedded into the project's own Qdrant collection. Answers stream back with cited sources and three suggested follow-up questions, in the dashboard's playground, on the project's public page on agentrel.com and in a chat widget any site can embed, and the dashboard tracks users, messages, response times, feedback and token cost. I built most of it, with 482 of the 518 commits to its main repository: the Bun and Hono API over MongoDB and Qdrant, the plugin server that crawls the sources, the RAG chat on the Vercel AI SDK with GPT-5 mini and Claude Opus 4.1, sign-in with email, Google and GitHub, and most of the React dashboard. The screenshots show it running locally with a demo organization and made-up data.",
  type: "Project I worked on",
  role: "Lead Developer",
  duration: "Sep 2025 - Nov 2025",
  icon: "bolt",
  gradient: "from-rose-500 to-orange-500",
  tags: ["AI Assistant", "RAG", "Developer Relations", "SaaS", "Multi-tenant"],
  technologies: [
    "TypeScript",
    "Bun",
    "Hono",
    "MongoDB",
    "Qdrant",
    "Vercel AI SDK",
    "OpenAI",
    "Anthropic Claude",
    "LangChain",
    "React",
    "Preact",
    "Next.js",
    "Docker",
  ],
  features: [
    "Organizations with their own subdomain and branded sign-in, custom subdomains approved by an admin, invitations, and fine-grained organization and project permissions",
    "Projects that can be archived, or transferred to another organization along with their vectors",
    "GitHub docs sources with private-repo tokens, include and exclude patterns, and automatic detection of Docusaurus, VitePress, MkDocs, Jekyll, GitBook and Nextra",
    "Website sitemap and YouTube channel sources, crawled and transcribed by a separate plugin server",
    "Ingestion jobs with per-file progress, logs, timing and token usage by model",
    "A knowledge base of text notes and uploaded PDF, DOCX, CSV and text files, chunked and embedded into one Qdrant collection per project",
    "RAG chat that rewrites the question for search, retrieves the closest chunks and streams a Markdown answer with cited sources and three follow-up questions over server-sent events",
    "An embeddable chat widget, Preact in a shadow DOM, with conversation history, plus a playground and embed code in the dashboard",
    "A public directory of projects on agentrel.com, each with its own page and chat",
    "A project dashboard of users, messages, response time, context hits, feedback and token cost over time",
    "Sign-up with email verification and password reset, Google and GitHub sign-in, and super-admin tools for users, organizations and sessions",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "The embeddable assistant in the dashboard's playground: a streamed answer with a code sample, cited sources, the rewritten search query and three follow-up questions." },
    { image: dashboard, caption: "The project dashboard: users, messages, response time, context hits, feedback and token cost, with 30 days of activity." },
    { image: sources, caption: "A project's knowledge sources: GitHub docs repositories, website sitemaps and a YouTube channel." },
    { image: sourceGithub, caption: "Adding a GitHub docs source: Docusaurus is detected, and the docs folders and file types are picked for you." },
    { image: sourceGithubConfig, caption: "The same source's settings: repository, branch, docs base URL and project type." },
    { image: jobs, caption: "The project's ingestion jobs: queued, completed, failed and cancelled." },
    { image: jobDetail, caption: "An ingestion job's overview, statistics and timing." },
    { image: jobTokensItems, caption: "The job's token usage by model, and every file it processed." },
    { image: jobLogs, caption: "The job's log stream." },
    { image: knowledgeBase, caption: "The knowledge base: uploaded PDF and Word files and text notes, with their vectors, chunks and tokens." },
    { image: widgetEmbed, caption: "The widget playground's embed code for a plain HTML page." },
    { image: orgOverview, caption: "An organization's page, with its branding, details and team." },
    { image: loginBranded, caption: "An organization's branded sign-in page on its own subdomain." },
    { image: marketingHome, caption: "agentrel.com: the hero and the directory of public projects." },
    { image: marketingProject, caption: "A public project page on agentrel.com." },
    { image: marketingProjectChat, caption: "The chat widget opened on that page, with its conversation history and a cited answer." },
  ],
};

export default project;
