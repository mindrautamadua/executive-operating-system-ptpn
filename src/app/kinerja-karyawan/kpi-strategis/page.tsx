import { Target } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  kpiBars,
  kpiDefinitions,
  kpiNotes,
  kpiRows,
  kpiStrategisKpi,
  kpiTrend,
} from "@/lib/kinerja-detail";

export const metadata = { title: "KPI Strategis — Kinerja Karyawan — PTPN Group" };

export default function KpiStrategisDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<Target size={19} strokeWidth={1.9} />}
          title="KPI Strategis"
          subtitle="Pencapaian lima KPI strategis RKAP 2026 beserta bobot, realisasi, pemilik direktorat, dan risiko capaian akhir tahun"
          stat="Pencapaian rata-rata 76,8% · Gap 23,2 ppts"
          breadcrumb="KPI Strategis"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kpiStrategisKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <BarListCard
              title="Pencapaian per KPI Strategis"
              subtitle="Realisasi terhadap target RKAP 2026 (year to date)"
              max={100}
              rows={kpiBars.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `${o.value}%`,
                note: o.note,
                color: o.value >= 80 ? "#1a9c5b" : o.value >= 74 ? "#f5a524" : "#ef4444",
              }))}
              footer="Hanya Pertumbuhan Pendapatan yang menembus 80%; empat KPI lain tertahan di rentang 73–78%."
            />
            <TiTrendCard
              title="Tren Pencapaian KPI (4 Kuartal)"
              subtitle="Persentase pencapaian tiap KPI terhadap target"
              data={kpiTrend}
              delay={80}
              domain={[55, 90]}
              unit="%"
              reference={{ value: 80, color: PALETTE.amber }}
              series={[
                { key: "pendapatan", label: "Pertumbuhan Pendapatan", color: PALETTE.green },
                { key: "efisiensi", label: "Efisiensi Operasional", color: PALETTE.blue },
                { key: "produktivitas", label: "Produktivitas Kebun", color: PALETTE.red },
                { key: "pelanggan", label: "Kepuasan Pelanggan", color: PALETTE.purple },
                { key: "sustainability", label: "Sustainability Index", color: PALETTE.teal },
              ]}
              footer="Garis putus-putus = ambang On Track (80%). Seluruh KPI naik konsisten, namun hanya satu yang melewatinya di Q2 2026."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian KPI Strategis RKAP 2026"
              subtitle="Bobot, target, realisasi berjalan, dan pemilik akuntabilitas"
              columns={[
                { key: "kpi", label: "KPI Strategis", cellClass: "font-semibold text-ink-900" },
                { key: "bobot", label: "Bobot", align: "right" },
                { key: "target", label: "Target 2026", align: "right" },
                { key: "realisasi", label: "Realisasi YTD", align: "right" },
                { key: "pencapaian", label: "Pencapaian", align: "right" },
                { key: "delta", label: "Δ Kuartal", align: "right" },
                { key: "pemilik", label: "Pemilik" },
                { key: "status", label: "Status" },
              ]}
              rows={kpiRows.map((r) => ({
                kpi: r.kpi,
                bobot: r.bobot,
                target: r.target,
                realisasi: r.realisasi,
                pencapaian: (
                  <span
                    className={
                      r.pencapaian >= 80
                        ? "font-bold text-ptpn-green"
                        : r.pencapaian >= 74
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.pencapaian}%
                  </span>
                ),
                delta: <span className="font-bold text-ptpn-green">{r.delta}</span>,
                pemilik: r.pemilik,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "On Track" ? "green" : r.status === "Perlu Perhatian" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                kpi: "Total / Tertimbang",
                bobot: "100%",
                target: "—",
                realisasi: "—",
                pencapaian: "77,9%",
                delta: "+6,1 ppts",
                pemilik: "Direksi PTPN Holding",
                status: "—",
              }}
              note="Pencapaian tertimbang (77,9%) memakai bobot RKAP tiap KPI, sedikit di atas rata-rata sederhana (76,8%) karena KPI berbobot terbesar berkinerja relatif lebih baik."
            />
            <NotesPanel notes={kpiNotes} definitions={kpiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
