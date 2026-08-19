import { TrendingUp } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  trenDefinitions,
  trenDelta,
  trenKpi,
  trenNotes,
  trenRows,
  trenSeries,
} from "@/lib/kinerja-detail";

export const metadata = { title: "Tren Overall Score — Kinerja Karyawan — PTPN Group" };

export default function TrenOverallScoreDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<TrendingUp size={19} strokeWidth={1.9} />}
          title="Tren Overall Score"
          subtitle="Perjalanan skor kinerja grup Jan–Jun 2026, posisi terhadap target RKAP 85,0, dan penggerak kenaikan tiap bulan"
          stat="Overall score 87,6 · +11,2 poin YTD"
          breadcrumb="Tren Overall Score"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={trenKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <TiTrendCard
              title="Tren Overall Score vs Target"
              subtitle="Skor grup, unit tertinggi, dan unit terendah per bulan"
              data={trenSeries}
              domain={[60, 95]}
              reference={{ value: 85, color: PALETTE.amber }}
              series={[
                { key: "grup", label: "PTPN Group", color: PALETTE.green },
                { key: "tertinggi", label: "Unit Tertinggi", color: PALETTE.blue },
                { key: "terendah", label: "Unit Terendah", color: PALETTE.red },
              ]}
              footer="Garis putus-putus = target RKAP 2026 (85,0). Grup melampaui target sejak Jun 2026; unit terendah masih 6,4 poin di bawahnya."
            />
            <BarListCard
              title="Kenaikan Score per Entitas (YTD)"
              subtitle="Selisih skor Jan 2026 ke Jun 2026, dalam poin"
              delay={80}
              max={15}
              rows={trenDelta.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `+${o.value.toFixed(1).replace(".", ",")}`,
                note: o.note,
                color: o.value >= 12 ? "#1a9c5b" : o.value >= 9 ? "#f5a524" : "#ef4444",
              }))}
              footer="Unit dengan skor awal tinggi justru naik paling cepat — kesenjangan antar unit belum mengecil."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rekap Bulanan Overall Score"
              subtitle="Skor, pergerakan, dan posisi terhadap target grup tiap bulan"
              columns={[
                { key: "bulan", label: "Bulan", cellClass: "font-semibold text-ink-900" },
                { key: "score", label: "Overall Score", align: "right" },
                { key: "delta", label: "Δ Bulanan", align: "right" },
                { key: "gap", label: "Gap ke Target 85", align: "right" },
                { key: "dinilai", label: "Karyawan Dinilai", align: "right" },
                { key: "penggerak", label: "Penggerak Utama" },
              ]}
              rows={trenRows.map((r) => ({
                bulan: r.bulan,
                score: <span className="font-bold text-ink-900">{r.score}</span>,
                delta: <span className="font-bold text-ptpn-green">{r.delta}</span>,
                gap: (
                  <span
                    className={
                      r.gap.startsWith("+") ? "font-bold text-ptpn-green" : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.gap}
                  </span>
                ),
                dinilai: r.dinilai,
                penggerak: r.penggerak,
              }))}
              footerRow={{
                bulan: "Jan – Jun 2026",
                score: "87,6",
                delta: "+11,2",
                gap: "+2,6",
                dinilai: "68.142",
                penggerak: "Kaskade KPI, check-in bulanan, dan coaching manajerial",
              }}
              note="Skor bulanan adalah rata-rata berjalan seluruh karyawan yang sudah memiliki penilaian final sampai bulan tersebut; populasi bertambah tiap bulan seiring penyelesaian form."
            />
            <NotesPanel notes={trenNotes} definitions={trenDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
