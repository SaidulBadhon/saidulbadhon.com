import { getStats } from "@/content/fiverr";
import { accentFrom, ogImage, ogSize } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = `${site.name}'s Fiverr work history`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const stats = getStats();
  return ogImage({
    eyebrow: "Fiverr",
    title: "Fiverr work history",
    subtitle: `${stats.orders} orders for ${stats.clients} clients`,
    description: `Web apps, React Native apps and fixes from 2020 to 2024, rated ${stats.rating} from ${stats.reviews} reviews.`,
    accent: accentFrom("from-emerald-500 to-teal-400"),
  });
}
