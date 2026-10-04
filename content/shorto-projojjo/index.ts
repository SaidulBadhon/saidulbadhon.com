import type { StaticImageData } from "next/image";
import cover from "./cover.webp";
import aiIndustryThumbnail from "./episodes/the-ai-industry-is-a-complete-mess.webp";
import chatgptProThumbnail from "./episodes/chatgpt-pro-200-is-back-with-half-the-usage.webp";
import host from "./format/host.webp";
import numbers from "./format/numbers.webp";
import pause from "./format/pause.webp";
import logo from "./logo.png";

/** শর্ত প্রযোজ্য (Shorto Projojjo): the Bangla video channel. The videos are made in
 *  the shorto-projojjo repo; each one starts as a post on this blog. */
export const channel = {
  name: "Shorto Projojjo",
  nameBn: "শর্ত প্রযোজ্য",
  meaning: "Conditions apply",
  tagline: "Tech hype, fact-checked in Bangla",
  // TODO: confirm both links once the channels are live.
  youtube: "https://www.youtube.com/@ShortoProjojjo",
  facebook: "https://www.facebook.com/ShortoProjojjo",
  handle: "@ShortoProjojjo",
  logo,
  cover,
};

/** The app that uploads the episodes to the channel's YouTube channel and Facebook Page.
 *  Its privacy policy is the URL given to Google and Meta when registering the app, so
 *  keep the path stable, and move `updated` whenever the policy text changes. */
export const publisher = {
  name: "Shorto Projojjo Media",
  privacyPolicy: "/shortoprojojjo/media/privacy-policy",
  updated: "2026-10-04",
};

/** How every episode is built, with a still from a real one. */
export const format: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  {
    title: "The host sells the hype",
    body: "A cheesy late-night infomercial host pitches the most enthusiastic take on the news, and sells the bad parts as features.",
    image: host,
    alt: "A yellow infomercial set: a cartoon product box labelled AI 2026, a $730B price star and a banner reading “agents don’t take no for an answer!” in Bangla",
  },
  {
    title: "The fact-checker pauses the tape",
    body: "The picture freezes and goes grey, a red marker comes out, and the pitch gets checked against the record.",
    image: pause,
    alt: "The same set frozen in grey with a PAUSE readout, a “fact check” pill and a red marker circle around the agents claim",
  },
  {
    title: "The real numbers, with sources",
    body: "Charts built from the research in the written post, with every source linked in the video’s description.",
    image: numbers,
    alt: "A chart on a paused tape: Claude Mythos found 23,019 bugs in open source, 6,202 serious, 530 disclosed and 75 patched, with the 75 circled in red",
  },
];

export type Episode = {
  /** The blog post the episode is made from. */
  post: string;
  /** The episode's title card, in Bangla. */
  titleBn: string;
  /** Length of the long video, m:ss. */
  length: string;
  /** Whether there's a vertical Short cut from it. */
  short: boolean;
  thumbnail: StaticImageData;
  /** On YouTube, once uploaded. */
  youtube?: string;
};

/** Newest first. */
export const episodes: Episode[] = [
  {
    post: "the-ai-industry-is-a-complete-mess",
    titleBn: "কিন্তু দাঁড়ান… আরও গোলমাল আছে!",
    length: "4:10",
    short: true,
    thumbnail: aiIndustryThumbnail,
  },
  {
    post: "chatgpt-pro-200-is-back-with-half-the-usage",
    titleBn: "কিন্তু দাঁড়ান… আরও কম আছে!",
    length: "3:50",
    short: false,
    thumbnail: chatgptProThumbnail,
  },
];
