"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LibrarySidebar } from "@/components/features/library/library-sidebar"
import { LibraryDetail } from "@/components/features/library/library-detail"
import { EmptyState, HighTrafficAlert } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { IconArrowLeft } from "@tabler/icons-react"
import { QuotaAlert } from "@/components/shared/quota-alert"
import { API } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { LibraryEntry } from "@/types"

function LibraryContent() {
  const [entries, setEntries] = useState<LibraryEntry[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detailEntry, setDetailEntry] = useState<LibraryEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Fetch sidebar entries on mount
  useEffect(() => {
    fetch(API.LIBRARY + "?limit=100")
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setEntries(result.data.entries)
          if (result.data.entries.length > 0) {
            setSelectedId(result.data.entries[0].id)
          }
        }
      })
      .catch(() => toast.error("Failed to load library"))
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

      if (!cancelled) setDetailLoading(true)
      try {
        const res = await fetch(`${API.LIBRARY}/${selectedId}`, { cache: "no-store" })
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
    return () => {
      cancelled = true
    }
  }, [selectedId, entries])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleBack = () => {
    setSelectedId(null)
  }

  if (loading) {
    return (
      <div className="-m-4 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden lg:flex-row">
        <div className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
          <div className="p-4">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4 pt-0">
            {["Today", "Yesterday", "Previous 7 days"].map((group) => (
              <div key={group}>
                <Skeleton className="mb-2 h-3 w-16" />
                <div className="space-y-1">
                  {Array.from({ length: group === "Today" ? 3 : 2 }).map(
                    (_, i) => (
                      <div key={i} className="rounded-lg p-2.5">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-2 w-2 rounded-full" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <Skeleton className="h-3 w-20" />
                          <div className="flex items-center gap-1.5">
                            <Skeleton className="h-3 w-10" />
                            <Skeleton className="h-4 w-12 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 rounded-xl border p-4">
                <Skeleton className="mb-4 h-4 w-24" />
                <Skeleton className="mb-2 h-3 w-10" />
                <Skeleton className="mb-4 h-20 w-full rounded-lg" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-1.5">
                      <Skeleton className="h-3 w-14" />
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden w-80 shrink-0 lg:block">
                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-4 h-4 w-24" />
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mobile: show list or detail based on selection
  const showDetail = selectedId && !isDesktop
  const showList = !showDetail

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden lg:flex-row">
      {/* Sidebar / List */}
      <div
        className={cn(
          "shrink-0 border-r border-sidebar-border bg-sidebar",
          showDetail ? "hidden" : "flex w-full flex-col p-4",
          "lg:flex lg:w-72 lg:overflow-y-auto"
        )}
      >
        <LibrarySidebar
          entries={entries}
          selectedId={selectedId ?? ""}
          onSelect={handleSelect}
        />
      </div>

      {/* Detail */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          showList && !isDesktop ? "hidden" : "block p-4"
        )}
      >
        <HighTrafficAlert />
        <QuotaAlert />
        {detailLoading ? (
          <div className="space-y-4">
            {/* Header: Badges & Action Buttons */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex gap-1.5">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-7 w-32 rounded-md" />
                <Skeleton className="h-7 w-40 rounded-md" />
              </div>
            </div>

            {/* Carousel Area */}
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-[90%] shrink-0 md:w-[400px] lg:w-[410px]">
                  <div className="rounded-xl border bg-card p-4 space-y-4">
                    {/* Header info */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-8 rounded-full" />
                        <Skeleton className="h-5 w-8 rounded-full" />
                      </div>
                    </div>
                    {/* Content body */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-11/12" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    {/* Tags */}
                    <div className="flex gap-2 pt-4 mt-4 border-t">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : detailEntry ? (
          <LibraryDetail entry={detailEntry} />
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

export { LibraryContent }
