import { analyticsRepository } from "./analytics.repository"
import type {
  AnalyticsOverview,
  ScoreDistribution,
  StylePerformance,
  TrendDataPoint,
  TopPerformingPost,
} from "@/types"

export interface AnalyticsDashboard {
  overview: AnalyticsOverview
  scoreDistribution: ScoreDistribution[]
  stylePerformance: StylePerformance[]
  trendData: TrendDataPoint[]
  topPosts: TopPerformingPost[]
}

export const analyticsService = {
  async getDashboard(workspaceId: string): Promise<AnalyticsDashboard> {
    const [overview, scoreDistribution, stylePerformance, trendData, topPosts] =
      await Promise.all([
        analyticsRepository.getOverview(workspaceId),
        analyticsRepository.getScoreDistribution(workspaceId),
        analyticsRepository.getStylePerformance(workspaceId),
        analyticsRepository.getTrendData(workspaceId),
        analyticsRepository.getTopPosts(workspaceId),
      ])

    const bestStyle = stylePerformance.length > 0 ? stylePerformance[0] : null

    return {
      overview: {
        totalPosts: overview.totalPosts,
        avgScore: overview.avgScore,
        avgEngagement: overview.avgEngagement,
        successRate: overview.successRate,
        weeklyChange: 0,
        streakDays: 0,
        consistencyScore: overview.totalPosts > 0 ? Math.min(100, Math.round((overview.completedTrends / Math.max(overview.totalTrends, 1)) * 100)) : 0,
        monthlyGoalProgress: overview.completedTrends,
        monthlyGoal: 20,
        topPercentile: bestStyle ? bestStyle.avgScore : 0,
      },
      scoreDistribution,
      stylePerformance,
      trendData,
      topPosts,
    }
  },
}
