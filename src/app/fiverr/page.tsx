import JsonLd from "@/components/json-ld";
import FiverrPage from "@/components/fiverr-page";
import { fiverrProfile, fiverrProjects, getStats } from "@/content/fiverr";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, breadcrumbs, graph } from "@/lib/structured-data";

const stats = getStats();

const description = `Every Fiverr order Saidul Badhon completed from 2020 to 2024: ${stats.orders} orders for ${stats.clients} clients in React, Next.js, Node.js and React Native, rated ${stats.rating} from ${stats.reviews} reviews.`;

export const metadata = pageMetadata({
  path: "/fiverr",
  title: "Fiverr Work History",
  description,
});

const structuredData = graph(
  {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/fiverr")}#page`,
    url: absoluteUrl("/fiverr"),
    name: "Fiverr work history",
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    significantLink: fiverrProfile,
    hasPart: fiverrProjects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      creator: { "@id": PERSON_ID },
    })),
  },
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Fiverr work history", path: "/fiverr" },
  ])
);

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <FiverrPage />
    </>
  );
}
