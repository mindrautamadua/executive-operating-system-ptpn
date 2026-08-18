import { kontrakMaturity } from "@/lib/kontrak-buyer-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

const MAX_KONTRAK = Math.max(...kontrakMaturity.map((m) => m.kontrak));

/** Ladder jatuh tempo delivery kontrak per kuartal (214 kontrak aktif). */
export function KontrakMaturityLadder() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      {/* Jadwal delivery direkap lintas komoditas — angka konsolidasi grup. */}
      <SectionHead title="Maturity Kontrak" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jadwal delivery 214 kontrak aktif per kuartal
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {kontrakMaturity.map((m) => (
          <li key={m.kuartal} className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9.5px] font-extrabold text-ink-900">{m.kuartal}</span>
              <span className="text-[8.5px] text-ink-500">
                <span className="font-bold text-ink-900">{m.kontrak}</span> kontrak ·{" "}
                <span className="font-bold text-ink-900">
                  Rp {m.nilaiRpT.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T
                </span>
              </span>
            </div>
            <div className="mt-[3px] h-[10px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="flex h-full items-center justify-end rounded-full bg-ptpn-green pr-1.5"
                style={{ width: `${(m.kontrak / MAX_KONTRAK) * 100}%` }}
              >
                <span className="text-[9px] font-bold text-white">{m.kontrak}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
        43% kontrak (Rp 5,8 T) jatuh delivery Q3 2026 — puncak produksi &amp; logistik.
      </p>
    </div>
  );
}
