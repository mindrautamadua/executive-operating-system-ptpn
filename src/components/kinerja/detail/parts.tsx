"use client";

import type { ReactNode } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const dec = (v: number) => v.toFixed(1).replace(".", ",");

/** Bingkai kartu seragam untuk halaman detail Kinerja Karyawan. */
export function KinerjaChartCard({
  title,
  subtitle,
  delay = 0,
  footer,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  delay?: number;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="card anim-rise flex h-full min-w-0 flex-col px-4 pb-3 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}
      <div className="mt-1 min-h-0 w-full flex-1">{children}</div>
      {footer && (
        <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
          {footer}
        </p>
      )}
    </div>
  );
}

/** Radar skor dimensi kuartal berjalan versus kuartal sebelumnya (skala 0–100). */
export function DimensiRadarCard({
  title,
  subtitle,
  data,
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  data: { label: string; kini: number; lalu: number }[];
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <KinerjaChartCard title={title} subtitle={subtitle} delay={delay} footer={footer}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 6, right: 26, bottom: 0, left: 26 }}>
          <PolarGrid stroke={CHART_AXIS.grid} />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 8, fill: CHART_AXIS.tick }} />
          <PolarRadiusAxis domain={[70, 92]} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v: number, n: string) => [dec(v), n === "kini" ? "Q2 2026" : "Q1 2026"]}
          />
          <Legend
            verticalAlign="bottom"
            height={16}
            iconSize={7}
            wrapperStyle={{ fontSize: 8 }}
            formatter={(v: string) => (v === "kini" ? "Q2 2026" : "Q1 2026")}
          />
          <Radar
            dataKey="lalu"
            stroke={PALETTE.slate}
            fill={PALETTE.slate}
            fillOpacity={0.12}
            strokeWidth={1.2}
            strokeDasharray="3 3"
            isAnimationActive={false}
          />
          <Radar
            dataKey="kini"
            stroke={PALETTE.green}
            fill={PALETTE.green}
            fillOpacity={0.22}
            strokeWidth={1.6}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </KinerjaChartCard>
  );
}

/** Baris komposisi kategori kinerja bertumpuk penuh 100% per baris. */
export function KategoriStackBars({
  title,
  subtitle,
  rows,
  legend,
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  rows: { label: string; seg: number[]; valueLabel: string }[];
  legend: { label: string; color: string }[];
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <div
      className="card anim-rise flex h-full min-w-0 flex-col px-4 pb-3 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}

      <div className="mt-2 flex items-center justify-center gap-3">
        {legend.map((l) => (
          <span key={l.label} className="flex items-center gap-1 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {rows.map((r, ri) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-[104px] shrink-0 truncate text-[9px] text-ink-700" title={r.label}>
              {r.label}
            </span>
            <div
              className="anim-grow-x flex h-[15px] flex-1 overflow-hidden rounded-[3px]"
              style={{ "--d": `${ri * 70}ms` } as React.CSSProperties}
            >
              {r.seg.map((s, i) => (
                <span
                  key={i}
                  className="flex items-center justify-center text-[8.5px] font-bold text-white"
                  style={{ width: `${s}%`, background: legend[i].color }}
                  title={`${legend[i].label}: ${s}%`}
                >
                  {s >= 10 ? `${s}%` : ""}
                </span>
              ))}
            </div>
            <span className="w-[42px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {r.valueLabel}
            </span>
          </div>
        ))}
      </div>

      {footer && (
        <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
          {footer}
        </p>
      )}
    </div>
  );
}
