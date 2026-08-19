import { Radar } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { DimensiRadarCard } from "@/components/kinerja/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  dimensiDefinitions,
  dimensiGap,
  dimensiKpi,
  dimensiNotes,
  dimensiRadar,
  dimensiRows,
  dimensiTrend,
} from "@/lib/kinerja-detail";

export const metadata = { title: "Kinerja per Dimensi — Kinerja Karyawan — PTPN Group" };

export default function KinerjaDimensiDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<Radar size={19} strokeWidth={1.9} />}
          title="Kinerja per Dimensi"
          subtitle="Skor lima dimensi penilaian beserta bobotnya, pergerakan antar kuartal, dan sebaran unit tertinggi–terendah tiap dimensi"
          stat="Rata-rata dimensi 86,0 · Terendah Inovasi 81,6"
          breadcrumb="Kinerja per Dimensi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={dimensiKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,40fr)_minmax(0,28fr)]">
            <DimensiRadarCard
              title="Profil Dimensi Q2 vs Q1 2026"
              subtitle="Skor rata-rata tiap dimensi, skala 70–92"
              data={dimensiRadar}
              footer="Seluruh dimensi naik; jarak terbesar terhadap Q1 ada pada Pencapaian Target (+5,1)."
            />
            <TiTrendCard
              title="Tren Dimensi (4 Kuartal)"
              subtitle="Pergerakan skor tiap dimensi sejak Q3 2025"
              data={dimensiTrend}
              delay={80}
              domain={[70, 92]}
              series={[
                { key: "target", label: "Pencapaian Target (KPI)", color: PALETTE.green },
                { key: "kompetensi", label: "Kompetensi", color: PALETTE.blue },
                { key: "perilaku", label: "Perilaku & Budaya", color: PALETTE.purple },
                { key: "inovasi", label: "Inovasi & Improvement", color: PALETTE.red },
                { key: "kolaborasi", label: "Kerjasama & Kolaborasi", color: PALETTE.teal },
              ]}
              footer="Inovasi & Improvement konsisten menjadi garis terbawah selama empat kuartal berturut-turut."
            />
            <BarListCard
              title="Posisi Dimensi vs Rata-rata Grup"
              subtitle="Rata-rata seluruh dimensi 86,0"
              delay={120}
              max={92}
              rows={dimensiGap.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: o.value.toFixed(1).replace(".", ","),
                note: o.note,
                color: o.value >= 88 ? "#1a9c5b" : o.value >= 84 ? "#f5a524" : "#ef4444",
              }))}
              footer="Selisih dimensi tertinggi dan terendah 7,6 poin — profil kinerja grup belum seimbang."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Dimensi Penilaian"
              subtitle="Bobot, pergerakan kuartal, dan sebaran unit tiap dimensi"
              columns={[
                { key: "dimensi", label: "Dimensi", cellClass: "font-semibold text-ink-900" },
                { key: "bobot", label: "Bobot", align: "right" },
                { key: "q2", label: "Q2 2026", align: "right" },
                { key: "q1", label: "Q1 2026", align: "right" },
                { key: "delta", label: "Δ Kuartal", align: "right" },
                { key: "tertinggi", label: "Unit Tertinggi" },
                { key: "terendah", label: "Unit Terendah" },
                { key: "status", label: "Status" },
              ]}
              rows={dimensiRows.map((r) => ({
                dimensi: r.dimensi,
                bobot: r.bobot,
                q2: <span className="font-bold text-ink-900">{r.q2}</span>,
                q1: r.q1,
                delta: <span className="font-bold text-ptpn-green">{r.delta}</span>,
                tertinggi: r.tertinggi,
                terendah: r.terendah,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Kuat" ? "green" : r.status === "Stabil" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                dimensi: "Rata-rata Tertimbang",
                bobot: "100%",
                q2: "87,6",
                q1: "82,9",
                delta: "+4,7",
                tertinggi: "PTPN IV Regional 1 (91,2)",
                terendah: "Supporting Co (78,6)",
                status: "—",
              }}
              note="Rata-rata tertimbang menggunakan bobot pada kolom Bobot, sehingga sama dengan overall score grup (87,6). Unit tertinggi dan terendah dihitung pada level entitas, bukan individu."
            />
            <NotesPanel notes={dimensiNotes} definitions={dimensiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
