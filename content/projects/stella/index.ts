import type { Project } from "../types";
import cover from "./cover.webp";
import widgetLauncher from "./widget-launcher.webp";
import widgetAnswer from "./widget-answer.webp";
import chat from "./chat.webp";
import query from "./query.webp";
import sources from "./sources.webp";
import jobs from "./jobs.webp";
import jobsUpcoming from "./jobs-upcoming.webp";
import discordBot from "./discord-bot.webp";
import discordChannels from "./discord-channels.webp";
import analyticsThreads from "./analytics-threads.webp";
import analyticsTopics from "./analytics-topics.webp";
import analyticsFeedback from "./analytics-feedback.webp";
import evaluationRuns from "./evaluation-runs.webp";
import evaluationRun from "./evaluation-run.webp";
import systemPrompt from "./system-prompt.webp";

const project: Project = {
  slug: "stella",
  title: "Stella | AI Assistant for Stellar Developers",
  description:
    "The Stellar Development Foundation's AI assistant, answering Stellar and Soroban questions on Discord, Telegram and developers.stellar.org from a knowledge base of Stellar's own docs, code and community.",
  longDescription:
    "Stella is the AI assistant the Stellar Development Foundation (SDF) offered developers building on Stellar and Soroban, its smart contract platform. Developers asked it questions in the #stella-help channel of the Stellar Developers Discord by starting a message with \"Stella, …\", through a yellow chat icon on developers.stellar.org and the Stellar Lab, and, for the Stellar Community Fund (SCF), through a Telegram bot. Its answers came from a knowledge base of Stellar's own content: the docs and SDK repositories and their GitHub issues, Stellar Stack Exchange, SDF's YouTube talks, Discord threads, the stellar.org website and the SCF handbook, and each answer cited its sources and suggested follow-up questions. SDF launched the first Stella in 2024, and Jutsu rebuilt it in 2025; I led that rebuild. I wrote most of the new backend, a Bun and Hono monorepo that ingests every source on a schedule into Qdrant, answers with Claude through the Vercel AI SDK, runs the Discord and Telegram bots and serves the website widget. I also wrote most of Stella Studio, the React app where the team manages sources, tests retrieval and prompts, reviews every conversation and rating, and measures answer quality with evaluation runs, and added YouTube embeds, follow-up questions and file uploads to the chat widget, which Hypersolid built. The studio screenshots show it running locally with made-up data, and the widget shots show the production widget on a developers.stellar.org page, answering from a local mock.",
  type: "Project I worked on",
  role: "Lead Developer",
  duration: "May 2025 - Mar 2026",
  icon: "robot",
  gradient: "from-yellow-400 to-amber-500",
  tags: ["AI Assistant", "RAG", "Discord Bot", "Developer Relations", "Stellar"],
  technologies: [
    "TypeScript",
    "Bun",
    "Hono",
    "MongoDB",
    "Qdrant",
    "Vercel AI SDK",
    "Anthropic Claude",
    "OpenAI",
    "discord.js",
    "grammY",
    "React",
    "AWS Fargate",
    "SST",
    "Sentry",
  ],
  features: [
    "Stella in the Stellar Developers Discord: start a message with \"Stella, \" and the answer streams into a new thread, with source links, follow-up questions and Like, Dislike and Wrong buttons",
    "A consent step before a user's first question, a server and channel allowlist managed from the studio, and per-channel rate limits",
    "A chat widget on developers.stellar.org and the Stellar Lab, with threads, file attachments, a short or long answer setting and feedback on every answer",
    "A Telegram bot for the Stellar Community Fund that can also look up SCF projects, awards and submissions in Airtable",
    "Ingestion from GitHub docs and issues, Stack Exchange, YouTube transcripts, Discord channels, website sitemaps, GitBook, Notion and uploaded PDF, Word and CSV files, each on a manual, cron or interval schedule",
    "Retrieval over Qdrant with OpenAI embeddings, HyDE query expansion and a Claude reranker, and answers from Claude Sonnet 4.5 with inline citations",
    "Two projects, Stella and SCF, each with its own sources, bots and analytics",
    "A query playground that shows the retrieved chunks and their scores, a chat playground and the widget's embed code",
    "Analytics of every question, thread and rating, with topic clustering and trending topics",
    "Evaluation runs over question datasets, scored by token F1, semantic similarity, recall@K, LLM-judged correctness and groundedness",
    "Editable system prompts, API keys for the RAG service, Google sign-in limited to approved domains, and Sentry monitoring",
    "Deployment to AWS Fargate with SST, in separate staging and production stages",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "Stella Studio's dashboard: users, messages, response time, retrieval, feedback and token use, with 30 days of website and Discord activity." },
    { image: widgetLauncher, caption: "The yellow Stella launcher on a developers.stellar.org docs page." },
    { image: widgetAnswer, caption: "The Stella widget answering a CLI question with a code block, cited docs, follow-up questions and feedback buttons." },
    { image: chat, caption: "The studio's chat playground: deploying a Soroban contract to testnet with the stellar CLI." },
    { image: query, caption: "The query playground, with HyDE and reranking switched on, per-collection limits and the retrieved chunks with their scores." },
    { image: sources, caption: "Knowledge sources: the Stellar docs and SDK repositories, GitHub issues, Stack Exchange, SDF's YouTube channel, Discord, the developers.stellar.org sitemap and the SCF Handbook." },
    { image: jobs, caption: "Ingestion jobs by source, with progress, vectors and tokens." },
    { image: jobsUpcoming, caption: "Scheduled re-ingestion: each source's cron schedule, with its next and last run." },
    { image: discordBot, caption: "The Discord integration: the bot's connection status and what it does in the server." },
    { image: discordChannels, caption: "Choosing the Discord channels Stella may answer in." },
    { image: analyticsThreads, caption: "Thread analytics: every conversation, with its question, user and time." },
    { image: analyticsTopics, caption: "Topic analysis: a word cloud of what developers ask about." },
    { image: analyticsFeedback, caption: "Feedback analytics: Like, Dislike and Wrong ratings with comments, by platform." },
    { image: evaluationRuns, caption: "Evaluation runs comparing a baseline with HyDE, reranking, chunking and prompt changes." },
    { image: evaluationRun, caption: "One evaluation run, scored by token F1, semantic similarity, LLM-judged correctness and groundedness, by question category." },
    { image: systemPrompt, caption: "Editing Stella's default system prompt." },
  ],
};

export default project;
