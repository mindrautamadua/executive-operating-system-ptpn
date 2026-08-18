"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { tkdnByCategory } from "@/lib/pgd-data-detail";
import { PGD_STATUS_COLOR } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TARGET = 65;

const rows = tkdnByCategory.map((r) => ({
  ...r,
  short: r.kategori.split(" & ")[0],
}));

export function TkdnByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="TKDN per Kategori Belanja" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        % Komponen Dalam Negeri · Target Regulasi {TARGET}% · Grup 68,4%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 18, right: 10, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v.toLocaleString("id-ID")}%`, "TKDN"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={TARGET}
              stroke={PALETTE.navy}
              strokeDasharray="4 3"
              label={{
                value: `Target ${TARGET}%`,
                position: "insideTopRight",
                fontSize: 8,
                fill: PALETTE.navy,
              }}
            />
            <Bar dataKey="tkdnPct" radius={[4, 4, 0, 0]} barSize={26}>
              {rows.map((r) => (
                <Cell key={r.kategori} fill={PGD_STATUS_COLOR[r.status]} />
              ))}
              <LabelList
                dataKey="tkdnPct"
                position="top"
                formatter={(v: number) => `${v.toLocaleString("id-ID")}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        Tiga kategori impor-intensif (suku cadang 42,8% · alat berat 35,2% · TI 24,8%) menahan TKDN
        grup — total belanja Rp 3,29 T.
      </p>
    </div>
  );
}
