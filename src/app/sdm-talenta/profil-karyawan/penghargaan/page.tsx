import { Trophy } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  penghargaanDefs,
  penghargaanKpi,
  penghargaanNotes,
  penghargaanRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Semua Penghargaan — Rizky Putra — PTPN Group",
};

const TINGKAT_TONE = { Unit: "slate", Regional: "green", Korporat: "amber" } as const;

export default function ProfilPenghargaanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Trophy size={19} strokeWidth={1.9} />}
          title="Semua Penghargaan — Rizky Putra"
          subtitle="Registri lengkap penghargaan beserta tingkat, pemberi, dan dasar prestasi yang terdokumentasi"
          stat="6 penghargaan · 2 tingkat korporat · minimal 1 per tahun sejak 2020"
          breadcrumb="Profil Karyawan / Semua Penghargaan"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={penghargaanKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Registri Penghargaan"
              subtitle="6 penghargaan — diurutkan dari terbaru"
              columns={[
                { key: "nama", label: "Penghargaan", cellClass: "font-bold" },
                { key: "tingkatPill", label: "Tingkat", align: "center" },
                { key: "pemberi", label: "Pemberi" },
                { key: "tahun", label: "Tahun", align: "right" },
                { key: "dasar", label: "Dasar Prestasi" },
              ]}
              rows={penghargaanRows.map((r) => ({
                ...r,
                tingkatPill: (
                  <Pill label={r.tingkat} tone={TINGKAT_TONE[r.tingkat as keyof typeof TINGKAT_TONE]} />
                ),
              }))}
              note="Seluruh penghargaan terverifikasi surat keputusan resmi; dasar prestasi dikutip dari SK."
            />
            <NotesPanel notes={penghargaanNotes} definitions={penghargaanDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
