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
import { IconSparkles, IconCrown } from "@tabler/icons-react"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-4/15">
            <IconCrown className="h-6 w-6 text-chart-4" />
          </div>
          <DialogTitle className="text-lg">
            You&apos;ve used all your free posts
          </DialogTitle>
          <DialogDescription>
            You&apos;ve generated 10 posts on the free plan. Upgrade to Pro for
            unlimited generations, advanced guardrails, and priority AI models.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center gap-2 text-sm">
            <IconSparkles className="h-4 w-4 text-chart-4" />
            <span>Unlimited post generations</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconSparkles className="h-4 w-4 text-chart-4" />
            <span>Advanced AI models & scoring</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconSparkles className="h-4 w-4 text-chart-4" />
            <span>Priority queue & faster results</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Maybe later
          </Button>
          <Button className="bg-linear-to-br from-primary to-chart-2 text-primary-foreground" asChild>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <IconCrown className="mr-1.5 h-4 w-4" />
              Upgrade to Pro
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { UpgradeModal }
