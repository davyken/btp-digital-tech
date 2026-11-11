import type { MetadataRoute } from "next";
import { nav } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...nav.map((n) => ({ url: `${base}${n.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
