"use client";

import { BrainCircuit, Sparkles } from "lucide-react";
import { initiativeCounts, initiatives, scorecardScores } from "@/lib/stg-core";
import { strategyIntelligence } from "@/lib/stg-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";

const SIGNAL_TONE = {
  bad: {
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    dot: "bg-[#ef4444]",
    link: "text-[#ef4444]",
  },
  warn: {
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    dot: "bg-[#f5a524]",
    link: "text-[#d98b06]",
  },
  good: {
    wrap: "border-[#d6ecdf] bg-[#f4faf6]",
    dot: "bg-ptpn-green",
    link: "text-ptpn-green",
  },
} as const;

/** Sintesis eksekutif eksekusi strategi: 3 sinyal utama + rekomendasi Direksi. */
export function StrategyIntelligence() {
  const grup = scorecardScores[0];
  const { active, isFiltered } = useSubholding();
  // `owner` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding register.
  const rows = filterBySubholding(initiatives, active, (i) => i.owner);
  const tally = (status: string) => rows.filter((i) => i.status === status).length;

  const COUNTS = [
    {
      label: "On Track",
      value: `${isFiltered ? tally("On Track") : initiativeCounts.onTrack}`,
      cls: "text-ptpn-green",
    },
    {
      label: "At Risk",
      value: `${isFiltered ? tally("At Risk") : initiativeCounts.atRisk}`,
      cls: "text-[#d98b06]",
    },
    {
      label: "Off Track",
      value: `${isFiltered ? tally("Off Track") : initiativeCounts.offTrack}`,
      cls: "text-[#ef4444]",
    },
  ];

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "30ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <BrainCircuit size={13} className="text-ptpn-green" />
          Strategy Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
        </h3>
        <div className="flex items-center gap-3">
          {COUNTS.map((c) => (
            <span key={c.label} className="flex items-baseline gap-1">
              <span className={`text-[11px] font-extrabold leading-none ${c.cls}`}>{c.value}</span>
              <span className="text-[8.5px] font-semibold text-ink-500">{c.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {strategyIntelligence.map((s, i) => {
          const t = SIGNAL_TONE[s.tone];
          return (
            <div key={s.headline} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="text-[9px] font-bold text-ink-500">S{i + 1}</span>
                <span className="truncate text-[10px] font-bold text-ink-900" title={s.headline}>
                  {s.headline}
                </span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{s.detail}</p>
              <a
                href={s.href}
                className={`mt-1.5 block text-[8.5px] font-bold ${t.link} hover:underline`}
              >
                Buka detail →
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Executive Recommendation: </span>
          Skor KPI korporat grup {grup.score.toLocaleString("id-ID")} masih di atas target{" "}
          {grup.target}, namun 11 inisiatif belum on track dan value creation baru 44% target FY.
          Fokuskan Radirsus Q3 pada tiga keputusan struktural Swasembada Gula dan realokasi
          pendanaan ke inisiatif ber-run-rate tinggi.
        </p>
      </div>
    </div>
  );
}
