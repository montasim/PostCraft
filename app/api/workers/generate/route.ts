import { NextRequest, NextResponse } from "next/server"
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs"
import { isDev } from "@/core/config/env"
import { runGenerationPipeline } from "@/core/queue/pipeline"

async function handler(request: NextRequest) {
  const body = await request.json()
  const { trendId, workspaceId } = body as { trendId: string; workspaceId?: string }

  if (!trendId || !workspaceId) {
    return NextResponse.json(
      { success: false, error: "Missing trendId or workspaceId" },
      { status: 400 }
    )
  }

  await runGenerationPipeline(trendId, workspaceId)

  return NextResponse.json({ success: true })
}

// Prod: QStash signature verification enforced
// Dev: QStash not configured, handler runs without verification (called directly by sync mode)
export const POST = !isDev()
  ? verifySignatureAppRouter(handler)
  : handler
