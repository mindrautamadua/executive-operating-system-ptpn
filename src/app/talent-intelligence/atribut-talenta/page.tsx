import { Brain } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { TiRadarCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  attributeByOrg,
  attributeDefinitions,
  attributeDetail,
  attributeKpi,
  attributeNotes,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Attributes Insight — Talent Intelligence — PTPN Group" };

const dec = (v: number) => v.toString().replace(".", ",");
const signed = (v: number) => `${v > 0 ? "+" : ""}${dec(v)}`;

export default function TalentAttributesPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Brain size={19} strokeWidth={1.9} />}
          title="Talent Attributes Insight"
          subtitle="Profil kapabilitas talenta terhadap benchmark industri, sebarannya per lapis jabatan dan entitas"
          stat="Skor rata-rata 4,00 · 3 dari 6 atribut di atas benchmark"
          breadcrumb="Talent Attributes"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={attributeKpi} />

          <div className="grid auto-rows-[266px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,33fr)_minmax(0,33fr)]">
            <TiRadarCard
              title="Profil Kapabilitas vs Benchmark"
              subtitle="Skala 1–5, area abu-abu = benchmark industri"
              data={attributeDetail.map((a) => ({
                label: a.label.replace(" & Adaptability", ""),
                score: a.score,
                benchmark: a.benchmark,
              }))}
              footer="Unggul di Leadership dan Agility, tertinggal di Technical Expertise dan Digital Literacy."
            />
            <BarListCard
              title="Gap terhadap Benchmark"
              subtitle="Selisih skor PTPN Group dengan median industri"
              delay={40}
              max={0.3}
              rows={attributeDetail.map((a) => ({
                label: a.label,
                value: Math.abs(a.gap),
                valueLabel: signed(a.gap),
                note: `${dec(a.score)} vs ${dec(a.benchmark)}`,
                color: a.gap >= 0 ? "#1a9c5b" : a.gap >= -0.15 ? "#f5a524" : "#ef4444",
              }))}
              footer="Panjang bar menunjukkan besar selisih; warna menunjukkan arah terhadap benchmark."
            />
            <BarListCard
              title="Talenta dalam Program Penguatan"
              subtitle="Peserta program pengembangan per atribut"
              delay={80}
              rows={attributeDetail.map((a) => ({
                label: a.label,
                value: a.program,
                note: `${dec(Number(((a.program / 3228) * 100).toFixed(1)))}% peserta`,
                color: "#8b5cf6",
              }))}
              footer="742 talenta menguatkan Technical Expertise dan 503 Digital Literacy — dua gap terbesar."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Skor Atribut per Lapis Jabatan"
                subtitle="Sebaran kapabilitas dari lapis eksekutif hingga supervisor"
                columns={[
                  { key: "label", label: "Atribut", cellClass: "font-semibold text-ink-900" },
                  { key: "score", label: "Skor Grup", align: "right", cellClass: "font-extrabold text-ink-900" },
                  { key: "benchmark", label: "Benchmark", align: "right" },
                  { key: "gap", label: "Gap", align: "right" },
                  { key: "l1", label: "Direktur & SVP", align: "right" },
                  { key: "l2", label: "General Manager", align: "right" },
                  { key: "l3", label: "Manajer", align: "right" },
                  { key: "l4", label: "Supervisor", align: "right" },
                  { key: "keterangan", label: "Catatan" },
                ]}
                rows={attributeDetail.map((a) => ({
                  label: a.label,
                  score: dec(a.score),
                  benchmark: dec(a.benchmark),
                  gap: (
                    <span className={a.gap >= 0 ? "font-bold text-ptpn-green" : "font-bold text-[#ef4444]"}>
                      {signed(a.gap)}
                    </span>
                  ),
                  l1: dec(a.perLapis[0]),
                  l2: dec(a.perLapis[1]),
                  l3: dec(a.perLapis[2]),
                  l4: dec(a.perLapis[3]),
                  keterangan: <span className="whitespace-normal text-ink-500">{a.keterangan}</span>,
                }))}
                note="Skala 1–5. Gap dihitung terhadap median perusahaan agribisnis dan BUMN sejenis pada survei kapabilitas 2025."
              />

              <DetailTable
                title="Kapabilitas per Entitas"
                subtitle="Empat atribut kunci dan rata-rata kapabilitas tiap entitas"
                columns={[
                  { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                  { key: "leadership", label: "Leadership", align: "right" },
                  { key: "technical", label: "Technical Expertise", align: "right" },
                  { key: "digital", label: "Digital Literacy", align: "right" },
                  { key: "business", label: "Business Acumen", align: "right" },
                  { key: "rata", label: "Rata-rata", align: "right" },
                ]}
                rows={attributeByOrg.map((o) => ({
                  name: o.name,
                  leadership: dec(o.leadership),
                  technical: dec(o.technical),
                  digital: dec(o.digital),
                  business: dec(o.business),
                  rata: (
                    <span
                      className={
                        o.rata >= 4.0 ? "font-bold text-ptpn-green" : o.rata >= 3.9 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                      }
                    >
                      {dec(o.rata)}
                    </span>
                  ),
                }))}
                footerRow={{
                  name: "Total Grup",
                  leadership: "4,2",
                  technical: "3,9",
                  digital: "3,8",
                  business: "4,0",
                  rata: "4,00",
                }}
                note="PTPN I Regional 1 terendah pada seluruh atribut kunci — konsisten dengan porsi Star terendah (25,2%)."
              />
            </div>
            <NotesPanel notes={attributeNotes} definitions={attributeDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
