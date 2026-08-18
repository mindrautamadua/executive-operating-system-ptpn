import { Siren } from "lucide-react";
import { emergencyCoverage } from "@/lib/succession-data";

/**
 * Cakupan suksesi darurat: bila incumbent keluar mendadak, siapa mengambil
 * alih? Stacked bar + rincian 3 kategori (total = 212 posisi kritis).
 */
export function EmergencyCoverage() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "900ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Siren size={13} className="text-[#ef4444]" />
          Emergency Succession Coverage
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          212 Posisi Kritis
        </span>
      </div>

      {/* stacked bar proporsi */}
      <div className="mt-2.5 flex h-[10px] w-full overflow-hidden rounded-full bg-[#f1f5f8]">
        {emergencyCoverage.map((e, i) => (
          <span
            key={e.name}
            className="anim-grow-x h-full"
            style={
              {
                width: `${e.share}%`,
                background: e.color,
                "--d": `${900 + i * 80}ms`,
              } as React.CSSProperties
            }
            title={`${e.name}: ${e.jumlah} (${e.pct})`}
          />
        ))}
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-around">
        {emergencyCoverage.map((e) => (
          <div key={e.name} className="flex items-center gap-2.5">
            <span
              className="h-[8px] w-[8px] shrink-0 rounded-[3px]"
              style={{ background: e.color }}
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[9.5px] font-semibold text-ink-900">
                {e.name}
              </div>
              <div className="truncate text-[8.5px] text-ink-500">{e.desc}</div>
            </div>
            <div className="ml-auto shrink-0 text-right leading-tight">
              <div className="text-[11px] font-bold tabular-nums text-ink-900">
                {e.jumlah}
              </div>
              <div className="text-[8.5px] font-medium tabular-nums text-ink-400">
                {e.pct}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
