"use client";

import { Info } from "lucide-react";
import { useSubholding } from "@/components/SubholdingProvider";

/**
 * Penanda kecil pada kartu yang angkanya TIDAK ikut menyesuaikan filter
 * subholding. Hanya muncul saat filter aktif, supaya pembaca tahu ia sedang
 * melihat angka konsolidasi grup, bukan angka subholding terpilih.
 */
export function ScopeNote({ className = "" }: { className?: string }) {
  const { isFiltered } = useSubholding();
  if (!isFiltered) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-semibold text-ink-500 ${className}`}
      title="Kartu ini menampilkan angka konsolidasi grup; pecahan per subholding belum tersedia."
    >
      <Info size={9} strokeWidth={2} />
      Konsolidasi grup
    </span>
  );
}

/**
 * Bilah cakupan di bawah header modul: menegaskan subholding yang sedang
 * ditampilkan dan menyediakan jalan cepat kembali ke tampilan konsolidasi.
 */
export function ScopeBanner() {
  const { isFiltered, def, setActive } = useSubholding();
  if (!isFiltered) return null;

  return (
    <div className="mb-3 flex items-center gap-2 rounded-xl border border-ptpn-green bg-ptpn-greenLight px-3 py-2">
      <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ptpn-green">
        Cakupan
      </span>
      <span className="text-[10.5px] font-bold text-ink-900">{def.fullLabel}</span>
      <span className="text-[9px] text-ink-500">
        Kartu yang punya pecahan subholding menyesuaikan otomatis; sisanya ditandai
        &ldquo;Konsolidasi grup&rdquo;.
      </span>
      <button
        type="button"
        onClick={() => setActive("all")}
        className="ml-auto shrink-0 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[5px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green"
      >
        Tampilkan semua
      </button>
    </div>
  );
}
