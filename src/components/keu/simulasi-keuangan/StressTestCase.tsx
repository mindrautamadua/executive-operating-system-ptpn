import { CheckCircle2, FlaskConical } from "lucide-react";
import { stressCase } from "@/lib/ksk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function StressTestCase() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Stress Test Case" badge={<ScopeNote />} />
      <p className="mt-[3px] flex items-center gap-1.5 text-[9px] text-ink-500">
        <FlaskConical size={10} className="shrink-0 text-[#d98b06]" />
        {stressCase.title}
      </p>

      <p className="mt-2 rounded-lg bg-[#fdf9f0] px-2.5 py-1.5 text-[8.5px] leading-snug text-[#8a6100]">
        {stressCase.asumsi}
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2">
        {stressCase.hasil.map((h) => (
          <div
            key={h.label}
            className="flex flex-col justify-center rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-2"
          >
            <span className="text-[8.5px] font-semibold text-ink-500">{h.label}</span>
            <span className="mt-[3px] text-[15px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {h.value}
            </span>
            <span className="mt-[3px] truncate text-[9px] text-ink-500" title={h.sub}>
              {h.sub}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-[#f4faf6] px-2.5 py-1.5 text-[8.5px] leading-snug text-ink-700">
        <CheckCircle2 size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
        {stressCase.kesimpulan}
      </p>
    </div>
  );
}
