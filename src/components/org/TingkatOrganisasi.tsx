"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { tingkatOrganisasi } from "@/lib/org-data";

const W = 200;
const H = 100;
const HALF = 96;

/**
 * Tinggi pita PROPORSIONAL terhadap pct dengan lantai minimum agar label
 * pita tersempit tetap terbaca: h = FLOOR + pct × sisa. Urutan visual
 * tetap konsisten dengan urutan nilai.
 */
const FLOOR = 8;
const SCALE = (100 - FLOOR * tingkatOrganisasi.length) / 100;

const bands = (() => {
  let acc = 0;
  return tingkatOrganisasi.map((l) => {
    const h = ((FLOOR + l.pctValue * SCALE) / 100) * H;
    const y0 = acc;
    acc += h;
    const y1 = acc;
    return { ...l, y0, y1, mid: (y0 + y1) / 2 };
  });
})();

const halfAt = (y: number) => (y / H) * HALF;

export function TingkatOrganisasi() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Tingkat Organisasi</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Distribusi Jabatan berdasarkan Level</p>

      <div className="relative mt-1 flex min-h-0 flex-1 items-stretch">
        <div className="relative min-h-0 flex-1">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
            {bands.map((b, i) => {
              const t = halfAt(b.y0);
              const btm = halfAt(b.y1);
              return (
                <polygon
                  key={b.level}
                  points={`${W / 2 - t},${b.y0} ${W / 2 + t},${b.y0} ${W / 2 + btm},${b.y1} ${
                    W / 2 - btm
                  },${b.y1}`}
                  fill={b.color}
                  stroke="var(--surface)"
                  strokeWidth={0.8}
                  className="anim-grow-x"
                  style={
                    {
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      opacity: active === null || active === i ? 1 : 0.35,
                      transition: "opacity .2s",
                      "--d": `${i * 90}ms`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                />
              );
            })}
          </svg>

          {/* tooltip hover: jumlah + persentase */}
          {active !== null && (
            <div
              className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-[#e3e9ef] bg-white px-2 py-1 text-[9px] shadow-cardHover"
              style={{ top: `${(bands[active].mid / H) * 100}%` }}
            >
              <span className="font-bold text-ink-900">{bands[active].level}</span>{" "}
              <span className="text-ink-700">
                {bands[active].value} jabatan ({bands[active].pct})
              </span>
            </div>
          )}
        </div>

        <div className="relative w-[122px] shrink-0">
          {bands.map((b, i) => (
            <div
              key={b.level}
              className="absolute right-0 flex -translate-y-1/2 items-baseline gap-1 whitespace-nowrap transition-opacity duration-150"
              style={{
                top: `${(b.mid / H) * 100}%`,
                opacity: active === null || active === i ? 1 : 0.4,
              }}
            >
              <span className="text-[9px] text-ink-500">{b.level}</span>
              <span className="text-[9.5px] font-bold text-ink-900">{b.value}</span>
              <span className="text-[9px] text-ink-500">({b.pct})</span>
            </div>
          ))}
        </div>
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat detail level organisasi <ChevronRight size={11} />
      </button>
    </div>
  );
}
