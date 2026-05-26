import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your LinkedIQ account.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
