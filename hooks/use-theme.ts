"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useCallback } from "react"

type Theme = "dark" | "light"

function useAppTheme() {
  const { setTheme, resolvedTheme } = useNextTheme()

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return {
    theme: (resolvedTheme ?? "dark") as Theme,
    setTheme,
    toggle,
  }
}

export { useAppTheme }
export type { Theme }
