import { Skeleton } from "@/components/ui/skeleton"

function ProfileLoading() {
  return (
    <div className="space-y-4">
      {/* Profile completion bar */}
      <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-2.5 w-64" />
        </div>
        <Skeleton className="h-2 w-32 rounded-full" />
      </div>

      {/* 40/60 flex layout */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left — Profile header card with avatar */}
        <div className="w-full lg:w-[40%]">
          <div className="h-full rounded-xl border p-0">
            <div className="flex items-center gap-2 border-b px-4 py-4">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="ml-auto h-7 w-14 rounded-md" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 shrink-0 rounded-full lg:h-32 lg:w-32" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-2.5 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Profile details card */}
        <div className="w-full lg:w-[60%]">
          <div className="h-full rounded-xl border p-0">
            <div className="flex items-center gap-2 border-b px-4 py-4">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-7 w-14 rounded-md" />
            </div>
            <div className="space-y-4 p-4">
              {/* Bio field */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
              {/* Location row */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-28" />
              </div>
              {/* Website row */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-36" />
              </div>
              {/* X / LinkedIn row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-28" />
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
