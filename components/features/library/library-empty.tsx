"use client"

import { Button } from "@/components/ui/button"
import { IconInbox } from "@tabler/icons-react"
import Link from "next/link"

interface LibraryEmptyProps {
  hasFilters: boolean
}

function LibraryEmpty({ hasFilters }: LibraryEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <IconInbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold">
        {hasFilters ? "No matching posts" : "Your library is empty"}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {hasFilters
          ? "Try adjusting your filters to find what you're looking for."
          : "Every post you create lives here — ranked, searchable, ready to reuse."}
      </p>
      {!hasFilters && (
        <Button
          asChild
          className="mt-4 gap-2 bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/30"
        >
          <Link href="/">Write your first post</Link>
        </Button>
      )}
    </div>
  )
}

export { LibraryEmpty }
