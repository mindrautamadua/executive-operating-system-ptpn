"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ISLANDS, MAP_H, REGION_ANCHORS, CHOROPLETH_RAMP } from "@/lib/indonesia";
import { mapLegend, regional, totalFasilitas, type RegionalItem } from "@/lib/data";
import { DetailLink } from "./DetailLink";

const MAP_W = 1000;

/** Peta dibaca dari kiri ke kanan; tooltip di sisi kanan layar dibalik arahnya. */
const BALIK_TOOLTIP_X = 680;

const byId = new Map(regional.map((r) => [r.id, r]));

/**
 * Radius penanda gugus menyandi jumlah fasilitas dengan skala akar.
 *
 * Akar, bukan linear: mata membaca luas lingkaran, bukan jari-jarinya, jadi
 * skala linear melebih-lebihkan wilayah besar sampai dua kali lipat.
 */
const maxFasilitas = Math.max(...regional.map((r) => r.totalFasilitas));
const radius = (n: number) => 13 + 13 * Math.sqrt(n / maxFasilitas);

const tujuan = (r: RegionalItem) => r.diagnosis ?? "/produksi-operasi";

export function IndonesiaMap() {
  const router = useRouter();
  const [aktif, setAktif] = useState<RegionalItem | null>(null);

  return (
    <div className="card flex h-full flex-col px-4 pb-3 pt-3">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="card-title whitespace-nowrap">SEBARAN OPERASI GRUP</h3>
        <div className="flex shrink-0 items-baseline gap-2">
          <span className="text-[9px] text-ink-500">Pendapatan YTD 2026</span>
          <DetailLink href="/produksi-operasi" />
        </div>
      </div>

      {/* Panggung peta mengunci rasio geometri, jadi tidak ada kanvas terbuang
          dan posisi tooltip dalam persen selalu jatuh tepat di atas penanda. */}
      <div className="relative mt-2 w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="h-full w-full overflow-visible"
          role="img"
          aria-label={`Peta sebaran operasi PTPN Group: ${regional.length} regional, ${totalFasilitas} fasilitas. Warna wilayah menyandi pendapatan YTD 2026.`}
        >
          {ISLANDS.map((is) => {
            const r = byId.get(is.region);
            return (
              <path
                key={is.id}
                d={is.d}
                fill={r?.color ?? CHOROPLETH_RAMP[0]}
                stroke="var(--map-stroke)"
                strokeWidth="0.8"
                strokeLinejoin="round"
                opacity={aktif && aktif.id !== is.region ? 0.45 : 1}
                style={{ transition: "opacity 150ms" }}
              />
            );
          })}

          {regional.map((r) => {
            const a = REGION_ANCHORS[r.id];
            const rad = radius(r.totalFasilitas);
            const on = aktif?.id === r.id;
            return (
              <g
                key={r.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer focus:outline-none"
                aria-label={`${r.name}: pendapatan ${r.value}, ${r.totalFasilitas} fasilitas`}
                onMouseEnter={() => setAktif(r)}
                onMouseLeave={() => setAktif(null)}
                onFocus={() => setAktif(r)}
                onBlur={() => setAktif(null)}
                onClick={() => router.push(tujuan(r))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(tujuan(r));
                  }
                }}
              >
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={rad}
                  fill="#ffffff"
                  fillOpacity={on ? 1 : 0.92}
                  stroke="#0f7a44"
                  strokeWidth={on ? 3 : 1.6}
                />
                <text
                  x={a.x}
                  y={a.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill="#0f7a44"
                >
                  R{r.id}
                </text>
                <text
                  x={a.x}
                  y={a.y + rad + 13}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="var(--text-2)"
                  paintOrder="stroke"
                  stroke="var(--surface)"
                  strokeWidth="4"
                  strokeLinejoin="round"
                >
                  {r.value}
                </text>
              </g>
            );
          })}
        </svg>

        {aktif && (
          <div
            className="pointer-events-none absolute z-20 w-[172px] rounded-lg border border-[#e3e9ef] bg-white p-2.5 shadow-cardHover"
            style={{
              left: `${(REGION_ANCHORS[aktif.id].x / MAP_W) * 100}%`,
              top: `${(REGION_ANCHORS[aktif.id].y / MAP_H) * 100}%`,
              transform:
                REGION_ANCHORS[aktif.id].x > BALIK_TOOLTIP_X
                  ? "translate(-100%, -108%)"
                  : "translate(0, -108%)",
            }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10px] font-bold text-ink-900">{aktif.name}</span>
              <span
                className={`text-[9.5px] font-bold ${
                  aktif.trend === "up" ? "delta-good" : "delta-bad"
                }`}
              >
                {aktif.delta}
              </span>
            </div>
            <div className="mt-0.5 text-[12px] font-extrabold tabular-nums text-ink-900">
              {aktif.value}
            </div>
            <dl className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-[2px] border-t border-[#f2f5f8] pt-1.5 text-[9px]">
              {(
                [
                  ["Kebun", aktif.fasilitas.kebun],
                  ["Pabrik", aktif.fasilitas.pabrik],
                  ["Terminal", aktif.fasilitas.terminal],
                  ["Pelabuhan", aktif.fasilitas.pelabuhan],
                ] as const
              ).map(([label, n]) => (
                <div key={label} className="flex justify-between gap-1">
                  <dt className="text-ink-500">{label}</dt>
                  <dd className="font-bold tabular-nums text-ink-700">{n}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {/* Legenda: skala warna menerangkan isian wilayah, hitungan fasilitas
          menerangkan ukuran penanda. Keduanya diturunkan dari data yang sama
          dengan yang digambar, jadi angka legenda tidak bisa menyimpang. */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-1.5 pt-2">
        <div>
          <div className="muted-label">PENDAPATAN YTD</div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[8.5px] text-ink-500">Rendah</span>
            <span className="flex overflow-hidden rounded-[3px]">
              {CHOROPLETH_RAMP.map((c) => (
                <span key={c} className="h-[8px] w-[18px]" style={{ background: c }} />
              ))}
            </span>
            <span className="text-[8.5px] text-ink-500">Tinggi</span>
          </div>
        </div>

        <div className="flex items-end gap-3">
          {mapLegend.map((l) => (
            <div key={l.label} className="text-right">
              <div className="text-[8.5px] text-ink-500">{l.label}</div>
              <div className="text-[13px] font-extrabold tabular-nums text-ink-900">
                {l.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
