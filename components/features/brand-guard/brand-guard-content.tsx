"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { API } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  IconShield,
  IconX,
  IconPlus,
  IconMessage,
  IconRuler,
  IconSparkles,
  IconBan,
} from "@tabler/icons-react"

interface Rule {
  id: string
  text: string
  active: boolean
  category: string
}

interface RuleSectionProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  rules: Rule[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onAdd: (text: string) => void
  loading?: boolean
}

function RuleSection({
  title,
  description,
  icon: Icon,
  rules,
  onToggle,
  onRemove,
  onAdd,
  loading,
}: RuleSectionProps) {
  const [newRule, setNewRule] = useState("")

  const handleAdd = () => {
    if (newRule.trim()) {
      onAdd(newRule.trim())
      setNewRule("")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-3 w-40" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border px-3 py-2"
            >
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-3 flex-1" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-primary" />
          {title}
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {rules.filter((r) => r.active).length}/{rules.length} active
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition",
                rule.active ? "bg-card" : "bg-muted/30 opacity-60"
              )}
            >
              <Switch
                checked={rule.active}
                onCheckedChange={() => onToggle(rule.id)}
                className="scale-75"
              />
              <span
                className={cn("flex-1 text-sm", !rule.active && "line-through")}
              >
                {rule.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => onRemove(rule.id)}
              >
                <IconX className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="flex gap-2">
          <Input
            placeholder={`Add ${title.toLowerCase().replace(" rules", "")} rule...`}
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-8 text-xs"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            disabled={!newRule.trim()}
            className="h-8 gap-1 text-xs"
          >
            <IconPlus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BannedWordsCard({
  rules,
  onToggle,
  onRemove,
  onAdd,
  loading,
}: {
  rules: Rule[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onAdd: (text: string) => void
  loading?: boolean
}) {
  const [newWord, setNewWord] = useState("")

  const handleAdd = () => {
    if (newWord.trim()) {
      onAdd(newWord.trim().toLowerCase())
      setNewWord("")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const activeCount = rules.filter((r) => r.active).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBan className="h-4 w-4 text-destructive" />
          Words to avoid
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {activeCount}/{rules.length} active
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          These words will never appear in your content
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex max-h-[90px] flex-wrap gap-1.5 overflow-y-auto pr-1">
          {rules.map((rule) => (
            <Badge
              key={rule.id}
              variant="secondary"
              className={cn("gap-1 text-xs", !rule.active && "opacity-40")}
            >
              <span
                className="cursor-pointer"
                onClick={() => onToggle(rule.id)}
                title={rule.active ? "Click to disable" : "Click to enable"}
              >
                {rule.text}
              </span>
              <button
                onClick={() => onRemove(rule.id)}
                className="ml-0.5 text-muted-foreground hover:text-destructive"
              >
                <IconX className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add banned word..."
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-8 text-xs"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            disabled={!newWord.trim()}
            className="h-8 gap-1 text-xs"
          >
            <IconPlus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PreviewCard({
  toneRules,
  formatRules,
  bannedWords,
}: {
  toneRules: Rule[]
  formatRules: Rule[]
  bannedWords: Rule[]
}) {
  const activeBanned = bannedWords.filter((r) => r.active).map((r) => r.text)
  const previewTone = toneRules.filter((r) => r.active).map((r) => r.text)
  const previewFormat = formatRules.filter((r) => r.active).map((r) => r.text)
  const previewRules = [...previewTone, ...previewFormat, ...activeBanned]
  const sampleText =
    previewRules.length > 0
      ? previewRules.slice(0, 3).join(". ") + "."
      : "Your post will appear here. Add guardrails to preview their effect."

  const highlightBanned = (text: string) => {
    if (activeBanned.length === 0) return text
    const regex = new RegExp(`(${activeBanned.join("|")})`, "gi")
    return text.split(regex).map((part, i) =>
      activeBanned.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
        <span
          key={i}
          className="bg-destructive/20 text-destructive line-through decoration-destructive"
        >
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const activeTone = toneRules.filter((r) => r.active).length
  const activeFormat = formatRules.filter((r) => r.active).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconSparkles className="h-4 w-4 text-primary" />
          Content preview
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          See how your rules shape generated content
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border bg-background/50 p-3 text-sm leading-relaxed">
          {highlightBanned(sampleText)}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {activeTone > 0 && (
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <IconMessage className="h-3 w-3" />
              {activeTone} tone rule{activeTone !== 1 && "s"}
            </Badge>
          )}
          {activeFormat > 0 && (
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <IconRuler className="h-3 w-3" />
              {activeFormat} format rule{activeFormat !== 1 && "s"}
            </Badge>
          )}
          {activeBanned.length > 0 && (
            <Badge
              variant="secondary"
              className="gap-1 text-[10px] text-destructive"
            >
              <IconBan className="h-3 w-3" />
              {activeBanned.length} banned word
              {activeBanned.length !== 1 && "s"}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface ApiGuardrail {
  id: string
  category: string
  rule: string
  isActive: boolean
}

function BrandGuardContent() {
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuardrails() {
      try {
        const res = await fetch(API.BRAND_GUARD)
        const data = await res.json()
        if (data.success) {
          setRules(
            data.data.map((g: ApiGuardrail) => ({
              id: g.id,
              text: g.rule,
              active: g.isActive,
              category: g.category,
            }))
          )
        }
      } catch {
        toast.error("Failed to load guardrails")
      } finally {
        setLoading(false)
      }
    }
    fetchGuardrails()
  }, [])

  const toneRules = rules.filter((r) => r.category === "tone")
  const formatRules = rules.filter((r) => r.category === "format")
  const customRules = rules.filter((r) => r.category === "custom")
  const bannedRules = rules.filter((r) => r.category === "banned")

  const handleToggle = useCallback(
    async (id: string) => {
      const rule = rules.find((r) => r.id === id)
      if (!rule) return

      const newActive = !rule.active
      setRules((prev) =>
        prev.map((r) => (r.id === id ? { ...r, active: newActive } : r))
      )

      try {
        const res = await fetch(`${API.BRAND_GUARD}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newActive }),
        })
        if (!res.ok) throw new Error()
      } catch {
        setRules((prev) =>
          prev.map((r) => (r.id === id ? { ...r, active: !newActive } : r))
        )
        toast.error("Failed to toggle rule")
      }
    },
    [rules]
  )

  const handleRemove = useCallback(
    async (id: string) => {
      const prev = rules
      setRules((cur) => cur.filter((r) => r.id !== id))

      try {
        const res = await fetch(`${API.BRAND_GUARD}/${id}`, { method: "DELETE" })
        if (!res.ok) throw new Error()
      } catch {
        setRules(prev)
        toast.error("Failed to remove rule")
      }
    },
    [rules]
  )

  const handleAdd = useCallback(
    (category: string) => async (text: string) => {
      try {
        const res = await fetch(API.BRAND_GUARD, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, rule: text, isActive: true }),
        })
        const data = await res.json()
        if (!data.success) throw new Error()

        setRules((prev) => [
          ...prev,
          {
            id: data.data.id,
            text: data.data.rule,
            active: data.data.isActive,
            category: data.data.category,
          },
        ])
        toast.success("Rule locked.")
      } catch {
        toast.error("Failed to add rule")
      }
    },
    []
  )

  const allRules = [...toneRules, ...formatRules, ...customRules]
  const activeCount =
    allRules.filter((r) => r.active).length +
    bannedRules.filter((r) => r.active).length
  const totalCount = allRules.length + bannedRules.length
  const strengthPercent =
    totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <RuleSection
            title="Tone rules"
            description="Shape how your voice sounds across every post"
            icon={IconMessage}
            rules={toneRules}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onAdd={handleAdd("tone")}
            loading={loading}
          />
          <RuleSection
            title="Format rules"
            description="Control the structure of every post we write"
            icon={IconRuler}
            rules={formatRules}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onAdd={handleAdd("format")}
            loading={loading}
          />
          <RuleSection
            title="Custom rules"
            description="Your rules, your brand. Add what matters to you."
            icon={IconSparkles}
            rules={customRules}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onAdd={handleAdd("custom")}
            loading={loading}
          />
        </div>
        <div className="space-y-4">
          <BannedWordsCard
            rules={bannedRules}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onAdd={handleAdd("banned")}
            loading={loading}
          />
          <PreviewCard
            toneRules={toneRules}
            formatRules={formatRules}
            bannedWords={bannedRules}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconShield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Your brand shield</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-medium">
                  {activeCount} of {totalCount} rules protecting your brand
                </p>
              </div>
              <Progress value={strengthPercent} className="h-2 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BrandGuardContent }
