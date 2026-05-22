"use client"

import { Card } from "@/components/ui/card"
import { IconFileText, IconCalendar, IconTrophy, IconChartBar } from "@tabler/icons-react"

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  subtitle?: string
}

const COLOR_MAP: Record<string, { text: string; bg: string }> = {
  "chart-1": { text: "text-chart-1", bg: "bg-chart-1/15" },
  "chart-2": { text: "text-chart-2", bg: "bg-chart-2/15" },
  "chart-3": { text: "text-chart-3", bg: "bg-chart-3/15" },
  "chart-5": { text: "text-chart-5", bg: "bg-chart-5/15" },
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const c = COLOR_MAP[color] ?? COLOR_MAP["chart-1"]

  return (
    <Card className="flex items-center gap-3 p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}
      >
        <Icon className={`h-5 w-5 ${c.text}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  )
}

interface HistoryStatsProps {
  stats: {
    totalCount: number
    thisWeekCount: number
    bestScore: number
    avgScore: number
  }
}

function HistoryStats({ stats }: HistoryStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Total posts"
        value={stats.totalCount}
        icon={IconFileText}
        color="chart-1"
      />
      <StatCard
        label="This week"
        value={stats.thisWeekCount}
        icon={IconCalendar}
        color="chart-2"
      />
      <StatCard
        label="Best score"
        value={stats.bestScore}
        icon={IconTrophy}
        color="chart-3"
      />
      <StatCard
        label="Avg score"
        value={stats.avgScore}
        icon={IconChartBar}
        color="chart-5"
      />
    </div>
  )
}

export { HistoryStats }
