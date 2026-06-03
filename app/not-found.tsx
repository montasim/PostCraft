import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconHome, IconSparkles } from "@tabler/icons-react"

export default function NotFound() {
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

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 border shadow-sm">
            <span className="text-4xl font-black text-muted-foreground">404</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
          </p>
        </div>
        <div className="mt-2">
          <Button size="sm" className="gap-2 px-6 bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]" asChild>
            <Link href="/">
              <IconHome className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </main>

      <footer className="border-t py-6 text-center bg-card/50">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PostCraft. All rights reserved.</p>
      </footer>
    </div>
  )
}
