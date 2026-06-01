"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { HistorySidebar } from "@/components/features/history/history-sidebar"
import { HistoryDetail } from "@/components/features/history/history-detail"
import { EmptyState } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { IconArrowLeft } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { HistoryEntry } from "@/types"

function HistoryContent() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detailEntry, setDetailEntry] = useState<HistoryEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

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
    let cancelled = false

    async function loadDetail() {
      if (!selectedId) {
        if (!cancelled) setDetailEntry(null)
        return
      }

      const existing = entries.find((e) => e.id === selectedId)
      if (existing && existing.variants.length > 0) {
        if (!cancelled) setDetailEntry(existing)
        return
      }

      if (!cancelled) setDetailLoading(true)
      try {
        const res = await fetch(`/api/history/${selectedId}`)
        const result = await res.json()
        if (!cancelled) {
          setDetailEntry(result.success ? result.data : null)
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load entry")
          setDetailEntry(null)
        }
      } finally {
        if (!cancelled) setDetailLoading(false)
      }
    }

    loadDetail()
    return () => { cancelled = true }
  }, [selectedId, entries])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleBack = () => {
    setSelectedId(null)
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh)] flex-col lg:flex-row lg:-mx-5 lg:-mt-5">
        <aside className="hidden w-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-5 lg:flex lg:w-72">
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

  // Mobile: show list or detail based on selection
  const showDetail = selectedId && !isDesktop
  const showList = !showDetail

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden flex-col lg:flex-row lg:-m-5">
      {/* Sidebar / List */}
      <div
        className={cn(
          "shrink-0 border-r border-sidebar-border bg-sidebar",
          showDetail ? "hidden" : "flex w-full flex-col p-4",
          "lg:flex lg:w-72 lg:overflow-y-auto"
        )}
      >
        <HistorySidebar
          entries={entries}
          selectedId={selectedId ?? ""}
          onSelect={handleSelect}
        />
      </div>

      {/* Detail */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          showList && !isDesktop ? "hidden" : "block p-5"
        )}
      >
        {!isDesktop && selectedId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mb-4 h-8 gap-1 text-xs"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to history
          </Button>
        )}

        {detailLoading ? (
          <div className="space-y-5">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ) : detailEntry ? (
          <HistoryDetail entry={detailEntry} />
        ) : (
          <EmptyState
            variant="centered"
            title="Your content library"
            description="Pick any post to revisit, copy, or share with your audience."
          />
        )}
      </div>
    </div>
  )
}

export { HistoryContent }
