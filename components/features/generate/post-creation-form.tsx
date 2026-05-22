"use client"

import { useState } from "react"
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
import { MultiSelect } from "@/components/shared"
import { IconTrendingUp, IconSparkles } from "@tabler/icons-react"
import {
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
} from "@/lib/constants"

const TOPIC_MAX_LENGTH = 500
const TOPIC_WARNING_THRESHOLD = 450

const DEFAULT_TOPIC =
  "How AI is changing software hiring in 2025 — and why most companies are still stuck using the same broken interview process."

function PostCreationForm() {
  const [topic, setTopic] = useState(DEFAULT_TOPIC)
  const [audience, setAudience] = useState<string[]>(["Founders"])
  const [tones, setTones] = useState<string[]>(["Thought leader", "Story"])
  const [languages, setLanguages] = useState<string[]>(["EN"])
  const [emoji, setEmoji] = useState(true)

  const charCount = topic.length
  const isOverWarning = charCount > TOPIC_WARNING_THRESHOLD
  const isDisabled = topic.trim().length === 0

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <IconTrendingUp className="h-4 w-4 text-primary" />
            What&apos;s trending? <span className="text-destructive">*</span>
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">
            ~12s to publish
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Textarea
            value={topic}
            onChange={(e) => {
              if (e.target.value.length <= TOPIC_MAX_LENGTH) {
                setTopic(e.target.value)
              }
            }}
            placeholder="e.g. Why most startups fail at hiring, AI replacing resume screening..."
            rows={10}
            className="min-h-[200px] resize-none"
          />
          <p
            className={`text-right text-xs ${
              isOverWarning ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {charCount}/{TOPIC_MAX_LENGTH}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Target audience
            </Label>
            <MultiSelect
              options={AUDIENCE_OPTIONS}
              selected={audience}
              onChange={setAudience}
              placeholder="Select audience..."
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Tones</Label>
            <MultiSelect
              options={TONE_OPTIONS}
              selected={tones}
              onChange={setTones}
              placeholder="Select tones..."
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Languages</Label>
            <MultiSelect
              options={LANGUAGE_OPTIONS}
              selected={languages}
              onChange={setLanguages}
              placeholder="Select languages..."
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch checked={emoji} onCheckedChange={setEmoji} />
          <Label className="text-xs text-muted-foreground">
            Include emoji
          </Label>
        </div>
        <Button
          disabled={isDisabled}
          className="gap-2 bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 text-primary-foreground"
        >
          <IconSparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Generate
        </Button>
      </CardFooter>
    </Card>
  )
}

export { PostCreationForm }
