import { Puzzle } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  kompetensiDefs,
  kompetensiKpi,
  kompetensiNotes,
  kompetensiRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Semua Kompetensi — Rizky Putra — PTPN Group",
};

export default function ProfilKompetensiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Puzzle size={19} strokeWidth={1.9} />}
          title="Semua Kompetensi — Rizky Putra"
          subtitle="Peta 12 kompetensi hasil asesmen 2025 dibandingkan standar Job Grade G7 dan profil jabatan target"
          stat="Rata-rata 4,5 / 5,0 · 9 dari 12 di atas standar · 0 gap kritis"
          breadcrumb="Profil Karyawan / Semua Kompetensi"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kompetensiKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Peta Kompetensi Lengkap"
              subtitle="12 kompetensi — diurutkan dari level aktual tertinggi"
              columns={[
                { key: "kompetensi", label: "Kompetensi", cellClass: "font-bold" },
                { key: "kategori", label: "Kategori" },
                { key: "aktual", label: "Aktual", align: "right", cellClass: "font-bold" },
                { key: "standar", label: "Standar G7", align: "right" },
                { key: "gapCell", label: "Gap", align: "right" },
                { key: "metode", label: "Metode Asesmen" },
                { key: "tanggal", label: "Asesmen", align: "right" },
              ]}
              rows={kompetensiRows.map((r) => ({
                ...r,
                gapCell: (
                  <span className={r.gap.startsWith("-") ? "font-bold text-[#d98b06]" : "font-bold text-ptpn-green"}>
                    {r.gap}
                  </span>
                ),
              }))}
              note="Skala 1–5 sesuai kamus kompetensi PTPN; gap negatif otomatis masuk Individual Development Plan (IDP) 2026."
            />
            <NotesPanel notes={kompetensiNotes} definitions={kompetensiDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
