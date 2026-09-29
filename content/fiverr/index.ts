import zodiWorldCover from "@/content/projects/zodi-world/cover.webp";
import campusJapanCompanies from "./images/campus-japan-companies.webp";
import campusJapanHome from "./images/campus-japan-home.webp";
import campusJapanJobList from "./images/campus-japan-job-list.webp";
import campusJapanJobs from "./images/campus-japan-jobs.webp";
import campusJapanPartners from "./images/campus-japan-partners.webp";
import campusJapanPostJob from "./images/campus-japan-post-job.webp";
import campusJapanSettings from "./images/campus-japan-settings.webp";
import dslAddUser from "./images/dsl-add-user.webp";
import dslDashboard from "./images/dsl-dashboard.webp";
import dslJobs from "./images/dsl-jobs.webp";
import dslLogin from "./images/dsl-login.webp";
import duoblazeLogin from "./images/duoblaze-login.webp";
import duoblazeMatchup from "./images/duoblaze-matchup.webp";
import marseflyLogin from "./images/marsefly-login.webp";
import marseflyTrips from "./images/marsefly-trips.webp";
import novenAdmin from "./images/noven-admin.webp";
import pitLaneAddMatch from "./images/pit-lane-add-match.webp";
import pitLaneCountdown from "./images/pit-lane-countdown.webp";
import pitLaneOpen from "./images/pit-lane-open.webp";
import pitLaneOver from "./images/pit-lane-over.webp";
import pitLaneRefuel from "./images/pit-lane-refuel.webp";
import privilQrCodes from "./images/privil-qr-codes.webp";
import privilStaticQr from "./images/privil-static-qr.webp";
import realselectAgentForm from "./images/realselect-agent-form.webp";
import realselectHome from "./images/realselect-home.webp";
import savingsChart1 from "./images/savings-chart-1.webp";
import savingsChart2 from "./images/savings-chart-2.webp";
import savingsChart3 from "./images/savings-chart-3.webp";
import savingsChart4 from "./images/savings-chart-4.webp";
import slowPuzzleAdmin from "./images/slow-puzzle-admin.webp";
import slowPuzzleLogin from "./images/slow-puzzle-login.webp";
import slowPuzzleRewards from "./images/slow-puzzle-rewards.webp";
import slowPuzzleSignup from "./images/slow-puzzle-signup.webp";
import userTable from "./images/user-table.webp";
import userTableCreate from "./images/user-table-create.webp";
import userTableMobile from "./images/user-table-mobile.webp";
import userTableUpdate from "./images/user-table-update.webp";
import { orders } from "./orders";
import type { FiverrClient, FiverrOrder, FiverrProject } from "./types";

export { orders };
export type { FiverrClient, FiverrOrder, FiverrProject } from "./types";

export const fiverrProfile = "https://www.fiverr.com/saidulbadhon";

/**
 * Projects shown with screenshots, in the order they appear on /fiverr. The
 * screenshots come from the deliveries; ones that showed personal details
 * were left out.
 */
export const fiverrProjects: FiverrProject[] = [
  {
    slug: "zodi-world",
    title: "Zodi World",
    kind: "Astrology app for iOS and Android",
    client: "bryonyz",
    summary:
      "The founder's no-code prototype, rebuilt by hand in React Native and Expo and made ready for the App Store and Google Play. The client came back for eight more orders: the crystal of the day, a detail screen for each collectible, sharing to Instagram Stories, a new home screen and quick bug fixes.",
    technologies: ["React Native", "Expo", "Supabase", "Adapty"],
    frame: "none",
    images: [
      {
        image: zodiWorldCover,
        caption: "Sign-in, the home screen with the daily cards, and the birth place search.",
      },
    ],
    caseStudy: "/projects/zodi-world",
  },
  {
    slug: "campus-japan",
    title: "Campus Japan",
    kind: "Job board",
    client: "nomad3526",
    summary:
      "A Next.js job board where engineering students in India get headhunted by Japanese companies. Over three orders I built the landing page, job search and company pages, the applicant dashboard, and an area where companies post and manage jobs, deployed on AWS Amplify.",
    technologies: ["Next.js", "React", "Node.js", "AWS Amplify"],
    frame: "browser",
    images: [
      { image: campusJapanHome, caption: "The landing page, where students sign up to be headhunted." },
      { image: campusJapanJobs, caption: "Job search, filtered by type of employment and category." },
      { image: campusJapanCompanies, caption: "Browsing companies, with recommended ones first." },
      { image: campusJapanPartners, caption: "Partner companies and job categories on the landing page." },
      { image: campusJapanPostJob, caption: "Companies post a job in steps, down to the perks and benefits." },
      { image: campusJapanJobList, caption: "A company's job listings, with their status and applicants." },
      { image: campusJapanSettings, caption: "An applicant's profile settings." },
    ],
  },
  {
    slug: "pit-lane",
    title: "Pit Lane Countdown",
    kind: "Race control board",
    client: "stefansec",
    summary:
      "A web app for a motorsport team that counts down the race and the pit lane window, and tells the crew when to refuel and start the engine. Built in React and hosted on Netlify, then revised quickly when the team wanted its logic adjusted.",
    technologies: ["React", "JavaScript", "Netlify"],
    frame: "browser",
    images: [
      { image: pitLaneOpen, caption: "The race clock, with the pit lane about to open." },
      { image: pitLaneRefuel, caption: "Two stops in progress, one calling to refuel and start the engine." },
      { image: pitLaneCountdown, caption: "Counting down to the pit lane opening." },
      { image: pitLaneOver, caption: "After the pit window has closed." },
      { image: pitLaneAddMatch, caption: "Setting up the next match." },
    ],
  },
  {
    slug: "privil",
    title: "Privil",
    kind: "QR code generator",
    client: "jameschae",
    summary:
      "A web app for creating QR codes, saving them to an account, and downloading or printing them. I built the React front end and the Node.js API, launched it at privil.link, and handed over a video walkthrough of every feature.",
    technologies: ["React", "Node.js"],
    frame: "browser",
    images: [
      { image: privilQrCodes, caption: "The QR codes saved to an account." },
      { image: privilStaticQr, caption: "Creating a static QR code, ready to download or print." },
    ],
  },
  {
    slug: "dsl-elektronika",
    title: "DSL Elektronika",
    kind: "Job tracking dashboard",
    client: "teakong",
    summary:
      "An internal tool where admins add workers, assign them jobs with an external ID and link, and mark each one done, pending or failed. Workers see today's and this week's jobs and what they have earned.",
    technologies: ["React", "Node.js", "MongoDB", "Bootstrap"],
    frame: "browser",
    images: [
      { image: dslDashboard, caption: "A worker's page: job counts, earnings, and today's and this week's jobs." },
      { image: dslJobs, caption: "An admin managing one worker's jobs and their status." },
      { image: dslAddUser, caption: "Adding a worker or an admin." },
      { image: dslLogin, caption: "Sign-in." },
    ],
  },
  {
    slug: "noven-realselect",
    title: "Noven and RealSelect",
    kind: "Company websites",
    client: "pedfag",
    summary:
      "Four orders for one client between 2021 and 2023. For Noven Consulting I built a Next.js website with a Node.js API and an admin dashboard for its services, projects, library, contacts, proposal requests and newsletter. RealSelect matches home buyers and sellers with partner agents, who apply through a multi-step form.",
    technologies: ["Next.js", "React", "Node.js", "Vercel"],
    frame: "browser",
    images: [
      { image: realselectHome, caption: "RealSelect: signing up as a home seller, a buyer or an agent." },
      { image: realselectAgentForm, caption: "RealSelect: the partner agent application." },
      { image: novenAdmin, caption: "Noven: the admin dashboard." },
    ],
  },
  {
    slug: "marsefly",
    title: "MarseFly",
    kind: "Travel photo app",
    client: "billias86",
    summary:
      "A web app for keeping travel photos and videos in albums, placing them on a map and sharing them with connections, with sign-in through Google and Facebook. Built over several milestones and hosted on Netlify.",
    technologies: ["React", "Node.js", "MongoDB", "Netlify"],
    frame: "browser",
    images: [
      { image: marseflyTrips, caption: "Albums, each with a place and a date." },
      { image: marseflyLogin, caption: "Sign-in, with Google and Facebook." },
    ],
  },
  {
    slug: "slow-puzzle",
    title: "Slow Puzzle",
    kind: "Puzzle app and admin dashboard",
    client: "puzzleapp",
    summary:
      "A React Native and Expo app where players collect puzzle pieces and rewards, with a web dashboard for managing users, puzzles and rewards and handing out pieces. Built over two milestones on AWS and MongoDB.",
    technologies: ["React Native", "Expo", "React", "MongoDB", "AWS"],
    frame: "phone",
    images: [
      { image: slowPuzzleLogin, caption: "Sign-in in the app." },
      { image: slowPuzzleSignup, caption: "Signing up." },
      { image: slowPuzzleAdmin, caption: "The admin dashboard, with a button to give pieces to every player." },
      { image: slowPuzzleRewards, caption: "Rewards in the admin dashboard." },
    ],
  },
  {
    slug: "user-table",
    title: "User Management Table",
    kind: "React component",
    client: "n805248",
    summary:
      "A React table for managing users: search, sort and filter, then create, edit or delete a user in a dialog, with a layout that works on phones. Every script came commented.",
    technologies: ["React", "JavaScript"],
    frame: "browser",
    images: [
      { image: userTable, caption: "Users, with search, sorting and filters." },
      { image: userTableCreate, caption: "Creating a user." },
      { image: userTableUpdate, caption: "Editing a user." },
      { image: userTableMobile, caption: "The same table on a phone." },
    ],
  },
  {
    slug: "savings-chart",
    title: "Savings Chart",
    kind: "React Native component",
    client: "davidatavocado",
    summary:
      "A chart for a finance app: drag along the bars to see total savings year by year, with the breakeven point marked. Delivered as a drop-in component and an Expo demo.",
    technologies: ["React Native", "Expo"],
    frame: "phone",
    images: [
      { image: savingsChart1, caption: "Total savings early on." },
      { image: savingsChart3, caption: "The breakeven point, marked on the timeline." },
      { image: savingsChart2, caption: "Dragged forward to a later year." },
      { image: savingsChart4, caption: "Before breakeven, the total is negative." },
    ],
  },
  {
    slug: "duoblaze",
    title: "DuoBlaze",
    kind: "Head-to-head voting site",
    client: "alexthedrey",
    summary:
      "A site where two profiles go head to head and visitors vote with a heart, with accounts, a leaderboard and challenges. React front end and Node.js API.",
    technologies: ["React", "Node.js"],
    frame: "browser",
    images: [
      { image: duoblazeMatchup, caption: "A matchup between two profiles." },
      { image: duoblazeLogin, caption: "Sign-in." },
    ],
  },
];

/** The orders that were part of a showcased project, newest first. */
export function getProjectOrders(slug: string): FiverrOrder[] {
  return orders.filter((order) => order.project === slug);
}

/** Clients with everything done for them, most recent client first. */
export function getClients(): FiverrClient[] {
  const clients = new Map<string, FiverrClient>();
  for (const order of orders) {
    const client = clients.get(order.client) ?? {
      username: order.client,
      orders: [],
      projects: fiverrProjects.filter((project) => project.client === order.client),
    };
    client.orders.push(order);
    clients.set(order.client, client);
  }
  return [...clients.values()];
}

/** Orders with a written review, newest first. */
export function getReviews(): (FiverrOrder & { rating: number; review: string })[] {
  return orders.filter(
    (order): order is FiverrOrder & { rating: number; review: string } =>
      order.rating !== undefined && order.review !== undefined
  );
}

/** The review quoted at the top of /fiverr. */
export function getFeaturedReview() {
  return getReviews().find(
    (order) => order.client === "bryonyz" && order.delivered === "2023-07-07"
  )!;
}

/** Headline numbers for the page. */
export function getStats() {
  const clients = getClients();
  const reviews = getReviews();
  const rating = reviews.reduce((sum, order) => sum + order.rating, 0) / reviews.length;
  return {
    orders: orders.length,
    clients: clients.length,
    repeatClients: clients.filter((client) => client.orders.length > 1).length,
    reviews: reviews.length,
    /** Rounded to one decimal place, as Fiverr shows it. */
    rating: rating.toFixed(1),
    first: orders[orders.length - 1].placed,
    last: orders[0].delivered,
  };
}

/** "2023-07-07" as "Jul 2023". */
export function formatMonth(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The months an order or a set of orders ran, e.g. "May – Jul 2023". */
export function formatSpan(start: string, end: string): string {
  const from = formatMonth(start);
  const to = formatMonth(end);
  if (from === to) return to;
  const [fromMonth, fromYear] = from.split(" ");
  const [, toYear] = to.split(" ");
  return fromYear === toYear ? `${fromMonth} – ${to}` : `${from} – ${to}`;
}
