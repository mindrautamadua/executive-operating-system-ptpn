"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { complianceBySubholding, type ComplianceSubholdingRow } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const scoreCls = (skor: number) =>
  skor >= 92
    ? "bg-ptpn-greenLight text-ptpn-green"
    : skor >= 87
      ? "bg-[#fdf3e0] text-[#d98b06]"
      : "bg-[#fdecec] text-[#ef4444]";

const TREND_CLS: Record<ComplianceSubholdingRow["trendTone"], string> = {
  good: "text-ptpn-green",
  bad: "text-[#ef4444]",
  neutral: "text-ink-400",
};

function TrendMark({ row }: { row: ComplianceSubholdingRow }) {
  const Icon = row.trend === "flat" ? Minus : row.trend === "up" ? TrendingUp : TrendingDown;
  return <Icon size={11} className={`mx-auto ${TREND_CLS[row.trendTone]}`} />;
}

/** Heat-table skor kepatuhan regulasi per subholding. */
export function ComplianceBySubholding() {
  const { active, isFiltered, def } = useSubholding();
  // `name` (PalmCo / SGN / PTPN I (SupportingCo) / Holding) adalah dimensi
  // subholding; baris "Holding" tidak terpetakan sehingga tetap tampil
  // sebagai pembanding tata kelola korporat.
  const rows = filterBySubholding(complianceBySubholding, active, (s) => s.name);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Kepatuhan per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Skor Kepatuhan ${def.label} & Holding sebagai pembanding`
          : "Skor Kepatuhan, Porsi Patuh, dan Item Bermasalah"}
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_38px_46px_32px_28px_30px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Subholding</span>
        <span className="text-center">Skor</span>
        <span className="text-center">% Patuh</span>
        <span className="text-center">Parsial</span>
        <span className="text-center">Non</span>
        <span className="text-center">Tren</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {rows.map((s) => (
          <li
            key={s.name}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_38px_46px_32px_28px_30px] items-center gap-x-1.5"
          >
            <span className="truncate text-[9.5px] font-bold text-ink-900">{s.name}</span>
            <span
              className={`mx-auto flex h-[19px] w-[30px] items-center justify-center rounded-md text-[9px] font-extrabold ${scoreCls(s.skor)}`}
            >
              {s.skor}
            </span>
            <span className="text-center text-[9px] font-semibold text-ink-700">
              {String(s.patuhPct).replace(".", ",")}%
            </span>
            <span className="text-center text-[9px] font-bold text-[#d98b06]">{s.parsial}</span>
            <span className="text-center text-[9px] font-bold text-[#ef4444]">{s.non}</span>
            <TrendMark row={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
