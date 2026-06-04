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
import {
  IconBrandGoogle,
  IconLogin2,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react"
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

  async function handleLinkedin() {
    await authClient.signIn.social({
      provider: "linkedin",
      callbackURL: callbackUrl,
    })
  }

  async function handleFacebook() {
    await authClient.signIn.social({
      provider: "facebook",
      callbackURL: callbackUrl,
    })
  }

  async function handleTwitter() {
    await authClient.signIn.social({
      provider: "twitter",
      callbackURL: callbackUrl,
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogle}
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="mt-2 w-full gap-2"
          onClick={handleLinkedin}
          type="button"
        >
          <IconBrandLinkedin className="h-4 w-4 text-[#0a66c2]" />
          Continue with LinkedIn
        </Button>
        <Button
          variant="outline"
          className="mt-2 w-full gap-2"
          onClick={handleFacebook}
          type="button"
        >
          <IconBrandFacebook className="h-4 w-4 text-[#1877F2]" />
          Continue with Facebook
        </Button>
        <Button
          variant="outline"
          className="mt-2 w-full gap-2"
          onClick={handleTwitter}
          type="button"
        >
          <svg
            className="h-4 w-4 fill-current text-foreground"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.051z" />
          </svg>
          Continue with X
        </Button>

        <div className="my-5 flex items-center">
          <Separator className="flex-1" />
          <span className="px-2 text-xs text-muted-foreground">
            or continue with email
          </span>
          <Separator className="flex-1" />
        </div>

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
                className="text-xs text-muted-foreground underline hover:text-foreground"
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
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-foreground underline hover:no-underline"
          >
            Sign up
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link
            href="/privacy"
            className="text-foreground underline hover:no-underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}

export { LoginForm }
