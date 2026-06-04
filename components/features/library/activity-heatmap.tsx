"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { LibraryEntry } from "@/types"

interface HeatmapDay {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  entries: LibraryEntry[]
  heatmapData?: HeatmapDay[]
}

function getDaysAgo(dateStr: string): number {
  const date = new Date(dateStr)
  date.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

function getIntensity(count: number): string {
  if (count === 0) return "bg-muted"
  if (count === 1) return "bg-chart-1/20"
  if (count === 2) return "bg-chart-1/40"
  return "bg-chart-1/60"
}

function ActivityHeatmap({ entries, heatmapData }: ActivityHeatmapProps) {
  const weeks = 12
  const totalDays = weeks * 7

  // Build a map of day-offset → count from server data or entries
  const dayMap = new Map<number, number>()

  if (heatmapData && heatmapData.length > 0) {
    for (const day of heatmapData) {
      const daysAgo = getDaysAgo(day.date)
      if (daysAgo >= 0 && daysAgo < totalDays) {
        dayMap.set(daysAgo, day.count)
      }
    }
  } else {
    for (const entry of entries) {
      const daysAgo = getDaysAgo(entry.createdAt)
      if (daysAgo >= 0 && daysAgo < totalDays) {
        dayMap.set(daysAgo, (dayMap.get(daysAgo) ?? 0) + 1)
      }
    }
  }

  // Build grid: columns = weeks (oldest to newest), rows = days of week
  const cells: { daysAgo: number; count: number; label: string }[] = []
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const daysAgo = w * 7 + (6 - d)
      const count = dayMap.get(daysAgo) ?? 0
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)
      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      cells.push({ daysAgo, count, label })
    }
  }

  // Check for active streak
  let streakDays = 0
  for (let i = 0; i < totalDays; i++) {
    if ((dayMap.get(i) ?? 0) > 0) {
      streakDays++
    } else {
      break
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">
          Activity (last {weeks} weeks)
        </p>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          Less
          <div className="flex gap-0.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-muted" />
            <div className="h-2.5 w-2.5 rounded-sm bg-chart-1/20" />
            <div className="h-2.5 w-2.5 rounded-sm bg-chart-1/40" />
            <div className="h-2.5 w-2.5 rounded-sm bg-chart-1/60" />
          </div>
          More
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
        {cells.map((cell) => (
          <TooltipProvider key={cell.daysAgo}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`h-3 w-3 rounded-sm ${getIntensity(cell.count)} cursor-default`}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p>
                  {cell.label}: {cell.count} post{cell.count !== 1 ? "s" : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {streakDays > 0 && (
        <p className="text-[10px] text-muted-foreground/60">
          Keep going! Don&apos;t lose your {streakDays}-day streak
        </p>
      )}
    </div>
  )
}

export { ActivityHeatmap }
