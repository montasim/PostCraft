"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconSearch } from "@tabler/icons-react"
import type { HistoryEntry } from "@/types"

interface HistorySidebarProps {
  entries: HistoryEntry[]
  selectedId: string
  onSelect: (id: string) => void
}

const STATUS_DOT: Record<string, string> = {
  published: "bg-chart-2",
  draft: "bg-chart-3",
  archived: "bg-muted-foreground",
}

interface DateGroup {
  label: string
  entries: HistoryEntry[]
}

function groupByDate(entries: HistoryEntry[]): DateGroup[] {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const yesterday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10)
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString().slice(0, 10)

  const groups: DateGroup[] = [
    { label: "Today", entries: [] },
    { label: "Yesterday", entries: [] },
    { label: "Previous 7 Days", entries: [] },
    { label: "Older", entries: [] },
  ]

  for (const entry of entries) {
    const date = entry.createdAt.slice(0, 10)
    if (date === today) groups[0].entries.push(entry)
    else if (date === yesterday) groups[1].entries.push(entry)
    else if (date >= weekAgo) groups[2].entries.push(entry)
    else groups[3].entries.push(entry)
  }

  return groups.filter((g) => g.entries.length > 0)
}

function HistorySidebar({ entries, selectedId, onSelect }: HistorySidebarProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return entries
    const q = search.toLowerCase()
    return entries.filter((e) => e.topic.toLowerCase().includes(q))
  }, [entries, search])

  const groups = useMemo(() => groupByDate(filtered), [filtered])

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="px-4 py-4">
        <div className="relative">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 bg-background/50 pl-8 text-xs"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-2">
        {groups.map((group) => (
          <div key={group.label} className="mb-3">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            {group.entries.map((entry) => {
              const bestScore = Math.max(...entry.variants.map((v) => v.score))
              const isSelected = entry.id === selectedId

              return (
                <button
                  key={entry.id}
                  onClick={() => onSelect(entry.id)}
                  className={cn(
                    "w-full rounded-lg px-2.5 py-2 text-left transition",
                    isSelected
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-1 h-2 w-2 shrink-0 rounded-full",
                        STATUS_DOT[entry.status]
                      )}
                    />
                    <p className="truncate text-xs font-medium leading-snug">
                      {entry.topic}
                    </p>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>S:{bestScore}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span>
                      {entry.variants.length} variant
                      {entry.variants.length !== 1 && "s"}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span>{entry.status}</span>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}

export { HistorySidebar }
