import { Grid3x3 } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { NineBoxDetailGrid } from "@/components/succession/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  nineBoxByFungsi,
  nineBoxCells,
  nineBoxDefinitions,
  nineBoxKpi,
  nineBoxNotes,
  nineBoxRows,
  nineBoxTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Peta Suksesi 9 Box — Succession Planning — PTPN Group" };

export default function NineBoxDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<Grid3x3 size={19} strokeWidth={1.9} />}
          title="Peta Suksesi — 9 Box Talent Grid"
          subtitle="Sebaran 1.245 talenta pada matriks potensi versus kinerja, tindakan talenta tiap kotak, dan kontribusinya terhadap pipeline suksesi"
          stat="1.245 talenta dinilai · 642 berpotensi tinggi"
          breadcrumb="Peta Suksesi 9 Box"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={nineBoxKpi} />

          <div className="grid auto-rows-[288px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,32fr)_minmax(0,24fr)]">
            <NineBoxDetailGrid
              cells={nineBoxCells}
              subtitle="Tiap kotak menampilkan jumlah talenta, porsi populasi, dan tindakan talenta yang disepakati forum kalibrasi"
            />
            <TiTrendCard
              title="Pergeseran Baris Grid (4 Kuartal)"
              subtitle="Porsi populasi menurut tingkat potensi"
              data={nineBoxTrend}
              delay={80}
              domain={[0, 60]}
              unit="%"
              series={[
                { key: "potensiTinggi", label: "Potensi Tinggi (Box 7-9)", color: PALETTE.green },
                { key: "potensiMenengah", label: "Potensi Menengah (Box 4-6)", color: PALETTE.blue },
                { key: "potensiRendah", label: "Potensi Rendah (Box 1-3)", color: PALETTE.red },
              ]}
              footer="Baris potensi tinggi menebal 6,8 ppts dalam empat kuartal — perlu diuji ketatnya kalibrasi potensi."
            />
            <BarListCard
              title="Porsi Star Talent per Fungsi"
              subtitle="Box 9 terhadap pool fungsi terkait"
              delay={120}
              max={40}
              rows={nineBoxByFungsi.map((f) => ({
                label: f.label,
                value: f.value,
                valueLabel: `${f.value.toFixed(1).replace(".", ",")}%`,
                note: f.note,
                color: f.value >= 25 ? "#1a9c5b" : f.value >= 19 ? "#f5a524" : "#ef4444",
              }))}
              footer="Fungsi Operasional memasok 135 dari 307 Star Talent, sejalan dengan ukuran poolnya."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Kotak 9 Box"
              subtitle="Populasi, pergerakan kuartal, kontribusi pipeline, dan pemilik tindakan"
              columns={[
                { key: "box", label: "Kotak", cellClass: "font-semibold text-ink-900" },
                { key: "nama", label: "Nama Kotak", cellClass: "font-semibold text-ink-900" },
                { key: "jumlah", label: "Talenta", align: "right" },
                { key: "pct", label: "Porsi", align: "right" },
                { key: "deltaKuartal", label: "Δ Kuartal", align: "right" },
                { key: "kandidatSuksesi", label: "Jadi Kandidat", align: "right" },
                { key: "tindakan", label: "Tindakan Talenta" },
                { key: "pemilik", label: "Pemilik" },
              ]}
              rows={nineBoxRows.map((r) => ({
                box: r.box,
                nama: r.nama,
                jumlah: r.jumlah.toLocaleString("id-ID"),
                pct: r.pct,
                deltaKuartal: (
                  <span
                    className={
                      r.deltaKuartal.startsWith("+")
                        ? "font-bold text-ptpn-green"
                        : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.deltaKuartal}
                  </span>
                ),
                kandidatSuksesi: (
                  <span className="font-bold text-ink-900">{r.kandidatSuksesi}</span>
                ),
                tindakan: r.tindakan,
                pemilik: r.pemilik,
              }))}
              footerRow={{
                box: "Total",
                nama: "9 kotak",
                jumlah: "1.245",
                pct: "100%",
                deltaKuartal: "+65",
                kandidatSuksesi: "400",
                tindakan: "—",
                pemilik: "—",
              }}
              note="Kolom Jadi Kandidat menghitung talenta pada kotak tersebut yang sudah dinominasikan pada minimal satu posisi kritis; totalnya sama dengan 400 kandidat suksesi grup."
            />
            <NotesPanel notes={nineBoxNotes} definitions={nineBoxDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
