"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { rainfallAnomaly, type RainfallAnomaly as RainfallRow } from "@/lib/risk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import type { SubholdingId } from "@/lib/subholding";

/**
 * Pemetaan komoditas → subholding untuk baris regional: Regional 1–6 adalah
 * kebun sawit (PalmCo), sedangkan Regional 7 ditandai "Jawa (tebu)" pada data
 * sehingga masuk cakupan SugarCo.
 */
const OWNER_BY_REGIONAL: Record<string, SubholdingId> = { "Regional 7": "sugarco" };
const ownerOf = (regional: string): SubholdingId => OWNER_BY_REGIONAL[regional] ?? "palmco";

const STATUS_COLOR: Record<RainfallRow["status"], string> = {
  Normal: PALETTE.green,
  Waspada: PALETTE.amber,
  Defisit: PALETTE.red,
};

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: RainfallRow;
}

function StatusDot({ cx = 0, cy = 0, payload }: DotProps) {
  const color = STATUS_COLOR[payload?.status ?? "Normal"];
  return <circle cx={cx} cy={cy} r={3.4} fill={color} stroke="var(--surface)" strokeWidth={1.2} />;
}

const LEGEND: RainfallRow["status"][] = ["Normal", "Waspada", "Defisit"];

/** Anomali curah hujan 3 bulan terakhir vs normal, per regional operasional. */
export function RainfallAnomalyChart() {
  const { active, isFiltered, def } = useSubholding();
  const scoped = isFiltered
    ? rainfallAnomaly.filter((r) => ownerOf(r.regional) === active)
    : rainfallAnomaly;
  // SupportingCo (karet & teh) tidak punya pecahan regional pada data ini.
  const outOfScope = scoped.length === 0;
  const rows = outOfScope ? rainfallAnomaly : scoped;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Anomali Curah Hujan per Regional" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Pecahan regional curah hujan belum tersedia untuk ${def.label}`
          : isFiltered
            ? `Deviasi 3 Bulan Terakhir vs Normal — regional ${def.label}`
            : "Deviasi 3 Bulan Terakhir vs Normal — Ambang Merah ≤ -15%"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 12, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <ReferenceLine y={0} stroke={CHART_AXIS.axis} />
            <ReferenceLine
              y={-15}
              stroke={PALETTE.red}
              strokeDasharray="4 3"
              strokeWidth={1.1}
              label={{
                value: "Ambang -15%",
                position: "insideBottomRight",
                style: { fontSize: 8.5, fill: PALETTE.red, fontWeight: 700 },
              }}
            />
            <XAxis
              dataKey="regional"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: string) => v.replace("Regional ", "R")}
            />
            <YAxis
              domain={[-18, 2]}
              ticks={[-18, -12, -6, 0]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n, p) => [
                `${v}% — ${(p.payload as RainfallRow).status}`,
                (p.payload as RainfallRow).lokasi,
              ]}
            />
            <Line
              type="monotone"
              dataKey="anomaliPct"
              name="Anomali"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={<StatusDot />}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        {LEGEND.map((s) => (
          <span key={s} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: STATUS_COLOR[s] }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
