import { ChevronRight } from "lucide-react";
import { eskalasiPath } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LEVEL_CLS = [
  "border-[#d3e2f8] bg-[#f5f8fd] text-[#2f6fe4]",
  "border-[#f3e3c3] bg-[#fdf9f0] text-[#d98b06]",
  "border-[#f6d5d5] bg-[#fdf5f5] text-[#ef4444]",
  "border-[#f6d5d5] bg-[#fdf5f5] text-[#ef4444]",
];

/** Jalur eskalasi limit breach hingga Komite Pemantau Risiko Dewan Komisaris. */
export function EskalasiStatus() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Jalur Eskalasi Komite Risiko" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pemicu, Forum Pengambil Keputusan, dan SLA Tiap Tingkat
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {eskalasiPath.map((e, i) => (
          <li key={e.level} className={`shrink-0 rounded-lg border px-2.5 py-1.5 ${LEVEL_CLS[i]}`}>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.05em]">
                Level {e.level}
              </span>
              <ChevronRight size={10} className="shrink-0 opacity-60" />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-bold text-ink-900">
                {e.trigger}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[8.5px] text-ink-700">{e.forum}</span>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">{e.sla}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[9px] leading-snug text-ink-500">
        Status saat ini: 2 breach (HPP CPO &amp; piutang plasma) berada pada Level 3 — wajib
        diagendakan pada Rapat Direksi Juli 2026.
      </p>
    </div>
  );
}
