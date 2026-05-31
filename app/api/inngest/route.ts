import { serve } from "inngest/next"
import { inngest } from "@/core/queue/client"
import { generatePosts } from "@/core/queue/functions"

const handler = serve({
  client: inngest,
  functions: [generatePosts],
})

export const GET = handler
export const POST = handler
export const PUT = handler
