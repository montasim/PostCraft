import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { libraryService } from "@/modules/library"
import { getWorkspaceId } from "@/core/auth/workspace"
import type { LibraryListFilters } from "@/modules/library"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const sp = request.nextUrl.searchParams

    const filters: LibraryListFilters = {
      search: sp.get("search") || undefined,
      styles: sp.get("styles")?.split(",").filter(Boolean) || undefined,
      languages: sp.get("languages")?.split(",").filter(Boolean) || undefined,
      scoreRange:
        sp.get("scoreMin") && sp.get("scoreMax")
          ? {
              min: Number(sp.get("scoreMin")),
              max: Number(sp.get("scoreMax")),
            }
          : undefined,
      sort: (sp.get("sort") as LibraryListFilters["sort"]) || "newest",
      page: Number(sp.get("page")) || 1,
      limit: Number(sp.get("limit")) || 6,
    }

    const data = await libraryService.listEntries(workspaceId, filters)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
