import type { StaticImageData } from "next/image";

/** A completed Fiverr order. */
export type FiverrOrder = {
  /** The client's Fiverr username. */
  client: string;
  /** When the order was placed and delivered, as YYYY-MM-DD. */
  placed: string;
  delivered: string;
  /** What was delivered, in one sentence. */
  summary: string;
  tags: string[];
  /** Slug of the showcased project the order was part of, if any. */
  project?: string;
  /** The client's star rating, out of 5, if they left one. */
  rating?: number;
  /** The client's review, as written. */
  review?: string;
};

/** A Fiverr project shown with screenshots from its deliveries. */
export type FiverrProject = {
  slug: string;
  title: string;
  /** What kind of product it is, e.g. "Job board". */
  kind: string;
  /** The client's Fiverr username. */
  client: string;
  /** Two or three sentences on what was built. */
  summary: string;
  technologies: string[];
  /** How the cover is shown: in a browser window, as phone screens side by
   *  side (portrait images only), or as is. */
  frame: "browser" | "phone" | "none";
  /** The first image is the cover. */
  images: { image: StaticImageData; caption: string }[];
  /** A full case study on this site, e.g. /projects/zodi-world. */
  caseStudy?: string;
};

/** Everything done for one client, newest order first. */
export type FiverrClient = {
  username: string;
  orders: FiverrOrder[];
  /** Showcased projects built for this client. */
  projects: FiverrProject[];
};
