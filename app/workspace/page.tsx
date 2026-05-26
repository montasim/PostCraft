import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { WorkspaceContent } from "@/components/features/workspace"

export const metadata: Metadata = {
  title: "Workspace Settings",
  description: "Configure your brand profile, target audiences, preferred tones, and content language — all in one place.",
}

export default function WorkspacePage() {
  return (
    <AppShell>
      <WorkspaceContent />
    </AppShell>
  )
}
