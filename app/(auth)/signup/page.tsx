import type { Metadata } from "next"
import { SignupForm } from "@/components/features/auth"

export const metadata: Metadata = {
  title: "Start Creating",
  description:
    "Create your free PostCraft account. Generate LinkedIn posts ranked by engagement score — 3 AI-written variants tailored to your brand.",
}

export default function SignupPage() {
  return <SignupForm />
}
