import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { SettingsContent } from "@/components/features/settings"

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage notifications, security, and account preferences.",
}

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  )
}
