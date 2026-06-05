import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import { API, ERROR_MESSAGES } from "@/lib/constants"

interface ConnectedPlatformsState {
  platforms: string[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ConnectedPlatformsState = {
  platforms: [],
  status: "idle",
  error: null,
}

export const fetchConnectedPlatforms = createAsyncThunk(
  "connectedPlatforms/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch(`${API.SETTINGS}/accounts`)
    if (!res.ok) return rejectWithValue(ERROR_MESSAGES.FETCH_PROFILE)
    const json = await res.json()
    if (!json.success) return rejectWithValue(ERROR_MESSAGES.FETCH_PROFILE)
    return (json.data as { providerId: string }[]).map(
      (a) => a.providerId
    )
  }
)

const connectedPlatformsSlice = createSlice({
  name: "connectedPlatforms",
  initialState,
  reducers: {
    resetConnectedPlatforms() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnectedPlatforms.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchConnectedPlatforms.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.platforms = action.payload
      })
      .addCase(fetchConnectedPlatforms.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { resetConnectedPlatforms } = connectedPlatformsSlice.actions
export default connectedPlatformsSlice.reducer

// Selectors
export const selectConnectedPlatforms = (state: {
  connectedPlatforms: ConnectedPlatformsState
}) => state.connectedPlatforms.platforms

export const selectIsPlatformConnected =
  (platform: string) => (state: { connectedPlatforms: ConnectedPlatformsState }) =>
    state.connectedPlatforms.platforms.includes(platform)
