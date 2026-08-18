"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DonutChart } from "../ui/DonutChart";
import { anomaliData, anomaliHarian, totalAnomali } from "@/lib/data-analytics";
import { PALETTE, SEMANTIC } from "@/lib/chart-palette";

const MAX_HARIAN = Math.max(...anomaliHarian);

/** Warna bar harian menurut tingkat insiden. */
const warnaInsiden = (v: number) => {
  if (v >= 8) return SEMANTIC.bad;
  if (v >= 6) return SEMANTIC.warn;
  return PALETTE.slate;
};

export function AnomalyDetection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">
        Data Anomaly Detection{" "}
        <span className="text-[9.5px] font-medium normal-case tracking-normal text-ink-400">
          (30 Hari Terakhir)
        </span>
      </h3>

      <div className="flex min-h-0 flex-1 items-center">
        <DonutChart
          data={anomaliData}
          size={112}
          thickness={20}
          centerValue={`${totalAnomali}`}
          centerCaption="Anomali"
          valueFormatter={(v) => `${v} kasus`}
          onHover={setActive}
        />

        <div className="ml-2 flex min-w-0 flex-1 flex-col gap-[7px]">
          {anomaliData.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-2 whitespace-nowrap transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.35 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="text-[9.5px] text-ink-700">{d.name}</span>
              <span className="ml-auto text-[9.5px] font-semibold tabular-nums text-ink-900">
                {d.value}
              </span>
              <span className="w-[38px] text-right text-[9px] tabular-nums text-ink-500">
                ({d.pct})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* strip insiden harian 30 hari */}
      <div className="mt-1 border-t border-[#f0f3f6] pt-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold text-ink-500">Insiden per Hari</span>
          <span className="text-[9px] text-ink-500">30 hari terakhir</span>
        </div>
        <div className="mt-1 flex h-[24px] items-end gap-[2px]">
          {anomaliHarian.map((v, i) => (
            <span
              key={i}
              className="anim-fade flex-1 rounded-t-[1.5px]"
              title={`H-${anomaliHarian.length - i}: ${v} insiden`}
              style={
                {
                  height: `${(v / MAX_HARIAN) * 100}%`,
                  background: warnaInsiden(v),
                  "--d": `${i * 18}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <button className="link-more mt-1.5 flex items-center gap-1">
        Lihat anomaly detail <ArrowRight size={11} />
      </button>
    </div>
  );
}
