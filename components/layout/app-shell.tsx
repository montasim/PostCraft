"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

const ROUTE_MAP: Record<string, string> = {
  generate: "/",
  trending: "/trending",
  history: "/history",
  analytics: "/analytics",
  guardrails: "/guardrails",
  workspace: "/workspace",
  profile: "/profile",
  settings: "/settings",
}

interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarData, setSidebarData] = useState<{
    used: number
    limit: number
    brandName: string
  }>()
  const [trendingPrefs, setTrendingPrefs] = useState<TrendingPrefs>()
  const [trendingCount, setTrendingCount] = useState(0)

  useEffect(() => {
    fetch("/api/workspace")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setSidebarData({
            used: res.data.usage.used,
            limit: res.data.usage.limit,
            brandName: res.data.profile.name,
          })
        }
      })
      .catch(() => {})

    fetch("/api/prefs/trending")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) setTrendingPrefs(res.data)
      })
      .catch(() => {})

    fetch("/api/trending")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) setTrendingCount(res.data.unreadCount ?? 0)
      })
      .catch(() => {})
  }, [])

  const active =
    pathname === "/trending"
      ? "trending"
      : pathname === "/history"
        ? "history"
        : pathname === "/analytics"
          ? "analytics"
          : pathname === "/guardrails"
            ? "guardrails"
            : pathname === "/workspace"
              ? "workspace"
              : pathname === "/profile"
                ? "profile"
                : pathname === "/settings"
                  ? "settings"
                  : "generate"

  const handleSelect = (id: string) => {
    router.push(ROUTE_MAP[id] ?? "/")
    setMobileOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        active={active}
        onSelect={handleSelect}
        used={sidebarData?.used}
        limit={sidebarData?.limit}
        brandName={sidebarData?.brandName}
        streakDays={4}
        weeklyGoal={5}
        weeklyProgress={3}
        trendingCount={trendingCount}
        trendingPrefs={trendingPrefs}
      />
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        active={active}
        onSelect={handleSelect}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  )
}

export { AppShell }
