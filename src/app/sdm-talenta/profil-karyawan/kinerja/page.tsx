import { Gauge } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  kinerjaDefs,
  kinerjaKpi,
  kinerjaKpiRows,
  kinerjaNotes,
  kinerjaTren,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Detail Kinerja — Rizky Putra — PTPN Group",
};

const STATUS_TONE = { Melampaui: "green", Tercapai: "slate", Hampir: "amber" } as const;

export default function ProfilKinerjaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Gauge size={19} strokeWidth={1.9} />}
          title="Detail Kinerja — Rizky Putra"
          subtitle="Rincian KPI individu FY 2025, tren skor lima tahun, dan hasil kalibrasi nine-box"
          stat="Skor 4,8 / 5,0 · #2 dari 18 · 8 dari 9 KPI tercapai"
          breadcrumb="Profil Karyawan / Detail Kinerja"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kinerjaKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Rincian KPI Individu FY 2025"
              subtitle="9 KPI berbobot — dasar skor kinerja hasil kalibrasi"
              columns={[
                { key: "kpi", label: "KPI", cellClass: "font-bold" },
                { key: "bobot", label: "Bobot", align: "center" },
                { key: "target", label: "Target", align: "right" },
                { key: "realisasi", label: "Realisasi", align: "right" },
                { key: "capaian", label: "Capaian", align: "right", cellClass: "font-bold" },
                { key: "skor", label: "Skor", align: "right" },
                { key: "statusPill", label: "Status", align: "center" },
              ]}
              rows={kinerjaKpiRows.map((r) => ({
                ...r,
                statusPill: <Pill label={r.status} tone={STATUS_TONE[r.status as keyof typeof STATUS_TONE]} />,
              }))}
              note="Skor akhir 4,8 = rata-rata tertimbang skor per KPI setelah kalibrasi komite; capaian dibatasi 110%."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Tren Skor Kinerja"
                subtitle="Lima siklus penilaian terakhir"
                rows={kinerjaTren}
                max={5}
                footer="Skala 1–5. Kenaikan 2025 didorong capaian produksi dan program efisiensi pupuk."
              />
              <NotesPanel notes={kinerjaNotes} definitions={kinerjaDefs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
