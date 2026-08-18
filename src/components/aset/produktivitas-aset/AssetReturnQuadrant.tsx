"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  APD_ROA_AMBANG_PCT,
  APD_UTILISASI_AMBANG_PCT,
  assetReturnQuadrant,
  type AssetQuadrant,
} from "@/lib/apd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const QUADRAN_COLOR: Record<AssetQuadrant, string> = {
  Ekspansi: PALETTE.green,
  Optimalkan: PALETTE.blue,
  Perbaiki: PALETTE.amber,
  Restrukturisasi: PALETTE.red,
};

const QUADRAN_CHIP: Record<AssetQuadrant, string> = {
  Ekspansi: "bg-ptpn-greenLight text-ptpn-green",
  Optimalkan: "bg-[#e8f1fd] text-[#2f6fe4]",
  Perbaiki: "bg-[#fdf3e0] text-[#d98b06]",
  Restrukturisasi: "bg-[#fdecec] text-[#ef4444]",
};

const ORDER: AssetQuadrant[] = ["Ekspansi", "Optimalkan", "Perbaiki", "Restrukturisasi"];

const allData = assetReturnQuadrant.map((u) => ({
  ...u,
  short: u.unit
    .replace("PalmCo Regional ", "R")
    .replace("SGN — Klaster ", "PG ")
    .replace(/ \(.*\)/, ""),
}));

/** Kuadran ROA unit × utilisasi aset produktif; ukuran titik = nilai buku. */
export function AssetReturnQuadrant() {
  const { active, isFiltered, def } = useSubholding();
  // `unit` menyebut subholding pemiliknya (PalmCo Regional n / SGN — Klaster n /
  // PTPN I), jadi tabel titik & ringkasan kuadran ikut menyaring.
  const data = filterBySubholding(allData, active, (u) => u.unit);
  const nilaiTotalRpT = +data.reduce((s, r) => s + r.nilaiAsetRpT, 0).toFixed(1);

  const ringkasan = ORDER.map((q) => {
    const rows = data.filter((d) => d.kuadran === q);
    return {
      kuadran: q,
      unit: rows.length,
      nilaiRpT: +rows.reduce((s, r) => s + r.nilaiAsetRpT, 0).toFixed(1),
    };
  });

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kuadran Imbal Hasil Aset" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `ROA Unit (%) × Utilisasi Aset (%) · ${def.label} · ${data.length} Unit · Rp ${num(nilaiTotalRpT)} T Nilai Buku`
          : `ROA Unit (%) × Utilisasi Aset (%) · ${data.length} Unit · Rp ${num(nilaiTotalRpT)} T Nilai Buku`}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 12, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="utilisasiPct"
              domain={[58, 90]}
              ticks={[60, 68, 76, 84]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <YAxis
              type="number"
              dataKey="roaPct"
              domain={[-5, 10]}
              ticks={[-5, 0, 5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <ZAxis type="number" dataKey="nilaiAsetRpT" range={[30, 170]} />
            <ReferenceLine
              y={APD_ROA_AMBANG_PCT}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              x={APD_UTILISASI_AMBANG_PCT}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelFormatter={() => ""}
              formatter={(v: number, n: string) => {
                if (n === "utilisasiPct") return [`${num(v)}%`, "Utilisasi"];
                if (n === "roaPct") return [`${num(v)}%`, "ROA"];
                return [`Rp ${num(v)} T`, "Nilai Buku"];
              }}
            />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.unit} fill={QUADRAN_COLOR[d.kuadran]} fillOpacity={0.8} />
              ))}
              <LabelList
                dataKey="short"
                position="top"
                offset={4}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid shrink-0 grid-cols-4 gap-1.5">
        {ringkasan.map((r) => (
          <div key={r.kuadran} className="rounded-lg border border-[#eef2f6] px-1.5 py-[5px]">
            <span
              className={`inline-flex rounded px-1.5 py-[1px] text-[7.5px] font-extrabold ${QUADRAN_CHIP[r.kuadran]}`}
            >
              {r.kuadran}
            </span>
            <div className="mt-[3px] text-[8.5px] font-bold text-ink-900">
              {r.unit} unit · Rp {num(r.nilaiRpT)} T
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
