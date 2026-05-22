import { Skeleton } from "@/components/ui/skeleton"

function WorkspaceLoading() {
  return (
    <div className="space-y-5">
      {/* Header skeleton */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-5 w-5 rounded" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Completion bar skeleton */}
      <div className="flex items-center gap-4 rounded-lg border px-4 py-3">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-2 w-48" />
        </div>
        <Skeleton className="h-2 w-32 rounded-full" />
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Profile card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="ml-auto h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-3 w-36" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mb-2 space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* Brand persona card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-3 w-48" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>

          {/* LinkedIn card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="ml-auto h-5 w-18 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-3 w-44" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Usage card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-3 w-40" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
            <Skeleton className="my-3 h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-20" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          </div>

          {/* Danger zone skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-3 h-3 w-44" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="mb-2 flex items-center justify-between rounded-lg border px-3 py-2">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-28" />
                </div>
                <Skeleton className="h-7 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLoading
