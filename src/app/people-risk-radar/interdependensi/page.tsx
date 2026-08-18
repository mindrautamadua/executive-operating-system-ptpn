import { Workflow } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrDetailHeader } from "@/components/prr/detail/PrrDetailHeader";
import { RiskInterdependency } from "@/components/prr/RiskInterdependency";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  interdepDefinitions,
  interdepKpi,
  interdepNotes,
  interdepSimpul,
  rantaiRows,
} from "@/lib/prr-detail";

export const metadata = { title: "Interdependensi Risiko — People Risk Radar — PTPN Group" };

export default function InterdependensiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrDetailHeader
          icon={<Workflow size={19} strokeWidth={1.9} />}
          title="Interdependensi Risiko"
          subtitle="Tiga rantai risiko yang saling menguatkan, simpul yang muncul di banyak rantai, dan titik putus dengan leverage mitigasi tertinggi"
          stat="3 rantai amplifikasi · efek berantai +11 pts ke skor grup"
          breadcrumb="Interdependensi Risiko"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={interdepKpi} />

          <div className="grid auto-rows-[268px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,32fr)_minmax(0,34fr)]">
            <RiskInterdependency showLink={false} />
            <BarListCard
              title="Frekuensi Simpul di Rantai"
              subtitle="Berapa banyak rantai yang melewati risiko ini"
              delay={80}
              max={4}
              rows={interdepSimpul.map((s) => ({
                label: s.label,
                value: s.value,
                valueLabel: `${s.value}`,
                note: s.note,
                color: s.value >= 3 ? "#ef4444" : s.value >= 2 ? "#f5a524" : "#1a9c5b",
              }))}
              footer="Turnover Risk melewati ketiga rantai — memutusnya memberi efek ganda pada seluruh jaringan risiko."
            />
            <BarListCard
              title="Kontribusi Rantai ke Skor Grup"
              subtitle="Porsi overall risk score yang berasal dari efek amplifikasi"
              delay={120}
              max={13}
              rows={rantaiRows.map((r) => ({
                label: r.rantai,
                value: Number(r.kontribusi.replace("+", "").replace(" pts", "")),
                valueLabel: r.kontribusi,
                note: `amplifikasi ${r.amplifikasi}`,
                color: r.amplifikasi === "High" ? "#ef4444" : "#f5a524",
              }))}
              footer="Total 22 pts dari efek berantai; sekitar 11 pts di antaranya tidak tumpang tindih antar rantai."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rantai Amplifikasi Risiko"
              subtitle="Jalur kausal, pemicu, dampak akhir, dan titik putus tiap rantai"
              columns={[
                { key: "rantai", label: "Rantai", cellClass: "font-semibold text-ink-900" },
                { key: "jalur", label: "Jalur Kausal" },
                { key: "pemicu", label: "Pemicu" },
                { key: "dampakAkhir", label: "Dampak Akhir" },
                { key: "amplifikasi", label: "Amplifikasi" },
                { key: "kontribusi", label: "Kontribusi Skor", align: "right" },
                { key: "titikPutus", label: "Titik Putus" },
                { key: "kontrol", label: "Kontrol Pemutus" },
              ]}
              rows={rantaiRows.map((r) => ({
                rantai: r.rantai,
                jalur: r.jalur,
                pemicu: r.pemicu,
                dampakAkhir: r.dampakAkhir,
                amplifikasi: (
                  <Pill
                    label={r.amplifikasi}
                    tone={r.amplifikasi === "High" ? "red" : r.amplifikasi === "Medium" ? "amber" : "green"}
                  />
                ),
                kontribusi: <span className="font-bold text-[#ef4444]">{r.kontribusi}</span>,
                titikPutus: <span className="font-semibold text-ink-900">{r.titikPutus}</span>,
                kontrol: r.kontrol,
              }))}
              footerRow={{
                rantai: "3 Rantai",
                jalur: "7 simpul pada rantai utama",
                pemicu: "Skill gap, aging, kompensasi",
                dampakAkhir: "Business Risk ↑",
                amplifikasi: "1 High",
                kontribusi: "+11 pts",
                titikPutus: "Beban Kerja",
                kontrol: "Review struktur & beban kerja (Rp 2,8 M)",
              }}
              note="Kontribusi antar rantai saling tumpang tindih pada simpul yang sama; total bersih terhadap skor grup diperkirakan 11 pts, bukan penjumlahan langsung ketiga rantai."
            />
            <NotesPanel notes={interdepNotes} definitions={interdepDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
