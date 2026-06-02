"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconLock, IconRefresh } from "@tabler/icons-react"
import { PasswordInput } from "@/components/shared/password-input"
import { authClient } from "@/core/auth/auth-client"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!token) {
      setError("Invalid or missing reset token")
      return
    }

    setLoading(true)

    const result = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    if (result.error) {
      setError(result.error.message ?? "Failed to reset password")
      setLoading(false)
      return
    }

    router.push("/login")
  }

  if (!token) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Invalid link</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>This password reset link is invalid or has expired.</p>
          <Button
            variant="outline"
            className="mt-4 gap-2"
            onClick={() => router.push("/forgot-password")}
          >
            <IconRefresh className="h-4 w-4" />
            Request a new link
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Set new password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <PasswordInput
              id="confirm"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <IconLock className="h-4 w-4" />
            {loading ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { ResetPasswordForm }
