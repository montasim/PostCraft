import { Skeleton } from "@/components/ui/skeleton"

function SettingsLoading() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left — Notification settings card */}
        <div className="space-y-4">
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-44" />
            </div>
            <div className="space-y-4 p-4">
              {["Generation complete", "Scheduled trending", "Weekly digest", "Product updates", "Post reminder"].map(
                (_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-2.5 w-40" />
                    </div>
                    <Skeleton className="h-5 w-9 rounded-full" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right — Account security + Danger zone */}
        <div className="space-y-4">
          {/* Account security card */}
          <div className="rounded-xl border p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="space-y-4 p-4">
              {/* 2FA toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3 w-3" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-2.5 w-44" />
                  </div>
                </div>
                <Skeleton className="h-5 w-9 rounded-full" />
              </div>
              {/* Session timeout */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3 w-3" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-40" />
                  </div>
                </div>
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
              {/* Password change */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3 w-3" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-2.5 w-28" />
                  </div>
                </div>
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
            </div>
          </div>

          {/* Danger zone card */}
          <div className="rounded-xl border border-destructive/30 p-0">
            <div className="space-y-1 border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-56" />
            </div>
            <div className="space-y-4 p-4">
              {["Delete workspace", "Reset settings"].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-destructive/20 px-3 py-2"
                >
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-32" />
                  </div>
                  <Skeleton className="h-7 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsLoading
