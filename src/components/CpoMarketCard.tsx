import { TrendingUp } from "lucide-react";
import { cpoMarketPosition } from "@/lib/ceo-data";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[8.5px] text-ink-500">{label}</span>
      <span
        className={`text-[9.5px] font-bold tabular-nums ${
          strong ? "text-ptpn-green" : "text-ink-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Posisi pasar CPO sebagai satu kartu keputusan: premium spot atas ASP YTD,
 * volume belum terjual, eksposur, dan rekomendasi hedge. Menyatukan informasi
 * yang tersebar di Market Pulse, External Signals, dan Risk-to-Value sampai
 * ke baris keputusan.
 */
export function CpoMarketCard() {
  const m = cpoMarketPosition;
  return (
    <div className="card flex h-full flex-col px-4 pb-2.5 pt-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="card-title whitespace-nowrap">POSISI PASAR CPO</h3>
        <span className="flex shrink-0 items-center gap-1 rounded bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-bold text-ptpn-green">
          <TrendingUp size={9} /> Premium {m.premium}
        </span>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-[4px]">
        <Row label="ASP YTD (realisasi)" value={m.aspYtd} />
        <Row label="Spot KPBN" value={m.spot} strong />
        <Row label="Volume belum terjual" value={m.unhedged} />
        <Row label="Eksposur ±5% harga" value={m.exposure} />
      </div>

      <p className="mt-1 border-t border-[#eef2f6] pt-1 text-[9px] leading-[1.35] text-ink-500">
        <span className="font-bold text-ink-700">Keputusan: </span>
        {m.decision} · <span className="font-semibold">{m.owner}</span>
      </p>
    </div>
  );
}
