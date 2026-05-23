"use client"

import { useState, useEffect } from "react"
import { HistorySidebar } from "@/components/features/history/history-sidebar"
import { HistoryDetail } from "@/components/features/history/history-detail"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { HistoryEntry } from "@/types"

function HistoryContent() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detailEntry, setDetailEntry] = useState<HistoryEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  // Fetch sidebar entries on mount
  useEffect(() => {
    fetch("/api/history?limit=100")
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setEntries(result.data.entries)
          if (result.data.entries.length > 0) {
            setSelectedId(result.data.entries[0].id)
          }
        }
      })
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false))
  }, [])

  // Fetch detail when selection changes
  useEffect(() => {
    if (!selectedId) {
      setDetailEntry(null)
      return
    }

    // Check if entry is already in the list with variants
    const existing = entries.find((e) => e.id === selectedId)
    if (existing && existing.variants.length > 0) {
      setDetailEntry(existing)
      return
    }

    setDetailLoading(true)
    fetch(`/api/history/${selectedId}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setDetailEntry(result.data)
      })
      .catch(() => toast.error("Failed to load entry"))
      .finally(() => setDetailLoading(false))
  }, [selectedId, entries])

  if (loading) {
    return (
      <div className="-m-5 flex h-[calc(100vh-3.5rem)]">
        <aside className="flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-5">
          <Skeleton className="mb-4 h-9 w-full" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="mb-2 h-14 w-full rounded-lg" />
          ))}
        </aside>
        <div className="flex-1 p-5">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="-m-5 flex h-[calc(100vh-3.5rem)]">
      <HistorySidebar
        entries={entries}
        selectedId={selectedId ?? ""}
        onSelect={setSelectedId}
      />
      <div className="flex-1 overflow-y-auto p-5">
        {detailLoading ? (
          <div className="space-y-5">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ) : (
          detailEntry && <HistoryDetail entry={detailEntry} />
        )}
      </div>
    </div>
  )
}

export { HistoryContent }
