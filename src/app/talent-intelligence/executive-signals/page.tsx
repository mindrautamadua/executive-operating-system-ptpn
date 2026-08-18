import { BrainCircuit, Sparkles } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  execDefinitions,
  execKpi,
  execNotes,
  execRecommendation,
  execSignalDetail,
  execWatchlist,
} from "@/lib/ti-detail";

export const metadata = { title: "Executive Talent Intelligence — Talent Intelligence — PTPN Group" };

const SIGNAL_TONE = {
  red: { wrap: "border-[#f6d5d5] bg-[#fdf5f5]", dot: "bg-[#ef4444]", accent: "text-[#ef4444]" },
  amber: { wrap: "border-[#f3e3c3] bg-[#fdf9f0]", dot: "bg-[#f5a524]", accent: "text-[#d98b06]" },
  green: { wrap: "border-[#d6ecdf] bg-[#f4faf6]", dot: "bg-[#1a9c5b]", accent: "text-ptpn-green" },
} as const;

const STATUS_TONE = {
  Berjalan: "green",
  Terlambat: "red",
  Rencana: "amber",
  Selesai: "slate",
} as const;

export default function ExecutiveSignalsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<BrainCircuit size={19} strokeWidth={1.9} />}
          title="Executive Talent Intelligence"
          subtitle="Sinyal sintesis lintas kartu talenta, bukti pendukungnya, dan aksi yang sedang berjalan beserta pemiliknya"
          stat="4 sinyal aktif · 2 kritis · 11 dari 14 aksi berjalan"
          breadcrumb="Executive Signals"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={execKpi} />

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {execSignalDetail.map((s, i) => {
              const t = SIGNAL_TONE[s.tone];
              return (
                <div
                  key={s.no}
                  className={`anim-rise flex flex-col rounded-xl border px-3.5 pb-3 pt-3 ${t.wrap}`}
                  style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                    <span className="text-[9px] font-bold text-ink-500">{s.no}</span>
                    <span className="min-w-0 flex-1 truncate text-[10px] font-bold text-ink-900" title={s.title}>
                      {s.title}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-700">{s.temuan}</p>

                  <dl className="mt-2 flex flex-col gap-1 border-t border-white/70 pt-1.5 text-[8.5px] leading-[1.4]">
                    <div>
                      <dt className="font-bold text-ink-400">Bukti</dt>
                      <dd className="text-ink-500">{s.bukti}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink-400">Eksposur</dt>
                      <dd className={`font-bold ${t.accent}`}>{s.eksposur}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink-400">Aksi</dt>
                      <dd className="text-ink-700">{s.aksi}</dd>
                    </div>
                  </dl>

                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/70 pt-1.5">
                    <span className="truncate text-[9px] font-semibold text-ink-500">{s.pemilik}</span>
                    <Pill label={s.status} tone={STATUS_TONE[s.status]} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card anim-rise flex items-start gap-2 bg-ptpn-greenLight px-4 py-3">
            <Sparkles size={14} className="mt-[1px] shrink-0 text-ptpn-green" />
            <p className="text-[10px] leading-[1.5] text-ink-900">
              <span className="font-bold text-ptpn-green">Executive Recommendation: </span>
              {execRecommendation}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Register Sinyal & Tindak Lanjut"
                subtitle="Empat sinyal aktif dengan pemilik, tenggat, dan kartu sumbernya"
                columns={[
                  { key: "no", label: "Kode", cellClass: "font-extrabold text-ink-900" },
                  { key: "title", label: "Sinyal", cellClass: "font-semibold text-ink-900" },
                  { key: "sumber", label: "Kartu Sumber" },
                  { key: "eksposur", label: "Eksposur" },
                  { key: "aksi", label: "Aksi" },
                  { key: "pemilik", label: "Pemilik" },
                  { key: "tenggat", label: "Tenggat", align: "right" },
                  { key: "status", label: "Status" },
                ]}
                rows={execSignalDetail.map((s) => ({
                  no: s.no,
                  title: s.title,
                  sumber: s.sumber,
                  eksposur: <span className="whitespace-normal">{s.eksposur}</span>,
                  aksi: <span className="whitespace-normal text-ink-500">{s.aksi}</span>,
                  pemilik: s.pemilik,
                  tenggat: s.tenggat,
                  status: <Pill label={s.status} tone={STATUS_TONE[s.status]} />,
                }))}
                note="Sinyal dinaikkan bila melewati ambang materialitas: berdampak ke posisi kritikal, tren memburuk dua periode, atau selisih terhadap target melebihi 10%."
              />

              <BarListCard
                title="Angka yang Dipantau"
                subtitle="Metrik kunci di balik keempat sinyal aktif"
                delay={40}
                rows={execWatchlist.map((w) => ({
                  label: w.label,
                  value: w.value,
                  note: w.note,
                  color: w.note === "S4" ? "#1a9c5b" : w.note === "S3" ? "#f5a524" : "#ef4444",
                }))}
                footer="Angka ditarik langsung dari kartu sumber; perubahan pada kartu akan menggeser status sinyal."
              />
            </div>
            <NotesPanel notes={execNotes} definitions={execDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
