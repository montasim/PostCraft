import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit"
import type { UserProfile, ProfileStats } from "@/types"
import { API, ERROR_MESSAGES } from "@/lib/constants"

interface ProfileState {
  data: UserProfile | null
  stats: ProfileStats | null
  totalPosts: number | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ProfileState = {
  data: null,
  stats: null,
  totalPosts: null,
  status: "idle",
  error: null,
}

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    const [profileRes, statsRes] = await Promise.all([
      fetch(API.PROFILE),
      fetch(API.STATS),
    ])
    if (!profileRes.ok) return rejectWithValue(ERROR_MESSAGES.FETCH_PROFILE)
    const profileJson = await profileRes.json()
    if (!profileJson.success)
      return rejectWithValue(ERROR_MESSAGES.FETCH_PROFILE)

    const statsJson = statsRes.ok ? await statsRes.json() : null

    return {
      data: profileJson.data.profile as UserProfile,
      stats: (profileJson.data.stats ?? null) as ProfileStats | null,
      totalPosts: (statsJson?.data?.totalPosts ?? null) as number | null,
    }
  }
)

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.data) Object.assign(state.data, action.payload)
    },
    resetProfile() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload.data
        state.stats = action.payload.stats
        state.totalPosts = action.payload.totalPosts
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { updateProfile, resetProfile } = profileSlice.actions
export default profileSlice.reducer

// Selectors
export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile.data
export const selectProfileStats = (state: { profile: ProfileState }) =>
  state.profile.stats
export const selectProfileStatus = (state: { profile: ProfileState }) =>
  state.profile.status
export const selectUserName = (state: { profile: ProfileState }) =>
  state.profile.data?.fullName ?? ""
export const selectTotalPosts = (state: { profile: ProfileState }) =>
  state.profile.totalPosts
