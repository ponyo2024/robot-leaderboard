import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/robot-leaderboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
