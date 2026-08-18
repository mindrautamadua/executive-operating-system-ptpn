import { GraduationCap } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  pelatihanDefs,
  pelatihanKpi,
  pelatihanNotes,
  pelatihanRows,
  sertifikasiRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Riwayat Pelatihan & Sertifikasi — Rizky Putra — PTPN Group",
};

export default function ProfilPelatihanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<GraduationCap size={19} strokeWidth={1.9} />}
          title="Pelatihan & Sertifikasi — Rizky Putra"
          subtitle="Riwayat lengkap program pelatihan, jam belajar, dan sertifikasi profesional beserta masa berlakunya"
          stat="14 pelatihan · 86 jam belajar 2025 · 4 sertifikasi aktif"
          breadcrumb="Profil Karyawan / Pelatihan & Sertifikasi"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={pelatihanKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Riwayat Pelatihan"
                subtitle="8 program terakhir — terverifikasi LMS"
                columns={[
                  { key: "nama", label: "Program", cellClass: "font-bold" },
                  { key: "kategori", label: "Kategori" },
                  { key: "penyelenggara", label: "Penyelenggara" },
                  { key: "durasi", label: "Durasi", align: "right" },
                  { key: "tanggal", label: "Selesai", align: "right" },
                  { key: "hasil", label: "Hasil" },
                ]}
                rows={pelatihanRows}
                note="6 program lebih awal (2018–2020) diarsipkan; total keseluruhan 14 program sejak bergabung."
              />
              <DetailTable
                title="Sertifikasi Profesional"
                subtitle="Sertifikasi aktif beserta masa berlaku"
                columns={[
                  { key: "nama", label: "Sertifikasi", cellClass: "font-bold" },
                  { key: "lembaga", label: "Lembaga" },
                  { key: "terbit", label: "Terbit", align: "right" },
                  { key: "berlaku", label: "Berlaku s.d.", align: "right" },
                  { key: "statusPill", label: "Status", align: "center" },
                ]}
                rows={sertifikasiRows.map((r) => ({
                  ...r,
                  statusPill: (
                    <Pill
                      label={r.status.startsWith("Aktif —") ? "Perlu jadwal" : "Aktif"}
                      tone={r.status.startsWith("Aktif —") ? "amber" : "green"}
                    />
                  ),
                }))}
                note="Sertifikasi Manajer Kebun Madya (BNSP) merupakan syarat formal jabatan Afdeling Manager."
              />
            </div>
            <NotesPanel notes={pelatihanNotes} definitions={pelatihanDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
