"use client"

import { useState, useEffect } from "react"
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
import { TRENDING_PREFS_DEFAULTS, type TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { MOCK_RUNS, MOCK_GENERATIONS } from "@/modules/trending/trending.mock"
import { IconArrowLeft, IconTrendingUp } from "@tabler/icons-react"
import { toast } from "sonner"

interface TrendingShellProps {
  runs?: ITrendingRun[]
  generations?: TrendingGenerationPreview[]
}

function TrendingShell({ runs = MOCK_RUNS, generations = MOCK_GENERATIONS }: TrendingShellProps) {
  const [prefs, setPrefs] = useState<TrendingPrefs>({ ...TRENDING_PREFS_DEFAULTS })
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedRunId, setSelectedRunId] = useState<string | null>(runs[0]?._id ?? null)
  const [personaOptions, setPersonaOptions] = useState<{
    audiences: SelectOption[]
    languages: SelectOption[]
    topics: SelectOption[]
    industries: SelectOption[]
  }>({ audiences: [], languages: [], topics: [], industries: [] })
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const hasConfig = prefs.enabled && prefs.platforms.length > 0

  useEffect(() => {
    fetch("/api/prefs/trending")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) setPrefs(res.data)
      })
      .catch(() => {})

    fetch("/api/workspace")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data.persona) {
          const persona = res.data.persona
          const toOptions = (items: { value: string; label: string; description?: string }[]) =>
            items.map((i) => ({ value: i.value, label: i.label, description: i.description }))
          setPersonaOptions({
            audiences: toOptions(persona.targetAudiences ?? []),
            languages: toOptions(persona.language ?? []),
            topics: toOptions(persona.topics ?? []),
            industries: toOptions(persona.industry ?? []),
          })
        }
      })
      .catch(() => {})
  }, [])

  function handleRunNow() {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 3000)
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
        setPrefs(result.data)
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

  // Mobile: show sidebar or detail based on selection
  const showDetail = selectedRunId && !isDesktop
  const showSidebar = !showDetail

  if (runs.length === 0 && !hasConfig) {
    return (
      <div className="flex flex-col gap-6">
        <TrendingHeader
          enabled={false}
          prefs={prefs}
          isRunning={isRunning}
          onOpenSettings={() => setSettingsPanelOpen(true)}
          onRunNow={handleRunNow}
        />
        <TrendingEmptyState onConfigure={() => setSettingsPanelOpen(true)} />
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
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden flex-col lg:flex-row lg:-m-5">
      {/* Sidebar */}
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

      {/* Detail */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          showSidebar && !isDesktop ? "hidden" : "block p-5"
        )}
      >
        <div className="mb-12">
          <TrendingHeader
            enabled={hasConfig}
            prefs={prefs}
            isRunning={isRunning}
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
    </div>
  )
}

export { TrendingShell }
