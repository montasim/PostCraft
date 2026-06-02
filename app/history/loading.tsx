import { Skeleton } from "@/components/ui/skeleton"

function HistoryLoading() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden lg:-m-4 lg:flex-row">
      {/* Sidebar skeleton — search + date-grouped list items */}
      <div className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="p-4">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4 pt-0">
          {["Today", "Yesterday", "Previous 7 days"].map((group) => (
            <div key={group}>
              <Skeleton className="mb-2 h-3 w-16" />
              <div className="space-y-1">
                {Array.from({ length: group === "Today" ? 3 : 2 }).map((_, i) => (
                  <div key={i} className="rounded-lg p-2.5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <Skeleton className="h-3 w-20" />
                      <div className="flex items-center gap-1.5">
                        <Skeleton className="h-3 w-10" />
                        <Skeleton className="h-4 w-12 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail area skeleton */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Input card + Brand guard panel row */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1 rounded-xl border p-4">
              <Skeleton className="mb-4 h-4 w-24" />
              <Skeleton className="mb-2 h-3 w-10" />
              <Skeleton className="mb-4 h-20 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-14" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden w-80 shrink-0 lg:block">
              <div className="rounded-xl border p-4">
                <Skeleton className="mb-4 h-4 w-24" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Skeleton className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Variants section */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-14 rounded-full" />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4">
                  {/* Card header */}
                  <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-3 flex-1" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  {/* Post body lines */}
                  <div className="mb-3 space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-4/5" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                  {/* Score badges */}
                  <div className="flex gap-1.5">
                    <Skeleton className="h-4 w-12 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryLoading
