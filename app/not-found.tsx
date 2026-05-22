import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconHome, IconArrowLeft } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-10">
      <p className="text-7xl font-bold text-muted-foreground/30">404</p>
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="javascript:history.back()">
            <IconArrowLeft className="h-4 w-4" />
            Go back
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/">
            <IconHome className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
