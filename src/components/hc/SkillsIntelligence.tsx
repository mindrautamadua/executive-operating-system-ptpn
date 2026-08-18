"use client";

import { Sparkles } from "lucide-react";
import { criticalSkills, skillsNote } from "@/lib/hc-data";
import { ScopeNote } from "../ui/ScopeNote";

const STATUS = {
  critical: { label: "Shortage Kritis", pill: "bg-[#fdecec] text-[#ef4444]", bar: "#ef4444" },
  shortage: { label: "Shortage", pill: "bg-[#fdf3e0] text-[#d98b06]", bar: "#f5a524" },
  surplus: { label: "Surplus", pill: "bg-ptpn-greenLight text-ptpn-green", bar: "#1f8a4c" },
} as const;

function statusOf(supply: number, demand: number) {
  const deficit = (demand - supply) / demand;
  if (deficit >= 0.3) return STATUS.critical;
  if (deficit > 0) return STATUS.shortage;
  return STATUS.surplus;
}

const fmt = (n: number) => n.toLocaleString("id-ID");

export function SkillsIntelligence() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "170ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Skills Intelligence{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">
              (Supply vs Demand 2028)
            </span>
          </span>
          <ScopeNote />
        </h3>
      </div>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr className="border-b border-[#f0f3f6] text-left text-[8.5px] font-semibold text-ink-400">
            <th className="pb-[6px] font-semibold">Critical Skill</th>
            <th className="pb-[6px] text-right font-semibold">Supply Saat Ini</th>
            <th className="pb-[6px] text-right font-semibold">Demand 2028</th>
            <th className="pb-[6px] text-right font-semibold">Gap</th>
            <th className="w-[130px] pb-[6px] pl-4 font-semibold">Pemenuhan</th>
            <th className="pb-[6px] pl-4 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {criticalSkills.map((s) => {
            const gap = s.supply - s.demand;
            const st = statusOf(s.supply, s.demand);
            const fill = Math.min((s.supply / s.demand) * 100, 100);
            return (
              <tr key={s.skill} className="border-b border-[#f5f8fa] last:border-0">
                <td className="py-[7px] pl-1 text-[9.5px] font-semibold text-ink-700">{s.skill}</td>
                <td className="py-[7px] text-right text-[9.5px] font-bold text-ink-900">
                  {fmt(s.supply)}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-bold text-ink-900">
                  {fmt(s.demand)}
                </td>
                <td
                  className={`py-[7px] text-right text-[9.5px] font-bold ${
                    gap < 0 ? "text-[#ef4444]" : "text-ptpn-green"
                  }`}
                >
                  {gap < 0 ? `-${fmt(-gap)}` : `+${fmt(gap)}`}
                </td>
                <td className="py-[7px] pl-4">
                  <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#e8edf2]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${fill}%`, backgroundColor: st.bar }}
                    />
                  </div>
                </td>
                <td className="py-[7px] pl-4 text-right">
                  <span className={`rounded px-1.5 py-[2px] text-[8.5px] font-bold ${st.pill}`}>
                    {st.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-[7px]">
        <Sparkles size={12} className="shrink-0 text-ptpn-green" strokeWidth={1.9} />
        <span className="text-[9px] font-medium text-ink-700">
          <span className="font-bold text-ptpn-green">AI Insight:</span> {skillsNote}
        </span>
      </div>
    </div>
  );
}
