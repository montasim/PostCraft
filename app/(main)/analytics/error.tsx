"use client"

import { PageError } from "@/components/shared"

export default function AnalyticsError({
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
