"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  MultiSelect,
  type SelectOption,
} from "@/components/shared/multi-select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { TimePicker } from "@/components/shared/time-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconInfoCircle, IconDeviceFloppy } from "@tabler/icons-react"
import { toast } from "sonner"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import type {
  TrendingPlatform,
  ScheduleType,
} from "@/modules/trending/trending.types"

const PLATFORMS: {
  value: TrendingPlatform
  label: string
  url: string
  api: string
}[] = [
  {
    value: "hackernews",
    label: "Hacker News",
    url: "news.ycombinator.com",
    api: "HN Algolia API — fetches top/new stories with metadata.\nFlow: Fetch top stories → filter by score/recency → extract titles + URLs + comments.",
  },
  {
    value: "devto",
    label: "Dev.to",
    url: "dev.to",
    api: "Dev.to API (dev.to/api/articles) — fetches popular articles by tag.\nFlow: Fetch top articles → filter by reactions/comments → extract title + body + tags.",
  },
  {
    value: "github",
    label: "GitHub",
    url: "github.com/trending",
    api: "GitHub Trending — scrapes trending repos by language.\nFlow: Fetch trending repos → filter by stars gained → extract name + description + language.",
  },
  {
    value: "reddit",
    label: "Reddit",
    url: "reddit.com",
    api: "Reddit JSON API — fetches hot posts from subreddits.\nFlow: Fetch hot posts → filter by upvotes/comments → extract title + body + subreddit.",
  },
]

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

interface TrendingSettingsPanelProps {
  open: boolean
  prefs: TrendingPrefs
  onClose: () => void
  onSave: (prefs: TrendingPrefs) => void
  audienceOptions?: SelectOption[]
  languageOptions?: SelectOption[]
  topicOptions?: SelectOption[]
  industryOptions?: SelectOption[]
  rssFeeds?: { id: string; title: string; url: string }[]
}

function TrendingSettingsPanel({
  open,
  prefs,
  onClose,
  onSave,
  audienceOptions,
  languageOptions,
  topicOptions,
  industryOptions,
  rssFeeds = [],
}: TrendingSettingsPanelProps) {
  const [enabled, setEnabled] = useState(prefs.enabled)
  const [platforms, setPlatforms] = useState<TrendingPlatform[]>(
    prefs.platforms as TrendingPlatform[]
  )
  const [topics, setTopics] = useState<string[]>(prefs.topics)
  const [industry, setIndustry] = useState<string[]>(prefs.industry)
  const [audience, setAudience] = useState<string[]>(prefs.targetAudience)
  const [language, setLanguage] = useState<string[]>(prefs.language)
  const [postsPerPlatform, setPostsPerPlatform] = useState(
    prefs.postsPerPlatform
  )
  const [topPostsForAI, setTopPostsForAI] = useState(prefs.topPostsForAI)
  const [postsToGenerate, setPostsToGenerate] = useState(prefs.postsToGenerate)
  const [scheduleType, setScheduleType] = useState<ScheduleType>(
    prefs.scheduleType as ScheduleType
  )
  const [scheduledTime, setScheduledTime] = useState(prefs.scheduledTime)
  const [scheduledDay, setScheduledDay] = useState<string | null>(
    prefs.scheduledDay
  )

  function togglePlatform(p: TrendingPlatform) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  function handleSave() {
    if (platforms.length === 0) {
      toast.error("Select at least one platform")
      return
    }

    onSave({
      enabled,
      platforms,
      topics,
      industry,
      targetAudience: audience,
      language,
      postsPerPlatform,
      topPostsForAI,
      postsToGenerate,
      scheduleType,
      scheduledTime,
      scheduledDay: scheduleType === "weekly" ? scheduledDay : null,
    })
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="right"
          className="w-[480px] overflow-y-auto sm:w-[540px]"
        >
          <SheetHeader>
            <SheetTitle>Trending Settings</SheetTitle>
            <SheetDescription>
              Configure how and when trending posts are generated.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 p-4">
            {/* Platforms */}
            <div>
              <Label className="mb-2 block text-xs font-medium">
                Platforms
              </Label>
              <div className="space-y-2">
                {PLATFORMS.map((p) => (
                  <div key={p.value} className="flex items-center gap-3">
                    <Switch
                      checked={platforms.includes(p.value)}
                      onCheckedChange={() => togglePlatform(p.value)}
                      className="scale-90"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium">{p.label}</span>
                      <span className="ml-2 text-[11px] text-muted-foreground">
                        {p.url}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <IconInfoCircle className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="max-w-[280px] text-xs whitespace-pre-line"
                      >
                        {p.api}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}

                {rssFeeds.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    {rssFeeds.map((feed) => (
                      <div key={feed.id} className="flex items-center gap-3">
                        <Switch
                          checked={platforms.includes(feed.url as TrendingPlatform)}
                          onCheckedChange={() => togglePlatform(feed.url as TrendingPlatform)}
                          className="scale-90"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium">{feed.title}</span>
                          <span className="ml-2 text-[11px] text-muted-foreground">
                            {feed.url}
                          </span>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <IconInfoCircle className="h-3.5 w-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            className="max-w-[280px] text-xs whitespace-pre-line"
                          >
                            Custom RSS Feed
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Fetch Settings */}
            <div>
              <Label className="mb-2 block text-xs font-medium">
                Fetch Settings
              </Label>
              <div className="space-y-3">
                {[
                  {
                    label: "Posts per platform",
                    value: postsPerPlatform,
                    setter: setPostsPerPlatform,
                    min: 1,
                    max: 10,
                  },
                  {
                    label: "Top posts for AI",
                    value: topPostsForAI,
                    setter: setTopPostsForAI,
                    min: 1,
                    max: 5,
                  },
                  {
                    label: "Posts to generate",
                    value: postsToGenerate,
                    setter: setPostsToGenerate,
                    min: 1,
                    max: 3,
                  },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-muted-foreground">
                      {field.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.setter(Math.max(field.min, field.value - 1))
                        }
                      >
                        −
                      </Button>
                      <span className="w-6 text-center text-xs font-medium">
                        {field.value}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.setter(Math.min(field.max, field.value + 1))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Selects — same approach as post-creation-form */}
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1 text-xs font-medium">
                  Topics / Keywords
                </Label>
                <MultiSelect
                  options={topicOptions ?? []}
                  selected={topics}
                  onChange={setTopics}
                  placeholder="Select topics..."
                  creatable
                  maxVisible={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1 text-xs font-medium">
                  Industry
                </Label>
                <MultiSelect
                  options={industryOptions ?? []}
                  selected={industry}
                  onChange={setIndustry}
                  placeholder="Select industry..."
                  maxVisible={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1 text-xs font-medium">
                  Who is your audience?
                </Label>
                <MultiSelect
                  options={audienceOptions ?? []}
                  selected={audience}
                  onChange={setAudience}
                  placeholder="Select audience..."
                  maxVisible={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1 text-xs font-medium">
                  Language
                </Label>
                <MultiSelect
                  options={languageOptions ?? []}
                  selected={language}
                  onChange={setLanguage}
                  placeholder="Select languages..."
                  maxVisible={3}
                />
              </div>
            </div>

            <Separator />

            {/* Schedule */}
            <div>
              <Label className="mb-2 block text-xs font-medium">Schedule</Label>
              <RadioGroup
                value={scheduleType}
                onValueChange={(v) => setScheduleType(v as ScheduleType)}
                className="flex gap-4"
              >
                {(["hourly", "daily", "weekly"] as ScheduleType[]).map((s) => (
                  <label key={s} className="flex items-center gap-1.5 text-xs">
                    <RadioGroupItem value={s} />
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </label>
                ))}
              </RadioGroup>

              {scheduleType !== "hourly" && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1 text-xs font-medium">
                      Time
                    </Label>
                    <TimePicker
                      value={scheduledTime}
                      onChange={setScheduledTime}
                      className="w-full"
                    />
                  </div>

                  {scheduleType === "weekly" && (
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-1 text-xs font-medium">
                        Day
                      </Label>
                      <Select
                        value={scheduledDay ?? "Monday"}
                        onValueChange={(v) => setScheduledDay(v)}
                      >
                        <SelectTrigger className="flex min-h-[44px] w-full bg-transparent dark:bg-input/30">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-2 pb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="h-8 gap-1.5 text-xs"
              >
                <IconDeviceFloppy className="h-3.5 w-3.5" />
                Save Settings
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}

export { TrendingSettingsPanel }
