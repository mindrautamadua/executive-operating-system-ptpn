import { Building2 } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { OrgTrendChart } from "@/components/wa/detail/OrgTrendChart";
import {
  komposisiDefinitions,
  orgKpi,
  orgNotes,
  orgRows,
  orgTotals,
} from "@/lib/wa-detail-komposisi";

export const metadata = { title: "Headcount by Organization — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function HeadcountOrganisasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<Building2 size={19} strokeWidth={1.9} />}
          title="Headcount by Organization"
          subtitle="Sebaran pekerja per holding dan subholding — konsentrasi, pertumbuhan, biaya, dan produktivitas"
          stat="70.142 pekerja · 7 entitas · 76 unit"
          breadcrumb="Headcount by Organization"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={orgKpi} />

          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,28fr)_minmax(0,28fr)]">
            <OrgTrendChart />
            <BarListCard
              title="Headcount per Entitas"
              subtitle="Porsi terhadap total grup"
              delay={80}
              rows={orgRows.map((o) => ({
                label: o.name,
                value: o.headcount,
                note: `${dec(o.pct)}%`,
                color: o.color,
              }))}
              footer="PTPN IV, III, dan II menampung 75,7% pekerja grup."
            />
            <BarListCard
              title="Produktivitas per Entitas"
              subtitle="Ton TBS per pekerja per bulan"
              delay={120}
              rows={orgRows
                .filter((o) => o.productivity > 0)
                .map((o) => ({
                  label: o.name,
                  value: o.productivity,
                  valueLabel: dec(o.productivity),
                  note: `TO ${dec(o.turnover)}%`,
                  color: o.productivity >= 18 ? "#1a9c5b" : o.productivity >= 16 ? "#f5a524" : "#ef4444",
                }))}
              footer="Rata-rata grup 17,3 ton per pekerja per bulan."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Headcount per Entitas"
              subtitle="Komposisi status kerja, biaya, dan indikator operasi per subholding"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "pct", label: "% Grup", align: "right" },
                { key: "net", label: "Net YTD", align: "right" },
                { key: "units", label: "Unit", align: "center" },
                { key: "tetap", label: "Tetap", align: "right" },
                { key: "pkwt", label: "PKWT", align: "right" },
                { key: "bhl", label: "BHL", align: "right" },
                { key: "cost", label: "Biaya TK (Rp M)", align: "right" },
                { key: "prod", label: "Ton/Orang", align: "right" },
                { key: "turnover", label: "Turnover", align: "right" },
                { key: "span", label: "Span", align: "right" },
              ]}
              rows={orgRows.map((o) => ({
                name: o.name,
                headcount: num(o.headcount),
                pct: `${dec(o.pct)}%`,
                net: <span className="font-bold text-ptpn-green">+{num(o.netYtd)}</span>,
                units: o.units,
                tetap: num(o.tetap),
                pkwt: num(o.pkwt),
                bhl: num(o.bhl),
                cost: dec(o.laborCost),
                prod: o.productivity === 0 ? "—" : dec(o.productivity),
                turnover: `${dec(o.turnover)}%`,
                span: `${dec(o.span)}x`,
              }))}
              footerRow={{
                name: "Total Grup",
                headcount: num(orgTotals.headcount),
                pct: "100%",
                net: `+${num(orgTotals.netYtd)}`,
                units: orgTotals.units,
                tetap: num(orgRows.reduce((s, o) => s + o.tetap, 0)),
                pkwt: num(orgRows.reduce((s, o) => s + o.pkwt, 0)),
                bhl: num(orgRows.reduce((s, o) => s + o.bhl, 0)),
                cost: dec(orgTotals.laborCost),
                prod: "17,3",
                turnover: "6,8%",
                span: "7,1x",
              }}
              note="Kolom 'Lainnya' mencakup holding corporate office dan anak usaha pendukung."
            />
            <NotesPanel notes={orgNotes} definitions={komposisiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
