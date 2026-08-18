import {
  AlertCircle,
  AlertTriangle,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  rekrutmenDecisions,
  rekrutmenIntelligence,
  rekrutmenPriority,
  type RekrutmenDecision,
} from "@/lib/rekrutmen-data";
import { SectionHead } from "../hc/SectionHead";

const TONE: Record<
  RekrutmenDecision["tone"],
  { Icon: typeof AlertCircle; iconCls: string; pill: string; wrap: string }
> = {
  red: {
    Icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
  },
  amber: {
    Icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
  },
};

/**
 * Recruitment Intelligence + BOD Decision Center: diagnosis lintas modul
 * (WP, Succession, PRR, Comp) dan keputusan yang diminta dari Direksi.
 */
export function RekrutmenDecisionCenter() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "660ms" } as React.CSSProperties}
    >
      <SectionHead title="Recruitment Intelligence & BOD Decision Center" />
      <p className="mt-[3px] text-[9px] text-ink-500">{rekrutmenPriority}</p>

      <div className="mt-2.5 grid grid-cols-[minmax(0,320fr)_minmax(0,780fr)] gap-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-[#e3f0e6] bg-[#f7fbf8] px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.04em] text-ptpn-green">
            <Sparkles size={11} /> Recruitment Intelligence
          </span>
          {rekrutmenIntelligence.map((t) => (
            <span key={t} className="flex gap-1.5">
              <CheckCircle2 size={11} className="mt-[1px] shrink-0 text-ptpn-green" />
              <span className="text-[8.5px] leading-[1.45] text-ink-700">{t}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {rekrutmenDecisions.map((d) => {
            const t = TONE[d.tone];
            return (
              <div
                key={d.title}
                className={`flex flex-col rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <t.Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                    <span className="truncate text-[10px] font-bold text-ink-900">{d.title}</span>
                  </div>
                  <span
                    className={`shrink-0 rounded px-1.5 py-[2px] text-[7.5px] font-extrabold uppercase tracking-[0.03em] ${t.pill}`}
                  >
                    Decision Required
                  </span>
                </div>

                <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.situation}</p>

                <div className="mt-1.5 rounded-lg border border-[#e3e9ef] bg-white/70 px-2 py-1.5">
                  <span className="block text-[7.5px] font-extrabold uppercase tracking-[0.04em] text-ink-400">
                    Keputusan yang Diminta
                  </span>
                  <span className="mt-[2px] block text-[9px] font-semibold leading-[1.4] text-ink-900">
                    {d.decision}
                  </span>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-1.5 text-[8.5px] font-semibold text-ink-700">
                  <span className="flex items-center gap-1">
                    <Banknote size={11} className="text-ink-400" />
                    Dampak: <span className="font-extrabold text-ink-900">{d.dampak}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarClock size={11} className="text-ink-400" />
                    Due: {d.due}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
