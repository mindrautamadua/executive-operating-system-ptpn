"use client";

import { kpiMatrix, type Rag } from "@/lib/skc-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const RAG_TONE: Record<Rag, BadgeTone> = {
  green: "good",
  amber: "warn",
  red: "bad",
};

const RAG_LABEL: Record<Rag, string> = {
  green: "Hijau",
  amber: "Kuning",
  red: "Merah",
};

const SCORE_CLASS: Record<Rag, string> = {
  green: "text-ptpn-green",
  amber: "text-[#d98b06]",
  red: "text-[#ef4444]",
};

/** Matriks 32 KPI korporat: target, aktual, skor, dan status RAG. */
export function KpiMatrix() {
  const { active } = useSubholding();
  // Nama KPI menyebut entitas bila spesifik (mis. "EBITDA Margin SGN");
  // KPI tanpa penyebutan entitas adalah KPI group dan tetap tampil.
  const rows = filterBySubholding(kpiMatrix, active, (k) => k.name);
  const tally = (rag: Rag) => rows.filter((k) => k.rag === rag).length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title={`Matriks ${rows.length} KPI Korporat`} action="Unduh Matriks" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {tally("green")} Hijau · {tally("amber")} Kuning · {tally("red")} Merah — Target vs Aktual
        YTD Mei 2026
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">KPI</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Perspektif</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Target</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Aktual</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Skor</th>
              <th className="border-b border-[#eef2f6] pb-1.5">RAG</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((k) => (
              <tr key={`${k.perspective}-${k.name}`} className="align-middle">
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {k.name}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] text-ink-500">
                  {k.perspective}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] tabular-nums text-ink-500">
                  {k.target}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-semibold tabular-nums text-ink-900">
                  {k.actual}
                </td>
                <td
                  className={`border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-extrabold tabular-nums ${SCORE_CLASS[k.rag]}`}
                >
                  {k.score}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px]">
                  <ToneBadge label={RAG_LABEL[k.rag]} tone={RAG_TONE[k.rag]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
