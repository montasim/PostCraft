"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IconAlertTriangle, IconX } from "@tabler/icons-react"
import { useAppSelector } from "@/store/hooks"
import { selectQuotaExceeded } from "@/store/slices/workspace.slice"

function QuotaAlert() {
  const quotaExceeded = useAppSelector(selectQuotaExceeded)
  const [dismissed, setDismissed] = useState(false)

  if (!quotaExceeded || dismissed) return null

  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300">
      <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1">
        You&apos;re out of free posts.{" "}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="font-medium underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-200"
        >
          Upgrade to Pro
        </a>{" "}
        and keep your streak alive.
      </p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="-m-1 h-6 w-6 text-amber-600 hover:bg-amber-100 hover:text-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/40 dark:hover:text-amber-200"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        <IconX className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

export { QuotaAlert }
