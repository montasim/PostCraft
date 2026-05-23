"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  IconBell,
  IconPalette,
  IconShield,
  IconTrash,
  IconAlertTriangle,
  IconKey,
  IconClock,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
  IconRefresh,
} from "@tabler/icons-react"
import { toast } from "sonner"
import type {
  NotificationSettings,
  AppearanceSettings,
  AccountSettings,
} from "@/types"

// ─── Notification Settings Card ────────────────────────────────────

function NotificationSettingsCard({
  settings,
  onUpdate,
}: {
  settings: NotificationSettings
  onUpdate: <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => void
}) {
  const items = [
    {
      key: "emailGenerationComplete" as const,
      label: "Generation complete",
      description: "Get notified when a post is generated",
    },
    {
      key: "emailWeeklyDigest" as const,
      label: "Weekly digest",
      description: "Receive a weekly summary of activity",
    },
    {
      key: "emailProductUpdates" as const,
      label: "Product updates",
      description: "Hear about new features and improvements",
    },
    {
      key: "pushPostReminder" as const,
      label: "Post reminder",
      description: "Remind you to post when your streak is at risk",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBell className="h-4 w-4 text-primary" />
          Notifications
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Choose how you want to be notified
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item, i) => (
          <div key={item.key}>
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch
                checked={settings[item.key]}
                onCheckedChange={(v) => onUpdate(item.key, v)}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// ─── Appearance Settings Card ──────────────────────────────────────

function AppearanceSettingsCard({
  settings,
  onUpdate,
}: {
  settings: AppearanceSettings
  onUpdate: <K extends keyof AppearanceSettings>(key: K, value: AppearanceSettings[K]) => void
}) {
  const themeOptions = [
    { value: "system" as const, label: "System", icon: IconDeviceDesktop },
    { value: "dark" as const, label: "Dark", icon: IconMoon },
    { value: "light" as const, label: "Light", icon: IconSun },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconPalette className="h-4 w-4 text-primary" />
          Appearance
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Customize how LinkedIQ looks for you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Theme</Label>
          <div className="flex gap-5">
            {themeOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={settings.theme === opt.value ? "default" : "outline"}
                size="sm"
                className={cn("h-8 flex-1 gap-1 text-xs")}
                onClick={() => onUpdate("theme", opt.value)}
              >
                <opt.icon className="h-3 w-3" />
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Account Security Card ─────────────────────────────────────────

function AccountSecurityCard({
  settings,
  onUpdate,
}: {
  settings: AccountSettings
  onUpdate: <K extends keyof AccountSettings>(key: K, value: AccountSettings[K]) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconShield className="h-4 w-4 text-primary" />
          Account security
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Manage your account security settings
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconKey className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div className="space-y-1.5">
              <p className="text-xs font-medium">Two-factor authentication</p>
              <p className="text-[10px] text-muted-foreground">
                {settings.twoFactorEnabled
                  ? "Extra security layer is enabled"
                  : "Add an extra layer of security to your account"}
              </p>
            </div>
          </div>
          <Switch
            checked={settings.twoFactorEnabled}
            onCheckedChange={(v) => onUpdate("twoFactorEnabled", v)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconClock className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div className="space-y-1.5">
              <p className="text-xs font-medium">Session timeout</p>
              <p className="text-[10px] text-muted-foreground">
                Automatically sign out after inactivity
              </p>
            </div>
          </div>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => onUpdate("sessionTimeout", Number(e.target.value))}
            className="flex h-8 rounded-lg border border-input bg-transparent px-3 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
          >
            <option value={15}>15 mins</option>
            <option value={30}>30 mins</option>
            <option value={60}>60 mins</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-medium">Password</p>
            <p className="text-[10px] text-muted-foreground">
              Last changed 30 days ago
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <IconKey className="h-3 w-3" />
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Danger Zone Card ──────────────────────────────────────────────

function DangerZoneCard({ onReset }: { onReset: () => void }) {
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
      <CardContent className="space-y-4">
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
                <Button variant="destructive" size="sm" onClick={() => { onReset(); setResetOpen(false) }}>
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

interface SettingsData {
  notifications: NotificationSettings
  appearance: AppearanceSettings
  account: AccountSettings
}

function SettingsContent() {
  const [data, setData] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings")
        const result = await res.json()
        if (result.success) setData(result.data)
      } catch {
        toast.error("Failed to load settings")
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const saveSettings = async (updates: Partial<SettingsData>) => {
    if (!data) return
    const previous = data
    setData((prev) => prev ? { ...prev, ...updates } : prev)

    try {
      const res = await fetch("/api/settings", {
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
  }

  const handleNotificationUpdate = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    if (!data) return
    const updated = { ...data.notifications, [key]: value }
    saveSettings({ notifications: updated })
  }

  const handleAppearanceUpdate = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => {
    if (!data) return
    const updated = { ...data.appearance, [key]: value }
    saveSettings({ appearance: updated })
  }

  const handleAccountUpdate = <K extends keyof AccountSettings>(
    key: K,
    value: AccountSettings[K]
  ) => {
    if (!data) return
    const updated = { ...data.account, [key]: value }
    saveSettings({ account: updated })
  }

  const handleReset = () => {
    saveSettings({
      notifications: { emailGenerationComplete: true, emailWeeklyDigest: true, emailProductUpdates: false, pushPostReminder: true },
      appearance: { theme: "system", compactMode: false, fontSize: "default" },
      account: { twoFactorEnabled: false, sessionTimeout: 30, dataExportFormat: "json" },
    })
  }

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <NotificationSettingsCard settings={data.notifications} onUpdate={handleNotificationUpdate} />
          <AppearanceSettingsCard settings={data.appearance} onUpdate={handleAppearanceUpdate} />
        </div>
        <div className="space-y-5">
          <AccountSecurityCard settings={data.account} onUpdate={handleAccountUpdate} />
          <DangerZoneCard onReset={handleReset} />
        </div>
      </div>
    </div>
  )
}

export { SettingsContent }
