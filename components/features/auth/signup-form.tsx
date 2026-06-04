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
import {
  IconUserPlus,
  IconArrowLeft,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import { PasswordInput } from "@/components/shared/password-input"
import { authClient } from "@/core/auth/auth-client"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await authClient.signUp.email({
      email,
      password,
      name,
    })

    if (result.error) {
      setError(result.error.message ?? "Could not create account")
      setLoading(false)
      return
    }

    setSent(true)
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

  if (sent) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Check your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            We sent a verification link to{" "}
            <strong className="text-foreground">{email}</strong>
          </p>
          <p>Click the link to verify your email and get started.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push("/login")}
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to login
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Minimum 8 characters
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <IconUserPlus className="h-4 w-4" />
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground underline hover:no-underline"
          >
            Sign in
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
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

export { SignupForm }
