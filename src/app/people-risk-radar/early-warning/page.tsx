import { Siren } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { TiStackedBarCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  ewBars,
  ewDefinitions,
  ewKpi,
  ewNotes,
  ewRows,
  ewTrend,
} from "@/lib/prr-detail";

export const metadata = { title: "Early Warning Indicators — People Risk Radar — PTPN Group" };

export default function EarlyWarningPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<Siren size={19} strokeWidth={1.9} />}
          title="Early Warning Indicators"
          subtitle="Empat belas sinyal prekursor yang dipantau: posisi terhadap ambang, arah pergerakan, lead time ke materialisasi risiko, dan tindakan yang dipicu"
          stat="6 sinyal merah · 47 talenta kritis berisiko"
          breadcrumb="Early Warning"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={ewKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <TiStackedBarCard
              title="Komposisi Status Sinyal per Bulan"
              subtitle="Jumlah sinyal menurut status ambang"
              data={ewTrend}
              series={[
                { key: "merah", label: "Merah", color: PALETTE.red },
                { key: "kuning", label: "Kuning", color: PALETTE.amber },
                { key: "hijau", label: "Hijau", color: PALETTE.green },
              ]}
              footer="Sinyal merah naik dari 2 (Jan) ke 6 (Mei) — memburuk empat bulan berturut-turut."
            />
            <BarListCard
              title="Sinyal per Risiko Sasaran"
              subtitle="Jumlah sinyal aktif yang menunjuk risiko yang sama"
              delay={80}
              max={5}
              rows={ewBars.map((r) => ({
                label: r.label,
                value: r.value,
                valueLabel: `${r.value}`,
                note: r.note,
                color: r.value >= 4 ? "#ef4444" : r.value >= 2 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Empat sinyal merah menumpuk pada Turnover Risk — konvergensi sinyal, bukan kebetulan statistik."
            />
            <BarListCard
              title="Lead Time Sinyal"
              subtitle="Jarak sinyal melewati ambang hingga risiko terealisasi"
              delay={120}
              max={13}
              rows={ewRows.slice(0, 6).map((r) => ({
                label: r.sinyal,
                value: Number(r.leadTime.replace(" bln", "")),
                valueLabel: r.leadTime,
                note: r.risiko,
                color: r.status === "Merah" ? "#ef4444" : r.status === "Kuning" ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Sinyal pensiun incumbent memberi ruang 12 bulan; sinyal absensi hanya 4 bulan sebelum dampak terasa."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Daftar Early Warning Indicator"
              subtitle="Nilai terkini, ambang, arah, lead time, dan tindakan yang dipicu"
              columns={[
                { key: "sinyal", label: "Sinyal", cellClass: "font-semibold text-ink-900" },
                { key: "risiko", label: "Risiko Sasaran" },
                { key: "nilai", label: "Nilai Terkini", align: "right" },
                { key: "ambang", label: "Ambang", align: "right" },
                { key: "arah", label: "Arah" },
                { key: "leadTime", label: "Lead Time", align: "right" },
                { key: "status", label: "Status" },
                { key: "tindakan", label: "Tindakan Dipicu" },
              ]}
              rows={ewRows.map((r) => ({
                sinyal: r.sinyal,
                risiko: r.risiko,
                nilai: <span className="font-bold text-ink-900">{r.nilai}</span>,
                ambang: r.ambang,
                arah: (
                  <span
                    className={
                      r.arah === "Memburuk"
                        ? "font-bold text-[#ef4444]"
                        : r.arah === "Membaik"
                          ? "font-bold text-ptpn-green"
                          : "font-bold text-ink-500"
                    }
                  >
                    {r.arah}
                  </span>
                ),
                leadTime: r.leadTime,
                status: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Merah" ? "red" : r.status === "Kuning" ? "amber" : "green"}
                  />
                ),
                tindakan: r.tindakan,
              }))}
              footerRow={{
                sinyal: "10 dari 14 sinyal",
                risiko: "5 risiko sasaran",
                nilai: "—",
                ambang: "—",
                arah: "6 memburuk",
                leadTime: "4,5 bln",
                status: "6 merah",
                tindakan: "3 tindakan sudah berjalan",
              }}
              note="Tabel menampilkan sepuluh sinyal paling material dari empat belas yang dipantau; empat sinyal sisanya berstatus hijau dan stabil selama tiga bulan terakhir."
            />
            <NotesPanel notes={ewNotes} definitions={ewDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
