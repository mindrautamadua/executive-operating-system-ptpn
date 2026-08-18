"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";
import { komposisiEbitda, komposisiPenjualan } from "@/lib/data";
import { Delta } from "./ui/Delta";
import { DetailLink } from "./DetailLink";

/**
 * Bauran pendapatan dan bauran EBITDA ditampilkan di kartu yang sama, bisa
 * ditukar. Keduanya menjawab pertanyaan berbeda: yang satu "dari mana omzet
 * datang", yang lain "di mana nilai sebenarnya diciptakan". Menampilkan
 * pendapatan saja membuat segmen bermarjin tebal terlihat kecil.
 */
const MODE = {
  pendapatan: {
    tab: "Pendapatan",
    data: komposisiPenjualan,
    /**
     * Penjualan komoditas ≠ pendapatan konsolidasi (Rp 24,6 T): selisih
     * Rp 4,7 T adalah pendapatan hilir non-komoditas, jasa, dan lain-lain.
     * Tanpa penjelasan ini CEO wajar bertanya "kenapa 19,9 vs 24,6?".
     */
    pusatLabel: "Penjualan Komoditas",
    pusatNilai: "Rp 19,90 T",
  },
  ebitda: {
    tab: "EBITDA",
    data: komposisiEbitda,
    pusatLabel: "Total EBITDA",
    pusatNilai: "Rp 6,82 T",
  },
} as const;

export function KomposisiPenjualan() {
  const [mode, setMode] = useState<keyof typeof MODE>("pendapatan");
  const aktif = MODE[mode];

  return (
    <div className="card flex h-full flex-col px-3.5 pb-2.5 pt-3">
      <div className="flex items-baseline gap-1.5">
        <h3 className="card-title whitespace-nowrap">KOMPOSISI</h3>
        <span className="text-[9px] text-ink-500">(YTD 2026)</span>
        <span className="ml-auto">
          <DetailLink href="/pemasaran-penjualan" />
        </span>
      </div>

      <div className="mt-1 flex gap-1">
        {(Object.keys(MODE) as (keyof typeof MODE)[]).map((k) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            className={`rounded-md px-1.5 py-[3px] text-[9px] font-semibold leading-none transition-colors ${
              k === mode
                ? "bg-ptpn-greenLight text-ptpn-green"
                : "text-ink-500 hover:bg-[#f5f8fa]"
            }`}
          >
            {MODE[k].tab}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="relative h-[116px] w-[116px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={aktif.data}
                dataKey="value"
                innerRadius={41}
                outerRadius={61}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {aktif.data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, n: string) => [`${v}%`, n]}
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "1px solid #e8edf2",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[8.5px] text-ink-500">{aktif.pusatLabel}</span>
            <span className="mt-[2px] text-[13px] font-extrabold text-ink-900">
              {aktif.pusatNilai}
            </span>
            <Delta
              value={mode === "pendapatan" ? "13,10%" : "12,10%"}
              trend="up"
              size={9.5}
              className="mt-[3px]"
            />
          </div>
        </div>

        <div className="ml-1 flex flex-1 flex-col gap-[6px]">
          {aktif.data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="truncate text-[10px] text-ink-700">{d.name}</span>
              <span className="ml-auto shrink-0 text-[10px] font-bold tabular-nums text-ink-900">
                {d.value.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%
              </span>
              {/*
                Selisih porsi EBITDA terhadap porsi pendapatan — inilah yang
                membedakan segmen penghasil omzet dari segmen penghasil nilai.
              */}
              {mode === "ebitda" && (
                <span
                  className={`w-[30px] shrink-0 text-right text-[8.5px] font-bold tabular-nums ${
                    d.value >= komposisiPenjualan[i].value ? "delta-good" : "delta-bad"
                  }`}
                >
                  {d.value >= komposisiPenjualan[i].value ? "+" : "−"}
                  {Math.abs(d.value - komposisiPenjualan[i].value).toLocaleString("id-ID", {
                    maximumFractionDigits: 1,
                  })}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {mode === "pendapatan" && (
        <p
          className="truncate text-[9px] text-ink-500"
          title="Penjualan komoditas Rp 19,90 T + pendapatan hilir/jasa & lain-lain Rp 4,70 T = pendapatan konsolidasi Rp 24,60 T"
        >
          + hilir/jasa &amp; lain-lain Rp 4,70 T = konsolidasi Rp 24,60 T
        </p>
      )}

      <button className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#2f9bf5] hover:underline">
        Lihat detail <ArrowRight size={11} />
      </button>
    </div>
  );
}
