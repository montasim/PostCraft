import type { Metadata } from "next"
import { LoginForm } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Welcome back. Sign in to your LinkedIQ account and start creating LinkedIn posts that get engagement.",
}

export default function LoginPage() {
  return <LoginForm />
}
