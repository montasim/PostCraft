"use client"

import { AnalyticsHeader } from "@/components/features/analytics/analytics-header"
import { AnalyticsOverviewCards } from "@/components/features/analytics/analytics-overview-cards"
import { AnalyticsTrendChart } from "@/components/features/analytics/analytics-trend-chart"
import { AnalyticsScoreDistribution } from "@/components/features/analytics/analytics-score-distribution"
import { AnalyticsStyleBreakdown } from "@/components/features/analytics/analytics-style-breakdown"
import { AnalyticsTopPosts } from "@/components/features/analytics/analytics-top-posts"

function AnalyticsContent() {
  return (
    <div className="space-y-5">
      <AnalyticsOverviewCards />
      <AnalyticsHeader />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AnalyticsTrendChart />
        <AnalyticsScoreDistribution />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AnalyticsStyleBreakdown />
        <AnalyticsTopPosts />
      </div>
    </div>
  )
}

export { AnalyticsContent }
