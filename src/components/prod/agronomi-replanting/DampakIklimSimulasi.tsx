"use client";

import { CloudSun, Droplets, Sun } from "lucide-react";
import { EL_NINO_PROBABILITAS_PCT, elNinoScenarios } from "@/lib/agro-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STYLES = [
  {
    Icon: Droplets,
    ring: "border-[#e3e9ef]",
    badge: "bg-[#eef2f6] text-ink-500",
    accent: "text-ink-900",
  },
  {
    Icon: CloudSun,
    ring: "border-[#f5d9a8]",
    badge: "bg-[#fdf3e0] text-[#d98b06]",
    accent: "text-[#d98b06]",
  },
  {
    Icon: Sun,
    ring: "border-[#f5b5b5]",
    badge: "bg-[#fdecec] text-[#ef4444]",
    accent: "text-[#ef4444]",
  },
];

const fmt = (v: number, suffix: string) =>
  v === 0 ? "—" : `${v.toLocaleString("id-ID")}${suffix}`;

/**
 * Skenario El Nino menakar dampak EBITDA seluruh grup (sawit, tebu, karet, teh)
 * — angka konsolidasi, tidak dipecah per subholding.
 */
export function DampakIklimSimulasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Simulasi Dampak Iklim H2 2026" badge={<ScopeNote />} />
        <span className="shrink-0 rounded-md bg-[#fdecec] px-2 py-[3px] text-[9px] font-extrabold text-[#ef4444]">
          Probabilitas El Nino {EL_NINO_PROBABILITAS_PCT}%
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skenario Dampak Produksi &amp; EBITDA (BMKG/NOAA, per Mei 2026)
      </p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-3 gap-3">
        {elNinoScenarios.map((s, i) => {
          const st = STYLES[i];
          const Icon = st.Icon;
          return (
            <div
              key={s.skenario}
              className={`flex min-h-0 flex-col rounded-xl border ${st.ring} px-3 pb-2.5 pt-2.5`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} strokeWidth={1.9} className="shrink-0 text-ink-400" />
                  <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                    {s.skenario}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${st.badge}`}
                >
                  {s.probabilitasPct}%
                </span>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-1.5">
                <div>
                  <div className="text-[7.5px] text-ink-400">Produksi H2</div>
                  <div className={`mt-[2px] text-[12px] font-extrabold leading-none ${st.accent}`}>
                    {fmt(s.dampakProduksiH2Pct, "%")}
                  </div>
                </div>
                <div>
                  <div className="text-[7.5px] text-ink-400">TBS FY</div>
                  <div className={`mt-[2px] text-[12px] font-extrabold leading-none ${st.accent}`}>
                    {fmt(s.dampakTbsFyJtTon, " jt t")}
                  </div>
                </div>
                <div>
                  <div className="text-[7.5px] text-ink-400">EBITDA</div>
                  <div className={`mt-[2px] text-[12px] font-extrabold leading-none ${st.accent}`}>
                    {s.dampakEbitdaRpT === 0
                      ? "—"
                      : `Rp ${s.dampakEbitdaRpT.toLocaleString("id-ID")} T`}
                  </div>
                </div>
              </div>

              <p className="mt-2 text-[9px] leading-snug text-ink-500">{s.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
