"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  PLAN_LIMIT,
} from "@/lib/constants"
import {
  IconBuilding,
  IconBrandLinkedin,
  IconCrown,
  IconCheck,
  IconPencil,
  IconX,
  IconFlame,
  IconArrowRight,
} from "@tabler/icons-react"
import { toast } from "sonner"
import Link from "next/link"
import type { WorkspaceProfile, BrandPersona, PersonaOption } from "@/types"
import type { SelectOption } from "@/components/shared/multi-select"

function TrendingToggleCard() {
  const [enabled, setEnabled] = useState(true)
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <IconFlame className="h-4 w-4 text-orange-500" />
          <CardTitle className="text-sm">Trending Posts</CardTitle>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Auto-generate LinkedIn posts from trending dev topics on a custom schedule.
        </p>
        {enabled && (
          <div className="mt-3 flex items-center gap-1.5">
            <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Enabled</span>
            <span className="text-xs text-muted-foreground">·</span>
            <Link href="/trending" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
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
function fromValues(values: string[], available: SelectOption[]): PersonaOption[] {
  const lookup = new Map(available.map((o) => [o.value, o]))
  return values.map((v) => {
    const found = lookup.get(v)
    return found
      ? { value: found.value, label: found.label, description: found.description }
      : { value: v, label: v }
  })
}

// ─── Workspace Profile Card ────────────────────────────────────────

function WorkspaceProfileCard({
  profile,
  onSave,
}: {
  profile: WorkspaceProfile
  onSave: (profile: WorkspaceProfile) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)

  const handleSave = () => {
    onSave(draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(profile)
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBuilding className="h-4 w-4 text-primary" />
          Workspace profile
          <Badge variant="secondary" className="text-[10px]">
            <IconCrown className="h-3 w-3" />
            Owner
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-7 gap-1 text-xs"
            onClick={editing ? handleCancel : () => { setDraft(profile); setEditing(true) }}
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
          Define your workspace identity
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Input
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Industry</Label>
              <select
                value={draft.industry}
                onChange={(e) => setDraft((d) => ({ ...d, industry: e.target.value }))}
                className="flex h-8 w-full rounded-lg border border-input bg-transparent px-3 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <Button size="sm" className="h-7 gap-1 text-xs" onClick={handleSave}>
              <IconCheck className="h-3 w-3" />
              Save changes
            </Button>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Name</p>
              <p className="text-xs">{profile.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Description</p>
              <p className="text-xs">{profile.description || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Industry</p>
              <p className="text-xs">{profile.industry || "—"}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
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
          <IconBrandLinkedin className="h-4 w-4 text-primary" />
          Brand persona
          <Badge variant="secondary" className="text-[10px]">
            {persona.targetAudiences.length} audiences
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-7 gap-1 text-xs"
            onClick={editing ? handleCancel : () => { setDraft(persona); setEditing(true) }}
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
      <CardContent className="space-y-3">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Target audiences</Label>
              <MultiSelect
                options={AUDIENCE_OPTIONS}
                selected={toValues(draft.targetAudiences)}
                onChange={(v) => setDraft((d) => ({ ...d, targetAudiences: fromValues(v, AUDIENCE_OPTIONS) }))}
                placeholder="Select audiences..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Preferred tones</Label>
              <MultiSelect
                options={TONE_OPTIONS}
                selected={toValues(draft.preferredTones)}
                onChange={(v) => setDraft((d) => ({ ...d, preferredTones: fromValues(v, TONE_OPTIONS) }))}
                placeholder="Select tones..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <MultiSelect
                options={LANGUAGE_OPTIONS}
                selected={toValues(draft.language)}
                onChange={(v) => setDraft((d) => ({ ...d, language: fromValues(v, LANGUAGE_OPTIONS) }))}
                placeholder="Select languages..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Topics / Keywords</Label>
              <MultiSelect
                options={TOPIC_OPTIONS}
                selected={toValues(draft.topics)}
                onChange={(v) => setDraft((d) => ({ ...d, topics: fromValues(v, TOPIC_OPTIONS) }))}
                placeholder="Select topics..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Industry</Label>
              <MultiSelect
                options={INDUSTRY_OPTIONS}
                selected={toValues(draft.industry)}
                onChange={(v) => setDraft((d) => ({ ...d, industry: fromValues(v, INDUSTRY_OPTIONS) }))}
                placeholder="Select industries..."
                creatable
              />
            </div>
            <Button size="sm" className="h-7 gap-1 text-xs" onClick={handleSave}>
              <IconCheck className="h-3 w-3" />
              Save changes
            </Button>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Target audiences</p>
              <div className="flex flex-wrap gap-1">
                {persona.targetAudiences.length > 0 ? persona.targetAudiences.map((a) => (
                  <Badge key={a.value} variant="secondary" className="text-[10px]">{a.label}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Preferred tones</p>
              <div className="flex flex-wrap gap-1">
                {persona.preferredTones.length > 0 ? persona.preferredTones.map((t) => (
                  <Badge key={t.value} variant="secondary" className="text-[10px]">{t.label}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Language</p>
              <div className="flex flex-wrap gap-1">
                {persona.language.length > 0 ? persona.language.map((l) => (
                  <Badge key={l.value} variant="secondary" className="text-[10px]">{l.label}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Topics / Keywords</p>
              <div className="flex flex-wrap gap-1">
                {(persona.topics ?? []).length > 0 ? (persona.topics ?? []).map((t) => (
                  <Badge key={t.value} variant="secondary" className="text-[10px]">{t.label}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Industry</p>
              <div className="flex flex-wrap gap-1">
                {(persona.industry ?? []).length > 0 ? (persona.industry ?? []).map((i) => (
                  <Badge key={i.value} variant="secondary" className="text-[10px]">{i.label}</Badge>
                )) : <p className="text-xs">—</p>}
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
            <span className={cn("font-medium", remaining <= 1 ? "text-destructive" : "text-primary")}>
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
            <p className="text-[10px] text-muted-foreground">Since you started</p>
          </div>
          <Button size="sm" className="h-7 gap-1 text-xs">
            Upgrade Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

interface WorkspaceData {
  profile: WorkspaceProfile
  persona: BrandPersona
  usage: { used: number; limit: number; totalGenerated: number }
}

function WorkspaceContent() {
  const [data, setData] = useState<WorkspaceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkspace() {
      try {
        const res = await fetch("/api/workspace")
        const result = await res.json()
        if (result.success) setData(result.data)
      } catch {
        toast.error("Failed to load workspace")
      } finally {
        setLoading(false)
      }
    }
    fetchWorkspace()
  }, [])

  const saveWorkspace = useCallback(async (updates: { profile?: WorkspaceProfile; persona?: BrandPersona }) => {
    if (!data) return
    const previous = data
    setData((prev) => prev ? { ...prev, ...updates } : prev)

    try {
      const res = await fetch("/api/workspace", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      const result = await res.json()
      if (!result.success) {
        setData(previous)
        toast.error("Failed to save")
      }
    } catch {
      setData(previous)
      toast.error("Failed to save")
    }
  }, [data])

  const handleProfileSave = (profile: WorkspaceProfile) => {
    saveWorkspace({ profile })
  }

  const handlePersonaSave = (persona: BrandPersona) => {
    saveWorkspace({ persona })
  }

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="space-y-5">
        <WorkspaceProfileCard profile={data.profile} onSave={handleProfileSave} />
        <UsagePlanCard used={data.usage.used} limit={data.usage.limit} />
      </div>
      <div className="space-y-5">
        <BrandPersonaCard persona={data.persona} onSave={handlePersonaSave} />
        <TrendingToggleCard />
      </div>
    </div>
  )
}

export { WorkspaceContent }
