import { Skeleton } from "@/components/ui/skeleton"

function GuardrailsLoading() {
  return (
    <div className="space-y-4">
      {/* Header bar — shield icon + title + brand shield progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-2 w-24 rounded-full" />
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left column — rule sections */}
        <div className="space-y-4">
          {["Tone rules", "Format rules", "Custom rules"].map((title) => (
            <div key={title} className="rounded-xl border p-0">
              <div className="space-y-1 border-b px-4 py-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="ml-auto h-4 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-44" />
              </div>
              <div className="space-y-2 p-4">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 rounded-lg border px-3 py-2"
                  >
                    <Skeleton className="h-4 w-6 scale-75 rounded-full" />
                    <Skeleton className="h-3 flex-1" />
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                ))}
                <Skeleton className="my-2 h-px w-full" />
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-8 flex-1 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column — banned words + preview + brand shield */}
        <div className="space-y-4">
          {/* Banned words card */}
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="ml-auto h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="space-y-4 p-4">
              <div className="flex max-h-[90px] flex-wrap gap-1.5 overflow-y-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5"
                  >
                    <Skeleton className="h-3.5 w-14" />
                    <Skeleton className="h-3 w-3" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-3 w-52" />
            </div>
            <div className="space-y-4 p-4">
              <Skeleton className="h-16 w-full rounded-lg" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          </div>

          {/* Brand shield bar */}
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-2 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuardrailsLoading
