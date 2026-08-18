import { Info } from "lucide-react";
import { fyForecast, fyForecastNote } from "@/lib/kba-data";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function ForecastFullYear() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Proyeksi Full-Year 2026" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Forecast FY berbasis run-rate YTD + phasing musiman H2
      </p>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {fyForecast.map((f) => (
          <div key={f.label} className="rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold text-ink-500">{f.label}</span>
              <ToneBadge label={`${fmtId(f.vsRkapPct, 1)}% RKAP`} tone={f.tone} />
            </div>
            <div className="mt-2 text-[17px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {f.forecast}
            </div>
            <div className="mt-[4px] text-[8.5px] text-ink-400">RKAP FY {f.rkap}</div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 flex items-start gap-1.5 text-[8.5px] leading-snug text-ink-500">
        <Info size={10} className="mt-[1px] shrink-0 text-ink-400" />
        {fyForecastNote}
      </p>
    </div>
  );
}
