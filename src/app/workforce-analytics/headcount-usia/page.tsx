import { CalendarRange } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { AgePyramidChart } from "@/components/wa/detail/AgePyramidChart";
import { RetirementForecastChart } from "@/components/wa/detail/RetirementForecastChart";
import {
  ageKpi,
  ageNotes,
  ageRows,
  demografiDefinitions,
} from "@/lib/wa-detail-demografi";

export const metadata = { title: "Headcount by Age Group — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function HeadcountUsiaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<CalendarRange size={19} strokeWidth={1.9} />}
          title="Headcount by Age Group"
          subtitle="Struktur usia workforce — piramida gender, konsentrasi kelompok, dan gelombang pensiun enam tahun ke depan"
          stat="Usia rata-rata 38,4 tahun · 6.494 pensiun sampai 2031"
          breadcrumb="Headcount by Age Group"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={ageKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <AgePyramidChart />
            <RetirementForecastChart />
            <BarListCard
              title="Sebaran Kelompok Usia"
              subtitle="Porsi terhadap total grup"
              delay={120}
              rows={ageRows.map((a) => ({
                label: `${a.band} tahun`,
                value: a.total,
                note: `${dec(a.pct)}%`,
                color: a.color,
              }))}
              footer="Kelompok 31 – 35 tahun terbesar (15.732 orang) dan jadi sasaran utama percepatan kepemimpinan."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Kelompok Usia"
              subtitle="Komposisi gender, masa kerja, dan porsi jabatan manajerial per kelompok"
              columns={[
                { key: "band", label: "Kelompok Usia", cellClass: "font-semibold text-ink-900" },
                { key: "laki", label: "Laki-laki", align: "right" },
                { key: "perempuan", label: "Perempuan", align: "right" },
                { key: "total", label: "Total", align: "right" },
                { key: "pct", label: "% Grup", align: "right" },
                { key: "female", label: "% Perempuan", align: "right" },
                { key: "tenure", label: "Tenure Rata-rata", align: "right" },
                { key: "managerial", label: "Posisi Manajerial", align: "right" },
              ]}
              rows={ageRows.map((a) => ({
                band: `${a.band} tahun`,
                laki: num(a.laki),
                perempuan: num(a.perempuan),
                total: num(a.total),
                pct: `${dec(a.pct)}%`,
                female: `${((a.perempuan / a.total) * 100).toFixed(1).replace(".", ",")}%`,
                tenure: `${dec(a.tenure)} thn`,
                managerial: `${dec(a.managerial)}%`,
              }))}
              footerRow={{
                band: "Total Grup",
                laki: num(ageRows.reduce((s, a) => s + a.laki, 0)),
                perempuan: num(ageRows.reduce((s, a) => s + a.perempuan, 0)),
                total: num(ageRows.reduce((s, a) => s + a.total, 0)),
                pct: "100%",
                female: "27,0%",
                tenure: "9,8 thn",
                managerial: "8,2%",
              }}
              note="Usia pensiun 56 tahun sesuai perjanjian kerja bersama; kelompok > 50 tahun paling terdampak."
            />
            <NotesPanel notes={ageNotes} definitions={demografiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
