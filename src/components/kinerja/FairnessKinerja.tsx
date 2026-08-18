"use client";

import { ShieldCheck } from "lucide-react";
import { fairnessKinerja, fairnessNote } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS = {
  ok: { dot: "bg-ptpn-green", badge: "bg-ptpn-greenLight text-ptpn-green", label: "Within" },
  warn: { dot: "bg-[#f5a524]", badge: "bg-[#fdf3e0] text-[#d98b06]", label: "Flagged" },
} as const;

/** Metrik keadilan penilaian: variance, gap gender/level, unit bias. */
export function FairnessKinerja() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>PERFORMANCE FAIRNESS</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Indikator Keadilan Penilaian vs Ambang
          </p>
        </div>
        <ShieldCheck size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {fairnessKinerja.map((f) => {
          const s = STATUS[f.status];
          return (
            <div key={f.label} className="flex items-center gap-2">
              <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${s.dot}`} />
              <span className="min-w-0 flex-1 truncate text-[9.5px] text-ink-700">{f.label}</span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {f.value}
              </span>
              <span className="w-[62px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-400">
                {f.ambang}
              </span>
              <span
                className={`w-[52px] shrink-0 rounded px-1.5 py-[2px] text-center text-[9px] font-bold ${s.badge}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#f0f3f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
        {fairnessNote}
      </p>
    </div>
  );
}
