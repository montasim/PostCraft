import type { Metadata } from "next"
import { DashboardClient } from "@/components/features/generate/dashboard-client"

export const metadata: Metadata = {
  title: "Write Social Posts That Get Engagement",
  description:
    "Generate 3 AI-written social media post variants ranked by engagement score. Tailored to your brand voice, scored for clarity and readability.",
}

export default function DashboardPage() {
  return <DashboardClient />
}
