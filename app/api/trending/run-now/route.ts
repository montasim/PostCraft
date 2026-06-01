import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { ValidationError } from "@/core/errors/app-error"
import { getWorkspaceId, getUserId } from "@/core/auth/workspace"
import { prefsService } from "@/modules/prefs"
import { createRun } from "@/modules/trending/trending.repository"
import { inngest } from "@/core/queue/client"

export async function POST() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const userId = await getUserId()

    const prefs = await prefsService.getTrendingPrefs(userId)
    if (!prefs.platforms || prefs.platforms.length === 0) {
      throw new ValidationError("Configure at least one platform before running")
    }

    const run = await createRun({
      workspaceId,
      configSnapshot: {
        platforms: prefs.platforms,
        topics: prefs.topics,
        industry: prefs.industry,
        targetAudience: prefs.targetAudience,
        language: prefs.language,
        postsPerPlatform: prefs.postsPerPlatform,
        topPostsForAI: prefs.topPostsForAI,
        postsToGenerate: prefs.postsToGenerate,
        scheduleType: prefs.scheduleType,
        scheduledTime: prefs.scheduledTime,
        scheduledDay: prefs.scheduledDay,
      },
      status: "running",
      ranAt: new Date(),
      sourceItems: [],
      generationIds: [],
      dismissed: false,
      error: null,
    })

    await inngest.send({
      name: "trending/run-triggered",
      data: {
        workspaceId,
        userId,
        config: prefs,
        runId: run._id.toString(),
      },
    })

    return NextResponse.json({
      success: true,
      data: { runId: run._id.toString() },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
