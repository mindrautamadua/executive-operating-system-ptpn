import { Gauge } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  benchByLevel,
  benchByUnit,
  benchDefinitions,
  benchKpi,
  benchNotes,
  benchRows,
  benchTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Tren Bench Strength — Succession Planning — PTPN Group" };

export default function BenchStrengthDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<Gauge size={19} strokeWidth={1.9} />}
          title="Tren Bench Strength"
          subtitle="Perjalanan kekuatan bench grup Jan–Jun 2026, sebarannya per level dan entitas, serta posisi yang masih di bawah ambang 1,0"
          stat="Bench 1,6 · 54 posisi masih di bawah target 1,0"
          breadcrumb="Tren Bench Strength"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={benchKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,28fr)_minmax(0,28fr)]">
            <TiTrendCard
              title="Tren Bench Strength vs Target"
              subtitle="Bench grup dan tiga level jabatan kunci"
              data={benchTrend}
              domain={[0, 3]}
              reference={{ value: 1, color: PALETTE.amber }}
              series={[
                { key: "grup", label: "PTPN Group", color: PALETTE.green },
                { key: "manager", label: "Manager", color: PALETTE.blue },
                { key: "vp", label: "VP", color: PALETTE.teal },
                { key: "board", label: "Board Level", color: PALETTE.red },
              ]}
              footer="Garis putus-putus = ambang minimum 1,0. Board Level belum pernah menyentuhnya sepanjang semester."
            />
            <BarListCard
              title="Bench per Level Jabatan"
              subtitle="Kandidat layak per posisi kritis"
              delay={80}
              max={3}
              rows={benchByLevel.map((b) => ({
                label: b.label,
                value: b.value,
                valueLabel: b.value.toFixed(1).replace(".", ","),
                note: b.note,
                color: b.value >= 1.5 ? "#1a9c5b" : b.value >= 1.0 ? "#f5a524" : "#ef4444",
              }))}
              footer="Gradien terbalik: makin tinggi level, makin tipis bench — pola khas organisasi yang tumbuh dari bawah."
            />
            <BarListCard
              title="Bench per Entitas"
              subtitle="Kekuatan bench tiap entitas grup"
              delay={120}
              max={2.2}
              rows={benchByUnit.map((b) => ({
                label: b.label,
                value: b.value,
                valueLabel: b.value.toFixed(1).replace(".", ","),
                note: b.note,
                color: b.value >= 1.7 ? "#1a9c5b" : b.value >= 1.4 ? "#f5a524" : "#ef4444",
              }))}
              footer="Holding & Supporting Co terendah (1,2) meski memasok kandidat ke entitas lain."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rekap Bulanan Bench Strength"
              subtitle="Pergerakan bench, populasi kandidat, dan coverage posisi kritis"
              columns={[
                { key: "bulan", label: "Bulan", cellClass: "font-semibold text-ink-900" },
                { key: "bench", label: "Bench Strength", align: "right" },
                { key: "kandidat", label: "Kandidat", align: "right" },
                { key: "posisi", label: "Posisi Kritis", align: "right" },
                { key: "coverage", label: "Coverage", align: "right" },
                { key: "readyNow", label: "Ready Now", align: "right" },
                { key: "penggerak", label: "Penggerak Utama" },
              ]}
              rows={benchRows.map((r) => ({
                bulan: r.bulan,
                bench: <span className="font-bold text-ink-900">{r.bench}</span>,
                kandidat: r.kandidat,
                posisi: r.posisi,
                coverage: <span className="font-bold text-ptpn-green">{r.coverage}</span>,
                readyNow: r.readyNow,
                penggerak: r.penggerak,
              }))}
              footerRow={{
                bulan: "Jan – Jun 2026",
                bench: "1,6",
                kandidat: "+59",
                posisi: "+7",
                coverage: "+6,1 ppts",
                readyNow: "+16",
                penggerak: "Assessment center, job rotation, dan forum suksesi",
              }}
              note="Kandidat tumbuh 59 orang sementara posisi kritis bertambah 7; selisih inilah yang menahan bench pada April–Mei meski pipeline terus bertambah."
            />
            <NotesPanel notes={benchNotes} definitions={benchDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
