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
import {
  IconTrendingUp,
  IconSparkles,
  IconLoader2,
  IconMap,
  IconUsers,
  IconMessageCircle,
  IconGlobe,
} from "@tabler/icons-react"
import {
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  TOPIC_MAX_LENGTH,
  TOPIC_WARNING_THRESHOLD,
} from "@/lib/constants"
import type { GenerationPrefs } from "@/modules/prefs/prefs.schema"
import { API } from "@/lib/constants"
import { consumeRefineData, type RefineData } from "@/lib/refine-store"

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

interface PostCreationFormProps {
  onGenerate: (data: {
    topic: string
    audiences: string[]
    tones: string[]
    languages: string[]
    includeEmoji: boolean
  }) => void
  isSubmitting?: boolean
  quotaExceeded?: boolean
  userName?: string
  initialPrefs?: GenerationPrefs
  initialRefine?: RefineData | null
  audienceOptions?: (string | SelectOption)[]
  toneOptions?: (string | SelectOption)[]
  languageOptions?: (string | SelectOption)[]
}

function PostCreationFormInner({
  onGenerate,
  isSubmitting,
  quotaExceeded,
  userName,
  initialPrefs,
  initialRefine,
  audienceOptions = AUDIENCE_OPTIONS,
  toneOptions = TONE_OPTIONS,
  languageOptions = LANGUAGE_OPTIONS,
}: PostCreationFormProps) {
  const searchParams = useSearchParams()
  const refine = initialRefine ?? consumeRefineData()
  const [topic, setTopic] = useState(refine?.topic ?? "")
  const [audience, setAudience] = useState<string[]>(
    refine?.audiences?.length
      ? refine.audiences
      : (initialPrefs?.audiences ?? ["Founders"])
  )
  const [tones, setTones] = useState<string[]>(
    refine?.tones?.length
      ? refine.tones
      : (initialPrefs?.tones ?? ["Thought leader", "Story"])
  )
  const [languages, setLanguages] = useState<string[]>(
    refine?.languages?.length
      ? refine.languages
      : (initialPrefs?.languages ?? ["EN"])
  )
  const [emoji, setEmoji] = useState(initialPrefs?.emoji ?? true)
  const [isFocused, setIsFocused] = useState(false)
  const [topicSuggestions, setTopicSuggestions] = useState<string[]>([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(true)

  const charCount = topic.length
  const isOverWarning = charCount > TOPIC_WARNING_THRESHOLD
  const isDisabled = topic.trim().length === 0 || isSubmitting || quotaExceeded
  const progressPercent = Math.min(
    (charCount / TOPIC_WARNING_THRESHOLD) * 100,
    100
  )

  const savePrefs = (data: {
    audiences: string[]
    tones: string[]
    languages: string[]
    emoji: boolean
  }) => {
    fetch(API.PREFS_GENERATION, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {
      // Non-critical: prefs save failed
    })
  }

  useEffect(() => {
    let cancelled = false
    setSuggestionsLoading(true)

    fetch(API.TRENDING_GLOBAL_TOPICS)
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return
        if (res.success && Array.isArray(res.data?.topics)) {
          setTopicSuggestions(res.data.topics)
        }
      })
      .catch(() => {
        // Non-critical: topic suggestions load failed
      })
      .finally(() => {
        if (!cancelled) setSuggestionsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = () => {
    onGenerate({
      topic,
      audiences: audience,
      tones,
      languages,
      includeEmoji: emoji,
    })
  }

  const applyPreset = (preset: (typeof QUICK_PRESETS)[0]) => {
    const next = {
      audiences: preset.audiences,
      tones: preset.tones,
      languages: preset.languages,
      emoji,
    }
    setAudience(next.audiences)
    setTones(next.tones)
    setLanguages(next.languages)
    savePrefs(next)
  }

  const applySuggestion = (suggestion: string) => {
    setTopic(suggestion)
  }

  const handleAudienceChange = (val: string[]) => {
    setAudience(val)
    savePrefs({ audiences: val, tones, languages, emoji })
  }

  const handleTonesChange = (val: string[]) => {
    setTones(val)
    savePrefs({ audiences: audience, tones: val, languages, emoji })
  }

  const handleLanguagesChange = (val: string[]) => {
    setLanguages(val)
    savePrefs({ audiences: audience, tones, languages: val, emoji })
  }

  const handleEmojiChange = (val: boolean) => {
    setEmoji(val)
    savePrefs({ audiences: audience, tones, languages, emoji: val })
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
            <IconSparkles className="mr-1 h-3 w-3" />3 posts in ~12 seconds
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
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
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                {suggestionsLoading
                  ? "Loading trending topics..."
                  : topicSuggestions.length > 0
                    ? "Trending in tech right now — pick one to get started"
                    : null}
              </p>
              {suggestionsLoading ? (
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-7 w-40 animate-pulse rounded-md bg-muted/40"
                    />
                  ))}
                </div>
              ) : topicSuggestions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {topicSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => applySuggestion(suggestion)}
                      className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      <IconTrendingUp className="h-3 w-3 text-orange-500" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Configuration Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">
              Shape your post
            </p>
            <p className="text-[10px] text-muted-foreground">
              Or skip — defaults work great
            </p>
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
                onChange={handleAudienceChange}
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
                onChange={handleTonesChange}
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
                onChange={handleLanguagesChange}
                placeholder="Select languages..."
                maxVisible={3}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-4 py-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={emoji}
            onCheckedChange={handleEmojiChange}
            className="data-[state=checked]:bg-primary"
          />
          <Label className="text-xs text-muted-foreground">
            Boost engagement with emoji
          </Label>
        </div>
        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          className="group gap-2 px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all brand-gradient hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <IconSparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
          )}
          {isSubmitting
            ? "Crafting your voice..."
            : quotaExceeded
              ? "Quota Exceeded"
              : "Write My Post"}
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
