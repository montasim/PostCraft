import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PreviewConfig } from "@/modules/prefs/prefs.schema"
import { PREVIEW_CONFIG_DEFAULTS } from "@/lib/constants/preview"
import { API, ERROR_MESSAGES } from "@/lib/constants"

interface PreviewPrefsState {
  data: PreviewConfig | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: PreviewPrefsState = {
  data: null,
  status: "idle",
  error: null,
}

export const fetchPreviewPrefs = createAsyncThunk(
  "previewPrefs/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch(API.PREVIEW_PREFS)
    if (!res.ok) return rejectWithValue(ERROR_MESSAGES.FETCH_PREVIEW)
    const json = await res.json()
    if (!json.success) return rejectWithValue(ERROR_MESSAGES.FETCH_PREVIEW)
    return json.data as PreviewConfig
  }
)

export const updatePreviewPrefs = createAsyncThunk(
  "previewPrefs/update",
  async (data: PreviewConfig, { rejectWithValue }) => {
    const res = await fetch(API.PREVIEW_PREFS, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) return rejectWithValue(ERROR_MESSAGES.UPDATE_PREVIEW)
    const json = await res.json()
    if (!json.success) return rejectWithValue(ERROR_MESSAGES.UPDATE_PREVIEW)
    return json.data as PreviewConfig
  }
)

const previewPrefsSlice = createSlice({
  name: "previewPrefs",
  initialState,
  reducers: {
    setPreviewPrefs(state, action) {
      state.data = action.payload
    },
    resetPreviewPrefs() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreviewPrefs.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchPreviewPrefs.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchPreviewPrefs.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      .addCase(updatePreviewPrefs.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(updatePreviewPrefs.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { setPreviewPrefs, resetPreviewPrefs } = previewPrefsSlice.actions
export default previewPrefsSlice.reducer

export const selectPreviewPrefs = (state: {
  previewPrefs: PreviewPrefsState
}) => state.previewPrefs.data
export const selectEnabledPlatforms = (state: {
  previewPrefs: PreviewPrefsState
}) => state.previewPrefs.data?.enabledPlatforms ?? []
export const selectPreviewPrefsStatus = (state: {
  previewPrefs: PreviewPrefsState
}) => state.previewPrefs.status
