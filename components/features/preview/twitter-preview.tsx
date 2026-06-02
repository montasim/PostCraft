"use client"

import type { Variant } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  IconMessageCircle2,
  IconRepeat,
  IconHeart,
  IconBookmark,
  IconDots,
} from "@tabler/icons-react"

interface TwitterPreviewProps {
  variant: Variant
}

function TwitterPreview({ variant }: TwitterPreviewProps) {
  return (
    <div className="mx-auto max-w-[550px] rounded-xl border bg-white p-0 shadow-sm">
      <div className="flex items-start gap-3 px-4 pt-3">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarFallback className="bg-[#1d9bf0] text-sm font-semibold text-white">
            U
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-[#0f1419]">Your Name</span>
            <span className="text-xs text-[#536471]">@yourhandle</span>
            <span className="text-xs text-[#536471]">· 1h</span>
          </div>
          <div className="mt-1 space-y-2">
            <p className="text-sm leading-normal text-[#0f1419]">
              {variant.hook}
            </p>
            <p className="text-sm leading-normal text-[#0f1419]">
              {variant.body}
            </p>
            <p className="text-sm font-semibold text-[#0f1419]">
              {variant.cta}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {variant.hashtags.map((tag) => (
                <span key={tag} className="text-sm text-[#1d9bf0]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="shrink-0 text-[#536471] hover:text-[#1d9bf0]">
          <IconDots className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        {[
          { icon: IconMessageCircle2, label: "12" },
          { icon: IconRepeat, label: "5" },
          { icon: IconHeart, label: "47" },
          { icon: IconBookmark, label: "8" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs text-[#536471] hover:text-[#1d9bf0]"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { TwitterPreview }
