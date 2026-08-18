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
import { initiativeByTheme } from "@/lib/spi-data";
import { STATUS_COLOR, initiatives } from "@/lib/stg-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const short = (theme: string) =>
  theme.replace("Operational Excellence", "Ops Excellence").replace(" & Dekarbonisasi", "");

/** Distribusi status 28 inisiatif pada 5 tema RJPP. */
export function InitiativeByTheme() {
  const { active } = useSubholding();
  // `owner` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding register.
  const rows = filterBySubholding(initiatives, active, (i) => i.owner);
  const data = initiativeByTheme.map((r) => {
    const ofTheme = rows.filter((i) => i.theme === r.theme);
    return {
      theme: r.theme,
      onTrack: ofTheme.filter((i) => i.status === "On Track").length,
      atRisk: ofTheme.filter((i) => i.status === "At Risk").length,
      offTrack: ofTheme.filter((i) => i.status === "Off Track").length,
      short: short(r.theme),
    };
  });
  const total = rows.length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Inisiatif per Tema" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi Status Eksekusi per Tema RJPP · {total} Inisiatif
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 14, bottom: 0, left: -22 }}>
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
              width={30}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} inisiatif`, name]}
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
              dataKey="onTrack"
              name="On Track"
              stackId="s"
              fill={STATUS_COLOR["On Track"]}
              barSize={30}
            />
            <Bar isAnimationActive={false} dataKey="atRisk" name="At Risk" stackId="s" fill={STATUS_COLOR["At Risk"]} />
            <Bar isAnimationActive={false}
              dataKey="offTrack"
              name="Off Track"
              stackId="s"
              fill={STATUS_COLOR["Off Track"]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Swasembada Gula: hanya 1 dari 5 inisiatif on track — konsentrasi risiko tertinggi.
      </p>
    </div>
  );
}
