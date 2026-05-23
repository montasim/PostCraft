import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"
import { handleApiError } from "@/core/errors/error-handler"
import { historyService } from "@/modules/history"
import type { HistoryListFilters } from "@/modules/history/history.repository"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()
    const sp = request.nextUrl.searchParams

    const filters: HistoryListFilters = {
      search: sp.get("search") || undefined,
      styles: sp.get("styles")?.split(",").filter(Boolean) || undefined,
      languages:
        sp.get("languages")?.split(",").filter(Boolean) || undefined,
      scoreRange:
        sp.get("scoreMin") && sp.get("scoreMax")
          ? {
              min: Number(sp.get("scoreMin")),
              max: Number(sp.get("scoreMax")),
            }
          : undefined,
      sort:
        (sp.get("sort") as HistoryListFilters["sort"]) || "newest",
      page: Number(sp.get("page")) || 1,
      limit: Number(sp.get("limit")) || 6,
    }

    const data = await historyService.listEntries(
      DEFAULT_WORKSPACE_ID,
      filters
    )
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
