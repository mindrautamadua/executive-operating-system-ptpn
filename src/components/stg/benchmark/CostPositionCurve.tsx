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
import { costCurve, costCurveRef } from "@/lib/sbm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const SHORT: Record<string, string> = {
  "Dharma Satya (DSN)": "DSNG",
  "First Resources": "First Res.",
  "Astra Agro Lestari": "AALI",
  "PTPN Group": "PTPN",
  "Sampoerna Agro": "SGRO",
  "SMART (upstream)": "SMART",
};

const DATA = costCurve.map((p) => ({
  name: SHORT[p.producer] ?? p.producer,
  producer: p.producer,
  hpp: p.hppRpKg,
  isPtpn: p.isPtpn ?? false,
}));

const ribuan = (v: number) => v.toLocaleString("id-ID");

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: { isPtpn?: boolean };
  /** Opasitas marker PTPN saat cakupan aktif bukan PalmCo. */
  ptpnOpacity?: number;
}

/** Marker PTPN dibedakan agar posisi biaya langsung terbaca pada kurva. */
function CurveDot({ cx, cy, payload, ptpnOpacity = 1 }: DotProps) {
  if (cx == null || cy == null) return null;
  const ptpn = payload?.isPtpn ?? false;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={ptpn ? 5 : 2.8}
      fill={ptpn ? PALETTE.red : PALETTE.blueSoft}
      fillOpacity={ptpn ? ptpnOpacity : 1}
      stroke={ptpn ? "#ffffff" : "none"}
      strokeWidth={ptpn ? 1.6 : 0}
    />
  );
}

/**
 * Kurva posisi biaya HPP CPO industri dengan penanda posisi PTPN.
 * Titik PTPN adalah HPP CPO — wilayah PalmCo (sawit). Produsen pembanding
 * eksternal tidak pernah disaring: menghapusnya merusak kurva industri.
 */
export function CostPositionCurve() {
  const { active, isFiltered } = useSubholding();
  const ptpnOpacity = !isFiltered || active === "palmco" ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Kurva Posisi Biaya (HPP CPO)" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        HPP CPO Rp/kg Terurut · PTPN Rp 8.950/kg (PalmCo) · Median Industri Rp{" "}
        {ribuan(costCurveRef.medianRpKg)}/kg
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 16, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[7000, 10000]}
              ticks={[7000, 7750, 8500, 9250, 10000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")} rb`}
              width={44}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { producer?: string } }) => [
                `Rp ${ribuan(v)}/kg`,
                item?.payload?.producer ?? "HPP CPO",
              ]}
            />
            <ReferenceLine
              y={costCurveRef.medianRpKg}
              stroke={PALETTE.slate}
              strokeDasharray="3 3"
              strokeWidth={1.2}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="hpp"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={<CurveDot ptpnOpacity={ptpnOpacity} />}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
