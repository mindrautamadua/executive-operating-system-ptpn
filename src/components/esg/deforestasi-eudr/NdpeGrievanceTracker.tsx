import { ndpeGrievances } from "@/lib/esg-data-detail";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL_TERBUKA = ndpeGrievances.reduce((s, g) => s + g.terbuka, 0);
const TOTAL_SELESAI = ndpeGrievances.reduce((s, g) => s + g.selesai, 0);

/** Status bar grievance NDPE per kategori: porsi selesai vs terbuka. */
export function NdpeGrievanceTracker() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Grievance NDPE" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL_TERBUKA + TOTAL_SELESAI} grievance YTD · {TOTAL_SELESAI} selesai ·{" "}
        {TOTAL_TERBUKA} terbuka
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {ndpeGrievances.map((g) => {
          const total = g.terbuka + g.selesai;
          const selesaiPct = (g.selesai / total) * 100;
          return (
            <div key={g.kategori}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[9.5px] font-bold text-ink-900">{g.kategori}</span>
                <span className="shrink-0 text-[9px] tabular-nums text-ink-500">
                  <span className="font-extrabold text-ptpn-green">{g.selesai}</span> selesai ·{" "}
                  <span className="font-extrabold text-[#d98b06]">{g.terbuka}</span> terbuka
                </span>
              </div>
              <div className="mt-[5px] flex h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="h-full"
                  style={{ width: `${selesaiPct}%`, backgroundColor: PALETTE.green }}
                />
                <span
                  className="h-full"
                  style={{ width: `${100 - selesaiPct}%`, backgroundColor: PALETTE.amber }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-3 border-t border-[#f5f8fa] pt-1.5">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span
            className="h-[8px] w-[8px] rounded-[2px]"
            style={{ backgroundColor: PALETTE.green }}
          />
          Selesai
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span
            className="h-[8px] w-[8px] rounded-[2px]"
            style={{ backgroundColor: PALETTE.amber }}
          />
          Terbuka (dalam penanganan)
        </span>
      </div>
    </div>
  );
}
