import { complianceReporting, type HkmReportingRow } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<HkmReportingRow["status"], BadgeTone> = {
  Terkirim: "good",
  "Dalam Penyusunan": "info",
  Terlambat: "bad",
};

const terkirim = complianceReporting.filter((r) => r.status === "Terkirim").length;
const terlambat = complianceReporting.filter((r) => r.status === "Terlambat").length;
const progresPct = Math.round((terkirim / complianceReporting.length) * 100);

/** Progres kewajiban pelaporan korporat ke Kementerian BUMN/Danantara & regulator. */
export function ComplianceReporting() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kewajiban Pelaporan Korporat" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kepatuhan tepat waktu 96% YTD · {terkirim} terkirim · {terlambat} terlambat
      </p>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
          <div
            className="h-full rounded-full bg-ptpn-green"
            style={{ width: `${progresPct}%` }}
          />
        </div>
        <span className="shrink-0 text-[8.5px] font-bold tabular-nums text-ink-700">
          {terkirim}/{complianceReporting.length} tuntas
        </span>
      </div>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        {complianceReporting.map((r) => (
          <div
            key={r.laporan}
            className="flex items-start justify-between gap-2 border-b border-[#f4f7fa] py-[6px] last:border-0"
          >
            <div className="min-w-0">
              <div className="truncate text-[9.5px] font-semibold text-ink-900" title={r.laporan}>
                {r.laporan}
              </div>
              <div className="mt-[2px] text-[9px] text-ink-500">
                {r.penerima} · {r.frekuensi} · jatuh tempo {r.jatuhTempo}
              </div>
            </div>
            <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        2 laporan terlambat YTD (AHU &amp; LKPM) bersifat administratif namun menjadi temuan
        berulang pada asesmen GCG.
      </p>
    </div>
  );
}
