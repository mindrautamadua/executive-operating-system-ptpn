"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "ecc-explore-open";

/**
 * Progressive disclosure untuk LAYER 3 · EXPLORE: intelijen mendalam bisa
 * dilipat supaya first read homepage berhenti di ACT + UNDERSTAND. Default
 * terbuka (maskot AI & kartu domain tetap terlihat); pilihan pengguna
 * disimpan di localStorage sehingga ritual baca tiap Direksi konsisten.
 */
export function ExploreDisclosure({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "closed") setOpen(false);
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      window.localStorage.setItem(STORAGE_KEY, prev ? "closed" : "open");
      return !prev;
    });
  };

  return (
    <>
      <div className="mb-2 mt-4 flex items-center gap-2">
        <span className="rounded bg-[#1b3a6b] px-1.5 py-[2px] text-[9px] font-extrabold tracking-[0.06em] text-white">
          LAYER 3
        </span>
        <h2 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Explore
        </h2>
        <span className="text-[9px] italic text-ink-500">Intelijen mendalam per domain.</span>
        <span className="h-px flex-1 bg-[#e3e9ef]" />
        <button
          onClick={toggle}
          className="flex shrink-0 items-center gap-1 rounded-md border border-[#e3e9ef] px-1.5 py-[3px] text-[8.5px] font-semibold text-ink-500 transition-colors hover:bg-[#f5f8fa]"
        >
          {open ? (
            <>
              Sembunyikan <ChevronUp size={10} />
            </>
          ) : (
            <>
              Tampilkan <ChevronDown size={10} />
            </>
          )}
        </button>
      </div>

      {open ? (
        children
      ) : (
        <button
          onClick={toggle}
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-[#dbe3ea] py-3 text-[9px] text-ink-500 transition-colors hover:bg-[#f5f8fa]"
        >
          Impact Chain · Operasi · Keuangan · Produksi · Forecast · Posisi Pasar CPO · Alerts ·
          External Signals · AI Insight — tersembunyi. Klik untuk membuka.
        </button>
      )}
    </>
  );
}
