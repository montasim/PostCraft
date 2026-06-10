"use client"

import { useState, useEffect, useCallback } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingHeader } from "./trending-header"
import { TrendingEmptyState } from "./trending-empty-state"
import { TrendingSidebar } from "./trending-sidebar"
import { TrendingSettingsPanel } from "./trending-settings-panel"
import { TrendingVariant } from "./trending-run-group"
import { TrendingTimeline } from "./trending-timeline"
import {
  EmptyState,
  VariantCarousel,
  HighTrafficAlert,
} from "@/components/shared"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SelectOption } from "@/components/shared/multi-select"
import type {
  ITrendingRun,
  TrendingGenerationPreview,
} from "@/modules/trending/trending.types"
import { type TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { IconArrowLeft, IconTrendingUp, IconLoader2, IconAlertCircle } from "@tabler/icons-react"
import { QuotaAlert } from "@/components/shared/quota-alert"
import { toast } from "sonner"
import { API } from "@/lib/constants"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectTrendingPrefs,
  setTrendingPrefs,
} from "@/store/slices/trending-prefs.slice"
import {
  selectWorkspace,
  selectQuotaExceeded,
} from "@/store/slices/workspace.slice"

function TrendingShell() {
  const dispatch = useAppDispatch()
  const [runs, setRuns] = useState<ITrendingRun[]>([])
  const [generations, setGenerations] = useState<TrendingGenerationPreview[]>(
    []
  )
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null)
  const [showTimeline, setShowTimeline] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const prefs = useAppSelector(selectTrendingPrefs)
  const workspace = useAppSelector(selectWorkspace)
  const quotaExceeded = useAppSelector(selectQuotaExceeded)

  const personaOptions: {
    audiences: SelectOption[]
    languages: SelectOption[]
    topics: SelectOption[]
    industries: SelectOption[]
  } = (() => {
    if (!workspace?.persona)
      return { audiences: [], languages: [], topics: [], industries: [] }
    const toOptions = (
      items: { value: string; label: string; description?: string }[]
    ) =>
      items.map((i) => ({
        value: i.value,
        label: i.label,
        description: i.description,
      }))
    const p = workspace.persona
    return {
      audiences: toOptions(p.targetAudiences ?? []),
      languages: toOptions(p.language ?? []),
      topics: toOptions(p.topics ?? []),
      industries: toOptions(p.industry ?? []),
    }
  })()

  const hasConfig = !!(prefs?.enabled && (prefs?.platforms?.length ?? 0) > 0)

  const loadTrending = useCallback(async () => {
    try {
      const res = await fetch(API.TRENDING)
      const result = await res.json()
      if (result.success && result.data) {
        setRuns(
          (result.data.runs ?? []).map(
            (
              r: Omit<ITrendingRun, "ranAt" | "createdAt" | "updatedAt"> & {
                ranAt: string
                createdAt: string
                updatedAt: string
              }
            ) => ({
              ...r,
              ranAt: new Date(r.ranAt),
              createdAt: new Date(r.createdAt),
              updatedAt: new Date(r.updatedAt),
            })
          )
        )
        setGenerations(result.data.generations ?? [])
        if (!selectedRunId && result.data.runs?.length > 0) {
          setSelectedRunId(result.data.runs[0]._id)
        }
      }
    } catch {
      toast.error("Failed to load trending data")
    } finally {
      setIsLoading(false)
    }
  }, [selectedRunId])

  useEffect(() => {
    loadTrending()
  }, [loadTrending])

  async function handleRunNow() {
    if (!prefs?.platforms || prefs.platforms.length === 0) {
      toast.error("Please select at least one platform in settings first.")
      setSettingsPanelOpen(true)
      return
    }

    setIsRunning(true)
    try {
      const res = await fetch(API.TRENDING_RUN_NOW, { method: "POST" })
      const result = await res.json()
      if (!result.success)
        throw new Error(result.error ?? "Failed to start run")
      toast.success("Scan started. Posts land in ~2 min.")
      setTimeout(loadTrending, 15_000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start run")
    } finally {
      setIsRunning(false)
    }
  }

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

  const selectedRun = runs.find((r) => r._id === selectedRunId)
  const selectedGenerations = selectedRunId
    ? generations.filter((g) => g.runId === selectedRunId)
    : []

  const hasValidVariants = selectedGenerations.some((g) => g.topVariant !== null)
  const isOldRun = selectedRun
    ? new Date().getTime() - new Date(selectedRun.ranAt).getTime() > 15 * 60 * 1000
    : false

  const showDetail = selectedRunId && !isDesktop
  const showSidebar = !showDetail

  if (isLoading) {
    return (
      <div className="-m-4 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden lg:flex-row">
        <div className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
          <div className="flex-1 p-4">
            <div className="mb-4 space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 flex-1 rounded-md" />
              </div>
            </div>
            {["Today", "Yesterday"].map((label) => (
              <div key={label} className="mb-4">
                <Skeleton className="mb-2 h-3 w-12" />
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="mb-1 rounded-lg p-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3.5 w-3.5" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-14 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-12">
            <div className="flex justify-end gap-4">
              <Skeleton className="h-7 w-20 rounded-md" />
              <Skeleton className="h-7 w-20 rounded-md" />
            </div>
          </div>
          <div className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-px py-1 [&::-webkit-scrollbar]:hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-[85%] shrink-0 snap-start rounded-xl border p-4 sm:w-100"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-3 flex-1" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <div className="mb-3 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="mb-3 flex gap-2">
                  <Skeleton className="h-4 w-14 rounded-full" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (runs.length === 0 && !hasConfig) {
    return (
      <div className="flex flex-col gap-4">
        <TrendingHeader
          enabled={false}
          prefs={prefs!}
          isRunning={isRunning}
          quotaExceeded={quotaExceeded}
          onOpenSettings={() => setSettingsPanelOpen(true)}
          onRunNow={handleRunNow}
        />
        <TrendingEmptyState onConfigure={() => setSettingsPanelOpen(true)} />
        {prefs && (
          <TrendingSettingsPanel
            open={settingsPanelOpen}
            prefs={prefs}
            onClose={() => setSettingsPanelOpen(false)}
            onSave={handleSave}
            audienceOptions={personaOptions.audiences}
            languageOptions={personaOptions.languages}
            topicOptions={personaOptions.topics}
            industryOptions={personaOptions.industries}
          />
        )}
      </div>
    )
  }

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden lg:flex-row">
      <div
        className={cn(
          "shrink-0 border-r border-sidebar-border bg-sidebar",
          showDetail ? "hidden" : "flex w-full flex-col",
          "lg:flex lg:w-72 lg:overflow-y-auto"
        )}
      >
        <div className="flex-1 p-4">
          <TrendingSidebar
            runs={runs}
            selectedId={selectedRunId ?? ""}
            onSelect={setSelectedRunId}
          />
        </div>
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto",
          showSidebar && !isDesktop ? "hidden" : "block p-4"
        )}
      >
        <HighTrafficAlert />
        <QuotaAlert />
        <div className="mb-12">
          <TrendingHeader
            enabled={hasConfig}
            prefs={prefs!}
            isRunning={isRunning}
            quotaExceeded={quotaExceeded}
            showTimeline={showTimeline}
            onToggleTimeline={() => setShowTimeline(!showTimeline)}
            onOpenSettings={() => setSettingsPanelOpen(true)}
            onRunNow={handleRunNow}
          />
        </div>

        {selectedRun ? (
          showTimeline || selectedRun.status === "failed" ? (
            <TrendingTimeline run={selectedRun} generations={selectedGenerations} />
          ) : selectedGenerations.length > 0 ? (
            !hasValidVariants && isOldRun ? (
              <EmptyState
                variant="centered"
                title="Posts Unavailable"
                description="The posts generated from this scan are currently unavailable. Please try again later or start a new scan."
                icon={<IconAlertCircle className="h-10 w-10 text-muted-foreground" />}
              />
            ) : (
              <VariantCarousel>
                {selectedGenerations.map((gen) => (
                  <div
                    key={gen.generationId}
                    className="w-[85%] shrink-0 snap-start sm:w-100"
                  >
                    <TrendingVariant generation={gen} />
                  </div>
                ))}
              </VariantCarousel>
            )
          ) : selectedRun.status === "running" ? (
            <EmptyState
              variant="centered"
              title="Scan in Progress"
              description="We are currently scanning for trending topics and generating posts. Check back soon."
              icon={
                <IconLoader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              }
            />
          ) : (
            <EmptyState
              variant="centered"
              title={
                selectedRun.generationIds.length > 0
                  ? "Posts Unavailable"
                  : "No Posts Generated"
              }
              description={
                selectedRun.generationIds.length > 0
                  ? "The posts generated during this scan are no longer available (they may have been deleted)."
                  : quotaExceeded
                    ? "This scan was skipped because your daily generation quota has been exceeded."
                    : "This scan completed but no matching trending topics were found."
              }
              icon={
                <IconTrendingUp className="h-10 w-10 text-muted-foreground" />
              }
            />
          )
        ) : (
          <EmptyState
            variant="centered"
            title="Trending Posts"
            description="Select a run from the sidebar to view generated posts."
            icon={
              <IconTrendingUp className="h-10 w-10 text-muted-foreground" />
            }
          />
        )}
      </div>

      {prefs && (
        <TrendingSettingsPanel
          open={settingsPanelOpen}
          prefs={prefs}
          onClose={() => setSettingsPanelOpen(false)}
          onSave={handleSave}
          audienceOptions={personaOptions.audiences}
          languageOptions={personaOptions.languages}
          topicOptions={personaOptions.topics}
          industryOptions={personaOptions.industries}
        />
      )}
    </div>
  )
}

export { TrendingShell }
