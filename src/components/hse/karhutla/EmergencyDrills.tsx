import { drillFootnote, emergencyDrills } from "@/lib/hse-data-detail";
import type { HseRagStatus } from "@/lib/hse-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<HseRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Simulasi tanggap darurat YTD beserta cakupan unit dari basis 76 unit. */
export function EmergencyDrills() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Simulasi Tanggap Darurat" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">196 Simulasi YTD · Cakupan terhadap 76 Unit</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {emergencyDrills.map((d) => (
          <div key={d.jenis}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{d.jenis}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="text-[11px] font-extrabold tabular-nums text-ink-900">
                  {d.jumlah}
                  <span className="text-[9px] font-bold text-ink-500"> simulasi</span>
                </span>
                <ToneBadge label={`${d.unitTercakup}/76 unit`} tone={STATUS_TONE[d.status]} />
              </span>
            </div>
            <div className="mt-[5px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-ptpn-green"
                style={{ width: `${(d.unitTercakup / 76) * 100}%` }}
              />
            </div>
            <p className="mt-[3px] truncate text-[8.5px] text-ink-500" title={d.hasil}>
              {ribuan(d.peserta)} peserta · {d.hasil}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {drillFootnote}
      </p>
    </div>
  );
}
