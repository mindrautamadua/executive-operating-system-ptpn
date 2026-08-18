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
import { paymentTermsProfile, paymentTermsSummary } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const BAR_COLOR = {
  good: PALETTE.green,
  warn: PALETTE.amber,
  bad: PALETTE.red,
} as const;

export function PaymentTermsProfile() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Profil Termin Pembayaran" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi Nilai Belanja per Bucket Termin (%) · termin tertimbang{" "}
        {paymentTermsSummary.terminRataHari} hari
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paymentTermsProfile} margin={{ top: 14, right: 6, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 32]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [
                `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`,
                "Porsi Nilai Belanja",
              ]}
            />
            <Bar dataKey="pct" radius={[3, 3, 0, 0]} barSize={26}>
              {paymentTermsProfile.map((p) => (
                <Cell key={p.bucket} fill={BAR_COLOR[p.tone]} />
              ))}
              <LabelList
                dataKey="valueRpT"
                position="top"
                formatter={(v: number) =>
                  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`
                }
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3 rounded-lg bg-[#eef2f6] px-2.5 py-1.5">
        <span className="flex items-baseline gap-1">
          <span className="text-[11px] font-extrabold leading-none text-ink-900">
            {paymentTermsSummary.dpoAktualHari}
          </span>
          <span className="text-[9px] font-semibold text-ink-500">hari DPO aktual</span>
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-[11px] font-extrabold leading-none text-[#d98b06]">
            +{paymentTermsSummary.lagProsesHari}
          </span>
          <span className="text-[9px] font-semibold text-ink-500">hari lag proses</span>
        </span>
        <p className="min-w-0 flex-1 text-[9px] leading-snug text-ink-500">
          {paymentTermsSummary.note}
        </p>
      </div>
    </div>
  );
}
