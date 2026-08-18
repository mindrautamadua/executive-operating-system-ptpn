import { AlarmClock, ArrowUpRight, Eye } from "lucide-react";
import { overdueDetail } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

/**
 * Inti halaman: 9 rekomendasi melewati tenggat beserta dampak pengawasannya
 * dan langkah eskalasi Dewan Komisaris (bukan langkah eksekusi Direksi).
 */
export function OverdueDetail() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Rincian Rekomendasi Overdue" action="Eskalasi ke Radirkom" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        9 Butir Melewati Tenggat · rata-rata 47 hari terlambat · dua butir di atas 90 hari
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {overdueDetail.map((o) => (
            <div key={o.id} className="rounded-lg border border-[#f5d9d9] bg-[#fdecec] p-2">
              <div className="flex items-start gap-1.5">
                <AlarmClock size={11} strokeWidth={2} className="mt-[1px] shrink-0 text-[#ef4444]" />
                <div className="min-w-0">
                  <div className="text-[9px] font-bold tabular-nums text-ink-500">{o.id}</div>
                  <div className="mt-[2px] text-[9px] font-extrabold leading-snug text-ink-900">
                    {o.isi}
                  </div>
                </div>
              </div>

              <div className="mt-1.5 flex items-center gap-1.5">
                <ToneBadge label={`Telat ${o.terlambatHari} hari`} tone="bad" />
                <span className="truncate text-[9px] font-semibold text-ink-500">
                  Tenggat {o.tenggat}
                </span>
              </div>

              <p className="mt-1.5 flex items-start gap-1 text-[9px] leading-snug text-ink-500">
                <Eye size={9} className="mt-[1px] shrink-0 text-[#ef4444]" />
                <span>
                  <span className="font-bold text-ink-700">Dampak:</span> {o.dampak}
                </span>
              </p>

              <p className="mt-1 flex items-start gap-1 text-[9px] leading-snug text-ink-500">
                <ArrowUpRight size={9} className="mt-[1px] shrink-0 text-[#ef4444]" />
                <span>
                  <span className="font-bold text-ink-700">Eskalasi Dekom:</span> {o.eskalasi}
                </span>
              </p>

              <div className="mt-1.5 border-t border-[#f5d9d9] pt-1 text-[9px] font-semibold text-ink-500">
                PIC: {o.pic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
