import { UsersRound } from "lucide-react";
import { PersonAvatar } from "../ui/PersonAvatar";
import { backfill } from "@/lib/profil-data";

const READINESS_TONE: Record<string, string> = {
  "Ready Now": "bg-ptpn-greenLight text-ptpn-greenDark",
  "Siap 1 tahun": "bg-[#fdf3e0] text-[#c07c05]",
};

/**
 * Backfill coverage: siapa mengisi posisinya bila dipromosikan — pertanyaan
 * standar komite sebelum menyetujui promosi.
 */
export function BackfillCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
          <UsersRound size={13} className="text-[#2f6fe4]" />
          Backfill Coverage
        </h3>
        <span className="shrink-0 rounded-full bg-ptpn-greenLight px-2.5 py-[3px] text-[9px] font-extrabold text-ptpn-greenDark">
          {backfill.status}
        </span>
      </div>
      <p className="mt-1 text-[8.5px] text-ink-500">
        Pengganti untuk posisi: <span className="font-bold text-ink-700">{backfill.posisi}</span>
      </p>

      <div className="mt-2.5 min-h-0 flex-1 space-y-2">
        {backfill.kandidat.map((k) => (
          <div
            key={k.nama}
            className="flex items-center gap-2.5 rounded-xl border border-[#eef2f6] px-3 py-2"
          >
            <PersonAvatar seed={k.seed} size={28} name={k.nama} />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[9.5px] font-bold text-ink-900">{k.nama}</div>
              <div className="mt-[2px] truncate text-[8.5px] text-ink-500">{k.jabatan}</div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-[3px] text-[9px] font-bold ${READINESS_TONE[k.readiness]}`}
            >
              {k.readiness}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[8.5px] leading-snug text-ink-500">{backfill.catatan}</p>
    </div>
  );
}
