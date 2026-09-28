import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import JsonLd from "@/components/json-ld";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { SITE_URL, pageMetadata, site } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, graph, person, website } from "@/lib/structured-data";

export const metadata = pageMetadata({ path: "/", description: site.description });

// The home page is Saidul's profile page.
const structuredData = graph(person(), website(), {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: site.title,
  inLanguage: "en",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
});

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <JsonLd data={structuredData} />
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
