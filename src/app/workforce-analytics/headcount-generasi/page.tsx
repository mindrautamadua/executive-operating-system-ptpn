import { Users } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { GenerationShiftChart } from "@/components/wa/detail/GenerationShiftChart";
import {
  demografiDefinitions,
  generationKpi,
  generationNotes,
  generationRows,
} from "@/lib/wa-detail-demografi";

export const metadata = { title: "Headcount by Generation — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function HeadcountGenerasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<Users size={19} strokeWidth={1.9} />}
          title="Headcount by Generation"
          subtitle="Peta generasi workforce — ukuran, perilaku kerja, kepemimpinan, dan kesiapan digital tiap kohort"
          stat="4 generasi · Milenial 44,5%"
          breadcrumb="Headcount by Generation"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={generationKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,30fr)_minmax(0,30fr)]">
            <GenerationShiftChart />
            <BarListCard
              title="Turnover per Generasi"
              subtitle="Tingkat keluar 12 bulan terakhir"
              delay={80}
              rows={generationRows.map((g) => ({
                label: g.short,
                value: g.turnover,
                valueLabel: `${dec(g.turnover)}%`,
                note: num(g.headcount),
                color: g.turnover >= 10 ? "#ef4444" : g.turnover >= 6 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Gen Z keluar 3x lebih cepat dari Gen X — retensi tahun pertama jadi titik intervensi."
            />
            <BarListCard
              title="Kemahiran Digital"
              subtitle="Indeks 1 – 5 hasil asesmen kapabilitas"
              delay={120}
              max={5}
              rows={generationRows.map((g) => ({
                label: g.short,
                value: g.digital,
                valueLabel: dec(g.digital),
                note: `engagement ${dec(g.engagement)}`,
                color: g.digital >= 3.5 ? "#1a9c5b" : g.digital >= 2.5 ? "#f5a524" : "#ef4444",
              }))}
              footer="Selisih 2,0 poin antara Gen Z dan Boomers — program upskilling perlu dipisah per kohort."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Generasi"
              subtitle="Ukuran, masa kerja, kepemimpinan, dan mobilitas tiap generasi"
              columns={[
                { key: "name", label: "Generasi", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "pct", label: "% Grup", align: "right" },
                { key: "age", label: "Usia Rata-rata", align: "right" },
                { key: "tenure", label: "Tenure", align: "right" },
                { key: "turnover", label: "Turnover", align: "right" },
                { key: "managerial", label: "Posisi Manajerial", align: "right" },
                { key: "engagement", label: "Engagement", align: "right" },
                { key: "promosi", label: "Promosi YTD", align: "right" },
                { key: "digital", label: "Indeks Digital", align: "right" },
              ]}
              rows={generationRows.map((g) => ({
                name: g.name,
                headcount: num(g.headcount),
                pct: `${dec(g.pct)}%`,
                age: `${dec(g.age)} thn`,
                tenure: `${dec(g.tenure)} thn`,
                turnover: (
                  <span className={g.turnover >= 10 ? "font-bold text-[#ef4444]" : ""}>
                    {dec(g.turnover)}%
                  </span>
                ),
                managerial: `${dec(g.managerial)}%`,
                engagement: `${dec(g.engagement)} / 5`,
                promosi: num(g.promosiYtd),
                digital: `${dec(g.digital)} / 5`,
              }))}
              footerRow={{
                name: "Total Grup",
                headcount: num(generationRows.reduce((s, g) => s + g.headcount, 0)),
                pct: "100%",
                age: "38,4 thn",
                tenure: "9,8 thn",
                turnover: "6,8%",
                managerial: "8,2%",
                engagement: "3,6 / 5",
                promosi: num(generationRows.reduce((s, g) => s + g.promosiYtd, 0)),
                digital: "3,1 / 5",
              }}
              note="Engagement berasal dari survei semesteran; asesmen digital dijalankan setahun sekali."
            />
            <NotesPanel notes={generationNotes} definitions={demografiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
