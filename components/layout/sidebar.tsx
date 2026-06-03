"use client"

import { useState } from "react"
import {
  NavGroup,
  PlanQuotaCard,
  StreakWidget,
  MotivationTip,
  HighDemandCard,
  TrendingScheduleCard,
} from "@/components/shared"
import { TrendingSettingsPanel } from "@/components/features/trending/trending-settings-panel"
import { Button } from "@/components/ui/button"
import { IconSparkles, IconClock, IconSettings } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT, API } from "@/lib/constants"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setTrendingPrefs } from "@/store/slices/trending-prefs.slice"
import { selectPersona, selectAiLimitError } from "@/store/slices/workspace.slice"
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
}: SidebarProps) {
  const dispatch = useAppDispatch()
  const persona = useAppSelector(selectPersona)
  const aiLimitError = useAppSelector(selectAiLimitError)
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)

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
      if (result.success && result.data) {
        dispatch(setTrendingPrefs(result.data))
        toast.success("Saved.")
      }
    } catch {
      toast.error("Failed to save settings")
    }
    setSettingsPanelOpen(false)
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-2">
          <IconSparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-primary">PostCraft</span>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <NavGroup
          label="Main"
          items={trendingPrefs?.enabled ? NAV_MAIN : NAV_MAIN.filter((item) => item.id !== "trending")}
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
        <PlanQuotaCard used={used} limit={limit} />
        {trendingPrefs?.enabled && (
          <TrendingScheduleCard
            prefs={trendingPrefs}
            onSettingsClick={() => setSettingsPanelOpen(true)}
          />
        )}
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
