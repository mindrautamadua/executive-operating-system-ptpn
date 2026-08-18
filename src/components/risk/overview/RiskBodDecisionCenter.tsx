import { AlertCircle, AlertTriangle, Sparkles } from "lucide-react";
import { riskDecisions, type RiskDecision } from "@/lib/risk-data";
import { decisionAging } from "@/lib/decision-aging";
import { DecisionActions } from "@/components/shared/DecisionActions";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE: Record<
  RiskDecision["tone"],
  { icon: typeof AlertCircle; iconCls: string; pill: string; wrap: string }
> = {
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
};

/** Keputusan mitigasi risiko enterprise yang menunggu persetujuan BOD. */
export function RiskBodDecisionCenter({
  items = riskDecisions,
  delay = 120,
  /** true = kartu mengisi tinggi baris grid (daftar keputusan ikut scroll). */
  fill = false,
}: {
  items?: RiskDecision[];
  delay?: number;
  fill?: boolean;
}) {
  return (
    <div
      className={`card anim-rise px-4 pb-3.5 pt-3 ${fill ? "flex h-full flex-col" : ""}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead title="BOD Decision Center" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Keputusan Mitigasi Risiko Menunggu Persetujuan
      </p>

      <div
        className={`mt-2.5 flex flex-col gap-2 ${fill ? "scroll-thin min-h-0 flex-1 overflow-y-auto" : ""}`}
      >
        {items.map((d) => {
          const t = TONE[d.tone];
          const Icon = t.icon;
          return (
            <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                  <span className="truncate text-[10px] font-bold text-ink-900">{d.title}</span>
                </div>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.situation}</p>
              <p className="mt-1.5 flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Keputusan:</span> {d.decision}
                </span>
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                  {d.exposure}
                </span>
                {(() => {
                  const aging = decisionAging(d.due);
                  return aging.overdue ? (
                    <span className="rounded bg-[#ef4444] px-1.5 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-white">
                      {aging.label}
                    </span>
                  ) : (
                    <span className="text-[8.5px] font-semibold text-ink-400">{aging.label}</span>
                  );
                })()}
              </div>
              <DecisionActions id={d.title} />
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
