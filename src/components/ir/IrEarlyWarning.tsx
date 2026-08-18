import { Siren } from "lucide-react";
import { RISK_STYLE } from "@/lib/ir-data";
import { irEarlyWarning, SIGNAL_STYLE, strikeWatch } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

/**
 * IR Early Warning: skor leading-indicator + driver signals + daftar lokasi
 * dengan probabilitas eskalasi dan estimasi window kejadian.
 */
export function IrEarlyWarning() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="IR Early Warning" />

      <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#f3e3c3] bg-[#fdf9f0] px-2.5 py-1.5">
        <Siren size={13} className="shrink-0 text-[#d98b06]" />
        <span className="flex items-baseline gap-1">
          <span className="text-[16px] font-extrabold leading-none text-[#d98b06]">
            {irEarlyWarning.score}
          </span>
          <span className="text-[8.5px] font-bold text-ink-400">/100</span>
        </span>
        <span className="rounded-md bg-[#fdf3e0] px-1.5 py-[2px] text-[9px] font-bold text-[#d98b06]">
          {irEarlyWarning.category}
        </span>
        <span className="ml-auto text-[9px] font-semibold text-ink-500">
          Horizon risiko: {irEarlyWarning.horizon}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap gap-1">
        {irEarlyWarning.drivers.map((d) => (
          <span
            key={d.name}
            className={`rounded-md px-1.5 py-[2px] text-[7.5px] font-bold ${SIGNAL_STYLE[d.signal]}`}
          >
            {d.name}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_54px_50px_54px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Lokasi (Isu Utama)</span>
        <span>Risiko</span>
        <span className="text-center">Prob.</span>
        <span className="text-right">Window</span>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col justify-around">
        {strikeWatch.map((r) => (
          <li
            key={r.lokasi}
            className="grid grid-cols-[minmax(0,1fr)_54px_50px_54px] items-center gap-x-2 border-b border-[#f4f7fa] py-1 last:border-0"
          >
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-semibold text-ink-800" title={r.lokasi}>
                {r.lokasi}
              </span>
              <span className="block truncate text-[7.5px] text-ink-500">{r.isu}</span>
            </span>
            <span>
              <span
                className={`inline-block rounded-md px-1.5 py-[3px] text-[9px] font-bold ${RISK_STYLE[r.risk]}`}
              >
                {r.risk}
              </span>
            </span>
            <span className="text-center text-[9.5px] font-extrabold text-ink-900">
              {r.probability}
            </span>
            <span className="text-right text-[8.5px] font-semibold text-ink-600">{r.window}</span>
          </li>
        ))}
      </ul>

      <PanelFooterLink label="Lihat Semua Sinyal Dini" />
    </div>
  );
}
