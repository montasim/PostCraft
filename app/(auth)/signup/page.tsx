import type { Metadata } from "next"
import { Suspense } from "react"
import { SignupForm } from "@/components/features/auth"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Start Creating",
  description:
    "Create your free PostCraft account. Generate social media posts ranked by engagement score — 3 AI-written variants tailored to your brand.",
}

export default function SignupPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-md" />}>
      <SignupForm />
    </Suspense>
  )
}
