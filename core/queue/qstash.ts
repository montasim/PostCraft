import { Client } from "@upstash/qstash"
import { getEnv, hasQStash } from "@/core/config/env"
import { logger } from "@/core/logger"
import { QueueError } from "@/core/errors/app-error"

let client: Client | null = null

function getQStashClient(): Client {
  if (!client) {
    const { QSTASH_TOKEN } = getEnv()
    if (!QSTASH_TOKEN) throw new QueueError("QSTASH_TOKEN not configured")
    client = new Client({ token: QSTASH_TOKEN })
  }
  return client
}

export async function publishGenerationJob(generationId: string, workspaceId: string): Promise<string> {
  if (!hasQStash()) {
    logger.info({ generationId }, "QStash not configured, skipping enqueue (use dev sync mode)")
    return "dev-sync"
  }

  try {
    const { APP_URL, VERCEL_AUTOMATION_BYPASS_SECRET } = getEnv()
    const qstash = getQStashClient()

    const headers: Record<string, string> = {}
    if (VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers["x-vercel-protection-bypass"] = VERCEL_AUTOMATION_BYPASS_SECRET
    }

    const result = await qstash.publishJSON({
      url: `${APP_URL}/api/workers/generate`,
      body: { generationId, workspaceId },
      headers,
      retries: 3,
    })

    logger.info({ generationId, messageId: result.messageId }, "Generation job enqueued")
    return result.messageId
  } catch (error) {
    logger.error({ err: error, generationId }, "Failed to enqueue generation job")
    throw new QueueError("Failed to enqueue generation job")
  }
}
