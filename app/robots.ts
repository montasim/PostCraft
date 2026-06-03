import type { MetadataRoute } from "next"
import { getEnv } from "@/core/config/env"

export default function robots(): MetadataRoute.Robots {
  const url = getEnv().APP_URL

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
