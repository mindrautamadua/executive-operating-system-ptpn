import { ShieldHalf } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  kontrolBars,
  kontrolDefinitions,
  kontrolKpi,
  kontrolNotes,
  kontrolRows,
  kontrolTrend,
} from "@/lib/prr-detail";

export const metadata = { title: "Efektivitas Kontrol — People Risk Radar — PTPN Group" };

export default function EfektivitasKontrolPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<ShieldHalf size={19} strokeWidth={1.9} />}
          title="Efektivitas Kontrol"
          subtitle="Perbandingan risiko inherent dan residual pada lima risiko utama, efektivitas kontrol yang berjalan, dan celah yang menyisakan risiko"
          stat="Efektivitas rata-rata 53% · target minimum 70%"
          breadcrumb="Efektivitas Kontrol"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kontrolKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,40fr)_minmax(0,26fr)]">
            <BarListCard
              title="Efektivitas Kontrol per Risiko"
              subtitle="Porsi risiko inherent yang berhasil ditekan kontrol"
              max={100}
              rows={kontrolBars.map((r) => ({
                label: r.label,
                value: r.value,
                valueLabel: `${r.value}%`,
                note: r.note,
                color: r.value >= 60 ? "#1a9c5b" : r.value >= 50 ? "#f5a524" : "#ef4444",
              }))}
              footer="Tidak ada kontrol yang mencapai target minimum 70%; tertinggi 62% pada Leadership Development."
            />
            <TiTrendCard
              title="Tren Efektivitas Kontrol (4 Kuartal)"
              subtitle="Efektivitas tiap kontrol utama per kuartal"
              data={kontrolTrend}
              delay={80}
              domain={[30, 70]}
              unit="%"
              reference={{ value: 70, color: PALETTE.amber }}
              series={[
                { key: "leadership", label: "Leadership Development", color: PALETTE.green },
                { key: "skill", label: "Upskilling Digital & Agronomi", color: PALETTE.blue },
                { key: "succession", label: "Talent Pool & Suksesor", color: PALETTE.teal },
                { key: "turnover", label: "Retention Program", color: PALETTE.amber },
                { key: "vacancy", label: "Succession & Mobilitas", color: PALETTE.red },
              ]}
              footer="Seluruh kontrol naik rata-rata 5 ppts per kuartal; pada laju ini target 70% baru tercapai pertengahan 2027."
            />
            <BarListCard
              title="Penurunan Inherent → Residual"
              subtitle="Selisih skor yang berhasil ditekan kontrol"
              delay={120}
              max={16}
              rows={kontrolRows.map((r) => ({
                label: r.risiko,
                value: r.penurunan,
                valueLabel: `-${r.penurunan} pts`,
                note: `${r.inherent} → ${r.residual}`,
                color: r.penurunan >= 13 ? "#1a9c5b" : r.penurunan >= 10 ? "#f5a524" : "#ef4444",
              }))}
              footer="Total penurunan 54 pts pada lima risiko utama; Critical Position Vacancy hanya turun 8 pts."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Kontrol per Risiko Utama"
              subtitle="Inherent, residual, kontrol yang berjalan, hasil pengujian, dan celah tersisa"
              columns={[
                { key: "risiko", label: "Risiko", cellClass: "font-semibold text-ink-900" },
                { key: "inherent", label: "Inherent", align: "right" },
                { key: "residual", label: "Residual", align: "right" },
                { key: "penurunan", label: "Penurunan", align: "right" },
                { key: "kontrol", label: "Kontrol Berjalan" },
                { key: "efektivitas", label: "Efektivitas", align: "right" },
                { key: "uji", label: "Uji Terakhir" },
                { key: "gap", label: "Celah Kontrol" },
                { key: "status", label: "Status" },
              ]}
              rows={kontrolRows.map((r) => ({
                risiko: r.risiko,
                inherent: r.inherent,
                residual: (
                  <span
                    className={
                      r.residual >= 70 ? "font-bold text-[#ef4444]" : "font-bold text-[#d98b06]"
                    }
                  >
                    {r.residual}
                  </span>
                ),
                penurunan: <span className="font-bold text-ptpn-green">-{r.penurunan}</span>,
                kontrol: r.kontrol,
                efektivitas: (
                  <span
                    className={
                      r.efektivitas >= 60
                        ? "font-bold text-ptpn-green"
                        : r.efektivitas >= 50
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.efektivitas}%
                  </span>
                ),
                uji: r.uji,
                gap: r.gap,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Efektif" ? "green" : r.status === "Cukup" ? "amber" : "red"}
                  />
                ),
              }))}
              footerRow={{
                risiko: "5 Risiko Utama",
                inherent: "421",
                residual: "367",
                penurunan: "-54",
                kontrol: "12 kontrol terdaftar",
                efektivitas: "53%",
                uji: "Mei 2026",
                gap: "Seluruh residual masih di atas appetite 50",
                status: "2 lemah",
              }}
              note="Residual sama dengan skor register saat ini. Efektivitas diuji Satuan Pengawasan Intern melalui pengujian desain dan implementasi kontrol, bukan self-assessment unit."
            />
            <NotesPanel notes={kontrolNotes} definitions={kontrolDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
