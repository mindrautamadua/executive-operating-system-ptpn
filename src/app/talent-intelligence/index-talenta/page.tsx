import { Gauge } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  indexByOrg,
  indexComponentDetail,
  indexDefinitions,
  indexKpi,
  indexNotes,
  indexTrend,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Intelligence Index — Talent Intelligence — PTPN Group" };

export default function TalentIndexPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Gauge size={19} strokeWidth={1.9} />}
          title="Talent Intelligence Index"
          subtitle="Komposit tujuh komponen kesehatan talenta, penyusun tiap komponen, dan jaraknya ke target 2027"
          stat="Index 74 / 100 · target 2027: 80"
          breadcrumb="Talent Intelligence Index"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={indexKpi} />

          <div className="grid auto-rows-[248px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,32fr)_minmax(0,32fr)]">
            <TiTrendCard
              title="Tren Index (6 Semester)"
              subtitle="Garis putus-putus = target korporat 2027 (80)"
              data={indexTrend}
              domain={[55, 85]}
              reference={{ value: 80, color: PALETTE.slate }}
              series={[{ key: "index", label: "Talent Intelligence Index", color: PALETTE.green }]}
              footer="Naik 12 poin sejak Nov 2023 dengan laju rata-rata +3 poin per semester."
            />
            <BarListCard
              title="Skor per Komponen"
              subtitle="Tujuh komponen penyusun index, skala 0–100"
              delay={40}
              max={100}
              rows={indexComponentDetail.map((c) => ({
                label: c.label,
                value: c.score,
                valueLabel: `${c.score}`,
                note: `target ${c.target}`,
                color: c.score >= 79 ? "#1a9c5b" : c.score >= 74 ? "#f2c53d" : "#ef4444",
              }))}
              footer="Empat komponen masih di bawah ambang zona aman (75)."
            />
            <BarListCard
              title="Index per Entitas"
              subtitle="Komposit yang dihitung ulang pada tingkat entitas"
              delay={80}
              max={85}
              rows={indexByOrg.map((o) => ({
                label: o.label,
                value: o.value,
                valueLabel: `${o.value}`,
                note: o.note,
                color: o.value >= 76 ? "#1a9c5b" : o.value >= 71 ? "#f5a524" : "#ef4444",
              }))}
              footer="Sebaran 12 poin antara Holding & SBU (79) dan PTPN I Regional 1 (67)."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Penyusun Tiap Komponen"
              subtitle="Metrik pembentuk skor, capaian saat ini, dan selisih ke target komponen"
              columns={[
                { key: "label", label: "Komponen", cellClass: "font-semibold text-ink-900" },
                { key: "score", label: "Skor", align: "right", cellClass: "font-extrabold text-ink-900" },
                { key: "prev", label: "Mei 2025", align: "right" },
                { key: "delta", label: "Perubahan", align: "right" },
                { key: "target", label: "Target 2027", align: "right" },
                { key: "gap", label: "Selisih ke Target", align: "right" },
                { key: "penyusun", label: "Metrik Penyusun" },
                { key: "sumber", label: "Kartu Sumber" },
              ]}
              rows={indexComponentDetail.map((c) => ({
                label: c.label,
                score: c.score,
                prev: c.prev,
                delta: (
                  <span className="font-bold text-ptpn-green">+{c.score - c.prev}</span>
                ),
                target: c.target,
                gap: (
                  <span
                    className={
                      c.target - c.score <= 3 ? "font-bold text-ptpn-green" : c.target - c.score <= 8 ? "font-bold text-[#d98b06]" : "font-bold text-[#ef4444]"
                    }
                  >
                    -{c.target - c.score}
                  </span>
                ),
                penyusun: <span className="whitespace-normal text-ink-500">{c.penyusun}</span>,
                sumber: c.sumber,
              }))}
              footerRow={{
                label: "Index Komposit",
                score: "74",
                prev: "68",
                delta: "+6",
                target: "80",
                gap: "-6",
                penyusun: "Rata-rata sederhana tujuh komponen",
                sumber: "—",
              }}
              note="Index = rata-rata sederhana tujuh komponen, masing-masing dinormalisasi ke skala 0–100 dari metrik kartu sumbernya."
            />
            <NotesPanel notes={indexNotes} definitions={indexDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
