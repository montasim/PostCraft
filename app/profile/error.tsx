"use client"

import { PageError } from "@/components/shared"

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError title="Profile failed to load" error={error} reset={reset} />
}
