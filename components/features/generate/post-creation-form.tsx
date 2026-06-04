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
import { Progress } from "@/components/ui/progress"
import { MultiSelect, type SelectOption } from "@/components/shared"
import { cn } from "@/lib/utils"
import {
  IconTrendingUp,
  IconPencil,
  IconSparkles,
  IconLoader2,
  IconUsers,
  IconMessageCircle,
  IconGlobe,
  IconArticle,
  IconHash,
  IconDeviceMobile,
} from "@tabler/icons-react"
import {
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  PLATFORM_OPTIONS,
  TOPIC_MAX_LENGTH,
  TOPIC_WARNING_THRESHOLD,
  POST_COUNT_DEFAULT,
  POST_COUNT_MIN,
  POST_COUNT_MAX,
  HASHTAG_COUNT_DEFAULT,
} from "@/lib/constants"
import type { GenerationPrefs } from "@/modules/prefs/prefs.schema"
import { API } from "@/lib/constants"
import { consumeRefineData, type RefineData } from "@/lib/refine-store"
import { TopicSuggestions } from "./topic-suggestions"
import { QuickPresets, type Preset } from "./quick-presets"


interface PostCreationFormProps {
  onGenerate: (data: {
    topic: string
    audiences: string[]
    tones: string[]
    languages: string[]
    includeEmoji: boolean
    postCount: number
    platforms: string[]
    hashtagCount: number
  }) => void
  isSubmitting?: boolean
  quotaExceeded?: boolean
  userName?: string
  initialPrefs?: GenerationPrefs
  initialRefine?: RefineData | null
  audienceOptions?: (string | SelectOption)[]
  toneOptions?: (string | SelectOption)[]
  languageOptions?: (string | SelectOption)[]
  platformOptions?: SelectOption[]
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
  platformOptions = PLATFORM_OPTIONS,
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
  const [postCount, setPostCount] = useState(
    initialPrefs?.postCount ?? POST_COUNT_DEFAULT
  )
  const [hashtagCount, setHashtagCount] = useState(
    initialPrefs?.hashtagCount ?? HASHTAG_COUNT_DEFAULT
  )
  const [platforms, setPlatforms] = useState<string[]>(
    initialPrefs?.platforms ?? []
  )
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
    postCount: number
    hashtagCount: number
    platforms: string[]
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
    const activePlatforms = platforms.length > 0 ? platforms : ["linkedin"]
    onGenerate({
      topic,
      audiences: audience,
      tones,
      languages,
      includeEmoji: emoji,
      postCount,
      platforms: activePlatforms,
      hashtagCount,
    })
  }

  const applyPreset = (preset: Preset) => {
    const next = {
      audiences: preset.audiences,
      tones: preset.tones,
      languages: preset.languages,
      emoji,
      postCount,
      hashtagCount,
      platforms,
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
    savePrefs({ audiences: val, tones, languages, emoji, postCount, hashtagCount, platforms })
  }

  const handleTonesChange = (val: string[]) => {
    setTones(val)
    savePrefs({ audiences: audience, tones: val, languages, emoji, postCount, hashtagCount, platforms })
  }

  const handleLanguagesChange = (val: string[]) => {
    setLanguages(val)
    savePrefs({ audiences: audience, tones, languages: val, emoji, postCount, hashtagCount, platforms })
  }

  const handleEmojiChange = (val: boolean) => {
    setEmoji(val)
    savePrefs({ audiences: audience, tones, languages, emoji: val, postCount, hashtagCount, platforms })
  }

  const handlePostCountChange = (val: number) => {
    setPostCount(val)
    savePrefs({ audiences: audience, tones, languages, emoji, postCount: val, hashtagCount, platforms })
  }

  const handleHashtagCountChange = (val: number) => {
    setHashtagCount(val)
    savePrefs({ audiences: audience, tones, languages, emoji, postCount, hashtagCount: val, platforms })
  }

  const handlePlatformsChange = (val: string[]) => {
    setPlatforms(val)
    savePrefs({ audiences: audience, tones, languages, emoji, postCount, hashtagCount, platforms: val })
  }

  return (
    <Card className="flex-1 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <IconPencil className="h-4 w-4 text-primary" />
            What&apos;s on your mind, {userName || "creator"}?
          </CardTitle>
          <Badge variant="secondary" className="text-[10px] font-medium">
            <IconSparkles className="mr-1 h-3 w-3" />
            {postCount} post{postCount > 1 ? "s" : ""} in ~{postCount * 4}s
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
              placeholder="What should your audience know? Drop your topic here."
              rows={6}
              className={`min-h-[140px] max-h-[280px] overflow-y-auto resize-none border-2 transition-colors duration-200 ${
                isFocused ? "border-primary/40" : "border-border"
              } ${topic.trim().length > 0 ? "bg-primary/[0.02]" : ""}`}
            />
            {/* Character progress bar */}
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Progress
                value={progressPercent}
                className="mt-2 h-1.5"
                aria-label="Character limit progress"
              >
                <div
                  className={cn(
                    "h-full transition-all",
                    isOverWarning ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </Progress>
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
            <TopicSuggestions
              loading={suggestionsLoading}
              suggestions={topicSuggestions}
              onSelect={applySuggestion}
            />
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Configuration Section */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-foreground">Fine-tune</p>
            <p className="text-[10px] text-muted-foreground">
              Defaults are good enough
            </p>
          </div>

          {/* Quick Presets */}
          <QuickPresets
            currentAudience={audience}
            currentTones={tones}
            onSelect={applyPreset}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconUsers className="h-3 w-3 text-muted-foreground" />
                Write for
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
                Tone
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconArticle className="h-3 w-3 text-muted-foreground" />
                Number of posts
              </Label>
              <input
                type="number"
                min={POST_COUNT_MIN}
                max={POST_COUNT_MAX}
                value={postCount}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  if (!isNaN(v))
                    handlePostCountChange(
                      Math.max(POST_COUNT_MIN, Math.min(POST_COUNT_MAX, v))
                    )
                }}
                className="flex min-h-[44px] w-full rounded-lg border border-border/60 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconHash className="h-3 w-3 text-muted-foreground" />
                Hashtags per post
              </Label>
              <input
                type="number"
                min={1}
                max={10}
                value={hashtagCount}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  if (!isNaN(v)) handleHashtagCountChange(Math.max(1, Math.min(10, v)))
                }}
                className="flex min-h-[44px] w-full rounded-lg border border-border/60 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium">
                <IconDeviceMobile className="h-3 w-3 text-muted-foreground" />
                Platforms
              </Label>
              <MultiSelect
                options={platformOptions}
                selected={platforms}
                onChange={handlePlatformsChange}
                placeholder="Select platforms..."
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
          className="group gap-2 bg-linear-to-br from-primary to-chart-2 px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <IconSparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
          )}
          {isSubmitting
            ? "Writing your posts..."
            : quotaExceeded
              ? "Daily Limit Reached"
              : `Generate ${postCount} Post${postCount > 1 ? "s" : ""}`}
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
