"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MultiSelect } from "@/components/shared/multi-select"
import { cn } from "@/lib/utils"
import {
  WORKSPACE_PROFILE,
  WORKSPACE_PERSONA,
  WORKSPACE_LINKEDIN,
  INDUSTRY_OPTIONS,
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  POSTS_USED,
  PLAN_LIMIT,
} from "@/lib/constants"
import {
  IconBuilding,
  IconBrandLinkedin,
  IconCrown,
  IconTrash,
  IconRefresh,
  IconCheck,
  IconPlugConnected,
  IconPlugConnectedX,
  IconAlertTriangle,
} from "@tabler/icons-react"
import type { WorkspaceProfile, BrandPersona, LinkedInConnection } from "@/types"

// ─── Profile Completion Bar ────────────────────────────────────────

function ProfileCompletionBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3">
      <div className="flex-1">
        <p className="text-xs font-medium">
          Your workspace is {percent}% complete
        </p>
        <p className="text-[10px] text-muted-foreground">
          {percent < 100 ? "Complete all fields to unlock full potential" : "All configured — you're all set!"}
        </p>
      </div>
      <Progress value={percent} className="h-2 w-32" />
    </div>
  )
}

// ─── Workspace Profile Card ────────────────────────────────────────

function WorkspaceProfileCard({
  profile,
  onUpdate,
}: {
  profile: WorkspaceProfile
  onUpdate: (field: keyof WorkspaceProfile, value: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBuilding className="h-4 w-4 text-primary" />
          Workspace profile
          <Badge variant="secondary" className="ml-auto text-[10px]">
            <IconCrown className="h-3 w-3" />
            Owner
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Define your workspace identity
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => onUpdate("name", e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Description</Label>
          <Input
            value={profile.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Industry</Label>
          <select
            value={profile.industry}
            onChange={(e) => onUpdate("industry", e.target.value)}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-3 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">LinkedIn URL</Label>
          <Input
            value={profile.linkedInUrl}
            onChange={(e) => onUpdate("linkedInUrl", e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="h-8 text-xs"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Brand Persona Card ────────────────────────────────────────────

function BrandPersonaCard({
  persona,
  onUpdate,
}: {
  persona: BrandPersona
  onUpdate: (field: keyof BrandPersona, value: string | string[]) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBrandLinkedin className="h-4 w-4 text-primary" />
          Brand persona
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {persona.targetAudiences.length} audiences
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Define who you write for and how you sound
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Target audiences</Label>
          <MultiSelect
            options={AUDIENCE_OPTIONS}
            selected={persona.targetAudiences}
            onChange={(v) => onUpdate("targetAudiences", v)}
            placeholder="Select audiences..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Preferred tones</Label>
          <MultiSelect
            options={TONE_OPTIONS}
            selected={persona.preferredTones}
            onChange={(v) => onUpdate("preferredTones", v)}
            placeholder="Select tones..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Language</Label>
          <select
            value={persona.language}
            onChange={(e) => onUpdate("language", e.target.value)}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-3 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── LinkedIn Connection Card ──────────────────────────────────────

function LinkedInConnectionCard({
  linkedIn,
}: {
  linkedIn: LinkedInConnection
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBrandLinkedin className="h-4 w-4 text-[#0A66C2]" />
          LinkedIn connection
          {linkedIn.connected ? (
            <Badge variant="secondary" className="ml-auto gap-1 text-[10px] text-emerald-600">
              <IconCheck className="h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Badge variant="secondary" className="ml-auto gap-1 text-[10px] text-destructive">
              <IconPlugConnectedX className="h-3 w-3" />
              Disconnected
            </Badge>
          )}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Link your LinkedIn to publish directly
        </p>
      </CardHeader>
      <CardContent>
        {linkedIn.connected ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="text-xs">
                {linkedIn.profileName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
              <AvatarBadge className="bg-emerald-500" />
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{linkedIn.profileName}</p>
              <p className="text-[10px] text-muted-foreground">
                Connected {new Date(linkedIn.connectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
              <IconPlugConnectedX className="h-3 w-3" />
              Disconnect
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full gap-2">
            <IconPlugConnected className="h-4 w-4" />
            Connect LinkedIn
          </Button>
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
            <p className="text-xs font-medium">15 posts generated</p>
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

// ─── Danger Zone Card ──────────────────────────────────────────────

function DangerZoneCard() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <IconAlertTriangle className="h-4 w-4" />
          Danger zone
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Irreversible actions — proceed with caution
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2">
          <div>
            <p className="text-xs font-medium">Delete workspace</p>
            <p className="text-[10px] text-muted-foreground">
              Permanently remove all data
            </p>
          </div>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-7 gap-1 text-xs">
                <IconTrash className="h-3 w-3" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete workspace?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your workspace and all associated data. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(false)}>
                  Delete workspace
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2">
          <div>
            <p className="text-xs font-medium">Reset settings</p>
            <p className="text-[10px] text-muted-foreground">
              Restore all defaults
            </p>
          </div>
          <Dialog open={resetOpen} onOpenChange={setResetOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs text-destructive hover:text-destructive">
                <IconRefresh className="h-3 w-3" />
                Reset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset all settings?</DialogTitle>
                <DialogDescription>
                  This will restore all workspace settings to their defaults. Your generated content will not be affected.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setResetOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setResetOpen(false)}>
                  Reset settings
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

function WorkspaceContent() {
  const [profile, setProfile] = useState<WorkspaceProfile>(WORKSPACE_PROFILE)
  const [persona, setPersona] = useState<BrandPersona>(WORKSPACE_PERSONA)
  const [linkedIn] = useState<LinkedInConnection>(WORKSPACE_LINKEDIN)

  const handleProfileUpdate = (field: keyof WorkspaceProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePersonaUpdate = (field: keyof BrandPersona, value: string | string[]) => {
    setPersona((prev) => ({ ...prev, [field]: value }))
  }

  const completionFields = [
    !!profile.name,
    !!profile.description,
    !!profile.industry,
    !!profile.linkedInUrl,
    persona.targetAudiences.length > 0,
    persona.preferredTones.length > 0,
    !!persona.language,
  ]
  const completionPercent = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  )

  return (
    <div className="space-y-5">
      <ProfileCompletionBar percent={completionPercent} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <WorkspaceProfileCard profile={profile} onUpdate={handleProfileUpdate} />
          <BrandPersonaCard persona={persona} onUpdate={handlePersonaUpdate} />
          <LinkedInConnectionCard linkedIn={linkedIn} />
        </div>
        <div className="space-y-5">
          <UsagePlanCard used={POSTS_USED} limit={PLAN_LIMIT} />
          <DangerZoneCard />
        </div>
      </div>
    </div>
  )
}

export { WorkspaceContent }
