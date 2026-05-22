import { AppShell } from "@/components/layout"
import { DashboardClient } from "@/components/features/generate/dashboard-client"

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardClient />
    </AppShell>
  )
}
