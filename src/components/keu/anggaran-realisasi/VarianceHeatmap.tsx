"use client";

import { varianceHeatmap, type RkapLine } from "@/lib/kba-data";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const LINI: RkapLine[] = ["Pendapatan", "EBITDA", "Laba Bersih", "Opex", "Capex"];
const SEGMENTS = ["PalmCo", "SGN", "PTPN I"] as const;

const TONE_CELL: Record<string, string> = {
  good: "bg-ptpn-greenLight text-ptpn-green",
  warn: "bg-[#fdf3e0] text-[#d98b06]",
  bad: "bg-[#fdecec] text-[#ef4444]",
};

const cellOf = (segment: string, lini: RkapLine) =>
  varianceHeatmap.find((c) => c.segment === segment && c.lini === lini);

export function VarianceHeatmap() {
  const { active, isFiltered } = useSubholding();
  // Matriks pembanding: baris subholding non-aktif diredupkan agar deviasi
  // subholding terpilih tetap terbaca relatif terhadap yang lain.
  const dim = (segment: string) =>
    !isFiltered || toSubholdingId(segment) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Variance Heatmap" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Deviasi Achievement vs Prorata 41,7% (pts) — Subholding × Lini
      </p>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-1.5">
        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] gap-1.5">
          <span />
          {LINI.map((l) => (
            <span
              key={l}
              className="truncate text-center text-[9px] font-bold uppercase tracking-[0.03em] text-ink-500"
              title={l}
            >
              {l}
            </span>
          ))}
        </div>

        {SEGMENTS.map((seg) => (
          <div
            key={seg}
            className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] gap-1.5 transition-opacity"
            style={{ opacity: dim(seg) }}
          >
            <span className="flex items-center text-[9px] font-bold text-ink-900">{seg}</span>
            {LINI.map((l) => {
              const cell = cellOf(seg, l);
              if (!cell) return <span key={l} />;
              return (
                <div
                  key={l}
                  className={`flex h-[34px] items-center justify-center rounded-lg text-[10px] font-extrabold ${TONE_CELL[cell.tone]}`}
                  title={`${seg} · ${l}: ${cell.pct > 0 ? "+" : ""}${fmtId(cell.pct, 1)} pts vs prorata`}
                >
                  {cell.pct > 0 ? "+" : "−"}
                  {fmtId(Math.abs(cell.pct), 1)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pb-0.5 pt-1.5">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px] bg-ptpn-green" /> Di atas / sesuai target
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px] bg-[#f5a524]" /> Deviasi tipis
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px] bg-[#ef4444]" /> Tertinggal signifikan
        </span>
      </div>
    </div>
  );
}
