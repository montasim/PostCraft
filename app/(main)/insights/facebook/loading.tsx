import { Skeleton } from "@/components/ui/skeleton"

export default function FacebookInsightsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-[22px] w-[90px] rounded-full" />
          <Skeleton className="h-[22px] w-[95px] rounded-full" />
          <Skeleton className="h-[22px] w-[70px] rounded-full" />
        </div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 items-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-full rounded-lg border bg-card p-0 shadow-sm flex flex-col">
            {/* Card Header */}
            <div className="flex items-start gap-3 border-b px-4 py-3">
              <Skeleton className="h-12 w-12 rounded-full shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 pt-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-[18px] w-16 rounded-full" />
                </div>
                <Skeleton className="h-2.5 w-32" />
              </div>
              <Skeleton className="h-5 w-5 rounded shrink-0 mt-1" />
            </div>

            {/* Card Content */}
            <div className="space-y-3 px-4 py-4 flex-1">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[90%]" />
                <Skeleton className="h-3.5 w-[95%]" />
                <Skeleton className="h-3.5 w-[75%]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between border-t px-4 py-2.5">
              <Skeleton className="h-3 w-10" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around border-t px-2 py-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-1.5 px-3 py-1">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="hidden sm:block h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
