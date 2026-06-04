"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  IconCalendar,
  IconSend,
  IconLoader2,
  IconInfoCircle,
} from "@tabler/icons-react"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkedInPreview } from "./linkedin-preview"
import { TwitterPreview } from "./twitter-preview"
import { FacebookPreview } from "./facebook-preview"
import type { Variant } from "@/types"
import type { PlatformId } from "@/lib/constants/preview"
import { PLATFORM_DISPLAY_NAMES } from "@/lib/constants/preview"

interface PostPreviewDialogProps {
  variant: Variant
  platform: PlatformId | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PLATFORM_PREVIEWS: Record<PlatformId, typeof LinkedInPreview> = {
  linkedin: LinkedInPreview,
  twitter: TwitterPreview,
  facebook: FacebookPreview,
}

function PostPreviewDialog({
  variant,
  platform,
  open,
  onOpenChange,
}: PostPreviewDialogProps) {
  const [isPosting, setIsPosting] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")

  if (!platform) return null

  const PreviewComponent = PLATFORM_PREVIEWS[platform]
  const platformName = PLATFORM_DISPLAY_NAMES[platform]

  async function handlePostNow() {
    setIsPosting(true)
    try {
      const response = await fetch(`/api/${platform}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${variant.hook}\n\n${variant.body}\n\n${variant.cta}`,
          hashtags: variant.hashtags,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to post")
      }

      toast.success(`Successfully posted to ${platformName}!`)
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Could not post to ${platformName}.`
      )
    } finally {
      setIsPosting(false)
    }
  }

  async function handleSchedule() {
    setIsScheduling(true)
    try {
      const response = await fetch(`/api/${platform}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${variant.hook}\n\n${variant.body}\n\n${variant.cta}`,
          hashtags: variant.hashtags,
          scheduledTime: new Date(scheduleDate).toISOString(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to schedule")
      }

      toast.success("Post scheduled successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not schedule post."
      )
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[calc(100%-1rem)] sm:max-w-[580px]"
        showCloseButton
      >
        <DialogTitle className="sr-only">{platformName} Preview</DialogTitle>
        <PreviewComponent variant={variant} />
        {(platform === "linkedin" ||
          platform === "facebook" ||
          platform === "twitter") && (
          <DialogFooter className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {showDatePicker ? (
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger
                      type="button"
                      className="focus:outline-none"
                    >
                      <IconInfoCircle className="h-4 w-4 shrink-0 cursor-help text-muted-foreground transition-colors hover:text-foreground" />
                    </TooltipTrigger>
                    <TooltipContent
                      className="max-w-[260px] p-3 text-center leading-relaxed"
                      side="top"
                      sideOffset={8}
                    >
                      <p>
                        We do not schedule posts directly on {platformName}.
                        Instead, PostCraft holds your post securely on our
                        servers and automatically publishes it to your account
                        at the scheduled time.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <input
                  type="datetime-local"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none sm:w-auto dark:[color-scheme:dark]"
                  style={{ accentColor: "hsl(var(--primary))" }}
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date(Date.now() + 10 * 60000)
                    .toISOString()
                    .slice(0, 16)}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowDatePicker(false)}
                  disabled={isScheduling}
                >
                  Cancel
                </Button>
                <Button
                  className="gap-2"
                  onClick={handleSchedule}
                  disabled={isScheduling || !scheduleDate}
                >
                  {isScheduling ? (
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <IconCalendar className="h-4 w-4" />
                  )}
                  Confirm
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setShowDatePicker(true)}
                  disabled={isPosting}
                >
                  <IconCalendar className="h-4 w-4" />
                  Schedule Post
                </Button>
                <Button
                  className={`gap-2 ${platform === "facebook" ? "bg-[#1877F2] text-white hover:bg-[#166fe5]" : platform === "twitter" ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" : "bg-[#0a66c2] text-white hover:bg-[#004182]"}`}
                  onClick={handlePostNow}
                  disabled={isPosting}
                >
                  {isPosting ? (
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <IconSend className="h-4 w-4" />
                  )}
                  Post Now
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { PostPreviewDialog }
