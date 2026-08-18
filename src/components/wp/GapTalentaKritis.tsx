import { ArrowRight } from "lucide-react";
import { skillGaps } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function GapTalentaKritis() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Gap Talenta Kritis (Top 10 Skill)" />

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
            <th className="pb-1 text-left font-semibold">Skill</th>
            <th className="pb-1 text-right font-semibold">Supply (Orang)</th>
            <th className="pb-1 text-right font-semibold">Demand (Orang)</th>
            <th className="pb-1 text-right font-semibold">Gap</th>
            <th className="pb-1 text-right font-semibold">Gap %</th>
          </tr>
        </thead>
        <tbody>
          {skillGaps.map((r) => (
            <tr key={r.skill} className="border-t border-[#f0f3f6] text-[9px]">
              <td className="py-[3.5px] font-semibold text-ink-700">{r.skill}</td>
              <td className="py-[3.5px] text-right text-ink-700">{ribuan(r.supply)}</td>
              <td className="py-[3.5px] text-right text-ink-700">{ribuan(r.demand)}</td>
              <td className="py-[3.5px] text-right font-bold text-[#ef4444]">{ribuan(r.gap)}</td>
              <td className="py-[3.5px] text-right font-semibold text-[#ef4444]">{r.gapPct}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <button className="mt-2 flex w-full shrink-0 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Semua Skill Gap <ArrowRight size={11} />
      </button>
    </div>
  );
}
