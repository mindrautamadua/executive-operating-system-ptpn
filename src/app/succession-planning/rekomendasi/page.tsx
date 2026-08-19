import { Lightbulb } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { PALETTE } from "@/lib/chart-palette";
import {
  posisiKritisTrend,
  rekomendasiDampak,
  rekomendasiDefinitions,
  rekomendasiKpi,
  rekomendasiNotes,
  rekomendasiRows,
} from "@/lib/succession-detail";

export const metadata = { title: "Rekomendasi Suksesi — Succession Planning — PTPN Group" };

export default function RekomendasiDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<Lightbulb size={19} strokeWidth={1.9} />}
          title="Rekomendasi Suksesi"
          subtitle="Dua belas rekomendasi hasil forum suksesi Q2 2026: pemicu, dampak terhadap coverage posisi kritis, pemilik, dan status keputusan"
          stat="12 rekomendasi · estimasi dampak +8,2 ppts coverage"
          breadcrumb="Rekomendasi Suksesi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={rekomendasiKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <BarListCard
              title="Estimasi Dampak per Rekomendasi Kunci"
              subtitle="Jumlah posisi kritis yang terbantu bila dieksekusi penuh"
              max={12}
              rows={rekomendasiDampak.map((d) => ({
                label: d.label,
                value: d.value,
                valueLabel: `${d.value}`,
                note: d.note,
                color: d.value >= 9 ? "#1a9c5b" : d.value >= 5 ? "#f5a524" : "#ef4444",
              }))}
              footer="Retensi kandidat Ready Now memberi dampak terbesar per rupiah yang dikeluarkan."
            />
            <TiTrendCard
              title="Coverage Aktual dan Jalur Menuju Target"
              subtitle="Coverage posisi kritis Jan–Jun 2026 terhadap ambang target 80%"
              data={posisiKritisTrend}
              delay={80}
              domain={[0, 90]}
              reference={{ value: 80, color: PALETTE.amber }}
              series={[
                { key: "coverage", label: "Coverage (%)", color: PALETTE.green },
                { key: "tanpaKandidat", label: "Tanpa Kandidat (posisi)", color: PALETTE.red },
                { key: "risikoTinggi", label: "Risiko Tinggi (posisi)", color: PALETTE.slate },
              ]}
              footer="Coverage 74,5% masih 5,5 ppts di bawah target 80%; eksekusi penuh 12 rekomendasi diproyeksikan membawanya ke 82,7%."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Daftar Rekomendasi Suksesi"
              subtitle="Pemicu, dampak, pemilik akuntabilitas, tenggat, dan status keputusan"
              columns={[
                { key: "rekomendasi", label: "Rekomendasi", cellClass: "font-semibold text-ink-900" },
                { key: "pemicu", label: "Pemicu" },
                { key: "prioritas", label: "Prioritas" },
                { key: "dampak", label: "Estimasi Dampak" },
                { key: "pemilik", label: "Pemilik" },
                { key: "tenggat", label: "Tenggat" },
                { key: "status", label: "Status" },
              ]}
              rows={rekomendasiRows.map((r) => ({
                rekomendasi: r.rekomendasi,
                pemicu: r.pemicu,
                prioritas: (
                  <Pill
                    label={r.prioritas}
                    tone={r.prioritas === "Kritikal" ? "red" : r.prioritas === "Tinggi" ? "amber" : "slate"}
                  />
                ),
                dampak: r.dampak,
                pemilik: r.pemilik,
                tenggat: r.tenggat,
                status: (
                  <Pill
                    label={r.status}
                    tone={
                      r.status === "Dieksekusi" ? "green" : r.status === "Menunggu BOD" ? "amber" : "slate"
                    }
                  />
                ),
              }))}
              footerRow={{
                rekomendasi: "12 Rekomendasi",
                pemicu: "Forum suksesi Q2 2026",
                prioritas: "3 kritikal",
                dampak: "+8,2 ppts coverage · 17 posisi tertutup",
                pemilik: "Direktur SDM Holding",
                tenggat: "Jul 2026 – Q2 2027",
                status: "4 menunggu BOD",
              }}
              note="Estimasi dampak bersifat kumulatif dan mengasumsikan seluruh rekomendasi dieksekusi sesuai tenggat; rekomendasi berstatus Menunggu BOD tidak dapat berjalan sebelum keputusan forum Direksi."
            />
            <NotesPanel notes={rekomendasiNotes} definitions={rekomendasiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
