"use client";

import { useState, type ReactNode } from "react";

/**
 * 9-Box Talent Grid bersama (Talent Analytics & Succession Planning).
 * Nama sel & tone dibakukan di sini; tiap halaman hanya mengirim angkanya
 * dalam urutan kanonik: baris atas = potensi tinggi, kolom kanan = kinerja
 * tinggi. Total diturunkan dari data — tidak pernah di-hardcode.
 */

const CELLS: { nama: string; tone: string }[] = [
  { nama: "Enigma", tone: "nb-amber" },
  { nama: "High Potential", tone: "nb-green-soft" },
  { nama: "Star Talent", tone: "nb-green" },
  { nama: "Question Mark", tone: "nb-amber" },
  { nama: "Core Player", tone: "nb-green-pale" },
  { nama: "High Performer", tone: "nb-green-soft" },
  { nama: "Low Performer", tone: "nb-red" },
  { nama: "Inconsistent Player", tone: "nb-amber" },
  { nama: "Solid Performer", tone: "nb-green-pale" },
];

const POTENSI = ["Tinggi", "Menengah", "Rendah"];
const KINERJA = ["Rendah", "Menengah", "Tinggi"];

const fmt = (n: number) => n.toLocaleString("id-ID");
const pctOf = (v: number, total: number) =>
  ((v / total) * 100).toFixed(1).replace(".", ",");

export function NineBoxGrid({
  title,
  subtitle,
  values,
  totalLabel = "Total Talenta",
  footer,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  /** 9 angka dalam urutan kanonik (lihat CELLS). */
  values: number[];
  totalLabel?: string;
  /** Slot kanan pada footer (mis. tautan detail). */
  footer?: ReactNode;
  delay?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const total = values.reduce((s, v) => s + v, 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <h3 className="card-title-navy">{title}</h3>
      {subtitle && <p className="mt-[3px] text-[9.5px] text-ink-500">{subtitle}</p>}

      <div className="mt-2 flex min-h-0 flex-1 gap-1.5">
        {/* sumbu potensi */}
        <div className="flex w-[52px] shrink-0 flex-col">
          <div className="flex flex-1">
            <span className="flex w-[13px] items-center justify-center">
              <span className="whitespace-nowrap text-[9px] font-semibold tracking-[0.12em] text-ink-500 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                POTENSI
              </span>
            </span>
            <div className="flex flex-1 flex-col justify-between py-1 text-right">
              {POTENSI.map((p) => (
                <span key={p} className="text-[9px] text-ink-500">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="h-[26px]" />
        </div>

        {/* grid */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-1.5">
            {CELLS.map((c, i) => {
              const v = values[i] ?? 0;
              const on = hover === i;
              const sel = selected === i;
              return (
                <button
                  type="button"
                  key={c.nama}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setSelected(sel ? null : i)}
                  className={`relative flex cursor-pointer flex-col items-center justify-center rounded-md border px-1 py-1 transition-all duration-150 ${c.tone} ${
                    on ? "z-10 scale-[1.04] shadow-cardHover" : ""
                  } ${sel ? "ring-2 ring-ptpn-green ring-offset-1" : ""}`}
                >
                  <span className="text-center text-[9px] font-semibold leading-[1.15] text-ink-700">
                    {c.nama}
                  </span>
                  <span className="mt-[3px] text-[14px] font-extrabold leading-none text-ink-900">
                    {fmt(v)}
                  </span>
                  <span className="mt-[2px] text-[9px] text-ink-500">
                    {pctOf(v, total)}%
                  </span>

                  {/* tooltip hover */}
                  {on && (
                    <span className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-[#e3e9ef] bg-white px-2 py-1 text-[9px] font-medium text-ink-700 shadow-cardHover">
                      <span className="font-bold text-ink-900">{c.nama}</span>: {fmt(v)}{" "}
                      orang ({pctOf(v, total)}% dari total)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* sumbu kinerja */}
          <div className="mt-1 grid grid-cols-3 text-center text-[9px] text-ink-500">
            {KINERJA.map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
          <div className="mt-[2px] text-center text-[9px] font-semibold tracking-[0.12em] text-ink-500">
            KINERJA
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-[#f2f5f8] pt-2">
        <span className="text-[9.5px] text-ink-500">
          {totalLabel}: <strong className="font-bold text-ink-900">{fmt(total)}</strong>
        </span>
        {footer}
      </div>
    </div>
  );
}
