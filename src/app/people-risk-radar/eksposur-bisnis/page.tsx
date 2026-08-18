import { Banknote } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiDonutCard, TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  eksposurBars,
  eksposurDefinitions,
  eksposurKpi,
  eksposurNotes,
  eksposurRows,
  eksposurTrend,
} from "@/lib/prr-detail";

export const metadata = { title: "Eksposur per Lini Bisnis — People Risk Radar — PTPN Group" };

const DONUT_COLOR = [PALETTE.red, PALETTE.amber, PALETTE.blue, PALETTE.teal, PALETTE.slate];

export default function EksposurBisnisPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<Banknote size={19} strokeWidth={1.9} />}
          title="Eksposur People Risk per Lini Bisnis"
          subtitle="Sebaran potensi dampak finansial Rp 128,6 M pada lima lini bisnis, driver risiko tiap lini, dan materialitasnya terhadap EBITDA grup"
          stat="Rp 128,6 M · 53% terkonsentrasi di Palm Oil"
          breadcrumb="Eksposur per Lini Bisnis"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={eksposurKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,40fr)_minmax(0,28fr)]">
            <TiDonutCard
              title="Komposisi Eksposur"
              subtitle="Porsi tiap lini bisnis terhadap total eksposur"
              data={eksposurRows.map((r, i) => ({
                name: r.bisnis,
                value: r.share,
                pctLabel: `${r.share}%`,
                color: DONUT_COLOR[i],
              }))}
              centerValue="Rp 128,6 M"
              centerLabel="Total eksposur"
              footer="Dua lini teratas menanggung 72% eksposur — konsentrasi risiko tidak terdiversifikasi."
            />
            <TiTrendCard
              title="Pertumbuhan Eksposur per Lini"
              subtitle="Potensi dampak finansial bulanan, dalam miliar rupiah"
              data={eksposurTrend}
              delay={80}
              domain={[5, 75]}
              series={[
                { key: "palm", label: "Palm Oil", color: PALETTE.red },
                { key: "rubber", label: "Rubber", color: PALETTE.amber },
                { key: "sugar", label: "Sugar", color: PALETTE.blue },
                { key: "tea", label: "Tea", color: PALETTE.teal },
              ]}
              footer="Palm Oil tumbuh Rp 10,2 M dalam lima bulan — laju kenaikan tercepat di antara seluruh lini."
            />
            <BarListCard
              title="Eksposur per Lini Bisnis"
              subtitle="Nilai eksposur dan skor risiko lini"
              delay={120}
              max={72}
              rows={eksposurBars.map((r, i) => ({
                label: r.label,
                value: r.value,
                valueLabel: `Rp ${r.value.toFixed(1).replace(".", ",")} M`,
                note: r.note,
                color:
                  eksposurRows[i].skor >= 70
                    ? "#ef4444"
                    : eksposurRows[i].skor >= 50
                      ? "#f5a524"
                      : "#1a9c5b",
              }))}
              footer="Eksposur berbanding lurus dengan skor risiko lini — kecuali Sugar yang eksposurnya tertahan populasi kecil."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Eksposur per Lini Bisnis"
              subtitle="Skor risiko, nilai eksposur, populasi terdampak, driver, dan materialitas terhadap EBITDA"
              columns={[
                { key: "bisnis", label: "Lini Bisnis", cellClass: "font-semibold text-ink-900" },
                { key: "skor", label: "Skor Risiko", align: "right" },
                { key: "eksposur", label: "Eksposur", align: "right" },
                { key: "share", label: "Share", align: "right" },
                { key: "karyawan", label: "Karyawan Terdampak", align: "right" },
                { key: "perKaryawan", label: "Eksposur / Karyawan", align: "right" },
                { key: "driver", label: "Driver Dominan" },
                { key: "kontribusiEbitda", label: "Kontribusi EBITDA", align: "right" },
                { key: "status", label: "Status" },
              ]}
              rows={eksposurRows.map((r) => ({
                bisnis: r.bisnis,
                skor: (
                  <span
                    className={
                      r.skor >= 70
                        ? "font-bold text-[#ef4444]"
                        : r.skor >= 50
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-ptpn-green"
                    }
                  >
                    {r.skor}
                  </span>
                ),
                eksposur: <span className="font-bold text-ink-900">{r.eksposur}</span>,
                share: `${r.share}%`,
                karyawan: r.karyawan,
                perKaryawan: `Rp ${(
                  (Number(r.eksposur.replace("Rp ", "").replace(" M", "").replace(",", ".")) * 1000) /
                  Number(r.karyawan.replace(".", ""))
                )
                  .toFixed(1)
                  .replace(".", ",")} jt`,
                driver: r.driver,
                kontribusiEbitda: r.kontribusiEbitda,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Kritis" ? "red" : r.status === "Waspada" ? "amber" : "green"}
                  />
                ),
              }))}
              footerRow={{
                bisnis: "Total Grup",
                skor: "68",
                eksposur: "Rp 128,6 M",
                share: "100%",
                karyawan: "12.842",
                perKaryawan: "Rp 10,0 jt",
                driver: "Turnover, Vacancy, Skill Gap",
                kontribusiEbitda: "100%",
                status: "—",
              }}
              note="Eksposur per karyawan dihitung dari nilai eksposur dibagi karyawan terdampak lini tersebut; angka tinggi menandakan risiko terkonsentrasi pada sedikit peran kritis."
            />
            <NotesPanel notes={eksposurNotes} definitions={eksposurDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
