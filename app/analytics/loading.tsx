import { Skeleton } from "@/components/ui/skeleton"

function AnalyticsLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Overview cards skeleton */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border p-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Insights skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border p-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1.5 w-full" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border p-5">
          <Skeleton className="mb-4 h-4 w-36" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="rounded-xl border p-5">
          <Skeleton className="mb-4 h-4 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-1 h-3 w-16" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border p-5">
          <Skeleton className="mb-4 h-4 w-28" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-1 h-3 w-full" />
                <Skeleton className="h-2 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-5">
          <Skeleton className="mb-4 h-4 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsLoading
