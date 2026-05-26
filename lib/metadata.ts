import type { Metadata } from "next"

const SITE_URL = process.env.APP_URL || "https://linkedIQ.dev"
const SITE_NAME = "LinkedIQ"

export function buildMetadata(opts: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL
  const ogImage = opts.image || `${SITE_URL}/opengraph-image`

  return {
    title: opts.title,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
    alternates: { canonical: url },
    ...(opts.noIndex && { robots: { index: false, follow: false } }),
  }
}
