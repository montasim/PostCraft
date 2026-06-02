"use client"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectProfile,
  selectProfileStats,
  selectProfileStatus,
  updateProfile,
  fetchProfile,
} from "@/store/slices/profile.slice"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  IconUser,
  IconPencil,
  IconCheck,
  IconX,
  IconMapPin,
  IconWorld,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconCalendar,
  IconTarget,
  IconShare,
} from "@tabler/icons-react"
import { toast } from "sonner"
import { API } from "@/lib/constants"
import type { UserProfile } from "@/types"

// ─── Profile Header Card ──────────────────────────────────────────

function ProfileHeaderCard({
  profile,
  onUpdate,
}: {
  profile: UserProfile
  onUpdate: (updates: Partial<UserProfile>) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    fullName: profile.fullName,
    title: profile.title,
    company: profile.company,
  })

  const handleSave = () => {
    onUpdate({
      fullName: draft.fullName,
      title: draft.title,
      company: draft.company,
    })
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
          Your creator identity
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
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            className="!h-20 !w-20 sm:!h-24 sm:!w-24 lg:!h-32 lg:!w-32"
          >
            <AvatarFallback className="text-lg sm:text-xl">
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
                  Save profile
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
  onUpdate: (updates: Partial<UserProfile>) => void
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
    onUpdate({
      bio: draft.bio,
      location: draft.location,
      website: draft.website,
      twitterHandle: draft.twitterHandle,
      linkedInSlug: draft.linkedInSlug,
    })
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
          <IconShare className="h-4 w-4 text-primary" />
          Your presence
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
      <CardContent className="space-y-4">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Bio</Label>
              <Textarea
                value={draft.bio}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, bio: e.target.value }))
                }
                placeholder="Share what drives your work, your expertise, and what makes your perspective unique..."
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
                placeholder="Your city or region"
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
                placeholder="https://yourwebsite.com"
                className="h-8 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs">X</Label>
                <Input
                  value={draft.twitterHandle}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, twitterHandle: e.target.value }))
                  }
                  placeholder="x.com/yourprofile"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">LinkedIn</Label>
                <Input
                  value={draft.linkedInSlug}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, linkedInSlug: e.target.value }))
                  }
                  placeholder="linkedin.com/in/yourprofile"
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
              <p className="text-xs leading-relaxed">{profile.bio}</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconMapPin className="h-3 w-3 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconWorld className="h-3 w-3 text-muted-foreground" />
              <a
                href={profile.website?.startsWith("http") ? profile.website : `https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.website}
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconBrandTwitter className="h-3 w-3 text-muted-foreground" />
              <a
                href={profile.twitterHandle?.startsWith("http") ? profile.twitterHandle : `https://x.com/${profile.twitterHandle?.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                x.com/{profile.twitterHandle?.replace("@", "")}
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <IconBrandLinkedin className="h-3 w-3 text-muted-foreground" />
              <a
                href={`https://linkedin.com/in/${profile.linkedInSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                linkedin.com/in/{profile.linkedInSlug}
              </a>
            </div>
          </>
        )}
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
        <p className="text-xs font-medium">Profile {percent}% complete</p>
        <p className="text-[10px] text-muted-foreground">
          {percent < 100
            ? `Add ${missing.map((m) => m.label).join(", ")} so your content reflects the real you`
            : "Your profile is complete. Your posts will reflect the real you."}
        </p>
      </div>
      <Progress value={percent} className="h-2 w-32" />
    </div>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

function ProfileContent() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const profileStatus = useAppSelector(selectProfileStatus)
  const stats = useAppSelector(selectProfileStats)

  const loading = profileStatus === "idle" || profileStatus === "loading"

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile())
    }
  }, [profileStatus, dispatch])

  const saveProfile = async (updates: Record<string, string>) => {
    if (!profile) return
    dispatch(updateProfile(updates))

    try {
      const res = await fetch(API.PROFILE, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      const result = await res.json()
      if (!result.success) {
        dispatch(fetchProfile())
        toast.error("Failed to save")
      }
    } catch {
      dispatch(fetchProfile())
      toast.error("Failed to save")
    }
  }

  const handleUpdate = (updates: Partial<UserProfile>) => {
    saveProfile(updates as Record<string, string>)
  }

  if (loading || !profile || !stats) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg border px-4 py-3">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-2 w-52" />
          </div>
          <Skeleton className="h-2 w-32 rounded-full" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-[40%]">
            <div className="h-full rounded-xl border p-4">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-auto h-7 w-16 rounded-md" />
              </div>
              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:items-start">
                <Skeleton className="h-24 w-24 shrink-0 rounded-full sm:h-32 sm:w-32" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-3 w-36" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[60%]">
            <div className="h-full rounded-xl border p-4">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-auto h-7 w-16 rounded-md" />
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-1.5">
                      <Skeleton className="h-3 w-16" />
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-7 w-20 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ProfileCompletionCard profile={profile} />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-[40%] [&_>div]:h-full">
          <ProfileHeaderCard profile={profile} onUpdate={handleUpdate} />
        </div>
        <div className="w-full lg:w-[60%] [&_>div]:h-full">
          <ProfileDetailsCard profile={profile} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  )
}

export { ProfileContent }
