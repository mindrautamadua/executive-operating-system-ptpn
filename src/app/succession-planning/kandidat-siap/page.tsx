import { UserCheck } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  kandidatByLevel,
  kandidatDefinitions,
  kandidatKpi,
  kandidatNotes,
  kandidatRows,
  kesiapanTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Kandidat Siap Sekarang — Succession Planning — PTPN Group" };

export default function KandidatSiapDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<UserCheck size={19} strokeWidth={1.9} />}
          title="Kandidat Siap Sekarang"
          subtitle="64 kandidat dengan kesiapan di bawah satu tahun: mutu kecocokan terhadap posisi target, risiko keluar, dan rencana penempatannya"
          stat="64 kandidat Ready Now · 42 posisi tercakup"
          breadcrumb="Kandidat Siap Sekarang"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={kandidatKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <BarListCard
              title="Kandidat Ready Now per Level"
              subtitle="Sebaran 64 kandidat siap menurut level posisi target"
              max={30}
              rows={kandidatByLevel.map((k) => ({
                label: k.label,
                value: k.value,
                valueLabel: `${k.value}`,
                note: k.note,
                color: k.value >= 19 ? "#1a9c5b" : k.value >= 11 ? "#f5a524" : "#ef4444",
              }))}
              footer="Hanya 8 kandidat siap untuk gabungan Board Level dan Direktur — 12,5% dari seluruh kandidat Ready Now."
            />
            <TiTrendCard
              title="Pertumbuhan Kandidat Ready Now"
              subtitle="Porsi kandidat siap < 1 tahun dan rata-rata time-to-readiness"
              data={kesiapanTrend}
              delay={80}
              domain={[0, 20]}
              series={[
                { key: "readyNowPct", label: "Ready Now (% kandidat)", color: PALETTE.green },
                { key: "timeToReady", label: "Time-to-Readiness (bulan)", color: PALETTE.purple },
              ]}
              footer="Porsi Ready Now naik dari 12,4% ke 16,0% seiring waktu kesiapan yang memendek 4 bulan."
            />
            <BarListCard
              title="Mutu Kandidat Teratas"
              subtitle="Readiness score kandidat dengan kesiapan tertinggi"
              delay={120}
              max={100}
              rows={kandidatRows
                .slice()
                .sort((a, b) => b.readiness - a.readiness)
                .slice(0, 6)
                .map((k) => ({
                  label: k.nama,
                  value: k.readiness,
                  valueLabel: `${k.readiness}%`,
                  note: k.posisiTarget,
                  color: k.flightRisk === "Rendah" ? "#1a9c5b" : k.flightRisk === "Sedang" ? "#f5a524" : "#ef4444",
                }))}
              footer="Warna bar mengikuti flight risk — kesiapan tinggi dengan risiko keluar tinggi adalah kombinasi paling mahal."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Daftar Kandidat Siap Sekarang"
              subtitle="Kandidat Ready Now pada posisi kritis prioritas beserta rencana penempatannya"
              columns={[
                { key: "nama", label: "Nama", cellClass: "font-semibold text-ink-900" },
                { key: "jabatan", label: "Jabatan Saat Ini" },
                { key: "posisiTarget", label: "Posisi Target", cellClass: "font-semibold text-ink-900" },
                { key: "unit", label: "Unit" },
                { key: "readiness", label: "Readiness", align: "right" },
                { key: "skillMatch", label: "Skill Match", align: "right" },
                { key: "performance", label: "Kinerja", align: "right" },
                { key: "potential", label: "Potensi", align: "right" },
                { key: "flightRisk", label: "Flight Risk" },
                { key: "rencana", label: "Rencana Penempatan" },
              ]}
              rows={kandidatRows.map((r) => ({
                nama: r.nama,
                jabatan: r.jabatan,
                posisiTarget: r.posisiTarget,
                unit: r.unit,
                readiness: (
                  <span
                    className={r.readiness >= 90 ? "font-bold text-ptpn-green" : "font-bold text-ink-900"}
                  >
                    {r.readiness}%
                  </span>
                ),
                skillMatch: `${r.skillMatch}%`,
                performance: r.performance,
                potential: r.potential,
                flightRisk: (
                  <Pill
                    label={r.flightRisk}
                    tone={r.flightRisk === "Rendah" ? "green" : r.flightRisk === "Sedang" ? "amber" : "red"}
                  />
                ),
                rencana: r.rencana,
              }))}
              footerRow={{
                nama: "12 dari 64 kandidat",
                jabatan: "—",
                posisiTarget: "8 posisi kritis",
                unit: "6 entitas",
                readiness: "89%",
                skillMatch: "91%",
                performance: "4,3",
                potential: "8,3",
                flightRisk: "3 sedang, 1 tinggi",
                rencana: "18 penempatan terjadwal 12 bulan ke depan",
              }}
              note="Tabel menampilkan kandidat Ready Now pada sepuluh posisi kritis prioritas; 52 kandidat lain tersebar pada posisi kritis dengan bench sudah memadai."
            />
            <NotesPanel notes={kandidatNotes} definitions={kandidatDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
