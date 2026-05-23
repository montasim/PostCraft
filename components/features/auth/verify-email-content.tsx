"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconLoader2, IconCheck, IconX } from "@tabler/icons-react"

function VerifyEmailContentInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setErrorMessage("Missing verification token")
      return
    }

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((result) => {
      if (result.error) {
        setStatus("error")
        setErrorMessage(result.error.message ?? "Verification failed")
      } else {
        setStatus("success")
        setTimeout(() => router.push("/"), 2000)
      }
    })
  }, [token, router])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Email verification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 text-center text-sm">
        {status === "loading" && (
          <>
            <IconLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p>Verifying your email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <IconCheck className="h-8 w-8 text-green-500" />
            <p>Email verified! Redirecting to dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <IconX className="h-8 w-8 text-destructive" />
            <p className="text-destructive">{errorMessage}</p>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Back to login
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function VerifyEmailContent() {
  return (
    <Suspense>
      <VerifyEmailContentInner />
    </Suspense>
  )
}

export { VerifyEmailContent }
