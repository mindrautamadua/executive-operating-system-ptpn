import { BrainCircuit, Sparkles } from "lucide-react";
import { riskIntelligence, type RiskIntelligenceItem } from "@/lib/risk-data";

const TONE: Record<RiskIntelligenceItem["tone"], { wrap: string; dot: string }> = {
  red: { wrap: "border-[#f6d5d5] bg-[#fdf5f5]", dot: "bg-[#ef4444]" },
  amber: { wrap: "border-[#f3e3c3] bg-[#fdf9f0]", dot: "bg-[#f5a524]" },
  blue: { wrap: "border-[#d3e2f8] bg-[#f5f8fd]", dot: "bg-[#3b7ded]" },
};

const COUNTS = [
  { value: "4", label: "Risiko Ekstrem", cls: "text-[#ef4444]" },
  { value: "13", label: "Risiko Tinggi", cls: "text-[#d98b06]" },
  { value: "64", label: "Enterprise Risk Index", cls: "text-ptpn-green" },
];

/** Lapisan sintesis eksekutif risiko enterprise (mirror ExecutiveIntelligence). */
export function RiskIntelligence() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "30ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <BrainCircuit size={13} className="text-ptpn-green" />
          Risk Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
        </h3>
        <div className="flex items-center gap-3">
          {COUNTS.map((c) => (
            <span key={c.label} className="flex items-baseline gap-1">
              <span className={`text-[11px] font-extrabold leading-none ${c.cls}`}>{c.value}</span>
              <span className="text-[8.5px] font-semibold text-ink-500">{c.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {riskIntelligence.map((s, i) => {
          const t = TONE[s.tone];
          return (
            <div key={s.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="text-[9px] font-bold text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[10px] font-bold text-ink-900">{s.title}</span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{s.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Executive Recommendation: </span>
          Perlakukan hedging CPO dan asuransi parametrik iklim sebagai satu paket keputusan Juli
          2026 — keduanya menutup dua risiko ekstrem yang berkorelasi dengan gabungan eksposur di
          atas Rp 4 T EBITDA.
        </p>
      </div>
    </div>
  );
}
