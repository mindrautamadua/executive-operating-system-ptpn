"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { asgDecisions } from "@/lib/asg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TABS = [
  { label: "Perlu Keputusan", count: asgDecisions.length },
  { label: "Dalam Proses", count: 4 },
  { label: "Selesai", count: 7 },
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
  green: {
    icon: CheckCircle2,
    iconCls: "text-ptpn-green",
    pill: "bg-ptpn-greenLight text-ptpn-green",
    wrap: "border-[#d6ecdf] bg-[#f4faf6]",
  },
} as const;

/** BOD Decision Center sengketa lahan (clone pola HC, tata letak 3 kolom). */
export function AsgDecisionCenter() {
  const [tab, setTab] = useState(0);

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "200ms" } as React.CSSProperties}>
      <SectionHead title="BOD Decision Center" action="Lihat Semua" badge={<ScopeNote />} />

      <div className="mt-2.5 flex items-center gap-4 border-b border-[#f0f3f6]">
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

      {tab === 0 ? (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          {asgDecisions.map((d) => {
            const t = TONE[d.tone];
            const Icon = t.icon;
            return (
              <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                    <span className="truncate text-[10px] font-bold text-ink-900" title={d.title}>
                      {d.title}
                    </span>
                  </div>
                  <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                    {d.impact}
                  </span>
                </div>
                <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.context}</p>
                <p className="mt-1.5 flex items-start gap-1 text-[8.5px] leading-[1.45] text-ink-700">
                  <Sparkles size={9} className="mt-[2px] shrink-0 text-ptpn-green" />
                  <span>
                    <span className="font-bold text-ptpn-green">Rekomendasi:</span> {d.rekomendasi}
                  </span>
                </p>
                <div className="mt-1.5 text-[8.5px] font-semibold text-ink-400">Due: {d.due}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2.5 rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-4 text-center text-[9.5px] text-ink-500">
          Tidak ada item baru pada tab ini.
        </div>
      )}
    </div>
  );
}
