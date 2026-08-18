"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trenRekrutmen } from "@/lib/rekrutmen-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

/* skala sumbu Y mengikuti data: dibulatkan ke atas kelipatan 50 */
const yMax =
  Math.ceil(Math.max(...trenRekrutmen.flatMap((d) => [d.requisition, d.hire])) / 50) * 50;
const yTicks = Array.from({ length: yMax / 50 + 1 }, (_, i) => i * 50);

export function TrenRekrutmen() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Tren Rekrutmen</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trenRekrutmen} margin={{ top: 10, right: 14, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, yMax]}
              ticks={yTicks}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="top"
              align="left"
              height={18}
              iconType="plainline"
              iconSize={12}
              wrapperStyle={{ fontSize: 9, paddingLeft: 26 }}
            />
            <Line isAnimationActive={false}
              name="Requisition"
              type="linear"
              dataKey="requisition"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 3, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            />
            <Line isAnimationActive={false}
              name="Onboard"
              type="linear"
              dataKey="hire"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 3, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat analitik tren <ChevronRight size={11} />
      </button>
    </div>
  );
}
