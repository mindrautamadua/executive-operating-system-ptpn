"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { esgRating } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { Delta } from "@/components/ui/Delta";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const first = esgRating.trend[0].score;
const selisih = esgRating.score - first;

export function EsgRatingCard() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead title="Rating ESG Eksternal" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">{esgRating.agency}</p>

      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div>
          <div className="whitespace-nowrap text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            {angka(esgRating.score)}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded bg-[#fdf3e0] px-1.5 py-[2px] text-[9px] font-extrabold text-[#d98b06]">
              {esgRating.band}
            </span>
            <Delta
              value={angka(selisih)}
              trend="down"
              tone={esgRating.trendTone}
              size={9.5}
            />
          </div>
        </div>
        <p className="max-w-[135px] text-right text-[9px] leading-snug text-ink-500">
          Skor risiko — makin rendah makin baik. Ambang Low Risk: 20,0.
        </p>
      </div>

      <div className="mt-2.5 h-[86px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={esgRating.trend} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[24, 33]}
              ticks={[24, 27, 30, 33]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [angka(v), "ESG Risk Score"]}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="score"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
        Membaik 4,8 poin sejak 2023; pilar sosial (cakupan HRDD 84,6%) menjadi penahan utama menuju
        band Low Risk.
      </p>
    </div>
  );
}
