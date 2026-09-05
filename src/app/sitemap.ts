import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";

const siteUrl = "https://appcraft.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: "2026-09-05", changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: "2026-09-05", changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/process`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/tech`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: "2026-09-05", changeFrequency: "daily", priority: 0.8 },
  ];
  return [...routes, ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.publishedAt, changeFrequency: "monthly" as const, priority: 0.7 }))];
}
