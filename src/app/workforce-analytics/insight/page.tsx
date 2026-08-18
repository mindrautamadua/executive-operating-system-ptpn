import { Lightbulb } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, NotesPanel } from "@/components/wa/detail/parts";
import { InsightExplorer } from "@/components/wa/detail/InsightExplorer";
import {
  dinamikaDefinitions,
  insightCategories,
  insightKpi,
  insightNotes,
  insightRows,
} from "@/lib/wa-detail-dinamika";

export const metadata = { title: "Insight & Rekomendasi — Workforce Analytics — PTPN Group" };

const dec = (v: number) => v.toString().replace(".", ",");

const byCategory = insightCategories
  .map((c) => {
    const rows = insightRows.filter((i) => i.category === c);
    return {
      label: c,
      value: Number(rows.reduce((s, i) => s + i.impactRp, 0).toFixed(1)),
      count: rows.length,
    };
  })
  .sort((a, b) => b.value - a.value);

const byStatus = ["Perlu Keputusan", "Berjalan", "Rencana", "Selesai"].map((s) => ({
  label: s,
  value: insightRows.filter((i) => i.status === s).length,
  exposure: Number(
    insightRows
      .filter((i) => i.status === s)
      .reduce((a, i) => a + i.impactRp, 0)
      .toFixed(1),
  ),
}));

const STATUS_COLOR: Record<string, string> = {
  "Perlu Keputusan": "#ef4444",
  Berjalan: "#3b7ded",
  Rencana: "#f5a524",
  Selesai: "#1a9c5b",
};

export default function InsightPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<Lightbulb size={19} strokeWidth={1.9} />}
          title="Insight & Rekomendasi"
          subtitle="Seluruh temuan analitik workforce siklus Mei 2026 — eksposur, pemilik, forum keputusan, dan status tindak lanjut"
          stat="10 insight · eksposur Rp 282,3 M"
          breadcrumb="Insight & Rekomendasi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={insightKpi} />

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,34fr)_minmax(0,32fr)]">
            <BarListCard
              title="Eksposur per Kategori"
              subtitle="Dampak 12 bulan ke depan (Rp miliar)"
              delay={40}
              rows={byCategory.map((c) => ({
                label: c.label,
                value: c.value,
                valueLabel: `Rp ${dec(c.value)} M`,
                note: `${c.count} insight`,
                color: c.value >= 50 ? "#ef4444" : c.value >= 20 ? "#f5a524" : "#3b7ded",
              }))}
              footer="Kapasitas dan produktivitas menyumbang lebih dari separuh total eksposur."
            />
            <BarListCard
              title="Status Tindak Lanjut"
              subtitle="Jumlah insight dan eksposur per status"
              delay={80}
              rows={byStatus.map((s) => ({
                label: s.label,
                value: s.value,
                valueLabel: String(s.value),
                note: `Rp ${dec(s.exposure)} M`,
                color: STATUS_COLOR[s.label],
              }))}
              footer="Empat insight menunggu forum — Rp 122,8 M eksposur belum berpindah ke eksekusi."
            />
            <NotesPanel notes={insightNotes} definitions={dinamikaDefinitions} />
          </div>

          <InsightExplorer />
        </div>
      </main>
    </div>
  );
}
