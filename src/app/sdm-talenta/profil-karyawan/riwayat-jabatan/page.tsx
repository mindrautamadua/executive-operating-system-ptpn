import { Briefcase } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  riwayatDurasi,
  riwayatJabatanDefs,
  riwayatJabatanKpi,
  riwayatJabatanNotes,
  riwayatJabatanRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Riwayat Jabatan — Rizky Putra — PTPN Group",
};

export default function ProfilRiwayatJabatanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Briefcase size={19} strokeWidth={1.9} />}
          title="Riwayat Jabatan — Rizky Putra"
          subtitle="Kronologi lengkap jabatan, job grade, jenis perubahan, dan perbandingan tenure dengan kohort"
          stat="8 thn 4 bln masa kerja · 4 jabatan · 3 promosi"
          breadcrumb="Profil Karyawan / Riwayat Jabatan"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={riwayatJabatanKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Kronologi Jabatan"
              subtitle="Dari terbaru — seluruhnya di PTPN IV Regional 1"
              columns={[
                { key: "jabatan", label: "Jabatan", cellClass: "font-bold" },
                { key: "unit", label: "Unit Kerja" },
                { key: "grade", label: "Job Grade", align: "center" },
                { key: "periode", label: "Periode", align: "right" },
                { key: "durasi", label: "Durasi", align: "right" },
                { key: "jenisPill", label: "Perubahan", align: "center" },
                { key: "atasan", label: "Atasan Langsung" },
              ]}
              rows={riwayatJabatanRows.map((r) => ({
                ...r,
                jenisPill: (
                  <Pill label={r.jenis} tone={r.jenis === "Promosi" ? "green" : "slate"} />
                ),
              }))}
              note="Berdasarkan SK kepegawaian HRIS; tenure dihitung sampai 31 Mei 2026."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Durasi per Jabatan"
                subtitle="Dalam bulan"
                rows={riwayatDurasi}
                footer="Rata-rata 20 bulan per jenjang — lebih cepat dari median kohort MT 2018."
              />
              <NotesPanel notes={riwayatJabatanNotes} definitions={riwayatJabatanDefs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
