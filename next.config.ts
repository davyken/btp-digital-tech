import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer generated variants = faster first optimisation and better CDN cache hits
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [48, 128, 256, 384],
    qualities: [70, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "gsap"],
  },
  poweredByHeader: false,
  // Lets a local verification build run without touching the dev server's .next folder
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
