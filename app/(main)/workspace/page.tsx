import type { Metadata } from "next"
import { WorkspaceContent } from "@/components/features/workspace"

export const metadata: Metadata = {
  title: "Brand Voice",
  description:
    "Define who you write for and how you sound. Set target audiences, preferred tones, and content language — all in one place.",
}

export default function WorkspacePage() {
  return <WorkspaceContent />
}
