import { GraduationCap } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { RoiChain } from "@/components/ti/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  devByOrg,
  devDefinitions,
  devInvestmentTrend,
  devNotes,
  devPrograms,
  devRoiChain,
  developmentKpi,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Development Focus — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function TalentDevelopmentPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<GraduationCap size={19} strokeWidth={1.9} />}
          title="Talent Development Focus"
          subtitle="Fokus pengembangan talenta, realisasi investasi, dan rantai dampaknya sampai ke kinerja"
          stat="Rp 24,8 M · 3.228 peserta · completion 87%"
          breadcrumb="Talent Development"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={developmentKpi} />

          <RoiChain
            steps={devRoiChain}
            note="Kontribusi terestimasi, bukan ROI kausal — atribusi penuh membutuhkan model evaluasi dampak (fase berikutnya)."
          />

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,32fr)_minmax(0,32fr)]">
            <TiTrendCard
              title="Realisasi Investasi Bulanan"
              subtitle="Investasi development (Rp miliar) dan jumlah peserta per bulan"
              data={devInvestmentTrend}
              delay={40}
              series={[
                { key: "investasi", label: "Investasi (Rp M)", color: PALETTE.green },
              ]}
              footer="Realisasi Rp 24,8 M setara 61% pagu tahunan Rp 40,6 M; laju bulanan naik sejak Maret."
            />
            <BarListCard
              title="Peserta per Fokus Pengembangan"
              subtitle="Jumlah talenta yang mengikuti tiap fokus program"
              delay={80}
              rows={devPrograms.map((p, i) => ({
                label: p.fokus,
                value: p.peserta,
                note: `${p.program} program`,
                color: ["#3b7ded", "#8b5cf6", "#1a9c5b", "#0d9488"][i],
              }))}
              footer="Seorang talenta dapat mengikuti lebih dari satu fokus, sehingga total melebihi 3.228 peserta unik."
            />
            <BarListCard
              title="Investasi per Entitas"
              subtitle="Realisasi investasi development YTD (Rp miliar)"
              delay={120}
              rows={devByOrg.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `Rp ${dec(o.value)} M`,
                note: o.note,
                color: o.value >= 4 ? "#1a9c5b" : o.value >= 3 ? "#f5a524" : "#ef4444",
              }))}
              footer="Selisih 2,9x antara PTPN IV (Rp 5,2 M) dan PTPN I Regional 1 (Rp 1,8 M)."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Efektivitas Fokus Pengembangan"
              subtitle="Serapan biaya, penyelesaian, dan hasil tiap fokus program"
              columns={[
                { key: "fokus", label: "Fokus Pengembangan", cellClass: "font-semibold text-ink-900" },
                { key: "peserta", label: "Peserta", align: "right" },
                { key: "program", label: "Jumlah Program", align: "right" },
                { key: "biaya", label: "Biaya", align: "right" },
                { key: "completion", label: "Completion", align: "right" },
                { key: "uplift", label: "Capability Uplift", align: "right" },
                { key: "naikKelas", label: "Naik Kelas Readiness", align: "right" },
                { key: "keterangan", label: "Catatan" },
              ]}
              rows={devPrograms.map((p) => ({
                fokus: p.fokus,
                peserta: num(p.peserta),
                program: p.program,
                biaya: p.biaya,
                completion: (
                  <span
                    className={
                      p.completion >= 88 ? "font-bold text-ptpn-green" : p.completion >= 85 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    {p.completion}%
                  </span>
                ),
                uplift: <span className="font-bold text-ptpn-green">{p.uplift} pts</span>,
                naikKelas: num(p.naikKelas),
                keterangan: <span className="whitespace-normal text-ink-500">{p.keterangan}</span>,
              }))}
              footerRow={{
                fokus: "Total Grup",
                peserta: "3.228",
                program: "56",
                biaya: "Rp 24,8 M",
                completion: "87%",
                uplift: "+0,18 pts",
                naikKelas: "370",
                keterangan: "",
              }}
              note="Peserta pada baris total adalah peserta unik; jumlah baris per fokus lebih besar karena satu talenta dapat mengikuti beberapa fokus."
            />
            <NotesPanel notes={devNotes} definitions={devDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
