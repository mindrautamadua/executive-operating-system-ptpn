"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { realisasiKenaikan } from "@/lib/comp-data";
import { CountUp } from "../ui/CountUp";
import { ScopeNote } from "@/components/ui/ScopeNote";

const R = 58;
const CX = 72;
const CY = 72;
const LEN = Math.PI * R;

/** Half-gauge tersegmen Sudah/Proses/Belum, busur menyapu saat mount. */
function HalfGauge({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, []);
  const d = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  let start = 0;
  const segs = realisasiKenaikan.segmen.map((s) => {
    const seg = { ...s, start };
    start += s.pct;
    return seg;
  });

  return (
    <span className="relative inline-flex" style={{ width: CX * 2, height: CY + 8 }}>
      <svg width={CX * 2} height={CY + 8}>
        <path d={d} fill="none" stroke="var(--surface-3)" strokeWidth={16} />
        {segs.map((s, i) => (
          <path
            key={s.label}
            d={d}
            fill="none"
            stroke={s.color}
            strokeWidth={16}
            strokeDasharray={`${on ? (LEN * s.pct) / 100 : 0} ${LEN + 2}`}
            strokeDashoffset={-((LEN * s.start) / 100)}
            style={{
              transition: `stroke-dasharray 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 250}ms`,
            }}
          />
        ))}
      </svg>
      <span className="absolute inset-x-0 bottom-[6px] flex flex-col items-center">
        <CountUp
          value={label}
          className="text-[21px] font-extrabold leading-none text-ink-900"
        />
        <span className="mt-[3px] text-[9px] text-ink-500">Realisasi</span>
      </span>
    </span>
  );
}

// warna dot rincian mengikuti segmen busur (baris pertama = total, tanpa dot)
const DOT = [null, ...realisasiKenaikan.segmen.map((s) => s.color)];

export function RealisasiKenaikanGaji() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>Realisasi Kenaikan Gaji</span><ScopeNote /></h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Status Kenaikan Gaji Tahunan 2026</p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="flex flex-1 justify-center">
          <HalfGauge label={realisasiKenaikan.label} />
        </div>

        <div className="flex w-[104px] shrink-0 flex-col gap-[7px]">
          {realisasiKenaikan.rincian.map((r, i) => (
            <div key={r.label} className="leading-[1.2]">
              <div className="flex items-center gap-1 text-[9px] text-ink-500">
                {DOT[i] && (
                  <span
                    className="h-[6px] w-[6px] shrink-0 rounded-full"
                    style={{ background: DOT[i] as string }}
                  />
                )}
                {r.label}
              </div>
              <div className="whitespace-nowrap">
                <span className="text-[12px] font-extrabold tabular-nums text-ink-900">
                  {r.value}
                </span>
                <span className="ml-1 text-[9px] text-ink-500">{r.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail realisasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
