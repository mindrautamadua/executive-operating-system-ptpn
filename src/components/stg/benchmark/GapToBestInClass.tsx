import { gapToBest } from "@/lib/sbm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmt1 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const TOTAL = gapToBest.reduce((s, g) => s + g.potensiRpT, 0);
const MAX = Math.max(...gapToBest.map((g) => g.potensiRpT));

/**
 * Gap PTPN ke best-in-class per area beserta potensi EBITDA tahunan.
 * Areanya lintas subholding (yield/HPP/OER = PalmCo, rendemen = SugarCo, hilir =
 * grup) dan total Rp 3,1 T hanya bermakna konsolidasi — kartu tetap angka grup.
 */
export function GapToBestInClass() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Gap ke Best-in-Class"
        action="Lihat Rencana Penutupan Gap"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Potensi EBITDA Tahunan bila Gap Tertutup · Total Rp {fmt1(TOTAL)} T
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Area</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">PTPN Group</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Best-in-Class</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Gap</th>
              <th className="w-[128px] border-b border-[#eef2f6] pb-1.5 pr-2">Potensi EBITDA</th>
            </tr>
          </thead>
          <tbody>
            {gapToBest.map((g) => (
              <tr key={g.area} className="align-middle">
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[7px] pr-2 text-[9px] font-bold text-ink-900">
                  {g.area}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[7px] pr-2 text-right text-[8.5px] font-semibold tabular-nums text-ink-900">
                  {g.ptpn}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[7px] pr-2 text-[8.5px] text-ink-500">
                  {g.best}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[7px] pr-2 text-right text-[8.5px] font-semibold tabular-nums text-[#ef4444]">
                  {g.gap}
                </td>
                <td className="border-b border-[#f3f6f9] py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full bg-ptpn-green"
                        style={{ width: `${(g.potensiRpT / MAX) * 100}%` }}
                      />
                    </div>
                    <span className="w-[46px] shrink-0 whitespace-nowrap text-right text-[9px] font-bold text-ink-900">
                      Rp {fmt1(g.potensiRpT)} T
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        Gap kebun (yield TBS) menyumbang porsi terbesar potensi Rp {fmt1(TOTAL)} T — melebihi
        gabungan gap OER dan HPP pabrik.
      </p>
    </div>
  );
}
