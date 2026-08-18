import { BookOpen } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  pendidikanDefs,
  pendidikanFormalRows,
  pendidikanKpi,
  pendidikanNonGelarRows,
  pendidikanNotes,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Riwayat Pendidikan — Rizky Putra — PTPN Group",
};

export default function ProfilPendidikanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<BookOpen size={19} strokeWidth={1.9} />}
          title="Riwayat Pendidikan — Rizky Putra"
          subtitle="Pendidikan formal, program non-gelar, dan rencana pengembangan akademik pada jalur suksesi"
          stat="S1 Agronomi USU · IPK 3,45 Cumlaude · 3 program non-gelar"
          breadcrumb="Profil Karyawan / Riwayat Pendidikan"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={pendidikanKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Pendidikan Formal"
                subtitle="Terverifikasi ijazah & transkrip"
                columns={[
                  { key: "jenjang", label: "Jenjang", cellClass: "font-bold" },
                  { key: "institusi", label: "Institusi" },
                  { key: "periode", label: "Periode", align: "right" },
                  { key: "hasil", label: "Hasil" },
                  { key: "keterangan", label: "Keterangan" },
                ]}
                rows={pendidikanFormalRows}
              />
              <DetailTable
                title="Pendidikan Non-Gelar"
                subtitle="Kursus eksekutif, micro-credential, dan kursus bahasa"
                columns={[
                  { key: "program", label: "Program", cellClass: "font-bold" },
                  { key: "institusi", label: "Institusi" },
                  { key: "periode", label: "Tahun", align: "right" },
                  { key: "hasil", label: "Hasil" },
                  { key: "keterangan", label: "Keterangan" },
                ]}
                rows={pendidikanNonGelarRows}
                note="Program non-gelar diperhitungkan dalam poin pengembangan IDP, bukan jenjang akademik."
              />
            </div>
            <NotesPanel notes={pendidikanNotes} definitions={pendidikanDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
