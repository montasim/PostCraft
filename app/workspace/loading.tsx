import { Skeleton } from "@/components/ui/skeleton"

function WorkspaceLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="space-y-5">
        {/* Workspace profile card skeleton */}
        <div className="rounded-xl border p-5">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="ml-auto h-6 w-14 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
          <Skeleton className="mt-4 h-8 w-full rounded-md" />
        </div>

        {/* Usage plan card skeleton */}
        <div className="rounded-xl border p-5">
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-6 w-16 rounded-full" />
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
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Brand persona card skeleton */}
        <div className="rounded-xl border p-5">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
              </div>
            </div>
          </div>
          <Skeleton className="mt-4 h-8 w-full rounded-md" />
        </div>

        {/* Trending toggle card skeleton */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-5 w-9 rounded-full" />
          </div>
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-1 h-3 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLoading
