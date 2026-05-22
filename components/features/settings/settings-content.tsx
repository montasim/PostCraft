"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
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
  NOTIFICATION_DEFAULTS,
  PRIVACY_DEFAULTS,
  APPEARANCE_DEFAULTS,
  ACCOUNT_DEFAULTS,
} from "@/lib/constants"
import {
  IconBell,
  IconPalette,
  IconLock,
  IconDatabase,
  IconShield,
  IconDownload,
  IconUpload,
  IconTrash,
  IconAlertTriangle,
  IconKey,
  IconClock,
  IconEye,
  IconEyeOff,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from "@tabler/icons-react"
import type {
  NotificationSettings,
  PrivacySettings,
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
      <CardContent className="space-y-3">
        {items.map((item, i) => (
          <div key={item.key}>
            <div className="flex items-center justify-between">
              <div>
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
            {i < items.length - 1 && <Separator className="mt-3" />}
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

  const fontSizeOptions = [
    { value: "small" as const, label: "Small" },
    { value: "default" as const, label: "Default" },
    { value: "large" as const, label: "Large" },
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
          <div className="flex gap-1">
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

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Compact mode</p>
            <p className="text-[10px] text-muted-foreground">
              Reduce spacing and element sizes
            </p>
          </div>
          <Switch
            checked={settings.compactMode}
            onCheckedChange={(v) => onUpdate("compactMode", v)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Font size</Label>
          <div className="flex gap-1">
            {fontSizeOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={settings.fontSize === opt.value ? "default" : "outline"}
                size="sm"
                className={cn("h-8 flex-1 text-xs")}
                onClick={() => onUpdate("fontSize", opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Privacy Settings Card ─────────────────────────────────────────

function PrivacySettingsCard({
  settings,
  onUpdate,
}: {
  settings: PrivacySettings
  onUpdate: <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconLock className="h-4 w-4 text-primary" />
          Privacy
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Control your profile visibility and data sharing
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Profile visibility</p>
            <p className="text-[10px] text-muted-foreground">
              {settings.profileVisibility === "public" ? (
                <span className="inline-flex items-center gap-1">
                  <IconEye className="h-3 w-3" />
                  Your profile is visible to everyone
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <IconEyeOff className="h-3 w-3" />
                  Your profile is hidden from others
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              variant={settings.profileVisibility === "public" ? "default" : "outline"}
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => onUpdate("profileVisibility", "public")}
            >
              <IconEye className="h-3 w-3" />
              Public
            </Button>
            <Button
              variant={settings.profileVisibility === "private" ? "default" : "outline"}
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => onUpdate("profileVisibility", "private")}
            >
              <IconEyeOff className="h-3 w-3" />
              Private
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Show activity status</p>
            <p className="text-[10px] text-muted-foreground">
              Let others see when you are online
            </p>
          </div>
          <Switch
            checked={settings.showActivityStatus}
            onCheckedChange={(v) => onUpdate("showActivityStatus", v)}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Share usage analytics</p>
            <p className="text-[10px] text-muted-foreground">
              Help improve LinkedIQ with anonymous usage data
            </p>
          </div>
          <Switch
            checked={settings.shareUsageAnalytics}
            onCheckedChange={(v) => onUpdate("shareUsageAnalytics", v)}
          />
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
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconKey className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div>
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

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconClock className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div>
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

        <Separator />

        <div className="flex items-center justify-between">
          <div>
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

// ─── Data Management Card ──────────────────────────────────────────

function DataManagementCard({
  settings,
  onUpdate,
}: {
  settings: AccountSettings
  onUpdate: <K extends keyof AccountSettings>(key: K, value: AccountSettings[K]) => void
}) {
  const [clearOpen, setClearOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconDatabase className="h-4 w-4 text-primary" />
          Data management
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Export, import, or clear your data
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconDownload className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Export data</p>
              <p className="text-[10px] text-muted-foreground">
                Download all your data in one file
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={settings.dataExportFormat}
              onChange={(e) =>
                onUpdate("dataExportFormat", e.target.value as "json" | "csv")
              }
              className="flex h-8 rounded-lg border border-input bg-transparent px-3 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
              <IconDownload className="h-3 w-3" />
              Export
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <IconUpload className="mt-0.5 h-3 w-3 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Import data</p>
              <p className="text-[10px] text-muted-foreground">
                Restore data from a previous export
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <IconUpload className="h-3 w-3" />
            Import
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2">
          <div className="flex items-start gap-2">
            <IconAlertTriangle className="mt-0.5 h-3 w-3 text-destructive" />
            <div>
              <p className="text-xs font-medium">Clear all history</p>
              <p className="text-[10px] text-muted-foreground">
                Permanently delete all generated posts
              </p>
            </div>
          </div>
          <Dialog open={clearOpen} onOpenChange={setClearOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-7 gap-1 text-xs">
                <IconTrash className="h-3 w-3" />
                Clear
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear all history?</DialogTitle>
                <DialogDescription>
                  This will permanently delete all your generated posts and history. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setClearOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setClearOpen(false)}>
                  Clear all history
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

function SettingsContent() {
  const [notifications, setNotifications] = useState<NotificationSettings>(NOTIFICATION_DEFAULTS)
  const [appearance, setAppearance] = useState<AppearanceSettings>(APPEARANCE_DEFAULTS)
  const [privacy, setPrivacy] = useState<PrivacySettings>(PRIVACY_DEFAULTS)
  const [account, setAccount] = useState<AccountSettings>(ACCOUNT_DEFAULTS)

  const handleNotificationUpdate = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleAppearanceUpdate = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => {
    setAppearance((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyUpdate = <K extends keyof PrivacySettings>(
    key: K,
    value: PrivacySettings[K]
  ) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleAccountUpdate = <K extends keyof AccountSettings>(
    key: K,
    value: AccountSettings[K]
  ) => {
    setAccount((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <NotificationSettingsCard settings={notifications} onUpdate={handleNotificationUpdate} />
          <AppearanceSettingsCard settings={appearance} onUpdate={handleAppearanceUpdate} />
        </div>
        <div className="space-y-5">
          <PrivacySettingsCard settings={privacy} onUpdate={handlePrivacyUpdate} />
          <AccountSecurityCard settings={account} onUpdate={handleAccountUpdate} />
          <DataManagementCard settings={account} onUpdate={handleAccountUpdate} />
        </div>
      </div>
    </div>
  )
}

export { SettingsContent }
