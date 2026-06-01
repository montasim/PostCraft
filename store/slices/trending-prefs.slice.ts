import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { TRENDING_PREFS_DEFAULTS } from "@/modules/prefs/prefs.schema"
import { API, ERROR_MESSAGES } from "@/lib/constants"

interface TrendingPrefsState {
  data: TrendingPrefs | null
  trendingCount: number
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TrendingPrefsState = {
  data: null,
  trendingCount: 0,
  status: "idle",
  error: null,
}

export const fetchTrendingPrefs = createAsyncThunk(
  "trendingPrefs/fetch",
  async (_, { rejectWithValue }) => {
    const [prefsRes, trendingRes] = await Promise.all([
      fetch(API.TRENDING_PREFS),
      fetch(API.TRENDING),
    ])
    if (!prefsRes.ok)
      return rejectWithValue(ERROR_MESSAGES.FETCH_TRENDING_PREFS)
    const prefsJson = await prefsRes.json()
    if (!prefsJson.success)
      return rejectWithValue(ERROR_MESSAGES.FETCH_TRENDING_PREFS)

    const trendingJson = trendingRes.ok ? await trendingRes.json() : null

    return {
      data: prefsJson.data as TrendingPrefs,
      trendingCount: trendingJson?.data?.unreadCount ?? 0,
    }
  }
)

const trendingPrefsSlice = createSlice({
  name: "trendingPrefs",
  initialState,
  reducers: {
    updateTrendingPrefs(state, action: PayloadAction<Partial<TrendingPrefs>>) {
      if (state.data) Object.assign(state.data, action.payload)
    },
    setTrendingPrefs(state, action: PayloadAction<TrendingPrefs>) {
      state.data = action.payload
    },
    setTrendingCount(state, action: PayloadAction<number>) {
      state.trendingCount = action.payload
    },
    decrementTrendingCount(state) {
      state.trendingCount = Math.max(0, state.trendingCount - 1)
    },
    resetTrendingPrefs() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingPrefs.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchTrendingPrefs.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload.data
        state.trendingCount = action.payload.trendingCount
      })
      .addCase(fetchTrendingPrefs.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const {
  updateTrendingPrefs,
  setTrendingPrefs,
  setTrendingCount,
  decrementTrendingCount,
  resetTrendingPrefs,
} = trendingPrefsSlice.actions
export default trendingPrefsSlice.reducer

// Selectors
export const selectTrendingPrefs = (state: {
  trendingPrefs: TrendingPrefsState
}) => state.trendingPrefs.data
export const selectTrendingCount = (state: {
  trendingPrefs: TrendingPrefsState
}) => state.trendingPrefs.trendingCount
export const selectTrendingPrefsStatus = (state: {
  trendingPrefs: TrendingPrefsState
}) => state.trendingPrefs.status
export const selectTrendingEnabled = (state: {
  trendingPrefs: TrendingPrefsState
}) => state.trendingPrefs.data?.enabled ?? false
