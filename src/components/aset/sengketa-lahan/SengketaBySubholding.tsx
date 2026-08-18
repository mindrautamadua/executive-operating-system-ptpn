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
import { bySubholding } from "@/lib/asg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const SERIES = [
  { key: "okupasiRbHa", label: "Okupasi Masyarakat", color: PALETTE.red },
  { key: "klaimRbHa", label: "Klaim Pihak Ketiga", color: PALETTE.amber },
  { key: "tumpangTindihRbHa", label: "Tumpang Tindih Izin", color: PALETTE.blue },
  { key: "toraRbHa", label: "TORA", color: PALETTE.slate },
] as const;

/** Areal sengketa per subholding, di-stack menurut tipe sengketa (rb ha). */
export function SengketaBySubholding() {
  const { active, isFiltered, def } = useSubholding();
  // `subholding` adalah dimensi subholding kolom ini; kolom di luar cakupan
  // diredupkan agar porsinya terhadap 82,4 rb ha grup tetap terbaca.
  const dim = (subholding: string) =>
    !isFiltered || toSubholdingId(subholding) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Sengketa per Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Areal Sengketa ${def.label} menurut Tipe (rb ha) · dari 82,4 rb ha grup`
          : "Areal Sengketa per Subholding & Tipe (rb ha) · total 82,4 rb ha"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bySubholding} margin={{ top: 8, right: 6, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="subholding"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 50]}
              ticks={[0, 12.5, 25, 37.5, 50]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${num(v)} rb ha`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {SERIES.map((s, i) => (
              <Bar
                key={s.key}
                name={s.label}
                dataKey={s.key}
                stackId="asg"
                fill={s.color}
                barSize={44}
                radius={i === SERIES.length - 1 ? [2, 2, 0, 0] : undefined}
              >
                {bySubholding.map((row) => (
                  <Cell key={row.subholding} fillOpacity={dim(row.subholding)} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[9px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
