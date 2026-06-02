"use client"

import { Badge } from "@/components/ui/badge"
import { IconBooks, IconFlame } from "@tabler/icons-react"

interface LibraryHeaderProps {
  totalCount: number
  streakDays: number
}

function LibraryHeader({ totalCount, streakDays }: LibraryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <IconBooks className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Library</h1>
        <Badge variant="secondary" className="text-xs">
          {totalCount} posts
        </Badge>
      </div>
      {streakDays > 0 && (
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/20">
            <IconFlame className="h-4 w-4 text-orange-400" />
          </div>
          <span className="text-xs font-medium">{streakDays}-day streak</span>
        </div>
      )}
    </div>
  )
}

export { LibraryHeader }
