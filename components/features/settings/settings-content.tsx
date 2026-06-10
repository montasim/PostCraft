"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { PasswordInput } from "@/components/shared/password-input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  IconBell,
  IconShield,
  IconTrash,
  IconAlertTriangle,
  IconKey,
  IconClock,
  IconRefresh,
  IconSend,
  IconShieldCheck,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconLink,
  IconPlus,
  IconRss,
  IconInfoCircle,
} from "@tabler/icons-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { requestNotificationPermission } from "@/lib/browser-notification"
import { API } from "@/lib/constants"
import { authClient } from "@/core/auth/auth-client"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/store/hooks"
import { fetchConnectedPlatforms } from "@/store/slices/connected-platforms.slice"
import type { NotificationSettings, AccountSettings, RssFeed } from "@/types"

// ─── Notification Settings Card ────────────────────────────────────

function NotificationSettingsCard({
  settings,
  onUpdate,
}: {
  settings: NotificationSettings
  onUpdate: <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => void
}) {
  const items = [
    {
      key: "emailGenerationComplete" as const,
      label: "Generation complete",
      description: "Get notified when a post is generated",
    },
    {
      key: "emailTrendingComplete" as const,
      label: "Scheduled trending",
      description: "Get email with insights when trending posts are generated",
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
      <CardContent className="space-y-4">
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

// ─── Account Security Card ─────────────────────────────────────────

function AccountSecurityCard({
  settings,
  onUpdate,
}: {
  settings: AccountSettings
  onUpdate: <K extends keyof AccountSettings>(
    key: K,
    value: AccountSettings[K]
  ) => void
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
      <CardContent className="space-y-4">
        <ChangePasswordRow />
      </CardContent>
    </Card>
  )
}

// ─── Change Password Row ──────────────────────────────────────────

function ChangePasswordRow() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"send" | "verify">("send")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const resetState = () => {
    setStep("send")
    setOtp("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
    setLoading(false)
  }

  const handleSendOtp = async () => {
    setError("")
    setLoading(true)
    try {
      const res = await fetch(API.AUTH_SEND_OTP, { method: "POST" })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Failed to send code")
        return
      }
      setStep("verify")
      toast.success("Verification code sent to your email")
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setError("")
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(API.AUTH_VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otp, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Failed to change password")
        return
      }
      toast.success("Password changed successfully")
      setOpen(false)
      resetState()
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1.5">
        <p className="text-xs font-medium">Password</p>
        <p className="text-[10px] text-muted-foreground">
          Keep your account secure
        </p>
      </div>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) resetState()
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <IconKey className="h-3 w-3" />
            Change
          </Button>
        </DialogTrigger>
        <DialogContent>
          {step === "send" ? (
            <>
              <DialogHeader>
                <DialogTitle>Change password</DialogTitle>
                <DialogDescription>
                  We'll send a verification code to your email to confirm your
                  identity.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Button
                  onClick={handleSendOtp}
                  className="w-full gap-2"
                  disabled={loading}
                >
                  <IconSend className="h-4 w-4" />
                  {loading ? "Sending..." : "Send verification code"}
                </Button>
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Enter verification code</DialogTitle>
                <DialogDescription>
                  Enter the 6-digit code sent to your email, then choose a new
                  password.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Verification code</Label>
                  <Input
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="h-8 text-xs tracking-widest"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">New password</Label>
                  <PasswordInput
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Confirm new password</Label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setStep("send")}
                >
                  <IconRefresh className="h-3.5 w-3.5" />
                  Resend code
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={handleChangePassword}
                  disabled={
                    loading ||
                    otp.length !== 6 ||
                    !newPassword ||
                    !confirmPassword
                  }
                >
                  <IconShieldCheck className="h-3.5 w-3.5" />
                  {loading ? "Changing..." : "Change password"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Danger Zone Card ──────────────────────────────────────────────

function DangerZoneCard({
  onReset,
  onDelete,
}: {
  onReset: () => void
  onDelete: () => void
}) {
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
          <Button
            variant="destructive"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => setDeleteOpen(true)}
          >
            <IconTrash className="h-3 w-3" />
            Delete
          </Button>
          <ConfirmDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Delete workspace?"
            description="This will permanently delete your workspace and all associated data. This action cannot be undone."
            confirmLabel="Delete workspace"
            variant="destructive"
            onConfirm={onDelete}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2">
          <div>
            <p className="text-xs font-medium">Reset settings</p>
            <p className="text-[10px] text-muted-foreground">
              Restore all defaults
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-xs text-destructive hover:text-destructive"
            onClick={() => setResetOpen(true)}
          >
            <IconRefresh className="h-3 w-3" />
            Reset
          </Button>
          <ConfirmDialog
            open={resetOpen}
            onOpenChange={setResetOpen}
            title="Reset all settings?"
            description="This will restore all workspace settings to their defaults. Your generated content will not be affected."
            confirmLabel="Reset settings"
            variant="destructive"
            onConfirm={onReset}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Connected Accounts Card ───────────────────────────────────────

function ConnectedAccountsCard() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/settings/accounts")
      const result = await res.json()
      if (result.success) {
        setAccounts(result.data)
        dispatch(fetchConnectedPlatforms())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleDisconnect = async (providerId: string) => {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/settings/accounts?providerId=${providerId}`,
        { method: "DELETE" }
      )
      const result = await res.json()
      if (result.success) {
        toast.success(`Account disconnected successfully`)
        fetchAccounts()
      } else {
        toast.error("Failed to disconnect account")
        setLoading(false)
      }
    } catch (err) {
      toast.error("Failed to disconnect account")
      setLoading(false)
    }
  }

  const handleConnectGoogle = async () => {
    await authClient.linkSocial({
      provider: "google",
      callbackURL: "/settings",
    })
  }

  const handleConnectLinkedin = async () => {
    await authClient.linkSocial({
      provider: "linkedin",
      callbackURL: "/settings",
    })
  }

  const handleConnectFacebook = async () => {
    await authClient.linkSocial({
      provider: "facebook",
      callbackURL: "/settings",
    })
  }

  const handleConnectTwitter = async () => {
    await authClient.linkSocial({
      provider: "twitter",
      callbackURL: "/settings",
    })
  }

  const googleAccount = accounts.find((a) => a.providerId === "google")
  const linkedinAccount = accounts.find((a) => a.providerId === "linkedin")
  const facebookAccount = accounts.find((a) => a.providerId === "facebook")
  const twitterAccount = accounts.find((a) => a.providerId === "twitter")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconLink className="h-4 w-4 text-primary" />
          Connected accounts
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Connect your social accounts for seamless posting
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-3">
                <IconBrandGoogle className="h-5 w-5 text-foreground" />
                <div>
                  <p className="text-xs font-medium">Google</p>
                  <p className="text-[10px] text-muted-foreground">
                    {googleAccount ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button
                variant={googleAccount ? "outline" : "default"}
                size="sm"
                className={cn(
                  "h-7 text-xs",
                  googleAccount &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={() =>
                  googleAccount
                    ? handleDisconnect("google")
                    : handleConnectGoogle()
                }
              >
                {googleAccount ? "Disconnect" : "Connect"}
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-3">
                <IconBrandLinkedin className="h-5 w-5 text-[#0a66c2]" />
                <div>
                  <p className="text-xs font-medium">LinkedIn</p>
                  <p className="text-[10px] text-muted-foreground">
                    {linkedinAccount ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button
                variant={linkedinAccount ? "outline" : "default"}
                size="sm"
                className={cn(
                  "h-7 text-xs",
                  linkedinAccount &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={() =>
                  linkedinAccount
                    ? handleDisconnect("linkedin")
                    : handleConnectLinkedin()
                }
              >
                {linkedinAccount ? "Disconnect" : "Connect"}
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-3">
                <IconBrandFacebook className="h-5 w-5 text-[#1877F2]" />
                <div>
                  <p className="text-xs font-medium">Facebook</p>
                  <p className="text-[10px] text-muted-foreground">
                    {facebookAccount ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button
                variant={facebookAccount ? "outline" : "default"}
                size="sm"
                className={cn(
                  "h-7 text-xs",
                  facebookAccount &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={() =>
                  facebookAccount
                    ? handleDisconnect("facebook")
                    : handleConnectFacebook()
                }
              >
                {facebookAccount ? "Disconnect" : "Connect"}
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 fill-current text-foreground"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.051z" />
                </svg>
                <div>
                  <p className="text-xs font-medium">Twitter / X</p>
                  <p className="text-[10px] text-muted-foreground">
                    {twitterAccount ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button
                variant={twitterAccount ? "outline" : "default"}
                size="sm"
                className={cn(
                  "h-7 text-xs",
                  twitterAccount &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={() =>
                  twitterAccount
                    ? handleDisconnect("twitter")
                    : handleConnectTwitter()
                }
              >
                {twitterAccount ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Connected RSS Card ──────────────────────────────────────────────

function ConnectedRssCard({
  rssFeeds,
  onUpdate,
}: {
  rssFeeds: RssFeed[]
  onUpdate: (feeds: RssFeed[]) => void
}) {
  const [inputs, setInputs] = useState<
    { id: string; url: string; connected: boolean; title: string }[]
  >([])

  useEffect(() => {
    setInputs(
      rssFeeds.map((f) => ({
        id: f.id,
        url: f.url,
        title: f.title,
        connected: f.connected ?? true,
      }))
    )
  }, [rssFeeds])

  const handleConnect = (index: number) => {
    const input = inputs[index]
    if (!input?.url) return

    try {
      new URL(input.url)
    } catch {
      toast.error("Invalid URL")
      return
    }

    const updated = [...inputs]
    updated[index].connected = true
    updated[index].title = new URL(input.url).hostname || "RSS Feed"
    setInputs(updated)

    onUpdate(
      updated.map((i) => ({ id: i.id, url: i.url, title: i.title, connected: i.connected }))
    )
  }

  const handleDisconnect = (index: number) => {
    const updated = [...inputs]
    updated[index].connected = false
    setInputs(updated)

    onUpdate(
      updated.map((i) => ({ id: i.id, url: i.url, title: i.title, connected: i.connected }))
    )
  }

  const handleDelete = (index: number) => {
    const updated = inputs.filter((_, i) => i !== index)
    setInputs(updated)
    onUpdate(
      updated.map((i) => ({ id: i.id, url: i.url, title: i.title, connected: i.connected }))
    )
  }

  const addNewRss = () => {
    setInputs([
      ...inputs,
      { id: crypto.randomUUID(), url: "", connected: false, title: "" },
    ])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconRss className="h-4 w-4" />
          Connected RSS
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconInfoCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>You can add up to 2 RSS feeds.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Connect your RSS feeds to generate trending posts from them.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {inputs.map((input, index) => (
          <div
            key={input.id}
            className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
          >
            <div className="flex flex-1 items-center gap-3">
              <div className="flex-1">
                <Input
                  className="h-7 text-xs"
                  placeholder="https://example.com/feed.xml"
                  value={input.url}
                  onChange={(e) => {
                    const newInputs = [...inputs]
                    newInputs[index].url = e.target.value
                    if (newInputs[index].connected) {
                      newInputs[index].connected = false
                      onUpdate(
                        newInputs.map((i) => ({ id: i.id, url: i.url, title: i.title, connected: i.connected }))
                      )
                    }
                    setInputs(newInputs)
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={input.connected ? "outline" : "default"}
                size="sm"
                className={cn(
                  "h-7 shrink-0 text-xs",
                  input.connected &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={() =>
                  input.connected ? handleDisconnect(index) : handleConnect(index)
                }
              >
                {input.connected ? "Disconnect" : "Connect"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(index)}
              >
                <IconTrash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={addNewRss}
          disabled={inputs.length >= 2}
          className="w-full gap-2 text-xs"
        >
          <IconPlus className="h-4 w-4" />
          {inputs.length >= 2 ? "Maximum 2 RSS Feeds Allowed" : "Add new RSS"}
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Orchestrator ──────────────────────────────────────────────────

interface SettingsData {
  notifications: NotificationSettings
  account: AccountSettings
  rssFeeds: RssFeed[]
}

function SettingsContent() {
  const [data, setData] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get("error")
    if (error === "account_already_linked_to_different_user") {
      toast.error("Account Already Linked", {
        description: "This social account is already linked to another user. Please remove it from that account first or use a different account.",
        duration: 6000,
      })
      // Clear the error from the URL
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("error")
      window.history.replaceState({}, "", newUrl.toString())
    }
  }, [searchParams])

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(API.SETTINGS)
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
    setData((prev) => (prev ? { ...prev, ...updates } : prev))

    try {
      const res = await fetch(API.SETTINGS, {
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

    if (key === "emailGenerationComplete" && value) {
      requestNotificationPermission().then((granted) => {
        if (!granted) {
          toast.error("Browser notifications blocked", {
            description:
              "Enable notifications in your browser settings to receive alerts.",
          })
        }
      })
    }
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
      notifications: {
        emailGenerationComplete: true,
        emailTrendingComplete: false,
        emailWeeklyDigest: true,
        emailProductUpdates: false,
        pushPostReminder: true,
      },
      account: {
        twoFactorEnabled: false,
        sessionTimeout: 30,
        dataExportFormat: "json",
      },
    })
  }

  const handleDeleteWorkspace = async () => {
    try {
      const res = await fetch(API.WORKSPACE, { method: "DELETE" })
      const result = await res.json()
      if (!result.success) {
        toast.error("Failed to delete workspace")
        return
      }
      await authClient.signOut()
      window.location.href = "/login"
    } catch {
      toast.error("Failed to delete workspace")
    }
  }

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-3 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-36" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </CardTitle>
              <Skeleton className="h-3 w-44" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2">
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-32" />
                  </div>
                  <Skeleton className="h-7 w-16 rounded-md" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-36" />
              </CardTitle>
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-2.5 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-20 rounded-md" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-3 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
                <div className="flex flex-1 items-center gap-3">
                  <Skeleton className="h-7 w-full rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-20 rounded-md" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-7 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <NotificationSettingsCard
            settings={data.notifications}
            onUpdate={handleNotificationUpdate}
          />
          <AccountSecurityCard
            settings={data.account}
            onUpdate={handleAccountUpdate}
          />
          <DangerZoneCard
            onReset={handleReset}
            onDelete={handleDeleteWorkspace}
          />
        </div>
        <div className="space-y-4">
          <ConnectedAccountsCard />
          <ConnectedRssCard
            rssFeeds={data.rssFeeds}
            onUpdate={(rssFeeds) => saveSettings({ rssFeeds })}
          />
        </div>
      </div>
    </div>
  )
}

export { SettingsContent }
