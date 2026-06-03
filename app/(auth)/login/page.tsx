import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginForm } from "@/components/features/auth"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Welcome back. Sign in to your PostCraft account and start creating LinkedIn posts that get engagement.",
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-md" />}>
      <LoginForm />
    </Suspense>
  )
}
