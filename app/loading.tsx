import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <Skeleton className="h-14 w-full" />
        <div className="space-y-4 p-5">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Skeleton className="h-14 w-full" />
        <div className="flex-1 space-y-8 overflow-y-auto p-5">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Post creation form skeleton */}
            <div className="flex-1 rounded-xl border p-5">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="ml-auto h-6 w-20 rounded-full" />
              </div>
              <div className="mb-3 space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-16 rounded-full" />
                </div>
              </div>
              <div className="mb-3 space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-7 w-28 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
              <div className="mb-3 space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-28 rounded-full" />
                </div>
              </div>
              <div className="mb-4 space-y-1.5">
                <Skeleton className="h-3 w-10" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-3 w-10" />
              <Skeleton className="mb-2 h-20 w-full rounded-lg" />
              <Skeleton className="ml-auto h-8 w-28 rounded-md" />
            </div>

            {/* Brand guard panel skeleton */}
            <div className="hidden w-80 shrink-0 rounded-xl border p-5 lg:block">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-1.5 h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <div className="mt-1 flex gap-2">
                      <Skeleton className="h-4 w-16 rounded-full" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Variants section skeleton */}
          <div>
            <Skeleton className="mb-3 h-5 w-32" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-6" />
                    </div>
                    <div className="flex gap-1.5">
                      <Skeleton className="h-5 w-12 rounded-md" />
                      <Skeleton className="h-5 w-12 rounded-md" />
                      <Skeleton className="h-5 w-12 rounded-md" />
                      <Skeleton className="h-5 w-12 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="mb-3 h-px w-full" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="mb-3 h-3 w-full" />
                  <Skeleton className="mb-3 h-3 w-4/5" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-4 w-14 rounded-full" />
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
