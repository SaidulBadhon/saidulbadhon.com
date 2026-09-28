import type { Project } from "../types";
import cover from "./cover.webp";
import event from "./event.webp";
import register from "./register.webp";
import travel from "./travel.webp";
import ncon from "./ncon.webp";
import checkIn from "./check-in.webp";
import wallet from "./wallet.webp";

const project: Project = {
  slug: "nearcon-ticketing",
  title: "NEARCON 2023 Ticketing System | Official Event App & NCON Payments",
  description:
    "The official app for NEARCON 2023 in Lisbon: ticketing and check-in, an NCON token wallet, and swag and food purchases for around 3,000 attendees.",
  longDescription:
    "NEARCON is the flagship conference of the NEAR Protocol ecosystem. Its 2023 edition ran from 7 to 10 November in Lisbon, Portugal, across three venues (NEARCON HQ at the Convento do Beato, Hacker HQ and Community HQ), with around 3,000 delegates and a hackathon with more than $140,000 in prizes. For it, NEAR Foundation partnered with Jutsu, Keypom and Veriken to turn the ticket into an app built on NEAR's Blockchain Operating System (B.O.S.). I built that app at Jutsu: the ticketing and check-in system, the merch and food purchase system, the NCON token wallet, and the event pages around them. Attendees registered and ordered their pass, then claimed it at the door, where staff scanned the ticket's QR code, checked their ID and printed their lanyard, and each attendee picked a username that became their own nearcon23.near account. Everyone started with 100 NCON, earned more by scanning bounty codes around the venues, and spent it on swag, lunches and food trucks by scanning a vendor's QR code, or sent it to other attendees. NEAR Foundation reported that over 110,000 NCON were distributed during the event. The app's screens are B.O.S. components stored on chain under nearcon23.near and served from a React gateway at nearcon.app, backed by an API on AWS. The screenshots here are those original components, rendered today through the near.social gateway: the app's photos and fonts were hosted on servers that no longer exist, so some images are missing and Mona Sans stands in for the original typeface.",
  type: "Project I worked on",
  role: "Lead Developer",
  duration: "Jun 2023 - Nov 2023",
  icon: "cubes",
  gradient: "from-emerald-500 to-teal-400",
  tags: [
    "Event App",
    "Ticketing",
    "Payments",
    "NEAR Protocol",
    "B.O.S.",
  ],
  technologies: [
    "NEAR Protocol",
    "NEAR B.O.S.",
    "React",
    "NEAR Wallet Selector",
    "Keypom",
    "Node.js",
    "MongoDB",
    "AWS Lambda",
    "QR code scanning",
  ],
  features: [
    "The official NEARCON '23 app, built as B.O.S. components stored on NEAR under nearcon23.near and served from nearcon.app",
    "Registration for the $99 conference pass, handing off to checkout to complete the order",
    "Check-in for staff: scan an attendee's ticket QR code, check their ID against the name and email on the ticket, claim it and print their lanyard",
    "Ticket claim that lets each attendee pick a username, which becomes their own nearcon23.near account",
    "An NCON wallet to send, receive and scan, with every attendee starting at 100 NCON",
    "Merch and food purchases: attendees paid for swag, lunches and food trucks in NCON by scanning a vendor's QR code",
    "Bounty campaigns: QR codes around the venues that dropped NCON into the wallet when scanned",
    "Admin tools to manage users and campaigns, scan tickets and send push alerts to attendees",
    "Nearconomy, a live board of NCON transactions, total NCON transacted and the top earners",
    "Event pages for the schedule (filtered by track, venue and date), speakers, the hackathon, travel and help",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "The NEARCON '23 app's home page, rendered from its original on-chain components." },
    { image: event, caption: "NEARCON '23 in Lisbon, including attendees claiming NCON by scanning a QR code with the app. Photos: NEAR Foundation." },
    { image: register, caption: "Registration: what the $99 pass included, next to the form that led to checkout." },
    { image: travel, caption: "Travel: where to stay in Lisbon, area by area." },
    { image: ncon, caption: "NEAR Foundation's NCON announcement, showing the app's bounty screen: find a code, then reveal and claim your NCON. Image: NEAR Foundation." },
    { image: checkIn, caption: "Check-in: staff scan a ticket and check the attendee's ID, then the attendee picks the username that becomes their nearcon23.near account." },
    { image: wallet, caption: "The NCON wallet: send, receive with a QR code, or scan to pay. Balances show zero because the event's API is no longer running." },
  ],
};

export default project;
