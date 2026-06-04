"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { QuotaAlert } from "@/components/shared/quota-alert"
import { HighTrafficAlert } from "@/components/shared/high-traffic-alert"
import { Header } from "@/components/layout/header"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  fetchWorkspace,
  selectQuotaUsed,
  selectQuotaLimit,
} from "@/store/slices/workspace.slice"
import {
  fetchTrendingPrefs,
  selectTrendingCount,
  selectTrendingPrefs,
  setTrendingCount,
} from "@/store/slices/trending-prefs.slice"
import { API } from "@/lib/constants"
import { fetchProfile } from "@/store/slices/profile.slice"
import { fetchPreviewPrefs } from "@/store/slices/preview-prefs.slice"

const ROUTE_MAP: Record<string, string> = {
  generate: "/",
  trending: "/trending",
  library: "/library",
  insights: "/insights",
  "insights/linkedin": "/insights/linkedin",
  "brand-guard": "/brand-guard",
  "brand-voice": "/brand-voice",
  profile: "/profile",
  settings: "/settings",
}

interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)

  const quotaUsed = useAppSelector(selectQuotaUsed)
  const quotaLimit = useAppSelector(selectQuotaLimit)
  const trendingCount = useAppSelector(selectTrendingCount)
  const trendingPrefs = useAppSelector(selectTrendingPrefs)

  useEffect(() => {
    dispatch(fetchWorkspace())
    dispatch(fetchTrendingPrefs())
    dispatch(fetchProfile())
    dispatch(fetchPreviewPrefs())
  }, [dispatch])

  const active =
    pathname === "/trending"
      ? "trending"
      : pathname === "/library"
        ? "library"
        : pathname === "/insights/linkedin"
          ? "insights/linkedin"
          : pathname === "/insights"
            ? "insights"
            : pathname === "/brand-guard"
              ? "brand-guard"
              : pathname === "/brand-voice"
                ? "brand-voice"
                : pathname === "/profile"
                  ? "profile"
                  : pathname === "/settings"
                    ? "settings"
                    : "generate"

  const handleSelect = (id: string) => {
    router.push(ROUTE_MAP[id] ?? "/")
    setMobileOpen(false)
  }

  useEffect(() => {
    if (pathname === "/trending") {
      dispatch(setTrendingCount(0))
      fetch(API.TRENDING_DISMISS_ALL, { method: "PATCH" }).catch(() => {
        // Non-critical: dismiss-all failed, badge will persist
      })
    }
  }, [pathname, dispatch])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        active={active}
        onSelect={handleSelect}
        used={quotaUsed}
        limit={quotaLimit}
        streakDays={4}
        weeklyGoal={5}
        weeklyProgress={3}
        trendingCount={trendingCount}
        trendingPrefs={trendingPrefs ?? undefined}
      />
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        active={active}
        onSelect={handleSelect}
        trendingPrefs={trendingPrefs ?? undefined}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">
          {active !== "library" && active !== "trending" && (
            <>
              <HighTrafficAlert />
              <QuotaAlert />
            </>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

export { AppShell }
