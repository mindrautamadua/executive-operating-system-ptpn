import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CircleCheck, CircleDashed, CircleX } from "lucide-react";
import { jobProfile } from "@/lib/profil-data";

/**
 * Job Profile ringkas versi eksekutif: tujuan peran, akuntabilitas utama +
 * status penguasaan, syarat jabatan, dan Role Fit — reference layer untuk
 * angka fit/gap di kartu-kartu talenta.
 */
export function JobProfileCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
          <BriefcaseBusiness size={13} className="text-[#1b3a6b]" />
          Job Profile — Jabatan Saat Ini
        </h3>
        <span className="shrink-0 rounded-full bg-ptpn-greenLight px-2.5 py-[3px] text-[9px] font-extrabold text-ptpn-greenDark">
          Role Fit {jobProfile.roleFit}
        </span>
      </div>

      <div className="mt-1.5 text-[9.5px] font-bold text-ink-900">{jobProfile.peran}</div>
      <p className="mt-[3px] text-[8.5px] leading-[1.5] text-ink-500">{jobProfile.tujuan}</p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 gap-x-4">
        <div>
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.06em] text-ink-500">
            Akuntabilitas Utama
          </div>
          <div className="mt-1 space-y-1">
            {jobProfile.akuntabilitas.map((a) => (
              <div key={a.label} className="flex items-start justify-between gap-2">
                <span className="flex min-w-0 items-start gap-1.5 text-[9px] leading-snug text-ink-700">
                  {a.status === "Dikuasai" ? (
                    <CircleCheck size={11} className="mt-[1px] shrink-0 text-ptpn-green" strokeWidth={2} />
                  ) : (
                    <CircleDashed size={11} className="mt-[1px] shrink-0 text-[#f59e0b]" strokeWidth={2} />
                  )}
                  {a.label}
                </span>
                <span
                  className={`shrink-0 text-[9px] font-bold ${
                    a.status === "Dikuasai" ? "text-ptpn-greenDark" : "text-[#c07c05]"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.06em] text-ink-500">
            Syarat Jabatan
          </div>
          <div className="mt-1 space-y-1">
            {jobProfile.syarat.map((s) => (
              <div key={s.label} className="flex items-start gap-1.5 text-[9px] leading-snug text-ink-700">
                {s.terpenuhi ? (
                  <CircleCheck size={11} className="mt-[1px] shrink-0 text-ptpn-green" strokeWidth={2} />
                ) : (
                  <CircleX size={11} className="mt-[1px] shrink-0 text-[#ef4444]" strokeWidth={2} />
                )}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/sdm-talenta/profil-karyawan/job-profile"
        className="link-more mt-2 inline-flex items-center gap-1"
      >
        Lihat job profile lengkap &amp; syarat jabatan target <ArrowRight size={11} />
      </Link>
    </div>
  );
}
