"use client"

import { AppShell } from "@/components/layout"
import { TrendingShell } from "@/components/features/trending/trending-shell"

export default function TrendingPage() {
  return (
    <AppShell>
      <TrendingShell />
    </AppShell>
  )
}
