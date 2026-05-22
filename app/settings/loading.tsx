import { Skeleton } from "@/components/ui/skeleton"

function SettingsLoading() {
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

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Notification card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-3 h-3 w-40" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2 w-36" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
                {i < 3 && <Skeleton className="my-2 h-px w-full" />}
              </div>
            ))}
          </div>

          {/* Appearance card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-3 h-3 w-44" />
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2 w-32" />
                </div>
                <Skeleton className="h-5 w-9 rounded-full" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Privacy card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="mb-3 h-3 w-44" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-40" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
                {i < 2 && <Skeleton className="my-2 h-px w-full" />}
              </div>
            ))}
          </div>

          {/* Account security card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="mb-3 h-3 w-40" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2 w-40" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
                {i < 2 && <Skeleton className="my-2 h-px w-full" />}
              </div>
            ))}
          </div>

          {/* Data management card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="mb-3 h-3 w-36" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-36" />
                  </div>
                  <Skeleton className="h-7 w-16" />
                </div>
                {i < 2 && <Skeleton className="my-2 h-px w-full" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsLoading
