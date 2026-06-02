import type { MetadataRoute } from "next"
import { getEnv } from "@/core/config/env"

export default function robots(): MetadataRoute.Robots {
  const url = getEnv().APP_URL

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/settings",
          "/profile",
          "/brand-voice",
          "/brand-guard",
        ],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
