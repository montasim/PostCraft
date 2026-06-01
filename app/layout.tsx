import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { cn } from "@/lib/utils"
import { getEnv } from "@/core/config/env"

export const metadata: Metadata = {
  metadataBase: new URL(getEnv().APP_URL),
  title: {
    template: "%s | LinkedIQ",
    default: "LinkedIQ — Write LinkedIn Posts That Get Engagement",
  },
  description:
    "Generate LinkedIn posts ranked by engagement score. Get 3 AI-written variants tailored to your brand voice, scored for clarity, engagement, and readability.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LinkedIQ",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  )
}
