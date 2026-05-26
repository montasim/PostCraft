import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { ProfileContent } from "@/components/features/profile"

export const metadata: Metadata = {
  title: "Your Creator Profile",
  description:
    "Build your creator identity. Track your streaks, achievements, and impact score as you publish LinkedIn content consistently.",
}

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfileContent />
    </AppShell>
  )
}
