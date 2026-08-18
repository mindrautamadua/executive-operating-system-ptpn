"use client";

import { salesBySubholding } from "@/lib/pemasaran-data";
import { PALETTE } from "@/lib/chart-palette";
import { toSubholdingId } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ToneBadge } from "@/components/shared/ToneBadge";

const COLORS = [PALETTE.green, PALETTE.amber, PALETTE.navy];

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/** Kontribusi penjualan per subholding: stacked bar share + capaian RKAP. */
export function SalesBySubholding() {
  const { active } = useSubholding();
  // Baris sudah punya kolom subholding eksplisit; subholding di luar cakupan
  // diredupkan (bukan dihapus) agar konteks perbandingan grup tetap terbaca.
  const dimmed = (name: string) => active !== "all" && toSubholdingId(name) !== active;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Penjualan per Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi nilai penjualan YTD Rp 19,9 T per subholding
      </p>

      {/* Stacked bar share nilai */}
      <div className="mt-2.5 flex h-[16px] w-full overflow-hidden rounded-full">
        {salesBySubholding.map((s, i) => (
          <div
            key={s.name}
            className="flex items-center justify-center"
            style={{
              width: `${s.sharePct}%`,
              background: COLORS[i],
              opacity: dimmed(s.name) ? 0.25 : 1,
            }}
            title={`${s.name} · ${pct(s.sharePct)}`}
          >
            <span className="text-[7.5px] font-bold text-white">{pct(s.sharePct)}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 gap-3">
        {salesBySubholding.map((s, i) => (
          <div
            key={s.name}
            className="flex min-w-0 flex-col justify-between rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2"
            style={{ opacity: dimmed(s.name) ? 0.25 : 1 }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ background: COLORS[i] }}
              />
              <span className="truncate text-[9.5px] font-extrabold text-ink-900">{s.name}</span>
            </div>
            <div className="mt-1 flex items-end justify-between gap-2">
              <span className="text-[15px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                Rp {s.nilai.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T
              </span>
              <ToneBadge
                label={`${pct(s.rkapPct)} RKAP`}
                tone={s.rkapPct >= 100 ? "good" : s.rkapPct >= 95 ? "warn" : "bad"}
              />
            </div>
            <p className="mt-1 truncate text-[9px] text-ink-500" title={s.komoditasUtama}>
              {s.komoditasUtama}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
