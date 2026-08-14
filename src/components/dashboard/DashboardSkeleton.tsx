import { Card } from '@/components/common'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className ?? ''}`}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-3">
        <SkeletonBlock className="h-9 w-72" />
        <SkeletonBlock className="h-5 w-96 max-w-full" />
        <SkeletonBlock className="h-4 w-48" />
      </div>

      <Card padding="lg">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <SkeletonBlock className="h-24 w-24 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-8 w-40" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-10 w-36" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} padding="md">
            <SkeletonBlock className="h-10 w-10 rounded-xl" />
            <SkeletonBlock className="mt-4 h-8 w-24" />
            <SkeletonBlock className="mt-2 h-4 w-32" />
            <SkeletonBlock className="mt-4 h-3 w-28" />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonBlock className="h-48 w-full rounded-xl" />
          <Card padding="md">
            <SkeletonBlock className="h-6 w-48" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-20 w-full" />
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card padding="md">
            <SkeletonBlock className="h-6 w-36" />
            <SkeletonBlock className="mt-4 h-32 w-full" />
          </Card>
          <Card padding="md">
            <SkeletonBlock className="h-6 w-32" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-12 w-full" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
