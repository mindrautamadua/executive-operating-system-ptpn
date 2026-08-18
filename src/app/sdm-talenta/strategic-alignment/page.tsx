import { ArrowRight, Award, ClipboardList, Factory, GitBranch, GraduationCap } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill, riskTone } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { alignmentFlow, strategicObjective } from "@/lib/hc-data";
import {
  alignCapabilityByFunction,
  alignDefinitions,
  alignKpi,
  alignNotes,
  alignRows,
} from "@/lib/sdm-detail";

export const metadata = {
  title: "Strategic Alignment — SDM & Talenta — PTPN Group",
};

const FLOW_ICONS = {
  workforce: { Icon: ClipboardList, cls: "bg-[#e8f1fd] text-[#2f6fe4]" },
  capability: { Icon: GraduationCap, cls: "bg-ptpn-greenLight text-ptpn-green" },
  performance: { Icon: Award, cls: "bg-[#f3eefd] text-[#8b5cf6]" },
  outcome: { Icon: Factory, cls: "bg-[#e6f6f5] text-[#0d9488]" },
} as const;

/** Nada baris tabel: hijau = sehat, merah = seluruh rantai melemah. */
const ROW_TONE = { green: "Low", amber: "Medium", red: "High" } as const;

export default function StrategicAlignmentPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<GitBranch size={19} strokeWidth={1.9} />}
          title="Strategic Alignment"
          subtitle="Rantai keselarasan kebutuhan tenaga kerja → kapabilitas → kinerja → outcome bisnis per regional"
          stat={`Objective: ${strategicObjective}`}
          breadcrumb="Strategic Alignment"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={alignKpi} />

          {/* Rantai alignment grup — versi besar dari flow di kartu ringkas. */}
          <div className="card anim-rise px-4 pb-4 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Alignment Chain — PTPN Group
            </h3>
            <div className="mt-3 flex items-start justify-between gap-2">
              {alignmentFlow.map((step, i) => {
                const { Icon, cls } = FLOW_ICONS[step.icon];
                return (
                  <div key={step.label} className="flex min-w-0 flex-1 items-start">
                    <div className="min-w-0 flex-1 text-center">
                      <span className={`mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full ${cls}`}>
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <div className="mt-2 text-[9px] font-semibold leading-[1.3] text-ink-700">
                        {step.label}
                      </div>
                      <div className="mt-1 text-[15px] font-extrabold leading-none text-ink-900">
                        {step.value}
                      </div>
                      <div className="mt-[3px] text-[8.5px] leading-[1.3] text-ink-400">{step.sub}</div>
                    </div>
                    {i < alignmentFlow.length - 1 && (
                      <ArrowRight size={14} className="mt-[14px] shrink-0 text-ink-300" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,64fr)_minmax(0,36fr)]">
            <DetailTable
              title="Rantai Alignment per Regional"
              subtitle="Kebutuhan vs pemenuhan, kapabilitas, kinerja, dan outcome produktivitas — YTD 2026"
              columns={[
                { key: "regional", label: "Regional" },
                { key: "butuh", label: "Kebutuhan", align: "right" },
                { key: "aktual", label: "Aktual", align: "right" },
                { key: "gap", label: "Gap", align: "right", cellClass: "font-bold" },
                { key: "capability", label: "Capability", align: "right" },
                { key: "performance", label: "Performance", align: "right" },
                { key: "outcome", label: "Produktivitas", align: "right", cellClass: "font-bold" },
                { key: "risiko", label: "Risiko", align: "center" },
              ]}
              rows={alignRows.map((r) => ({
                ...r,
                risiko: <Pill label={ROW_TONE[r.tone]} tone={riskTone(ROW_TONE[r.tone])} />,
              }))}
              note="Gap = aktual − kebutuhan workload analysis. Baris merah = capability, performance, dan outcome sekaligus di bawah rata-rata grup."
            />
            <BarListCard
              title="Capability Index per Fungsi"
              subtitle="Target grup 85% — dua fungsi di bawah 82%"
              rows={alignCapabilityByFunction}
              max={100}
              delay={80}
              footer="Fungsi TI menjadi prasyarat program PTPN 4.0; gap-nya dieskalasi ke BOD Decision Center (DC-26-018)."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "120ms" } as React.CSSProperties}>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
                Pembacaan Eksekutif
              </h3>
              <p className="mt-2 text-[9.5px] leading-[1.6] text-ink-700">
                Rantai alignment grup sehat di tiga mata rantai pertama — pemenuhan 97%,
                capability 82%, performance 85% — dan menghasilkan produktivitas +8,2%.
                Pengecualian tunggal adalah <span className="font-bold text-[#ef4444]">Regional 4</span>:
                gap pemenuhan terbesar (-694 orang) menjalar ke capability 77% dan outcome
                +4,6%, konsisten dengan pendapatan regional yang turun -2,3% di dashboard
                korporat. Intervensi paling berdampak: menutup gap panen Regional 4 lebih
                dulu, baru program capability lintas grup.
              </p>
            </div>
            <NotesPanel notes={alignNotes} definitions={alignDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
