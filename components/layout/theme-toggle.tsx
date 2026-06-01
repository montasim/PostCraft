"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { IconSun, IconMoon } from "@tabler/icons-react"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleToggle = () => {
    const isDark = document.documentElement.classList.contains("dark")
    const next = isDark ? "light" : "dark"
    setTheme(next)
    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appearance: { theme: next } }),
    }).catch(() => {
      // Non-critical: theme preference save failed silently
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full border border-border"
      onClick={handleToggle}
    >
      {resolvedTheme === "dark" ? (
        <IconSun className="h-4 w-4" />
      ) : (
        <IconMoon className="h-4 w-4" />
      )}
    </Button>
  )
}

export { ThemeToggle }
