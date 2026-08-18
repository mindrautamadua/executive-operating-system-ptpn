import { ShieldAlert } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  posisiKritisByUnit,
  posisiKritisDefinitions,
  posisiKritisKpi,
  posisiKritisNotes,
  posisiKritisRows,
  posisiKritisTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Posisi Kritis — Succession Planning — PTPN Group" };

export default function PosisiKritisDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<ShieldAlert size={19} strokeWidth={1.9} />}
          title="Posisi Kritis"
          subtitle="Seluruh 212 posisi kritis grup: kecukupan suksesor, pemicu transisi incumbent, dan kesiapan pengganti darurat"
          stat="212 posisi kritis · 54 tanpa kandidat"
          breadcrumb="Posisi Kritis"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={posisiKritisKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <BarListCard
              title="Sebaran Posisi Kritis per Entitas"
              subtitle="Jumlah posisi kritis dan porsi yang tercakup suksesor"
              max={45}
              rows={posisiKritisByUnit.map((u) => ({
                label: u.label,
                value: u.value,
                valueLabel: `${u.value}`,
                note: `coverage ${u.coverage.toFixed(1).replace(".", ",")}%`,
                color: u.coverage >= 78 ? "#1a9c5b" : u.coverage >= 71 ? "#f5a524" : "#ef4444",
              }))}
              footer="Holding & Supporting Co menyimpan 36 posisi kritis dengan coverage terendah (69,4%)."
            />
            <TiTrendCard
              title="Tren Coverage & Eksposur"
              subtitle="Coverage posisi kritis, posisi berisiko tinggi, dan posisi tanpa kandidat"
              data={posisiKritisTrend}
              delay={80}
              domain={[0, 80]}
              series={[
                { key: "coverage", label: "Coverage (%)", color: PALETTE.green },
                { key: "tanpaKandidat", label: "Tanpa Kandidat (posisi)", color: PALETTE.red },
                { key: "risikoTinggi", label: "Risiko Tinggi (posisi)", color: PALETTE.amber },
              ]}
              footer="Coverage naik 6,1 ppts sementara posisi tanpa kandidat turun dari 67 ke 54 sepanjang semester."
            />
            <BarListCard
              title="Posisi Tanpa Kandidat per Entitas"
              subtitle="Jumlah posisi kritis tanpa suksesor teridentifikasi"
              delay={120}
              max={12}
              rows={posisiKritisByUnit
                .slice()
                .sort((a, b) => b.tanpaKandidat - a.tanpaKandidat)
                .map((u) => ({
                  label: u.label,
                  value: u.tanpaKandidat,
                  valueLabel: `${u.tanpaKandidat}`,
                  note: `dari ${u.value} posisi`,
                  color: u.tanpaKandidat >= 9 ? "#ef4444" : u.tanpaKandidat >= 7 ? "#f5a524" : "#1a9c5b",
                }))}
              footer="Total 53 posisi terpetakan di sini; 1 posisi sisanya berada pada entitas gabungan lainnya."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Posisi Kritis Prioritas Tertinggi"
              subtitle="Sepuluh posisi dengan bench terendah beserta pemicu transisi dan kesiapan darurat"
              columns={[
                { key: "posisi", label: "Posisi", cellClass: "font-semibold text-ink-900" },
                { key: "unit", label: "Unit" },
                { key: "level", label: "Level" },
                { key: "risk", label: "Risiko" },
                { key: "bench", label: "Bench", align: "right" },
                { key: "kandidat", label: "Kandidat", align: "right" },
                { key: "readyNow", label: "Ready Now", align: "right" },
                { key: "estSiap", label: "Est. Kesiapan" },
                { key: "pemicu", label: "Pemicu Transisi" },
                { key: "darurat", label: "Pengganti Darurat" },
              ]}
              rows={posisiKritisRows.map((r) => ({
                posisi: r.posisi,
                unit: r.unit,
                level: r.level,
                risk: (
                  <Pill
                    label={r.risk}
                    tone={r.risk === "Tinggi" ? "red" : r.risk === "Sedang" ? "amber" : "green"}
                  />
                ),
                bench: (
                  <span
                    className={
                      Number(r.bench.replace(",", ".")) >= 1.0
                        ? "font-bold text-ptpn-green"
                        : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.bench}
                  </span>
                ),
                kandidat: r.kandidat,
                readyNow: (
                  <span
                    className={r.readyNow === 0 ? "font-bold text-[#ef4444]" : "font-bold text-ink-900"}
                  >
                    {r.readyNow}
                  </span>
                ),
                estSiap: r.estSiap,
                pemicu: r.pemicu,
                darurat: (
                  <Pill
                    label={r.darurat}
                    tone={
                      r.darurat === "Emergency Ready"
                        ? "green"
                        : r.darurat === "Interim Ready"
                          ? "amber"
                          : "red"
                    }
                  />
                ),
              }))}
              footerRow={{
                posisi: "Total Grup",
                unit: "10 entitas",
                level: "5 level",
                risk: "38 risiko tinggi",
                bench: "1,6",
                kandidat: "400",
                readyNow: "64",
                estSiap: "10 bln (rata-rata)",
                pemicu: "31 posisi transisi < 18 bln",
                darurat: "143 Emergency Ready",
              }}
              note="Tabel menampilkan sepuluh posisi dengan bench terendah dari 212 posisi kritis. Bench di bawah 1,0 berarti belum ada satu pun suksesor layak setelah pembobotan kesiapan."
            />
            <NotesPanel notes={posisiKritisNotes} definitions={posisiKritisDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
