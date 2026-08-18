import { BrainCircuit, Sparkles } from "lucide-react";
import { esgIntelligence } from "@/lib/esg-data";

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

/** Lapisan sintesis eksekutif ESG: 3 sinyal lintas pilar + rekomendasi utama. */
export function EsgIntelligence() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "30ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <BrainCircuit size={13} className="text-ptpn-green" />
          ESG Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
        </h3>
        <div className="flex items-center gap-3">
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-[#ef4444]">1</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Kritis</span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-[#d98b06]">1</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Perhatian</span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-ptpn-green">1</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Positif</span>
          </span>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-2">
        {esgIntelligence.map((s) => {
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
          Prioritaskan dua keputusan bernilai tinggi kuartal ini — FID biogas batch-3 Rp 420 M untuk
          menutup gap jalur dekarbonisasi, dan taskforce EUDR guna mengamankan ekspor EU Rp 4,1 T
          sebelum kontrak pengapalan Q4 2026.
        </p>
      </div>
    </div>
  );
}
