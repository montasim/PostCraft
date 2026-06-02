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
import { IconCheck, IconX } from "@tabler/icons-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  onConfirm: () => void
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => onOpenChange(false)}
          >
            <IconX className="h-3.5 w-3.5" />
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            size="sm"
            className="gap-1.5"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            <IconCheck className="h-3.5 w-3.5" />
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmDialog }
