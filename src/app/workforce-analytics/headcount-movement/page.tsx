import { ArrowLeftRight } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { MovementWaterfall } from "@/components/wa/detail/MovementWaterfall";
import { FlowChart } from "@/components/wa/trend/FlowChart";
import {
  dinamikaDefinitions,
  hiringSources,
  movementByOrg,
  movementKpi,
  movementNotes,
} from "@/lib/wa-detail-dinamika";

export const metadata = { title: "Headcount Movement — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");

export default function HeadcountMovementPage() {
  const totals = movementByOrg.reduce(
    (a, r) => ({
      awal: a.awal + r.awal,
      newHire: a.newHire + r.newHire,
      mobilityIn: a.mobilityIn + r.mobilityIn,
      rehire: a.rehire + r.rehire,
      turnover: a.turnover + r.turnover,
      mobilityOut: a.mobilityOut + r.mobilityOut,
      lainnya: a.lainnya + r.lainnya,
      akhir: a.akhir + r.akhir,
    }),
    { awal: 0, newHire: 0, mobilityIn: 0, rehire: 0, turnover: 0, mobilityOut: 0, lainnya: 0, akhir: 0 },
  );

  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<ArrowLeftRight size={19} strokeWidth={1.9} />}
          title="Headcount Movement (YTD)"
          subtitle="Arus masuk dan keluar pekerja — waterfall YTD, ritme bulanan, sumber pemenuhan, dan sebaran per entitas"
          stat="Net +1.641 · 4.437 masuk · 2.796 keluar"
          breadcrumb="Headcount Movement"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={movementKpi} />

          <div className="grid auto-rows-[270px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,32fr)_minmax(0,28fr)]">
            <MovementWaterfall />
            <FlowChart />
            <BarListCard
              title="Sumber Pemenuhan Posisi"
              subtitle="Asal pekerja yang masuk YTD"
              delay={120}
              rows={hiringSources.map((h) => ({
                label: h.source,
                value: h.count,
                note: h.pct > 0 ? `${h.pct.toString().replace(".", ",")}%` : "internal",
                color: h.color,
              }))}
              footer="Mobilitas internal menutup 27,7% arus masuk tanpa menambah headcount grup."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Arus Headcount per Entitas"
              subtitle="Rekonsiliasi Des 2025 → Mei 2026 untuk tiap subholding"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "awal", label: "Des 2025", align: "right" },
                { key: "newHire", label: "New Hire", align: "right" },
                { key: "mobilityIn", label: "Mobility In", align: "right" },
                { key: "rehire", label: "Rehire", align: "right" },
                { key: "turnover", label: "Turnover", align: "right" },
                { key: "mobilityOut", label: "Mobility Out", align: "right" },
                { key: "lainnya", label: "Lainnya", align: "right" },
                { key: "net", label: "Net", align: "right" },
                { key: "akhir", label: "Mei 2026", align: "right" },
              ]}
              rows={movementByOrg.map((r) => {
                const net = r.akhir - r.awal;
                return {
                  name: r.name,
                  awal: num(r.awal),
                  newHire: <span className="text-ptpn-green">{num(r.newHire)}</span>,
                  mobilityIn: <span className="text-ptpn-green">{num(r.mobilityIn)}</span>,
                  rehire: <span className="text-ptpn-green">{num(r.rehire)}</span>,
                  turnover: <span className="text-[#ef4444]">{num(r.turnover)}</span>,
                  mobilityOut: <span className="text-[#ef4444]">{num(r.mobilityOut)}</span>,
                  lainnya: <span className="text-[#ef4444]">{num(r.lainnya)}</span>,
                  net: <span className="font-bold text-ptpn-green">+{num(net)}</span>,
                  akhir: <span className="font-semibold text-ink-900">{num(r.akhir)}</span>,
                };
              })}
              footerRow={{
                name: "Total Grup",
                awal: num(totals.awal),
                newHire: num(totals.newHire),
                mobilityIn: num(totals.mobilityIn),
                rehire: num(totals.rehire),
                turnover: num(totals.turnover),
                mobilityOut: num(totals.mobilityOut),
                lainnya: num(totals.lainnya),
                net: `+${num(totals.akhir - totals.awal)}`,
                akhir: num(totals.akhir),
              }}
              note="Mobility In dan Mobility Out mencakup perpindahan antar entitas, sehingga saling meniadakan di tingkat grup."
            />
            <NotesPanel notes={movementNotes} definitions={dinamikaDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
