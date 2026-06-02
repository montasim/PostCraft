"use client"

import { Button } from "@/components/ui/button"
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react"

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
      <Button size="sm" className="gap-1.5" onClick={reset}>
        <IconRefresh className="h-3.5 w-3.5" />
        Retry
      </Button>
    </div>
  )
}

export { PageError }
