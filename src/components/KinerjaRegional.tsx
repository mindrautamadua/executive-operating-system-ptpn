"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { regional } from "@/lib/data";
import { Delta } from "./ui/Delta";

/**
 * Kartu ini dulu mengulang siluet Indonesia setinggi 104 px di samping peta
 * utama — gambar yang sama, dua kali, dan yang kecil tidak menyandi apa pun.
 * Ruangnya sekarang dipakai batang perbandingan: pertanyaan yang dijawab
 * kartu ini adalah "regional mana yang menopang pendapatan", dan panjang
 * batang menjawabnya lebih cepat daripada peta kedua.
 */
export function KinerjaRegional() {
  return (
    <div className="card flex h-full min-h-[300px] flex-col px-4 pb-3 pt-3">
      <div className="flex items-baseline gap-1.5">
        <h3 className="card-title">KINERJA REGIONAL</h3>
        <span className="text-[9px] text-ink-500">(YTD 2026)</span>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="muted-label">REGIONAL</span>
        <span className="text-[9px] text-ink-500">Pendapatan · vs 2025</span>
      </div>

      <div className="mt-2 flex flex-1 flex-col justify-between gap-2">
        {regional.map((r) => {
          const baris = (
            <>
              <div className="flex items-baseline gap-2">
                <span className="shrink-0 text-[10.5px] font-medium text-ink-700">{r.name}</span>
                {r.diagnosis && (
                  <span className="flex min-w-0 items-center gap-[1px] truncate rounded bg-[#fee2e2] px-1 py-[1px] text-[9px] font-bold leading-[1.5] text-[#dc2626]">
                    PERHATIAN
                    <ChevronRight size={12} aria-hidden />
                  </span>
                )}
                <span className="ml-auto shrink-0 whitespace-nowrap text-[10.5px] font-bold tabular-nums text-ink-900">
                  {r.value}
                </span>
                <Delta
                  value={r.delta}
                  trend={r.trend}
                  size={10}
                  className="w-[46px] shrink-0 justify-end"
                />
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.pct}%`, background: r.color }}
                  />
                </span>
                <span className="w-[62px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-400">
                  {r.totalFasilitas} fasilitas
                </span>
              </div>
            </>
          );

          // Baris yang tumbuh negatif jadi tautan diagnosis: pertanyaan
          // berikutnya setelah melihat angka merah selalu "kenapa?", dan
          // jawabannya ada di halaman produktivitas kebun.
          return r.diagnosis ? (
            <Link
              key={r.name}
              href={r.diagnosis}
              className="-mx-1.5 rounded px-1.5 py-1 transition-colors hover:bg-[#fef2f2]"
              title={`Telusuri penyebab penurunan ${r.name}`}
            >
              {baris}
            </Link>
          ) : (
            <div key={r.name} className="-mx-1.5 px-1.5 py-1">
              {baris}
            </div>
          );
        })}
      </div>
    </div>
  );
}
