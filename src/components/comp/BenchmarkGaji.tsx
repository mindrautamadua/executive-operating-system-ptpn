"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { benchmarkGaji } from "@/lib/comp-data";
import { PALETTE, SEQ_BLUE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID", { maximumFractionDigits: 1 });

/**
 * Salary band per level: track = rentang market (min→max),
 * tick biru = rata-rata market, titik hijau = posisi rata-rata perusahaan.
 * Skala per baris — semua nilai dilabel supaya tetap bisa dibandingkan.
 */
export function BenchmarkGaji() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "220ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>Perbandingan Benchmark Gaji</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">Rata-rata Gaji per Level vs Market</p>
        </div>
        <span className="mt-[2px] shrink-0 text-[9px] text-ink-500">(Rp Juta)</span>
      </div>

      <div className="mt-1.5 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
          <span className="h-[7px] w-[14px] rounded-full" style={{ background: SEQ_BLUE[1] }} />
          Rentang Market
        </span>
        <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
          <span className="h-[9px] w-[2.5px] rounded-full" style={{ background: PALETTE.blue }} />
          Rata-rata Market
        </span>
        <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: PALETTE.green }} />
          Rata-rata Perusahaan
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-around py-1">
        {benchmarkGaji.map((r) => {
          const hi = Math.max(r.marketMax, r.perusahaan);
          const lo = r.marketMin;
          const span = hi - lo;
          const pad = span * 0.12;
          const p = (v: number) => ((v - (lo - pad)) / (span + pad * 2)) * 100;
          return (
            <div
              key={r.level}
              tabIndex={0}
              aria-label={`${r.level}: market Rp ${num(r.marketMin)}–${num(r.marketMax)} juta, rata-rata market Rp ${num(r.marketAvg)} juta, perusahaan Rp ${num(r.perusahaan)} juta`}
              className="group relative flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ptpn-green"
            >
              <span className="w-[92px] shrink-0 text-[9.5px] leading-[1.2] text-ink-700">
                {r.level}
              </span>
              <span className="w-[20px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {num(r.marketMin)}
              </span>

              <span className="relative h-[16px] min-w-0 flex-1">
                {/* garis dasar */}
                <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#eef2f6]" />
                {/* band rentang market */}
                <span
                  className="absolute top-1/2 h-[8px] -translate-y-1/2 rounded-full"
                  style={{
                    left: `${p(r.marketMin)}%`,
                    width: `${p(r.marketMax) - p(r.marketMin)}%`,
                    background: SEQ_BLUE[1],
                  }}
                />
                {/* tick rata-rata market */}
                <span
                  className="absolute top-1/2 h-[12px] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${p(r.marketAvg)}%`, background: PALETTE.blue }}
                />
                {/* marker perusahaan — slide masuk saat mount */}
                <span
                  className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    boxShadow: "0 0 0 2px var(--surface)",
                    left: on ? `${p(r.perusahaan)}%` : "0%",
                    background: PALETTE.green,
                    transition: "left 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </span>

              <span className="w-[20px] shrink-0 text-[9px] tabular-nums text-ink-500">
                {num(r.marketMax)}
              </span>
              <span className="w-[24px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                {num(r.perusahaan)}
              </span>

              {/* tooltip semua nilai */}
              <div className="pointer-events-none absolute bottom-full left-[100px] z-20 mb-0.5 hidden whitespace-nowrap rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-1.5 shadow-cardHover group-hover:block group-focus-within:block">
                <div className="text-[9.5px] font-bold text-ink-900">{r.level}</div>
                <div className="mt-[2px] text-[9px] text-ink-500">
                  Market: Rp {num(r.marketMin)}–{num(r.marketMax)} Jt · Rata-rata market{" "}
                  <span className="font-semibold text-ink-700">Rp {num(r.marketAvg)} Jt</span>
                  {" · "}Perusahaan{" "}
                  <span className="font-bold text-ink-900">Rp {num(r.perusahaan)} Jt</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail benchmark <ArrowRight size={11} />
      </button>
    </div>
  );
}
