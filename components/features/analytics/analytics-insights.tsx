"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ANALYTICS_OVERVIEW, STYLE_PERFORMANCE } from "@/lib/constants"
import { IconCrown, IconTarget, IconTrophy } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

function AnalyticsInsights() {
  const bestStyle = STYLE_PERFORMANCE.reduce((best, s) =>
    s.avgScore > best.avgScore ? s : best
  )
  const goalPercent = Math.round(
    (ANALYTICS_OVERVIEW.monthlyGoalProgress / ANALYTICS_OVERVIEW.monthlyGoal) * 100
  )

  const insights = [
    {
      icon: IconCrown,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      title: "Creator ranking",
      description: `You're in the top ${ANALYTICS_OVERVIEW.topPercentile}% of creators`,
    },
    {
      icon: IconTrophy,
      iconBg: "bg-chart-2/10",
      iconColor: "text-chart-2",
      title: "Best performing style",
      description: `${bestStyle.style} — avg score ${bestStyle.avgScore} across ${bestStyle.count} posts`,
    },
    {
      icon: IconTarget,
      iconBg: "bg-chart-3/10",
      iconColor: "text-chart-3",
      title: "Monthly goal",
      description: `${ANALYTICS_OVERVIEW.monthlyGoalProgress}/${ANALYTICS_OVERVIEW.monthlyGoal} posts`,
      progress: goalPercent,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {insights.map((insight) => {
        const Icon = insight.icon
        return (
          <Card key={insight.title}>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center gap-2.5">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", insight.iconBg)}>
                  <Icon className={cn("h-4 w-4", insight.iconColor)} />
                </div>
                <p className="text-sm font-semibold">{insight.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {insight.description}
              </p>
              {"progress" in insight && insight.progress !== undefined && (
                <Progress value={insight.progress} className="h-1.5" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export { AnalyticsInsights }
