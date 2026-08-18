import { PieChart } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { TiDonutCard, TiStackedBarCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { KATEGORI_COLOR } from "@/lib/kinerja-data";
import {
  distribusiDefinitions,
  distribusiDonut,
  distribusiKpi,
  distribusiNotes,
  distribusiRows,
  distribusiTrend,
  distribusiUnderperform,
} from "@/lib/kinerja-detail";

export const metadata = { title: "Distribusi Kinerja — Kinerja Karyawan — PTPN Group" };

export default function DistribusiKinerjaDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<PieChart size={19} strokeWidth={1.9} />}
          title="Distribusi Kinerja"
          subtitle="Sebaran kategori kinerja 68.142 karyawan yang dinilai, pergeseran kurva antar kuartal, dan konsentrasi underperformer per entitas"
          stat="68.142 karyawan dinilai · Overall score 87,6"
          breadcrumb="Distribusi Kinerja"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={distribusiKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,38fr)_minmax(0,28fr)]">
            <TiDonutCard
              title="Komposisi Kategori Q2 2026"
              subtitle="Jumlah karyawan per kategori kinerja"
              data={distribusiDonut}
              centerValue="68.142"
              centerLabel="Karyawan dinilai"
              footer="Above Target menampung 53,6% populasi — konsentrasi normal untuk kurva penilaian terkelola."
            />
            <TiStackedBarCard
              title="Pergeseran Kurva (4 Kuartal)"
              subtitle="Porsi tiap kategori kinerja terhadap populasi dinilai"
              data={distribusiTrend}
              delay={80}
              unit="%"
              series={[
                { key: "outstanding", label: "Outstanding", color: KATEGORI_COLOR.Outstanding },
                { key: "above", label: "Above Target", color: KATEGORI_COLOR["Above Target"] },
                { key: "on", label: "On Target", color: KATEGORI_COLOR["On Target"] },
                { key: "below", label: "Below Target", color: KATEGORI_COLOR["Below Target"] },
                { key: "poor", label: "Poor", color: KATEGORI_COLOR.Poor },
              ]}
              footer="Outstanding naik 4,5 ppts dalam empat kuartal sementara Poor turun dari 2,1% ke 1,2%."
            />
            <BarListCard
              title="Below Target + Poor per Entitas"
              subtitle="Porsi karyawan berkinerja di bawah standar"
              delay={120}
              max={14}
              rows={distribusiUnderperform.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `${o.value.toFixed(1).replace(".", ",")}%`,
                note: o.note,
                color: o.value >= 9 ? "#ef4444" : o.value >= 7 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="PTPN I Regional 5 tertinggi (11,4%) — 612 karyawan masuk kandidat Performance Improvement Plan."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Distribusi Kategori per Entitas"
              subtitle="Komposisi kinerja dan skor rata-rata tiap entitas grup"
              columns={[
                { key: "entitas", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "dinilai", label: "Dinilai", align: "right" },
                { key: "outstanding", label: "Outstanding", align: "right" },
                { key: "above", label: "Above Target", align: "right" },
                { key: "on", label: "On Target", align: "right" },
                { key: "below", label: "Below Target", align: "right" },
                { key: "poor", label: "Poor", align: "right" },
                { key: "score", label: "Overall Score", align: "right" },
                { key: "status", label: "Status" },
              ]}
              rows={distribusiRows.map((r) => ({
                entitas: r.entitas,
                dinilai: r.dinilai.toLocaleString("id-ID"),
                outstanding: (
                  <span className="font-bold text-ptpn-green">
                    {r.outstanding.toFixed(1).replace(".", ",")}%
                  </span>
                ),
                above: `${r.above.toFixed(1).replace(".", ",")}%`,
                on: `${r.on.toFixed(1).replace(".", ",")}%`,
                below: `${r.below.toFixed(1).replace(".", ",")}%`,
                poor: (
                  <span className="font-bold text-[#ef4444]">
                    {r.poor.toFixed(1).replace(".", ",")}%
                  </span>
                ),
                score: <span className="font-bold text-ink-900">{r.score}</span>,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Sehat" ? "green" : r.status === "Perlu Kalibrasi" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                entitas: "Total Grup",
                dinilai: "68.142",
                outstanding: "18,7%",
                above: "53,6%",
                on: "20,5%",
                below: "6,0%",
                poor: "1,2%",
                score: "87,6",
                status: "—",
              }}
              note="Persentase kategori dihitung terhadap populasi dinilai tiap entitas, sehingga jumlah baris selalu 100%. Status kalibrasi merujuk hasil forum kalibrasi lintas unit Q2 2026."
            />
            <NotesPanel notes={distribusiNotes} definitions={distribusiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
