import type { MetadataRoute } from "next";
import { getCover, getPosts } from "@/content/blogs";
import { fiverrProjects } from "@/content/fiverr";
import { projects, toImage } from "@/content/projects";
import { channel, episodes, publisher } from "@/content/shorto-projojjo";
import { absoluteUrl } from "@/lib/site";

// Every page on the site, with its images so they can show up in image search.
// Only blog posts and the privacy policy have a reliable last-modified date, so
// only they get one.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getPosts();
  const covers = await Promise.all(posts.map(getCover));

  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/blogs"), lastModified: posts[0]?.date },
    ...posts.map((post, index) => ({
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: post.date,
      images: covers[index] ? [absoluteUrl(covers[index].src)] : undefined,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      images: project.images.map((entry) => absoluteUrl(toImage(entry).image.src)),
    })),
    {
      url: absoluteUrl("/fiverr"),
      images: fiverrProjects.map((project) => absoluteUrl(project.images[0].image.src)),
    },
    {
      url: absoluteUrl("/shortoprojojjo"),
      images: [channel.cover, ...episodes.map((episode) => episode.thumbnail)].map((image) =>
        absoluteUrl(image.src)
      ),
    },
    { url: absoluteUrl(publisher.privacyPolicy), lastModified: publisher.updated },
  ];
}
