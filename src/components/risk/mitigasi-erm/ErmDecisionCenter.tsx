"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { ermDecisions } from "@/lib/risk-data-detail";
import { decisionAging } from "@/lib/decision-aging";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TABS = [
  { label: "Butuh Keputusan", count: ermDecisions.length },
  { label: "Dalam Proses", count: 0 },
  { label: "Selesai", count: 0 },
];

const TONE = {
  red: {
    icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
  },
  amber: {
    icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
  },
} as const;

/** Decision Center ERM — clone pola BodDecisionCenter untuk keputusan mitigasi. */
export function ErmDecisionCenter() {
  const [tab, setTab] = useState(0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="ERM Decision Center" action="Lihat Semua" badge={<ScopeNote />} />

      <div className="mt-2 flex items-center gap-4 border-b border-[#f0f3f6]">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`-mb-px border-b-2 pb-[6px] text-[9.5px] font-semibold transition-colors ${
              tab === i
                ? "border-ptpn-green text-ptpn-green"
                : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {tab === 0 ? (
          ermDecisions.map((d) => {
            const t = TONE[d.tone];
            const Icon = t.icon;
            return (
              <div key={d.title} className={`shrink-0 rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                    <span className="truncate text-[10px] font-bold text-ink-900">{d.title}</span>
                  </div>
                  <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                    {d.exposure}
                  </span>
                </div>
                <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.situation}</p>
                <p className="mt-1 text-[9px] leading-[1.45] text-ink-700">
                  <span className="font-bold text-ink-900">Keputusan diminta:</span> {d.decision}
                </p>
                {(() => {
                  const aging = decisionAging(d.due);
                  return (
                    <div
                      className={`mt-1.5 text-[8.5px] font-semibold ${
                        aging.overdue ? "text-[#ef4444]" : "text-ink-400"
                      }`}
                    >
                      {aging.label}
                    </div>
                  );
                })()}
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-4 text-center text-[9.5px] text-ink-500">
            Tidak ada item baru pada tab ini.
          </div>
        )}
      </div>
    </div>
  );
}
