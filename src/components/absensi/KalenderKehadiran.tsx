"use client";

import { useState } from "react";
import { kalenderKehadiran, metodePencatatan, warnaKalender } from "@/lib/absensi-data";
import { PALETTE, SEQ_GREEN } from "@/lib/chart-palette";
import type { KalenderSel } from "@/lib/absensi-data";

const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const idn = (v: number) => v.toFixed(1).replace(".", ",");

/** Heatmap kalender kehadiran 13 minggu (gaya kontribusi GitHub). */
export function KalenderKehadiran() {
  const [hover, setHover] = useState<KalenderSel | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Kalender Kehadiran</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Tingkat Kehadiran Harian — 13 Minggu Terakhir
          </p>
        </div>
        <span className="whitespace-nowrap text-[9px] tabular-nums text-ink-500">
          {hover ? `${hover.tanggal} · ${idn(hover.pct)}%` : "Arahkan kursor ke sel"}
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 items-center gap-2">
        {/* label hari */}
        <div className="flex shrink-0 flex-col gap-[3px]">
          {HARI.map((h, i) => (
            <span
              key={h}
              className="flex h-[11px] items-center text-[9px] leading-none text-ink-500"
            >
              {i % 2 === 0 ? h : ""}
            </span>
          ))}
        </div>

        {/* 13 kolom minggu × 7 baris hari */}
        <div className="flex min-w-0 flex-1 justify-between">
          {kalenderKehadiran.map((minggu, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {minggu.map((sel, d) => (
                <span
                  key={d}
                  onMouseEnter={() => setHover(sel)}
                  onMouseLeave={() => setHover(null)}
                  title={`${sel.tanggal} — ${idn(sel.pct)}%`}
                  className="anim-fade h-[11px] w-[11px] cursor-default rounded-[2.5px] transition-transform hover:scale-125 hover:ring-1 hover:ring-[#1b3a6b]"
                  style={
                    {
                      // akhir pekan: slate redup, hari kerja: ramp hijau
                      background: sel.weekend
                        ? PALETTE.slate
                        : warnaKalender(sel.pct),
                      opacity: sel.weekend ? 0.18 + (sel.pct / 100) * 0.4 : 1,
                      "--d": `${w * 45}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* legend ramp */}
      <div className="mt-1.5 flex items-center gap-1">
        <span className="text-[9px] text-ink-500">Rendah</span>
        {SEQ_GREEN.map((c) => (
          <span key={c} className="h-[8px] w-[8px] rounded-[2px]" style={{ background: c }} />
        ))}
        <span className="text-[9px] text-ink-500">Tinggi</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-ink-500">
          <span
            className="h-[8px] w-[8px] rounded-[2px]"
            style={{ background: PALETTE.slate, opacity: 0.35 }}
          />
          Akhir pekan
        </span>
      </div>

      {/* metode pencatatan — ringkas sebagai baris chip */}
      <div className="mt-1.5 flex items-center gap-1 border-t border-[#f0f3f6] pt-1.5">
        {metodePencatatan.map((m) => (
          <span
            key={m.name}
            className="flex items-center gap-1 whitespace-nowrap rounded-md bg-[#f6f9fc] px-1.5 py-[3px] text-[9px] text-ink-700"
            title={`${m.name}: ${m.label} karyawan (${m.pct})`}
          >
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: m.color }} />
            {m.name}
            <span className="font-bold tabular-nums text-ink-900">{m.pct}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
