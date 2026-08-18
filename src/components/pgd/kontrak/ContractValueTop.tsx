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
import { contractValueTop } from "@/lib/pgd-data-detail";
import { PGD_STATUS_COLOR } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = contractValueTop.reduce((s, r) => s + r.nilaiRpT, 0);

const rows = contractValueTop.map((r) => ({
  ...r,
  short: r.kontrak.length > 30 ? `${r.kontrak.slice(0, 29)}…` : r.kontrak,
}));

export function ContractValueTop() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead
        title="10 Kontrak Bernilai Terbesar"
        action="Lihat Semua Kontrak"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Total Rp {TOTAL.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T dari Rp 18,6 T ·
        Warna = Status Eksekusi
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 34, bottom: 0, left: 6 }}
            barCategoryGap="18%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v.toLocaleString("id-ID")} T`}
            />
            <YAxis
              type="category"
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={152}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")} T`, "Nilai Kontrak"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="nilaiRpT" radius={[0, 4, 4, 0]} barSize={11}>
              {rows.map((r) => (
                <Cell key={r.rank} fill={PGD_STATUS_COLOR[r.status]} />
              ))}
              <LabelList
                dataKey="nilaiRpT"
                position="right"
                formatter={(v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
