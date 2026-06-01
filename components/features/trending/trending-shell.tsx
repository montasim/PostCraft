"use client"

import { useState, useEffect, useCallback } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TrendingHeader } from "./trending-header"
import { TrendingEmptyState } from "./trending-empty-state"
import { TrendingSidebar } from "./trending-sidebar"
import { TrendingSettingsPanel } from "./trending-settings-panel"
import { TrendingVariant } from "./trending-run-group"
import { EmptyState } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SelectOption } from "@/components/shared/multi-select"
import type { ITrendingRun, TrendingGenerationPreview } from "@/modules/trending/trending.types"
import { type TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { IconArrowLeft, IconTrendingUp } from "@tabler/icons-react"
import { toast } from "sonner"
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
  const [generations, setGenerations] = useState<TrendingGenerationPreview[]>([])
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null)
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
    if (!workspace?.persona) return { audiences: [], languages: [], topics: [], industries: [] }
    const toOptions = (items: { value: string; label: string; description?: string }[]) =>
      items.map((i) => ({ value: i.value, label: i.label, description: i.description }))
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
      const res = await fetch("/api/trending")
      const result = await res.json()
      if (result.success && result.data) {
        setRuns(
          (result.data.runs ?? []).map((r: Omit<ITrendingRun, "ranAt" | "createdAt" | "updatedAt"> & { ranAt: string; createdAt: string; updatedAt: string }) => ({
            ...r,
            ranAt: new Date(r.ranAt),
            createdAt: new Date(r.createdAt),
            updatedAt: new Date(r.updatedAt),
          }))
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
    setIsRunning(true)
    try {
      const res = await fetch("/api/trending/run-now", { method: "POST" })
      const result = await res.json()
      if (!result.success) throw new Error(result.error ?? "Failed to start run")
      toast.success("Run started — posts will appear shortly")
      setTimeout(loadTrending, 15_000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start run")
    } finally {
      setIsRunning(false)
    }
  }

  async function handleSave(newPrefs: TrendingPrefs) {
    try {
      const res = await fetch("/api/prefs/trending", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPrefs, enabled: true }),
      })
      const result = await res.json()
      if (result.success && result.data) {
        dispatch(setTrendingPrefs(result.data))
        toast.success("Settings saved")
      }
    } catch {
      toast.error("Failed to save settings")
    }
    setSettingsPanelOpen(false)
  }

  const selectedRun = runs.find((r) => r._id === selectedRunId)
  const selectedGenerations = selectedRunId
    ? generations.filter((g) => g.runId === selectedRunId)
    : []

  const showDetail = selectedRunId && !isDesktop
  const showSidebar = !showDetail

  if (isLoading) {
    return null
  }

  if (runs.length === 0 && !hasConfig) {
    return (
      <div className="flex flex-col gap-6">
        <TrendingHeader
          enabled={false}
          prefs={prefs!}
          isRunning={isRunning}
          quotaExceeded={quotaExceeded}
          onOpenSettings={() => setSettingsPanelOpen(true)}
          onRunNow={handleRunNow}
        />
        <TrendingEmptyState onConfigure={() => setSettingsPanelOpen(true)} />
        {prefs && <TrendingSettingsPanel
          open={settingsPanelOpen}
          prefs={prefs}
          onClose={() => setSettingsPanelOpen(false)}
          onSave={handleSave}
          audienceOptions={personaOptions.audiences}
          languageOptions={personaOptions.languages}
          topicOptions={personaOptions.topics}
          industryOptions={personaOptions.industries}
        />}
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden flex-col lg:flex-row lg:-m-5">
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
          showSidebar && !isDesktop ? "hidden" : "block p-5"
        )}
      >
        <div className="mb-12">
          <TrendingHeader
            enabled={hasConfig}
            prefs={prefs!}
            isRunning={isRunning}
            quotaExceeded={quotaExceeded}
            onOpenSettings={() => setSettingsPanelOpen(true)}
            onRunNow={handleRunNow}
          />
        </div>

        {!isDesktop && selectedRunId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRunId(null)}
            className="mb-4 h-8 gap-1 text-xs"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to runs
          </Button>
        )}

        {selectedRun && selectedRun.status === "failed" ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <p className="text-sm text-red-600">Error: {selectedRun.error}</p>
          </div>
        ) : selectedGenerations.length > 0 ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedGenerations.map((gen) => (
                <TrendingVariant key={gen.generationId} generation={gen} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            variant="centered"
            title="Trending Posts"
            description="Select a run from the sidebar to view generated posts."
            icon={<IconTrendingUp className="h-10 w-10 text-muted-foreground" />}
          />
        )}
      </div>

      {prefs && <TrendingSettingsPanel
        open={settingsPanelOpen}
        prefs={prefs}
        onClose={() => setSettingsPanelOpen(false)}
        onSave={handleSave}
        audienceOptions={personaOptions.audiences}
        languageOptions={personaOptions.languages}
        topicOptions={personaOptions.topics}
        industryOptions={personaOptions.industries}
      />}
    </div>
  )
}

export { TrendingShell }
