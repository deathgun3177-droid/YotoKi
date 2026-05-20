import type { MetadataRoute } from "next";
import { getAllTitles } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoto-ki.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const titles = await getAllTitles();
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/anime`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${siteUrl}/movies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${siteUrl}/info`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    },
    ...titles.map((title) => ({
      url: `${siteUrl}/title/${title.slug}`,
      lastModified: title.addedAt ? new Date(title.addedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
