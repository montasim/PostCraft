import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const url = process.env.APP_URL || "https://linkedIQ.dev"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings", "/profile", "/workspace"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
