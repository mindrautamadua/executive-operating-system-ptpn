import { ShieldCheck } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { CoverageStackBars, Pill } from "@/components/ti/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  coverageByOrg,
  coverageDefinitions,
  coverageKpi,
  coverageNotes,
  coverageRows,
  coverageTrend,
} from "@/lib/ti-detail";

export const metadata = { title: "Critical Role Coverage — Talent Intelligence — PTPN Group" };

export default function CriticalRolePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<ShieldCheck size={19} strokeWidth={1.9} />}
          title="Critical Role Coverage"
          subtitle="Kecukupan suksesor pada 208 posisi kritikal grup, kedalaman pipeline, dan posisi tanpa kandidat"
          stat="Coverage 68% · 27 posisi tanpa suksesor"
          breadcrumb="Critical Role Coverage"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={coverageKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,34fr)_minmax(0,28fr)]">
            <CoverageStackBars rows={coverageRows} />
            <TiTrendCard
              title="Tren Coverage (6 Semester)"
              subtitle="Coverage total, Ready Now coverage, dan jumlah posisi tanpa suksesor"
              data={coverageTrend}
              delay={80}
              domain={[0, 80]}
              series={[
                { key: "coverage", label: "Coverage Total (%)", color: PALETTE.green },
                { key: "readyNow", label: "Ready Now Coverage (%)", color: PALETTE.blue },
                { key: "tanpaSuksesor", label: "Tanpa Suksesor (posisi)", color: PALETTE.red },
              ]}
              footer="Coverage total naik 10 ppts sejak Nov 2023, tetapi Ready Now coverage stagnan di kisaran 35%."
            />
            <BarListCard
              title="Coverage per Entitas"
              subtitle="Porsi posisi kritikal entitas yang tercakup suksesor"
              delay={120}
              max={80}
              rows={coverageByOrg.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `${o.value}%`,
                note: o.note,
                color: o.value >= 70 ? "#1a9c5b" : o.value >= 64 ? "#f5a524" : "#ef4444",
              }))}
              footer="PTPN I Regional 1 terendah (58%) dengan 24 posisi kritikal — prioritas penguatan pipeline."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Coverage per Kelompok Posisi Kritikal"
              subtitle="Kedalaman pipeline dan eksposur tiap kelompok posisi"
              columns={[
                { key: "posisi", label: "Posisi", cellClass: "font-semibold text-ink-900" },
                { key: "total", label: "Jumlah Posisi", align: "right" },
                { key: "coverage", label: "Coverage", align: "right" },
                { key: "readyNow", label: "Ready Now", align: "right" },
                { key: "ready12", label: "Ready 1–2 Thn", align: "right" },
                { key: "ready35", label: "Ready 3–5 Thn", align: "right" },
                { key: "tanpaSuksesor", label: "Tanpa Suksesor", align: "right" },
                { key: "leadTime", label: "Lead Time Eksternal" },
                { key: "prioritas", label: "Prioritas" },
              ]}
              rows={coverageRows.map((r) => ({
                posisi: r.posisi,
                total: r.total,
                coverage: (
                  <span
                    className={
                      r.coverage >= 70 ? "font-bold text-ptpn-green" : r.coverage >= 62 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.coverage}%
                  </span>
                ),
                readyNow: `${r.split[0]}%`,
                ready12: `${r.split[1]}%`,
                ready35: `${r.split[2]}%`,
                tanpaSuksesor: (
                  <span className="font-bold text-[#ef4444]">{r.tanpaSuksesor}</span>
                ),
                leadTime: r.leadTime,
                prioritas: (
                  <Pill
                    label={r.prioritas}
                    tone={r.prioritas === "Tinggi" ? "red" : r.prioritas === "Sedang" ? "amber" : "green"}
                  />
                ),
              }))}
              footerRow={{
                posisi: "Total Grup",
                total: "208",
                coverage: "68%",
                readyNow: "35%",
                ready12: "33%",
                ready35: "20%",
                tanpaSuksesor: "27",
                leadTime: "6–12 bulan",
                prioritas: "—",
              }}
              note="Coverage = porsi posisi dengan minimal satu kandidat Ready Now atau Ready in 1–2 Tahun. Persentase kolom kesiapan dihitung terhadap seluruh posisi pada kelompok."
            />
            <NotesPanel notes={coverageNotes} definitions={coverageDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
