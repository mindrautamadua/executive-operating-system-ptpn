"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { CountUp } from "./CountUp";

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

/**
 * Donut standar modul SDM: ukuran, ketebalan, tooltip, dan label tengah
 * seragam; hover slice sedikit mengembang + legend dapat disinkronkan
 * lewat onHover.
 */
export function DonutChart({
  data,
  size = 158,
  thickness = 26,
  centerValue,
  centerCaption,
  valueFormatter = (v: number) => v.toLocaleString("id-ID"),
  onHover,
  sliceOpacity,
  className = "",
}: {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerValue?: string;
  centerCaption?: string;
  valueFormatter?: (v: number) => string;
  onHover?: (index: number | null) => void;
  /**
   * Opasitas dasar per slice, di luar efek hover (mis. meredupkan slice di luar
   * subholding aktif). Default 1 untuk semua slice sehingga perilaku tidak berubah.
   */
  sliceOpacity?: (index: number) => number;
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const outer = size / 2 - 4;
  const inner = outer - thickness;
  const total = data.reduce((s, d) => s + d.value, 0);
  const center =
    centerValue ?? total.toLocaleString("id-ID");

  const setHover = (i: number | null) => {
    setActive(i);
    onHover?.(i);
  };

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie isAnimationActive={false}
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={inner}
            outerRadius={outer}
            paddingAngle={2}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
            animationBegin={200}
            animationDuration={700}
            activeIndex={active ?? undefined}
            activeShape={(props: { outerRadius?: number }) => (
              <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 4} />
            )}
            onMouseEnter={(_, i) => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {data.map((d, i) => (
              <Cell
                key={d.name}
                fill={d.color}
                opacity={(active === null || active === i ? 1 : 0.35) * (sliceOpacity?.(i) ?? 1)}
                style={{ transition: "opacity .2s" }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v: number, name: string) => [valueFormatter(v), name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[19px] font-bold leading-none text-ink-900">
          <CountUp value={center} />
        </span>
        {centerCaption && (
          <span className="mt-1 text-[9.5px] font-medium text-ink-400">{centerCaption}</span>
        )}
      </div>
    </div>
  );
}
