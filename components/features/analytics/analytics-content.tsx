"use client"

import { useState, useEffect } from "react"
import { AnalyticsHeader } from "@/components/features/analytics/analytics-header"
import { AnalyticsOverviewCards } from "@/components/features/analytics/analytics-overview-cards"
import { AnalyticsTrendChart } from "@/components/features/analytics/analytics-trend-chart"
import { AnalyticsScoreDistribution } from "@/components/features/analytics/analytics-score-distribution"
import { AnalyticsStyleBreakdown } from "@/components/features/analytics/analytics-style-breakdown"
import { AnalyticsTopPosts } from "@/components/features/analytics/analytics-top-posts"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { AnalyticsOverview, ScoreDistribution, StylePerformance, TrendDataPoint, TopPerformingPost } from "@/types"

interface AnalyticsData {
  overview: AnalyticsOverview
  scoreDistribution: ScoreDistribution[]
  stylePerformance: StylePerformance[]
  trendData: TrendDataPoint[]
  topPosts: TopPerformingPost[]
}

const EMPTY_DATA: AnalyticsData = {
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

function AnalyticsContent() {
  const [data, setData] = useState<AnalyticsData>(EMPTY_DATA)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics")
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } catch {
        toast.error("Failed to load analytics")
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AnalyticsOverviewCards overview={data.overview} styles={data.stylePerformance} />
      <AnalyticsHeader />
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2">
        <AnalyticsTrendChart data={data.trendData} />
        <AnalyticsScoreDistribution data={data.scoreDistribution} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2">
        <AnalyticsStyleBreakdown data={data.stylePerformance} />
        <AnalyticsTopPosts posts={data.topPosts} />
      </div>
    </div>
  )
}

export { AnalyticsContent }
