"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { STYLE_PERFORMANCE } from "@/lib/constants"
import { IconPalette } from "@tabler/icons-react"

function AnalyticsStyleBreakdown() {
  const sorted = [...STYLE_PERFORMANCE].sort((a, b) => b.avgScore - a.avgScore)
  const maxScore = 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconPalette className="h-4 w-4 text-primary" />
          Style Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sorted.map((item) => (
          <div key={item.style} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.style}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {item.count} posts
                </Badge>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>
                  Score: <span className="font-semibold text-foreground">{item.avgScore}</span>
                </span>
                <span>
                  Eng: <span className="font-semibold text-foreground">{item.avgEngagement}</span>
                </span>
              </div>
            </div>
            <div className="flex gap-1.5">
              {/* Score bar */}
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-chart-5"
                  style={{ width: `${(item.avgScore / maxScore) * 100}%` }}
                />
              </div>
              {/* Engagement bar */}
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-chart-2"
                  style={{ width: `${(item.avgEngagement / maxScore) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-full bg-chart-5" />
            <span className="text-[10px] text-muted-foreground">Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-full bg-chart-2" />
            <span className="text-[10px] text-muted-foreground">Engagement</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AnalyticsStyleBreakdown }
