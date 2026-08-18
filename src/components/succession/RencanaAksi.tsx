import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { rencanaAksi, KESEHATAN_COLOR, STATUS_STYLE } from "@/lib/succession-data";

export function RencanaAksi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "780ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Rencana Aksi Suksesi</h3>
        <span className="shrink-0 text-[8.5px] font-medium text-ink-400">
          Δ = dampak thd readiness kandidat
        </span>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        {/* leading-none: tanpa ini tiap <tr> mewarisi line-height 24px dan baris jadi tinggi */}
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full table-fixed border-collapse leading-none">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[9px] font-semibold text-ink-500">
              <th className="w-[26%] pb-1.5 text-left">Inisiatif</th>
              <th className="w-[13%] pb-1.5 text-left">Target</th>
              <th className="w-[19%] pb-1.5 text-left">Progress</th>
              <th className="w-[13%] pb-1.5 text-right">Δ Readiness</th>
              <th className="w-[12%] pb-1.5 text-right">Δ Waktu</th>
              <th className="w-[17%] pb-1.5 pl-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rencanaAksi.map((a, i) => (
              <tr
                key={a.inisiatif}
                className="h-[28px] border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
              >
                <td
                  className="truncate py-0 pr-1 text-[9px] font-semibold leading-[1.25] text-ink-900"
                  title={a.deskripsi}
                >
                  {a.inisiatif}
                </td>
                <td className="py-0 pr-1 text-[9px] leading-none text-ink-700">{a.target}</td>
                <td className="py-0 pr-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#f2f5f8]">
                      {/* warna bar mengikuti kesehatan progres, bukan hijau seragam */}
                      <span
                        className="anim-grow-x block h-full rounded-full"
                        style={
                          {
                            width: `${a.progress}%`,
                            background: KESEHATAN_COLOR[a.kesehatan],
                            "--d": `${780 + i * 60}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                    <span className="w-[22px] shrink-0 text-right text-[9px] font-semibold tabular-nums text-ink-700">
                      {a.progress}%
                    </span>
                  </span>
                </td>
                <td
                  className={`py-0 text-right text-[9px] font-semibold leading-none tabular-nums ${
                    a.uplift === "—" ? "text-ink-400" : "text-ptpn-green"
                  }`}
                  title="Kenaikan readiness rata-rata peserta yang menyelesaikan program"
                >
                  {a.uplift}
                </td>
                <td
                  className={`py-0 text-right text-[9px] font-semibold leading-none tabular-nums ${
                    a.deltaWaktu === "—" ? "text-ink-400" : "text-ptpn-green"
                  }`}
                  title="Percepatan time-to-readiness rata-rata"
                >
                  {a.deltaWaktu}
                </td>
                <td className="py-0 pl-2">
                  <span
                    className={`inline-flex items-center whitespace-nowrap rounded px-1.5 py-[2px] text-[9px] font-semibold leading-none ${STATUS_STYLE[a.status]}`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <Link href="/succession-planning/rencana-aksi" className="link-more mt-1.5 flex cursor-pointer items-center gap-0.5">
        Lihat semua rencana aksi <ChevronRight size={12} />
      </Link>
    </div>
  );
}
