"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MultiSelect, type SelectOption } from "@/components/shared"
import { IconTrendingUp, IconSparkles, IconLoader2, IconMap, IconUsers, IconMessageCircle, IconGlobe } from "@tabler/icons-react"
import {
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  TOPIC_MAX_LENGTH,
  TOPIC_WARNING_THRESHOLD,
  FORM_PREFS_KEY,
} from "@/lib/constants"

const TOPIC_SUGGESTIONS = [
  "Why most startups fail at hiring in 2025",
  "AI replacing resume screening — what actually works",
  "The 4-day work week experiment: honest results",
  "Remote work productivity hacks that stick",
  "Building diverse engineering teams",
  "Scaling from 5 to 50 people: hiring lessons",
]

const QUICK_PRESETS = [
  {
    label: "Founder Mode",
    icon: IconMap,
    audiences: ["Startup Founders"],
    tones: ["Thought Leadership", "Storytelling"],
    languages: ["EN"],
  },
  {
    label: "Dev Rel",
    icon: IconUsers,
    audiences: ["Fellow Developers"],
    tones: ["Educational", "Conversational"],
    languages: ["EN"],
  },
  {
    label: "Leadership",
    icon: IconMessageCircle,
    audiences: ["CTO / VP Engineering"],
    tones: ["Thought Leadership", "Analytical"],
    languages: ["EN"],
  },
]

function loadPrefs(): { audiences: string[]; tones: string[]; languages: string[]; emoji: boolean } {
  if (typeof window === "undefined") return { audiences: ["Founders"], tones: ["Thought leader", "Story"], languages: ["EN"], emoji: true }
  try {
    const raw = localStorage.getItem(FORM_PREFS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { audiences: ["Founders"], tones: ["Thought leader", "Story"], languages: ["EN"], emoji: true }
}

interface PostCreationFormProps {
  onGenerate: (data: {
    topic: string
    audiences: string[]
    tones: string[]
    languages: string[]
    includeEmoji: boolean
  }) => void
  isSubmitting?: boolean
  userName?: string
  audienceOptions?: (string | SelectOption)[]
  toneOptions?: (string | SelectOption)[]
  languageOptions?: (string | SelectOption)[]
}

function PostCreationFormInner({ onGenerate, isSubmitting, userName, audienceOptions = AUDIENCE_OPTIONS, toneOptions = TONE_OPTIONS, languageOptions = LANGUAGE_OPTIONS }: PostCreationFormProps) {
  const searchParams = useSearchParams()
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState<string[]>(() => loadPrefs().audiences)
  const [tones, setTones] = useState<string[]>(() => loadPrefs().tones)
  const [languages, setLanguages] = useState<string[]>(() => loadPrefs().languages)
  const [emoji, setEmoji] = useState(() => loadPrefs().emoji)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    localStorage.setItem(FORM_PREFS_KEY, JSON.stringify({ audiences: audience, tones, languages, emoji }))
  }, [audience, tones, languages, emoji])

  const charCount = topic.length
  const isOverWarning = charCount > TOPIC_WARNING_THRESHOLD
  const isDisabled = topic.trim().length === 0 || isSubmitting
  const progressPercent = Math.min((charCount / TOPIC_WARNING_THRESHOLD) * 100, 100)

  const handleSubmit = () => {
    onGenerate({
      topic,
      audiences: audience,
      tones,
      languages,
      includeEmoji: emoji,
    })
  }

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setAudience(preset.audiences)
    setTones(preset.tones)
    setLanguages(preset.languages)
  }

  const applySuggestion = (suggestion: string) => {
    setTopic(suggestion)
  }

  return (
    <Card className="flex-1 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <IconTrendingUp className="h-4 w-4 text-primary" />
            What&apos;s on your mind, {userName || "creator"}?
          </CardTitle>
          <Badge variant="secondary" className="text-[10px] font-medium">
            <IconSparkles className="mr-1 h-3 w-3" />
            3 posts in ~12 seconds
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic Input Section */}
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              value={topic}
              onChange={(e) => {
                if (e.target.value.length <= TOPIC_MAX_LENGTH) {
                  setTopic(e.target.value)
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Share the insight your audience is missing — what should they know?"
              rows={6}
              className={`min-h-[140px] resize-none border-2 transition-colors duration-200 ${
                isFocused ? "border-primary/40" : "border-border"
              } ${topic.trim().length > 0 ? "bg-primary/[0.02]" : ""}`}
            />
            {/* Character progress bar */}
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverWarning ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span
                className={`text-[10px] font-medium tabular-nums ${
                  isOverWarning ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {charCount}
              </span>
            </div>
          </div>

          {/* Topic Suggestions */}
          {topic.trim().length === 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Topics your peers are writing about — pick one to get started
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => applySuggestion(suggestion)}
                    className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Configuration Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">Shape your post</p>
            <p className="text-[10px] text-muted-foreground">Or skip — defaults work great</p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset) => {
              const Icon = preset.icon
              const isActive =
                preset.audiences.every((a) => audience.includes(a)) &&
                preset.tones.every((t) => tones.includes(t))
              return (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {preset.label}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconUsers className="h-3 w-3 text-muted-foreground" />
                Who is your audience?
              </Label>
              <MultiSelect
                options={audienceOptions}
                selected={audience}
                onChange={setAudience}
                placeholder="Select audience..."
                maxVisible={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconMessageCircle className="h-3 w-3 text-muted-foreground" />
                What vibe?
              </Label>
              <MultiSelect
                options={toneOptions}
                selected={tones}
                onChange={setTones}
                placeholder="Select tones..."
                maxVisible={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconGlobe className="h-3 w-3 text-muted-foreground" />
                Language
              </Label>
              <MultiSelect
                options={languageOptions}
                selected={languages}
                onChange={setLanguages}
                placeholder="Select languages..."
                maxVisible={3}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={emoji}
            onCheckedChange={setEmoji}
            className="data-[state=checked]:bg-primary"
          />
          <Label className="text-xs text-muted-foreground">
            Boost engagement with emoji
          </Label>
        </div>
        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          className="group gap-2 brand-gradient px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <IconSparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
          )}
          {isSubmitting ? "Crafting your voice..." : "Write My Post"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function PostCreationForm(props: PostCreationFormProps) {
  return (
    <Suspense>
      <PostCreationFormInner {...props} />
    </Suspense>
  )
}

export { PostCreationForm }
