"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { USER_PROFILE, PROFILE_STATS } from "@/lib/constants"
import {
  IconUser,
  IconPencil,
  IconCheck,
  IconX,
  IconFlame,
  IconTrophy,
  IconMedal,
  IconStar,
  IconLock,
  IconMapPin,
  IconWorld,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconCalendar,
  IconTarget,
} from "@tabler/icons-react"
import type { UserProfile, ProfileStats } from "@/types"

// ─── Profile Header Card ──────────────────────────────────────────

function ProfileHeaderCard({
  profile,
  onUpdate,
}: {
  profile: UserProfile
  onUpdate: (field: keyof UserProfile, value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    fullName: profile.fullName,
    title: profile.title,
    company: profile.company,
  })

  const handleSave = () => {
    onUpdate("fullName", draft.fullName)
    onUpdate("title", draft.title)
    onUpdate("company", draft.company)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft({
      fullName: profile.fullName,
      title: profile.title,
      company: profile.company,
    })
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconUser className="h-4 w-4 text-primary" />
          Personal info
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-7 gap-1 text-xs"
            onClick={editing ? handleCancel : () => setEditing(true)}
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
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback className="text-xs">
              {profile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Full name</Label>
                  <Input
                    value={draft.fullName}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, fullName: e.target.value }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={draft.title}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, title: e.target.value }))
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Company</Label>
                    <Input
                      value={draft.company}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, company: e.target.value }))
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={handleSave}
                >
                  <IconCheck className="h-3 w-3" />
                  Save changes
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold">{profile.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.title} @ {profile.company}
                </p>
              </>
            )}
          </div>
        </div>
        {!editing && (
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <IconCalendar className="h-3 w-3" />
            Member since{" "}
            {new Date(profile.joinedDate).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Profile Details Card ─────────────────────────────────────────

function ProfileDetailsCard({
  profile,
  onUpdate,
}: {
  profile: UserProfile
  onUpdate: (field: keyof UserProfile, value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
    twitterHandle: profile.twitterHandle,
    linkedInSlug: profile.linkedInSlug,
  })

  const handleSave = () => {
    onUpdate("bio", draft.bio)
    onUpdate("location", draft.location)
    onUpdate("website", draft.website)
    onUpdate("twitterHandle", draft.twitterHandle)
    onUpdate("linkedInSlug", draft.linkedInSlug)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft({
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      twitterHandle: profile.twitterHandle,
      linkedInSlug: profile.linkedInSlug,
    })
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconTarget className="h-4 w-4 text-primary" />
          Profile details
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-7 gap-1 text-xs"
            onClick={editing ? handleCancel : () => setEditing(true)}
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
      </CardHeader>
      <CardContent className="space-y-3">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Bio</Label>
              <Textarea
                value={draft.bio}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, bio: e.target.value }))
                }
                className="min-h-20 text-xs"
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Location</Label>
              <Input
                value={draft.location}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, location: e.target.value }))
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Website</Label>
              <Input
                value={draft.website}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, website: e.target.value }))
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Twitter</Label>
                <Input
                  value={draft.twitterHandle}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, twitterHandle: e.target.value }))
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">LinkedIn slug</Label>
                <Input
                  value={draft.linkedInSlug}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, linkedInSlug: e.target.value }))
                  }
                  className="h-8 text-xs"
                />
              </div>
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
              <p className="text-xs text-muted-foreground mb-1">Bio</p>
              <p className="text-xs leading-relaxed">{profile.bio}</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconMapPin className="h-3 w-3 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconWorld className="h-3 w-3 text-muted-foreground" />
              <span className="text-primary hover:underline cursor-pointer">
                {profile.website}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconBrandTwitter className="h-3 w-3 text-muted-foreground" />
              <span>{profile.twitterHandle}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconBrandLinkedin className="h-3 w-3 text-muted-foreground" />
              <span className="text-primary hover:underline cursor-pointer">
                linkedin.com/in/{profile.linkedInSlug}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Profile Stats Card ───────────────────────────────────────────

function ProfileStatsCard({ stats }: { stats: ProfileStats }) {
  const statItems = [
    {
      icon: IconTrophy,
      value: stats.postsGenerated,
      label: "Posts generated",
    },
    {
      icon: IconFlame,
      value: stats.currentStreak,
      label: "Current streak",
      highlight: true,
    },
    {
      icon: IconMedal,
      value: stats.longestStreak,
      label: "Longest streak",
    },
    {
      icon: IconStar,
      value: stats.avgScore,
      label: "Avg. score",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconFlame className="h-4 w-4 text-primary" />
          Your stats
          <Badge variant="secondary" className="ml-auto gap-1 text-[10px]">
            Top {stats.topPercentile}% of creators
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md bg-muted",
                  item.highlight && "bg-orange-500/10 text-orange-500"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    item.highlight ? "text-orange-500" : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.value}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Profile Completion Card ───────────────────────────────────────

function ProfileCompletionCard({ profile }: { profile: UserProfile }) {
  const fields: { key: keyof UserProfile; label: string }[] = [
    { key: "fullName", label: "Full name" },
    { key: "bio", label: "Bio" },
    { key: "location", label: "Location" },
    { key: "title", label: "Job title" },
    { key: "company", label: "Company" },
    { key: "website", label: "Website" },
    { key: "twitterHandle", label: "Twitter handle" },
    { key: "linkedInSlug", label: "LinkedIn slug" },
    { key: "avatarUrl", label: "Avatar" },
  ]

  const filled = fields.filter((f) => !!profile[f.key])
  const percent = Math.round((filled.length / fields.length) * 100)
  const missing = fields.filter((f) => !profile[f.key])

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3">
      <div className="flex-1">
        <p className="text-xs font-medium">
          Your profile is {percent}% complete
        </p>
        <p className="text-[10px] text-muted-foreground">
          {percent < 100
            ? `Add ${missing.map((m) => m.label).join(", ")} to complete your profile`
            : "All set — your profile is fully filled out!"}
        </p>
      </div>
      <Progress value={percent} className="h-2 w-32" />
    </div>
  )
}

// ─── Profile Achievements Card ─────────────────────────────────────

function ProfileAchievementsCard() {
  const badges = [
    {
      icon: IconTrophy,
      label: "First Post",
      description: "Created your first post",
      active: true,
    },
    {
      icon: IconFlame,
      label: "10 Streak",
      description: "10-day posting streak",
      active: PROFILE_STATS.longestStreak >= 10,
    },
    {
      icon: IconStar,
      label: "Top 10%",
      description: "Reach top 10% of creators",
      active: PROFILE_STATS.topPercentile <= 10,
    },
    {
      icon: IconMedal,
      label: "50 Posts",
      description: "Generate 50 posts",
      active: PROFILE_STATS.postsGenerated >= 50,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconMedal className="h-4 w-4 text-primary" />
          Achievements
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {badges.filter((b) => b.active).length}/{badges.length} unlocked
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3 py-2.5",
                !badge.active && "opacity-50"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  badge.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                {badge.active ? (
                  <badge.icon className="h-4 w-4" />
                ) : (
                  <IconLock className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

function ProfileContent() {
  const [profile, setProfile] = useState<UserProfile>(USER_PROFILE)

  const handleUpdate = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-5">
      <ProfileCompletionCard profile={profile} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <ProfileHeaderCard profile={profile} onUpdate={handleUpdate} />
          <ProfileStatsCard stats={PROFILE_STATS} />
        </div>
        <div className="space-y-5">
          <ProfileDetailsCard profile={profile} onUpdate={handleUpdate} />
          <ProfileAchievementsCard />
        </div>
      </div>
    </div>
  )
}

export { ProfileContent }
