"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { plasmaSupply } from "@/lib/agro-data";
import { produksiBulanan } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

/** Pihak III 250 rb ton YTD, disebar mengikuti musim (jumlah = 250). */
const PIHAK_III_RB_TON = [48, 46, 50, 52, 54];

/**
 * Komposisi TBS diolah per sumber (rb ton): inti = total bulanan
 * (produksiBulanan, jt ton) - plasma - pihak III. Jumlah Jan–Mei = 4.420.
 */
const komposisi = plasmaSupply.map((p, i) => {
  const total = (produksiBulanan[i].tbs2026 ?? 0) * 1000;
  const pihakIII = PIHAK_III_RB_TON[i];
  return {
    bulan: p.bulan,
    inti: Math.round(total - p.tbsRbTon - pihakIII),
    plasma: p.tbsRbTon,
    pihakIII,
  };
});

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function IntiVsPlasmaChart() {
  // Domain: komposisi TBS masuk PKS (inti/plasma/pihak III) → milik PalmCo.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "TBS");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Komposisi TBS: Inti vs Plasma" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        TBS Diolah per Sumber, Jan–Mei 2026 (Rb Ton) — Plasma 13,3% dari Total
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={komposisi} margin={{ top: 6, right: 8, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="pl-inti-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.5" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="pl-plasma-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.55" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.18" />
              </linearGradient>
              <linearGradient id="pl-p3-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.slate} stopOpacity="0.55" />
                <stop offset="100%" stopColor={PALETTE.slate} stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 1100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${ribuan(v)} rb ton`, name]}
              itemSorter={() => 0}
            />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, paddingTop: 2 }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="inti"
              name="Kebun Inti"
              stackId="tbs"
              stroke={PALETTE.green}
              strokeWidth={1.5}
              fill="url(#pl-inti-fill)"
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="plasma"
              name="Plasma"
              stackId="tbs"
              stroke={PALETTE.blue}
              strokeWidth={1.5}
              fill="url(#pl-plasma-fill)"
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="pihakIII"
              name="Pihak III"
              stackId="tbs"
              stroke={PALETTE.slate}
              strokeWidth={1.5}
              fill="url(#pl-p3-fill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      )}
    </div>
  );
}
