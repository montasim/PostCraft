import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { WorkspaceProfile, BrandPersona, PersonaOption } from "@/types"

export interface WorkspaceData {
  profile: WorkspaceProfile
  persona: BrandPersona
  usage: { used: number; limit: number; totalGenerated: number }
}

interface WorkspaceState {
  data: WorkspaceData | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: WorkspaceState = {
  data: null,
  status: "idle",
  error: null,
}

export const fetchWorkspace = createAsyncThunk(
  "workspace/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/workspace")
    if (!res.ok) return rejectWithValue("Failed to fetch workspace")
    const json = await res.json()
    if (!json.success) return rejectWithValue("Failed to fetch workspace")
    return json.data as WorkspaceData
  }
)

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    updateWorkspace(state, action: PayloadAction<Partial<WorkspaceData>>) {
      if (state.data) Object.assign(state.data, action.payload)
    },
    resetWorkspace() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspace.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchWorkspace.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchWorkspace.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { updateWorkspace, resetWorkspace } = workspaceSlice.actions
export default workspaceSlice.reducer

// Selectors
export const selectWorkspace = (state: { workspace: WorkspaceState }) => state.workspace.data
export const selectWorkspaceStatus = (state: { workspace: WorkspaceState }) => state.workspace.status
export const selectQuotaUsed = (state: { workspace: WorkspaceState }) => state.workspace.data?.usage.used ?? 0
export const selectQuotaLimit = (state: { workspace: WorkspaceState }) => state.workspace.data?.usage.limit ?? 0
export const selectBrandName = (state: { workspace: WorkspaceState }) => state.workspace.data?.profile.name ?? ""
export const selectPersona = (state: { workspace: WorkspaceState }) => state.workspace.data?.persona ?? null
export const selectQuotaExceeded = (state: { workspace: WorkspaceState }) => {
  const d = state.workspace.data
  return d ? d.usage.used >= d.usage.limit : false
}
