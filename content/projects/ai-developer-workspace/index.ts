import type { Project } from "../types";
import cover from "./cover.webp";
import home from "./home.webp";
import compare from "./compare.webp";
import models from "./models.webp";
import agents from "./agents.webp";
import imageGen from "./image-gen.webp";
import prompts from "./prompts.webp";
import prompt from "./prompt.webp";
import promptStudio from "./prompt-studio.webp";
import knowledge from "./knowledge.webp";
import library from "./library.webp";
import teams from "./teams.webp";
import usage from "./usage.webp";
import share from "./share.webp";

const project: Project = {
  // The slug predates the rename to Jutsu Workspace; kept so old links still work.
  slug: "ai-developer-workspace",
  title: "Jutsu Workspace | Multi-Model AI Workspace",
  description:
    "One AI workspace for GPT, Claude, Llama and image models, with shared chats, a prompt library, knowledge bases and teams.",
  longDescription:
    "Jutsu Workspace (hub.jutsu.ai) puts the major AI models behind one clean interface. Instead of paying for ChatGPT, Claude and other tools separately, a team gets more than 25 models from OpenAI, Anthropic, Groq and fal in one chat, can switch models mid-conversation to compare their answers, and pays per token from a shared prepaid balance. Conversations are organised into folders, shared with teammates who can join them, and grounded in knowledge bases built from uploaded documents. A prompt library with versions, variables and forks, and a Prompt Studio for testing prompts on any model, turns good prompts into reusable tools, and agents such as an image generator sit alongside the chat. I led the React and TypeScript web app and wrote most of it, working with the backend team on AOS, the Bun, Hono and PostgreSQL API behind it that handles model routing, knowledge-base search on pgvector, usage metering and billing. The screenshots show the app running locally with a demo workspace and made-up data.",
  type: "Project I worked on",
  role: "Lead Frontend Engineer",
  duration: "Jun 2024 - Feb 2025",
  icon: "brain",
  gradient: "from-orange-500 to-amber-500",
  tags: [
    "AI",
    "LLMs",
    "RAG",
    "React",
    "TypeScript",
  ],
  technologies: [
    "TypeScript",
    "React",
    "Vite",
    "Tailwind CSS",
    "shadcn/ui",
    "TanStack Query",
    "TipTap",
    "Recharts",
    "i18next",
    "Bun",
    "Hono",
    "Drizzle ORM",
    "PostgreSQL",
    "pgvector",
    "Redis",
    "BullMQ",
    "LangChain",
    "OpenAI",
    "Anthropic",
    "Groq",
    "fal",
    "Stripe",
    "AWS S3",
  ],
  features: [
    "Chat with more than 25 models from OpenAI, Anthropic, Groq and fal in one place, switching models mid-conversation with every answer labelled by the model that wrote it",
    "Answers rendered as markdown with tables and highlighted code, with copy and read-aloud",
    "Custom instructions and attached knowledge bases for each conversation",
    "Knowledge bases built from uploaded documents, chunked and embedded into pgvector by background jobs and searched to ground answers",
    "A prompt library with tags, likes, forks and versions, and a Prompt Studio for templating prompts with variables, testing them on any model and publishing them",
    "Agents alongside the chat, including an image generator with variations and versions",
    "Library folders with drag-and-drop for organising conversations",
    "Shared conversations with invite links and participants, plus teams and organisations with roles",
    "A prepaid balance with per-token pricing, Stripe top-ups, usage analytics and referral credits",
    "Sign-in with email, Google or GitHub, personal API keys and a language switcher",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "A shared conversation: Claude 3.5 Sonnet drafting a PRD, with custom instructions and knowledge bases on the right." },
    { image: home, caption: "The start page, with suggested prompts and the model selector." },
    { image: compare, caption: "Comparing answers from GPT-4o, Claude and Llama in one conversation." },
    { image: models, caption: "The model catalogue, with each model's provider, pricing and context window." },
    { image: agents, caption: "Agents: search, image generation and Bento, a code assistant for web UIs." },
    { image: imageGen, caption: "The image generation agent, with variations and versions of a result." },
    { image: prompts, caption: "The prompt library, with the team's own prompts and community prompts." },
    { image: prompt, caption: "A prompt's page: its readme, variables, tags and versions." },
    { image: promptStudio, caption: "Prompt Studio: a templated prompt with variables, run on Claude 3.5 Sonnet." },
    { image: knowledge, caption: "Knowledge bases built from uploaded documents." },
    { image: library, caption: "The library of folders and conversations." },
    { image: teams, caption: "A team with its members and roles." },
    { image: usage, caption: "Usage analytics: spend and tokens by model and by feature." },
    { image: share, caption: "An invitation to join a shared conversation." },
  ],
};

export default project;
