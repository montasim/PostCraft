import { Client } from "@upstash/qstash"
import { getEnv } from "@/core/config/env"
import { logger } from "@/core/logger"
import { QueueError } from "@/core/errors/app-error"

let client: Client | null = null

function getQStashClient(): Client {
  if (!client) {
    const { QSTASH_TOKEN } = getEnv()
    client = new Client({ token: QSTASH_TOKEN })
  }
  return client
}

export async function publishGenerationJob(trendId: string): Promise<string> {
  try {
    const { APP_URL } = getEnv()
    const qstash = getQStashClient()

    const result = await qstash.publishJSON({
      url: `${APP_URL}/api/workers/generate`,
      body: { trendId },
      retries: 3,
    })

    logger.info({ trendId, messageId: result.messageId }, "Generation job enqueued")
    return result.messageId
  } catch (error) {
    logger.error({ err: error, trendId }, "Failed to enqueue generation job")
    throw new QueueError("Failed to enqueue generation job")
  }
}
