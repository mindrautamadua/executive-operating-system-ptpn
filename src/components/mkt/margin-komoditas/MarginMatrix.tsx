"use client";

import {
  CartesianGrid,
  Cell,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { marginMatrix, type MarginMatrixRow } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

/** Warna entitas konsisten dengan revenueByKomoditas (pemasaran-data). */
const COLORS: Record<string, string> = {
  CPO: PALETTE.green,
  "PK & PKO": PALETTE.teal,
  Gula: PALETTE.amber,
  Tetes: PALETTE.pink,
  Karet: PALETTE.navy,
  Teh: PALETTE.purple,
  "Produk Hilir": PALETTE.blue,
};

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/**
 * Matriks volume × margin per komoditas. Komoditas menentukan pemilik
 * subholding: CPO/PK & PKO → PalmCo, gula & tetes → SugarCo, karet & teh →
 * SupportingCo; produk hilir tidak terikat satu subholding sehingga tetap
 * tampil. Baris di luar cakupan disaring keluar dari scatter dan legenda.
 */
export function MarginMatrix() {
  const { active } = useSubholding();
  const rows = filterBySubholding(marginMatrix, active, (r) => commodityScope(r.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Margin Matrix: Volume × Margin" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sumbu-X volume (rb ton, skala log) · sumbu-Y margin bruto · ukuran bubble = nilai penjualan
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 14, bottom: 6, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="volumeRbTon"
              scale="log"
              domain={[8, 1200]}
              ticks={[10, 30, 100, 300, 1000]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            >
              <Label
                value="Volume (rb ton)"
                position="insideBottom"
                offset={-4}
                style={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="marginPct"
              domain={[-10, 50]}
              ticks={[-10, 0, 10, 20, 30, 40, 50]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <ZAxis type="number" dataKey="nilaiRpT" range={[70, 900]} />
            <ReferenceLine y={0} stroke={PALETTE.red} strokeDasharray="4 3" strokeWidth={1} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "volumeRbTon"
                  ? [`${v.toLocaleString("id-ID")} rb ton`, "Volume"]
                  : name === "marginPct"
                    ? [pct(v), "Margin Bruto"]
                    : [
                        `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`,
                        "Nilai Penjualan",
                      ]
              }
              labelFormatter={() => ""}
            />
            <Scatter isAnimationActive={false} data={rows} name="Komoditas">
              {rows.map((d: MarginMatrixRow) => (
                <Cell key={d.komoditas} fill={COLORS[d.komoditas] ?? PALETTE.slate} fillOpacity={0.75} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        {rows.map((d) => (
          <span key={d.komoditas} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: COLORS[d.komoditas] ?? PALETTE.slate }}
            />
            {d.komoditas}
          </span>
        ))}
      </div>
    </div>
  );
}
