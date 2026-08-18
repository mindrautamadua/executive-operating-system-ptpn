import { Lock, Wallet } from "lucide-react";
import { kompensasiPosisi } from "@/lib/profil-data";

/**
 * Posisi kompensasi sebagai rasio (compa-ratio) — cukup untuk keputusan
 * retensi/promosi di level direksi, tanpa membuka nominal gaji.
 */
export function KompensasiPosisiCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <Wallet size={13} className="text-[#d98b06]" />
        Posisi Kompensasi
      </h3>

      <div className="mt-2.5 flex items-center gap-4">
        <div className="shrink-0 rounded-xl border border-[#eef2f6] px-4 py-3 text-center">
          <div className="text-[8.5px] font-semibold text-ink-500">Compa-Ratio</div>
          <div className="mt-1 text-[24px] font-extrabold leading-none text-ink-900">
            {kompensasiPosisi.compaRatio}
          </div>
          <div className="mt-1 text-[9px] text-ink-500">1,00 = titik tengah range</div>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5 text-[9px]">
          <div className="flex items-start justify-between gap-2">
            <span className="shrink-0 text-ink-500">Posisi dalam Range</span>
            <span className="text-right font-bold text-ink-900">{kompensasiPosisi.posisiRange}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="shrink-0 text-ink-500">vs Pasar</span>
            <span className="text-right font-bold text-[#c07c05]">{kompensasiPosisi.vsPasar}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="shrink-0 text-ink-500">Penyesuaian Terakhir</span>
            <span className="text-right font-semibold text-ink-700">
              {kompensasiPosisi.kenaikanTerakhir}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-2.5 rounded-lg bg-[#fdf6e7] px-3 py-2 text-[9px] leading-snug text-ink-700">
        <span className="font-bold text-ink-900">Implikasi: </span>
        {kompensasiPosisi.implikasi}
      </p>

      <p className="mt-auto flex items-start gap-1.5 pt-1.5 text-[9px] leading-snug text-ink-500">
        <Lock size={10} className="mt-[1px] shrink-0" />
        {kompensasiPosisi.privasi}
      </p>
    </div>
  );
}
