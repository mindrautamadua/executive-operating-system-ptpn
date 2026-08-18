import { sanctionLog } from "@/lib/hkm-data";
import type { HkmSanctionRow } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<HkmSanctionRow["status"], BadgeTone> = {
  Selesai: "good",
  "Dalam Remediasi": "warn",
  Banding: "bad",
};

/** Log sanksi & denda perizinan YTD (Rp 2,4 M, 6 sanksi administratif). */
export function SanctionLog() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Log Sanksi & Denda Perizinan" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {sanctionLog.length} Sanksi Administratif YTD · total Rp 2,4 M · tidak ada pembekuan izin
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {sanctionLog.map((s) => (
          <div
            key={`${s.tanggal}-${s.unit}`}
            className="rounded-xl border border-[#eef2f6] px-2.5 py-[7px]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900" title={s.jenis}>
                {s.jenis}
              </span>
              <span className="shrink-0 text-[9.5px] font-extrabold tabular-nums text-[#ef4444]">
                {s.nilai}
              </span>
            </div>
            <div className="mt-[3px] flex items-center justify-between gap-2">
              <span className="truncate text-[9px] text-ink-500" title={`${s.instansi} · ${s.unit}`}>
                {s.tanggal} · {s.unit}
              </span>
              <ToneBadge label={s.status} tone={STATUS_TONE[s.status]} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Seluruh sanksi berasal dari domain lingkungan dan air; 2 masih dalam remediasi dan 1 sedang
        diajukan banding.
      </p>
    </div>
  );
}
