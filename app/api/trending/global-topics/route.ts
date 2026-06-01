import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { trendingService } from "@/modules/trending"

export const dynamic = "force-dynamic"

const CACHE_BY_SOURCE: Record<string, string> = {
  trending: "public, s-maxage=3600, stale-while-revalidate=7200",
  ai: "public, s-maxage=1800, stale-while-revalidate=3600",
  static: "public, s-maxage=300",
}

export async function GET() {
  try {
    const data = await trendingService.getGlobalTopics()

    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": CACHE_BY_SOURCE[data.source] } }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
