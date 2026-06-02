"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IconChartBar } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { ScoreDistribution } from "@/types"

const RANGE_COLORS: Record<string, string> = {
  "90-100": "bg-chart-2",
  "80-89": "bg-chart-5",
  "70-79": "bg-chart-3",
  "Below 70": "bg-chart-4",
}

function AnalyticsScoreDistribution({ data }: { data: ScoreDistribution[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconChartBar className="h-4 w-4 text-primary" />
          Score Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item) => (
          <div key={item.range} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{item.range}</span>
              <span className="text-muted-foreground">
                {item.count} posts ({item.percentage}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all", RANGE_COLORS[item.range])}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { AnalyticsScoreDistribution }
