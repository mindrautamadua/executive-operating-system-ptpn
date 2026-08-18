"use client";

import { BrainCircuit, Sparkles, TrendingUp } from "lucide-react";
import { produktivitasIntel } from "@/lib/produktivitas-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TILE_TONE = {
  green: { wrap: "border-[#dcf1e6] bg-[#f2faf5]", value: "text-ptpn-greenDark" },
  blue: { wrap: "border-[#dce9fb] bg-[#f4f8fe]", value: "text-[#2563c9]" },
  amber: { wrap: "border-[#f7e8c8] bg-[#fdf8ee]", value: "text-[#d98b06]" },
  purple: { wrap: "border-[#eae0fb] bg-[#f9f6fe]", value: "text-[#7c3aed]" },
} as const;

/** Lapisan sintesis: pergerakan produktivitas, driver, risiko & peluang ekonomi. */
export function ProduktivitasIntelligence() {
  const { headline, tiles, rekomendasi } = produktivitasIntel;
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "30ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <BrainCircuit size={13} className="text-ptpn-green" />
          Productivity Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
          <ScopeNote />
        </h3>
        <span className="flex items-baseline gap-1.5">
          <TrendingUp size={12} className="self-center text-ptpn-green" />
          <span className="text-[13px] font-extrabold leading-none text-ptpn-greenDark">
            {headline.delta}
          </span>
          <span className="text-[8.5px] font-semibold text-ink-500">{headline.detail}</span>
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-4 gap-2">
        {tiles.map((t) => {
          const tone = TILE_TONE[t.tone];
          return (
            <div key={t.label} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${tone.wrap}`}>
              <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-ink-500">
                {t.label}
              </div>
              <div className={`mt-1 text-[10.5px] font-extrabold leading-tight ${tone.value}`}>
                {t.value}
              </div>
              <p className="mt-1 text-[8.5px] leading-[1.45] text-ink-600">{t.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">AI Recommendation: </span>
          {rekomendasi}
        </p>
      </div>
    </div>
  );
}
