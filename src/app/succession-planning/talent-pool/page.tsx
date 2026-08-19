import { Users } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiDonutCard, TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  talentPoolDefinitions,
  talentPoolDonut,
  talentPoolKonversi,
  talentPoolKpi,
  talentPoolNotes,
  talentPoolRows,
  talentPoolTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Talent Pool per Fungsi — Succession Planning — PTPN Group" };

export default function TalentPoolDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<Users size={19} strokeWidth={1.9} />}
          title="Talent Pool per Fungsi"
          subtitle="Sebaran 1.245 talenta berpotensi tinggi menurut fungsi, tingkat konversinya menjadi kandidat suksesi, dan mutu pipeline tiap fungsi"
          stat="1.245 talenta HiPo · konversi 32,1% ke kandidat"
          breadcrumb="Talent Pool per Fungsi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={talentPoolKpi} />

          <div className="grid auto-rows-[minmax(254px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,40fr)_minmax(0,28fr)]">
            <TiDonutCard
              title="Komposisi Pool per Fungsi"
              subtitle="Jumlah talenta HiPo tiap fungsi"
              data={talentPoolDonut}
              centerValue="1.245"
              centerLabel="Talenta HiPo"
              footer="Operasional menguasai 31,2% pool, sejalan dengan porsi populasi karyawan grup."
            />
            <TiTrendCard
              title="Pertumbuhan Pool per Fungsi"
              subtitle="Jumlah talenta HiPo tiap kuartal"
              data={talentPoolTrend}
              delay={80}
              domain={[80, 400]}
              series={[
                { key: "operasional", label: "Operasional", color: PALETTE.blue },
                { key: "keuangan", label: "Keuangan", color: PALETTE.green },
                { key: "komersial", label: "Komersial", color: PALETTE.amber },
                { key: "digital", label: "Teknologi & Digital", color: PALETTE.purple },
                { key: "sdm", label: "SDM & Umum", color: PALETTE.teal },
              ]}
              footer="Teknologi & Digital tumbuh paling cepat (+34% dalam empat kuartal) dari basis terkecil."
            />
            <BarListCard
              title="Konversi Pool ke Kandidat"
              subtitle="Porsi talenta HiPo yang dinominasikan"
              delay={120}
              max={45}
              rows={talentPoolKonversi.map((f) => ({
                label: f.label,
                value: f.value,
                valueLabel: `${f.value.toFixed(1).replace(".", ",")}%`,
                note: f.note,
                color: f.value >= 35 ? "#1a9c5b" : f.value >= 29 ? "#f5a524" : "#ef4444",
              }))}
              footer="Fungsi Lainnya hanya mengonversi 21,6% — mayoritas peran pendukung tanpa posisi kritis."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Talent Pool per Fungsi"
              subtitle="Pool, konversi ke kandidat suksesi, kesiapan, dan catatan mutu pipeline"
              columns={[
                { key: "fungsi", label: "Fungsi", cellClass: "font-semibold text-ink-900" },
                { key: "pool", label: "Talenta HiPo", align: "right" },
                { key: "pct", label: "Porsi Pool", align: "right" },
                { key: "kandidat", label: "Kandidat Suksesi", align: "right" },
                { key: "readyNow", label: "Ready Now", align: "right" },
                { key: "konversi", label: "Konversi", align: "right" },
                { key: "bench", label: "Bench", align: "right" },
                { key: "catatan", label: "Catatan" },
              ]}
              rows={talentPoolRows.map((r) => ({
                fungsi: r.fungsi,
                pool: r.pool.toLocaleString("id-ID"),
                pct: r.pct,
                kandidat: <span className="font-bold text-ink-900">{r.kandidat}</span>,
                readyNow: <span className="font-bold text-ptpn-green">{r.readyNow}</span>,
                konversi: r.konversi,
                bench: (
                  <span
                    className={
                      Number(r.bench.replace(",", ".")) >= 1.5
                        ? "font-bold text-ptpn-green"
                        : Number(r.bench.replace(",", ".")) >= 1.0
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.bench}
                  </span>
                ),
                catatan: r.catatan,
              }))}
              footerRow={{
                fungsi: "Total Grup",
                pool: "1.245",
                pct: "100%",
                kandidat: "400",
                readyNow: "64",
                konversi: "32,1%",
                bench: "1,6",
                catatan: "Konversi ke Ready Now hanya 5,1% dari pool",
              }}
              note="Kolom Kandidat Suksesi menjumlahkan talenta yang sudah dinominasikan formal; totalnya sama dengan 400 kandidat pada pipeline kepemimpinan."
            />
            <NotesPanel notes={talentPoolNotes} definitions={talentPoolDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
