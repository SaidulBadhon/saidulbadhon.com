import type { Project } from "../types";
import cover from "./cover.webp";
import copilot from "./copilot.webp";
import liveShare from "./live-share.webp";
import consolePanel from "./console.webp";
import github from "./github.webp";
import githubImport from "./github-import.webp";
import pullRequest from "./pull-request.webp";
import learn from "./learn.webp";
import tutorial from "./tutorial.webp";
import home from "./home.webp";
import preview from "./preview.webp";
import storage from "./storage.webp";
import login from "./login.webp";

const project: Project = {
  slug: "jutsu-ide",
  title: "Jutsu IDE | Web3 IDE for NEAR",
  description:
    "A browser IDE for building, previewing and shipping NEAR Social components, with an AI copilot, live collaboration and GitHub sync.",
  longDescription:
    "Jutsu IDE is a web IDE for NEAR's Blockchain Operating System, where front ends are React-style components stored on-chain and rendered by the NEAR Social VM. Developers write components in a CodeMirror editor, see them render instantly in a sandboxed live preview with a console that captures their logs, and publish them to NEAR mainnet or testnet with a storage-cost estimate before they sign. Around the editor sit an AI copilot that writes, explains, documents and debugs components, Live Share for editing the same component together in real time, GitHub import and push, forks and pull requests with a side-by-side diff, interactive tutorials with runnable code, and IPFS storage for assets. I built most of it: the React front end, the Express and MongoDB API behind accounts, projects, forks, pull requests and GitHub sync, and the copilot service on OpenAI and Anthropic models. The screenshots show the IDE running locally with a demo workspace and made-up data.",
  type: "Project I worked on",
  role: "Lead Developer",
  duration: "Jan 2023 - Jun 2024",
  icon: "code",
  gradient: "from-blue-500 to-cyan-500",
  tags: [
    "Web3",
    "NEAR Protocol",
    "Developer Tools",
    "AI Copilot",
    "React",
  ],
  technologies: [
    "JavaScript",
    "React",
    "CodeMirror 6",
    "NEAR Social VM",
    "near-api-js",
    "NEAR Wallet Selector",
    "Yjs",
    "Material UI",
    "webpack",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "Octokit",
    "OpenAI",
    "Anthropic",
    "IPFS",
    "AWS Lambda",
  ],
  features: [
    "A CodeMirror editor with NEAR Social VM-aware autocomplete, Prettier formatting on save, and drafts kept in the browser",
    "Multi-component workspaces, arranged as a folder tree from dotted component names",
    "A sandboxed live preview on the NEAR Social VM, with light and dark modes and a console that captures component logs",
    "Publishing to NEAR mainnet or testnet through the NEAR Wallet Selector, with a storage-cost estimate shown before signing",
    "JutsuGPT, an AI copilot with modes to generate, explain, document, debug, simplify, optimise and write tests for components",
    "Live Share: real-time co-editing over Yjs, with a participant list and collaborators' cursors and selections",
    "GitHub integration to import or fork repositories, browse and edit their files, push commits and create repositories",
    "Forks and pull requests between developers, reviewed in a side-by-side diff and merged on-chain",
    "Interactive Learn tutorials that pair lessons with runnable code and a live preview",
    "IPFS storage for images and data files, plus sign-in with email, a NEAR wallet or GitHub",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "The editor: a multi-component workspace, a component's code and its live preview on the NEAR Social VM." },
    { image: copilot, caption: "JutsuGPT writing a DAO proposal voting card, with the generated component running in the preview." },
    { image: liveShare, caption: "Live Share: two developers editing the same component, with a collaborator's selection and name tag." },
    { image: consolePanel, caption: "A staking calculator with the preview console open, capturing the component's logs." },
    { image: github, caption: "A GitHub repository opened in the IDE, with its file tree, a component and its preview." },
    { image: githubImport, caption: "Importing a GitHub repository." },
    { image: pullRequest, caption: "A pull request between developers, reviewed as a side-by-side diff." },
    { image: learn, caption: "Learn: tutorials for building on NEAR's Blockchain Operating System." },
    { image: tutorial, caption: "A tutorial lesson next to runnable code and its live preview." },
    { image: home, caption: "Start a new project, or pick up where you left off." },
    { image: preview, caption: "A component rendered full-screen." },
    { image: storage, caption: "IPFS storage for a project's images and data files." },
    { image: login, caption: "Sign in with email, a NEAR wallet or GitHub." },
  ],
};

export default project;
