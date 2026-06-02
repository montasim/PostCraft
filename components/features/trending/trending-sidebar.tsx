"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/shared/date-picker"
import { IconFilterOff } from "@tabler/icons-react"
import type {
  ITrendingRun,
  TrendingPlatform,
} from "@/modules/trending/trending.types"

const PLATFORM_ABBREV: Record<TrendingPlatform, string> = {
  hackernews: "HN",
  devto: "Dev.to",
  github: "GitHub",
  reddit: "Reddit",
}

const STATUS_DOT: Record<string, string> = {
  completed: "bg-emerald-500",
  running: "bg-blue-500",
  failed: "bg-red-500",
}

interface DateGroup {
  label: string
  runs: ITrendingRun[]
}

function groupByDate(runs: ITrendingRun[]): DateGroup[] {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const yesterday = new Date(now.getTime() - 86400000)
    .toISOString()
    .slice(0, 10)
  const weekAgo = new Date(now.getTime() - 7 * 86400000)
    .toISOString()
    .slice(0, 10)

  const groups: DateGroup[] = [
    { label: "Today", runs: [] },
    { label: "Yesterday", runs: [] },
    { label: "Previous 7 Days", runs: [] },
    { label: "Older", runs: [] },
  ]

  const sorted = [...runs].sort((a, b) => b.ranAt.getTime() - a.ranAt.getTime())

  for (const run of sorted) {
    const date = run.ranAt.toISOString().slice(0, 10)
    if (date === today) groups[0].runs.push(run)
    else if (date === yesterday) groups[1].runs.push(run)
    else if (date >= weekAgo) groups[2].runs.push(run)
    else groups[3].runs.push(run)
  }

  return groups.filter((g) => g.runs.length > 0)
}

interface TrendingSidebarProps {
  runs: ITrendingRun[]
  selectedId: string
  onSelect: (id: string) => void
}

function TrendingSidebar({ runs, selectedId, onSelect }: TrendingSidebarProps) {
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()

  const filtered = useMemo(() => {
    if (!dateFrom && !dateTo) return runs
    return runs.filter((run) => {
      if (dateFrom) {
        const from = new Date(dateFrom)
        from.setHours(0, 0, 0, 0)
        if (run.ranAt < from) return false
      }
      if (dateTo) {
        const to = new Date(dateTo)
        to.setHours(23, 59, 59, 999)
        if (run.ranAt > to) return false
      }
      return true
    })
  }, [runs, dateFrom, dateTo])

  const groups = useMemo(() => groupByDate(filtered), [filtered])

  return (
    <aside className="mt-1 flex w-full shrink-0 flex-col">
      <div className="mb-4 space-y-2">
        <div className="flex gap-2">
          <DatePicker
            date={dateFrom}
            onChange={setDateFrom}
            placeholder="From"
          />
          <DatePicker date={dateTo} onChange={setDateTo} placeholder="To" />
        </div>
        {(dateFrom || dateTo) && (
          <button
            onClick={() => {
              setDateFrom(undefined)
              setDateTo(undefined)
            }}
            className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            <IconFilterOff className="h-3 w-3" />
            Clear filter
          </button>
        )}
      </div>

      <div className="-mx-1 flex-1 px-1">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.label}
            </p>
            {group.runs.map((run) => {
              const isSelected = run._id === selectedId
              const d = run.ranAt
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]
              const datetime = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
              const platforms = run.configSnapshot.platforms
                .map((p) => PLATFORM_ABBREV[p])
                .join(" + ")

              return (
                <button
                  key={run._id}
                  onClick={() => onSelect(run._id)}
                  className={cn(
                    "w-full rounded-lg px-2.5 py-2 text-left transition",
                    isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 shrink-0 rounded-full", STATUS_DOT[run.status])} />
                      <span className="text-xs font-medium">{datetime}</span>
                    </div>
                    <span className="text-xs">
                      {run.generationIds.length} posts
                    </span>
                  </div>

                  <div className="mt-1.5 flex w-full items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="text-muted-foreground/30">·</span>
                    <span>{platforms}</span>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">
            No runs found
          </p>
        )}
      </div>
    </aside>
  )
}

export { TrendingSidebar }
