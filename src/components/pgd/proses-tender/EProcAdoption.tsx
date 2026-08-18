"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eProcAdoption } from "@/lib/pgd-data-detail";
import { PGD_STATUS_COLOR } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const RATA = 84;

export function EProcAdoption() {
  const { active, isFiltered, def } = useSubholding();
  // `unit` menyebut subholding pemiliknya (PalmCo Regional n / SGN / PTPN I).
  const dim = (unit: string) => (!isFiltered || toSubholdingId(unit) === active ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Adopsi e-Procurement per Unit" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `% Nilai Transaksi via e-Proc · unit ${def.label} disorot · Rata-rata Grup ${RATA}%`
          : `% Nilai Transaksi via e-Proc · Rata-rata Grup ${RATA}% · Target 95%`}
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={eProcAdoption} margin={{ top: 18, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="unit"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number, n: string) => [`${v}%`, n]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconSize={7}
              wrapperStyle={{ fontSize: 8, paddingBottom: 2 }}
            />
            <ReferenceLine
              y={RATA}
              stroke={PALETTE.navy}
              strokeDasharray="4 3"
              label={{
                value: `Rata-rata ${RATA}%`,
                position: "insideTopRight",
                fontSize: 8,
                fill: PALETTE.navy,
              }}
            />
            <Bar isAnimationActive={false} dataKey="eprocPct" name="Cakupan e-Proc" radius={[4, 4, 0, 0]} barSize={22}>
              {eProcAdoption.map((r) => (
                <Cell key={r.unit} fill={PGD_STATUS_COLOR[r.status]} fillOpacity={dim(r.unit)} />
              ))}
              <LabelList
                dataKey="eprocPct"
                position="top"
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Bar isAnimationActive={false}
              dataKey="fullDigitalPct"
              name="Full Digital"
              fill={PALETTE.slate}
              radius={[4, 4, 0, 0]}
              barSize={10}
            >
              {eProcAdoption.map((r) => (
                <Cell key={r.unit} fillOpacity={dim(r.unit)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        PalmCo Regional 5 terendah (80% e-Proc · 58% full digital) dan sekaligus mencatat maverick
        spend tertinggi 10,6%.
      </p>
    </div>
  );
}
