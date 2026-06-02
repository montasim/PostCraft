"use client"

import { PageError } from "@/components/shared"

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError title="Settings failed to load" error={error} reset={reset} />
}
