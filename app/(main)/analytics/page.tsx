import type { Metadata } from "next"
import { AnalyticsContent } from "@/components/features/analytics"

export const metadata: Metadata = {
  title: "Post Insights & Engagement Scores",
  description:
    "Track what works and double down. Engagement scores, style breakdowns, and trend analysis — all in one place.",
}

export default function AnalyticsPage() {
  return <AnalyticsContent />
}
