"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { PLATFORMS } from "@/lib/constants/preview"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectPreviewPrefs,
  updatePreviewPrefs,
} from "@/store/slices/preview-prefs.slice"
import type { PreviewConfig } from "@/modules/prefs/prefs.schema"
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconEye,
} from "@tabler/icons-react"
import type { PlatformId } from "@/lib/constants/preview"

const PLATFORM_ICONS: Record<PlatformId, React.ReactNode> = {
  linkedin: <IconBrandLinkedin className="h-4 w-4" />,
  twitter: <IconBrandTwitter className="h-4 w-4" />,
  facebook: <IconBrandFacebook className="h-4 w-4" />,
}

function PreviewConfigCard() {
  const dispatch = useAppDispatch()
  const prefs = useAppSelector(selectPreviewPrefs)
  const enabledPlatforms = prefs?.enabledPlatforms ?? []

  async function handleToggle(platformId: PlatformId, checked: boolean) {
    if (!prefs) return

    const updated: PreviewConfig = {
      enabledPlatforms: checked
        ? [...enabledPlatforms, platformId]
        : enabledPlatforms.filter((p) => p !== platformId),
    }

    try {
      const result = await dispatch(updatePreviewPrefs(updated)).unwrap()
      toast.success(
        checked
          ? `${PLATFORMS.find((p) => p.id === platformId)?.label} preview enabled`
          : `${PLATFORMS.find((p) => p.id === platformId)?.label} preview disabled`
      )
    } catch {
      toast.error("Failed to update preview settings")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <IconEye className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm">Post Previews</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Show platform preview buttons on generated posts.
        </p>
        {PLATFORMS.map((platform) => (
          <label
            key={platform.id}
            className="flex items-center justify-between rounded-lg border px-3 py-2.5 transition hover:bg-muted/50"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-muted-foreground">
                {PLATFORM_ICONS[platform.id]}
              </span>
              <span className="text-sm">{platform.label}</span>
            </div>
            <Switch
              checked={enabledPlatforms.includes(platform.id)}
              onCheckedChange={(checked) => handleToggle(platform.id, checked)}
            />
          </label>
        ))}
      </CardContent>
    </Card>
  )
}

export { PreviewConfigCard }
