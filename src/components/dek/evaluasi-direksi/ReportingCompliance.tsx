import { reportingCompliance, reportingNote } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Ketepatan waktu penyampaian laporan wajib Direksi kepada Dewan Komisaris. */
export function ReportingCompliance() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Kepatuhan Pelaporan Direksi" action="Lihat Arsip Laporan" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        25 Laporan Wajib YTD · 24 Diterima Tepat Waktu (96%)
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {reportingCompliance.map((r) => {
          const pct = (r.tepatWaktu / r.wajib) * 100;
          const late = r.tepatWaktu < r.wajib;
          return (
            <div key={r.jenisLaporan}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="min-w-0 truncate text-[9px] font-bold text-ink-900">
                  {r.jenisLaporan}
                </span>
                <span className="shrink-0 text-[8.5px] font-semibold tabular-nums text-ink-500">
                  {r.tepatWaktu}/{r.wajib} tepat waktu
                  <span
                    className={`ml-1.5 text-[9.5px] font-extrabold ${
                      late ? "text-[#d98b06]" : "text-ptpn-green"
                    }`}
                  >
                    {r.ketepatan}
                  </span>
                </span>
              </div>
              <div className="mt-[4px] h-[6px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className={`h-full rounded-full ${late ? "bg-[#f5a524]" : "bg-ptpn-green"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-[4px] text-[9px] leading-snug text-ink-500">{r.catatan}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#f0f3f6] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {reportingNote}
      </p>
    </div>
  );
}
