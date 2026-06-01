import { Skeleton } from "@/components/ui/skeleton"

function WorkspaceLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Left column */}
      <div className="space-y-5">
        {/* Brand persona card */}
        <div className="rounded-xl border p-0">
          <div className="space-y-1 border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-1 h-4 w-20 rounded-full" />
              <Skeleton className="ml-auto h-7 w-14 rounded-md" />
            </div>
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="space-y-3 p-6">
            {["Target audiences", "Preferred tones", "Language", "Topics / Keywords", "Industry"].map(
              (label) => (
                <div key={label}>
                  <Skeleton className="mb-1.5 h-3 w-24" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-5">
        {/* Usage & plan card */}
        <div className="rounded-xl border p-0">
          <div className="space-y-1 border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-4 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-2.5 w-24" />
              </div>
              <Skeleton className="h-7 w-28 rounded-md" />
            </div>
          </div>
        </div>

        {/* Trending toggle card */}
        <div className="rounded-xl border p-0">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-5 w-9 rounded-full" />
          </div>
          <div className="p-6">
            <Skeleton className="mb-2 h-3 w-full" />
            <Skeleton className="mb-3 h-3 w-3/4" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-1" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLoading
