"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconSparkles, IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6 bg-card">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-2">
            <IconSparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-primary">PostCraft</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-sm">
            <IconAlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-[450px] rounded-md bg-muted/50 p-3 font-mono text-xs text-left overflow-x-auto border">
            {error.message || "An unexpected system error occurred."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button variant="outline" size="sm" className="gap-2 px-6" onClick={() => window.location.href = '/'}>
            <IconHome className="h-4 w-4" />
            Dashboard
          </Button>
          <Button size="sm" className="gap-2 px-6 bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]" onClick={reset}>
            <IconRefresh className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </main>

      <footer className="border-t py-6 text-center bg-card/50">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PostCraft. All rights reserved.</p>
      </footer>
    </div>
  )
}
