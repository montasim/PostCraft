"use client"

import { useState, useEffect } from "react"
import { InsightsHeader } from "@/components/features/insights/insights-header"
import { InsightsOverviewCards } from "@/components/features/insights/insights-overview-cards"
import { InsightsTrendChart } from "@/components/features/insights/insights-trend-chart"
import { InsightsScoreDistribution } from "@/components/features/insights/insights-score-distribution"
import { InsightsStyleBreakdown } from "@/components/features/insights/insights-style-breakdown"
import { InsightsTopPosts } from "@/components/features/insights/insights-top-posts"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { API } from "@/lib/constants"
import type {
  InsightsOverview,
  ScoreDistribution,
  StylePerformance,
  TrendDataPoint,
  TopPerformingPost,
} from "@/types"

interface InsightsData {
  overview: InsightsOverview
  scoreDistribution: ScoreDistribution[]
  stylePerformance: StylePerformance[]
  trendData: TrendDataPoint[]
  topPosts: TopPerformingPost[]
}

const EMPTY_DATA: InsightsData = {
  overview: {
    totalPosts: 0,
    avgScore: 0,
    avgEngagement: 0,
    successRate: 0,
    weeklyChange: 0,
    streakDays: 0,
    consistencyScore: 0,
    monthlyGoalProgress: 0,
    monthlyGoal: 20,
    topPercentile: 0,
  },
  scoreDistribution: [],
  stylePerformance: [],
  trendData: [],
  topPosts: [],
}

function InsightsContent() {
  const [data, setData] = useState<InsightsData>(EMPTY_DATA)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch(API.INSIGHTS)
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } catch {
        toast.error("Failed to load insights")
      } finally {
        setLoading(false)
      }
    }
    fetchInsights()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Overview metric cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border">
              <div className="flex items-center gap-3 p-3 lg:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-5 w-10" />
                    <Skeleton className="h-4 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Header with tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="hidden h-3 w-24 sm:block" />
            <div className="flex h-8 items-center gap-1 rounded-md bg-muted p-1">
              <Skeleton className="h-6 w-8 rounded-sm" />
              <Skeleton className="h-6 w-8 rounded-sm" />
              <Skeleton className="h-6 w-8 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                </div>
              </div>
            </div>
            <div className="relative h-48">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <Skeleton key={i} className="h-px w-full" />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-6" />
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <Skeleton className="mb-4 h-4 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <div className="rounded-xl border p-4">
            <Skeleton className="mb-4 h-4 w-28" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <Skeleton className="mb-4 h-4 w-24" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-12 rounded-full" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <InsightsOverviewCards
        overview={data.overview}
        styles={data.stylePerformance}
      />
      <InsightsHeader />
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <InsightsTrendChart data={data.trendData} />
        <InsightsScoreDistribution data={data.scoreDistribution} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <InsightsStyleBreakdown data={data.stylePerformance} />
        <InsightsTopPosts posts={data.topPosts} />
      </div>
    </div>
  )
}

export { InsightsContent }
