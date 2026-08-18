"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { impactChains, type CeoTone } from "@/lib/ceo-data";

const TONE_DOT: Record<CeoTone, string> = {
  green: "bg-[#22a45d]",
  amber: "bg-[#f5a524]",
  red: "bg-[#ef4444]",
};

/**
 * Impact Chain: satu isu material dibaca sebagai satu rantai kausal
 * Sinyal → Dampak → Risiko → Rekomendasi → Keputusan → Outcome — bukan
 * empat kartu terpisah yang harus direkonstruksi sendiri oleh pembaca.
 */
export function ImpactChainCard() {
  const [aktif, setAktif] = useState(0);
  const chain = impactChains[aktif];

  return (
    <div className="card flex h-full flex-col px-4 pb-2.5 pt-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="card-title whitespace-nowrap">IMPACT CHAIN</h3>
        <div className="flex shrink-0 gap-1">
          {impactChains.map((c, i) => (
            <button
              key={c.issue}
              onClick={() => setAktif(i)}
              className={`flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[8.5px] font-semibold leading-none transition-colors ${
                i === aktif
                  ? "bg-ptpn-greenLight text-ptpn-green"
                  : "text-ink-500 hover:bg-[#f5f8fa]"
              }`}
            >
              <span className={`h-[6px] w-[6px] rounded-full ${TONE_DOT[c.tone]}`} />
              {c.issue}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-wrap content-center items-center gap-x-1 gap-y-1.5">
        {chain.steps.map((s, i) => (
          <div key={s.stage} className="flex min-w-0 items-center gap-1">
            {i > 0 && <ArrowRight size={10} className="shrink-0 text-ink-300" />}
            <div className="min-w-0 rounded-lg border border-[#eef2f6] bg-[#fafcfd] px-2 py-1">
              <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
                {s.stage}
              </div>
              <div className="max-w-[190px] truncate text-[8.5px] font-semibold text-ink-800" title={s.label}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
