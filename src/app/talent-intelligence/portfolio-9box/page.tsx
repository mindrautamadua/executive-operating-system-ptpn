import { Grid3x3 } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { NineBoxDetailGrid } from "@/components/ti/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  nineBoxByOrg,
  nineBoxDefinitions,
  nineBoxKpi,
  nineBoxNotes,
  nineBoxTrend,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Portfolio 9 Box — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function TalentPortfolioDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Grid3x3 size={19} strokeWidth={1.9} />}
          title="Talent Portfolio (9 Box Grid)"
          subtitle="Pemetaan seluruh talenta pada kombinasi kinerja dan potensi, beserta tindakan talenta per kotak"
          stat="3.742 talenta dipetakan · 60,4% kuadran atas"
          breadcrumb="Talent Portfolio"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={nineBoxKpi} />

          <div className="grid auto-rows-[minmax(330px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <NineBoxDetailGrid />
            <TiTrendCard
              title="Pergeseran Kuadran (6 Semester)"
              subtitle="Porsi populasi talenta per kuadran, dalam persen"
              data={nineBoxTrend}
              unit="%"
              domain={[0, 32]}
              delay={80}
              series={[
                { key: "star", label: "Star", color: PALETTE.green },
                { key: "highPerformer", label: "High Performer", color: PALETTE.greenSoft },
                { key: "core", label: "Core Player", color: PALETTE.amber },
                { key: "zonaPerbaikan", label: "Zona Perbaikan", color: PALETTE.red },
              ]}
              footer="Star naik 4,4 ppts sejak Nov 2023, sementara zona perbaikan susut 2,5 ppts."
            />
          </div>

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <BarListCard
              title="Porsi Star per Entitas"
              subtitle="Persentase Star terhadap talenta entitas"
              delay={40}
              max={35}
              rows={nineBoxByOrg.map((o) => ({
                label: o.name,
                value: o.starPct,
                valueLabel: `${dec(o.starPct)}%`,
                note: `${o.star} orang`,
                color: o.starPct >= 29 ? "#1a9c5b" : o.starPct >= 27 ? "#f5a524" : "#ef4444",
              }))}
              footer="Selisih 6,8 ppts antara Holding & SBU (32,0%) dan PTPN I Regional 1 (25,2%)."
            />
            <BarListCard
              title="Zona Perbaikan per Entitas"
              subtitle="Jumlah talenta pada Box 1–3"
              delay={80}
              rows={nineBoxByOrg.map((o) => ({
                label: o.name,
                value: o.zonaPerbaikan,
                valueLabel: num(o.zonaPerbaikan),
                note: `${dec(Number(((o.zonaPerbaikan / o.talenta) * 100).toFixed(1)))}%`,
                color: "#ef4444",
              }))}
              footer="369 talenta grup berada di zona perbaikan; 115 di antaranya Underperformer murni."
            />
            <BarListCard
              title="Naik Kelas Kotak (YTD)"
              subtitle="Talenta yang berpindah ke kotak lebih tinggi"
              delay={120}
              rows={nineBoxByOrg.map((o) => ({
                label: o.name,
                value: o.naikKelas,
                valueLabel: num(o.naikKelas),
                note: `${dec(Number(((o.naikKelas / o.talenta) * 100).toFixed(1)))}%`,
                color: "#1a9c5b",
              }))}
              footer="284 talenta naik kelas kotak sepanjang YTD 2026, tertinggi di PTPN IV (62 orang)."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Distribusi 9 Box per Entitas"
              subtitle="Sebaran kualitas talenta di tujuh entitas grup"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "talenta", label: "Talenta", align: "right" },
                { key: "star", label: "Star (Box 9)", align: "right" },
                { key: "starPct", label: "Porsi Star", align: "right" },
                { key: "kuadranAtas", label: "Kuadran Atas (7–9)", align: "right" },
                { key: "core", label: "Core Player", align: "right" },
                { key: "zonaPerbaikan", label: "Zona Perbaikan", align: "right" },
                { key: "naikKelas", label: "Naik Kelas YTD", align: "right" },
              ]}
              rows={nineBoxByOrg.map((o) => ({
                name: o.name,
                talenta: num(o.talenta),
                star: num(o.star),
                starPct: (
                  <span
                    className={
                      o.starPct >= 29 ? "font-bold text-ptpn-green" : o.starPct < 27 ? "font-bold text-[#ef4444]" : ""
                    }
                  >
                    {dec(o.starPct)}%
                  </span>
                ),
                kuadranAtas: num(o.kuadranAtas),
                core: num(o.core),
                zonaPerbaikan: num(o.zonaPerbaikan),
                naikKelas: num(o.naikKelas),
              }))}
              footerRow={{
                name: "Total Grup",
                talenta: "3.742",
                star: "1.068",
                starPct: "28,5%",
                kuadranAtas: "2.261",
                core: "762",
                zonaPerbaikan: "369",
                naikKelas: "284",
              }}
              note="Kuadran atas = Box 7–9 (Enigma, Growth Talent, Star). Zona perbaikan = Box 1–3."
            />
            <NotesPanel notes={nineBoxNotes} definitions={nineBoxDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
