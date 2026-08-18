"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { marginUplift } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const COLORS = [PALETTE.slate, PALETTE.blue, PALETTE.green];

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

const DATA = marginUplift.map((m) => ({
  ...m,
  label:
    m.upliftRpKg === 0 ? rp(m.marginRpKg) : `${rp(m.marginRpKg)} (+${m.upliftRpKg.toLocaleString("id-ID")})`,
}));

/** Uplift margin terintegrasi per tahap rantai nilai (Rp/kg). */
export function MarginUpliftChart() {
  const { active, def } = useSubholding();
  // Seluruh tahap rantai ini bertumpu pada CPO kebun (CPO curah → RBD olein →
  // migor kemasan) = domain sawit → PalmCo.
  const luarCakupan = !inScope(active, "CPO sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Margin Uplift Rantai Nilai" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Margin Terintegrasi Rp/kg dari HPP Kebun Rp 8.950 · uplift vs CPO curah
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 18, right: 8, bottom: 0, left: -14 }} barCategoryGap="30%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahap"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 5500]}
              ticks={[0, 1500, 3000, 4500]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")} rb`}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number) => [`${rp(v)}/kg`, "Margin Terintegrasi"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="marginRpKg" radius={[3, 3, 0, 0]} maxBarSize={44}>
              {DATA.map((d, i) => (
                <Cell key={d.tahap} fill={COLORS[i]} />
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
      )}

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Konversi ke migor kemasan menambah margin +Rp 1.188/kg vs jual CPO curah.
      </p>
    </div>
  );
}
