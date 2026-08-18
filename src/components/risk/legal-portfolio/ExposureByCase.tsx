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
import { exposureTop10 } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** "Rp 1,10 T" / "Rp 620 M" → nilai dalam Rp Miliar. */
function toMiliar(label: string): number {
  const m = label.match(/([\d.,]+)\s*(T|M)/);
  if (!m) return 0;
  const angka = Number(m[1].replace(/\./g, "").replace(",", "."));
  return m[2] === "T" ? angka * 1000 : angka;
}

const PROGNOSIS_COLOR: Record<string, string> = {
  Menang: PALETTE.green,
  Berimbang: PALETTE.amber,
  Berisiko: PALETTE.red,
};

const data = exposureTop10.map((c) => ({
  ...c,
  nama: c.perkara.length > 42 ? `${c.perkara.slice(0, 41)}…` : c.perkara,
  nilai: toMiliar(c.eksposur),
}));

export function ExposureByCase() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Top 10 Eksposur Perkara" action="Lihat Semua Perkara" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Gugatan per Perkara (Rp Miliar) · Warna = Prognosis Putusan
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 2, right: 46, bottom: 2, left: 4 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nama"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={186}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number, _n: string, p: { payload?: { eksposur?: string; tahap?: string } }) => [
                `${p.payload?.eksposur ?? `Rp ${v} M`} · ${p.payload?.tahap ?? ""}`,
                "Eksposur",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="nilai" radius={[0, 4, 4, 0]} barSize={12}>
              {data.map((c) => (
                <Cell key={c.perkara} fill={PROGNOSIS_COLOR[c.prognosis]} />
              ))}
              <LabelList
                dataKey="eksposur"
                position="right"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        Perkara terbesar — gugatan pembatalan HGU Regional 3 Riau Rp 1,10 T (banding) — menyumbang
        26% total eksposur Rp 4,2 T.
      </p>
    </div>
  );
}
