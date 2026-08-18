import Link from "next/link";
import { ArrowRight, Radar } from "lucide-react";
import { earlyWarningAbsensi, paretoAbsen } from "@/lib/absensi-data";
import { PALETTE } from "@/lib/chart-palette";

/**
 * Early warning: populasi karyawan dengan sinyal risiko kehadiran
 * (rolling 12 bulan). Sinyal gabungan menjadi input People Risk Radar.
 */
export function EarlyWarningAbsensi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <h3 className="card-title-navy">Early Warning Kehadiran</h3>
        <span className="tone-red ml-auto flex items-center gap-1 rounded px-1.5 py-[1px] text-[9px] font-bold">
          <Radar size={10} strokeWidth={2} /> Rolling 12 bln
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {earlyWarningAbsensi.map((r) => (
          <div key={r.label} className="flex items-center gap-2 whitespace-nowrap">
            <span
              className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
              style={{ background: r.tone === "red" ? PALETTE.red : PALETTE.amber }}
            />
            <span className="truncate text-[9.5px] text-ink-700">{r.label}</span>
            <span className="ml-auto text-[10px] font-bold tabular-nums text-ink-900">
              {r.value}
            </span>
            <span className="w-[36px] text-right text-[9px] tabular-nums text-ink-500">
              {r.pct}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1.5 rounded-lg bg-[#f6f9fc] px-2.5 py-[5px] text-[9px] leading-[1.4] text-ink-700">
        <span className="font-bold text-ink-900">Pareto:</span> {paretoAbsen}
      </p>

      <Link
        href="/people-risk-radar"
        className="link-more mt-auto flex items-center gap-1 pt-1.5"
      >
        Kirim 486 sinyal gabungan ke People Risk Radar <ArrowRight size={11} />
      </Link>
    </div>
  );
}
