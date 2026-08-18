import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import { capabilityProfile } from "@/lib/profil-data";

/**
 * Capability Profile — bukan scorecard kompetensi, tapi jawaban atas
 * "apa kekuatannya dan apa yang menghambat naik ke jabatan berikutnya".
 */
export function KompetensiUtama() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Capability Profile</h3>

      <div className="mt-2 min-h-0 flex-1">
        <div className="text-[8.5px] font-extrabold uppercase tracking-[0.06em] text-ptpn-greenDark">
          Strengths
        </div>
        <div className="mt-1 space-y-1">
          {capabilityProfile.strengths.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 text-[9.5px] text-ink-700">
                <CircleCheck size={11} className="shrink-0 text-ptpn-green" strokeWidth={2} />
                <span className="truncate">{s.label}</span>
              </span>
              <span className="shrink-0 text-[10px] font-extrabold text-ink-900">{s.skor}</span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 text-[8.5px] font-extrabold uppercase tracking-[0.06em] text-[#c07c05]">
          Development Gap
        </div>
        <div className="mt-1 space-y-1">
          {capabilityProfile.gaps.map((g) => (
            <div key={g.label} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 text-[9.5px] text-ink-700">
                <CircleAlert size={11} className="shrink-0 text-[#f59e0b]" strokeWidth={2} />
                <span className="truncate">{g.label}</span>
              </span>
              <span className="shrink-0 text-[10px] font-extrabold text-ink-900">{g.skor}</span>
            </div>
          ))}
        </div>

        <p className="mt-2.5 rounded-lg bg-[#fdf6e7] px-2.5 py-[6px] text-[8.5px] leading-snug text-ink-700">
          <span className="font-bold text-ink-900">Critical gap untuk next role: </span>
          {capabilityProfile.criticalGap}
        </p>

        <div className="mt-2 flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px]">
          <span className="min-w-0 text-[8.5px] text-ink-500">
            {capabilityProfile.gapToRole.label}
          </span>
          <span className="shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
            {capabilityProfile.gapToRole.current}
            <span className="ml-1 text-[9px] font-semibold text-[#c07c05]">
              {capabilityProfile.gapToRole.gap}
            </span>
          </span>
        </div>
      </div>

      <Link
        href="/sdm-talenta/profil-karyawan/kompetensi"
        className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-ptpn-greenDark hover:underline"
      >
        Lihat semua kompetensi <ArrowRight size={11} />
      </Link>
    </div>
  );
}
