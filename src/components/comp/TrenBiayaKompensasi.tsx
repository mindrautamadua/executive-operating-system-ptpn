"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trenBiaya } from "@/lib/comp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function TrenBiayaKompensasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>Tren Biaya Kompensasi</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">Perbandingan 6 Bulan Terakhir</p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1.5 text-[9px] text-ink-500">(Rp Miliar)</div>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trenBiaya} margin={{ top: 18, right: 20, bottom: 0, left: -6 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain dirapatkan (1.800–2.600) supaya kenaikan 2.020→2.480 terbaca;
               sumbu terpotong hanya aman untuk line, bukan area fill */}
            <YAxis
              domain={[1800, 2600]}
              ticks={[1800, 2000, 2200, 2400, 2600]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
              width={42}
            />
            <Tooltip
              formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")} M`, "Biaya Kompensasi"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.blue, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            >
              <LabelList
                dataKey="label"
                position="top"
                offset={9}
                style={{ fontSize: 9, fill: "var(--text-3)", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat analitik tren <ArrowRight size={11} />
      </button>
    </div>
  );
}
