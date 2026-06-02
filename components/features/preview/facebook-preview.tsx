"use client"

import type { Variant } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  IconThumbUp,
  IconHeart,
  IconMessage2,
  IconShare3,
  IconDots,
} from "@tabler/icons-react"

interface FacebookPreviewProps {
  variant: Variant
}

function FacebookPreview({ variant }: FacebookPreviewProps) {
  return (
    <div className="mx-auto max-w-[500px] rounded-lg border bg-white p-0 shadow-sm">
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarFallback className="bg-[#1877f2] text-sm font-semibold text-white">
            U
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#1c1e21]">Your Name</p>
          <p className="text-[11px] text-[#65676b]">1h · 🌐</p>
        </div>
        <button className="shrink-0 text-[#65676b] hover:text-[#1c1e21]">
          <IconDots className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2 px-4 pb-3">
        <p className="text-sm leading-relaxed text-[#1c1e21]">{variant.hook}</p>
        <p className="text-sm leading-relaxed text-[#1c1e21]">{variant.body}</p>
        <p className="text-sm font-semibold text-[#1c1e21]">{variant.cta}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {variant.hashtags.map((tag) => (
            <span key={tag} className="text-sm text-[#1877f2]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-[#65676b]">
        <div className="flex items-center gap-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
            <IconThumbUp className="h-3 w-3" />
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e4405f] text-white">
            <IconHeart className="h-3 w-3" />
          </span>
          <span>You and 56 others</span>
        </div>
        <span>4 comments · 2 shares</span>
      </div>

      <div className="flex items-center justify-around border-t px-2 py-1">
        {[
          { icon: IconThumbUp, label: "Like" },
          { icon: IconMessage2, label: "Comment" },
          { icon: IconShare3, label: "Share" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium text-[#65676b] hover:bg-[#f0f2f5]"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export { FacebookPreview }
