"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ANALYTICS_OVERVIEW, STYLE_PERFORMANCE } from "@/lib/constants"
import { IconCrown, IconFlame, IconTarget, IconTrendingUp, IconTrophy } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

function AnalyticsOverviewCards() {
  const bestStyle = STYLE_PERFORMANCE.reduce((best, s) =>
    s.avgScore > best.avgScore ? s : best
  )
  const goalPercent = Math.round(
    (ANALYTICS_OVERVIEW.monthlyGoalProgress / ANALYTICS_OVERVIEW.monthlyGoal) * 100
  )

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 xl:grid-cols-7">
      {/* Metric cards */}
      <MetricCard
        label="Avg Score"
        value={ANALYTICS_OVERVIEW.avgScore}
        icon={IconTrophy}
        color="text-chart-5"
        bg="bg-chart-5/10"
        change={ANALYTICS_OVERVIEW.weeklyChange}
      />
      <MetricCard
        label="Engagement"
        value={ANALYTICS_OVERVIEW.avgEngagement}
        icon={IconTrendingUp}
        color="text-chart-2"
        bg="bg-chart-2/10"
        change={ANALYTICS_OVERVIEW.weeklyChange - 2}
      />
      <MetricCard
        label="Success Rate"
        value={`${ANALYTICS_OVERVIEW.successRate}%`}
        icon={IconTarget}
        color="text-chart-1"
        bg="bg-chart-1/10"
        change={3}
      />
      <MetricCard
        label="Streak"
        value={`${ANALYTICS_OVERVIEW.streakDays}d`}
        icon={IconFlame}
        color="text-chart-3"
        bg="bg-chart-3/10"
      />

      {/* Insight cards */}
      <Card>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <IconCrown className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-[10px] font-semibold text-muted-foreground">Creator ranking</p>
          </div>
          <p className="text-xs">Top <span className="text-lg font-bold text-primary">{ANALYTICS_OVERVIEW.topPercentile}%</span></p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
              <IconTrophy className="h-3.5 w-3.5 text-chart-2" />
            </div>
            <p className="text-[10px] font-semibold text-muted-foreground">Best style</p>
          </div>
          <p className="text-xs">
            <span className="font-bold">{bestStyle.style}</span>
            <span className="text-muted-foreground"> · S:{bestStyle.avgScore}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
              <IconTarget className="h-3.5 w-3.5 text-chart-3" />
            </div>
            <p className="text-[10px] font-semibold text-muted-foreground">Monthly goal</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs">
              <span className="font-bold">{ANALYTICS_OVERVIEW.monthlyGoalProgress}</span>
              <span className="text-muted-foreground">/{ANALYTICS_OVERVIEW.monthlyGoal} posts</span>
            </p>
            <Progress value={goalPercent} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
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
      <CardContent className="flex items-center gap-3 p-4">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", bg)}>
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
                {change >= 0 ? "+" : ""}{change}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AnalyticsOverviewCards }
