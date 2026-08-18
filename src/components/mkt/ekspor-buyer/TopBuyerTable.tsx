import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { topBuyers, topBuyersLainnya, type BuyerRow } from "@/lib/kontrak-buyer-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const TIPE_TONE: Record<BuyerRow["tipe"], BadgeTone> = {
  Domestik: "neutral",
  Ekspor: "info",
};

const TREN: Record<BuyerRow["tren"], { Icon: typeof Minus; cls: string; label: string }> = {
  up: { Icon: TrendingUp, cls: "text-ptpn-green", label: "Naik" },
  down: { Icon: TrendingDown, cls: "text-[#ef4444]", label: "Turun" },
  flat: { Icon: Minus, cls: "text-ink-400", label: "Stabil" },
};

const COLS = "grid-cols-[14px_minmax(0,1fr)_58px_50px_62px_38px_16px]";

/** 10 buyer terbesar + penanda konsentrasi pada top-5. */
export function TopBuyerTable() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      {/* Baris buyer tidak menyimpan dimensi komoditas — angka konsolidasi grup. */}
      <SectionHead title="Top 10 Buyer" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Serapan volume &amp; nilai per buyer — baris bertanda = top-5 (konsentrasi)
      </p>

      <div
        className={`mt-2 grid ${COLS} items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500`}
      >
        <span />
        <span>Buyer</span>
        <span className="text-right">Volume</span>
        <span className="text-right">Tipe</span>
        <span className="text-right">Nilai</span>
        <span className="text-right">Share</span>
        <span />
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
        {topBuyers.map((b, i) => {
          const top5 = i < 5;
          const { Icon, cls, label } = TREN[b.tren];
          return (
            <li
              key={b.nama}
              className={`grid ${COLS} items-center gap-x-2 rounded-lg border px-2 py-[2px] ${
                top5 ? "border-[#fbe3e3] bg-[#fef7f7]" : "border-[#eef2f6] bg-[#fbfcfd]"
              }`}
            >
              <span
                className={`text-[9px] font-extrabold ${top5 ? "text-[#ef4444]" : "text-ink-500"}`}
              >
                {i + 1}
              </span>
              <span className="truncate text-[9px] font-extrabold text-ink-900" title={b.nama}>
                {b.nama}
              </span>
              <span className="text-right text-[8.5px] font-semibold text-ink-500">
                {b.volumeRbTon.toLocaleString("id-ID")} rb t
              </span>
              <span className="flex justify-end">
                <ToneBadge label={b.tipe} tone={TIPE_TONE[b.tipe]} />
              </span>
              <span className="text-right text-[8.5px] font-extrabold text-ink-900">{b.nilai}</span>
              <span
                className={`text-right text-[8.5px] font-extrabold ${
                  top5 ? "text-[#ef4444]" : "text-ink-700"
                }`}
              >
                {b.sharePct}%
              </span>
              <span className={`flex justify-end ${cls}`} title={label}>
                <Icon size={10} strokeWidth={2.4} />
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Top-5 = 61% nilai (ambang risiko &gt; 50%) · {topBuyersLainnya.label} {topBuyersLainnya.nilai} (
        {topBuyersLainnya.sharePct}%).
      </p>
    </div>
  );
}
