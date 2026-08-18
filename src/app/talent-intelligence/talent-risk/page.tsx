import { ShieldAlert } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill, riskTone } from "@/components/ti/detail/parts";
import { TiDonutCard, TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  riskDefinitions,
  riskDonut,
  riskDrivers,
  riskKpi,
  riskNotes,
  riskRegister,
  riskTrend,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Risk Overview — Talent Intelligence — PTPN Group" };

export default function TalentRiskPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<ShieldAlert size={19} strokeWidth={1.9} />}
          title="Talent Risk Overview"
          subtitle="Profil risiko kehilangan talenta, faktor pendorong, eksposur posisi kritikal, dan status intervensi retensi"
          stat="186 talenta berisiko · 86 high risk"
          breadcrumb="Talent Risk"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={riskKpi} />

          <div className="grid auto-rows-[248px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,30fr)_minmax(0,40fr)]">
            <TiDonutCard
              title="Komposisi Tingkat Risiko"
              subtitle="186 talenta berisiko per kategori skor"
              data={riskDonut}
              centerValue="186"
              centerLabel="talenta berisiko"
              footer="High risk (skor ≥ 70) mendominasi 46% populasi berisiko."
            />
            <BarListCard
              title="Faktor Pendorong Risiko"
              subtitle="Jumlah kemunculan faktor pada 186 kasus berisiko"
              delay={40}
              rows={riskDrivers.map((d) => ({
                label: d.label,
                value: d.value,
                note: d.note,
                color: d.value >= 50 ? "#ef4444" : d.value >= 35 ? "#f5a524" : "#94a3b8",
              }))}
              footer="Satu talenta dapat memiliki lebih dari satu faktor, sehingga total melebihi 186."
            />
            <TiTrendCard
              title="Tren Risiko & Retensi (12 Bulan)"
              subtitle="Jumlah talenta berisiko per kategori dan retensi internal (%)"
              data={riskTrend}
              delay={80}
              series={[
                { key: "high", label: "High Risk (orang)", color: PALETTE.red },
                { key: "medium", label: "Medium Risk (orang)", color: PALETTE.amber },
                { key: "retensi", label: "Retensi Internal (%)", color: PALETTE.green },
              ]}
              footer="High risk naik 14 orang dalam 12 bulan meski retensi internal membaik 2,1 ppts."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Register Talenta Berisiko"
              subtitle="Dua belas talenta dengan skor risiko tertinggi beserta eksposur bisnis dan aksi retensi"
              columns={[
                { key: "nama", label: "Nama", cellClass: "font-semibold text-ink-900" },
                { key: "jabatan", label: "Jabatan" },
                { key: "unit", label: "Entitas" },
                { key: "score", label: "Risk Score", align: "right", cellClass: "font-extrabold text-ink-900" },
                { key: "kategori", label: "Kategori" },
                { key: "kritikal", label: "Posisi Kritikal", align: "center" },
                { key: "backup", label: "Backup Suksesor" },
                { key: "leadTime", label: "Lead Time" },
                { key: "faktor", label: "Faktor Utama" },
                { key: "aksi", label: "Aksi" },
              ]}
              rows={riskRegister.map((r) => ({
                nama: r.nama,
                jabatan: r.jabatan,
                unit: r.unit,
                score: r.score,
                kategori: <Pill label={r.kategori} tone={riskTone(r.kategori)} />,
                kritikal: r.kritikal ? (
                  <span className="font-bold text-[#ef4444]">Ya</span>
                ) : (
                  <span className="text-ink-400">Tidak</span>
                ),
                backup:
                  r.backup === "Belum ada" ? (
                    <span className="font-bold text-[#ef4444]">Belum ada</span>
                  ) : (
                    r.backup
                  ),
                leadTime: r.leadTime,
                faktor: r.faktor,
                aksi: <span className="whitespace-normal">{r.aksi}</span>,
              }))}
              note="Lead time = estimasi waktu pengisian dari sumber eksternal bila tidak ada suksesor internal siap. Persentase pada kolom backup = match score kandidat."
            />
            <NotesPanel notes={riskNotes} definitions={riskDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
