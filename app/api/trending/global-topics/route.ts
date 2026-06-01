import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { getLatestGlobalTopics } from "@/modules/trending/global-topics.repository"
import { callWithTaskFallback } from "@/core/ai/provider"
import { logger } from "@/core/logger"

const STATIC_FALLBACK_TOPICS = [
  "Why most startups fail at hiring in 2025",
  "AI replacing resume screening — what actually works",
  "The 4-day work week experiment: honest results",
  "Remote work productivity hacks that stick",
  "Building diverse engineering teams",
  "Scaling from 5 to 50 people: hiring lessons",
]

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await connectDB()

    // Tier 1: Real trending data from DB
    const latest = await getLatestGlobalTopics()
    if (latest && latest.topics.length > 0) {
      const topics = latest.topics.map((item) => item.title)
      return NextResponse.json(
        { success: true, data: { topics, source: "trending", fetchedAt: latest.fetchedAt } },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
      )
    }

    // Tier 2: AI-generated suggestions
    try {
      const { text: raw } = await callWithTaskFallback("generate", {
        system: `You are a LinkedIn content strategist.
Return a JSON object with a "topics" array of exactly 6 trending professional topics
suitable as LinkedIn post ideas for developers, founders, and tech professionals.
Topics should be timely, specific, and conversation-starting.
No markdown. No explanation. JSON only.`,
        user: `Generate 6 trending LinkedIn topic suggestions for tech professionals.
Return exactly: { "topics": ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"] }`,
        temperature: 0.8,
        maxTokens: 256,
      })

      const cleaned = raw
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim()
      const parsed = JSON.parse(cleaned) as { topics: string[] }

      if (Array.isArray(parsed.topics) && parsed.topics.length > 0) {
        return NextResponse.json(
          { success: true, data: { topics: parsed.topics.slice(0, 6), source: "ai", fetchedAt: null } },
          { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
        )
      }
    } catch (aiErr) {
      logger.warn(
        { err: aiErr instanceof Error ? aiErr.message : String(aiErr) },
        "AI topic generation failed — falling back to static"
      )
    }

    // Tier 3: Static hardcoded fallback
    return NextResponse.json(
      { success: true, data: { topics: STATIC_FALLBACK_TOPICS, source: "static", fetchedAt: null } },
      { headers: { "Cache-Control": "public, s-maxage=300" } }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
