import { TrendingDown } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  profilTrend,
  trenRisikoBanding,
  trenRisikoDefinitions,
  trenRisikoKpi,
  trenRisikoNotes,
  trenRisikoRows,
} from "@/lib/prr-detail";
import { riskTrend } from "@/lib/prr-data";

export const metadata = { title: "Tren & Forecast Risiko — People Risk Radar — PTPN Group" };

const trendSeries = riskTrend.map((p) => ({
  name: p.name,
  aktual: p.value ?? null,
  forecast: p.forecast ?? null,
  bawah: p.band?.[0] ?? null,
  atas: p.band?.[1] ?? null,
}));

export default function TrenRisikoPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<TrendingDown size={19} strokeWidth={1.9} />}
          title="Tren & Forecast Risiko"
          subtitle="Perjalanan overall people risk score 12 bulan terakhir, proyeksi tujuh bulan ke depan beserta rentang keyakinannya, dan penggerak tiap titik belok"
          stat="Skor 68 · proyeksi Des 2026: 57 (band 51–63)"
          breadcrumb="Tren & Forecast"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={trenRisikoKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,30fr)_minmax(0,26fr)]">
            <TiTrendCard
              title="Overall Risk Score — Aktual & Forecast"
              subtitle="Aktual Jun 2025–Mei 2026, forecast Jun–Des 2026 dengan confidence band"
              data={trendSeries as unknown as Record<string, string | number>[]}
              domain={[45, 80]}
              reference={{ value: 50, color: PALETTE.amber }}
              series={[
                { key: "aktual", label: "Aktual", color: PALETTE.navy },
                { key: "forecast", label: "Forecast", color: PALETTE.blue },
                { key: "bawah", label: "Batas Bawah", color: PALETTE.green },
                { key: "atas", label: "Batas Atas", color: PALETTE.red },
              ]}
              footer="Garis putus-putus = risk appetite 50. Batas bawah band baru menyentuh 51 pada Des 2026."
            />
            <TiTrendCard
              title="Kontribusi Risiko Utama"
              subtitle="Empat risiko penggerak skor grup, Jan–Jun 2026"
              data={profilTrend}
              delay={80}
              domain={[55, 90]}
              series={[
                { key: "vacancy", label: "Critical Position Vacancy", color: PALETTE.red },
                { key: "succession", label: "Succession Risk", color: PALETTE.amber },
                { key: "turnover", label: "Turnover Risk", color: PALETTE.purple },
                { key: "skill", label: "Critical Skill Gap", color: PALETTE.green },
              ]}
              footer="Penurunan skor grup tertahan karena kenaikan turnover dan suksesi mengimbangi perbaikan skill gap."
            />
            <BarListCard
              title="Skenario Akhir 2026"
              subtitle="Posisi skor pada tiap skenario terhadap appetite"
              delay={120}
              max={70}
              rows={trenRisikoBanding.map((s) => ({
                label: s.label,
                value: s.value,
                valueLabel: `${s.value}`,
                note: s.note,
                color: s.value <= 50 ? "#1a9c5b" : s.value <= 57 ? "#f5a524" : "#ef4444",
              }))}
              footer="Tidak satu pun skenario dasar menempatkan grup di dalam appetite pada akhir 2026."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Titik Belok Skor Risiko"
              subtitle="Periode kunci pada jalur aktual dan proyeksi beserta penggeraknya"
              columns={[
                { key: "periode", label: "Periode", cellClass: "font-semibold text-ink-900" },
                { key: "skor", label: "Skor", align: "right" },
                { key: "delta", label: "Δ vs Titik Sebelumnya", align: "right" },
                { key: "band", label: "Confidence Band", align: "right" },
                { key: "penggerak", label: "Penggerak Utama" },
                { key: "status", label: "Status" },
              ]}
              rows={trenRisikoRows.map((r) => ({
                periode: r.periode,
                skor: (
                  <span
                    className={
                      Number(r.skor) >= 70
                        ? "font-bold text-[#ef4444]"
                        : Number(r.skor) >= 58
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-ptpn-green"
                    }
                  >
                    {r.skor}
                  </span>
                ),
                delta: (
                  <span
                    className={
                      r.delta.startsWith("-")
                        ? "font-bold text-ptpn-green"
                        : r.delta === "0"
                          ? "font-bold text-ink-400"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.delta}
                  </span>
                ),
                band: r.band,
                penggerak: r.penggerak,
                status: (
                  <Pill label={r.status} tone={r.status === "Aktual" ? "green" : "slate"} />
                ),
              }))}
              footerRow={{
                periode: "Agu 2025 – Des 2026",
                skor: "76 → 57",
                delta: "-19",
                band: "51 – 63",
                penggerak: "Succession, retention, upskilling, leadership",
                status: "5 aktual · 3 forecast",
              }}
              note="Forecast memakai model deret waktu dengan asumsi seluruh treatment berjalan sesuai jadwal; keterlambatan satu kuartal menggeser jalur ke batas atas band."
            />
            <NotesPanel notes={trenRisikoNotes} definitions={trenRisikoDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
