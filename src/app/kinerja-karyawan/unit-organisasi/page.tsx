import { Building2 } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  unitDefinitions,
  unitKpi,
  unitNotes,
  unitRanking,
  unitRows,
  unitTrend,
} from "@/lib/kinerja-detail";

export const metadata = { title: "Kinerja per Unit Organisasi — Kinerja Karyawan — PTPN Group" };

export default function KinerjaUnitOrganisasiDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<Building2 size={19} strokeWidth={1.9} />}
          title="Kinerja per Unit Organisasi"
          subtitle="Peringkat lengkap sepuluh entitas grup, jarak terhadap target RKAP 85,0, dan status kalibrasi tiap unit"
          stat="Spread 12,6 poin · 5 dari 10 unit di atas target"
          breadcrumb="Kinerja per Unit Organisasi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={unitKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <BarListCard
              title="Peringkat Overall Score Unit"
              subtitle="Rata-rata skor kinerja karyawan tiap entitas, Q2 2026"
              max={95}
              rows={unitRanking.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: o.valueLabel,
                note: o.value >= 85 ? "≥ target" : `-${(85 - o.value).toFixed(1).replace(".", ",")} vs target`,
                color: o.value >= 85 ? "#1a9c5b" : o.value >= 82 ? "#f5a524" : "#ef4444",
              }))}
              footer="Lima unit teratas sudah melewati target 85,0; lima sisanya menahan rata-rata grup."
            />
            <TiTrendCard
              title="Tren Unit Ekstrem (Jan–Jun 2026)"
              subtitle="Dua unit teratas dan dua unit terbawah"
              data={unitTrend}
              delay={80}
              domain={[68, 94]}
              reference={{ value: 85, color: PALETTE.amber }}
              series={[
                { key: "r1", label: "PTPN IV Regional 1", color: PALETTE.green },
                { key: "ptpn3", label: "PTPN III (Persero)", color: PALETTE.blue },
                { key: "r5", label: "PTPN I Regional 5", color: PALETTE.amber },
                { key: "supporting", label: "Supporting Co", color: PALETTE.red },
              ]}
              footer="Kedua unit teratas melampaui target sejak April; unit terbawah belum menyentuh garis target sepanjang semester."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Kinerja per Unit Organisasi"
              subtitle="Skor, komposisi kategori, pencapaian KPI, dan status kalibrasi"
              columns={[
                { key: "unit", label: "Unit Organisasi", cellClass: "font-semibold text-ink-900" },
                { key: "karyawan", label: "Karyawan Dinilai", align: "right" },
                { key: "score", label: "Overall Score", align: "right" },
                { key: "delta", label: "Δ YTD", align: "right" },
                { key: "outstanding", label: "Outstanding", align: "right" },
                { key: "below", label: "Below + Poor", align: "right" },
                { key: "pencapaian", label: "Pencapaian KPI", align: "right" },
                { key: "kalibrasi", label: "Kalibrasi" },
                { key: "status", label: "Status" },
              ]}
              rows={unitRows.map((r) => ({
                unit: r.unit,
                karyawan: r.karyawan.toLocaleString("id-ID"),
                score: (
                  <span
                    className={
                      Number(r.score.replace(",", ".")) >= 85
                        ? "font-bold text-ptpn-green"
                        : Number(r.score.replace(",", ".")) >= 82
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.score}
                  </span>
                ),
                delta: <span className="font-bold text-ptpn-green">{r.delta}</span>,
                outstanding: r.outstanding,
                below: <span className="font-bold text-[#ef4444]">{r.below}</span>,
                pencapaian: r.pencapaian,
                kalibrasi: (
                  <Pill
                    label={r.kalibrasi}
                    tone={r.kalibrasi === "Selesai" ? "green" : r.kalibrasi === "Berjalan" ? "amber" : "red"}
                  />
                ),
                status: (
                  <Pill
                    label={r.status}
                    tone={
                      r.status === "Di atas target" ? "green" : r.status === "Mendekati target" ? "amber" : "red"
                    }
                  />
                ),
              }))}
              footerRow={{
                unit: "Total Grup",
                karyawan: "68.142",
                score: "87,6",
                delta: "+11,2",
                outstanding: "18,7%",
                below: "7,2%",
                pencapaian: "76,8%",
                kalibrasi: "8 dari 10 selesai",
                status: "—",
              }}
              note="Skor grup (87,6) merupakan rata-rata tertimbang populasi, sehingga lebih tinggi dari median unit (83,9) karena unit besar berkinerja di atas rata-rata."
            />
            <NotesPanel notes={unitNotes} definitions={unitDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
