import { ShieldCheck } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { ProgressListCard } from "@/components/succession/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  tindakanDampak,
  tindakanDefinitions,
  tindakanKpi,
  tindakanNotes,
  tindakanProgres,
  tindakanProyeksi,
  tindakanRows,
} from "@/lib/prr-detail";

export const metadata = { title: "Rekomendasi Tindakan — People Risk Radar — PTPN Group" };

export default function TindakanDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<ShieldCheck size={19} strokeWidth={1.9} />}
          title="Rekomendasi Tindakan & Risk Treatment"
          subtitle="Delapan tindakan mitigasi risiko people: pemilik, progres, anggaran, ukuran keberhasilan, dan proyeksi dampaknya terhadap skor risiko grup"
          stat="8 tindakan · estimasi skor grup 68 → 54"
          breadcrumb="Rekomendasi Tindakan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={tindakanKpi} />

          <div className="grid auto-rows-[minmax(268px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,36fr)_minmax(0,32fr)]">
            <ProgressListCard
              title="Progres Tindakan Mitigasi"
              subtitle="Realisasi milestone terhadap rencana treatment"
              rows={tindakanProgres}
              footer="Hijau = on track, kuning = at risk, merah = belum bergerak. Lima tindakan masih di bawah 15%."
            />
            <TiTrendCard
              title="Proyeksi Overall Risk Score"
              subtitle="Jalur skor risiko grup bila treatment berjalan sesuai jadwal"
              data={tindakanProyeksi}
              delay={80}
              domain={[45, 72]}
              reference={{ value: 50, color: PALETTE.amber }}
              series={[
                { key: "aktual", label: "Skenario Realistis", color: PALETTE.blue },
                { key: "proyeksi", label: "Skenario Eksekusi Penuh", color: PALETTE.green },
              ]}
              footer="Bahkan pada eksekusi penuh, skor berhenti di 54 pada Jun 2027 — masih 4 pts di atas risk appetite 50."
            />
            <BarListCard
              title="Penurunan Skor per Tindakan"
              subtitle="Selisih skor risiko sebelum dan sesudah treatment"
              delay={120}
              max={24}
              rows={tindakanDampak.map((d) => ({
                label: d.label,
                value: d.value,
                valueLabel: `-${d.value} pts`,
                note: d.note,
                color: d.value >= 16 ? "#1a9c5b" : d.value >= 11 ? "#f5a524" : "#94a3b8",
              }))}
              footer="Accelerated Succession Program memberi penurunan terbesar (-21 pts) pada risiko dengan skor tertinggi."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Portofolio Risk Treatment"
              subtitle="Risiko sasaran, pemilik, dampak skor, anggaran, dan ukuran keberhasilan"
              columns={[
                { key: "tindakan", label: "Tindakan", cellClass: "font-semibold text-ink-900" },
                { key: "risiko", label: "Risiko Sasaran" },
                { key: "level", label: "Level" },
                { key: "owner", label: "Owner" },
                { key: "skor", label: "Before → After", align: "right" },
                { key: "delta", label: "Δ Skor", align: "right" },
                { key: "progress", label: "Progres", align: "right" },
                { key: "quarter", label: "Target" },
                { key: "anggaran", label: "Anggaran", align: "right" },
                { key: "status", label: "Status" },
                { key: "ukuran", label: "Ukuran Keberhasilan" },
              ]}
              rows={tindakanRows.map((r) => ({
                tindakan: r.tindakan,
                risiko: r.risiko,
                level: (
                  <Pill
                    label={r.level}
                    tone={r.level === "High" ? "red" : r.level === "Medium" ? "amber" : "green"}
                  />
                ),
                owner: r.owner,
                skor: `${r.before} → ${r.after}`,
                delta: <span className="font-bold text-ptpn-green">-{r.before - r.after}</span>,
                progress: (
                  <span
                    className={
                      r.progress >= 55
                        ? "font-bold text-ptpn-green"
                        : r.progress >= 10
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.progress}%
                  </span>
                ),
                quarter: r.quarter,
                anggaran: r.anggaran,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "In Progress" ? "green" : "slate"}
                  />
                ),
                ukuran: r.ukuran,
              }))}
              footerRow={{
                tindakan: "8 Tindakan",
                risiko: "7 risiko sasaran",
                level: "5 High",
                owner: "HC Holding & unit",
                skor: "68 → 54 (grup)",
                delta: "-111",
                progress: "27%",
                quarter: "Q3 2026 – Q1 2027",
                anggaran: "Rp 42,8 M",
                status: "3 In Progress",
                ukuran: "Skor grup masuk appetite ≤ 50",
              }}
              note="Kolom Δ Skor adalah penurunan pada risiko sasaran masing-masing, bukan penurunan langsung skor grup; total -111 pts pada level risiko menerjemah menjadi penurunan grup 14 pts setelah pembobotan eksposur."
            />
            <NotesPanel notes={tindakanNotes} definitions={tindakanDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
