import { ArrowRight, TriangleAlert } from "lucide-react";
import { badHire, hireCohort, type SlaTone } from "@/lib/rekrutmen-data";

const TONE_TEXT: Record<SlaTone, string> = {
  green: "text-ptpn-green",
  amber: "text-[#d98b06]",
  red: "text-[#ef4444]",
};

/**
 * Post-hire outcome: apakah orang yang direkrut benar-benar berkinerja,
 * bertahan, dan produktif — recruitment sebagai effectiveness, bukan volume.
 */
export function HireOutcomeCohort() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Recruitment → Performance</h3>
        <span className="shrink-0 text-[9px] text-ink-500">
          Cohort hire 2025 · <span className="font-bold text-ink-900">486 orang</span>
        </span>
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 items-center gap-1">
        {hireCohort.map((c, i) => (
          <div key={c.label} className="flex min-w-0 flex-1 items-center gap-1">
            {i > 0 && <ArrowRight size={11} className="shrink-0 text-ink-400" />}
            <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-[#eef2f6] bg-[#f9fbfc] px-1.5 py-2 text-center">
              <span className={`text-[15px] font-extrabold tabular-nums ${TONE_TEXT[c.tone]}`}>
                {c.value}
              </span>
              <span className="mt-[3px] text-[8.5px] font-semibold leading-[1.3] text-ink-900">
                {c.label}
              </span>
              <span className="mt-[1px] text-[9px] leading-[1.3] text-ink-500">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-start justify-between gap-2 rounded-lg border border-[#f3e3c3] bg-[#fdf9f0] px-2.5 py-[6px]">
        <span className="flex items-start gap-1.5 text-[8.5px] leading-[1.45] text-ink-700">
          <TriangleAlert size={11} className="mt-[1px] shrink-0 text-[#d98b06]" />
          {badHire.catatan}
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[12px] font-extrabold text-[#d98b06]">{badHire.biaya}</span>
          <span className="block text-[9px] text-ink-500">cost of bad hire</span>
        </span>
      </div>
    </div>
  );
}
