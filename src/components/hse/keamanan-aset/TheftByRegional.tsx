"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import { theftByRegional, theftRestanFootnote } from "@/lib/hse-data-detail";
import { HSE_RISK_COLOR } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const data = theftByRegional.map((r) => ({ ...r, label: r.regional.replace("Regional ", "R") }));

/** Pencurian TBS per regional; korelasi dengan restan panen ditautkan ke Produksi. */
export function TheftByRegional() {
  const { active, isFiltered, def } = useSubholding();
  // Pencurian TBS terjadi di kebun Regional 1–7, wilayah operasi PalmCo (PTPN IV);
  // komoditas SugarCo/SupportingCo tidak masuk hitungan ini.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Pencurian per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Pencurian TBS di regional PalmCo — di luar cakupan ${def.label}`
          : "312 Kasus YTD · Warna Batang = Tingkat Risiko Keamanan"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, _n: string, item: { payload?: (typeof data)[number] }) => [
                `${v} kasus · Rp ${(item.payload?.kerugianRpM ?? 0).toLocaleString("id-ID", { minimumFractionDigits: 2 })} M · restan ${(item.payload?.restanPct ?? 0).toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`,
                item.payload?.risiko ?? "Risiko",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="kasus" radius={[3, 3, 0, 0]}>
              {data.map((r) => (
                <Cell
                  key={r.regional}
                  fill={HSE_RISK_COLOR[r.risiko]}
                  fillOpacity={luarCakupan ? 0.25 : 0.9}
                />
              ))}
              <LabelList
                dataKey="kasus"
                position="top"
                offset={4}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500" title={theftRestanFootnote}>
        {theftRestanFootnote}{" "}
        <Link
          href="/produksi-operasi/panen-logistik"
          className="inline-flex items-center gap-[2px] font-semibold text-ptpn-green hover:underline"
        >
          Panen &amp; Logistik
          <ArrowUpRight size={9} />
        </Link>
      </p>
    </div>
  );
}
