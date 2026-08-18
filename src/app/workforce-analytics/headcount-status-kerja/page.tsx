import { BriefcaseBusiness } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { CompositionTrendChart } from "@/components/wa/trend/CompositionTrendChart";
import { TypeByOrgChart } from "@/components/wa/detail/TypeByOrgChart";
import {
  komposisiDefinitions,
  typeKpi,
  typeNotes,
  typeRows,
} from "@/lib/wa-detail-komposisi";

export const metadata = {
  title: "Headcount by Employment Type — Workforce Analytics — PTPN Group",
};

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function HeadcountStatusKerjaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<BriefcaseBusiness size={19} strokeWidth={1.9} />}
          title="Headcount by Employment Type"
          subtitle="Komposisi status kerja — tetap, PKWT, BHL, magang — beserta biaya, turnover, dan jalur konversi"
          stat="52.146 tetap · 15.623 tidak tetap"
          breadcrumb="Headcount by Employment Type"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={typeKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <CompositionTrendChart />
            <TypeByOrgChart />
            <BarListCard
              title="Turnover per Status Kerja"
              subtitle="Tingkat keluar 12 bulan terakhir"
              delay={120}
              rows={typeRows
                .filter((t) => t.turnover > 0)
                .map((t) => ({
                  label: t.name,
                  value: t.turnover,
                  valueLabel: `${dec(t.turnover)}%`,
                  note: num(t.headcount),
                  color: t.turnover >= 15 ? "#ef4444" : t.turnover >= 8 ? "#f5a524" : "#1a9c5b",
                }))}
              footer="Turnover BHL 5,3x karyawan tetap — biaya rekrutmen ulang menekan produktivitas panen."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Status Kerja"
              subtitle="Ukuran, biaya, dan dinamika tiap status kerja"
              columns={[
                { key: "name", label: "Status Kerja", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "pct", label: "% Grup", align: "right" },
                { key: "net", label: "Net YTD", align: "right" },
                { key: "tenure", label: "Tenure Rata-rata", align: "right" },
                { key: "turnover", label: "Turnover", align: "right" },
                { key: "cost", label: "Biaya/Kepala (Rp jt)", align: "right" },
                { key: "konversi", label: "Konversi ke Tetap YTD", align: "right" },
              ]}
              rows={typeRows.map((t) => ({
                name: t.name,
                headcount: num(t.headcount),
                pct: `${dec(t.pct)}%`,
                net: <span className="font-bold text-ptpn-green">+{num(t.netYtd)}</span>,
                tenure: `${dec(t.tenure)} thn`,
                turnover: t.turnover === 0 ? "—" : `${dec(t.turnover)}%`,
                cost: dec(t.costPerHead),
                konversi: t.konversi === 0 ? "—" : num(t.konversi),
              }))}
              footerRow={{
                name: "Total Grup",
                headcount: num(typeRows.reduce((s, t) => s + t.headcount, 0)),
                pct: "100%",
                net: `+${num(typeRows.reduce((s, t) => s + t.netYtd, 0))}`,
                tenure: "9,8 thn",
                turnover: "6,8%",
                cost: "7,6",
                konversi: num(typeRows.reduce((s, t) => s + t.konversi, 0)),
              }}
              note="Magang tidak dihitung dalam turnover karena berakhir sesuai masa program."
            />
            <NotesPanel notes={typeNotes} definitions={komposisiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
