import { historyRepository, type HistoryListFilters } from "./history.repository"
import { generationService } from "@/modules/generation/generation.service"
import { variantService } from "@/modules/variant/variant.service"
import { variantRepository } from "@/modules/variant/variant.repository"
import { generationRepository } from "@/modules/generation/generation.repository"
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

function mapEntry(generation: {
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
    id: typeof generation._id === "string" ? generation._id : generation._id.toString(),
    topic: generation.topic,
    audience: generation.audiences,
    tones: generation.tones,
    language: generation.languages,
    includeEmoji: generation.includeEmoji,
    createdAt:
      generation.createdAt instanceof Date
        ? generation.createdAt.toISOString()
        : String(generation.createdAt),
    status: "published",
    variants: generation.variants.map(mapVariant),
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
    const generationId = topVariant.trendId.toString()

    const generation = await generationRepository.findById(generationId, workspaceId)
    const variants = await variantService.getVariantsByTrend(
      generationId,
      workspaceId
    )

    return {
      id: generation._id.toString(),
      topic: generation.topic,
      audience: generation.audiences,
      tones: generation.tones,
      language: generation.languages,
      includeEmoji: generation.includeEmoji,
      createdAt: generation.createdAt.toISOString(),
      status: "published",
      variants,
    }
  },

  async getEntryDetail(
    generationId: string,
    workspaceId: string
  ): Promise<HistoryEntry & { guardrails: GuardrailDetail[] }> {
    const generation = await generationService.getGenerationStatus(generationId, workspaceId)
    const variants = await variantService.getVariantsByTrend(
      generationId,
      workspaceId
    )

    // Fetch guardrails that were active when this generation was created
    let guardrails: GuardrailDetail[] = []
    if (generation.guardrailIds && generation.guardrailIds.length > 0) {
      const allGuardrails = await guardrailRepository.findAllByWorkspace(workspaceId)
      const idSet = new Set(generation.guardrailIds)
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
      id: generation.id,
      topic: generation.topic,
      audience: generation.audiences,
      tones: generation.tones,
      language: generation.languages,
      includeEmoji: generation.includeEmoji,
      createdAt:
        generation.createdAt instanceof Date
          ? generation.createdAt.toISOString()
          : String(generation.createdAt),
      status: "published",
      variants,
      guardrails,
    }
  },
}
