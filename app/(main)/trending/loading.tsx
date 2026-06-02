import { Skeleton } from "@/components/ui/skeleton"

function TrendingLoading() {
  return (
    <div className="flex h-full flex-col overflow-hidden lg:flex-row">
      {/* Sidebar skeleton */}
      <div className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex-1 p-4">
          {/* Date filter skeletons */}
          <div className="mb-4 space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1 rounded-md" />
              <Skeleton className="h-8 flex-1 rounded-md" />
            </div>
          </div>

          {/* Date group skeletons */}
          {["Today", "Yesterday"].map((label) => (
            <div key={label} className="mb-4">
              <Skeleton className="mb-2 h-3 w-12" />
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="mb-1 rounded-lg p-2.5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content area skeleton */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="flex justify-end gap-4">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-20 rounded-md" />
          </div>
        </div>

        {/* Variant cards grid skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4">
              {/* Card header */}
              <div className="mb-3 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Hook */}
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-3/4" />

              {/* Body lines */}
              <div className="mb-3 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/4" />
              </div>

              {/* Score badges */}
              <div className="mb-3 flex gap-2">
                <Skeleton className="h-4 w-14 rounded-full" />
                <Skeleton className="h-4 w-14 rounded-full" />
                <Skeleton className="h-4 w-14 rounded-full" />
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-16 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingLoading
