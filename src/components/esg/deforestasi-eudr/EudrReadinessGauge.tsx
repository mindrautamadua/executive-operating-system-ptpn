import { eudrPillars } from "@/lib/esg-data-detail";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const barColor = (skor: number, target: number) =>
  skor >= target ? PALETTE.green : skor >= target - 15 ? PALETTE.amber : PALETTE.red;

/** Progres kesiapan 4 pilar EUDR terhadap target internal (komposit 78/100). */
export function EudrReadinessGauge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="EUDR Readiness per Pilar" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Kesiapan vs Target Internal · Komposit 78/100
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {eudrPillars.map((p) => (
          <div key={p.pilar}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{p.pilar}</span>
              <span className="shrink-0 text-[9px] tabular-nums text-ink-500">
                <span className="text-[10px] font-extrabold text-ink-900">{p.skor}</span> / target{" "}
                {p.target}
              </span>
            </div>
            <div className="relative mt-[5px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${p.skor}%`, backgroundColor: barColor(p.skor, p.target) }}
              />
              <span
                className="absolute top-0 h-full w-[2px] bg-[#94a3b8]"
                style={{ left: `${p.target}%` }}
              />
            </div>
            <p className="mt-[3px] truncate text-[8.5px] text-ink-500" title={p.catatan}>
              {p.catatan}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
