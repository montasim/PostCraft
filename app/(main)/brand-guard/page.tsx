import type { Metadata } from "next"
import { BrandGuardContent } from "@/components/features/brand-guard"

export const metadata: Metadata = {
  title: "Brand Guard",
  description:
    "Protect your voice across every post. Set tone rules, format requirements, and banned words so your content stays consistent and on-point.",
}

export default function BrandGuardPage() {
  return <BrandGuardContent />
}
