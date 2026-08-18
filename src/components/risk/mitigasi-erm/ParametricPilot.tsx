import { CloudRain } from "lucide-react";
import { parametricPilot } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

/** Pilot asuransi parametrik indeks curah hujan (transfer risiko iklim). */
export function ParametricPilot() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Pilot Asuransi Parametrik Iklim" action="Lihat Skema" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Transfer Risiko Berbasis Indeks Curah Hujan — {parametricPilot.length} Regional Pilot
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-2">
        {parametricPilot.map((p) => (
          <li
            key={p.regional}
            className="shrink-0 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2"
          >
            <div className="flex items-center gap-1.5">
              <CloudRain size={12} strokeWidth={1.9} className="shrink-0 text-[#2f6fe4]" />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-bold text-ink-900">
                {p.regional}
              </span>
              <ToneBadge label={p.status} tone={p.status === "Aktif" ? "good" : "warn"} />
            </div>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
              <span className="min-w-0">
                <span className="block truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
                  Indeks
                </span>
                <span className="mt-[1px] block truncate text-[8.5px] font-semibold text-ink-700">
                  {p.indeks}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
                  Pemicu Payout
                </span>
                <span className="mt-[1px] block truncate text-[8.5px] font-semibold text-ink-700">
                  {p.pemicu}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
                  Payout Maks
                </span>
                <span className="mt-[1px] block truncate text-[10px] font-extrabold text-ptpn-green">
                  {p.payoutMaks}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Usulan perluasan ke 6 regional prioritas (premi Rp 28 M/tahun) menunggu keputusan Direksi
        sebelum puncak musim kering.
      </p>
    </div>
  );
}
