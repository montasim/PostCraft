"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconBrandGoogle, IconLogin2 } from "@tabler/icons-react"
import { PasswordInput } from "@/components/shared/password-input"
import { authClient } from "@/core/auth/auth-client"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    })

    if (result.error) {
      setError(result.error.message ?? "Invalid email or password")
      setLoading(false)
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  async function handleGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <IconLogin2 className="h-4 w-4" />
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative my-4">
          <Separator />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            or
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogle}
        >
          <IconBrandGoogle className="h-4 w-4" />
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-foreground hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="/privacy" className="text-foreground hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}

export { LoginForm }
