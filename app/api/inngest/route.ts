import { serve } from "inngest/next"
import { inngest } from "@/core/queue/client"
import { generatePosts, runTrendingPipeline } from "@/core/queue/functions"

const handler = serve({
  client: inngest,
  functions: [generatePosts, runTrendingPipeline],
})

export const GET = handler
export const POST = handler
export const PUT = handler
