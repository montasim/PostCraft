import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Enter your email to receive a password reset link for your PostCraft account.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
