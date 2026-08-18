import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { crossSignals, type CrossSignal } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";

const TONE: Record<CrossSignal["tone"], { chip: string; border: string }> = {
  red: { chip: "bg-[#fdecec] text-[#c03434]", border: "border-[#f6d5d5]" },
  amber: { chip: "bg-[#fdf3e0] text-[#d98b06]", border: "border-[#f3e3c3]" },
  blue: { chip: "bg-[#e8f1fd] text-[#2f6fe4]", border: "border-[#d8e6f7]" },
};

/**
 * Cross-Module Intelligence: hipotesis akar masalah IR yang menghubungkan
 * sinyal antar modul (kompensasi, kapasitas workforce, engagement).
 */
export function CrossModuleSignals() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <GitBranch size={12} className="text-ptpn-green" />
        <SectionHead title="Cross-Module Intelligence" />
      </div>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {crossSignals.map((s) => {
          const t = TONE[s.tone];
          return (
            <li key={s.title} className={`flex flex-col rounded-lg border bg-[#fbfcfe] px-2.5 py-1.5 ${t.border}`}>
              <div className="flex items-center gap-1.5">
                <span className="min-w-0 flex-1 truncate text-[9.5px] font-extrabold text-ink-900">
                  {s.title}
                </span>
                <Link
                  href={s.href}
                  className="flex shrink-0 items-center gap-[3px] text-[7.5px] font-bold text-ptpn-green hover:underline"
                >
                  {s.linkLabel} <ArrowRight size={9} />
                </Link>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {s.chain.map((c) => (
                  <span key={c} className={`rounded-md px-1.5 py-[2px] text-[7.5px] font-bold ${t.chip}`}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-1 text-[9px] leading-[1.35] text-ink-600">{s.hypothesis}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
