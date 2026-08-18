import { AlertCircle, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { korporasiDecisions } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

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

/** Decision center korporat (pola BodDecisionCenter, tanpa tab). */
export function KorporasiDecisionCenter() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Corporate Decision Center" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {korporasiDecisions.length} Keputusan Korporat Menunggu Persetujuan Direksi
      </p>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-3">
        {korporasiDecisions.map((d) => {
          const t = TONE[d.tone];
          const Icon = t.icon;
          return (
            <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                  <span className="truncate text-[10px] font-bold text-ink-900">{d.title}</span>
                </div>
                <span
                  className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}
                >
                  {d.impact}
                </span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.context}</p>
              <p className="mt-1.5 flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Rekomendasi:</span> {d.rekomendasi}
                </span>
              </p>
              <div className="mt-1.5 text-[8.5px] font-semibold text-ink-400">Due: {d.due}</div>
            </div>
          );
        })}
      </div>

      <button className="mt-2.5 w-full rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Semua Decision
      </button>
    </div>
  );
}
