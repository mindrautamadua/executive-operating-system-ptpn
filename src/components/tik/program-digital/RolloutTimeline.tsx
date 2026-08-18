"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { rolloutTimeline, TIK_RAG_COLOR, type TikRagStatus } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

/** Sumbu waktu gelombang rollout: Q1 2026 → Q1 2027. */
const KUARTAL = ["Q1 26", "Q2 26", "Q3 26", "Q4 26", "Q1 27"];

/** "Q3 2026" → indeks 2 pada sumbu KUARTAL. */
function indeks(label: string): number {
  const m = /Q(\d)\s+(\d{4})/.exec(label);
  if (!m) return 0;
  return (Number(m[2]) - 2026) * 4 + (Number(m[1]) - 1);
}

interface Row {
  label: string;
  entitas: string;
  modul: string;
  /** Offset transparan (kuartal sebelum rencana awal). */
  base: number;
  /** Durasi bar (kuartal) — melebar bila jadwal mundur. */
  durasi: number;
  progressPct: number;
  rag: TikRagStatus;
  rencanaAwal: string;
  rencanaKini: string;
  catatan: string;
}

// Gantt via BarChart horizontal: bar `base` transparan sebagai offset kuartal mulai.
const rows: Row[] = rolloutTimeline.map((w) => {
  const mulai = indeks(w.rencanaAwal);
  const selesai = indeks(w.rencanaKini);
  return {
    label: `${w.gelombang} · ${w.entitas}`,
    entitas: w.entitas,
    modul: w.modul,
    base: mulai,
    durasi: selesai - mulai + 1,
    progressPct: w.progressPct,
    rag: w.rag,
    rencanaAwal: w.rencanaAwal,
    rencanaKini: w.rencanaKini,
    catatan: w.catatan,
  };
});

const LEGEND: TikRagStatus[] = ["Hijau", "Amber", "Merah"];

/** Timeline gantt gelombang rollout ERP per subholding, Q1 2026 – Q1 2027. */
export function RolloutTimeline() {
  const { active, isFiltered, def } = useSubholding();
  // `entitas` gelombang menyebut subholding pemilik rollout; satu gelombang bisa
  // mencakup dua subholding ("PalmCo & PTPN I") sehingga dipecah dulu. Gelombang
  // lintas grup ("Holding", "Seluruh Grup") berlaku untuk semua cakupan.
  const dim = (entitas: string) => {
    if (!isFiltered) return 0.85;
    const cocok = entitas
      .split("&")
      .some((bagian) => {
        const id = toSubholdingId(bagian);
        return id === null || id === active;
      });
    return cocok ? 0.85 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Timeline Rollout per Gelombang" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `5 Gelombang Rollout Q1 2026 – Q1 2027 · gelombang di luar ${def.label} diredupkan`
          : "5 Gelombang Rollout Q1 2026 – Q1 2027 · panjang bar mencerminkan pergeseran dari rencana awal"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 14, bottom: 0, left: 4 }}
            barCategoryGap="20%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => KUARTAL[v] ?? ""}
              orientation="top"
            />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={128}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                if (name !== "durasi") return [null, null];
                const r = item.payload as Row;
                const geser =
                  r.rencanaAwal === r.rencanaKini
                    ? "sesuai rencana"
                    : `mundur ${r.rencanaAwal} → ${r.rencanaKini}`;
                return [`${r.modul} · progres ${r.progressPct}% · ${geser}`, r.label];
              }}
            />
            <Bar dataKey="base" stackId="g" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="durasi" stackId="g" radius={[3, 3, 3, 3]} barSize={11}>
              {rows.map((r) => (
                <Cell key={r.label} fill={TIK_RAG_COLOR[r.rag]} fillOpacity={dim(r.entitas)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-center gap-3 text-[9px] text-ink-500">
        {LEGEND.map((s) => (
          <span key={s} className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: TIK_RAG_COLOR[s] }}
            />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
