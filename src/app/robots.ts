import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Every crawler is welcome, search engines and AI assistants alike.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
