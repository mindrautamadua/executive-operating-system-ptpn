"use client";

import { GitBranch } from "lucide-react";
import { funnelTalenta } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE = {
  green: { bar: "bg-gradient-to-r from-[#7ed957] to-[#22a45d]", text: "text-ptpn-green" },
  blue: { bar: "bg-[#3b82f6]", text: "text-[#3b82f6]" },
  purple: { bar: "bg-[#8b5cf6]", text: "text-[#8b5cf6]" },
  teal: { bar: "bg-[#14b8a6]", text: "text-[#0d9488]" },
  red: { bar: "bg-[#ef4444]", text: "text-[#ef4444]" },
} as const;

const MAX = 12742;

/** Funnel Performance → Talent: high performer sampai ready now + flight risk. */
export function KonversiTalenta() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>HIGH PERFORMER → TALENT CONVERSION</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Alur Performance ke Succession Pipeline
          </p>
        </div>
        <GitBranch size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {funnelTalenta.map((f, i) => {
          const t = TONE[f.tone];
          const width = Math.max((f.jumlahNum / MAX) * 100, 4);
          return (
            <div key={f.label} className="flex items-center gap-2">
              <span className="w-[118px] shrink-0 truncate text-[9.5px] text-ink-700">
                {f.label}
              </span>
              <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-[#f1f5f8]">
                <div
                  className={`anim-grow-x h-full rounded-full ${t.bar}`}
                  style={{ width: `${width}%`, "--d": `${i * 60}ms` } as React.CSSProperties}
                />
              </div>
              <span className={`w-[42px] shrink-0 text-right text-[10px] font-extrabold tabular-nums ${t.text}`}>
                {f.jumlah}
              </span>
              <span className="w-[168px] shrink-0 truncate text-[8.5px] text-ink-400">{f.sub}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#f0f3f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
        86 Ready Now berisiko keluar — retention plan diprioritaskan di Performance Decision
        Center.
      </p>
    </div>
  );
}
