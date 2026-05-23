import { VariantModel } from "@/modules/variant/variant.model"
import { GenerationModel } from "@/modules/generation/generation.model"

export interface HistoryListFilters {
  search?: string
  styles?: string[]
  languages?: string[]
  scoreRange?: { min: number; max: number }
  sort?: "newest" | "oldest" | "highest-score" | "most-engaging"
  page?: number
  limit?: number
}

export interface HistoryListResult {
  entries: GenerationWithVariants[]
  total: number
  hasMore: boolean
}

export interface GenerationWithVariants {
  _id: string
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  status: string
  createdAt: Date
  variants: VariantDoc[]
  bestScore: number
  bestEngagement: number
}

interface VariantDoc {
  styleType: string
  language: string
  overallScore: number
  overallRank: number
  engagementScore: number
  clarityScore: number
  formattingScore: number
  hook: string
  body: string
  cta: string
  hashtags: string[]
  judgeReasoning: string
}

type SortMap = Record<string, Record<string, 1 | -1>>

const SORT_MAP: SortMap = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  "highest-score": { bestScore: -1 },
  "most-engaging": { bestEngagement: -1 },
}

export const historyRepository = {
  async listHistoryEntries(
    workspaceId: string,
    filters: HistoryListFilters = {}
  ): Promise<HistoryListResult> {
    const {
      search,
      styles,
      languages,
      scoreRange,
      sort = "newest",
      page = 1,
      limit = 6,
    } = filters

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeline: any[] = []

    // Base match: completed generations only
    pipeline.push({ $match: { workspaceId, status: "completed" } })

    // Lookup variants
    pipeline.push({
      $lookup: {
        from: "variants",
        localField: "_id",
        foreignField: "trendId",
        as: "variants",
      },
    })

    // Computed fields from variants
    pipeline.push({
      $addFields: {
        bestScore: { $max: "$variants.overallScore" },
        bestEngagement: { $max: "$variants.engagementScore" },
      },
    })

    // Post-lookup filters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postFilters: any[] = []
    if (search) {
      postFilters.push({ topic: { $regex: search, $options: "i" } })
    }
    if (styles && styles.length > 0) {
      postFilters.push({ "variants.styleType": { $in: styles } })
    }
    if (languages && languages.length > 0) {
      postFilters.push({ "variants.language": { $in: languages } })
    }
    if (scoreRange) {
      postFilters.push({
        bestScore: { $gte: scoreRange.min, $lte: scoreRange.max },
      })
    }
    if (postFilters.length > 0) {
      pipeline.push({ $match: { $and: postFilters } })
    }

    // Facet: count + paginated data
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: SORT_MAP[sort] ?? { createdAt: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
      },
    })

    const [result] = await GenerationModel.aggregate(pipeline)
    const total = result.metadata[0]?.total ?? 0
    const entries = result.data as GenerationWithVariants[]

    return {
      entries,
      total,
      hasMore: page * limit < total,
    }
  },

  async getHistoryStats(workspaceId: string) {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)

    const [generationStats, variantStats] = await Promise.all([
      GenerationModel.aggregate([
        { $match: { workspaceId, status: "completed" } },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            thisWeekCount: {
              $sum: { $cond: [{ $gte: ["$createdAt", weekAgo] }, 1, 0] },
            },
          },
        },
      ]),
      VariantModel.aggregate([
        { $match: { workspaceId } },
        {
          $group: {
            _id: null,
            bestScore: { $max: "$overallScore" },
            avgScore: { $avg: "$overallScore" },
          },
        },
      ]),
    ])

    const g = generationStats[0] ?? { totalCount: 0, thisWeekCount: 0 }
    const v = variantStats[0] ?? { bestScore: 0, avgScore: 0 }

    return {
      totalCount: g.totalCount,
      thisWeekCount: g.thisWeekCount,
      bestScore: Math.round(v.bestScore ?? 0),
      avgScore: Math.round(v.avgScore ?? 0),
    }
  },

  async getActivityHeatmap(workspaceId: string) {
    const twelveWeeksAgo = new Date()
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84)

    return GenerationModel.aggregate<{
      date: string
      count: number
    }>([
      {
        $match: {
          workspaceId,
          status: "completed",
          createdAt: { $gte: twelveWeeksAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
    ])
  },

  async getStreakDays(workspaceId: string): Promise<number> {
    const heatmap = await this.getActivityHeatmap(workspaceId)

    const activeDays = new Set(heatmap.map((d) => d.date))

    let streak = 0
    const check = new Date()
    check.setHours(0, 0, 0, 0)

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const dayStr = check.toISOString().slice(0, 10)
      if (activeDays.has(dayStr)) {
        streak++
        check.setDate(check.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  },

  async getLongestStreak(workspaceId: string): Promise<number> {
    const allTimeHeatmap = await GenerationModel.aggregate<{ date: string }>([
      { $match: { workspaceId, status: "completed" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id" } },
    ])

    if (allTimeHeatmap.length === 0) return 0

    const dates = allTimeHeatmap.map((d) => new Date(d.date + "T00:00:00Z"))
    let longest = 1
    let current = 1

    for (let i = 1; i < dates.length; i++) {
      const diff = (dates[i].getTime() - dates[i - 1].getTime()) / (1000 * 60 * 60 * 24)
      if (Math.abs(diff - 1) < 0.5) {
        current++
        longest = Math.max(longest, current)
      } else if (diff > 1) {
        current = 1
      }
    }

    return longest
  },
}
