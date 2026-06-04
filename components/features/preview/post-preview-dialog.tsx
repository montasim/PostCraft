"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconCalendar, IconSend, IconLoader2 } from "@tabler/icons-react"
import { toast } from "sonner"
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

  if (!platform) return null

  const PreviewComponent = PLATFORM_PREVIEWS[platform]
  const platformName = PLATFORM_DISPLAY_NAMES[platform]

  async function handlePostNow() {
    setIsPosting(true)
    try {
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: variant.body,
          hashtags: variant.hashtags,
        }),
      })

      if (!response.ok) throw new Error("Failed to post")

      toast.success("Successfully posted to LinkedIn!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Could not post to LinkedIn. Please connect your account.")
    } finally {
      setIsPosting(false)
    }
  }

  async function handleSchedule() {
    setIsScheduling(true)
    try {
      const response = await fetch("/api/linkedin/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: variant.body,
          hashtags: variant.hashtags,
          scheduledTime: new Date(Date.now() + 86400000).toISOString(),
        }),
      })

      if (!response.ok) throw new Error("Failed to schedule")

      toast.success("Post scheduled for tomorrow!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Could not schedule post. Please connect your account.")
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
        {platform === "linkedin" && (
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleSchedule}
              disabled={isPosting || isScheduling}
            >
              {isScheduling ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconCalendar className="h-4 w-4" />}
              Schedule Post
            </Button>
            <Button 
              className="gap-2 bg-[#0a66c2] text-white hover:bg-[#004182]"
              onClick={handlePostNow}
              disabled={isPosting || isScheduling}
            >
              {isPosting ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconSend className="h-4 w-4" />}
              Post Now
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { PostPreviewDialog }
