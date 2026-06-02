"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IconChevronDown } from "@tabler/icons-react"
import { HistoryCard } from "@/components/features/history/history-card"
import { HistoryEmpty } from "@/components/features/history/history-empty"
import type { HistoryEntry, HistoryFilterState } from "@/types"

interface HistoryGridProps {
  entries: HistoryEntry[]
  hasMore: boolean
  onLoadMore: () => void
  filters: HistoryFilterState
  totalCount: number
}

function HistoryGrid({
  entries,
  hasMore,
  onLoadMore,
  filters,
  totalCount,
}: HistoryGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (entries.length === 0) {
    const hasFilters =
      filters.search !== "" ||
      filters.styles.length > 0 ||
      filters.languages.length > 0 ||
      filters.scoreRange !== "all"

    return <HistoryEmpty hasFilters={hasFilters} />
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <HistoryCard
            key={entry.id}
            entry={entry}
            expanded={expandedId === entry.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === entry.id ? null : entry.id))
            }
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            className="gap-1.5 text-xs"
          >
            <IconChevronDown className="h-3.5 w-3.5" />
            Load more ({totalCount - entries.length} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}

export { HistoryGrid }
