"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  IconTarget,
  IconTrendingUp,
  IconTrophy,
  IconPalette,
  IconCalendarMonth,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { AnalyticsOverview, StylePerformance } from "@/types"

function AnalyticsOverviewCards({
  overview,
  styles,
}: {
  overview: AnalyticsOverview
  styles: StylePerformance[]
}) {
  const bestStyle =
    styles.length > 0
      ? styles.reduce((best, s) => (s.avgScore > best.avgScore ? s : best))
      : null
  const goalPercent = Math.round(
    (overview.monthlyGoalProgress / overview.monthlyGoal) * 100
  )

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
      <MetricCard
        label="Avg Score"
        value={overview.avgScore}
        icon={IconTrophy}
        color="text-chart-5"
        bg="bg-chart-5/10"
        change={overview.weeklyChange}
      />
      <MetricCard
        label="Engagement"
        value={overview.avgEngagement}
        icon={IconTrendingUp}
        color="text-chart-2"
        bg="bg-chart-2/10"
        change={overview.weeklyChange - 2}
      />
      <MetricCard
        label="Success Rate"
        value={`${overview.successRate}%`}
        icon={IconTarget}
        color="text-chart-1"
        bg="bg-chart-1/10"
        change={3}
      />

      <MetricCard
        label="Your best style"
        value={
          bestStyle ? `${bestStyle.style} · S:${bestStyle.avgScore}` : "N/A"
        }
        icon={IconPalette}
        color="text-chart-2"
        bg="bg-chart-2/10"
      />

      <MetricCard
        label="Monthly progress"
        value={`${overview.monthlyGoalProgress}/${overview.monthlyGoal}`}
        icon={IconCalendarMonth}
        color="text-chart-3"
        bg="bg-chart-3/10"
        change={goalPercent}
      />
    </div>
  )
}

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
  change,
}: {
  label: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  change?: number | null
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3 lg:p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            bg
          )}
        >
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold">{value}</span>
            {change != null && (
              <Badge
                variant="secondary"
                className={cn(
                  "text-[9px] font-semibold",
                  change >= 0
                    ? "bg-chart-2/15 text-chart-2"
                    : "bg-chart-4/15 text-chart-4"
                )}
              >
                {change >= 0 ? "+" : ""}
                {change}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AnalyticsOverviewCards }
