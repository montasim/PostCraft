import { Skeleton } from "@/components/ui/skeleton"

function WorkspaceLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="space-y-5">
        {/* Workspace profile card skeleton */}
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

        {/* LinkedIn connection card skeleton */}
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

        {/* Usage plan card skeleton */}
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
      </div>
    </div>
  )
}

export default WorkspaceLoading
