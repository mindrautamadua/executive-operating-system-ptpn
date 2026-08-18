import { Handshake } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { DiversityTrendChart } from "@/components/wa/detail/DiversityTrendChart";
import {
  demografiDefinitions,
  diversityByOrg,
  diversityKpi,
  diversityMetrics,
  diversityNotes,
} from "@/lib/wa-detail-demografi";
import { levelRows } from "@/lib/wa-detail-komposisi";

export const metadata = { title: "Diversity Snapshot — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function DiversityPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<Handshake size={19} strokeWidth={1.9} />}
          title="Diversity Snapshot"
          subtitle="Keragaman workforce terhadap target korporat — gender, disabilitas, usia, dan masa kerja lintas entitas"
          stat="Perempuan 27,0% · Disabilitas 1,25%"
          breadcrumb="Diversity Snapshot"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={diversityKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,30fr)_minmax(0,30fr)]">
            <DiversityTrendChart />
            <BarListCard
              title="Perempuan per Lapis Jabatan"
              subtitle="Porsi perempuan (%) di tiap lapis"
              delay={80}
              max={35}
              rows={levelRows.map((l) => ({
                label: l.name,
                value: l.female,
                valueLabel: `${dec(l.female)}%`,
                color: l.female >= 25 ? "#8b5cf6" : l.female >= 18 ? "#f5a524" : "#ef4444",
              }))}
              footer="Piramida kepemimpinan menyempit: 29,4% di Staff menjadi 12,1% di Direktur & SVP."
            />
            <BarListCard
              title="Capaian vs Target"
              subtitle="Metrik dengan target korporat 2027"
              delay={120}
              max={35}
              rows={diversityMetrics
                .filter((m) => m.target > 0)
                .map((m) => ({
                  label: m.label,
                  value: m.value,
                  valueLabel: `${dec(m.value)}%`,
                  note: `target ${m.target}%`,
                  color: m.value >= m.target ? "#1a9c5b" : m.value / m.target >= 0.8 ? "#f5a524" : "#ef4444",
                }))}
              footer="Ketiga metrik masih di bawah target; kekurangan disabilitas setara 527 pekerja."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Keragaman per Entitas"
              subtitle="Sebaran capaian keragaman di tujuh entitas grup"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "perempuan", label: "Perempuan", align: "right" },
                { key: "gapGender", label: "Selisih ke 30%", align: "right" },
                { key: "manajerial", label: "Perempuan Manajerial", align: "right" },
                { key: "disabilitas", label: "Disabilitas", align: "right" },
                { key: "gapDis", label: "Selisih ke 2%", align: "right" },
                { key: "usia45", label: "Usia > 45 Thn", align: "right" },
              ]}
              rows={diversityByOrg.map((o) => {
                const gapGender = Number((o.perempuan - 30).toFixed(1));
                const gapDis = Number((o.disabilitas - 2).toFixed(2));
                return {
                  name: o.name,
                  headcount: num(o.headcount),
                  perempuan: `${dec(o.perempuan)}%`,
                  gapGender: (
                    <span className={gapGender >= 0 ? "font-bold text-ptpn-green" : "font-bold text-[#ef4444]"}>
                      {gapGender > 0 ? "+" : ""}
                      {dec(gapGender)} pp
                    </span>
                  ),
                  manajerial: `${dec(o.manajerial)}%`,
                  disabilitas: `${dec(o.disabilitas)}%`,
                  gapDis: (
                    <span className={gapDis >= 0 ? "font-bold text-ptpn-green" : "font-bold text-[#ef4444]"}>
                      {gapDis > 0 ? "+" : ""}
                      {dec(gapDis)} pp
                    </span>
                  ),
                  usia45: `${dec(o.usia45)}%`,
                };
              })}
              footerRow={{
                name: "Total Grup",
                headcount: "70.142",
                perempuan: "27,0%",
                gapGender: "-3,0 pp",
                manajerial: "19,4%",
                disabilitas: "1,25%",
                gapDis: "-0,75 pp",
                usia45: "18,7%",
              }}
              note="Target korporat 2027: perempuan 30%, perempuan manajerial 25%, disabilitas 2% (kewajiban regulasi)."
            />
            <NotesPanel notes={diversityNotes} definitions={demografiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
