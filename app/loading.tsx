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
        <div className="flex-1 space-y-6 p-5">
          <div className="flex gap-5">
            <Skeleton className="h-96 flex-1 rounded-xl" />
            <Skeleton className="hidden h-96 w-80 rounded-xl lg:block" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
