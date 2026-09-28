import { ogImage, ogSize } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = site.blog.name;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Blog",
    title: "Notes & writing",
    description: site.blog.description,
  });
}
