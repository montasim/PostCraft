import { inngest } from "./client"
import { runGenerationPipeline } from "./pipeline"

export const generatePosts = inngest.createFunction(
  {
    id: "generate-posts",
    name: "Generate Posts",
    retries: 3,
    triggers: [{ event: "generation/created" }],
  },
  async ({ event }) => {
    const { generationId, workspaceId } = event.data as {
      generationId: string
      workspaceId: string
    }
    await runGenerationPipeline(generationId, workspaceId)
  }
)
