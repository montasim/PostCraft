import { NextRequest, NextResponse } from "next/server"
import { workspaceService } from "@/modules/workspace"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"
import { WorkspaceModel } from "@/modules/workspace/workspace.model"
import { GuardrailModel } from "@/modules/guardrail/guardrail.model"
import { GenerationModel } from "@/modules/generation/generation.model"
import { VariantModel } from "@/modules/variant/variant.model"
import { SettingsModel } from "@/modules/settings/settings.model"

export async function GET() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const data = await workspaceService.getWorkspace(workspaceId)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const body = await request.json()
    const data = await workspaceService.updateWorkspace(workspaceId, body)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const generationIds = (await GenerationModel.find({ workspaceId }).select("_id")).map((d) => d._id)

    await Promise.all([
      WorkspaceModel.deleteOne({ workspaceId }),
      GuardrailModel.deleteMany({ workspaceId }),
      GenerationModel.deleteMany({ workspaceId }),
      VariantModel.deleteMany({ generationId: { $in: generationIds } }),
      SettingsModel.deleteMany({ userId: workspaceId.replace("ws_", "") }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
