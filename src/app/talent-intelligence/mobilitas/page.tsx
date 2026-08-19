import { Shuffle } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { TiStackedBarCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  mobilityByOrg,
  mobilityDefinitions,
  mobilityKpi,
  mobilityNotes,
  mobilityTrend,
  mobilityTypes,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Mobility Overview — Talent Intelligence — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");

export default function TalentMobilityPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Shuffle size={19} strokeWidth={1.9} />}
          title="Talent Mobility Overview"
          subtitle="Perpindahan peran internal sepanjang YTD 2026, dampaknya terhadap kinerja, dan arus talenta antar entitas"
          stat="336 mobilitas YTD · 87% berdampak positif"
          breadcrumb="Talent Mobility"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={mobilityKpi} />

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,33fr)_minmax(0,33fr)]">
            <TiStackedBarCard
              title="Mobilitas per Bulan (YTD 2026)"
              subtitle="Jumlah perpindahan peran per jenis mobilitas"
              data={mobilityTrend}
              series={[
                { key: "promosi", label: "Promosi", color: PALETTE.green },
                { key: "rotasi", label: "Rotasi Lateral", color: PALETTE.blue },
                { key: "proyek", label: "Penugasan Proyek", color: PALETTE.purple },
                { key: "transfer", label: "Transfer Unit", color: PALETTE.teal },
              ]}
              footer="Puncak Maret (73 perpindahan) mengikuti penetapan hasil siklus talent review."
            />
            <BarListCard
              title="Jenis Mobilitas & Dampaknya"
              subtitle="Jumlah perpindahan dengan uplift kinerja pasca mobilitas"
              delay={40}
              rows={mobilityTypes.map((t) => ({
                label: t.label,
                value: t.value,
                note: `${t.pct} · uplift ${t.uplift}`,
                color: t.color,
              }))}
              footer="Promosi memberi uplift tertinggi (+0,42 pts) sekaligus retensi terbaik (96,1%)."
            />
            <BarListCard
              title="Pengisian Internal per Entitas"
              subtitle="Porsi lowongan yang diisi dari talenta internal"
              delay={80}
              max={85}
              rows={mobilityByOrg.map((o) => ({
                label: o.name,
                value: o.pengisianInternal,
                valueLabel: `${o.pengisianInternal}%`,
                note: `net ${o.net > 0 ? "+" : ""}${o.net}`,
                color: o.pengisianInternal >= 75 ? "#1a9c5b" : o.pengisianInternal >= 70 ? "#f5a524" : "#ef4444",
              }))}
              footer="Rata-rata grup 74%; PTPN I Regional 1 terendah (64%) dengan net arus talenta −7 orang."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Arus Talenta Antar Entitas"
                subtitle="Talenta masuk, keluar, dan posisi bersih tiap entitas sepanjang YTD 2026"
                columns={[
                  { key: "name", label: "Entitas", cellClass: "font-semibold text-ink-900" },
                  { key: "masuk", label: "Masuk", align: "right" },
                  { key: "keluar", label: "Keluar", align: "right" },
                  { key: "net", label: "Net", align: "right" },
                  { key: "promosi", label: "Promosi", align: "right" },
                  { key: "rotasi", label: "Rotasi Lateral", align: "right" },
                  { key: "pengisianInternal", label: "Pengisian Internal", align: "right" },
                ]}
                rows={mobilityByOrg.map((o) => ({
                  name: o.name,
                  masuk: num(o.masuk),
                  keluar: num(o.keluar),
                  net: (
                    <span className={o.net >= 0 ? "font-bold text-ptpn-green" : "font-bold text-[#ef4444]"}>
                      {o.net > 0 ? "+" : ""}
                      {o.net}
                    </span>
                  ),
                  promosi: num(o.promosi),
                  rotasi: num(o.rotasi),
                  pengisianInternal: `${o.pengisianInternal}%`,
                }))}
                footerRow={{
                  name: "Total Grup",
                  masuk: "336",
                  keluar: "336",
                  net: "0",
                  promosi: "128",
                  rotasi: "96",
                  pengisianInternal: "74%",
                }}
                note="Masuk dan keluar dihitung dari perpindahan internal antar entitas maupun antar unit dalam entitas, sehingga total grup berimbang."
              />

              <DetailTable
                title="Efektivitas per Jenis Mobilitas"
                subtitle="Dampak tiap instrumen mobilitas terhadap kinerja dan retensi"
                columns={[
                  { key: "label", label: "Jenis Mobilitas", cellClass: "font-semibold text-ink-900" },
                  { key: "value", label: "Jumlah", align: "right" },
                  { key: "pct", label: "Porsi", align: "right" },
                  { key: "uplift", label: "Uplift Kinerja", align: "right" },
                  { key: "retensi", label: "Retensi 12 Bulan", align: "right" },
                  { key: "keterangan", label: "Catatan" },
                ]}
                rows={mobilityTypes.map((t) => ({
                  label: t.label,
                  value: num(t.value),
                  pct: t.pct,
                  uplift: <span className="font-bold text-ptpn-green">{t.uplift} pts</span>,
                  retensi: t.retensi,
                  keterangan: <span className="whitespace-normal text-ink-500">{t.keterangan}</span>,
                }))}
                footerRow={{
                  label: "Total Grup",
                  value: "336",
                  pct: "100%",
                  uplift: "+0,36 pts",
                  retensi: "93,6%",
                  keterangan: "",
                }}
                note="Uplift kinerja = selisih skor kinerja dua siklus setelah perpindahan dibanding siklus terakhir sebelum perpindahan."
              />
            </div>
            <NotesPanel notes={mobilityNotes} definitions={mobilityDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
