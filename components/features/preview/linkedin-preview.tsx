"use client"

import type { Variant } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  IconThumbUp,
  IconMessage2,
  IconShare3,
  IconDots,
} from "@tabler/icons-react"

interface LinkedInPreviewProps {
  variant: Variant
}

function LinkedInPreview({ variant }: LinkedInPreviewProps) {
  return (
    <div className="mx-auto max-w-[550px] rounded-lg border bg-white p-0 shadow-sm">
      <div className="flex items-start gap-3 border-b px-4 py-3">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarFallback className="bg-[#0a66c2] text-sm font-semibold text-white">
            U
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#191919]">Your Name</p>
          <p className="text-xs text-[#666]">Your Headline Here</p>
          <p className="text-[11px] text-[#666]">1h ago</p>
        </div>
        <button className="shrink-0 text-[#666] hover:text-[#191919]">
          <IconDots className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3 px-4 py-3">
        <p className="text-sm leading-relaxed text-[#191919]">{variant.hook}</p>
        <p className="text-sm leading-relaxed text-[#191919]">{variant.body}</p>
        <p className="text-sm font-semibold text-[#191919]">{variant.cta}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {variant.hashtags.map((tag) => (
            <span key={tag} className="text-sm text-[#0a66c2]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-2 text-[#666]">
        <div className="flex items-center gap-1.5 text-xs">
          <IconThumbUp className="h-4 w-4" />
          <span>42</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>3 comments</span>
          <span>1 repost</span>
        </div>
      </div>

      <div className="flex items-center justify-around border-t px-2 py-1">
        {[
          { icon: IconThumbUp, label: "Like" },
          { icon: IconMessage2, label: "Comment" },
          { icon: IconShare3, label: "Repost" },
          { icon: IconShare3, label: "Send" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium text-[#666] hover:bg-[#f0f0f0] hover:text-[#191919]"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export { LinkedInPreview }
