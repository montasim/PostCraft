"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconRefresh, IconClock } from "@tabler/icons-react"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/60 dark:bg-amber-900/30">
            <IconClock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <DialogTitle className="text-lg">Daily limit reached</DialogTitle>
          <DialogDescription>
            You&apos;ve used all {3} posts for today. Your quota refreshes at
            UTC midnight — come back tomorrow for more.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center gap-2 text-sm">
            <IconRefresh className="h-4 w-4 text-amber-500" />
            <span>Resets daily at UTC midnight</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconClock className="h-4 w-4 text-amber-500" />
            <span>3 free posts every day</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            variant="default"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { UpgradeModal }
