import { TrendingUp } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { TiStackedBarCard, TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  trenArus,
  trenByOrg,
  trenDefinitions,
  trenKpi,
  trenMasukKeluar,
  trenNotes,
  trenTalentaDetail,
} from "@/lib/ti-detail";

export const metadata = { title: "Tren Total Talenta Aktif — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function TrenTalentaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<TrendingUp size={19} strokeWidth={1.9} />}
          title="Tren Total Talenta Aktif"
          subtitle="Perkembangan populasi pool talenta 12 bulan terakhir, arus masuk dan keluar, serta kontribusi tiap entitas"
          stat="3.742 talenta · +238 orang (12 bulan)"
          breadcrumb="Tren Talenta"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={trenKpi} />

          <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,26fr)_minmax(0,22fr)]">
            <TiTrendCard
              title="Populasi Talenta (12 Bulan)"
              subtitle="Total talenta aktif, HiPo, dan kandidat Ready Now"
              data={trenTalentaDetail}
              domain={[0, 4000]}
              series={[
                { key: "total", label: "Talenta Aktif", color: PALETTE.blue },
                { key: "hipo", label: "HiPo", color: PALETTE.green },
                { key: "readyNow", label: "Ready Now", color: PALETTE.amber },
              ]}
              footer="Total dan HiPo naik seiring, tetapi Ready Now bergerak berlawanan: turun 36 orang."
            />
            <TiStackedBarCard
              title="Arus Pool per Kuartal"
              subtitle="Talenta masuk dan keluar pool"
              data={trenArus}
              delay={80}
              series={[
                { key: "masuk", label: "Masuk", color: PALETTE.green },
                { key: "keluar", label: "Keluar", color: PALETTE.red },
              ]}
              footer="Masuk 412 versus keluar 174 sepanjang 12 bulan; selisih bersih +238."
            />
            <BarListCard
              title="Rincian Arus Pool"
              subtitle="Penyebab masuk dan keluar (12 bulan)"
              delay={120}
              rows={trenMasukKeluar.map((r) => ({
                label: r.label,
                value: r.value,
                note: r.note,
                color: r.note === "masuk" ? "#1a9c5b" : "#ef4444",
              }))}
              footer="65% penambahan berasal dari perluasan cakupan siklus talent review."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Pertumbuhan Pool per Entitas"
              subtitle="Perbandingan Mei 2025 dan Mei 2026 beserta arus masuk dan keluar tiap entitas"
              columns={[
                { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                { key: "mei25", label: "Mei 2025", align: "right" },
                { key: "mei26", label: "Mei 2026", align: "right" },
                { key: "selisih", label: "Selisih", align: "right" },
                { key: "growth", label: "Pertumbuhan", align: "right" },
                { key: "masuk", label: "Masuk Pool", align: "right" },
                { key: "keluar", label: "Keluar Pool", align: "right" },
              ]}
              rows={trenByOrg.map((o) => ({
                name: o.name,
                mei25: num(o.mei25),
                mei26: num(o.mei26),
                selisih: `+${o.mei26 - o.mei25}`,
                growth: (
                  <span
                    className={
                      o.growth >= 7 ? "font-bold text-ptpn-green" : o.growth >= 5 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    {dec(o.growth)}%
                  </span>
                ),
                masuk: num(o.masuk),
                keluar: num(o.keluar),
              }))}
              footerRow={{
                name: "Total Grup",
                mei25: "3.504",
                mei26: "3.742",
                selisih: "+238",
                growth: "6,8%",
                masuk: "412",
                keluar: "174",
              }}
              note="Masuk dan keluar pool adalah perubahan status keanggotaan pool talenta, bukan rekrutmen atau turnover pekerja secara umum."
            />
            <NotesPanel notes={trenNotes} definitions={trenDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
