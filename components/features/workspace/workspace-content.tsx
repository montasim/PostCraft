"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MultiSelect } from "@/components/shared/multi-select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  INDUSTRY_OPTIONS,
  TOPIC_OPTIONS,
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  PLATFORM_OPTIONS,
} from "@/lib/constants"
import {
  IconCrown,
  IconCheck,
  IconPencil,
  IconX,
  IconFlame,
  IconArrowRight,
  IconTrendingUp,
  IconUserCircle,
} from "@tabler/icons-react"
import { toast } from "sonner"
import Link from "next/link"
import type { BrandPersona, PersonaOption } from "@/types"
import type { SelectOption } from "@/components/shared/multi-select"
import { API } from "@/lib/constants"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectWorkspace,
  selectWorkspaceStatus,
  updateWorkspace,
  fetchWorkspace,
} from "@/store/slices/workspace.slice"
import {
  selectTrendingPrefs,
  setTrendingPrefs,
} from "@/store/slices/trending-prefs.slice"
import { fetchPreviewPrefs } from "@/store/slices/preview-prefs.slice"
import { PreviewConfigCard } from "@/components/features/workspace/preview-config-card"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

function TrendingToggleCard() {
  const dispatch = useAppDispatch()
  const trendingPrefs = useAppSelector(selectTrendingPrefs)
  const enabled = trendingPrefs?.enabled ?? false

  async function handleToggle() {
    if (!trendingPrefs) return
    const updated: TrendingPrefs = { ...trendingPrefs, enabled: !enabled }
    await savePrefs(updated)
  }

  async function savePrefs(prefs: TrendingPrefs) {
    try {
      const res = await fetch(API.TRENDING_PREFS, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      })
      const result = await res.json()
      if (result.success && result.data) {
        dispatch(setTrendingPrefs(result.data))
        toast.success(enabled ? "Trending turned off" : "Trending turned on")
      }
    } catch {
      toast.error("Failed to update trending")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <IconTrendingUp className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm">Trending Posts</CardTitle>
        </div>
        <Switch checked={enabled} onCheckedChange={handleToggle} />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Auto-generate LinkedIn posts from trending dev topics on a custom
          schedule.
        </p>
        {enabled && (
          <div className="mt-3 flex items-center gap-1.5">
            <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Enabled</span>
            <span className="text-xs text-muted-foreground">·</span>
            <Link
              href="/trending"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Configure in Trending settings
              <IconArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/** Extract value strings from persona options */
function toValues(items: PersonaOption[]): string[] {
  return items.map((i) => i.value)
}

/** Reconstruct persona options from selected value strings + available options */
function fromValues(
  values: string[],
  available: SelectOption[]
): PersonaOption[] {
  const lookup = new Map(available.map((o) => [o.value, o]))
  return values.map((v) => {
    const found = lookup.get(v)
    return found
      ? {
          value: found.value,
          label: found.label,
          description: found.description,
        }
      : { value: v, label: v }
  })
}

// ─── Brand Persona Card ────────────────────────────────────────────

function BrandPersonaCard({
  persona,
  onSave,
}: {
  persona: BrandPersona
  onSave: (persona: BrandPersona) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(persona)

  const handleSave = () => {
    onSave(draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(persona)
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconUserCircle className="h-4 w-4 text-primary" />
          Brand persona
          <Badge variant="secondary" className="text-[10px]">
            {persona.targetAudiences.length} audiences
          </Badge>
          {(persona.platforms ?? []).length > 0 && (
            <Badge variant="secondary" className="text-[10px]">
              {(persona.platforms ?? []).length} platforms
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-7 gap-1 text-xs"
            onClick={
              editing
                ? handleCancel
                : () => {
                    setDraft(persona)
                    setEditing(true)
                  }
            }
          >
            {editing ? (
              <>
                <IconX className="h-3 w-3" />
                Cancel
              </>
            ) : (
              <>
                <IconPencil className="h-3 w-3" />
                Edit
              </>
            )}
          </Button>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Define who you write for and how you sound
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Target audiences</Label>
              <MultiSelect
                options={AUDIENCE_OPTIONS}
                selected={toValues(draft.targetAudiences)}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    targetAudiences: fromValues(v, AUDIENCE_OPTIONS),
                  }))
                }
                placeholder="Select audiences..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Preferred tones</Label>
              <MultiSelect
                options={TONE_OPTIONS}
                selected={toValues(draft.preferredTones)}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    preferredTones: fromValues(v, TONE_OPTIONS),
                  }))
                }
                placeholder="Select tones..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <MultiSelect
                options={LANGUAGE_OPTIONS}
                selected={toValues(draft.language)}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    language: fromValues(v, LANGUAGE_OPTIONS),
                  }))
                }
                placeholder="Select languages..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Topics / Keywords</Label>
              <MultiSelect
                options={TOPIC_OPTIONS}
                selected={toValues(draft.topics)}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    topics: fromValues(v, TOPIC_OPTIONS),
                  }))
                }
                placeholder="Select topics..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Industry</Label>
              <MultiSelect
                options={INDUSTRY_OPTIONS}
                selected={toValues(draft.industry)}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    industry: fromValues(v, INDUSTRY_OPTIONS),
                  }))
                }
                placeholder="Select industries..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Platforms</Label>
              <MultiSelect
                options={PLATFORM_OPTIONS}
                selected={toValues(draft.platforms ?? [])}
                onChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    platforms: fromValues(v, PLATFORM_OPTIONS),
                  }))
                }
                placeholder="Select platforms..."
                creatable
              />
            </div>
            <Button
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={handleSave}
            >
              <IconCheck className="h-3 w-3" />
              Save changes
            </Button>
          </>
        ) : (
          <>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">
                Target audiences
              </p>
              <div className="flex flex-wrap gap-1">
                {persona.targetAudiences.length > 0 ? (
                  persona.targetAudiences.map((a) => (
                    <Badge
                      key={a.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {a.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">
                Preferred tones
              </p>
              <div className="flex flex-wrap gap-1">
                {persona.preferredTones.length > 0 ? (
                  persona.preferredTones.map((t) => (
                    <Badge
                      key={t.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {t.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">Language</p>
              <div className="flex flex-wrap gap-1">
                {persona.language.length > 0 ? (
                  persona.language.map((l) => (
                    <Badge
                      key={l.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {l.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">
                Topics / Keywords
              </p>
              <div className="flex flex-wrap gap-1">
                {(persona.topics ?? []).length > 0 ? (
                  (persona.topics ?? []).map((t) => (
                    <Badge
                      key={t.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {t.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">Industry</p>
              <div className="flex flex-wrap gap-1">
                {(persona.industry ?? []).length > 0 ? (
                  (persona.industry ?? []).map((i) => (
                    <Badge
                      key={i.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {i.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-muted-foreground">Platforms</p>
              <div className="flex flex-wrap gap-1">
                {(persona.platforms ?? []).length > 0 ? (
                  (persona.platforms ?? []).map((p) => (
                    <Badge
                      key={p.value}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {p.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs">—</p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Usage & Plan Card ─────────────────────────────────────────────

function UsagePlanCard({ used, limit }: { used: number; limit: number }) {
  const percent = Math.round((used / limit) * 100)
  const remaining = limit - used

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconCrown className="h-4 w-4 text-primary" />
          Usage & plan
          <Badge variant="secondary" className="ml-auto text-[10px]">
            Free Plan
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Track your content generation usage
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {used} of {limit} posts used
            </span>
            <span
              className={cn(
                "font-medium",
                remaining <= 1 ? "text-destructive" : "text-primary"
              )}
            >
              {remaining} remaining
            </span>
          </div>
          <Progress value={percent} className="h-2" />
          {remaining <= 2 && (
            <p className="text-[10px] text-destructive">
              Running low on posts. Upgrade to keep your streak going.
            </p>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">{used} posts generated</p>
            <p className="text-[10px] text-muted-foreground">
              Since you started
            </p>
          </div>
          <Button size="sm" className="h-7 gap-1 text-xs">
            <IconCrown className="h-3.5 w-3.5" />
            Upgrade Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

function WorkspaceContent() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectWorkspace)
  const status = useAppSelector(selectWorkspaceStatus)

  const loading = status === "idle" || status === "loading"

  const saveWorkspace = useCallback(
    async (updates: { persona?: BrandPersona }) => {
      if (!data) return
      dispatch(updateWorkspace(updates))

      try {
        const res = await fetch(API.WORKSPACE, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        })
        const result = await res.json()
        if (!result.success) {
          dispatch(fetchWorkspace())
          toast.error("Failed to save")
        }
      } catch {
        dispatch(fetchWorkspace())
        toast.error("Failed to save")
      }
    },
    [data, dispatch]
  )

  const handlePersonaSave = (persona: BrandPersona) => {
    saveWorkspace({ persona })
  }

  useEffect(() => {
    dispatch(fetchPreviewPrefs())
  }, [dispatch])

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-1 h-4 w-20 rounded-full" />
                <Skeleton className="ml-auto h-7 w-14 rounded-md" />
              </div>
              <Skeleton className="h-3 w-52" />
            </div>
            <div className="space-y-4 p-4">
              {[
                "Target audiences",
                "Preferred tones",
                "Language",
                "Topics / Keywords",
                "Industry",
                "Platforms",
              ].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-24" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-28 rounded-full" />
                  </div>
                </div>
              ))}
              <Skeleton className="h-7 w-28 rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="ml-auto h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3 w-52" />
            </div>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2.5 w-24" />
                </div>
                <Skeleton className="h-7 w-28 rounded-md" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-0">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-5 w-9 rounded-full" />
            </div>
            <div className="p-4">
              <Skeleton className="mb-3 h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <div className="mt-3 flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-1" />
                <Skeleton className="h-3 w-44" />
              </div>
            </div>
          </div>

          {/* Preview config skeleton */}
          <div className="rounded-xl border p-0">
            <div className="border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-3 p-4">
              <Skeleton className="h-3 w-48" />
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <BrandPersonaCard persona={data.persona} onSave={handlePersonaSave} />
      </div>
      <div className="space-y-4">
        <UsagePlanCard used={data.usage.used} limit={data.usage.limit} />
        <TrendingToggleCard />
        <PreviewConfigCard />
      </div>
    </div>
  )
}

export { WorkspaceContent }
