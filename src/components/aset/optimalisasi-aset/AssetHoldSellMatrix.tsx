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
  AOP_RETURN_AMBANG_PCT,
  AOP_STRATEGIS_AMBANG,
  holdSellMatrix,
  holdSellNote,
  type HoldSellQuadrant,
} from "@/lib/aop-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const rp = (v: number) => v.toLocaleString("id-ID");
const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const QUADRAN_COLOR: Record<HoldSellQuadrant, string> = {
  Hold: PALETTE.green,
  Optimize: PALETTE.blue,
  Divest: PALETTE.red,
  "Kaji Ulang": PALETTE.amber,
};

const QUADRAN_CHIP: Record<HoldSellQuadrant, string> = {
  Hold: "bg-ptpn-greenLight text-ptpn-green",
  Optimize: "bg-[#e8f1fd] text-[#2f6fe4]",
  Divest: "bg-[#fdecec] text-[#ef4444]",
  "Kaji Ulang": "bg-[#fdf3e0] text-[#d98b06]",
};

const ORDER: HoldSellQuadrant[] = ["Hold", "Optimize", "Kaji Ulang", "Divest"];

const SHORT: Record<string, string> = {
  "Kebun Sawit Menghasilkan (Regional 1–3)": "Sawit R1–3",
  "PKS & Fasilitas Hilir Sei Mangkei": "Hilir Sei Mangkei",
  "Kebun Sawit Regional 6–7": "Sawit R6–7",
  "PG Klaster Jatim Besar": "PG Jatim Besar",
  "PG Klaster Kecil (<3.300 TCD)": "PG Kecil",
  "Lahan Idle & Cadangan Belum Tertanam": "Lahan Idle",
  "Bangunan & Perumahan Non-Inti": "Bangunan Non-Inti",
  "Rumah Sakit & Layanan Sosial": "Layanan Sosial",
  "Kawasan Industri & Infrastruktur": "Kawasan Industri",
  "Kebun Karet & Teh PTPN I": "Karet & Teh",
};

const allData = holdSellMatrix.map((d) => ({
  ...d,
  short: SHORT[d.kelompokAset] ?? d.kelompokAset,
}));

/**
 * Pemetaan domain: kebun sawit & PKS/hilir milik PalmCo; klaster PG (gula)
 * milik SugarCo; kebun karet & teh PTPN I milik SupportingCo. Kelompok aset
 * lintas subholding (lahan idle, bangunan non-inti, layanan sosial, kawasan
 * industri) dikembalikan apa adanya sehingga tetap tampil di semua cakupan.
 */
const kelompokSubholding = (kelompokAset: string) => {
  if (kelompokAset.includes("Sawit") || kelompokAset.includes("PKS")) return "PalmCo";
  if (kelompokAset.includes("PG ")) return "SGN";
  return kelompokAset;
};

/** Matriks Hold–Optimize–Divest: nilai strategis × imbal hasil kelompok aset. */
export function AssetHoldSellMatrix() {
  const { active, isFiltered, def } = useSubholding();
  const data = filterBySubholding(allData, active, (d) => kelompokSubholding(d.kelompokAset));

  const ringkasan = ORDER.map((q) => {
    const rows = data.filter((d) => d.kuadran === q);
    return {
      kuadran: q,
      jumlah: rows.length,
      nilaiRpM: rows.reduce((s, r) => s + r.nilaiBukuRpM, 0),
    };
  });

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Hold – Optimize – Divest" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Strategis (1–5) × Imbal Hasil Aset (%) · Ukuran Titik = Nilai Buku ·{" "}
        {isFiltered ? `${data.length} Kelompok Aset ${def.label}` : "10 Kelompok Aset"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="nilaiStrategis"
              domain={[1, 5.5]}
              ticks={[1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="number"
              dataKey="returnPct"
              domain={[-6, 11]}
              ticks={[-5, 0, 5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <ZAxis type="number" dataKey="nilaiBukuRpM" range={[30, 180]} />
            <ReferenceLine
              y={AOP_RETURN_AMBANG_PCT}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              x={AOP_STRATEGIS_AMBANG}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelFormatter={() => ""}
              formatter={(v: number, n: string) => {
                if (n === "nilaiStrategis") return [num(v), "Nilai Strategis"];
                if (n === "returnPct") return [`${num(v)}%`, "Imbal Hasil"];
                return [`Rp ${rp(v)} M`, "Nilai Buku"];
              }}
            />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.kelompokAset} fill={QUADRAN_COLOR[d.kuadran]} fillOpacity={0.8} />
              ))}
              <LabelList
                dataKey="short"
                position="top"
                offset={5}
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
              {r.jumlah} kelompok · Rp {rp(r.nilaiRpM)} M
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1 text-[9px] leading-snug text-ink-500">{holdSellNote}</p>
    </div>
  );
}
