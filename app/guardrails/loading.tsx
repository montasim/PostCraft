import { Skeleton } from "@/components/ui/skeleton"

function GuardrailsLoading() {
  return (
    <div className="space-y-5">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="space-y-1 text-right">
            <Skeleton className="ml-auto h-3 w-20" />
            <Skeleton className="ml-auto h-2 w-16" />
          </div>
          <Skeleton className="h-2 w-24 rounded-full" />
        </div>
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-5">
              <div className="mb-2 flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-auto h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="mb-3 h-3 w-40" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-3 flex-1" />
                  <Skeleton className="h-5 w-5" />
                </div>
              ))}
              <Skeleton className="my-2 h-px w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {/* Banned words skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-3 w-48" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded-full" />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
          {/* Preview skeleton */}
          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="mb-3 h-3 w-40" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <div className="mt-2 flex gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuardrailsLoading
