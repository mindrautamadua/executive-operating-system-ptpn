"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { marginWaterfall, type MarginWaterfallRow } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

interface WfDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
}

const rp = (v: number) =>
  `${v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("id-ID")}`;

/** Susun langkah waterfall ASP → −HPP → −Biaya Jual → Margin Bersih. */
function buildSteps(row: MarginWaterfallRow): WfDatum[] {
  const afterHpp = row.aspRpKg - row.hppRpKg;
  const afterBiaya = afterHpp - row.biayaJualRpKg;
  return [
    { name: "ASP", base: 0, delta: row.aspRpKg, fill: PALETTE.blueSoft, label: rp(row.aspRpKg) },
    { name: "HPP", base: afterHpp, delta: row.hppRpKg, fill: PALETTE.red, label: `−${rp(row.hppRpKg)}` },
    {
      name: "Biaya Jual",
      base: afterBiaya,
      delta: row.biayaJualRpKg,
      fill: PALETTE.amber,
      label: `−${rp(row.biayaJualRpKg)}`,
    },
    {
      name: "Margin Bersih",
      base: Math.min(row.marginBersihRpKg, 0),
      delta: Math.abs(row.marginBersihRpKg),
      fill: row.marginBersihRpKg >= 0 ? PALETTE.green : PALETTE.red,
      label: rp(row.marginBersihRpKg),
    },
  ];
}

/**
 * Waterfall margin per komoditas. Komoditas menentukan pemilik subholding:
 * CPO → PalmCo, gula → SugarCo, karet & teh → SupportingCo. Saat filter aktif
 * hanya komoditas milik subholding tersebut yang bisa dipilih.
 */
export function MarginWaterfall() {
  const { active, def } = useSubholding();
  const [selected, setSelected] = useState(marginWaterfall[0].komoditas);

  const rows = filterBySubholding(marginWaterfall, active, (r) => commodityScope(r.komoditas));
  const row = rows.find((r) => r.komoditas === selected) ?? rows[0];

  if (!row) {
    return (
      <div
        className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
        style={{ "--d": "60ms" } as React.CSSProperties}
      >
        <SectionHead title="Margin Waterfall per Komoditas" />
        <ScopeEmpty label={def.fullLabel} />
      </div>
    );
  }

  const data = buildSteps(row);
  const yMin = row.marginBersihRpKg < 0 ? -2000 : 0;
  const yMax = Math.ceil(row.aspRpKg / 4000) * 4000;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Margin Waterfall per Komoditas" className="min-w-0 flex-1" />
        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#eef2f6] p-[3px]">
          {rows.map((r) => (
            <button
              key={r.komoditas}
              onClick={() => setSelected(r.komoditas)}
              className={`rounded-md px-2 py-[3px] text-[8.5px] font-bold transition-colors ${
                r.komoditas === row.komoditas
                  ? "bg-white text-ptpn-green shadow-card"
                  : "text-ink-500 hover:text-ink-700"
              }`}
            >
              {r.komoditas}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        {row.komoditas}: ASP {rp(row.aspRpKg)} − HPP {rp(row.hppRpKg)} − Biaya Jual{" "}
        {rp(row.biayaJualRpKg)} = Margin Bersih {rp(row.marginBersihRpKg)} Rp/kg (bruto{" "}
        {row.marginBrutoPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -10 }} barCategoryGap="26%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[yMin, yMax]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")} rb`}
              width={44}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { dataKey?: unknown; payload?: WfDatum }) =>
                item?.dataKey === "base"
                  ? [null, null]
                  : [`Rp ${item.payload?.label ?? v}/kg`, "Nilai"]
              }
            />
            {yMin < 0 && <ReferenceLine y={0} stroke={CHART_AXIS.grid} />}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
