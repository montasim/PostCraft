import type { Metadata } from "next"
import { VerifyEmailContent } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email to start creating LinkedIn posts with LinkedIQ.",
}

export default function VerifyEmailPage() {
  return <VerifyEmailContent />
}
