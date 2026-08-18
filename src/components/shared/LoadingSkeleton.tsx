// Kerangka skeleton shimmer bersama untuk loading.tsx (root dan per modul).
// Kelas .skeleton (gradient + animasi shimmer) didefinisikan di globals.css.

export function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--border-hair)] bg-[var(--surface)] p-3">
      <div className="skeleton h-2.5 w-20" />
      <div className="skeleton mt-2.5 h-6 w-24" />
      <div className="skeleton mt-2 h-2 w-16" />
    </div>
  );
}

export function KpiStripSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${Math.min(count, 4)}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartCardSkeleton({ className = "h-64" }: { className?: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-hair)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between">
        <div className="skeleton h-3.5 w-40" />
        <div className="skeleton h-3 w-14" />
      </div>
      <div className={`skeleton mt-3 w-full ${className}`} />
      <div className="mt-3 flex gap-4">
        <div className="skeleton h-2 w-14" />
        <div className="skeleton h-2 w-14" />
        <div className="skeleton h-2 w-14" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="hidden w-[200px] shrink-0 space-y-3 border-r border-[var(--border-soft)] bg-[var(--surface)] p-4 md:block">
      <div className="skeleton h-8 w-24" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="skeleton h-7 w-full" />
        ))}
      </div>
    </div>
  );
}

// Kerangka halaman modul lengkap: sidebar + header + data trust + KPI strip + grid chart.
export function ModuleLoadingSkeleton({ kpis = 6 }: { kpis?: number }) {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SidebarSkeleton />

      <div className="flex-1 space-y-4 overflow-hidden p-5">
        {/* header: judul + filter */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="skeleton h-8 w-64" />
            <div className="skeleton h-3 w-96 max-w-full" />
          </div>
          <div className="flex gap-2">
            <div className="skeleton h-9 w-32" />
            <div className="skeleton h-9 w-32" />
          </div>
        </div>

        {/* data trust strip */}
        <div className="skeleton h-8 w-full" />

        <KpiStripSkeleton count={kpis} />

        <div className="grid grid-cols-2 gap-3">
          <ChartCardSkeleton />
          <ChartCardSkeleton />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ChartCardSkeleton className="h-40" />
          <ChartCardSkeleton className="h-40" />
          <ChartCardSkeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}
