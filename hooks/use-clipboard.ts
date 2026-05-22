"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"

const RESET_DELAY_MS = 1500

function useClipboard() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copy = useCallback((text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopiedId(null), RESET_DELAY_MS)
  }, [])

  const isCopied = useCallback(
    (id: number) => copiedId === id,
    [copiedId],
  )

  return { copy, isCopied }
}

export { useClipboard }
