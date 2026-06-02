import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Row: PostCreationForm + BrandGuardPanel */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* PostCreationForm skeleton */}
        <div className="flex-1 rounded-xl border border-border/60">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-52" />
            </div>
            <Skeleton className="h-5 w-36 rounded-full" />
          </div>

          {/* Topic textarea + suggestions */}
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <Skeleton className="h-28 w-full rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-2.5 w-40" />
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-40 rounded-md" />
                  ))}
                </div>
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            {/* Shape your post section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-28 rounded-lg" />
                ))}
              </div>

              {/* Audience / Tone / Language selects */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-full rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with emoji toggle + generate button */}
          <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-9 rounded-full" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>
        </div>

        {/* BrandGuardPanel skeleton */}
        <div className="hidden max-h-[30.5rem] w-full flex-col rounded-xl border md:flex md:w-[40%]">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
            {/* Tone rules group */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>

            {/* Format rules group */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>

            <Skeleton className="h-px w-full" />

            {/* Banned words group */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-20 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PostVariantsCarousel — empty state */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-56" />
          </h2>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Skeleton className="h-7 w-7" />
            </div>
            <Skeleton className="h-4 w-96" />
            <Skeleton className="mt-1.5 h-3 w-80" />
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
