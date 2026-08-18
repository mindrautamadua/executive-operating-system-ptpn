import { resolutionFunnel } from "@/lib/hse-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ribuan = (v: number) => v.toLocaleString("id-ID");
const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Funnel penyelesaian kasus: laporan → penyelidikan → penyelesaian → tuntas. */
export function ResolutionFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Penyelesaian Kasus" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">408 Laporan YTD · 277 Tuntas (67,9%)</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {resolutionFunnel.map((s) => (
          <div key={s.tahap}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900" title={s.catatan}>
                {s.tahap}
              </span>
              <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-ink-900">
                {ribuan(s.jumlah)}
              </span>
            </div>
            <div className="mt-[4px] h-[9px] w-full overflow-hidden rounded-md bg-[#eef2f6]">
              <div
                className="h-full rounded-md"
                style={{ width: `${s.pct}%`, backgroundColor: s.color }}
              />
            </div>
            <p className="mt-[3px] truncate text-[9px] text-ink-500">
              {desimal(s.pct)}% · rata-rata {s.durasiHari} hari
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
