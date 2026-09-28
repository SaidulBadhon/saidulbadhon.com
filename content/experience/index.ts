import type { StaticImageData } from "next/image";
import type { Project } from "@/content/projects";
import aiDeveloperWorkspace from "@/content/projects/ai-developer-workspace";
import cystellarDashboard from "@/content/projects/cystellar-dashboard";
import dokanGg from "@/content/projects/dokan-gg";
import jutsuAi from "@/content/projects/jutsu-ai";
import jutsuIde from "@/content/projects/jutsu-ide";
import nearconTicketing from "@/content/projects/nearcon-ticketing";
import posttAi from "@/content/projects/postt-ai";
import cryptosynkLogo from "./logos/cryptosynk.png";
import cystellarLogo from "./logos/cystellar.png";
import dokanLogo from "./logos/dokan.png";
import fiverrLogo from "./logos/fiverr.png";
import jutsuLogo from "./logos/jutsu.png";
import techsecbdLogo from "./logos/techsecbd.jpeg";

export type Experience = {
  title: string;
  company: string;
  /** Company website, linked from the company name. */
  url?: string;
  /** Company logo; the first letter of the company is shown without one. */
  logo?: StaticImageData;
  location: string;
  date: string;
  /** One or two sentences on the role, shown above the highlights. */
  description: string;
  /** What was built, led or shipped in the role, one line each. */
  highlights?: string[];
  /** The main tools used in the role. */
  technologies?: string[];
  /** Case studies of work done in the role, linked from the card. */
  projects?: Project[];
};

/** Work history, shown top to bottom on the timeline. */
export const experiences: Experience[] = [
  {
    title: "Full Stack Engineer & Project Manager",
    company: "Jutsu",
    url: "https://jutsu.ai",
    logo: jutsuLogo,
    location: "San Francisco, California, United States • Remote",
    date: "Jul 2025 - Present",
    description:
      "Lead a small engineering team at Jutsu while staying hands-on in the code, owning delivery from product planning and sprints through architecture, code review and release.",
    highlights: [
      "Lead engineer on Jutsu's AI security operations platform, working across the OCSF ingest pipeline into ClickHouse, the multi-tenant API, Sigma detections and the AI agents that triage alerts and write investigations.",
      "Lead engineering and product for Postt.ai, an AI content platform that drafts and schedules LinkedIn and X posts in each founder's voice, and wrote most of its API and AI agent service.",
      "Built AI-powered developer relations services.",
      "Plan sprints, scope features and review code for the team, turning product strategy into shipped releases.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Bun",
      "Hono",
      "ClickHouse",
      "MongoDB",
      "Vercel AI SDK",
      "Kubernetes",
    ],
    projects: [jutsuAi, posttAi],
  },
  {
    title: "Full Stack Engineer",
    company: "Jutsu",
    url: "https://jutsu.ai",
    logo: jutsuLogo,
    location: "San Francisco, California, United States",
    date: "Aug 2023 - Jun 2025",
    description:
      "Helped move Jutsu from Web3 developer tools to AI products, shipping across the front end, back end and data infrastructure.",
    highlights: [
      "Led development of Jutsu IDE, a browser IDE for NEAR with a live preview, real-time co-editing, GitHub sync and JutsuGPT, an AI copilot on OpenAI and Anthropic models.",
      "Built the official app for NEARCON 2023 in Lisbon, NEAR's flagship conference: ticketing and check-in, an NCON token wallet, and swag and food purchases for around 3,000 attendees.",
      "Led the React and TypeScript front end of Jutsu Workspace, one app for more than 25 AI models with shared chats, a versioned prompt library, knowledge bases and team billing.",
      "Implemented a vector database for knowledge-base search, grounding AI answers in a team's own documents.",
      "Built big data processing systems to support small language models (SLMs).",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "pgvector",
      "NEAR Protocol",
    ],
    projects: [jutsuIde, nearconTicketing, aiDeveloperWorkspace],
  },
  {
    title: "Software Engineer Intern",
    company: "Jutsu",
    url: "https://jutsu.ai",
    logo: jutsuLogo,
    location: "San Francisco, California, United States • Remote",
    date: "Jan 2023 - Jul 2023",
    description:
      "Joined as a front-end intern and quickly grew into a full-stack role.",
    highlights: [
      "Helped build Jutsu IDE, a Web3 IDE for building and publishing NEAR apps in the browser.",
      "Worked across React front ends and Node.js, Express and MongoDB services, shipping features end to end.",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "NEAR Protocol",
    ],
    projects: [jutsuIde],
  },
  {
    title: "Founder & CEO",
    company: "Dokan.gg",
    url: "https://dokan.gg",
    logo: dokanLogo,
    location: "Dhaka, Bangladesh • Hybrid",
    date: "Apr 2022 - Present",
    description:
      "Founded Dokan.gg, a multi-vendor marketplace that lets any business in Bangladesh open an online store without building its own website. Lead the product, engineering and business operations.",
    highlights: [
      "Shipped the first platform (2023–2024): a Next.js storefront, an Express API on AWS Lambda and a React seller app.",
      "Rebuilt it from scratch in 2026 as a TypeScript monorepo: a Bun and Hono API over MongoDB, a Next.js storefront and a Next.js seller and admin dashboard.",
      "Designed one checkout across many stores, splitting each basket into an order per store, with card or cash-on-delivery payment, courier tracking, returns and seller payouts.",
      "Manage business operations, product direction and team coordination.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Bun",
      "Hono",
      "MongoDB",
      "AWS Lambda",
      "Playwright",
    ],
    projects: [dokanGg],
  },
  {
    title: "Frontend Web Developer Intern",
    company: "CyStellar",
    url: "https://cystellar.com",
    logo: cystellarLogo,
    location: "London, United Kingdom • Remote",
    date: "Jul 2022 - Dec 2022",
    description:
      "Front-end intern at CyStellar, a space-tech company whose platform turns satellite data into risk insights for insurers and public agencies.",
    highlights: [
      "Built data-driven dashboards for CyStellar's internal risk platform, turning geospatial and environmental data into interactive maps and charts with Mapbox GL and D3.js.",
      "Worked on CyStellar's project for Bilbao City Council, through the EU's REACH incubator: a dashboard forecasting emergencies 15 days ahead to help size and deploy the city's firefighter teams.",
      "Trained machine learning models to classify the roof materials of houses across Europe from satellite imagery.",
    ],
    technologies: [
      "JavaScript",
      "React",
      "D3.js",
      "Mapbox GL",
      "Python",
      "Machine learning",
    ],
    projects: [cystellarDashboard],
  },
  {
    title: "Freelance Web Developer",
    company: "Fiverr",
    logo: fiverrLogo,
    location: "Remote",
    date: "Oct 2020 - Nov 2022",
    description:
      "Freelance web developer for clients on Fiverr, starting with front-end work and growing into full-stack projects.",
    highlights: [
      "Built modern, responsive websites, landing pages and portfolios for small businesses.",
      "Delivered full-stack web apps with React, Node.js and MongoDB, owning both the client and the server.",
      "Ran each project end to end, from scoping requirements with the client through delivery and revisions.",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Cryptosynk LLC",
    logo: cryptosynkLogo,
    location: "San Francisco Bay Area • Remote",
    date: "Sep 2021 - Jun 2022",
    description: "Front-end developer on Cryptosynk's websites and web products.",
    highlights: [
      "Built modern, responsive websites and landing pages.",
      "Worked with designers and back-end developers to turn designs into fast, user-friendly interfaces.",
      "Improved the design and performance of the company's web products.",
    ],
    technologies: ["JavaScript", "React", "HTML", "CSS"],
  },
  {
    title: "Founder & Content Creator",
    company: "TechSecBD",
    logo: techsecbdLogo,
    location: "Bangladesh",
    date: "Jan 2018 - Mar 2020",
    description:
      "Founded and ran TechSecBD, a YouTube channel teaching technology, programming and cybersecurity.",
    highlights: [
      "Planned, produced and published educational videos on programming and cybersecurity for a growing audience.",
    ],
  },
];
