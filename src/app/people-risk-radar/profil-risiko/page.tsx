import { Radar } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  profilBars,
  profilDefinitions,
  profilKpi,
  profilNotes,
  profilRows,
  profilTrend,
} from "@/lib/prr-detail";

export const metadata = { title: "Profil Risiko People — People Risk Radar — PTPN Group" };

export default function ProfilRisikoPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<Radar size={19} strokeWidth={1.9} />}
          title="Profil Risiko People"
          subtitle="Sepuluh risiko pada register people: skor, kecepatan perubahan, populasi terdampak, pemilik risiko, dan treatment yang menanganinya"
          stat="10 risiko · 7 di atas risk appetite 50"
          breadcrumb="Profil Risiko"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={profilKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <BarListCard
              title="Skor Seluruh Risiko"
              subtitle="Register people risk, urut dari skor tertinggi"
              max={90}
              rows={profilBars.map((r) => ({
                label: r.label,
                value: r.value,
                valueLabel: `${r.value}`,
                note: r.note,
                color: r.value >= 70 ? "#ef4444" : r.value >= 50 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Tujuh dari sepuluh risiko berada di atas risk appetite 50."
            />
            <TiTrendCard
              title="Pergerakan Empat Risiko Utama"
              subtitle="Skor bulanan Jan–Jun 2026"
              data={profilTrend}
              delay={80}
              domain={[55, 90]}
              reference={{ value: 50, color: PALETTE.amber }}
              series={[
                { key: "vacancy", label: "Critical Position Vacancy", color: PALETTE.red },
                { key: "succession", label: "Succession Risk", color: PALETTE.amber },
                { key: "turnover", label: "Turnover Risk", color: PALETTE.purple },
                { key: "skill", label: "Critical Skill Gap", color: PALETTE.green },
              ]}
              footer="Turnover naik 11 pts sementara skill gap turun 7 pts — arah dua risiko besar saling berlawanan."
            />
            <BarListCard
              title="Karyawan Terdampak per Risiko"
              subtitle="Estimasi populasi bila risiko terealisasi"
              delay={120}
              max={7000}
              rows={profilRows
                .filter((r) => r.impacted !== "—")
                .map((r) => ({
                  label: r.risiko,
                  value: Number(r.impacted.replace(".", "")),
                  valueLabel: r.impacted,
                  note: `skor ${r.score}`,
                  color: r.score >= 70 ? "#ef4444" : r.score >= 50 ? "#f5a524" : "#1a9c5b",
                }))}
              footer="Aging Workforce menyentuh populasi terbesar (6.385) meski skornya hanya 53 — dampak luas, urgensi sedang."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Register Risiko People"
              subtitle="Skor, velocity, kategori, pemilik risiko, dan treatment yang berjalan"
              columns={[
                { key: "risiko", label: "Risiko", cellClass: "font-semibold text-ink-900" },
                { key: "score", label: "Skor", align: "right" },
                { key: "level", label: "Level" },
                { key: "velocity", label: "Velocity", align: "right" },
                { key: "impacted", label: "Karyawan Terdampak", align: "right" },
                { key: "kategori", label: "Kategori" },
                { key: "owner", label: "Risk Owner" },
                { key: "treatment", label: "Treatment Berjalan" },
              ]}
              rows={profilRows.map((r) => ({
                risiko: r.risiko,
                score: (
                  <span
                    className={
                      r.score >= 70
                        ? "font-bold text-[#ef4444]"
                        : r.score >= 50
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-ptpn-green"
                    }
                  >
                    {r.score}
                  </span>
                ),
                level: (
                  <Pill
                    label={r.level}
                    tone={r.level === "High" ? "red" : r.level === "Medium" ? "amber" : "green"}
                  />
                ),
                velocity: (
                  <span
                    className={
                      r.velocity > 0
                        ? "font-bold text-[#ef4444]"
                        : r.velocity < 0
                          ? "font-bold text-ptpn-green"
                          : "font-bold text-ink-400"
                    }
                  >
                    {r.velocity > 0 ? `+${r.velocity}` : r.velocity}
                  </span>
                ),
                impacted: r.impacted,
                kategori: r.kategori,
                owner: r.owner,
                treatment: r.treatment,
              }))}
              footerRow={{
                risiko: "Total Register",
                score: "68",
                level: "4 High",
                velocity: "-4",
                impacted: "12.842",
                kategori: "8 kategori",
                owner: "HC Holding",
                treatment: "8 treatment aktif",
              }}
              note="Skor grup 68 adalah agregasi tertimbang seluruh risiko, bukan rata-rata sederhana; risiko dengan populasi terdampak besar berbobot lebih tinggi."
            />
            <NotesPanel notes={profilNotes} definitions={profilDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
