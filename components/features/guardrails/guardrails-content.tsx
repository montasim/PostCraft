"use client"

import { useState, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
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
}

interface RuleSectionProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  rules: Rule[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onAdd: (text: string) => void
}

function RuleSection({ title, description, icon: Icon, rules, onToggle, onRemove, onAdd }: RuleSectionProps) {
  const [newRule, setNewRule] = useState("")

  const handleAdd = () => {
    if (newRule.trim()) {
      onAdd(newRule.trim())
      setNewRule("")
    }
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
            <span className={cn("flex-1 text-sm", !rule.active && "line-through")}>
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
  words,
  activeWords,
  onToggleWord,
  onAddWord,
  onRemoveWord,
}: {
  words: string[]
  activeWords: Set<string>
  onToggleWord: (word: string) => void
  onAddWord: (word: string) => void
  onRemoveWord: (word: string) => void
}) {
  const [newWord, setNewWord] = useState("")

  const handleAdd = () => {
    if (newWord.trim()) {
      onAddWord(newWord.trim().toLowerCase())
      setNewWord("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconBan className="h-4 w-4 text-destructive" />
          Banned words
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {activeWords.size}/{words.length} active
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Words or phrases that will never appear in generated content
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {words.map((word) => (
            <Badge
              key={word}
              variant="secondary"
              className={cn(
                "gap-1 text-xs",
                !activeWords.has(word) && "opacity-40"
              )}
            >
              <span
                className="cursor-pointer"
                onClick={() => onToggleWord(word)}
                title={activeWords.has(word) ? "Click to disable" : "Click to enable"}
              >
                {word}
              </span>
              <button
                onClick={() => onRemoveWord(word)}
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
  bannedWords: string[]
}) {
  const sampleText =
    "This game changer will help you leverage synergy to become a thought leader in your industry."

  const highlightBanned = (text: string) => {
    if (bannedWords.length === 0) return text
    const regex = new RegExp(`(${bannedWords.join("|")})`, "gi")
    return text.split(regex).map((part, i) =>
      bannedWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="bg-destructive/20 text-destructive line-through decoration-destructive">
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
          Live preview
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          How your rules apply to generated content
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
          {bannedWords.length > 0 && (
            <Badge variant="secondary" className="gap-1 text-[10px] text-destructive">
              <IconBan className="h-3 w-3" />
              {bannedWords.length} banned word{bannedWords.length !== 1 && "s"}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

let nextId = 100
const makeId = () => `r${nextId++}`

function GuardrailsContent() {
  const [toneRules, setToneRules] = useState<Rule[]>([
    { id: "t1", text: "Professional voice", active: true },
    { id: "t2", text: "No clickbait hooks", active: true },
    { id: "t3", text: "No generic platitudes", active: true },
  ])

  const [formatRules, setFormatRules] = useState<Rule[]>([
    { id: "f1", text: "Max 1,300 characters", active: true },
    { id: "f2", text: "Hook under 150 chars", active: true },
  ])

  const [customRules, setCustomRules] = useState<Rule[]>([
    { id: "c1", text: "Include a personal anecdote", active: true },
    { id: "c2", text: "End with a question", active: false },
  ])

  const [bannedWords, setBannedWords] = useState<string[]>([
    "game changer",
    "synergy",
    "leverage",
  ])
  const [activeBannedWords, setActiveBannedWords] = useState<Set<string>>(
    new Set(["game changer", "synergy", "leverage"])
  )

  const toggleRule = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Rule[]>>) =>
      (id: string) =>
        setter((prev) =>
          prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
        ),
    []
  )

  const removeRule = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Rule[]>>) =>
      (id: string) =>
        setter((prev) => prev.filter((r) => r.id !== id)),
    []
  )

  const addRule = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Rule[]>>) =>
      (text: string) =>
        setter((prev) => [...prev, { id: makeId(), text, active: true }]),
    []
  )

  const allRules = [...toneRules, ...formatRules, ...customRules]
  const activeCount = allRules.filter((r) => r.active).length + activeBannedWords.size
  const totalCount = allRules.length + bannedWords.length
  const strengthPercent = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0

  return (
    <div className="space-y-5">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <RuleSection
            title="Tone rules"
            description="Define the voice and tone of your content"
            icon={IconMessage}
            rules={toneRules}
            onToggle={toggleRule(setToneRules)}
            onRemove={removeRule(setToneRules)}
            onAdd={addRule(setToneRules)}
          />
          <RuleSection
            title="Format rules"
            description="Set structural requirements for generated posts"
            icon={IconRuler}
            rules={formatRules}
            onToggle={toggleRule(setFormatRules)}
            onRemove={removeRule(setFormatRules)}
            onAdd={addRule(setFormatRules)}
          />
          <RuleSection
            title="Custom rules"
            description="Add your own brand-specific rules"
            icon={IconSparkles}
            rules={customRules}
            onToggle={toggleRule(setCustomRules)}
            onRemove={removeRule(setCustomRules)}
            onAdd={addRule(setCustomRules)}
          />
        </div>
        <div className="space-y-5">
          <BannedWordsCard
            words={bannedWords}
            activeWords={activeBannedWords}
            onToggleWord={(word) =>
              setActiveBannedWords((prev) => {
                const next = new Set(prev)
                if (next.has(word)) next.delete(word)
                else next.add(word)
                return next
              })
            }
            onAddWord={(word) => {
              setBannedWords((prev) => [...prev, word])
              setActiveBannedWords((prev) => new Set([...prev, word]))
            }}
            onRemoveWord={(word) => {
              setBannedWords((prev) => prev.filter((w) => w !== word))
              setActiveBannedWords((prev) => {
                const next = new Set(prev)
                next.delete(word)
                return next
              })
            }}
          />
          <PreviewCard
            toneRules={toneRules}
            formatRules={formatRules}
            bannedWords={[...activeBannedWords]}
          />
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-medium">{activeCount}/{totalCount} rules active</p>
                <p className="text-[10px] text-muted-foreground">Shield strength</p>
              </div>
              <Progress value={strengthPercent} className="h-2 w-24" />
            </div>
          </div>
            </div>
          </div>
    </div>
  )
}

export { GuardrailsContent }
