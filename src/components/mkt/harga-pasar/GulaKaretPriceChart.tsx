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
import { gulaKaretSeries } from "@/lib/harga-outlook-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}/kg`;

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: color }} />
      <span className="text-[9px] text-ink-500">{label}</span>
    </span>
  );
}

function MiniLine({
  title,
  series,
  dim = false,
}: {
  title: string;
  series: { key: string; name: string; color: string; dash?: string }[];
  /** Redupkan seri di luar cakupan subholding aktif (chart tetap utuh). */
  dim?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col" style={{ opacity: dim ? 0.25 : 1 }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold text-ink-700">{title}</span>
        <div className="flex shrink-0 items-center gap-2">
          {series.map((s) => (
            <LegendDot key={s.key} color={s.color} label={s.name} />
          ))}
        </div>
      </div>
      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gulaKaretSeries} margin={{ top: 6, right: 8, bottom: 0, left: -6 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")}rb`}
              width={34}
            />
            <Tooltip formatter={(v: number) => rp(v)} contentStyle={CHART_TOOLTIP_STYLE} />
            {series.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="linear"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={1.7}
                strokeDasharray={s.dash}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function GulaKaretPriceChart() {
  // Gula → SugarCo, karet → SupportingCo; keduanya di luar cakupan PalmCo.
  const { active, def } = useSubholding();
  const gulaScope = inScope(active, "Gula");
  const karetScope = inScope(active, "Karet");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Harga Gula & Karet 12 Bulan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Lelang Gula vs HAP · Karet SICOM vs Domestik SIR-20 (Rp/kg, Jun 2025 – Mei 2026)
      </p>

      {!gulaScope && !karetScope && <ScopeEmpty label={def.fullLabel} />}

      {(gulaScope || karetScope) && (
      <div className="mt-1.5 flex min-h-0 flex-1 gap-5">
        <MiniLine
          title="Gula"
          dim={!gulaScope}
          series={[
            { key: "gulaLelang", name: "Lelang", color: PALETTE.amber },
            { key: "gulaHap", name: "HAP", color: PALETTE.slate, dash: "4 3" },
          ]}
        />
        <MiniLine
          title="Karet"
          dim={!karetScope}
          series={[
            { key: "karetSicom", name: "SICOM", color: PALETTE.teal },
            { key: "karetDomestik", name: "Domestik", color: PALETTE.navy, dash: "4 3" },
          ]}
        />
      </div>
      )}
    </div>
  );
}
