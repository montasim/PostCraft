import { Skeleton } from "@/components/ui/skeleton"

function ProfileLoading() {
  return (
    <div className="space-y-5">
      {/* Header skeleton */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-5 w-5 rounded" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      {/* Completion bar skeleton */}
      <div className="flex items-center gap-4 rounded-lg border px-4 py-3">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-2 w-52" />
        </div>
        <Skeleton className="h-2 w-32 rounded-full" />
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Profile header card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16" />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-2 w-28" />
            </div>
          </div>

          {/* Stats card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-5 w-28 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Details card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16" />
            </div>
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <Skeleton className="h-2 w-6" />
                <Skeleton className="h-12 w-full" />
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-5 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-2 w-20" />
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

export default ProfileLoading
