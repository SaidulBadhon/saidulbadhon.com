import JsonLd from "@/components/json-ld";
import ShortoProjojjoPage, { type EpisodeCard } from "@/components/shorto-projojjo-page";
import { formatDate, getPost } from "@/content/blogs";
import { channel, episodes } from "@/content/shorto-projojjo";
import { bengali } from "@/lib/fonts/bengali";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, breadcrumbs, graph } from "@/lib/structured-data";

const description = `${channel.name} (${channel.nameBn}, "${channel.meaning.toLowerCase()}") is Saidul Badhon's Bangla video channel on YouTube and Facebook: tech hype, fact-checked, with every episode built from a post on this blog.`;

export const metadata = pageMetadata({
  path: "/shortoprojojjo",
  title: `${channel.name}: ${channel.tagline}`,
  description,
});

/** Episodes whose post exists, with the post's title and date. */
const cards: EpisodeCard[] = episodes.flatMap((episode) => {
  const post = getPost(episode.post);
  return post ? [{ ...episode, postTitle: post.title, postDate: formatDate(post.date) }] : [];
});

const structuredData = graph(
  {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/shortoprojojjo")}#page`,
    url: absoluteUrl("/shortoprojojjo"),
    name: `${channel.name} (${channel.nameBn})`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "CreativeWorkSeries",
      name: channel.nameBn,
      alternateName: [channel.name, channel.meaning],
      description: channel.tagline,
      inLanguage: "bn",
      creator: { "@id": PERSON_ID },
      sameAs: [channel.youtube, channel.facebook],
      hasPart: cards.map((card) => ({
        "@type": "CreativeWork",
        name: card.titleBn,
        inLanguage: "bn",
        isBasedOn: absoluteUrl(`/blogs/${card.post}`),
      })),
    },
  },
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: channel.name, path: "/shortoprojojjo" },
  ])
);

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <ShortoProjojjoPage episodes={cards} bengaliClassName={bengali.className} />
    </>
  );
}
