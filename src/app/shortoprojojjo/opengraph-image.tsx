import path from "node:path";
import sharp from "sharp";
import { channel, episodes } from "@/content/shorto-projojjo";
import { accentFrom, ogImage, ogSize } from "@/lib/og-image";

export const alt = `${channel.name}: ${channel.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  // The channel cover beside the text, as a JPEG data URL (the card renderer can't read WebP).
  const file = path.join(/*turbopackIgnore: true*/ process.cwd(), "content", "shorto-projojjo", "cover.webp");
  const jpeg = await sharp(file).resize({ width: 1240 }).jpeg({ quality: 82 }).toBuffer();
  return ogImage({
    eyebrow: "YouTube · Facebook",
    title: channel.name,
    subtitle: channel.tagline,
    description: `A Bangla video channel by Saidul Badhon. ${episodes.length} episodes, each built from a post on this blog.`,
    accent: accentFrom("from-yellow-400 to-pink-500"),
    image: {
      src: `data:image/jpeg;base64,${jpeg.toString("base64")}`,
      aspectRatio: channel.cover.width / channel.cover.height,
    },
  });
}
