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
import {
  MAINTENANCE_BACKLOG_TOTAL_RP_M,
  maintenanceBacklog,
  maintenanceBacklogNote,
} from "@/lib/arp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const rp = (v: number) => v.toLocaleString("id-ID");

/** Kategori dipendekkan agar 5 baris tetap terbaca pada sumbu kategori. */
const SHORT: Record<string, string> = {
  "Jalan & Jembatan Produksi": "Jalan & Jembatan",
  "Drainase & Konservasi Air": "Drainase & Air",
  "Emplasemen & Perumahan Karyawan": "Emplasemen",
  "Instalasi Listrik & Air Kebun": "Listrik Kebun",
  "Alat Berat & Bengkel": "Alat Berat",
};

const data = maintenanceBacklog.map((r) => ({ ...r, short: SHORT[r.kategori] ?? r.kategori }));

const FILLS = [PALETTE.red, PALETTE.amber, PALETTE.blue, PALETTE.teal, PALETTE.slate];

/** Backlog pemeliharaan Rp 420 M menurut kategori aset. */
export function MaintenanceBacklog() {
  const { active } = useSubholding();
  // Pemetaan domain: backlog jalan produksi, drainase & emplasemen kebun sawit
  // (Regional 6–7 sebagai penyumbang terbesar) — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Backlog Pemeliharaan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Backlog pemeliharaan kebun sawit hanya untuk PalmCo"
          : `Nilai Backlog per Kategori (Rp M) · Total Rp ${rp(MAINTENANCE_BACKLOG_TOTAL_RP_M)} M`}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 0, left: 4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 160]}
              ticks={[0, 40, 80, 120, 160]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              height={16}
            />
            <YAxis
              type="category"
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={82}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(
                v: number,
                _n: string,
                item: { payload?: { porsiPct?: number; umurBacklog?: string } },
              ) => [
                `Rp ${rp(v)} M · ${String(item?.payload?.porsiPct ?? 0).replace(".", ",")}% · ${
                  item?.payload?.umurBacklog ?? ""
                }`,
                "Backlog",
              ]}
            />
            <Bar dataKey="nilaiRpM" radius={[0, 3, 3, 0]} maxBarSize={18}>
              {data.map((d, i) => (
                <Cell key={d.kategori} fill={FILLS[i]} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="nilaiRpM"
                position="right"
                offset={5}
                formatter={(v: React.ReactNode) => `Rp ${rp(Number(v))} M`}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{maintenanceBacklogNote}</p>
    </div>
  );
}
