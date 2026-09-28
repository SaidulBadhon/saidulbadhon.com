import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 only allows quality 75 by default; the profile photo uses 95.
    qualities: [75, 95],
  },
  redirects() {
    return [
      // The Web3 Copilot project was replaced by Jutsu IDE.
      {
        source: "/projects/jutsu-web3-copilot",
        destination: "/projects/jutsu-ide",
        permanent: true,
      },
    ];
  },
};

// Compiles the blog posts in content/blogs. Turbopack can only pass plugins
// by name, with options that serialize to JSON.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: { block: "plaintext" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
