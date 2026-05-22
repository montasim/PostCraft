"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { IconShield, IconCheck, IconX } from "@tabler/icons-react"
import Link from "next/link"

interface GuardRule {
  id: string
  category: "tone" | "format" | "banned" | "custom"
  rule: string
  isActive: boolean
}

function BrandGuardPanel({ showButton = true, title = "Brand Guard" }: { showButton?: boolean; title?: string }) {
  const [guardrails, setGuardrails] = useState<GuardRule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuardrails() {
      try {
        const res = await fetch("/api/guardrails?active=true")
        const data = await res.json()
        if (data.success) {
          setGuardrails(data.data)
        }
      } catch {
        // fallback: empty state
      } finally {
        setLoading(false)
      }
    }
    fetchGuardrails()
  }, [])

  const toneRules = guardrails.filter((g) => g.category === "tone")
  const formatRules = guardrails.filter((g) => g.category === "format")
  const bannedWords = guardrails.filter((g) => g.category === "banned")

  return (
    <Card className="hidden w-80 shrink-0 lg:block">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconShield className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-3 space-y-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Separator />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <>
            {toneRules.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Tone rules
                </p>
                {toneRules.map((rule) => (
                  <div key={rule.id} className="flex items-center gap-2 text-sm">
                    <IconCheck className="h-3.5 w-3.5 text-green-500" />
                    {rule.rule}
                  </div>
                ))}
              </div>
            )}

            {formatRules.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Format rules
                </p>
                {formatRules.map((rule) => (
                  <div key={rule.id} className="flex items-center gap-2 text-sm">
                    <IconCheck className="h-3.5 w-3.5 text-green-500" />
                    {rule.rule}
                  </div>
                ))}
              </div>
            )}

            {(toneRules.length > 0 || formatRules.length > 0) && bannedWords.length > 0 && <Separator />}

            {bannedWords.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Banned words
                </p>
                {bannedWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center gap-2 text-sm text-destructive"
                  >
                    <IconX className="h-3.5 w-3.5" />
                    {word.rule}
                  </div>
                ))}
              </div>
            )}

            {guardrails.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No guardrail rules configured yet.
              </p>
            )}
          </>
        )}

        {showButton && (
          <Button variant="outline" className="w-full border-dashed text-xs" asChild>
            <Link href="/guardrails">
              Protect your brand
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export { BrandGuardPanel }
