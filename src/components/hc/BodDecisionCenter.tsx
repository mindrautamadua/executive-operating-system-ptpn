"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { bodDecisions, bodTabs } from "@/lib/hc-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "./SectionHead";

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

export function BodDecisionCenter() {
  const [tab, setTab] = useState(0);
  const { active, isFiltered, def } = useSubholding();
  // Judul keputusan menyebut entitas pemiliknya (mis. "Succession Risk – PTPN IV");
  // keputusan yang tidak melekat pada satu subholding tetap tampil karena berlaku grup.
  const decisions = filterBySubholding(bodDecisions, active, (d) => d.title);

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "120ms" } as React.CSSProperties}>
      <SectionHead title="BOD Decision Center" action="Lihat Semua" href="/sdm-talenta/decision-center" />

      <div className="mt-2.5 flex items-center gap-4 border-b border-[#f0f3f6]">
        {bodTabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`-mb-px border-b-2 pb-[6px] text-[9.5px] font-semibold transition-colors ${
              tab === i
                ? "border-ptpn-green text-ptpn-green"
                : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            {t.label} ({i === 0 ? decisions.length : t.count})
          </button>
        ))}
      </div>

      <div className="mt-2.5 flex flex-col gap-2">
        {tab === 0 && decisions.length > 0 ? (
          decisions.map((d) => {
            const t = TONE[d.tone];
            const Icon = t.icon;
            return (
              <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                    <span className="truncate text-[10px] font-bold text-ink-900">{d.title}</span>
                  </div>
                  <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                    {d.impact}
                  </span>
                </div>
                <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.text}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[8.5px] font-semibold text-ink-400">
                  Due: {d.due}
                  {d.overdue && (
                    <span className="rounded bg-[#ef4444] px-1.5 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-white">
                      Overdue{d.overdueDays ? ` ${d.overdueDays} hari` : ""}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-4 text-center text-[9.5px] text-ink-500">
            {tab === 0 && isFiltered
              ? `Tidak ada keputusan tertunda untuk ${def.label}.`
              : "Tidak ada item baru pada tab ini."}
          </div>
        )}
      </div>

      <Link href="/sdm-talenta/decision-center" className="mt-2.5 block w-full text-center rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Semua Decision
      </Link>
    </div>
  );
}
