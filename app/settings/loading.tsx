import { Skeleton } from "@/components/ui/skeleton"

function SettingsLoading() {
  return (
    <div className="space-y-5">
      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Notification card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-4 h-3 w-40" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2.5 w-36" />
                </div>
                <Skeleton className="h-5 w-9 rounded-full" />
              </div>
            ))}
          </div>

          {/* Appearance card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-4 h-3 w-44" />
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <div className="flex gap-5">
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Account security card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="mb-4 h-3 w-44" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <div className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3 w-3" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-40" />
                  </div>
                </div>
                <Skeleton className="h-7 w-16" />
              </div>
            ))}
          </div>

          {/* Danger zone card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-4 h-3 w-44" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="mb-2 flex items-center justify-between rounded-lg border px-3 py-2">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-28" />
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

export default SettingsLoading
