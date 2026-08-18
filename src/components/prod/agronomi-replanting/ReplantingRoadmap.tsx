"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { replantingNote, replantingRoadmap } from "@/lib/agro-data";
import type { ReplantingPlan } from "@/lib/agro-data";
import { CATEGORICAL, CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";

const YEARS: { tahun: string; key: keyof ReplantingPlan }[] = [
  { tahun: "2026", key: "target2026Ha" },
  { tahun: "2027", key: "target2027Ha" },
  { tahun: "2028", key: "target2028Ha" },
  { tahun: "2029", key: "target2029Ha" },
  { tahun: "2030", key: "target2030Ha" },
];

/** Pivot: satu baris per tahun, kolom per regional (stacked). */
function pivot(rows: ReplantingPlan[]) {
  return YEARS.map(({ tahun, key }) => {
    const row: Record<string, string | number> = { tahun };
    for (const r of rows) row[r.regional] = r[key] as number;
    return row;
  });
}

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function ReplantingRoadmap() {
  // Domain: Regional 1–7 adalah wilayah kebun sawit → milik PalmCo.
  const { active, def } = useSubholding();
  const rows = filterBySubholding(replantingRoadmap, active, (r) => commodityScope(r.regional));
  const roadmapByYear = pivot(rows);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Replanting Roadmap 2026–2030" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Target Tanam Ulang per Regional (Ha) — Total 88.000 Ha 5 Tahun
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={roadmapByYear} margin={{ top: 8, right: 4, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${ribuan(v)} ha`, name]}
              itemSorter={() => 0}
            />
            {rows.map((r, i) => (
              <Bar
                key={r.regional}
                dataKey={r.regional}
                stackId="roadmap"
                fill={CATEGORICAL[i]}
                barSize={26}
                radius={i === rows.length - 1 ? [3, 3, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{replantingNote}</p>
      </>
      )}
    </div>
  );
}
