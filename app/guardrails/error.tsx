"use client"

import { PageError } from "@/components/shared"

export default function GuardrailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError title="Guardrails failed to load" error={error} reset={reset} />
}
