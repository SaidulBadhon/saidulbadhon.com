import type { Project } from "../types";
import cover from "./cover.webp";
import website from "./website.webp";
import editor from "./editor.webp";
import aiEdit from "./ai-edit.webp";
import carousel from "./carousel.webp";
import calendar from "./calendar.webp";
import posts from "./posts.webp";
import postAnalytics from "./post-analytics.webp";
import campaigns from "./campaigns.webp";
import campaign from "./campaign.webp";
import copilot from "./copilot.webp";
import brandKit from "./brand-kit.webp";
import rss from "./rss.webp";
import reports from "./reports.webp";
import media from "./media.webp";
import platform from "./platform.webp";

const project: Project = {
  slug: "postt-ai",
  title: "Postt.ai | AI Content Platform for Founders",
  description:
    "An AI content platform that writes, designs and schedules LinkedIn and X posts in each founder's own voice.",
  longDescription:
    "Postt.ai is Jutsu's content platform for founders who know they should post on LinkedIn and X but never find the time. Instead of generic AI copy, it learns how each founder writes from a few of their own posts and keeps that voice in everything it drafts. A founder can turn one idea into a week of posts, carousels, images and short videos, line them up on a calendar or in a campaign, and let Postt publish them to a personal profile, a company page or X, then pull the results back in. Postty, the built-in copilot, plans launch weeks, searches the web for fresh angles and drafts posts on request. I led engineering and product for Postt, and wrote most of the API (Bun, Hono and MongoDB, with Agenda jobs for scheduling, publishing and analytics) and the AI agent service (the Vercel AI SDK across OpenAI, Anthropic and Amazon Bedrock, plus fal and Runway for images and video), along with a large share of the React app. The app screenshots show a demo account with made-up data.",
  type: "Project I worked on",
  role: "Lead Developer & Project Manager",
  duration: "Jul 2024 - Present",
  icon: "pen",
  gradient: "from-violet-600 to-fuchsia-400",
  tags: [
    "AI Agents",
    "Generative AI",
    "LinkedIn",
    "React",
    "Hono",
  ],
  technologies: [
    "TypeScript",
    "React 19",
    "Vite",
    "Tailwind CSS",
    "Radix UI",
    "TanStack Query",
    "Zustand",
    "Bun",
    "Hono",
    "MongoDB",
    "Mongoose",
    "Agenda",
    "Vercel AI SDK",
    "OpenAI",
    "Anthropic",
    "Amazon Bedrock",
    "fal",
    "Runway",
    "AWS S3",
    "LinkedIn API",
    "X API",
  ],
  features: [
    "Publishing and scheduling to LinkedIn profiles, LinkedIn company pages and X",
    "An AI writer that drafts in the founder's own voice, using writing personas learned from their past posts, with optional web search for fresh topics",
    "Inline AI edits (shorten, expand, fix grammar, add a hook, a call to action or hashtags) shown as a diff to accept or reject",
    "Text, image, video, document and carousel posts, with AI image and video generation, Pexels, Unsplash and Canva pickers, and a live LinkedIn preview",
    "Campaigns that turn one idea, goal and date range into a planned series of posts on a timeline",
    "A content calendar with month and week views, time slots and a shared calendar for company-page teams",
    "Daily \"Ready Posts\" suggested by the AI for each writing persona, waiting on the home page",
    "Postty, an agentic copilot that reasons, searches the web and drafts LinkedIn posts, with a choice of OpenAI, Anthropic or Bedrock models",
    "A brand kit and per-channel brand profiles for tone, audience, industries, colours and example posts",
    "RSS automation that turns feeds into WordPress articles and LinkedIn posts, each on its own schedule",
    "Per-post LinkedIn and X analytics, posting streaks and a yearly activity heat-map, kept current by background jobs that also publish and retry posts",
  ],
  links: {
    live: "https://postt.ai",
  },
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "Home: quick actions, AI \"Ready Posts\" in the founder's voice and the upcoming queue." },
    { image: website, caption: "postt.ai, the marketing site." },
    { image: editor, caption: "The post editor: a prompt, a writing persona and web search on the right, a live LinkedIn preview on the left." },
    { image: aiEdit, caption: "An AI rewrite shown as a diff against the original, to accept or reject." },
    { image: carousel, caption: "The carousel builder, with AI-written slides and themes." },
    { image: calendar, caption: "The content calendar, with a day's time slots open." },
    { image: posts, caption: "All posts: drafts, scheduled, published and failed, including AI and campaign posts." },
    { image: postAnalytics, caption: "A published post next to its LinkedIn analytics." },
    { image: campaigns, caption: "Campaigns, grouped into ongoing, upcoming and ended." },
    { image: campaign, caption: "A launch-week campaign on its timeline, with a post open for editing." },
    { image: copilot, caption: "Postty, the copilot, planning a launch week and drafting the posts." },
    { image: brandKit, caption: "The brand kit: writing personas, content style and a knowledge library." },
    { image: rss, caption: "RSS feeds that publish to WordPress and LinkedIn on their own schedules." },
    { image: reports, caption: "Reports: posting streak, queue and a yearly activity heat-map." },
    { image: media, caption: "The media library of uploaded and AI-generated images and videos." },
    { image: platform, caption: "How the pieces fit together, as shown on postt.ai." },
  ],
};

export default project;
