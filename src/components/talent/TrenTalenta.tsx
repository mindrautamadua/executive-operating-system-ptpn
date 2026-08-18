"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trenTalenta } from "@/lib/talent-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { Delta } from "../ui/Delta";

const fmt = (n: number) => n.toLocaleString("id-ID");

export function TrenTalenta() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "420ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Tren Total Talenta Aktif</h3>
        <span className="flex shrink-0 items-center gap-2">
          <Link
            href="/talent-intelligence/tren-talenta"
            className="flex items-center gap-1 whitespace-nowrap text-[9px] font-semibold text-ptpn-green hover:underline"
          >
            Lihat Detail <ArrowRight size={10} />
          </Link>
          <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
            12 Bulan Terakhir <ChevronDown size={11} />
          </button>
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[20px] font-extrabold leading-none text-ink-900">3.742</span>
        <Delta value="6,8%" trend="up" size={10} />
      </div>
      <div className="mt-[4px] text-[9px] text-ink-500">vs Mei 2025: 3.504</div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trenTalenta} margin={{ top: 10, right: 10, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="tt-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.24" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain dirapatkan ke rentang data agar tren terbaca */}
            <YAxis
              domain={[3400, 3800]}
              ticks={[3400, 3500, 3600, 3700, 3800]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              width={36}
            />
            <Tooltip
              formatter={(v: number) => [fmt(v), "Talenta"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#tt-fill)"
              dot={{ r: 2.4, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1.5 rounded-md bg-[#f7f9fb] px-3 py-[7px] text-[9px] text-ink-500">
        Kenaikan signifikan terjadi pada program leadership &amp; akselerasi talenta kritis.
      </div>
    </div>
  );
}
