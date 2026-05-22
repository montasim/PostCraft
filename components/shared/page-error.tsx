"use client"

import { Button } from "@/components/ui/button"
import { IconAlertTriangle } from "@tabler/icons-react"

function PageError({
  title = "Something went wrong",
  error,
  reset,
}: {
  title?: string
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10">
      <IconAlertTriangle className="h-10 w-10 text-destructive" />
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{error.message}</p>
      <Button size="sm" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

export { PageError }
