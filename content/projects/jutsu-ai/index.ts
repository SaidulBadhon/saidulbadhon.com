import type { Project } from "../types";
import cover from "./cover.webp";
import website from "./website.webp";
import home from "./home.webp";
import alerts from "./alerts.webp";
import alertDetail from "./alert-detail.webp";
import incidents from "./incidents.webp";
import incidentDetail from "./incident-detail.webp";
import eventSearch from "./event-search.webp";
import ruleEditor from "./rule-editor.webp";
import attackCoverage from "./attack-coverage.webp";
import connections from "./connections.webp";
import compliance from "./compliance.webp";
import report from "./report.webp";
import copilot from "./copilot.webp";
import aiAgents from "./ai-agents.webp";

const project: Project = {
  slug: "jutsu-ai",
  title: "Jutsu | AI Security Operations Platform",
  description:
    "An AI-native SOC platform that replaces SIEM, SOAR, threat intel, compliance and reporting tools with one console.",
  longDescription:
    "Jutsu (jutsu.ai) is an all-in-one security operations platform for teams that can't staff a 24/7 SOC. The console at app.jutsu.ai connects to a company's cloud accounts, identity providers, SaaS apps, code hosts and servers, normalizes everything into OCSF events in ClickHouse, and runs Sigma detections over it. AI agents then do the work of a tier-1 analyst: they enrich and score every alert with a verdict and the reasoning behind it, correlate related alerts into incidents, write the investigation, and recommend or run policy-approved response actions such as deactivating a leaked key or blocking an IP at the edge. The same data drives continuous SOC 2 and ISO 27001 readiness, scheduled SOC reports, and Jutsu AI, a copilot that answers questions about the whole workspace. I'm the lead engineer on the platform and work across the ingest pipeline, the multi-tenant API, the detection and AI triage services, and the React console. The console screenshots show a demo organization with made-up data.",
  type: "Project I worked on",
  role: "Lead Full Stack Engineer",
  duration: "Jun 2026 - Present",
  icon: "shield",
  gradient: "from-sky-500 to-cyan-400",
  tags: [
    "AI Agents",
    "SIEM",
    "Cybersecurity",
    "ClickHouse",
    "React",
  ],
  technologies: [
    "TypeScript",
    "Bun",
    "Hono",
    "React 19",
    "Vite",
    "Tailwind CSS",
    "ClickHouse",
    "PostgreSQL",
    "Drizzle ORM",
    "Vector",
    "NATS JetStream",
    "Redis",
    "Vercel AI SDK",
    "Kubernetes (GKE)",
    "OpenTofu",
  ],
  features: [
    "Pull connectors for AWS, GCP, Google Workspace, Microsoft 365, Okta, GitHub, Cloudflare, Vercel and password managers, plus host collectors for Linux, Windows and macOS",
    "Vector ingest pipeline that normalizes every source to OCSF and stores it per tenant in ClickHouse",
    "Event search with a query language, facets, a volume histogram and a field-level event inspector",
    "Sigma rule engine with an in-browser YAML editor, rule testing, a community rule marketplace and MITRE ATT&CK coverage mapping",
    "AI alert triage with risk and confidence scores, a verdict with its reasoning, threat-intel enrichment and an attack timeline",
    "Incidents built from correlated alerts, with AI-written investigations, SLA tracking and a full audit trail",
    "Response actions such as key deactivation, edge IP blocks and session revocation, auto-approved by policy or held for a second approver, with one-click revert",
    "Continuous compliance readiness for SOC 2, ISO 27001, CIS Controls and PCI DSS from one shared control catalog",
    "Scheduled and on-demand SOC, executive and compliance reports with AI-drafted summaries",
    "Jutsu AI, a copilot that searches alerts, events, incidents and assets and cites its sources",
    "Multi-tenant RBAC, Google sign-in, MFA with passkeys, audit logging and Stripe billing",
  ],
  links: {
    live: "https://jutsu.ai",
  },
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "The SOC dashboard: live detection and response metrics, event severity and threat geography." },
    { image: website, caption: "jutsu.ai, the marketing site." },
    { image: home, caption: "Home: a plain-language view of what needs attention right now." },
    { image: alerts, caption: "The alert queue, with the AI triage verdict, its reasoning and next steps in the side panel." },
    { image: alertDetail, caption: "An alert's risk score, analyst verdict and AI summary." },
    { image: incidents, caption: "Incidents built from correlated alerts, ranked by risk, with SLA badges." },
    { image: incidentDetail, caption: "The AI-written investigation for a compromised AWS deploy key." },
    { image: eventSearch, caption: "Event search pivoting on an attacker IP, with the normalized event inspector." },
    { image: ruleEditor, caption: "The Sigma rule editor, with Jutsu AI alongside." },
    { image: attackCoverage, caption: "Top attackers, hosts and techniques, and detection coverage across MITRE ATT&CK." },
    { image: connections, caption: "Connected sources across code, cloud, identity, applications and devices." },
    { image: compliance, caption: "Compliance readiness for SOC 2, ISO 27001, CIS Controls and PCI DSS." },
    { image: report, caption: "A weekly SOC report with an AI-drafted executive summary." },
    { image: copilot, caption: "Jutsu AI answering an investigation question, with the sources it used." },
    { image: aiAgents, caption: "The AI agents behind the platform, as presented on jutsu.ai." },
  ],
};

export default project;
