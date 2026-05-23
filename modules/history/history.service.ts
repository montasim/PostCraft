import { historyRepository, type HistoryListFilters } from "./history.repository"
import { trendService } from "@/modules/trend/trend.service"
import { variantService } from "@/modules/variant/variant.service"
import { variantRepository } from "@/modules/variant/variant.repository"
import { trendRepository } from "@/modules/trend/trend.repository"
import { guardrailRepository } from "@/modules/guardrail"
import type { HistoryEntry, Variant } from "@/types"

export interface GuardrailDetail {
  id: string
  category: "tone" | "format" | "banned" | "custom"
  rule: string
  isActive: boolean
}

function mapVariant(v: {
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
}): Variant {
  return {
    rank: v.overallRank,
    style: v.styleType,
    language: v.language,
    score: v.overallScore,
    engagement: v.engagementScore,
    clarity: v.clarityScore,
    formatting: v.formattingScore,
    hook: v.hook,
    body: v.body,
    cta: v.cta,
    hashtags: v.hashtags,
    reasoning: v.judgeReasoning,
  }
}

function mapEntry(trend: {
  _id: string | { toString(): string }
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  createdAt: Date | string
  variants: Array<{
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
  }>
}): HistoryEntry {
  return {
    id: typeof trend._id === "string" ? trend._id : trend._id.toString(),
    topic: trend.topic,
    audience: trend.audiences,
    tones: trend.tones,
    language: trend.languages,
    includeEmoji: trend.includeEmoji,
    createdAt:
      trend.createdAt instanceof Date
        ? trend.createdAt.toISOString()
        : String(trend.createdAt),
    status: "published",
    variants: trend.variants.map(mapVariant),
  }
}

export const historyService = {
  async listEntries(workspaceId: string, filters: HistoryListFilters) {
    const result = await historyRepository.listHistoryEntries(
      workspaceId,
      filters
    )

    return {
      entries: result.entries.map(mapEntry),
      total: result.total,
      hasMore: result.hasMore,
    }
  },

  async getStats(workspaceId: string) {
    return historyRepository.getHistoryStats(workspaceId)
  },

  async getHeatmapData(workspaceId: string) {
    return historyRepository.getActivityHeatmap(workspaceId)
  },

  async getStreakDays(workspaceId: string) {
    return historyRepository.getStreakDays(workspaceId)
  },

  async getBestEntry(workspaceId: string): Promise<HistoryEntry | null> {
    const topVariants = await variantRepository.findTopByWorkspace(
      workspaceId,
      1
    )
    if (topVariants.length === 0) return null

    const topVariant = topVariants[0]
    const trendId = topVariant.trendId.toString()

    const trend = await trendRepository.findById(trendId, workspaceId)
    const variants = await variantService.getVariantsByTrend(
      trendId,
      workspaceId
    )

    return {
      id: trend._id.toString(),
      topic: trend.topic,
      audience: trend.audiences,
      tones: trend.tones,
      language: trend.languages,
      includeEmoji: trend.includeEmoji,
      createdAt: trend.createdAt.toISOString(),
      status: "published",
      variants,
    }
  },

  async getEntryDetail(
    trendId: string,
    workspaceId: string
  ): Promise<HistoryEntry & { guardrails: GuardrailDetail[] }> {
    const trend = await trendService.getTrendStatus(trendId, workspaceId)
    const variants = await variantService.getVariantsByTrend(
      trendId,
      workspaceId
    )

    // Fetch guardrails that were active when this trend was generated
    let guardrails: GuardrailDetail[] = []
    if (trend.guardrailIds && trend.guardrailIds.length > 0) {
      const allGuardrails = await guardrailRepository.findAllByWorkspace(workspaceId)
      const idSet = new Set(trend.guardrailIds)
      guardrails = allGuardrails
        .filter((g) => idSet.has(g._id.toString()))
        .map((g) => ({
          id: g._id.toString(),
          category: g.category as GuardrailDetail["category"],
          rule: g.rule,
          isActive: g.isActive,
        }))
    }

    return {
      id: trend.id,
      topic: trend.topic,
      audience: trend.audiences,
      tones: trend.tones,
      language: trend.languages,
      includeEmoji: trend.includeEmoji,
      createdAt:
        trend.createdAt instanceof Date
          ? trend.createdAt.toISOString()
          : String(trend.createdAt),
      status: "published",
      variants,
      guardrails,
    }
  },
}
