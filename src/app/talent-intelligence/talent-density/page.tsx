import { Map } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { HeatmapUnitKerja } from "@/components/talent/HeatmapUnitKerja";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { densityDefinitions, densityKpi, densityNotes, densityRows } from "@/lib/ti-detail";

export const metadata = { title: "Talent Density Map — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function TalentDensityPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Map size={19} strokeWidth={1.9} />}
          title="Talent Density Map"
          subtitle="Kepadatan talenta berpotensi per region, kaitannya dengan coverage posisi kritikal dan risiko kehilangan talenta"
          stat="Density grup 3,5% · 1.068 HiPo di 5 region"
          breadcrumb="Talent Density"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={densityKpi} />

          <div className="grid auto-rows-[minmax(320px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,29fr)_minmax(0,29fr)]">
            <HeatmapUnitKerja showDetailLink={false} />
            <BarListCard
              title="Density per Region"
              subtitle="HiPo relatif terhadap workforce region"
              delay={40}
              max={4.5}
              rows={densityRows.map((r) => ({
                label: r.name,
                value: r.density,
                valueLabel: `${dec(r.density)}%`,
                note: `${r.hipo} HiPo`,
                color: r.density >= 3.5 ? "#1a9c5b" : r.density >= 2.5 ? "#f5a524" : "#ef4444",
              }))}
              footer="Selisih 1,6 ppts antara Sumatra (3,9%) dan Sulawesi (2,3%)."
            />
            <BarListCard
              title="Flight Risk per Region"
              subtitle="Porsi talenta berisiko keluar di tiap region"
              delay={80}
              max={7}
              rows={densityRows.map((r) => ({
                label: r.name,
                value: r.flightRisk,
                valueLabel: `${dec(r.flightRisk)}%`,
                note: `coverage ${r.coverage}%`,
                color: r.flightRisk >= 5.5 ? "#ef4444" : r.flightRisk >= 4.8 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Region dengan density rendah justru berisiko tertinggi — beban menumpuk pada pool yang tipis."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Talenta per Region"
              subtitle="Kepadatan, coverage posisi kritikal, dan eksposur risiko di lima region operasi"
              columns={[
                { key: "name", label: "Region", cellClass: "font-semibold text-ink-900" },
                { key: "hipo", label: "HiPo", align: "right" },
                { key: "workforce", label: "Workforce", align: "right" },
                { key: "density", label: "Density", align: "right" },
                { key: "posisiKritikal", label: "Posisi Kritikal", align: "right" },
                { key: "coverage", label: "Coverage", align: "right" },
                { key: "tanpaSuksesor", label: "Tanpa Suksesor", align: "right" },
                { key: "flightRisk", label: "Flight Risk", align: "right" },
                { key: "level", label: "Level Density" },
              ]}
              rows={densityRows.map((r) => ({
                name: r.name,
                hipo: num(r.hipo),
                workforce: num(r.workforce),
                density: (
                  <span
                    className={
                      r.density >= 3.5 ? "font-bold text-ptpn-green" : r.density >= 2.5 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    {dec(r.density)}%
                  </span>
                ),
                posisiKritikal: num(r.posisiKritikal),
                coverage: `${r.coverage}%`,
                tanpaSuksesor: <span className="font-bold text-[#ef4444]">{r.tanpaSuksesor}</span>,
                flightRisk: `${dec(r.flightRisk)}%`,
                level: (
                  <Pill
                    label={r.level}
                    tone={r.level === "Tinggi" ? "green" : r.level === "Sedang" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                name: "Total Grup",
                hipo: "1.068",
                workforce: "30.900",
                density: "3,5%",
                posisiKritikal: "208",
                coverage: "68%",
                tanpaSuksesor: "27",
                flightRisk: "5,0%",
                level: "—",
              }}
              note="Workforce cakupan = 30.900 pekerja pada unit operasi utama yang masuk pemetaan region, subset dari 70.142 headcount grup."
            />
            <NotesPanel notes={densityNotes} definitions={densityDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
