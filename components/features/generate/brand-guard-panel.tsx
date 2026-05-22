"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconShield, IconCheck, IconX } from "@tabler/icons-react"

const TONE_RULES = [
  "Professional voice",
  "No clickbait hooks",
  "No generic platitudes",
]

const FORMAT_RULES = ["Max 1,300 characters", "Hook under 150 chars"]

const BANNED_WORDS = ["game changer", "synergy", "leverage"]

function BrandGuardPanel() {
  return (
    <Card className="hidden w-80 shrink-0 lg:block">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconShield className="h-4 w-4 text-primary" />
          Brand Guard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 mt-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Tone rules
          </p>
          {TONE_RULES.map((rule) => (
            <div key={rule} className="flex items-center gap-2 text-sm">
              <IconCheck className="h-3.5 w-3.5 text-green-500" />
              {rule}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Format rules
          </p>
          {FORMAT_RULES.map((rule) => (
            <div key={rule} className="flex items-center gap-2 text-sm">
              <IconCheck className="h-3.5 w-3.5 text-green-500" />
              {rule}
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Banned words
          </p>
          {BANNED_WORDS.map((word) => (
            <div
              key={word}
              className="flex items-center gap-2 text-sm text-destructive"
            >
              <IconX className="h-3.5 w-3.5" />
              {word}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full border-dashed text-xs"
        >
          Protect your brand
        </Button>
      </CardContent>
    </Card>
  )
}

export { BrandGuardPanel }
