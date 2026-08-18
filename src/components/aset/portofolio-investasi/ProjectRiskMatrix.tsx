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
} from "recharts";
import {
  INV_NILAI_AMBANG_RP_T,
  INV_RISIKO_AMBANG,
  projectRiskMatrix,
  projectRiskNote,
} from "@/lib/inv-data";
import type { AstRiskLevel } from "@/lib/ast-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const LEVEL_COLOR: Record<AstRiskLevel, string> = {
  Ekstrem: PALETTE.red,
  Tinggi: PALETTE.amber,
  Sedang: PALETTE.blue,
  Rendah: PALETTE.green,
};

const SHORT: Record<string, string> = {
  "Bioetanol SGN": "Bioetanol",
  "Kawasan Industri PTPN I": "Kawasan Ind.",
  "Revitalisasi 5 PG": "Revit. 5 PG",
  "Refinery & Minyak Goreng": "Refinery",
  "Biogas & Co-Firing 18 PKS": "Biogas",
  "Upgrade Kapasitas 6 PKS": "Upgrade PKS",
  "Hilirisasi Oleokimia": "Oleokimia",
  "Digitalisasi & ERP Terpadu": "ERP",
};

const data = projectRiskMatrix.map((p) => ({ ...p, short: SHORT[p.proyek] ?? p.proyek }));

/** Matriks nilai investasi × skor risiko eksekusi (ambang Rp 1,5 T × 3,0). */
export function ProjectRiskMatrix() {
  const { active, isFiltered, def } = useSubholding();
  // Nama proyek menyebut subholding pelaksananya; proyek lintas subholding
  // (tanpa penyebutan) tetap penuh karena berlaku untuk semua cakupan.
  const dim = (proyek: string) => {
    if (!isFiltered) return 1;
    const id = toSubholdingId(proyek);
    return id === null || id === active ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Risiko Proyek" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Nilai Investasi (Rp T) × Skor Risiko Eksekusi (1–5) · proyek ${def.label} disorot`
          : "Nilai Investasi (Rp T) × Skor Risiko Eksekusi (1–5) · 8 Proyek Besar"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="risikoEksekusi"
              domain={[1.5, 5]}
              ticks={[2, 3, 4, 5]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="number"
              dataKey="nilaiRpT"
              domain={[0, 3.5]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <ReferenceLine
              y={INV_NILAI_AMBANG_RP_T}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              x={INV_RISIKO_AMBANG}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelFormatter={() => ""}
              formatter={(v: number, n: string) =>
                n === "risikoEksekusi"
                  ? [num(v), "Skor Risiko"]
                  : [`Rp ${num(v)} T`, "Nilai Investasi"]
              }
            />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell
                  key={d.proyek}
                  fill={LEVEL_COLOR[d.level]}
                  fillOpacity={0.85 * dim(d.proyek)}
                />
              ))}
              <LabelList
                dataKey="short"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{projectRiskNote}</p>
    </div>
  );
}
