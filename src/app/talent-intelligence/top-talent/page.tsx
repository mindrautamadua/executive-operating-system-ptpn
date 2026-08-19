import { Star } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill, readinessTone, riskTone } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  topTalentByOrg,
  topTalentDefinitions,
  topTalentKpi,
  topTalentNotes,
  topTalentRows,
  topTalentScoreBands,
} from "@/lib/ti-detail";

export const metadata = { title: "Top Talent by Potential — Talent Intelligence — PTPN Group" };

export default function TopTalentPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Star size={19} strokeWidth={1.9} />}
          title="Top Talent by Potential"
          subtitle="Daftar talenta berpotensi tertinggi, posisi target suksesi, dan profil risikonya"
          stat="1.068 HiPo · skor rata-rata 8,4"
          breadcrumb="Top Talent"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={topTalentKpi} />

          <div className="grid auto-rows-[minmax(212px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <BarListCard
              title="HiPo per Entitas"
              subtitle="Jumlah talenta HiPo dan porsinya terhadap talenta entitas"
              delay={40}
              rows={topTalentByOrg.map((o) => ({
                label: o.label,
                value: o.value,
                note: o.note,
                color: "#1a9c5b",
              }))}
              footer="PTPN III dan PTPN IV menyumbang 424 HiPo atau 39,7% populasi HiPo grup."
            />
            <BarListCard
              title="Sebaran Skor Potensi"
              subtitle="Jumlah HiPo per rentang skor komposit"
              delay={80}
              rows={topTalentScoreBands.map((b) => ({
                label: b.label,
                value: b.value,
                note: b.note,
                color: "#8b5cf6",
              }))}
              footer="68 talenta berskor di atas 9,0 — inti pool suksesi posisi General Manager dan SVP."
            />
            <BarListCard
              title="Status Kesiapan HiPo"
              subtitle="Distribusi 1.068 HiPo pada tahap kesiapan"
              delay={120}
              rows={[
                { label: "Ready Now", value: 268, note: "25,1%", color: "#0f7a44" },
                { label: "Ready in 1–2 Tahun", value: 384, note: "36,0%", color: "#3cae6a" },
                { label: "Ready in 3–5 Tahun", value: 306, note: "28,7%", color: "#f2c53d" },
                { label: "Belum masuk pool suksesi", value: 110, note: "10,3%", color: "#cbd5e1" },
              ]}
              footer="Hanya seperempat HiPo yang siap mengisi posisi kritikal tanpa development tambahan."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Peringkat Talenta Berpotensi Tertinggi"
              subtitle="18 talenta dengan skor potensi tertinggi hasil kalibrasi panel talent review 2026"
              columns={[
                { key: "rank", label: "#", align: "right" },
                { key: "nama", label: "Nama", cellClass: "font-semibold text-ink-900" },
                { key: "jabatan", label: "Jabatan" },
                { key: "unit", label: "Entitas" },
                { key: "score", label: "Skor", align: "right", cellClass: "font-extrabold text-ink-900" },
                { key: "performance", label: "Performance", align: "right" },
                { key: "potential", label: "Potential", align: "right" },
                { key: "readiness", label: "Readiness" },
                { key: "posisiTarget", label: "Posisi Target" },
                { key: "flightRisk", label: "Flight Risk" },
              ]}
              rows={topTalentRows.map((t) => ({
                rank: t.rank,
                nama: t.nama,
                jabatan: t.jabatan,
                unit: t.unit,
                score: t.score,
                performance: t.performance,
                potential: t.potential,
                readiness: <Pill label={t.readiness} tone={readinessTone(t.readiness)} />,
                posisiTarget: t.posisiTarget,
                flightRisk: <Pill label={t.flightRisk} tone={riskTone(t.flightRisk)} />,
              }))}
              note="Skor potensi = komposit asesmen potensi (60%), kinerja dua siklus (30%), dan penilaian panel (10%). Performance & Potential pada skala 1–5."
            />
            <NotesPanel notes={topTalentNotes} definitions={topTalentDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
