"use client";

import { useState } from "react";
import { Info, ShieldCheck, X } from "lucide-react";
import { metodologi } from "@/lib/pm-data";

/** Pill versi metodologi + modal ⓘ berisi definisi, skala, sumber, dan governance skor. */
export function MethodologyInfo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 rounded-md bg-[#e8f1fd] px-1.5 py-[3px] text-[8.5px] font-bold text-[#2f6fe4] transition-opacity hover:opacity-80"
        title="Lihat metodologi People Math & HPI-BEM"
      >
        <Info size={10} />
        {metodologi.versi}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1b2d]/40 px-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="scroll-thin max-h-[82vh] w-[560px] overflow-y-auto rounded-2xl border border-[#eef2f6] bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-1.5 text-[12px] font-extrabold text-ink-900">
                <ShieldCheck size={14} className="text-ptpn-green" />
                Methodology — {metodologi.versi}
                <span className="rounded bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-bold text-ptpn-green">
                  Governed
                </span>
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-400 transition-colors hover:text-ink-900"
                aria-label="Tutup"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-3 space-y-3.5">
              {metodologi.sections.map((sec) => (
                <div key={sec.judul} className="rounded-xl border border-[#eef2f6] px-3.5 py-3">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.04em] text-ink-900">
                    {sec.judul}
                  </div>
                  <dl className="mt-2 space-y-1.5">
                    {sec.items.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                        <dt className="text-[9px] font-bold text-ink-500">{k}</dt>
                        <dd className="text-[9px] leading-[1.5] text-ink-700">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#fdf3e0] px-3 py-2">
              <Info size={12} className="shrink-0 text-[#d98b06]" />
              <span className="text-[8.5px] font-medium text-ink-700">{metodologi.disclaimer}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
