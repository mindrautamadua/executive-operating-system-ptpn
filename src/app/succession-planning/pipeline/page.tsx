import { GitFork } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiStackedBarCard, TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { READINESS } from "@/lib/chart-palette";
import {
  pipelineBars,
  pipelineDefinitions,
  pipelineKpi,
  pipelineNotes,
  pipelineRows,
  pipelineSeries,
  pipelineStack,
  pipelineTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Pipeline Kepemimpinan — Succession Planning — PTPN Group" };

export default function PipelineDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<GitFork size={19} strokeWidth={1.9} />}
          title="Pipeline Kepemimpinan"
          subtitle="Kedalaman pipeline 400 kandidat suksesor per level jabatan, tingkat kesiapan tiap lapis, dan titik leher botol menuju Board Level"
          stat="400 kandidat · rasio 1,89 per posisi kritis"
          breadcrumb="Pipeline Kepemimpinan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={pipelineKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,38fr)_minmax(0,24fr)]">
            <TiStackedBarCard
              title="Kesiapan Kandidat per Level"
              subtitle="Jumlah kandidat menurut tingkat kesiapan"
              data={pipelineStack}
              series={pipelineSeries}
              footer="Level Manager menampung 163 kandidat, empat kali lipat gabungan Board Level dan Direktur."
            />
            <TiTrendCard
              title="Pertumbuhan Pipeline (Jan–Jun 2026)"
              subtitle="Jumlah kandidat pada tiap tingkat kesiapan"
              data={pipelineTrend}
              delay={80}
              domain={[40, 140]}
              series={[
                { key: "ready1", label: "Siap < 1 Tahun", color: READINESS[0] },
                { key: "ready12", label: "Siap 1-2 Tahun", color: READINESS[1] },
                { key: "ready23", label: "Siap 2-3 Tahun", color: READINESS[2] },
                { key: "ready3plus", label: "> 3 Tahun", color: READINESS[3] },
              ]}
              footer="Kelompok siap < 1 tahun tumbuh tercepat (+33%), sedangkan kelompok > 3 tahun nyaris datar."
            />
            <BarListCard
              title="Kandidat per Level"
              subtitle="Total kandidat suksesor tiap lapis jabatan"
              delay={120}
              max={170}
              rows={pipelineBars.map((r) => ({
                label: r.label,
                value: r.value,
                valueLabel: `${r.value}`,
                note: r.note,
                color: r.value >= 100 ? "#1a9c5b" : r.value >= 35 ? "#f5a524" : "#ef4444",
              }))}
              footer="Board Level hanya 15 kandidat — 3,8% dari total pipeline untuk 24 posisi kritis."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Pipeline per Level Jabatan"
              subtitle="Kandidat, komposisi kesiapan, dan kecukupan terhadap posisi kritis"
              columns={[
                { key: "level", label: "Level Jabatan", cellClass: "font-semibold text-ink-900" },
                { key: "posisiKritis", label: "Posisi Kritis", align: "right" },
                { key: "kandidat", label: "Kandidat", align: "right" },
                { key: "s1", label: "< 1 Thn", align: "right" },
                { key: "s2", label: "1-2 Thn", align: "right" },
                { key: "s3", label: "2-3 Thn", align: "right" },
                { key: "s4", label: "> 3 Thn", align: "right" },
                { key: "bench", label: "Bench", align: "right" },
                { key: "status", label: "Status" },
              ]}
              rows={pipelineRows.map((r) => ({
                level: r.level,
                posisiKritis: r.posisiKritis,
                kandidat: <span className="font-bold text-ink-900">{r.kandidat}</span>,
                s1: <span className="font-bold text-ptpn-green">{r.s1}</span>,
                s2: r.s2,
                s3: r.s3,
                s4: r.s4,
                bench: (
                  <span
                    className={
                      Number(r.bench.replace(",", ".")) >= 1.5
                        ? "font-bold text-ptpn-green"
                        : Number(r.bench.replace(",", ".")) >= 1.0
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.bench}
                  </span>
                ),
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Sehat" ? "green" : r.status === "Tipis" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                level: "Total Grup",
                posisiKritis: "212",
                kandidat: "400",
                s1: "64",
                s2: "102",
                s3: "132",
                s4: "102",
                bench: "1,6",
                status: "—",
              }}
              note="Bench per level dihitung dari kandidat dibagi posisi kritis level tersebut, tanpa pembobotan kesiapan; bench grup (1,6) memakai pembobotan sehingga lebih rendah dari rasio mentah 1,89."
            />
            <NotesPanel notes={pipelineNotes} definitions={pipelineDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
