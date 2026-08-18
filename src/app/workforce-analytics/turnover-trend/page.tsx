import { UserMinus } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { TurnoverTrendChart } from "@/components/wa/detail/TurnoverTrendChart";
import {
  dinamikaDefinitions,
  exitReasons,
  turnoverByOrg,
  turnoverByTenure,
  turnoverKpi,
  turnoverNotes,
} from "@/lib/wa-detail-dinamika";

export const metadata = { title: "Turnover Rate Trend — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

const TREND_LABEL = {
  up: <span className="font-bold text-[#ef4444]">Naik</span>,
  down: <span className="font-bold text-ptpn-green">Turun</span>,
  flat: <span className="text-ink-400">Stabil</span>,
};

export default function TurnoverTrendPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<UserMinus size={19} strokeWidth={1.9} />}
          title="Turnover Rate Trend"
          subtitle="Pembacaan lengkap arus keluar — tren 36 bulan, alasan keluar, sebaran masa kerja, dan biaya turnover"
          stat="6,8% · 4.643 keluar dalam 12 bulan"
          breadcrumb="Turnover Rate Trend"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={turnoverKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,30fr)_minmax(0,28fr)]">
            <TurnoverTrendChart />
            <BarListCard
              title="Alasan Keluar"
              subtitle="12 bulan terakhir · 4.643 pekerja"
              delay={80}
              rows={exitReasons.map((r) => ({
                label: r.reason,
                value: r.count,
                note: `${dec(r.pct)}%`,
                color: r.color,
              }))}
              footer="38% keluar karena tarikan pasar kerja (pindah + kompensasi) — dapat dicegah lewat retensi."
            />
            <BarListCard
              title="Turnover per Masa Kerja"
              subtitle="Tingkat keluar menurut lama bekerja"
              delay={120}
              max={20}
              rows={turnoverByTenure.map((t) => ({
                label: t.band,
                value: t.rate,
                valueLabel: `${dec(t.rate)}%`,
                note: `${num(t.exits)} org`,
                color: t.rate >= 12 ? "#ef4444" : t.rate >= 6 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Tahun pertama 18,4% — hampir 6x kelompok masa kerja di atas 10 tahun."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Turnover per Entitas"
              subtitle="Sebaran arus keluar, komposisi sukarela, posisi kritis, dan biaya"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "exits", label: "Keluar (12 Bln)", align: "right" },
                { key: "rate", label: "Turnover", align: "right" },
                { key: "voluntary", label: "Voluntary", align: "right" },
                { key: "involuntary", label: "Involuntary", align: "right" },
                { key: "critical", label: "Posisi Kritis", align: "right" },
                { key: "cost", label: "Biaya (Rp M)", align: "right" },
                { key: "trend", label: "Arah", align: "center" },
              ]}
              rows={turnoverByOrg.map((o) => ({
                name: o.name,
                headcount: num(o.headcount),
                exits: num(o.exits),
                rate: (
                  <span className={o.rate >= 7.5 ? "font-bold text-[#ef4444]" : "font-bold text-ink-900"}>
                    {dec(o.rate)}%
                  </span>
                ),
                voluntary: `${dec(o.voluntary)}%`,
                involuntary: `${dec(o.involuntary)}%`,
                critical: o.criticalExits,
                cost: dec(o.cost),
                trend: TREND_LABEL[o.trend],
              }))}
              footerRow={{
                name: "Total Grup",
                headcount: "70.142",
                exits: num(turnoverByOrg.reduce((s, o) => s + o.exits, 0)),
                rate: "6,8%",
                voluntary: "5,4%",
                involuntary: "1,4%",
                critical: turnoverByOrg.reduce((s, o) => s + o.criticalExits, 0),
                cost: dec(Number(turnoverByOrg.reduce((s, o) => s + o.cost, 0).toFixed(1))),
                trend: "Turun",
              }}
              note="Ambang toleransi grup 7,5%; PTPN IV Regional 4 dan PTPN I berada di atas ambang dengan arah memburuk."
            />
            <NotesPanel notes={turnoverNotes} definitions={dinamikaDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
