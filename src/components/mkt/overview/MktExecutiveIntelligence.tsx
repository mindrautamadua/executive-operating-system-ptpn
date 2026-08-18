import { BrainCircuit, Sparkles } from "lucide-react";
import { mktIntelligence } from "@/lib/pemasaran-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SIGNAL_TONE = {
  red: {
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    dot: "bg-[#ef4444]",
    impact: "text-[#ef4444]",
  },
  amber: {
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    dot: "bg-[#f5a524]",
    impact: "text-[#d98b06]",
  },
  green: {
    wrap: "border-[#d6ecdf] bg-[#f4faf6]",
    dot: "bg-ptpn-green",
    impact: "text-ptpn-green",
  },
} as const;

const COUNT_TONE = {
  red: "text-[#ef4444]",
  amber: "text-[#d98b06]",
  green: "text-ptpn-green",
} as const;

/** Lapisan sintesis eksekutif komersial: sinyal kritis pasar + satu rekomendasi utama. */
export function MktExecutiveIntelligence() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "30ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <BrainCircuit size={13} className="text-ptpn-green" />
          Executive Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
          {/* Sintesis naratif disusun di level grup — tidak dipecah per subholding. */}
          <ScopeNote />
        </h3>
        <div className="flex items-center gap-3">
          {mktIntelligence.counts.map((c) => (
            <span key={c.label} className="flex items-baseline gap-1">
              <span className={`text-[11px] font-extrabold leading-none ${COUNT_TONE[c.tone]}`}>
                {c.value}
              </span>
              <span className="text-[8.5px] font-semibold text-ink-500">{c.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-2">
        {mktIntelligence.signals.map((s) => {
          const t = SIGNAL_TONE[s.tone];
          return (
            <div key={s.no} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="text-[9px] font-bold text-ink-500">{s.no}</span>
                <span className="truncate text-[10px] font-bold text-ink-900">{s.title}</span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{s.text}</p>
              <div className="mt-1.5 text-[8.5px] font-semibold text-ink-400">
                {s.impactLabel}: <span className={`font-bold ${t.impact}`}>{s.impactValue}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Executive Recommendation: </span>
          {mktIntelligence.recommendation}
        </p>
      </div>
    </div>
  );
}
