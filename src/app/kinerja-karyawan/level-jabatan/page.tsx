import { Layers } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { KinerjaDetailHeader } from "@/components/kinerja/detail/KinerjaDetailHeader";
import { KategoriStackBars } from "@/components/kinerja/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { levelJabatan, levelLegend } from "@/lib/kinerja-data";
import {
  levelDefinitions,
  levelKpi,
  levelNotes,
  levelRows,
  levelScoreBars,
} from "@/lib/kinerja-detail";

export const metadata = { title: "Kinerja per Level Jabatan — Kinerja Karyawan — PTPN Group" };

export default function KinerjaLevelJabatanDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Performance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaDetailHeader
          icon={<Layers size={19} strokeWidth={1.9} />}
          title="Kinerja per Level Jabatan"
          subtitle="Komposisi kategori kinerja tiap lapis jabatan, gradien skor Direktur hingga Staff, dan sebaran skor individu di dalamnya"
          stat="Gap Direktur–Staff 8,4 poin · Supervisor titik terlemah"
          breadcrumb="Kinerja per Level Jabatan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={levelKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <KategoriStackBars
              title="Komposisi Kategori per Level Jabatan"
              subtitle="Porsi tiap kategori kinerja dalam satu level, dengan rata-rata skor di kanan"
              legend={levelLegend}
              rows={levelJabatan.map((r) => ({
                label: r.level,
                seg: r.seg,
                valueLabel: r.score,
              }))}
              footer="Porsi Outstanding menurun dari 28% (Direktur) ke 12% (Staff), sedangkan Below Target + Poor naik dari 4% ke 13%."
            />
            <BarListCard
              title="Rata-rata Skor per Level"
              subtitle="Overall score tiap lapis jabatan, Q2 2026"
              delay={80}
              max={95}
              rows={levelScoreBars.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: o.valueLabel,
                note: o.value >= 85 ? "≥ target" : `-${(85 - o.value).toFixed(1).replace(".", ",")} vs target`,
                color: o.value >= 88 ? "#1a9c5b" : o.value >= 85 ? "#4caf6d" : "#f5a524",
              }))}
              footer="Supervisor dan Staff — 96% populasi dinilai — keduanya masih di bawah target grup 85,0."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Kinerja per Level Jabatan"
              subtitle="Populasi, skor, sebaran individu, dan gradien antar level"
              columns={[
                { key: "level", label: "Level Jabatan", cellClass: "font-semibold text-ink-900" },
                { key: "karyawan", label: "Karyawan Dinilai", align: "right" },
                { key: "score", label: "Rata-rata Score", align: "right" },
                { key: "delta", label: "Δ Kuartal", align: "right" },
                { key: "outstanding", label: "Outstanding", align: "right" },
                { key: "below", label: "Below + Poor", align: "right" },
                { key: "rentang", label: "Rentang Skor (P5–P95)" },
                { key: "span", label: "Gap ke Level Bawah", align: "right" },
                { key: "catatan", label: "Catatan" },
              ]}
              rows={levelRows.map((r) => ({
                level: r.level,
                karyawan: r.karyawan,
                score: <span className="font-bold text-ink-900">{r.score}</span>,
                delta: <span className="font-bold text-ptpn-green">{r.delta}</span>,
                outstanding: <span className="font-bold text-ptpn-green">{r.outstanding}</span>,
                below: <span className="font-bold text-[#ef4444]">{r.below}</span>,
                rentang: r.rentang,
                span: r.span,
                catatan: r.catatan,
              }))}
              footerRow={{
                level: "Total Grup",
                karyawan: "68.142",
                score: "87,6",
                delta: "+4,7",
                outstanding: "18,7%",
                below: "7,2%",
                rentang: "59,4 – 95,6",
                span: "—",
                catatan: "Rata-rata tertimbang seluruh level",
              }}
              note="Kolom Below + Poor menjumlahkan dua kategori terbawah. Skor grup lebih tinggi dari rata-rata sederhana antar level karena bobot dimensi berbeda menurut jenjang jabatan."
            />
            <NotesPanel notes={levelNotes} definitions={levelDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
