import type { Metadata } from "next"
import { AppShell } from "@/components/layout"
import { GuardrailsContent } from "@/components/features/guardrails"

export const metadata: Metadata = {
  title: "Brand Voice Guardrails",
  description:
    "Protect your brand voice across every post. Define tone rules, format requirements, and banned words so your content stays consistent and on-point.",
}

export default function GuardrailsPage() {
  return (
    <AppShell>
      <GuardrailsContent />
    </AppShell>
  )
}
