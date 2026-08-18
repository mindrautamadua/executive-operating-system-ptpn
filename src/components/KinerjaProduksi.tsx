"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, ChevronDown } from "lucide-react";
import { produksiKpi, produksiSeries } from "@/lib/data";
import { Delta } from "./ui/Delta";
import { DetailLink } from "./DetailLink";

const SERIES = [
  { key: "CPO", color: "#2f9bf5" },
  { key: "PK", color: "#7ed957" },
  { key: "Karet", color: "#f5a524" },
  { key: "Gula", color: "#8b5cf6" },
];

export function KinerjaProduksi() {
  return (
    <div className="card flex h-full flex-col px-3.5 pb-2.5 pt-3">
      <div className="flex items-center justify-between gap-1">
        <h3 className="card-title whitespace-nowrap">KINERJA PRODUKSI</h3>
        <div className="flex shrink-0 items-center gap-2">
          <DetailLink href="/produksi-operasi" />
          <button className="select-chip whitespace-nowrap">
            YTD 2026 <ChevronDown size={11} />
          </button>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-1">
        {produksiKpi.map((k) => (
          <div key={k.label}>
            <div className="text-[8.5px] font-semibold tracking-[0.05em] text-ink-500">
              {k.label}
            </div>
            <div className="mt-[2px] text-[14px] font-extrabold leading-none text-ink-900">
              {k.value}
            </div>
            <div className="mt-[2px] text-[9px] text-ink-500">{k.unit}</div>
            <Delta value={k.delta} trend={k.trend} size={9} className="mt-[3px]" />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1 text-[8.5px] text-ink-500">
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: s.color }} />
            {s.key}
          </span>
        ))}
      </div>

      <div className="mt-0.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={produksiSeries} margin={{ top: 4, right: 4, bottom: 0, left: -26 }}>
            <CartesianGrid stroke="#f2f5f8" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "#e8edf2" }}
              tick={{ fontSize: 8.5, fill: "#98a4b2" }}
              interval={0}
            />
            <YAxis
              domain={[0, 3]}
              ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: "#98a4b2" }}
              tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
              width={40}
            />
            <Tooltip
              contentStyle={{
                fontSize: 10,
                borderRadius: 8,
                border: "1px solid #e8edf2",
              }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.5}
                dot={{ r: 1.8, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#2f9bf5] hover:underline">
        Lihat detail produksi <ArrowRight size={11} />
      </button>
    </div>
  );
}
