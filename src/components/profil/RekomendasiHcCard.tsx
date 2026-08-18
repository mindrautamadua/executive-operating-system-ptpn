import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { hcActions } from "@/lib/profil-data";

const STATUS_TONE: Record<string, string> = {
  "Disetujui komite": "bg-ptpn-greenLight text-ptpn-greenDark",
  Dijadwalkan: "bg-[#fdf3e0] text-[#c07c05]",
  Diusulkan: "bg-[#eef2f6] text-ink-500",
  Aktif: "bg-[#e8f1fd] text-[#2f6fe4]",
};

/** Kartu aksi HC yang direkomendasikan — jembatan dari insight ke keputusan. */
export function RekomendasiHcCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <ClipboardCheck size={13} className="text-ptpn-green" />
        Recommended HC Actions
      </h3>

      <div className="mt-2.5 min-h-0 flex-1 divide-y divide-[#f6f8fa]">
        {hcActions.map((a, i) => (
          <div key={a.kategori} className="flex items-start gap-2.5 py-[7px]">
            <span className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#eef4fd] text-[8.5px] font-extrabold text-[#2f6fe4]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
                {a.kategori}
              </span>
              <p className="mt-[2px] text-[9.5px] leading-snug text-ink-900">{a.aksi}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-[3px] text-[9px] font-bold ${STATUS_TONE[a.status]}`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/sdm-talenta/profil-karyawan/rekomendasi-pengembangan"
        className="link-more mt-1.5 inline-flex items-center gap-1"
      >
        Lihat rencana pengembangan lengkap <ArrowRight size={11} />
      </Link>
    </div>
  );
}
