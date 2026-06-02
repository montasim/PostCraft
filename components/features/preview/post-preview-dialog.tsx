"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
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
  if (!platform) return null

  const PreviewComponent = PLATFORM_PREVIEWS[platform]
  const platformName = PLATFORM_DISPLAY_NAMES[platform]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[calc(100%-1rem)] sm:max-w-[580px]"
        showCloseButton
      >
        <DialogTitle className="sr-only">{platformName} Preview</DialogTitle>
        <PreviewComponent variant={variant} />
      </DialogContent>
    </Dialog>
  )
}

export { PostPreviewDialog }
