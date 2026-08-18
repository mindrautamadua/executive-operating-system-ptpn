import { Factory, Gauge, MapPin, ShieldAlert, Users } from "lucide-react";
import { irDisruption, irHealthDims, irHealthFormula } from "@/lib/ir-intel-data";
import { PALETTE } from "@/lib/chart-palette";

const DIM_TONE: Record<string, string> = {
  good: PALETTE.green,
  warn: PALETTE.amber,
  bad: PALETTE.red,
};

/**
 * Banner eksekutif: dekomposisi IR Health (4 dimensi berbobot) +
 * signature KPI Disruption Risk dengan eksposur operasional/finansial.
 */
export function IrDisruptionBanner() {
  return (
    <div
      className="card anim-rise grid grid-cols-[minmax(0,54fr)_minmax(0,46fr)] gap-4 px-4 pb-3.5 pt-3"
      style={{ "--d": "220ms" } as React.CSSProperties}
    >
      {/* IR Health decomposition */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            IR Health — Dekomposisi Indeks
          </h3>
          <span className="flex items-baseline gap-1">
            <span className="text-[17px] font-extrabold leading-none text-ink-900">82,6</span>
            <span className="text-[9px] font-bold text-ink-500">/100</span>
          </span>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-4 gap-2.5">
          {irHealthDims.map((d) => (
            <div
              key={d.name}
              className="flex flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfe] px-2.5 py-2"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[8.5px] font-bold text-ink-700">{d.name}</span>
                <span className="shrink-0 text-[7.5px] font-semibold text-ink-400">{d.weight}</span>
              </div>
              <div
                className="mt-1 text-[16px] font-extrabold leading-none"
                style={{ color: DIM_TONE[d.tone] }}
              >
                {d.score}
              </div>
              <span className="mt-1 h-[5px] overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={{ width: `${d.score}%`, background: DIM_TONE[d.tone] }}
                />
              </span>
              <span className="mt-1 text-[7.5px] leading-[1.3] text-ink-500">{d.note}</span>
            </div>
          ))}
        </div>

        <p className="mt-1.5 text-[7.5px] text-ink-400">{irHealthFormula}</p>
      </div>

      {/* Disruption Risk */}
      <div className="flex flex-col rounded-xl border border-[#cde8da] bg-[#f2faf6] px-3 pb-2.5 pt-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-ptpn-greenLight text-ptpn-green">
            <Gauge size={14} strokeWidth={2} />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Industrial Relations Disruption Risk
          </span>
          <span className="ml-auto flex items-baseline gap-1">
            <span className="text-[17px] font-extrabold leading-none text-ptpn-green">
              {irDisruption.score}
            </span>
            <span className="text-[9px] font-bold text-ink-500">/100</span>
            <span className="ml-1 rounded-md bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-bold text-ptpn-green">
              {irDisruption.category}
            </span>
          </span>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-4 gap-2">
          {[
            { Icon: MapPin, value: `${irDisruption.locationsElevated}`, label: "Lokasi risiko naik" },
            { Icon: Users, value: irDisruption.employeesExposed, label: "Karyawan terpapar" },
            { Icon: Factory, value: `${irDisruption.sitesExposed}`, label: irDisruption.criticalOps },
            { Icon: ShieldAlert, value: irDisruption.revenueExposure, label: "Eksposur pendapatan" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col justify-center rounded-lg bg-white/70 px-2 py-1.5">
              <s.Icon size={11} className="text-ptpn-green" />
              <span className="mt-1 whitespace-nowrap text-[12.5px] font-extrabold leading-none text-ink-900">
                {s.value}
              </span>
              <span className="mt-[3px] text-[7.5px] leading-[1.25] text-ink-500">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[7.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
            Driver utama
          </span>
          {irDisruption.drivers.map((d) => (
            <span
              key={d}
              className="rounded-md bg-white px-1.5 py-[2px] text-[7.5px] font-bold text-ink-700"
            >
              {d}
            </span>
          ))}
          <span className="ml-auto text-[9px] font-semibold text-ptpn-green">
            {irDisruption.delta}
          </span>
        </div>
      </div>
    </div>
  );
}
