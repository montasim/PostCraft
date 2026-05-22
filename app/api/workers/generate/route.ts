import { NextRequest, NextResponse } from "next/server"
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs"
import { isDev } from "@/core/config/env"
import { runGenerationPipeline } from "@/core/queue/pipeline"

async function handler(request: NextRequest) {
  const body = await request.json()
  const { trendId } = body as { trendId: string }

  if (!trendId) {
    return NextResponse.json(
      { success: false, error: "Missing trendId" },
      { status: 400 }
    )
  }

  await runGenerationPipeline(trendId)

  return NextResponse.json({ success: true })
}

// Prod: QStash signature verification enforced
// Dev: QStash not configured, handler runs without verification (called directly by sync mode)
export const POST = !isDev()
  ? verifySignatureAppRouter(handler)
  : handler
