"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
import { landDisputeLegalTrack, landDisputeStats } from "@/lib/hkm-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";

const data = landDisputeLegalTrack.map((r) => ({
  ...r,
  nama: r.jalur.length > 34 ? `${r.jalur.slice(0, 33)}…` : r.jalur,
}));

/** Jalur hukum 52 kasus sengketa lahan yang berperkara (populasi induk: dimensi Aset). */
export function LandDisputeLegalTrack() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Jalur Hukum Sengketa Lahan
        </h3>
        <Link
          href={landDisputeStats.href}
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Populasi Induk: Sengketa Lahan <ArrowRight size={11} />
        </Link>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        {landDisputeStats.berperkara} Kasus Berperkara dari {landDisputeStats.populasiKasus} Kasus ·{" "}
        {landDisputeStats.berperkaraRbHa.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb ha
        dari {landDisputeStats.populasiRbHa.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb
        ha
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 40, bottom: 2, left: 4 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nama"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={168}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(
                v: number,
                _n: string,
                p: { payload?: { rataDurasiBulan?: number; tingkatKeberhasilan?: string } },
              ) => [
                `${v} kasus · rata-rata ${p.payload?.rataDurasiBulan ?? 0} bulan · ${
                  p.payload?.tingkatKeberhasilan ?? ""
                }`,
                "Jalur Hukum",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="jumlahKasus" radius={[0, 4, 4, 0]} barSize={18}>
              {data.map((r) => (
                <Cell key={r.jalur} fill={r.color} />
              ))}
              <LabelList
                dataKey="jumlahKasus"
                position="right"
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
        {landDisputeLegalTrack.map((r) => (
          <div key={r.jalur} className="rounded-md bg-[#f8fafc] px-2 py-[5px]">
            <div className="text-[9px] font-bold text-ink-700">
              {r.rataDurasiBulan} bln · Rp {r.biayaRataRpM.toLocaleString("id-ID")} M/kasus
            </div>
            <div className="mt-[2px] text-[9px] leading-snug text-ink-500">
              {r.tingkatKeberhasilan}
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1 text-[9px] leading-snug text-ink-500">{landDisputeStats.note}</p>
    </div>
  );
}
