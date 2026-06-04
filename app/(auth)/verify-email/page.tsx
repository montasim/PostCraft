import type { Metadata } from "next"
import { VerifyEmailContent } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Verify your email",
  description:
    "Verify your email to start creating social media posts with PostCraft.",
}

export default function VerifyEmailPage() {
  return <VerifyEmailContent />
}
