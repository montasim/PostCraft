import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { HistoryContent } from "@/components/features/history"

export const metadata: Metadata = {
  title: "Your Content Library",
  description:
    "Browse every post you have crafted. Revisit top performers, copy proven content, and track what resonates with your audience.",
}

export default function HistoryPage() {
  return (
    <AppShell>
      <HistoryContent />
    </AppShell>
  )
}
