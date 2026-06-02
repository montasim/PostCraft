"use client"

import { PageError } from "@/components/shared"

export default function HistoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError title="Library failed to load" error={error} reset={reset} />
  )
}
