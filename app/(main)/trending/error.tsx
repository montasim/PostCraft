"use client"

import { PageError } from "@/components/shared"

export default function TrendingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError
      title="Trending page failed to load"
      error={error}
      reset={reset}
    />
  )
}
