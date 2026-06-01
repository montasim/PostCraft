import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { findRunsByWorkspace, countUndismissedRuns } from "@/modules/trending/trending.repository"
import { GenerationModel } from "@/modules/generation/generation.model"
import { VariantModel } from "@/modules/variant/variant.model"
import type { ITrendingRunDoc } from "@/modules/trending/trending.model"
import type { VariantPreview, TrendingGenerationPreview, TrendingPlatform } from "@/modules/trending/trending.types"

function mapVariantToPreview(v: any): VariantPreview {
  return {
    _id: v._id.toString(),
    styleType: v.styleType ?? "",
    language: v.language ?? "en",
    hook: v.hook ?? "",
    body: v.body ?? "",
    cta: v.cta ?? "",
    hashtags: v.hashtags ?? [],
    score: v.overallScore ?? 0,
    engagement: v.engagementScore ?? 0,
    clarity: v.clarityScore ?? 0,
    formatting: v.formattingScore ?? 0,
    overallScore: v.overallScore ?? 0,
    overallRank: v.overallRank ?? 1,
    judgeReasoning: v.judgeReasoning ?? "",
  }
}

export async function GET() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const runs = await findRunsByWorkspace(workspaceId, 50)

    const generationMeta = new Map<string, { run: ITrendingRunDoc; index: number }>()
    for (const run of runs) {
      run.generationIds.forEach((genId, i) => {
        generationMeta.set(genId, { run, index: i })
      })
    }

    const allGenIds = [...generationMeta.keys()]
    let generationDocs: any[] = []
    let variantDocs: any[] = []

    if (allGenIds.length > 0) {
      generationDocs = await GenerationModel.find({ _id: { $in: allGenIds } }).lean()
      variantDocs = await VariantModel.find({
        trendId: { $in: allGenIds },
        overallRank: 1,
      }).lean()
    }

    const variantByGenId = new Map(variantDocs.map((v) => [v.trendId.toString(), v]))

    const generations: TrendingGenerationPreview[] = generationDocs.map((gen) => {
      const meta = generationMeta.get(gen._id.toString())!
      const rawSourceItem = meta.run.sourceItems[meta.index] ?? {
        source: "hackernews",
        title: gen.topic,
        url: "",
        score: 0,
        rank: 0,
      }
      const variant = variantByGenId.get(gen._id.toString()) ?? null

      return {
        generationId: gen._id.toString(),
        runId: meta.run._id.toString(),
        sourceItem: {
          source: rawSourceItem.source as TrendingPlatform,
          title: rawSourceItem.title,
          url: rawSourceItem.url,
          score: rawSourceItem.score,
          rank: rawSourceItem.rank,
        },
        topic: gen.topic,
        status: gen.status,
        topVariant: variant ? mapVariantToPreview(variant) : null,
      }
    })

    const unreadCount = await countUndismissedRuns(workspaceId)

    return NextResponse.json({
      success: true,
      data: { runs, generations, unreadCount },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
