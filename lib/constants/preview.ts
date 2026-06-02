export const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter / X" },
  { id: "facebook", label: "Facebook" },
] as const

export type PlatformId = (typeof PLATFORMS)[number]["id"]

export const PREVIEW_CONFIG_DEFAULTS = {
  enabledPlatforms: [] as PlatformId[],
}

export const PLATFORM_DISPLAY_NAMES: Record<PlatformId, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  facebook: "Facebook",
}
