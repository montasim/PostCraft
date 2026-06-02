"use client"

import { PageError } from "@/components/shared"

export default function BrandGuardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError title="Brand Guard failed to load" error={error} reset={reset} />
  )
}
