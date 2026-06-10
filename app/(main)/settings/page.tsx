import type { Metadata } from "next"
import { SettingsContent } from "@/components/features/settings"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage notifications, security, and account preferences.",
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-64 w-full" /><Skeleton className="h-64 w-full" /></div>}>
      <SettingsContent />
    </Suspense>
  )
}
