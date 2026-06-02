import type { Metadata } from "next"
import { InsightsContent } from "@/components/features/insights"

export const metadata: Metadata = {
  title: "Post Insights & Engagement Scores",
  description:
    "Track what works and double down. Engagement scores, style breakdowns, and trend analysis — all in one place.",
}

export default function InsightsPage() {
  return <InsightsContent />
}
