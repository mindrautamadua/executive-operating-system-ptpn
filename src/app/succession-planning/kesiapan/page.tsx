import { Hourglass } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiDonutCard, TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  kesiapanByFungsi,
  kesiapanDefinitions,
  kesiapanDonut,
  kesiapanKpi,
  kesiapanNotes,
  kesiapanRows,
  kesiapanTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Distribusi Kesiapan Kandidat — Succession Planning — PTPN Group" };

export default function KesiapanDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<Hourglass size={19} strokeWidth={1.9} />}
          title="Distribusi Kesiapan Kandidat"
          subtitle="Sebaran 400 kandidat suksesor menurut waktu kesiapan, laju time-to-readiness, dan kandidat yang stagnan tanpa kemajuan"
          stat="400 kandidat · time-to-readiness 10 bulan"
          breadcrumb="Distribusi Kesiapan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kesiapanKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,40fr)_minmax(0,28fr)]">
            <TiDonutCard
              title="Komposisi Kesiapan Kandidat"
              subtitle="Jumlah kandidat pada tiap tahap kesiapan"
              data={kesiapanDonut}
              centerValue="400"
              centerLabel="Kandidat suksesi"
              footer="Tahap 2-3 tahun paling gemuk (132 kandidat) — pipeline matang tetapi belum menolong kebutuhan jangka pendek."
            />
            <TiTrendCard
              title="Laju Kesiapan (Jan–Jun 2026)"
              subtitle="Rata-rata time-to-readiness dan porsi kandidat Ready Now"
              data={kesiapanTrend}
              delay={80}
              domain={[0, 20]}
              series={[
                { key: "timeToReady", label: "Time-to-Readiness (bulan)", color: PALETTE.purple },
                { key: "readyNowPct", label: "Ready Now (% kandidat)", color: PALETTE.green },
              ]}
              footer="Time-to-readiness turun 4 bulan sementara porsi Ready Now naik 3,6 ppts pada periode yang sama."
            />
            <BarListCard
              title="Porsi Ready Now per Fungsi"
              subtitle="Kandidat siap < 1 tahun terhadap kandidat fungsi"
              delay={120}
              max={22}
              rows={kesiapanByFungsi.map((f) => ({
                label: f.label,
                value: f.value,
                valueLabel: `${f.value.toFixed(1).replace(".", ",")}%`,
                note: f.note,
                color: f.value >= 17 ? "#1a9c5b" : f.value >= 15 ? "#f5a524" : "#ef4444",
              }))}
              footer="Fungsi Lainnya terendah (10,6%) — konversi ke kesiapan paling lambat di grup."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Tahap Kesiapan"
              subtitle="Populasi, mutu kandidat, dan intervensi pengembangan tiap tahap"
              columns={[
                { key: "tahap", label: "Tahap Kesiapan", cellClass: "font-semibold text-ink-900" },
                { key: "kandidat", label: "Kandidat", align: "right" },
                { key: "pct", label: "Porsi", align: "right" },
                { key: "deltaKuartal", label: "Δ Kuartal", align: "right" },
                { key: "avgReadiness", label: "Rata-rata Readiness", align: "right" },
                { key: "avgSkillMatch", label: "Rata-rata Skill Match", align: "right" },
                { key: "intervensi", label: "Intervensi Utama" },
              ]}
              rows={kesiapanRows.map((r) => ({
                tahap: r.tahap,
                kandidat: <span className="font-bold text-ink-900">{r.kandidat}</span>,
                pct: r.pct,
                deltaKuartal: <span className="font-bold text-ptpn-green">{r.deltaKuartal}</span>,
                avgReadiness: (
                  <span
                    className={
                      Number(r.avgReadiness.replace("%", "")) >= 85
                        ? "font-bold text-ptpn-green"
                        : Number(r.avgReadiness.replace("%", "")) >= 55
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.avgReadiness}
                  </span>
                ),
                avgSkillMatch: r.avgSkillMatch,
                intervensi: r.intervensi,
              }))}
              footerRow={{
                tahap: "Total Grup",
                kandidat: "400",
                pct: "100%",
                deltaKuartal: "+34",
                avgReadiness: "62%",
                avgSkillMatch: "73%",
                intervensi: "Prioritas pada 234 kandidat di atas dua tahun",
              }}
              note="Readiness score mengukur kesiapan terhadap posisi target, sedangkan skill match mengukur kecocokan kompetensi; keduanya dihasilkan assessment center dan divalidasi forum suksesi."
            />
            <NotesPanel notes={kesiapanNotes} definitions={kesiapanDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
