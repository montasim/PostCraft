import { sendEmail } from "@/core/auth/email"
import { getAuthDb } from "@/core/auth/auth-db"
import { getEnv } from "@/core/config/env"
import { ObjectId } from "mongodb"
import { SettingsModel } from "@/modules/settings/settings.model"
import { TrendingRun } from "./trending.model"
import { GenerationModel } from "@/modules/generation/generation.model"
import { VariantModel } from "@/modules/variant/variant.model"
import { EMAIL_BRAND, EMAIL_SUBJECT, EMAIL_BUTTON } from "@/lib/constants"
import {
  buildEmailLayout,
  buildEmailButton,
  buildEmailDivider,
} from "@/core/auth/email-templates"

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
  const user = await db
    .collection("user")
    .findOne({ _id: new ObjectId(userId) })
  return user?.email ?? null
}

function buildEmailHtml(insights: TrendingRunInsights): string {
  const sourceRows = insights.topSources
    .map(
      (s) =>
        `<tr>
          <td class="email-source-table" style="padding:8px 12px;border-bottom:1px solid ${EMAIL_BRAND.BORDER_HEX};font-size:13px;color:${EMAIL_BRAND.TEXT_HEX};">${s.title}</td>
          <td class="email-source-table" style="padding:8px 12px;border-bottom:1px solid ${EMAIL_BRAND.BORDER_HEX};font-size:13px;color:${EMAIL_BRAND.MUTED_HEX};text-transform:capitalize;">${s.source}</td>
          <td class="email-source-table" style="padding:8px 12px;border-bottom:1px solid ${EMAIL_BRAND.BORDER_HEX};font-size:13px;font-weight:600;color:${EMAIL_BRAND.TEXT_HEX};">${s.score}</td>
        </tr>`
    )
    .join("")

  const previewBlock = insights.topPostPreview
    ? `<div style="margin-top:20px;padding:16px;background:${EMAIL_BRAND.PRIMARY_LIGHT_HEX};border-radius:8px;border-left:3px solid ${EMAIL_BRAND.PRIMARY_HEX};">
        <p style="margin:0 0 4px;font-size:12px;color:${EMAIL_BRAND.MUTED_HEX};">Top post for "${insights.topPostPreview.topic}"</p>
        <p style="margin:0;font-size:14px;color:${EMAIL_BRAND.TEXT_HEX};line-height:1.5;">${insights.topPostPreview.hook}</p>
      </div>`
    : ""

  return buildEmailLayout(`
    <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.TEXT_HEX};margin:0 0 4px;">Your trending posts are ready</h1>
    <p style="font-size:14px;color:${EMAIL_BRAND.MUTED_HEX};margin:0 0 24px;">
      Scheduled run completed at ${insights.runTime.toLocaleString()}
    </p>

    <!-- Stats summary -->
    <table class="email-stats-table" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:20px;">
      <tr>
        <td width="33.33%" style="padding:12px;background:${EMAIL_BRAND.SURFACE_HEX};border-radius:8px 0 0 8px;text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:700;color:${EMAIL_BRAND.PRIMARY_HEX};">${insights.platforms.length}</p>
          <p style="margin:4px 0 0;font-size:12px;color:${EMAIL_BRAND.MUTED_HEX};">Platforms</p>
        </td>
        <td width="33.33%" style="padding:12px;background:${EMAIL_BRAND.SURFACE_HEX};text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:700;color:${EMAIL_BRAND.PRIMARY_HEX};">${insights.topicCount}</p>
          <p style="margin:4px 0 0;font-size:12px;color:${EMAIL_BRAND.MUTED_HEX};">Topics analyzed</p>
        </td>
        <td width="33.33%" style="padding:12px;background:${EMAIL_BRAND.SURFACE_HEX};border-radius:0 8px 8px 0;text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:700;color:${EMAIL_BRAND.PRIMARY_HEX};">${insights.postsGenerated}</p>
          <p style="margin:4px 0 0;font-size:12px;color:${EMAIL_BRAND.MUTED_HEX};">Posts generated</p>
        </td>
      </tr>
    </table>

    ${
      insights.topSources.length > 0
        ? `
      <h2 style="font-size:15px;font-weight:600;color:${EMAIL_BRAND.TEXT_HEX};margin:0 0 8px;">Top trending sources</h2>
      <table class="email-source-table" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:8px;">
        <thead>
          <tr style="background:${EMAIL_BRAND.SURFACE_HEX};">
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:${EMAIL_BRAND.MUTED_HEX};">Title</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:${EMAIL_BRAND.MUTED_HEX};">Source</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:${EMAIL_BRAND.MUTED_HEX};">Score</th>
          </tr>
        </thead>
        <tbody>${sourceRows}</tbody>
      </table>
    `
        : ""
    }

    ${previewBlock}

    ${buildEmailDivider()}

    ${buildEmailButton(`${getEnv().APP_URL}/trending`, EMAIL_BUTTON.VIEW_TRENDING)}
  `)
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
    subject: EMAIL_SUBJECT.TRENDING_COMPLETE(insights.postsGenerated),
    text: `Your trending run completed. ${insights.postsGenerated} posts generated from ${insights.topicCount} topics across ${insights.platforms.join(", ")}. View them at ${getEnv().APP_URL}/trending`,
    html: buildEmailHtml(insights),
  })
}
