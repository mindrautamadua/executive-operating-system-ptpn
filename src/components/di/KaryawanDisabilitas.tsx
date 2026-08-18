"use client";

import { useState } from "react";
import { Accessibility, ArrowRight, Brain, Ear, Eye, UsersRound } from "lucide-react";
import { DonutChart } from "../ui/DonutChart";
import { disabilitasEquity, jenisDisabilitas, totalDisabilitas } from "@/lib/di-data";

const ICONS = {
  daksa: Accessibility,
  rungu: Ear,
  netra: Eye,
  grahita: Brain,
  lainnya: UsersRound,
};

export function KaryawanDisabilitas() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Karyawan Disabilitas berdasarkan Jenis</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">(Per 30 Jun 2026)</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={jenisDisabilitas.map((d) => ({
            name: d.name,
            value: d.share,
            color: d.color,
          }))}
          size={150}
          centerValue={totalDisabilitas}
          centerCaption="Karyawan"
          valueFormatter={(v) => `${v.toFixed(1).replace(".", ",")}%`}
          onHover={setActive}
        />

        {/* legend baris — satu encoding saja, bar ganda dihapus */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[9px]">
          {jenisDisabilitas.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <div
                key={d.name}
                className="flex items-center gap-2 whitespace-nowrap transition-opacity"
                style={{ opacity: active === null || active === i ? 1 : 0.35 }}
              >
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ background: d.color }}
                />
                <Icon size={13} strokeWidth={1.8} className="shrink-0 text-ink-400" />
                <span className="text-[9.5px] text-ink-700">{d.name}</span>
                <span className="ml-auto text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {d.pct}
                </span>
                <span className="w-[28px] shrink-0 text-right text-[9.5px] tabular-nums text-ink-400">
                  ({d.jumlah})
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* inclusion outcome: rasio karier vs rata-rata organisasi — bukan hanya representasi */}
      <div className="mt-1 flex items-center gap-2 border-t border-[#eef2f6] pt-1.5">
        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
          Outcome vs org
        </span>
        {disabilitasEquity.map((e) => (
          <span
            key={e.label}
            className="flex items-baseline gap-1 rounded bg-[#f6f9fc] px-1.5 py-[3px] leading-none"
          >
            <span className="text-[8.5px] text-ink-500">{e.label}</span>
            <span className="text-[9.5px] font-bold tabular-nums text-ink-900">{e.nilai}</span>
          </span>
        ))}
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail disabilitas <ArrowRight size={11} />
      </button>
    </div>
  );
}
