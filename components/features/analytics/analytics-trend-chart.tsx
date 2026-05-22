"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IconTrendingUp } from "@tabler/icons-react"
import type { TrendDataPoint } from "@/types"

function AnalyticsTrendChart({ data }: { data: TrendDataPoint[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <IconTrendingUp className="h-4 w-4 text-primary" />
            Score & Engagement Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            No trend data yet. Generate content to see trends.
          </p>
        </CardContent>
      </Card>
    )
  }
  const maxVal = 100
  const chartW = 500
  const chartH = 200
  const padX = 40
  const padY = 20
  const plotW = chartW - padX * 2
  const plotH = chartH - padY * 2

  const toX = (i: number) => padX + (i / (data.length - 1)) * plotW
  const toY = (v: number) => padY + plotH - (v / maxVal) * plotH

  const scorePoints = data.map((d, i) => `${toX(i)},${toY(d.score)}`).join(" ")
  const engagementPoints = data.map((d, i) => `${toX(i)},${toY(d.engagement)}`).join(" ")

  const yTicks = [0, 25, 50, 75, 100]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconTrendingUp className="h-4 w-4 text-primary" />
          Score & Engagement Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            className="h-48 w-full"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={padX}
                  y1={toY(tick)}
                  x2={chartW - padX}
                  y2={toY(tick)}
                  stroke="currentColor"
                  strokeOpacity={0.08}
                />
                <text
                  x={padX - 8}
                  y={toY(tick) + 3}
                  textAnchor="end"
                  className="fill-muted-foreground text-[8px]"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Score line */}
            <polyline
              points={scorePoints}
              fill="none"
              stroke="var(--chart-5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Engagement line */}
            <polyline
              points={engagementPoints}
              fill="none"
              stroke="var(--chart-2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 3"
            />

            {/* Data points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle cx={toX(i)} cy={toY(d.score)} r="3" fill="var(--chart-5)" />
                <circle cx={toX(i)} cy={toY(d.engagement)} r="2.5" fill="var(--chart-2)" />
              </g>
            ))}
          </svg>

          {/* X-axis labels (show every 3rd) */}
          <div className="mt-1 flex justify-between px-10">
            {data.map((d, i) => (
              <span
                key={i}
                className="text-[8px] text-muted-foreground"
                style={{ display: i % 3 === 0 || i === data.length - 1 ? "inline" : "none" }}
              >
                {d.date}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-chart-5" />
            <span className="text-[10px] text-muted-foreground">Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded border-b border-dashed border-chart-2" />
            <span className="text-[10px] text-muted-foreground">Engagement</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { AnalyticsTrendChart }
