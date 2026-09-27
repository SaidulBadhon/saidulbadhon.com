import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 only allows quality 75 by default; the profile photo uses 95.
    qualities: [75, 95],
  },
};

export default nextConfig;
