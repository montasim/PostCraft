import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { DashboardClient } from "@/components/features/generate/dashboard-client"

export const metadata: Metadata = {
  title: "Write LinkedIn Posts That Get Engagement",
  description:
    "Generate 3 AI-written LinkedIn post variants ranked by engagement score. Tailored to your brand voice, scored for clarity and readability.",
}

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardClient />
    </AppShell>
  )
}
