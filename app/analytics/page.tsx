import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { AnalyticsContent } from "@/components/features/analytics"

export const metadata: Metadata = {
  title: "Post Analytics & Engagement Scores",
  description:
    "Track your content performance with engagement scores, style breakdowns, and trend analysis. See what works and double down on your strengths.",
}

export default function AnalyticsPage() {
  return (
    <AppShell>
      <AnalyticsContent />
    </AppShell>
  )
}
