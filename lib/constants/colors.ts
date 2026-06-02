/*
 * Color tokens — single source of truth for brand colors.
 *
 * Maps to CSS custom properties in app/globals.css:
 *   light → :root { ... }
 *   dark  → .dark { ... }
 *
 * When updating CSS variables, update this file too (and vice versa).
 * Hex values are email-safe approximations of oklch CSS values.
 */

export const THEME_COLORS = {
  light: {
    primary: "#22C55E",
    primaryLight: "#DCFCE7",
    foreground: "#1F2937",
    mutedForeground: "#6B7280",
    border: "#E5E7EB",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    success: "#10B981",
  },
  dark: {
    primary: "#6EE7B7",
    primaryLight: "#064E3B",
    foreground: "#E5E7EB",
    mutedForeground: "#9CA3AF",
    border: "#4B5563",
    background: "#1F2937",
    surface: "#111827",
    success: "#34D399",
  },
} as const

export type ThemeScheme = keyof typeof THEME_COLORS
