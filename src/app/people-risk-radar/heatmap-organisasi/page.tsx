import { LayoutGrid } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiStackedBarCard, TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  heatmapDefinitions,
  heatmapKpi,
  heatmapNotes,
  heatmapRows,
  heatmapScoreBars,
  heatmapStack,
  heatmapTrend,
} from "@/lib/prr-detail";

export const metadata = { title: "Risk Heatmap per Organisasi — People Risk Radar — PTPN Group" };

export default function HeatmapOrganisasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<LayoutGrid size={19} strokeWidth={1.9} />}
          title="Risk Heatmap per Organisasi"
          subtitle="Sebaran risiko people pada enam entitas grup: komposisi tingkat risiko, trajektori tiga bulan, karyawan terdampak, dan eksposur finansialnya"
          stat="Overall risk score 68 · seluruh entitas di atas appetite 50"
          breadcrumb="Heatmap per Organisasi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={heatmapKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <TiTrendCard
              title="Trajektori Skor Risiko Entitas"
              subtitle="Dua entitas memburuk dan dua entitas membaik sepanjang semester"
              data={heatmapTrend}
              domain={[45, 80]}
              reference={{ value: 50, color: PALETTE.amber }}
              series={[
                { key: "ptpn4", label: "PTPN IV", color: PALETTE.red },
                { key: "ptpn3", label: "PTPN III", color: PALETTE.amber },
                { key: "ptpn1", label: "PTPN I", color: PALETTE.blue },
                { key: "ptpn6", label: "Sinergi Gula Nusantara", color: PALETTE.green },
              ]}
              footer="Garis putus-putus = risk appetite 50. Tidak ada entitas yang menyentuhnya sepanjang Jan–Jun 2026."
            />
            <TiStackedBarCard
              title="Komposisi Instans Risiko per Entitas"
              subtitle="Jumlah risiko menurut tingkat keparahan"
              data={heatmapStack}
              delay={80}
              series={[
                { key: "high", label: "High", color: PALETTE.red },
                { key: "medium", label: "Medium", color: PALETTE.amber },
                { key: "low", label: "Low", color: PALETTE.green },
              ]}
              footer="Total 28 instans risiko: 11 high, 12 medium, 5 low. PTPN IV satu-satunya entitas tanpa risiko kategori low."
            />
            <BarListCard
              title="Skor Risiko per Entitas"
              subtitle="Skor saat ini dan pergerakan tiga bulan"
              delay={120}
              max={80}
              rows={heatmapScoreBars.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `${o.value}`,
                note: o.note,
                color: o.value >= 70 ? "#ef4444" : o.value >= 60 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Rentang skor 54–76; jarak 22 pts menunjukkan eksposur risiko sangat tidak merata antar entitas."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Risiko per Organisasi"
              subtitle="Komposisi risiko, driver dominan, karyawan terdampak, dan eksposur finansial"
              columns={[
                { key: "org", label: "Organisasi", cellClass: "font-semibold text-ink-900" },
                { key: "high", label: "High", align: "right" },
                { key: "medium", label: "Medium", align: "right" },
                { key: "low", label: "Low", align: "right" },
                { key: "total", label: "Total Risiko", align: "right" },
                { key: "score", label: "Skor", align: "right" },
                { key: "trajectory", label: "Δ 3 Bulan", align: "right" },
                { key: "drivers", label: "Driver Dominan" },
                { key: "karyawan", label: "Karyawan Terdampak", align: "right" },
                { key: "exposure", label: "Eksposur", align: "right" },
                { key: "status", label: "Status" },
              ]}
              rows={heatmapRows.map((r) => ({
                org: r.org,
                high: <span className="font-bold text-[#ef4444]">{r.high}</span>,
                medium: <span className="font-bold text-[#d98b06]">{r.medium}</span>,
                low: <span className="font-bold text-ptpn-green">{r.low}</span>,
                total: r.total,
                score: (
                  <span
                    className={
                      r.score >= 70
                        ? "font-bold text-[#ef4444]"
                        : r.score >= 60
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-ptpn-green"
                    }
                  >
                    {r.score}
                  </span>
                ),
                trajectory: (
                  <span
                    className={
                      r.trajectory > 0 ? "font-bold text-[#ef4444]" : "font-bold text-ptpn-green"
                    }
                  >
                    {r.trajectory > 0 ? `+${r.trajectory}` : r.trajectory}
                  </span>
                ),
                drivers: r.drivers,
                karyawan: r.karyawan,
                exposure: r.exposure,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Kritis" ? "red" : r.status === "Waspada" ? "amber" : "green"}
                  />
                ),
              }))}
              footerRow={{
                org: "Total Grup",
                high: "11",
                medium: "12",
                low: "5",
                total: "28",
                score: "68",
                trajectory: "-4",
                drivers: "Suksesi, Turnover, Skill Gap",
                karyawan: "12.842",
                exposure: "Rp 128,6 M",
                status: "—",
              }}
              note="Skor grup (68) bukan rata-rata sederhana skor entitas melainkan agregasi tertimbang populasi dan eksposur, sehingga entitas besar berbobot lebih besar."
            />
            <NotesPanel notes={heatmapNotes} definitions={heatmapDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
