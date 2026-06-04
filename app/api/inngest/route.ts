import { serve } from "inngest/next"
import { inngest } from "@/core/queue/client"
import { generatePosts, runTrendingPipeline, fetchGlobalTrendingTopics, scheduledTrendingRunner, recoverScheduledTrending, scheduleLinkedInPost, scheduleFacebookPost } from "@/core/queue/functions"

const handler = serve({
  client: inngest,
  functions: [generatePosts, runTrendingPipeline, fetchGlobalTrendingTopics, scheduledTrendingRunner, recoverScheduledTrending, scheduleLinkedInPost, scheduleFacebookPost],
})

export const GET = handler
export const POST = handler
export const PUT = handler
