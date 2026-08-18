"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

/** Bingkai kartu chart seragam untuk halaman detail Talent Intelligence. */
function ChartCard({
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

const dec = (v: number) => v.toString().replace(".", ",");

/* ── Tren garis ───────────────────────────────────────────────────── */

/** Chart garis multi-seri; dipakai untuk tren komposisi, coverage, dan risiko. */
export function TiTrendCard({
  title,
  subtitle,
  data,
  series,
  domain,
  unit = "",
  reference,
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  data: Record<string, string | number>[];
  series: ChartSeries[];
  domain?: [number, number];
  unit?: string;
  /** Garis acuan horizontal opsional, mis. target. */
  reference?: { value: number; color: string };
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} footer={footer}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -22 }}>
          <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: CHART_AXIS.axis }}
            tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
          />
          <YAxis
            domain={domain ?? ["auto", "auto"]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            unit={unit}
          />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v: number, n: string) => [
              `${dec(v)}${unit}`,
              series.find((s) => s.key === n)?.label ?? n,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={18}
            iconSize={7}
            wrapperStyle={{ fontSize: 8.5 }}
            formatter={(v: string) => series.find((s) => s.key === v)?.label ?? v}
          />
          {reference && (
            <ReferenceLine y={reference.value} stroke={reference.color} strokeDasharray="3 3" />
          )}
          {series.map((s) => (
            <Line
              key={s.key}
              type="linear"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={1.5}
              dot={{ r: 2, fill: s.color, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ── Batang bertumpuk ─────────────────────────────────────────────── */

/** Chart batang bertumpuk; dipakai untuk komposisi bulanan atau per kategori. */
export function TiStackedBarCard({
  title,
  subtitle,
  data,
  series,
  unit = "",
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  data: Record<string, string | number>[];
  series: ChartSeries[];
  unit?: string;
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} footer={footer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -22 }} barCategoryGap="28%">
          <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: CHART_AXIS.axis }}
            tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            unit={unit}
          />
          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.12)" }}
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v: number, n: string) => [
              `${dec(v)}${unit}`,
              series.find((s) => s.key === n)?.label ?? n,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={18}
            iconSize={7}
            wrapperStyle={{ fontSize: 8.5 }}
            formatter={(v: string) => series.find((s) => s.key === v)?.label ?? v}
          />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              stackId="a"
              fill={s.color}
              radius={[0, 0, 0, 0]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ── Donut ────────────────────────────────────────────────────────── */

/** Donut komposisi dengan angka total di tengah dan legenda di kanan. */
export function TiDonutCard({
  title,
  subtitle,
  data,
  centerValue,
  centerLabel,
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  data: { name: string; value: number; pctLabel: string; color: string }[];
  centerValue: string;
  centerLabel: string;
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} footer={footer}>
      <div className="flex h-full items-center gap-2">
        <div className="relative h-full min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v: number, n: string) => [`${v} orang`, n]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[19px] font-extrabold leading-none text-ink-900">
              {centerValue}
            </span>
            <span className="mt-[3px] text-[9px] font-semibold text-ink-500">{centerLabel}</span>
          </div>
        </div>

        <ul className="flex w-[104px] shrink-0 flex-col gap-2">
          {data.map((d) => (
            <li key={d.name}>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                  style={{ background: d.color }}
                />
                <span className="truncate text-[8.5px] font-semibold text-ink-700">{d.name}</span>
              </span>
              <span className="ml-[13px] text-[9px] font-extrabold text-ink-900">
                {d.value}
                <span className="ml-1 text-[9px] font-medium text-ink-500">{d.pctLabel}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}

/* ── Radar kapabilitas ────────────────────────────────────────────── */

/** Radar skor kapabilitas versus benchmark industri. */
export function TiRadarCard({
  title,
  subtitle,
  data,
  delay = 0,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  data: { label: string; score: number; benchmark: number }[];
  delay?: number;
  footer?: ReactNode;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} footer={footer}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 6, right: 22, bottom: 0, left: 22 }}>
          <PolarGrid stroke={CHART_AXIS.grid} />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }} />
          <PolarRadiusAxis domain={[3, 5]} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v: number, n: string) => [
              dec(v),
              n === "score" ? "PTPN Group" : "Benchmark",
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={16}
            iconSize={7}
            wrapperStyle={{ fontSize: 8.5 }}
            formatter={(v: string) => (v === "score" ? "PTPN Group" : "Benchmark industri")}
          />
          <Radar
            dataKey="benchmark"
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.12}
            strokeWidth={1.2}
            strokeDasharray="3 3"
            isAnimationActive={false}
          />
          <Radar
            dataKey="score"
            stroke="#1a9c5b"
            fill="#1a9c5b"
            fillOpacity={0.22}
            strokeWidth={1.6}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
