import type { Metadata } from "next"
import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/features/auth"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your LinkedIQ account.",
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-md" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
