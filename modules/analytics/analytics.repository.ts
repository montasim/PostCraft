import { VariantModel } from "@/modules/variant/variant.model"
import { TrendModel } from "@/modules/trend/trend.model"

export const analyticsRepository = {
  async getOverview(workspaceId: string) {
    const [variantStats, trendStats] = await Promise.all([
      VariantModel.aggregate([
        { $match: { workspaceId } },
        {
          $group: {
            _id: null,
            totalPosts: { $sum: 1 },
            avgScore: { $avg: "$overallScore" },
            avgEngagement: { $avg: "$engagementScore" },
          },
        },
      ]),
      TrendModel.aggregate([
        { $match: { workspaceId } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
          },
        },
      ]),
    ])

    const v = variantStats[0] ?? { totalPosts: 0, avgScore: 0, avgEngagement: 0 }
    const t = trendStats[0] ?? { total: 0, completed: 0 }

    return {
      totalPosts: t.completed,
      avgScore: Math.round(v.avgScore ?? 0),
      avgEngagement: Math.round(v.avgEngagement ?? 0),
      successRate: t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0,
      totalTrends: t.total,
      completedTrends: t.completed,
    }
  },

  async getScoreDistribution(workspaceId: string) {
    const ranges = [
      { label: "90-100", min: 90, max: 100 },
      { label: "80-89", min: 80, max: 89 },
      { label: "70-79", min: 70, max: 79 },
      { label: "Below 70", min: 0, max: 69 },
    ]

    const counts = await Promise.all(
      ranges.map(async (range) => {
        const count = await VariantModel.countDocuments({
          workspaceId,
          overallScore: { $gte: range.min, $lte: range.max },
        })
        return { ...range, count }
      })
    )

    const total = counts.reduce((sum, r) => sum + r.count, 0)

    return counts.map((r) => ({
      range: r.label,
      count: r.count,
      percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
    }))
  },

  async getStylePerformance(workspaceId: string) {
    return VariantModel.aggregate([
      { $match: { workspaceId } },
      {
        $group: {
          _id: "$styleType",
          avgScore: { $avg: "$overallScore" },
          avgEngagement: { $avg: "$engagementScore" },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgScore: -1 } },
      {
        $project: {
          style: "$_id",
          avgScore: { $round: ["$avgScore", 0] },
          avgEngagement: { $round: ["$avgEngagement", 0] },
          count: 1,
          _id: 0,
        },
      },
    ])
  },

  async getTrendData(workspaceId: string, days: number = 14) {
    const since = new Date()
    since.setDate(since.getDate() - days)

    return VariantModel.aggregate([
      { $match: { workspaceId, createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          score: { $avg: "$overallScore" },
          engagement: { $avg: "$engagementScore" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          score: { $round: ["$score", 0] },
          engagement: { $round: ["$engagement", 0] },
          _id: 0,
        },
      },
    ])
  },

  async getTopPosts(workspaceId: string, limit: number = 5) {
    return VariantModel.aggregate([
      { $match: { workspaceId } },
      { $sort: { overallScore: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "trends",
          localField: "trendId",
          foreignField: "_id",
          as: "trend",
        },
      },
      { $unwind: { path: "$trend", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          topic: { $ifNull: ["$trend.topic", "Unknown"] },
          score: "$overallScore",
          engagement: "$engagementScore",
          style: "$styleType",
          date: {
            $dateToString: { format: "%b %d, %Y", date: "$createdAt" },
          },
        },
      },
    ])
  },
}
