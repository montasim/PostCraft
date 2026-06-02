"use client"

import { PageError } from "@/components/shared"

export default function InsightsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError title="Insights failed to load" error={error} reset={reset} />
  )
}
