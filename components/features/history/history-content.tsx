"use client"

import { useState } from "react"
import { HISTORY_ENTRIES } from "@/lib/constants"
import { HistorySidebar } from "@/components/features/history/history-sidebar"
import { HistoryDetail } from "@/components/features/history/history-detail"

function HistoryContent() {
  const [selectedId, setSelectedId] = useState<string>(HISTORY_ENTRIES[0].id)

  const selectedEntry = HISTORY_ENTRIES.find((e) => e.id === selectedId) ?? HISTORY_ENTRIES[0]

  return (
    <div className="-m-5 flex h-[calc(100vh-3.5rem)]">
      <HistorySidebar
        entries={HISTORY_ENTRIES}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div className="flex-1 overflow-y-auto p-5">
        {selectedEntry && <HistoryDetail entry={selectedEntry} />}
      </div>
    </div>
  )
}

export { HistoryContent }
