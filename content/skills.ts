import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAnthropic,
  SiBun,
  SiClickhouse,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiHono,
  SiHtml5,
  SiIpfs,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiNear,
  SiNextdotjs,
  SiNodedotjs,
  SiOpentofu,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRust,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import {
  TbArrowsExchange,
  TbBrandAws,
  TbBrandOpenai,
  TbCalendarStats,
  TbChecklist,
  TbClockPlay,
  TbCloud,
  TbCode,
  TbCpu,
  TbCube,
  TbDatabase,
  TbFileCode,
  TbFileSearch,
  TbGitPullRequest,
  TbHexagons,
  TbLayout,
  TbLayoutKanban,
  TbRadar,
  TbRobot,
  TbSchema,
  TbServer,
  TbShield,
  TbShieldCheck,
  TbTable,
  TbTarget,
  TbTopologyStar,
  TbUsers,
  TbVector,
} from "react-icons/tb";

export type Skill = {
  name: string;
  /** The tool's logo, or an icon for the idea. */
  icon: IconType;
  /** Brand colour of the logo. Leave it out for black or white logos, which
   *  then follow the text colour in light and dark mode. */
  color?: string;
};

export type SkillGroup = {
  name: string;
  icon: IconType;
  skills: Skill[];
};

/** Skills shown on the site, grouped and in order. */
export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    icon: TbCode,
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F0DB4F" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Rust", icon: SiRust },
      { name: "SQL", icon: TbTable },
    ],
  },
  {
    name: "Frontend",
    icon: TbLayout,
    skills: [
      { name: "React", icon: SiReact, color: "#149ECA" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "HTML & CSS", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    name: "Backend",
    icon: TbServer,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Bun", icon: SiBun },
      { name: "Hono", icon: SiHono, color: "#E36002" },
      { name: "Express", icon: SiExpress },
      { name: "Drizzle ORM", icon: SiDrizzle },
      { name: "REST APIs", icon: TbArrowsExchange },
      { name: "Background jobs", icon: TbClockPlay },
    ],
  },
  {
    name: "AI & LLMs",
    icon: TbCpu,
    skills: [
      { name: "AI agents", icon: TbRobot },
      { name: "RAG", icon: TbFileSearch },
      { name: "Vercel AI SDK", icon: SiVercel },
      { name: "OpenAI", icon: TbBrandOpenai },
      { name: "Anthropic", icon: SiAnthropic },
      { name: "Amazon Bedrock", icon: TbBrandAws, color: "#FF9900" },
      { name: "LangChain", icon: SiLangchain },
    ],
  },
  {
    name: "Databases",
    icon: TbDatabase,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "ClickHouse", icon: SiClickhouse, color: "#F5C400" },
      { name: "Redis", icon: SiRedis, color: "#FF4438" },
      { name: "pgvector", icon: TbVector },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: TbCloud,
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "OpenTofu", icon: SiOpentofu, color: "#E8B800" },
      { name: "Vercel", icon: SiVercel },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
  },
  {
    name: "Security",
    icon: TbShield,
    skills: [
      { name: "SIEM", icon: TbRadar },
      { name: "Sigma rules", icon: TbChecklist },
      { name: "OCSF", icon: TbSchema },
      { name: "MITRE ATT&CK", icon: TbTarget },
      { name: "SOC 2", icon: TbShieldCheck },
    ],
  },
  {
    name: "Web3",
    icon: TbCube,
    skills: [
      { name: "NEAR Protocol", icon: SiNear },
      { name: "Smart contracts", icon: TbFileCode },
      { name: "NFTs", icon: TbHexagons },
      { name: "IPFS", icon: SiIpfs, color: "#65C2CB" },
      { name: "Blockchain", icon: TbCube },
    ],
  },
  {
    name: "Leadership",
    icon: TbUsers,
    skills: [
      { name: "Team leadership", icon: TbUsers },
      { name: "Project management", icon: TbLayoutKanban },
      { name: "Sprint planning", icon: TbCalendarStats },
      { name: "Code review", icon: TbGitPullRequest },
      { name: "System design", icon: TbTopologyStar },
    ],
  },
];

/** Every skill by name, in order. */
export const skills: string[] = skillGroups.flatMap((group) =>
  group.skills.map((skill) => skill.name)
);
