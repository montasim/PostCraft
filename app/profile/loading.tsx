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
      <div className="flex w-full items-stretch gap-5">
        <div className="w-[40%]">
          {/* Profile header card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16" />
            </div>
            <div className="flex items-center gap-5 pt-1">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          {/* Profile details card skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-16" />
            </div>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Skeleton className="h-2.5 w-8" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="h-8 w-full rounded-md" />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoading
