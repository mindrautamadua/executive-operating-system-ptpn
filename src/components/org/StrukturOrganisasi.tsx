"use client";

import { useState } from "react";
import { ChevronRight, Minus, Plus, Users } from "lucide-react";
import {
  NODE_TONE_CLASS,
  strukturAnakPerusahaan,
  strukturDivisi,
  strukturSubHolding,
  type OrgNode,
} from "@/lib/org-data";

/** batang vertikal penghubung antar level; `at` = posisi horizontal (%) */
function Stem({ h = 12, at = 50 }: { h?: number; at?: number }) {
  return (
    <div className="relative" style={{ height: h }}>
      <span
        className="absolute top-0 w-px bg-[#d7e0e8]"
        style={{ left: `${at}%`, height: h }}
      />
    </div>
  );
}

/** cabang mendatar dengan turunan vertikal ke tiap anak */
function Fork({ n, h = 12 }: { n: number; h?: number }) {
  if (n <= 1) return <Stem h={h} />;
  return (
    <div className="flex w-full" style={{ height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="relative flex-1">
          <span
            className="absolute top-0 h-px bg-[#d7e0e8]"
            style={{
              left: i === 0 ? "50%" : 0,
              right: i === n - 1 ? "50%" : 0,
            }}
          />
          <span
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#d7e0e8]"
            style={{ height: h }}
          />
        </div>
      ))}
    </div>
  );
}

function NodeBox({ node }: { node: OrgNode }) {
  return (
    <div
      className={`${NODE_TONE_CLASS[node.tone]} mx-auto flex w-full max-w-[104px] cursor-default items-center justify-center rounded-lg px-1.5 py-[7px] text-center text-[9px] font-semibold leading-[1.25] ring-1 ring-inset ring-black/5 transition-all duration-150 hover:scale-[1.05] hover:shadow-cardHover`}
    >
      {node.label}
    </div>
  );
}

const ZOOM_STEPS = [0.8, 1, 1.2];

export function StrukturOrganisasi() {
  const [zoom, setZoom] = useState(1);
  const zoomBy = (dir: 1 | -1) => {
    setZoom((z) => {
      const i = ZOOM_STEPS.indexOf(z);
      return ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, Math.max(0, i + dir))];
    });
  };

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Struktur Organisasi</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">Hierarki Holding &amp; Anak Perusahaan</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button className="rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[10px] font-semibold text-ink-700 transition-colors hover:bg-[#f7f9fb] active:bg-[#f2f5f8]">
            Expand All
          </button>
        </div>
      </div>

      <div className="relative mt-2 min-h-0 flex-1 overflow-hidden">
        {/* kontrol zoom mengambang — CSS scale sederhana */}
        <div className="absolute right-0 top-0 z-10 flex flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white shadow-card">
          <button
            className="flex h-[22px] w-[22px] items-center justify-center text-ink-500 transition-colors hover:bg-[#f7f9fb] disabled:opacity-40"
            aria-label="Perbesar diagram"
            disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
            onClick={() => zoomBy(1)}
          >
            <Plus size={12} />
          </button>
          <button
            className="flex h-[22px] w-[22px] items-center justify-center border-t border-[#eef2f6] text-ink-500 transition-colors hover:bg-[#f7f9fb] disabled:opacity-40"
            aria-label="Perkecil diagram"
            disabled={zoom <= ZOOM_STEPS[0]}
            onClick={() => zoomBy(-1)}
          >
            <Minus size={12} />
          </button>
        </div>

        <div
          className="flex h-full flex-col justify-start px-1 pt-1 transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
        >
          {/* level 1 — holding */}
          <div className="flex justify-center">
            <div className="tone-green flex items-center gap-2 rounded-lg px-3 py-[7px] ring-1 ring-inset ring-black/5 transition-all duration-150 hover:scale-[1.03] hover:shadow-cardHover">
              <Users size={13} className="shrink-0" />
              <div className="text-center leading-[1.25]">
                <div className="text-[9px] font-bold">
                  PT Perkebunan Nusantara III (Persero)
                </div>
                <div className="text-[9px] opacity-80">(Holding)</div>
              </div>
            </div>
          </div>

          <Stem h={12} />
          <Fork n={strukturDivisi.length} h={12} />

          {/* level 2 — divisi */}
          <div className="grid grid-cols-5 gap-2">
            {strukturDivisi.map((n) => (
              <NodeBox key={n.label} node={n} />
            ))}
          </div>

          {/* level 3 — sub holding; batang penghubung turun dari kolom
              Divisi Operasional (kolom pertama), bukan dari tengah blok */}
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <Stem h={12} at={16.67} />
              <Fork n={strukturSubHolding.length} h={12} />
              <div className="grid grid-cols-3 gap-2">
                {strukturSubHolding.map((n) => (
                  <NodeBox key={n.label} node={n} />
                ))}
              </div>
            </div>
          </div>

          {/* level 4 — anak perusahaan */}
          <Stem h={12} />
          <Fork n={strukturAnakPerusahaan.length} h={12} />
          <div className="grid grid-cols-6 gap-2">
            {strukturAnakPerusahaan.map((l) => (
              <div
                key={l.label}
                className={`rounded-lg border px-1 py-[8px] text-center transition-all duration-150 hover:scale-[1.04] hover:shadow-cardHover ${
                  l.muted
                    ? "border-[#e3e9ef] bg-[#f6f8fa]"
                    : "border-[#e6ecf2] bg-white shadow-card"
                }`}
              >
                <div
                  className={`text-[9px] font-semibold ${
                    l.muted ? "text-ink-500" : "text-ink-700"
                  }`}
                >
                  {l.label}
                </div>
                {l.value && (
                  <div className="mt-[2px] text-[13px] font-extrabold leading-none text-ink-900">
                    {l.value}
                  </div>
                )}
                <div className="mt-[3px] text-[9px] leading-[1.2] text-ink-500">{l.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="link-more mt-auto flex items-center gap-1 self-start pt-2">
        Lihat seluruh struktur organisasi <ChevronRight size={11} />
      </button>
    </div>
  );
}
