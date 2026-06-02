import { insightsRepository } from "./insights.repository"
import { INSIGHTS_MONTHLY_GOAL } from "@/lib/constants"
import type {
  InsightsOverview,
  ScoreDistribution,
  StylePerformance,
  TrendDataPoint,
  TopPerformingPost,
} from "@/types"

export interface InsightsDashboard {
  overview: InsightsOverview
  scoreDistribution: ScoreDistribution[]
  stylePerformance: StylePerformance[]
  trendData: TrendDataPoint[]
  topPosts: TopPerformingPost[]
}

export const insightsService = {
  async getDashboard(workspaceId: string): Promise<InsightsDashboard> {
    const [overview, scoreDistribution, stylePerformance, trendData, topPosts] =
      await Promise.all([
        insightsRepository.getOverview(workspaceId),
        insightsRepository.getScoreDistribution(workspaceId),
        insightsRepository.getStylePerformance(workspaceId),
        insightsRepository.getTrendData(workspaceId),
        insightsRepository.getTopPosts(workspaceId),
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
        consistencyScore:
          overview.totalPosts > 0
            ? Math.min(
                100,
                Math.round(
                  (overview.completedGenerations /
                    Math.max(overview.totalGenerations, 1)) *
                    100
                )
              )
            : 0,
        monthlyGoalProgress: overview.completedGenerations,
        monthlyGoal: INSIGHTS_MONTHLY_GOAL,
        topPercentile: bestStyle ? bestStyle.avgScore : 0,
      },
      scoreDistribution,
      stylePerformance,
      trendData,
      topPosts,
    }
  },
}
