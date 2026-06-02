"use client"

import { Button } from "@/components/ui/button"
import { IconAlertTriangle, IconHome, IconRefresh } from "@tabler/icons-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-10">
          <p className="text-7xl font-bold text-muted-foreground/30">500</p>
          <IconAlertTriangle className="h-10 w-10 text-destructive" />
          <div className="space-y-1 text-center">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred. Our team has been notified.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={reset}
            >
              <IconRefresh className="h-3.5 w-3.5" />
              Try again
            </Button>
            <Button size="sm" asChild>
              <Link href="/">
                <IconHome className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
