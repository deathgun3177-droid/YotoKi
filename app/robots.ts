import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoto-ki.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/anime", "/movies", "/search", "/title/", "/info"],
        disallow: ["/admin/", "/profile", "/auth", "/login", "/signup", "/watch/"]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
