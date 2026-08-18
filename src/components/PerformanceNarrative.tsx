import { Sparkles } from "lucide-react";
import { performanceNarrative } from "@/lib/ceo-data";

/**
 * Executive Performance Narrative — satu kalimat sintesis di bawah KPI strip.
 * KPI terpisah menampilkan 7 fakta; band ini mengatakan apa arti fakta-fakta
 * itu bersama-sama (volume turun ditutup harga & efisiensi). Chip story
 * memvisualkan rantainya supaya kalimat bisa diverifikasi sekilas.
 */
export function PerformanceNarrative() {
  return (
    <div className="card anim-rise mt-3 flex flex-col gap-2 px-4 py-2.5 md:flex-row md:items-center">
      <div className="flex shrink-0 items-center gap-1.5">
        <Sparkles size={13} className="text-[#1b3a6b]" />
        <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
          Performance Narrative
        </span>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1">
        {performanceNarrative.story.map((s, i) => (
          <span key={s.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-[9px] text-ink-300">·</span>}
            <span className="rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-semibold text-ink-500">
              {s.label}{" "}
              <span className={s.good ? "font-bold delta-good" : "font-bold delta-bad"}>
                {s.value}
              </span>
            </span>
          </span>
        ))}
      </div>

      <p className="min-w-0 text-[9px] leading-[1.4] text-ink-700">
        {performanceNarrative.text}
      </p>
    </div>
  );
}
