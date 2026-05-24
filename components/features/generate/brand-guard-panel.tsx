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

interface BrandGuardPanelProps {
  showButton?: boolean
  title?: string
  guardrails?: GuardRule[]
}

function RuleGroup({ label, rules, icon: Icon, iconClass }: {
  label: string
  rules: GuardRule[]
  icon: React.ComponentType<{ className?: string }>
  iconClass: string
}) {
  if (rules.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="max-h-[100px] space-y-2 overflow-y-auto pr-1">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center gap-2 text-sm">
            <Icon className={`h-3.5 w-3.5 ${iconClass}`} />
            {rule.rule}
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandGuardPanel({ showButton = true, title = "Brand Guard", guardrails: providedGuardrails }: BrandGuardPanelProps) {
  const [guardrails, setGuardrails] = useState<GuardRule[]>(providedGuardrails ?? [])
  const [loading, setLoading] = useState(!providedGuardrails)

  useEffect(() => {
    if (providedGuardrails) return

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
  }, [providedGuardrails])

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
            <RuleGroup label="Tone rules" rules={toneRules} icon={IconCheck} iconClass="text-green-500" />
            <RuleGroup label="Format rules" rules={formatRules} icon={IconCheck} iconClass="text-green-500" />

            {(toneRules.length > 0 || formatRules.length > 0) && bannedWords.length > 0 && <Separator />}

            <RuleGroup label="Banned words" rules={bannedWords} icon={IconX} iconClass="text-destructive" />

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
