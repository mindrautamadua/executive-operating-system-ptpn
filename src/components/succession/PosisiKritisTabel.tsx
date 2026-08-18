"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, UserSearch, X } from "lucide-react";
import {
  posisiKritis,
  RISK_STYLE,
  successorFit,
  type PosisiKritis,
} from "@/lib/succession-data";
import { ModalShell } from "@/components/ui/ModalShell";
import { SEMANTIC } from "@/lib/chart-palette";
import { PersonAvatar } from "../ui/PersonAvatar";

/** Skala bar bench strength (nilai maksimum tampilan). */
const BENCH_MAX = 2;

const FLIGHT_STYLE: Record<string, string> = {
  Rendah: "tone-green",
  Sedang: "tone-amber",
  Tinggi: "tone-red",
};

/** Modal drilldown role–successor fit untuk satu posisi kritis. */
function FitModal({ posisi, onClose }: { posisi: PosisiKritis; onClose: () => void }) {
  const kandidat = successorFit[posisi.posisi];

  return (
    <ModalShell label={`Role–Successor Fit — ${posisi.posisi}`} onClose={onClose}>
        <div className="flex items-start justify-between gap-3">
          <div className="leading-tight">
            <h3 className="flex items-center gap-1.5 text-[12px] font-extrabold text-ink-900">
              <UserSearch size={14} className="text-ptpn-green" />
              Role–Successor Fit — {posisi.posisi}
            </h3>
            <div className="mt-1 text-[9px] text-ink-500">
              {posisi.unit} • Bench {posisi.bench} • {posisi.kandidat} kandidat siap •
              estimasi kesiapan terdekat: {posisi.estSiap}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 transition-colors hover:text-ink-900"
            aria-label="Tutup"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {!kandidat?.length && (
            <div className="rounded-xl border border-dashed border-[#e3e9ef] px-4 py-6 text-center text-[10px] text-ink-500">
              Belum ada kandidat ternominasi untuk posisi ini.
              <br />
              <span className="font-semibold text-ink-700">
                Rekomendasi: mulai identifikasi dari talent pool HiPo (1.245 orang).
              </span>
            </div>
          )}

          {kandidat?.map((k) => (
            <div key={k.nama} className="rounded-xl border border-[#eef2f6] px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <PersonAvatar seed={k.seed} size={32} name={k.nama} className="ring-1 ring-[#eef2f6]" />
                <div className="min-w-0 leading-tight">
                  <div className="truncate text-[10.5px] font-bold text-ink-900">
                    {k.nama}
                  </div>
                  <div className="truncate text-[9px] text-ink-500">{k.jabatan}</div>
                </div>
                <span
                  className={`ml-auto inline-flex shrink-0 items-center rounded px-1.5 py-[2px] text-[8.5px] font-bold leading-none ${
                    k.status === "Siap Sekarang" ? "tone-green" : "tone-blue"
                  }`}
                >
                  {k.status}
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
                {(
                  [
                    ["Performance", `${k.performance} / 5`],
                    ["Potential", `${k.potential} / 10`],
                    ["Skill Match", `${k.skillMatch}%`],
                    ["Readiness", `${k.readiness}%`],
                    ["Est. Siap", k.estSiap],
                  ] as const
                ).map(([label, val]) => (
                  <div key={label} className="leading-tight">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
                      {label}
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold tabular-nums text-ink-900">
                      {val}
                    </div>
                  </div>
                ))}
                <div className="leading-tight">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
                    Flight Risk
                  </div>
                  <span
                    className={`mt-0.5 inline-flex items-center rounded px-1.5 py-[2px] text-[8.5px] font-bold leading-none ${FLIGHT_STYLE[k.flightRisk]}`}
                  >
                    {k.flightRisk}
                  </span>
                </div>
              </div>

              {/* bar readiness */}
              <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-[#f1f5f8]">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${k.readiness}%`,
                    background: k.readiness >= 85 ? SEMANTIC.good : SEMANTIC.warn,
                  }}
                />
              </div>

              {k.gaps.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[8.5px] font-bold text-ink-500">Gap:</span>
                  {k.gaps.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center rounded bg-[#fdf3e0] px-1.5 py-[2px] text-[8.5px] font-semibold leading-none text-[#a16207]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-2 text-[9px] leading-[1.45] text-ink-700">
                <span className="font-bold text-ink-900">Rekomendasi: </span>
                {k.rekomendasi}
              </p>
            </div>
          ))}
        </div>
    </ModalShell>
  );
}

export function PosisiKritisTabel() {
  const [detail, setDetail] = useState<PosisiKritis | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Posisi Kritis dengan Risiko Kekosongan</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          Top 10 Posisi <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        {/* leading-none: tanpa ini tiap <tr> mewarisi line-height 24px dan baris jadi tinggi */}
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full table-fixed border-collapse leading-none">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[9px] font-semibold text-ink-500">
              <th className="w-[27%] pb-1.5 text-left">Posisi Kritis</th>
              <th className="w-[23%] pb-1.5 text-left">Unit Organisasi</th>
              <th className="w-[12%] pb-1.5 text-left">Risk Level</th>
              <th className="w-[18%] pb-1.5 text-right">Bench Strength</th>
              <th className="w-[10%] pb-1.5 text-right">Kandidat Siap</th>
              <th className="w-[10%] pb-1.5 text-right">Est. Siap</th>
            </tr>
          </thead>
          <tbody>
            {posisiKritis.map((p, i) => {
              const kosongKritis = p.kandidat === 0 && p.risk === "Tinggi";
              return (
                <tr
                  key={p.posisi + p.unit}
                  onClick={() => setDetail(p)}
                  title="Klik untuk lihat role–successor fit"
                  className="h-[19px] cursor-pointer border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
                >
                  <td className="truncate py-0 pr-1 text-[9px] font-semibold leading-none text-ink-900">
                    <span className="flex items-center gap-1.5">
                      {kosongKritis && (
                        <span
                          className="animate-pulseDot h-[6px] w-[6px] shrink-0 rounded-full bg-[#ef4444]"
                          title="Tanpa kandidat siap & risiko tinggi"
                        />
                      )}
                      <span className="truncate">{p.posisi}</span>
                    </span>
                  </td>
                  <td className="truncate py-0 pr-1 text-[9px] leading-none text-ink-500">
                    {p.unit}
                  </td>
                  <td className="py-0">
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-[1.5px] text-[9px] font-semibold leading-none ${RISK_STYLE[p.risk]}`}
                    >
                      {p.risk}
                    </span>
                  </td>
                  <td className="py-0 text-right">
                    {/* bar mini vs target 1,0 (penanda di tengah skala 0-2) */}
                    <span className="inline-flex items-center justify-end gap-1.5">
                      <span className="relative h-[5px] w-[44px] overflow-hidden rounded-full bg-[#f1f5f8]">
                        <span
                          className="anim-grow-x absolute inset-y-0 left-0 rounded-full"
                          style={
                            {
                              width: `${(p.benchVal / BENCH_MAX) * 100}%`,
                              background:
                                p.benchVal < 1 ? SEMANTIC.bad : SEMANTIC.good,
                              "--d": `${480 + i * 40}ms`,
                            } as React.CSSProperties
                          }
                        />
                        <span className="absolute inset-y-0 left-1/2 w-[1.5px] bg-[#c3ccd8]" />
                      </span>
                      <span className="w-[16px] text-[9px] leading-none tabular-nums text-ink-700">
                        {p.bench}
                      </span>
                    </span>
                  </td>
                  <td className="py-0 text-right text-[9px] font-semibold leading-none tabular-nums text-ink-900">
                    {p.kandidat}
                  </td>
                  <td
                    className={`py-0 text-right text-[9px] font-semibold leading-none tabular-nums ${
                      p.estSiap === "Siap" ? "text-ptpn-green" : "text-[#dc2626]"
                    }`}
                  >
                    {p.estSiap}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      <Link href="/succession-planning/posisi-kritis" className="link-more mt-1.5 flex cursor-pointer items-center gap-0.5">
        Lihat semua posisi kritis <ChevronRight size={12} />
      </Link>

      {detail && <FitModal posisi={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}
