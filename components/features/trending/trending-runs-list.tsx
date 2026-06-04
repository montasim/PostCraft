"use client"

import { TrendingRunGroup } from "./trending-run-group"
import type {
  ITrendingRun,
  TrendingGenerationPreview,
} from "@/modules/trending/trending.types"

interface TrendingRunsListProps {
  runs: ITrendingRun[]
  generations: TrendingGenerationPreview[]
}

function groupRunsByDate(runs: ITrendingRun[]): Map<string, ITrendingRun[]> {
  const groups = new Map<string, ITrendingRun[]>()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)

  const sorted = [...runs].sort((a, b) => b.ranAt.getTime() - a.ranAt.getTime())

  for (const run of sorted) {
    const runDate = new Date(
      run.ranAt.getFullYear(),
      run.ranAt.getMonth(),
      run.ranAt.getDate()
    )
    let label: string

    if (runDate.getTime() === today.getTime()) {
      label = "Today"
    } else if (runDate.getTime() === yesterday.getTime()) {
      label = "Yesterday"
    } else {
      label = run.ranAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    }

    const existing = groups.get(label) ?? []
    existing.push(run)
    groups.set(label, existing)
  }

  return groups
}

function TrendingRunsList({ runs, generations }: TrendingRunsListProps) {
  const groups = groupRunsByDate(runs)
  const entries = Array.from(groups.entries())
  const latestRunId =
    runs.length > 0
      ? [...runs].sort((a, b) => b.ranAt.getTime() - a.ranAt.getTime())[0]._id
      : null

  return (
    <div className="space-y-4">
      {entries.map(([dateLabel, groupRuns], index) => (
        <TrendingRunGroup
          key={dateLabel}
          dateLabel={dateLabel}
          runs={groupRuns}
          generations={generations}
          defaultExpanded={index === 0}
        />
      ))}
    </div>
  )
}

export { TrendingRunsList }
