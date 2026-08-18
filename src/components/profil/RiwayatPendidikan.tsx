import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { pendidikan } from "@/lib/profil-data";

export function RiwayatPendidikan() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Pendidikan</h3>

      <div className="mt-3 flex min-h-0 flex-1 items-start gap-3">
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
          <GraduationCap size={16} className="text-[#3b7ded]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[10.5px] font-bold text-ink-900">{pendidikan.jenjang}</div>
          <div className="mt-[3px] text-[9px] text-ink-500">{pendidikan.institusi}</div>
          <div className="mt-[2px] text-[9px] text-ink-500">{pendidikan.periode}</div>
          <span className="mt-2 inline-block rounded-md border border-[#e3e9ef] bg-[#f7f9fb] px-2 py-[3px] text-[8.5px] font-semibold text-ink-700">
            {pendidikan.ipk}
          </span>
        </div>
      </div>

      <Link
        href="/sdm-talenta/profil-karyawan/riwayat-pendidikan"
        className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-ptpn-greenDark hover:underline"
      >
        Lihat riwayat pendidikan <ArrowRight size={11} />
      </Link>
    </div>
  );
}
