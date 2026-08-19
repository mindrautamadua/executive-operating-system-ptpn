import { Target } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill, readinessTone, riskTone } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  matchBands,
  matchDefinitions,
  matchKpi,
  matchNotes,
  matchRows,
  matchSkillGaps,
} from "@/lib/ti-detail";

export const metadata = { title: "Role–Talent–Skill Match — Talent Intelligence — PTPN Group" };

export default function RoleMatchPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Target size={19} strokeWidth={1.9} />}
          title="Role–Talent–Skill Match"
          subtitle="Kesesuaian profil skill kandidat terbaik terhadap persyaratan tiap posisi kritikal, beserta gap yang harus ditutup"
          stat="Match rata-rata 82% · 31 posisi di bawah 70%"
          breadcrumb="Role–Talent Match"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={matchKpi} />

          <div className="grid auto-rows-[minmax(212px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <BarListCard
              title="Sebaran Match Score"
              subtitle="Jumlah posisi kritikal per rentang kesesuaian kandidat terbaik"
              delay={40}
              rows={matchBands.map((b, i) => ({
                label: b.label,
                value: b.value,
                note: b.note,
                color: ["#0f7a44", "#3cae6a", "#f2c53d", "#f5a524", "#ef4444"][i],
              }))}
              footer="94 posisi (45,2%) sudah punya kandidat dengan kesesuaian minimal 85%."
            />
            <BarListCard
              title="Skill Gap Terbanyak"
              subtitle="Jumlah posisi dengan skill tersebut sebagai gap terbesar"
              delay={80}
              rows={matchSkillGaps.map((g) => ({
                label: g.label,
                value: g.value,
                note: g.note,
                color: g.value >= 35 ? "#ef4444" : g.value >= 25 ? "#f5a524" : "#94a3b8",
              }))}
              footer="Business Acumen dan Digital/Analytics menyumbang 38,5% seluruh gap posisi kritikal."
            />
            <BarListCard
              title="Sumber Pengisian Posisi"
              subtitle="Rencana pengisian 208 posisi kritikal 12 bulan ke depan"
              delay={120}
              rows={[
                { label: "Kandidat internal siap", value: 94, note: "45,2%", color: "#0f7a44" },
                { label: "Internal setelah akselerasi", value: 62, note: "29,8%", color: "#3cae6a" },
                { label: "Rotasi lintas entitas", value: 21, note: "10,1%", color: "#3b7ded" },
                { label: "Rekrutmen eksternal", value: 31, note: "14,9%", color: "#ef4444" },
              ]}
              footer="Mengisi 47 posisi dari HiPo internal memangkas lead time 8–12 bulan menjadi 2–3 bulan."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Pemetaan Posisi, Kandidat Terbaik, dan Skill Gap"
              subtitle="Dua belas posisi kritikal prioritas dengan kandidat berperingkat teratas"
              columns={[
                { key: "posisi", label: "Posisi", cellClass: "font-semibold text-ink-900" },
                { key: "unit", label: "Entitas" },
                { key: "skills", label: "Skill Wajib (level minimal)" },
                { key: "kandidat", label: "Kandidat Terbaik", cellClass: "font-semibold text-ink-900" },
                { key: "score", label: "Skor", align: "right" },
                { key: "match", label: "Match", align: "right" },
                { key: "gap", label: "Gap Terbesar" },
                { key: "readiness", label: "Readiness" },
                { key: "flightRisk", label: "Flight Risk" },
                { key: "rekomendasi", label: "Rekomendasi" },
              ]}
              rows={matchRows.map((r) => ({
                posisi: r.posisi,
                unit: r.unit,
                skills: <span className="whitespace-normal text-ink-500">{r.skills}</span>,
                kandidat: r.kandidat,
                score: r.score,
                match: (
                  <span
                    className={
                      r.match >= 85 ? "font-bold text-ptpn-green" : r.match >= 75 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.match}%
                  </span>
                ),
                gap: r.gap,
                readiness: <Pill label={r.readiness} tone={readinessTone(r.readiness)} />,
                flightRisk: <Pill label={r.flightRisk} tone={riskTone(r.flightRisk)} />,
                rekomendasi: <span className="whitespace-normal">{r.rekomendasi}</span>,
              }))}
              note="Match score = kesesuaian profil skill kandidat terhadap persyaratan posisi, dibobot tingkat kepentingan tiap skill. Level skill pada skala 1–5."
            />
            <NotesPanel notes={matchNotes} definitions={matchDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
