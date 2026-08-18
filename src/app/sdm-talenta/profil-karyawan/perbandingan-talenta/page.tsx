import { GitCompareArrows } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { DetailKpiStrip, NotesPanel } from "@/components/wa/detail/parts";
import {
  dimensiBanding,
  kandidatBanding,
  perbandinganDefs,
  perbandinganKpi,
  perbandinganNotes,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Perbandingan Kandidat Suksesi — PTPN Group",
};

const TONE_TEXT: Record<string, string> = {
  green: "text-ptpn-greenDark",
  amber: "text-[#c07c05]",
  red: "text-[#dc2626]",
  slate: "text-ink-700",
};

export default function PerbandinganTalentaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<GitCompareArrows size={19} strokeWidth={1.9} />}
          title="Perbandingan Kandidat Suksesi"
          subtitle="Tiga kandidat succession pool Afdeling Manager dibandingkan pada dimensi keputusan yang sama"
          stat="3 kandidat · Fit tertinggi 92% (Rizky Putra) · 1 Ready Now"
          breadcrumb="Profil Karyawan / Perbandingan Kandidat"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={perbandinganKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
              <h3 className="card-title-navy">Matriks Perbandingan — Afdeling Manager</h3>
              <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#eef2f6]">
                      <th className="w-[24%] px-2 pb-2 text-left text-[9px] font-bold text-ink-500">
                        Dimensi
                      </th>
                      {kandidatBanding.map((k) => (
                        <th key={k.nama} className="px-2 pb-2 text-left">
                          <div
                            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                              k.utama ? "bg-ptpn-greenLight" : ""
                            }`}
                          >
                            {/* name wajib: gender foto diturunkan dari nama
                                sehingga foto & nama tidak bertentangan. */}
                            <PersonAvatar seed={k.seed} name={k.nama} size={26} />
                            <div className="min-w-0 leading-tight">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                                  {k.nama}
                                </span>
                                {k.utama && (
                                  <span className="shrink-0 rounded bg-ptpn-green px-1.5 py-[1px] text-[9px] font-extrabold uppercase text-white">
                                    Profil ini
                                  </span>
                                )}
                              </div>
                              <div className="truncate text-[9px] font-medium text-ink-500">
                                {k.jabatan}
                              </div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dimensiBanding.map((d) => (
                      <tr key={d.key} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                        <td className="px-2 py-[8px] text-[9px] font-semibold text-ink-500">
                          {d.label}
                        </td>
                        {kandidatBanding.map((k) => (
                          <td
                            key={k.nama}
                            className={`px-2 py-[8px] text-[9.5px] font-extrabold ${
                              TONE_TEXT[k.tone[d.key]]
                            } ${k.utama ? "bg-ptpn-greenLight/40" : ""} ${
                              d.key === "fit" ? "text-[11px]" : ""
                            }`}
                          >
                            {k.nilai[d.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
                Kolom hijau = subjek profil ini. Data dari siklus penilaian & asesmen yang sama
                (FY 2025) supaya apple-to-apple; keputusan final tetap pada komite suksesi.
              </p>
            </div>
            <NotesPanel notes={perbandinganNotes} definitions={perbandinganDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
