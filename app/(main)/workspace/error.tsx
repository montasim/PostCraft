"use client"

import { PageError } from "@/components/shared"

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError title="Brand Voice failed to load" error={error} reset={reset} />
  )
}
