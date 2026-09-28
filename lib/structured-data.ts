import { skills } from "@/content/skills";
import { SITE_URL, absoluteUrl, site } from "./site";

// Schema.org structured data (JSON-LD). Search engines and AI assistants read
// it to tell who wrote what: every page links its content back to the same
// Person by @id, so they can be recognised as one entity.

type Node = Record<string, unknown>;

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blogs#blog`;

/** Wraps nodes in a single JSON-LD document. */
export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Saidul, in full. */
export function person(): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: SITE_URL,
    image: absoluteUrl(site.image),
    jobTitle: site.jobTitle,
    description: site.description,
    worksFor: { "@type": "Organization", ...site.worksFor },
    homeLocation: {
      "@type": "Place",
      name: `${site.location.city}, ${site.location.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressCountry: site.location.countryCode,
      },
    },
    knowsAbout: skills,
    sameAs: [site.linkedin, site.github],
  };
}

/** Saidul, as the author of a page. */
export function author(): Node {
  return { "@type": "Person", "@id": PERSON_ID, name: site.name, url: SITE_URL };
}

export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

/** The trail from the home page to this one, e.g. Home › Blog › Post. */
export function breadcrumbs(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
