import { vendorPerformanceBottom, vendorPerformanceTop } from "@/lib/pgd-data-detail";
import type { PgdVendorScoreRow } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

function ScoreList({
  title,
  rows,
  barCls,
}: {
  title: string;
  rows: PgdVendorScoreRow[];
  barCls: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[8.5px] font-extrabold uppercase tracking-[0.04em] text-ink-400">
        {title}
      </div>
      <div className="mt-1.5 flex flex-col gap-1.5">
        {rows.map((v) => (
          <div key={v.vendor}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900" title={v.vendor}>
                {v.vendor}
              </span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-900">
                {v.skorTotal.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
              </span>
            </div>
            <div className="mt-[3px] flex items-center gap-2">
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div className={`h-full rounded-full ${barCls}`} style={{ width: `${v.skorTotal}%` }} />
              </div>
              <span className="w-[92px] shrink-0 truncate text-right text-[9px] text-ink-500">
                {v.kategori}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VendorPerformance() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kinerja Vendor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Total 0–100 (kualitas · ketepatan waktu · responsivitas) · rata-rata 82,4
      </p>

      <div className="scroll-thin mt-2 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto">
        <ScoreList title="5 Kinerja Terbaik" rows={vendorPerformanceTop} barCls="bg-ptpn-green" />
        <ScoreList
          title="5 Kinerja Terendah"
          rows={vendorPerformanceBottom}
          barCls="bg-[#ef4444]"
        />
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Gap 33,8 poin antara vendor terbaik (94,6) dan terendah (60,8) — seluruh peringkat terbawah
        tersandung pada dimensi ketepatan waktu.
      </p>
    </div>
  );
}
