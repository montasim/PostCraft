import { configureStore } from "@reduxjs/toolkit"
import workspaceReducer from "./slices/workspace.slice"
import profileReducer from "./slices/profile.slice"
import trendingPrefsReducer from "./slices/trending-prefs.slice"
import previewPrefsReducer from "./slices/preview-prefs.slice"
import connectedPlatformsReducer from "./slices/connected-platforms.slice"

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    profile: profileReducer,
    trendingPrefs: trendingPrefsReducer,
    previewPrefs: previewPrefsReducer,
    connectedPlatforms: connectedPlatformsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
