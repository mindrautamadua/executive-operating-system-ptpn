import { GitBranch } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { PipelineFunnel } from "@/components/ti/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  pipelineByJobFamily,
  pipelineDefinitions,
  pipelineKpi,
  pipelineNotes,
  pipelineStages,
  pipelineTrend,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Pipeline by Readiness — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function PipelineReadinessPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<GitBranch size={19} strokeWidth={1.9} />}
          title="Talent Pipeline by Readiness"
          subtitle="Kesiapan pool suksesi per tahap, laju konversi antar tahap, dan kecukupan pipeline terhadap posisi kritikal"
          stat="412 Ready Now · rasio pipeline 5,1x"
          breadcrumb="Talent Pipeline"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={pipelineKpi} />

          <div className="grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,34fr)_minmax(0,26fr)]">
            <PipelineFunnel stages={pipelineStages} />
            <TiTrendCard
              title="Komposisi Readiness (6 Semester)"
              subtitle="Porsi populasi talenta per tahap kesiapan"
              data={pipelineTrend}
              unit="%"
              domain={[0, 50]}
              delay={80}
              series={[
                { key: "readyNow", label: "Ready Now", color: PALETTE.green },
                { key: "ready12", label: "Ready 1–2 Thn", color: PALETTE.greenSoft },
                { key: "ready35", label: "Ready 3–5 Thn", color: PALETTE.amber },
                { key: "future", label: "Future Potential", color: PALETTE.slate },
              ]}
              footer="Ready Now turun lima semester berturut-turut, dari 12,8% ke 11,0%."
            />
            <BarListCard
              title="Rasio Ready Now per Posisi"
              subtitle="Kandidat Ready Now dibagi posisi kritikal job family"
              delay={120}
              max={6}
              rows={pipelineByJobFamily.map((f) => {
                const rasio = Number((f.readyNow / f.posisi).toFixed(1));
                return {
                  label: f.family,
                  value: rasio,
                  valueLabel: `${dec(rasio)}x`,
                  note: `${f.readyNow} / ${f.posisi}`,
                  color: rasio >= 2.5 ? "#1a9c5b" : rasio >= 1.6 ? "#f5a524" : "#ef4444",
                };
              })}
              footer="Keuangan & Akuntansi terendah (1,3x) — hanya 34 kandidat siap untuk 26 posisi kritikal."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Pipeline per Job Family"
              subtitle="Sebaran talenta pada empat tahap kesiapan dan beban posisi kritikal yang dilayani"
              columns={[
                { key: "family", label: "Job Family", cellClass: "font-semibold text-ink-900" },
                { key: "talenta", label: "Talenta", align: "right" },
                { key: "readyNow", label: "Ready Now", align: "right" },
                { key: "ready12", label: "Ready 1–2 Thn", align: "right" },
                { key: "ready35", label: "Ready 3–5 Thn", align: "right" },
                { key: "future", label: "Future Potential", align: "right" },
                { key: "posisi", label: "Posisi Kritikal", align: "right" },
                { key: "rasio", label: "Rasio Siap / Posisi", align: "right" },
              ]}
              rows={pipelineByJobFamily.map((f) => {
                const rasio = Number(((f.readyNow + f.ready12) / f.posisi).toFixed(1));
                return {
                  family: f.family,
                  talenta: num(f.talenta),
                  readyNow: num(f.readyNow),
                  ready12: num(f.ready12),
                  ready35: num(f.ready35),
                  future: num(f.future),
                  posisi: num(f.posisi),
                  rasio: (
                    <span
                      className={
                        rasio >= 5 ? "font-bold text-ptpn-green" : rasio >= 4 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                      }
                    >
                      {dec(rasio)}x
                    </span>
                  ),
                };
              })}
              footerRow={{
                family: "Total Grup",
                talenta: "3.742",
                readyNow: "412",
                ready12: "656",
                ready35: "1.124",
                future: "1.550",
                posisi: "208",
                rasio: "5,1x",
              }}
              note="Rasio Siap / Posisi = (Ready Now + Ready 1–2 Tahun) dibagi jumlah posisi kritikal job family."
            />
            <NotesPanel notes={pipelineNotes} definitions={pipelineDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
