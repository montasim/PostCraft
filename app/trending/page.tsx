import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { TrendingShell } from "@/components/features/trending/trending-shell"

export const metadata: Metadata = {
  title: "Trending Topics & Post Ideas",
  description:
    "Discover what is trending across Hacker News, Dev.to, GitHub, and Reddit. Generate LinkedIn posts from real-time trending content tailored to your audience.",
}

export default function TrendingPage() {
  return (
    <AppShell>
      <TrendingShell />
    </AppShell>
  )
}
