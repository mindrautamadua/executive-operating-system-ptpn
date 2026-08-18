"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { komposisiKaryawan, sdmKonteks, sdmKpi } from "@/lib/data";
import { peopleCapability } from "@/lib/ceo-data";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { Delta } from "./ui/Delta";
import { DetailLink } from "./DetailLink";

export function KinerjaSdm() {
  return (
    <div className="card flex h-full flex-col px-3.5 pb-2.5 pt-3">
      <div className="flex items-center justify-between gap-1">
        <h3 className="card-title-navy whitespace-nowrap">KINERJA SDM</h3>
        <div className="flex shrink-0 items-center gap-2">
          <DetailLink href="/sdm-talenta" />
          <button className="select-chip whitespace-nowrap">
            YTD 2026 <ChevronDown size={11} />
          </button>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1">
        {sdmKpi.map((k) => (
          <div key={k.label}>
            <div className="text-[9px] font-medium leading-[1.2] text-ink-500">{k.label}</div>
            <div className="mt-[3px] text-[13.5px] font-extrabold leading-none text-ink-900">
              {k.value}
            </div>
            <Delta
              value={k.delta}
              trend={k.trend}
              tone={"tone" in k ? k.tone : undefined}
              size={9}
              className="mt-[4px]"
            />
          </div>
        ))}
      </div>

      {/*
        Jumlah karyawan turun jadi konteks, bukan KPI utama: angka itu baru
        berarti bagi Direksi ketika dikaitkan dengan produktivitas dan risiko,
        dan ketiganya sudah diwakili rasio di atas.
      */}
      <div className="mt-1.5 truncate text-[8.5px] text-ink-400" title={sdmKonteks}>
        {sdmKonteks}
      </div>

      {/*
        People capability, bukan statistik HR: posisi kritikal mana yang
        mengancam eksekusi strategi bila suksesinya tidak siap.
      */}
      <div className="mt-1.5 rounded-lg bg-[#fdf5f5] px-2 py-1.5">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#ef4444]">
          Risiko Suksesi Posisi Kritikal
        </div>
        <div className="mt-[3px] flex flex-col gap-[2px]">
          {peopleCapability.criticalPositions.map((p) => (
            <div key={p.position} className="flex items-center gap-1.5">
              <span
                className={`h-[6px] w-[6px] shrink-0 rounded-full ${
                  p.tone === "red" ? "bg-[#ef4444]" : "bg-[#f5a524]"
                }`}
              />
              <span className="truncate text-[8.5px] text-ink-700" title={p.position}>
                {p.position}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1.5 text-[9px] font-medium text-ink-500">
        Komposisi Karyawan
      </div>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="h-[88px] w-[88px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={komposisiKaryawan}
                dataKey="value"
                innerRadius={27}
                outerRadius={42}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {komposisiKaryawan.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, n: string) => [`${v}%`, n]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="ml-1 flex min-w-0 flex-1 flex-col gap-[8px]">
          {komposisiKaryawan.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="truncate text-[9px] text-ink-700">{d.name}</span>
              <span className="ml-auto shrink-0 text-[9px] font-bold tabular-nums text-ink-900">
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
        Lihat detail SDM <ChevronRight size={12} />
      </button>
    </div>
  );
}
