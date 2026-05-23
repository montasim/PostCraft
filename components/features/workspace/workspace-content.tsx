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
import { cn } from "@/lib/utils"
import {
  INDUSTRY_OPTIONS,
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
} from "@tabler/icons-react"
import { toast } from "sonner"
import type { WorkspaceProfile, BrandPersona } from "@/types"

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
                  <option key={opt} value={opt}>{opt}</option>
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
                selected={draft.targetAudiences}
                onChange={(v) => setDraft((d) => ({ ...d, targetAudiences: v }))}
                placeholder="Select audiences..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Preferred tones</Label>
              <MultiSelect
                options={TONE_OPTIONS}
                selected={draft.preferredTones}
                onChange={(v) => setDraft((d) => ({ ...d, preferredTones: v }))}
                placeholder="Select tones..."
                creatable
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <MultiSelect
                options={LANGUAGE_OPTIONS}
                selected={draft.language}
                onChange={(v) => setDraft((d) => ({ ...d, language: v }))}
                placeholder="Select languages..."
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
                  <Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Preferred tones</p>
              <div className="flex flex-wrap gap-1">
                {persona.preferredTones.length > 0 ? persona.preferredTones.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                )) : <p className="text-xs">—</p>}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Language</p>
              <div className="flex flex-wrap gap-1">
                {persona.language.length > 0 ? persona.language.map((l) => (
                  <Badge key={l} variant="secondary" className="text-[10px]">{l}</Badge>
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
      </div>
    </div>
  )
}

export { WorkspaceContent }
