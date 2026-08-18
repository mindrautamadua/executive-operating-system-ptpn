import { Lightbulb } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  rekomendasiDefs,
  rekomendasiKomposisi,
  rekomendasiKpi,
  rekomendasiNotes,
  rekomendasiRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Rekomendasi Pengembangan — Rizky Putra — PTPN Group",
};

const PRIORITAS_TONE = { Tinggi: "red", Sedang: "amber", Rendah: "slate" } as const;
const STATUS_TONE = { Berjalan: "green", Dijadwalkan: "amber", Diusulkan: "slate" } as const;

export default function ProfilRekomendasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Lightbulb size={19} strokeWidth={1.9} />}
          title="Rekomendasi Pengembangan — Rizky Putra"
          subtitle="Rencana penutupan kesenjangan kompetensi (IDP 2026) dengan pola 70:20:10 menuju kesiapan Afdeling Manager"
          stat="5 gap kompetensi · 8 program · proyeksi 80% gap tertutup Q4 2026"
          breadcrumb="Profil Karyawan / Rekomendasi Pengembangan"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={rekomendasiKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Rencana Intervensi per Gap Kompetensi"
              subtitle="8 program — diurutkan dari prioritas tertinggi"
              columns={[
                { key: "kompetensi", label: "Kompetensi", cellClass: "font-bold" },
                { key: "gap", label: "Gap", align: "center", cellClass: "font-bold" },
                { key: "intervensi", label: "Jalur 70:20:10" },
                { key: "program", label: "Program" },
                { key: "metode", label: "Metode" },
                { key: "durasi", label: "Durasi", align: "right" },
                { key: "mulai", label: "Mulai", align: "right" },
                { key: "prioritasPill", label: "Prioritas", align: "center" },
                { key: "statusPill", label: "Status", align: "center" },
              ]}
              rows={rekomendasiRows.map((r) => ({
                ...r,
                prioritasPill: (
                  <Pill
                    label={r.prioritas}
                    tone={PRIORITAS_TONE[r.prioritas as keyof typeof PRIORITAS_TONE]}
                  />
                ),
                statusPill: (
                  <Pill
                    label={r.status}
                    tone={STATUS_TONE[r.status as keyof typeof STATUS_TONE]}
                  />
                ),
              }))}
              note="Gap dari asesmen skills gap 2025 (level saat ini vs level yang diharapkan job grade target); IDP disetujui atasan langsung dan HR Regional 1."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Komposisi 70:20:10"
                subtitle="Bobot pengalaman vs sosial vs formal"
                rows={rekomendasiKomposisi}
                max={70}
                footer="Sesuai kebijakan pengembangan PTPN: pengalaman kerja jadi jalur utama, kelas formal pelengkap."
              />
              <NotesPanel notes={rekomendasiNotes} definitions={rekomendasiDefs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
