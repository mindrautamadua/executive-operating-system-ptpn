import { FileClock } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { perubahanDefs, perubahanKpi, perubahanNotes, perubahanRows } from "@/lib/profil-detail";

export const metadata = {
  title: "Riwayat Perubahan Data — Rizky Putra — PTPN Group",
};

const TIPE_TONE: Record<string, "green" | "amber" | "slate"> = {
  "Kenaikan Person Grade": "green",
  "Promosi Jabatan": "green",
  "Perubahan Status": "amber",
  "Perubahan Unit": "amber",
  "Data Pribadi": "slate",
};

export default function ProfilPerubahanDataPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<FileClock size={19} strokeWidth={1.9} />}
          title="Riwayat Perubahan Data — Rizky Putra"
          subtitle="Jejak audit seluruh perubahan data kepegawaian: struktural (SK) maupun administratif (self-service)"
          stat="9 perubahan tercatat · 6 struktural · 0 menunggu persetujuan"
          breadcrumb="Profil Karyawan / Perubahan Data"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={perubahanKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Jejak Audit Perubahan Data"
              subtitle="9 perubahan — diurutkan dari terbaru"
              columns={[
                { key: "perubahan", label: "Perubahan", cellClass: "font-bold" },
                { key: "dari", label: "Dari" },
                { key: "menjadi", label: "Menjadi" },
                { key: "tipePill", label: "Tipe", align: "center" },
                { key: "tanggal", label: "Tgl Efektif", align: "right" },
                { key: "oleh", label: "Diubah Oleh" },
                { key: "dasar", label: "Dasar" },
              ]}
              rows={perubahanRows.map((r) => ({
                ...r,
                tipePill: <Pill label={r.tipe} tone={TIPE_TONE[r.tipe] ?? "slate"} />,
              }))}
              note="Perubahan struktural wajib berbasis SK; perubahan data pribadi via self-service HRIS dengan verifikasi HR."
            />
            <NotesPanel notes={perubahanNotes} definitions={perubahanDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
