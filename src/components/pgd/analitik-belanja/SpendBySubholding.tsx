"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendBySubholding } from "@/lib/pgd-data";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const COLORS = { PalmCo: PALETTE.green, SGN: PALETTE.blue, "PTPN I": PALETTE.teal } as const;

/** Satu batang tersusun: komposisi belanja Rp 12,4 T per subholding. */
const stacked = [
  {
    name: "Belanja Grup",
    ...Object.fromEntries(spendBySubholding.map((s) => [s.segment, s.valueRpT])),
  },
];

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

export function SpendBySubholding() {
  const { active, isFiltered, def } = useSubholding();
  // `segment` (PalmCo / SGN / PTPN I) adalah dimensi subholding kartu ini.
  // Grafik pembanding: segmen non-aktif diredupkan agar porsinya terhadap
  // belanja grup Rp 12,4 T tetap terbaca.
  const dim = (segment: string) =>
    !isFiltered || toSubholdingId(segment) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Belanja per Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Belanja ${def.label} dalam komposisi grup Rp 12,4 T & intensitas pengadaan`
          : "Komposisi Rp 12,4 T & Intensitas Pengadaan per Rp Pendapatan"}
      </p>

      <div className="mt-1 h-[62px] w-full shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stacked}
            layout="vertical"
            margin={{ top: 6, right: 6, bottom: 0, left: 6 }}
          >
            <XAxis type="number" domain={[0, 12.4]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [rp(v), name]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              height={14}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            {spendBySubholding.map((s, i) => (
              <Bar isAnimationActive={false}
                key={s.segment}
                dataKey={s.segment}
                stackId="spend"
                fill={COLORS[s.segment]}
                fillOpacity={dim(s.segment)}
                barSize={22}
                radius={
                  i === 0
                    ? [3, 0, 0, 3]
                    : i === spendBySubholding.length - 1
                      ? [0, 3, 3, 0]
                      : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
        {spendBySubholding.map((s) => (
          <div
            key={s.segment}
            className="transition-opacity"
            style={{ opacity: dim(s.segment) }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-ink-900">
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[s.segment] }}
                />
                {s.segment}
              </span>
              <span className="text-[8.5px] font-semibold text-ink-500">
                {rp(s.valueRpT)} · {s.pct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
              </span>
            </div>
            <div className="mt-[3px] flex items-center gap-2">
              <span className="w-[62px] shrink-0 text-[9px] font-semibold text-ink-500">
                Intensitas
              </span>
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${s.intensitasPct}%`, backgroundColor: COLORS[s.segment] }}
                />
              </div>
              <span className="w-[38px] shrink-0 text-right text-[9px] font-bold text-ink-700">
                {s.intensitasPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        PTPN I (60,9%) dan SGN (59,2%) membelanjakan porsi pendapatan jauh lebih besar dari PalmCo
        (46,6%) — prioritas konsolidasi sourcing berikutnya.
      </p>
    </div>
  );
}
