import { sendEmail } from "@/core/auth/email"
import { getAuthDb } from "@/core/auth/auth-db"
import { ObjectId } from "mongodb"
import { SettingsModel } from "@/modules/settings/settings.model"
import { TrendingRun } from "./trending.model"
import { GenerationModel } from "@/modules/generation/generation.model"
import { VariantModel } from "@/modules/variant/variant.model"

interface TrendingRunInsights {
  platforms: string[]
  topicCount: number
  postsGenerated: number
  topSources: { title: string; source: string; score: number }[]
  topPostPreview: { hook: string; topic: string } | null
  runTime: Date
}

async function getInsights(runId: string): Promise<TrendingRunInsights> {
  const run = await TrendingRun.findById(runId).lean()
  if (!run) throw new Error(`Run ${runId} not found`)

  const topSources = run.sourceItems
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => ({ title: s.title, source: s.source, score: s.score }))

  let topPostPreview: TrendingRunInsights["topPostPreview"] = null
  if (run.generationIds.length > 0) {
    const topVariant = await VariantModel.findOne({
      trendId: { $in: run.generationIds },
      overallRank: 1,
    }).lean()
    if (topVariant) {
      const gen = await GenerationModel.findById(topVariant.trendId).lean()
      topPostPreview = {
        hook: topVariant.hook ?? "",
        topic: gen?.topic ?? "",
      }
    }
  }

  return {
    platforms: run.configSnapshot.platforms,
    topicCount: run.sourceItems.length,
    postsGenerated: run.generationIds.length,
    topSources,
    topPostPreview,
    runTime: run.ranAt,
  }
}

async function getUserEmail(userId: string): Promise<string | null> {
  const { db } = getAuthDb()
  const user = await db.collection("user").findOne({ _id: new ObjectId(userId) })
  return user?.email ?? null
}

function buildEmailHtml(insights: TrendingRunInsights): string {
  const sourceRows = insights.topSources
    .map(
      (s) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;">${s.title}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;text-transform:capitalize;">${s.source}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;">${s.score}</td>
        </tr>`
    )
    .join("")

  const previewBlock = insights.topPostPreview
    ? `<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #6366f1;">
        <p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Top generated post for "${insights.topPostPreview.topic}"</p>
        <p style="margin:0;font-size:14px;color:#111827;">${insights.topPostPreview.hook}</p>
      </div>`
    : ""

  return `
    <div style="max-width:560px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
      <h2 style="font-size:18px;font-weight:600;margin:0 0 4px;">Your trending posts are ready</h2>
      <p style="font-size:13px;color:#6b7280;margin:0 0 20px;">
        Scheduled trending run completed at ${insights.runTime.toLocaleString()}
      </p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 12px;background:#f3f4f6;font-size:12px;font-weight:600;border-radius:6px 0 0 6px;">Platforms</td>
          <td style="padding:8px 12px;background:#f3f4f6;font-size:13px;border-radius:0 6px 6px 0;">${insights.platforms.join(", ")}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f9fafb;font-size:12px;font-weight:600;border-radius:6px 0 0 6px;">Topics analyzed</td>
          <td style="padding:8px 12px;background:#f9fafb;font-size:13px;border-radius:0 6px 6px 0;">${insights.topicCount}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f3f4f6;font-size:12px;font-weight:600;border-radius:6px 0 0 6px;">Posts generated</td>
          <td style="padding:8px 12px;background:#f3f4f6;font-size:13px;border-radius:0 6px 6px 0;">${insights.postsGenerated}</td>
        </tr>
      </table>

      ${insights.topSources.length > 0 ? `
        <h3 style="font-size:14px;font-weight:600;margin:0 0 8px;">Top trending sources</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;">Title</th>
              <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;">Source</th>
              <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;">Score</th>
            </tr>
          </thead>
          <tbody>${sourceRows}</tbody>
        </table>
      ` : ""}

      ${previewBlock}

      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e5e7eb;">
        <a href="${process.env.APP_URL ?? "http://localhost:3000"}/trending"
           style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;">
          View all trending posts
        </a>
      </div>
    </div>
  `
}

export async function sendTrendingCompletionEmail(
  userId: string,
  runId: string
): Promise<void> {
  const [settings, email] = await Promise.all([
    SettingsModel.findOne({ userId }).lean(),
    getUserEmail(userId),
  ])

  if (!settings?.notifications?.emailTrendingComplete) return
  if (!email) return

  const insights = await getInsights(runId)

  await sendEmail({
    to: email,
    subject: `${insights.postsGenerated} trending posts ready — LinkedIQ`,
    text: `Your scheduled trending run completed. ${insights.postsGenerated} posts generated from ${insights.topicCount} topics across ${insights.platforms.join(", ")}. View them at ${process.env.APP_URL ?? "http://localhost:3000"}/trending`,
    html: buildEmailHtml(insights),
  })
}
