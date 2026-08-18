import { kontrakKpi } from "@/lib/pgd-data-detail";
import { Delta } from "@/components/ui/Delta";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONES: Record<string, string> = {
  blue: "bg-[#3b7ded]",
  green: "bg-ptpn-green",
  teal: "bg-[#0d9488]",
  red: "bg-[#ef4444]",
  amber: "bg-[#f5a524]",
  purple: "bg-[#8b5cf6]",
  slate: "bg-[#94a3b8]",
};

/** KPI strip halaman Kontrak Pengadaan (6 kartu). */
export function KontrakKpiStrip() {
  const grid = (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kontrakKpi.map((k, i) => (
        <div
          key={k.label}
          className="card anim-rise px-3 pb-3 pt-3"
          style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
        >
          <div className="flex items-center gap-2">
            <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${TONES[k.tone]}`} />
            <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
              {k.label}
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-[2px] whitespace-nowrap">
            <span className="text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {k.value}
            </span>
            {k.valueSuffix && (
              <span className="text-[10px] font-bold text-ink-500">{k.valueSuffix}</span>
            )}
          </div>
          <div className="mt-[6px] text-[8.5px] leading-[1.35] text-ink-500">{k.sub}</div>
          {k.delta && k.trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
              <span className="truncate text-[8.5px] text-ink-400">vs Des 2025</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5">
      {/* KPI pengadaan adalah angka konsolidasi grup; pecahan per subholding belum tersedia. */}
      <ScopeNote className="self-start" />
      {grid}
    </div>
  );
}
