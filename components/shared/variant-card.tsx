"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScorePill } from "@/components/shared/score-pill"
import { cn } from "@/lib/utils"
import {
  IconCopy,
  IconCheck,
  IconStar,
  IconTrophy,
  IconMedal,
  IconAward,
  IconExternalLink,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
} from "@tabler/icons-react"
import type { Variant } from "@/types"
import type { PlatformId } from "@/lib/constants/preview"
import { PLATFORM_DISPLAY_NAMES } from "@/lib/constants/preview"
import { PostPreviewDialog } from "@/components/features/preview/post-preview-dialog"
import { useAppSelector } from "@/store/hooks"
import { selectEnabledPlatforms } from "@/store/slices/preview-prefs.slice"

interface VariantCardProps {
  variant: Variant
  copied: boolean
  onCopy: () => void
  badgeLabel?: string
  headerIcon?: React.ReactNode
  headerIconClassName?: string
  sourceLink?: { title: string; url: string }
  extraActions?: React.ReactNode
}

const PLATFORM_ICONS: Record<PlatformId, React.ReactNode> = {
  linkedin: <IconBrandLinkedin className="h-3.5 w-3.5" />,
  twitter: <IconBrandTwitter className="h-3.5 w-3.5" />,
  facebook: <IconBrandFacebook className="h-3.5 w-3.5" />,
}

function VariantCard({
  variant,
  copied,
  onCopy,
  badgeLabel = "Recommended",
  headerIcon,
  headerIconClassName,
  sourceLink,
  extraActions,
}: VariantCardProps) {
  const isTop = variant.rank === 1
  const enabledPlatforms = useAppSelector(selectEnabledPlatforms)
  const [previewPlatform, setPreviewPlatform] = useState<PlatformId | null>(
    null
  )
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <>
      <Card
        className={cn(
          "relative overflow-visible p-4 transition hover:shadow-md",
          isTop && "border-primary/40 ring-1 ring-primary/20"
        )}
      >
        {isTop && (
          <Badge className="absolute -top-3 left-6 grid-flow-col items-center gap-1 rounded-full bg-linear-to-br from-primary to-chart-2 px-2.5 py-1 text-[10px] leading-none font-bold tracking-wider text-primary-foreground uppercase shadow">
            <IconStar className="h-3 w-3 fill-current" />
            {badgeLabel}
          </Badge>
        )}

        {enabledPlatforms.length > 0 && (
          <div className="absolute top-1/2 right-2 z-10 flex -translate-y-1/2 flex-col items-center gap-1.5">
            {enabledPlatforms.map((platform) => (
              <button
                key={platform}
                onClick={() => {
                  setPreviewPlatform(platform)
                  setPreviewOpen(true)
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-xs transition hover:bg-muted hover:text-foreground"
                title={`${PLATFORM_DISPLAY_NAMES[platform]} preview`}
              >
                {PLATFORM_ICONS[platform]}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1">
          <div
            className={cn(
              "row-span-2 flex h-10 w-10 items-center justify-center rounded-full",
              headerIcon
                ? headerIconClassName
                : isTop
                  ? "bg-linear-to-br from-primary to-chart-2 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {headerIcon ??
              (variant.rank === 1 ? (
                <IconTrophy className="h-5 w-5" />
              ) : variant.rank === 2 ? (
                <IconMedal className="h-5 w-5" />
              ) : (
                <IconAward className="h-5 w-5" />
              ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">#{variant.rank}</span>
            <div className="flex flex-wrap gap-1.5">
              <ScorePill
                label="Score"
                short="S"
                value={variant.score}
                color="score"
              />
              <ScorePill
                label="Engagement"
                short="E"
                value={variant.engagement}
                color="engagement"
              />
              <ScorePill
                label="Clarity"
                short="C"
                value={variant.clarity}
                color="clarity"
              />
              <ScorePill
                label="Formatting"
                short="F"
                value={variant.formatting}
                color="formatting"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{variant.style}</p>
            <p className="text-xs text-muted-foreground">{variant.language}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {sourceLink && (
          <>
            <a
              href={sourceLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <IconExternalLink className="h-3 w-3 shrink-0" />
              <span className="truncate">{sourceLink.title}</span>
            </a>
            <Separator className="my-4" />
          </>
        )}

        <div className="space-y-3">
          <p className="text-base leading-snug">{variant.hook}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {variant.body}
          </p>
          <p className="text-sm font-medium">{variant.cta}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {variant.hashtags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <p className="mb-3 text-xs text-muted-foreground italic">
          {variant.reasoning}
        </p>
        <div className="flex items-center gap-1.5">
          {extraActions}
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className={cn(
              "gap-1.5 text-xs",
              isTop &&
                "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            {copied ? (
              <>
                <IconCheck className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <IconCopy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </Button>
        </div>
      </Card>
      <PostPreviewDialog
        variant={variant}
        platform={previewPlatform}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </>
  )
}

export { VariantCard }
