import { Skeleton } from "@/components/ui/skeleton"

function HistoryLoading() {
  return (
    <div className="-m-5 flex h-[calc(100vh-3.5rem)]">
      {/* Sidebar skeleton */}
      <div className="flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="border-b border-sidebar-border p-3">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex-1 space-y-2 p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg px-2.5 py-2">
              <Skeleton className="mb-1.5 h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="mt-1.5 flex gap-2">
                <Skeleton className="h-2.5 w-8" />
                <Skeleton className="h-2.5 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail skeleton */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-5">
          {/* Two-column: input card + brand guard */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex-1 rounded-xl border p-5">
              <Skeleton className="mb-4 h-4 w-24" />
              <Skeleton className="mb-2 h-3 w-10" />
              <Skeleton className="mb-4 h-20 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-12" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden w-80 shrink-0 lg:block">
              <div className="rounded-xl border p-5">
                <Skeleton className="mb-4 h-4 w-24" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="mb-2 h-3 w-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Variants skeleton */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-1.5">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-4 rounded-xl border p-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-8" />
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-14 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                  </div>
                </div>
                <Skeleton className="my-4 h-px w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="mb-2 h-3 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryLoading
