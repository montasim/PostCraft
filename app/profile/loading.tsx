import { Skeleton } from "@/components/ui/skeleton"

function ProfileLoading() {
  return (
    <div className="space-y-5">
      {/* Completion bar skeleton */}
      <div className="flex items-center gap-4 rounded-lg border px-4 py-3">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-2 w-52" />
        </div>
        <Skeleton className="h-2 w-32 rounded-full" />
      </div>

      {/* 40/60 flex layout skeleton */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="w-full lg:w-[40%]">
          {/* Profile header card skeleton */}
          <div className="h-full rounded-xl border p-5">
            <div className="mb-4 flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16 rounded-md" />
            </div>
            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:items-start">
              <Skeleton className="h-24 w-24 shrink-0 rounded-full sm:h-32 sm:w-32" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 w-36" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          {/* Profile details card skeleton */}
          <div className="h-full rounded-xl border p-5">
            <div className="mb-4 flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16 rounded-md" />
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-16" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-7 w-20 rounded-full" />
                      <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoading
