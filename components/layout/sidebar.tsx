"use client"

import Image from "next/image"
import Script from "next/script"
import { useState } from "react"
import {
  NavGroup,
  PlanQuotaCard,
  PlanQuotaCardSkeleton,
  StreakWidget,
  MotivationTip,
  HighDemandCard,
  TrendingScheduleCard,
  TrendingScheduleCardSkeleton,
} from "@/components/shared"
import { TrendingSettingsPanel } from "@/components/features/trending/trending-settings-panel"
import { Button } from "@/components/ui/button"
import { IconClock, IconSettings } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT, API } from "@/lib/constants"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setTrendingPrefs } from "@/store/slices/trending-prefs.slice"
import {
  selectPersona,
  selectAiLimitError,
  selectWorkspaceStatus,
} from "@/store/slices/workspace.slice"
import { selectTrendingPrefsStatus } from "@/store/slices/trending-prefs.slice"
import { toast } from "sonner"
import type { SelectOption } from "@/components/shared/multi-select"

interface SidebarProps {
  active: string
  onSelect: (id: string) => void
  used?: number
  limit?: number
  streakDays?: number
  weeklyGoal?: number
  weeklyProgress?: number
  trendingCount?: number
  trendingPrefs?: TrendingPrefs
  connectedPlatforms?: string[]
}

function Sidebar({
  active,
  onSelect,
  used,
  limit,
  streakDays = 0,
  weeklyGoal = 5,
  weeklyProgress = 0,
  trendingCount = 0,
  trendingPrefs,
  connectedPlatforms = [],
}: SidebarProps) {
  const dispatch = useAppDispatch()
  const persona = useAppSelector(selectPersona)
  const aiLimitError = useAppSelector(selectAiLimitError)
  const workspaceStatus = useAppSelector(selectWorkspaceStatus)
  const trendingPrefsStatus = useAppSelector(selectTrendingPrefsStatus)
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)

  const filteredNavItems = NAV_MAIN
    .filter((item) =>
      item.id === "trending" ? trendingPrefs?.enabled : true
    )
    .map((item) =>
      item.id === "insights"
        ? {
            ...item,
            subItems: item.subItems?.filter((sub) =>
              connectedPlatforms.includes(sub.id)
            ),
          }
        : item
    )
    .filter(
      (item) => item.id !== "insights" || (item.subItems && item.subItems.length > 0)
    )

  const personaOptions: {
    audiences: SelectOption[]
    languages: SelectOption[]
    topics: SelectOption[]
    industries: SelectOption[]
  } = (() => {
    if (!persona)
      return { audiences: [], languages: [], topics: [], industries: [] }
    const toOptions = (
      items: { value: string; label: string; description?: string }[]
    ) =>
      items.map((i) => ({
        value: i.value,
        label: i.label,
        description: i.description,
      }))
    const p = persona
    return {
      audiences: toOptions(p.targetAudiences ?? []),
      languages: toOptions(p.language ?? []),
      topics: toOptions(p.topics ?? []),
      industries: toOptions(p.industry ?? []),
    }
  })()

  async function handleSave(newPrefs: TrendingPrefs) {
    try {
      const res = await fetch(API.TRENDING_PREFS, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrefs),
      })
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save settings")
      }
      if (result.data) {
        dispatch(setTrendingPrefs(result.data))
        toast.success("Saved.")
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save settings")
    }
    setSettingsPanelOpen(false)
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <Image
          src="/logo.png"
          alt="PostCraft"
          width={28}
          height={28}
          className="rounded-lg shadow-sm"
        />
        <span className="font-bold text-primary">PostCraft</span>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <NavGroup
          label="Main"
          items={filteredNavItems}
          active={active}
          onSelect={onSelect}
          badges={{ trending: trendingCount }}
        />
        <NavGroup
          label="Config"
          items={NAV_CONFIG}
          active={active}
          onSelect={onSelect}
        />
        <NavGroup
          label="Account"
          items={NAV_ACCOUNT}
          active={active}
          onSelect={onSelect}
        />
      </div>
      <div className="space-y-4 p-4">
        {aiLimitError && <HighDemandCard />}
        
        <div ref={(el) => {
          if (el && !document.querySelector('script[src*="supportkori.com"]')) {
            const script = document.createElement('script')
            script.src = "https://www.supportkori.com/widget.js"
            script.setAttribute("data-id", "montasim")
            script.setAttribute("data-message", "Support montasim")
            script.setAttribute("data-color", "#FFDD00")
            script.setAttribute("data-position", "right")
            script.async = true
            
            const observer = new MutationObserver((mutations, obs) => {
              const btn = document.querySelector('.sk-widget-btn')
              if (btn) {
                el.appendChild(btn)
                const htmlBtn = btn as HTMLElement
                htmlBtn.style.position = 'static'
                htmlBtn.style.width = '100%'
                htmlBtn.style.justifyContent = 'center'
                obs.disconnect()
              }
            })
            observer.observe(document.body, { childList: true, subtree: true })
            
            document.body.appendChild(script)
          }
        }} className="w-full flex justify-center pb-2" />

        {workspaceStatus === "loading" || workspaceStatus === "idle" ? (
          <PlanQuotaCardSkeleton />
        ) : (
          <PlanQuotaCard used={used} limit={limit} />
        )}

        {trendingPrefsStatus === "loading" || trendingPrefsStatus === "idle" ? (
          <TrendingScheduleCardSkeleton />
        ) : trendingPrefs?.enabled ? (
          <TrendingScheduleCard
            prefs={trendingPrefs}
            onSettingsClick={() => setSettingsPanelOpen(true)}
          />
        ) : null}
      </div>

      {trendingPrefs && (
        <TrendingSettingsPanel
          open={settingsPanelOpen}
          prefs={trendingPrefs}
          onClose={() => setSettingsPanelOpen(false)}
          onSave={handleSave}
          audienceOptions={personaOptions.audiences}
          languageOptions={personaOptions.languages}
          topicOptions={personaOptions.topics}
          industryOptions={personaOptions.industries}
        />
      )}
    </aside>
  )
}

export { Sidebar }
