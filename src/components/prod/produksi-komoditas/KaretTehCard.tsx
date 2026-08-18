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
import { karetTehSeries } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function Mini({
  label,
  dataKey,
  color,
  domain,
  ticks,
}: {
  label: string;
  dataKey: "karetRbTon" | "tehRbTon";
  color: string;
  domain: [number, number];
  ticks: number[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <span className="text-[8.5px] font-bold text-ink-700">{label}</span>
      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={karetTehSeries} margin={{ top: 8, right: 8, bottom: 0, left: -26 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={domain}
              ticks={ticks}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => num(v)}
            />
            <Tooltip
              formatter={(v: number) => [`${num(v)} rb ton`, label]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.8}
              dot={{ r: 2.2, fill: color, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function KaretTehCard() {
  const { active, def } = useSubholding();
  // Karet & teh -> seluruh kartu milik SupportingCo (kedua seri tetap tampil).
  const milikScope = inScope(active, "Karet teh");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Karet & Teh Bulanan" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#karet-teh" />
      <p className="mt-[3px] text-[9px] text-ink-500">Produksi Jan–Mei 2026 (rb ton)</p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <div className="mt-1 flex min-h-0 flex-1 flex-col gap-1">
        <Mini
          label="Karet Kering · YTD 47,6"
          dataKey="karetRbTon"
          color={PALETTE.pink}
          domain={[8.5, 10.5]}
          ticks={[8.5, 9.5, 10.5]}
        />
        <Mini
          label="Teh Kering · YTD 10,2"
          dataKey="tehRbTon"
          color={PALETTE.green}
          domain={[1.8, 2.2]}
          ticks={[1.8, 2.0, 2.2]}
        />
      </div>
      )}
    </div>
  );
}
