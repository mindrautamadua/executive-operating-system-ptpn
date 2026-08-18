"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fundingByTheme } from "@/lib/spi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} T`;

const data = fundingByTheme.map((r) => ({
  ...r,
  short: r.theme.replace("Operational Excellence", "Ops Excellence").replace(" & Dekarbonisasi", ""),
}));

/** Kebutuhan investasi vs alokasi disetujui per tema RJPP. */
export function InitiativeFunding() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Pendanaan Portofolio" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kebutuhan Rp 21,8 T vs Alokasi Rp 14,9 T per Tema — Gap Rp 6,9 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 14, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [rp(v), name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={18}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false}
              dataKey="kebutuhanRpT"
              name="Kebutuhan"
              fill={PALETTE.slate}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
            <Bar isAnimationActive={false}
              dataKey="alokasiRpT"
              name="Alokasi Disetujui"
              fill={PALETTE.green}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Gap terbesar: Hilirisasi Rp 2,1 T dan Swasembada Gula Rp 2,4 T.
      </p>
    </div>
  );
}
