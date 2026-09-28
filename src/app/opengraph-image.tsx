import { ogImage, ogSize } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.jobTitle}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: site.name,
    subtitle: site.jobTitle,
    description:
      "Building AI products. Case studies of Jutsu, Postt.ai and Dokan.gg, plus writing on AI agents and security.",
    meta: "Projects · Experience · Blog",
  });
}
