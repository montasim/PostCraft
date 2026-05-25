"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { IconShield, IconCheck } from "@tabler/icons-react"
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

interface RuleGroupProps {
  label: string
  rules: GuardRule[]
  icon: React.ComponentType<{ className?: string }>
  iconClass: string
  maxVisible?: number
  onExpand?: (expanded: boolean) => void
}

function RuleGroup({ label, rules, icon: Icon, iconClass, maxVisible = 3, onExpand }: RuleGroupProps) {
  const [expanded, setExpanded] = useState(false)

  if (rules.length === 0) return null

  const visible = expanded ? rules : rules.slice(0, maxVisible)
  const remaining = rules.length - visible.length

  const handleExpand = (value: boolean) => {
    setExpanded(value)
    onExpand?.(value)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="space-y-2 pr-1">
        {visible.map((rule) => (
          <div key={rule.id} className="flex items-start gap-2 text-sm leading-6">
            <Icon className={`h-3.5 w-3.5 mt-1 shrink-0 ${iconClass}`} />
            <span className="break-words">{rule.rule}</span>
          </div>
        ))}
      </div>
      {remaining > 0 && !expanded && (
        <button
          onClick={() => handleExpand(true)}
          className="text-xs text-primary hover:underline"
        >
          +{remaining} more
        </button>
      )}
      {expanded && rules.length > maxVisible && (
        <button
          onClick={() => handleExpand(false)}
          className="text-xs text-muted-foreground hover:underline"
        >
          Show less
        </button>
      )}
    </div>
  )
}

interface BannedWordsGroupProps {
  label: string
  rules: GuardRule[]
  maxVisible?: number
  onExpand?: (expanded: boolean) => void
}

function BannedWordsGroup({ label, rules, maxVisible = 5, onExpand }: BannedWordsGroupProps) {
  const [expanded, setExpanded] = useState(false)

  if (rules.length === 0) return null

  const visible = expanded ? rules : rules.slice(0, maxVisible)
  const remaining = rules.length - visible.length

  const handleExpand = (value: boolean) => {
    setExpanded(value)
    onExpand?.(value)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5 pr-1">
        {visible.map((rule) => (
          <Badge
            key={rule.id}
            variant="outline"
            className="rounded-md border-destructive/30 text-destructive bg-transparent hover:bg-destructive/5 font-normal"
          >
            {rule.rule}
          </Badge>
        ))}
        {remaining > 0 && !expanded && (
          <Badge
            variant="outline"
            className="cursor-pointer rounded-md border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 font-normal"
            onClick={() => handleExpand(true)}
          >
            +{remaining} more
          </Badge>
        )}
        {expanded && rules.length > maxVisible && (
          <Badge
            variant="outline"
            className="cursor-pointer rounded-md border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 font-normal"
            onClick={() => handleExpand(false)}
          >
            See less
          </Badge>
        )}
      </div>
    </div>
  )
}

function BrandGuardPanel({ showButton = true, title = "Brand Guard", guardrails: providedGuardrails }: BrandGuardPanelProps) {
  const [guardrails, setGuardrails] = useState<GuardRule[]>(providedGuardrails ?? [])
  const [loading, setLoading] = useState(!providedGuardrails)
  const [expandedSections, setExpandedSections] = useState({ tone: false, format: false, banned: false })

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

  const updateExpanded = (key: 'tone' | 'format' | 'banned', expanded: boolean) => {
    setExpandedSections(prev => ({ ...prev, [key]: expanded }))
  }

  return (
    <Card className="hidden w-full shrink-0 md:w-[40%] lg:w-[40%] flex flex-col max-h-[30.5rem]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2">
            {title}
          </div>
          {showButton && (
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <Link href="/guardrails" title="Protect your brand">
                <IconShield className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-3 flex-1 min-h-0 space-y-4 overflow-y-auto">
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
            <RuleGroup label="Tone rules" rules={toneRules} icon={IconCheck} iconClass="text-green-500" onExpand={(v) => updateExpanded('tone', v)} />
            <RuleGroup label="Format rules" rules={formatRules} icon={IconCheck} iconClass="text-green-500" onExpand={(v) => updateExpanded('format', v)} />

            {(toneRules.length > 0 || formatRules.length > 0) && bannedWords.length > 0 && <Separator />}

            <BannedWordsGroup label="Banned words" rules={bannedWords} onExpand={(v) => updateExpanded('banned', v)} />

            {guardrails.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No guardrail rules configured yet.
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { BrandGuardPanel }
