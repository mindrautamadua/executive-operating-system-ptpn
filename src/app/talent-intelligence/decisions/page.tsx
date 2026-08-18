import { AlertCircle, AlertTriangle, CheckCircle2, Gavel, Lightbulb } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiDetailHeader } from "@/components/ti/detail/TiDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  decisionByCategory,
  decisionDefinitions,
  decisionKpi,
  decisionNotes,
  decisionRows,
} from "@/lib/ti-detail";

export const metadata = { title: "Talent Decisions — Talent Intelligence — PTPN Group" };

const TONE = {
  red: {
    icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    kicker: "text-[#ef4444]",
  },
  amber: {
    icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    kicker: "text-[#d98b06]",
  },
  green: {
    icon: CheckCircle2,
    iconCls: "text-ptpn-green",
    pill: "bg-ptpn-greenLight text-ptpn-green",
    wrap: "border-[#d6ecdf] bg-[#f4faf6]",
    kicker: "text-ptpn-green",
  },
} as const;

const STATUS_TONE = {
  "Menunggu BOD": "red",
  Disetujui: "amber",
  Berjalan: "green",
  Selesai: "slate",
} as const;

const num = (v: number) => v.toLocaleString("id-ID");

export default function TalentDecisionsPage() {
  return (
    <div className="flex h-screen min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiDetailHeader
          icon={<Gavel size={19} strokeWidth={1.9} />}
          title="Talent Decisions"
          subtitle="Register keputusan talenta yang diajukan ke BOD Decision Center beserta konteks, dampak, anggaran, dan statusnya"
          stat="6 keputusan aktif · 3 menunggu BOD · Rp 8,6 M"
          breadcrumb="Talent Decisions"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={decisionKpi} />

          <div className="grid grid-cols-3 gap-3">
            {decisionRows.slice(0, 3).map((d, i) => {
              const t = TONE[d.tone];
              const Icon = t.icon;
              return (
                <div
                  key={d.kode}
                  className={`anim-rise flex flex-col rounded-xl border px-3.5 pb-3 pt-3 ${t.wrap}`}
                  style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                      <span className={`shrink-0 text-[9px] font-extrabold uppercase tracking-[0.05em] ${t.kicker}`}>
                        {d.kicker}
                      </span>
                    </div>
                    <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                      {d.kategori}
                    </span>
                  </div>

                  <div className="mt-1 text-[10.5px] font-bold text-ink-900">{d.judul}</div>
                  <p className="mt-1 text-[9px] leading-[1.45] text-ink-500">{d.konteks}</p>

                  <div className="mt-1.5 flex items-start gap-1.5 text-[8.5px] leading-[1.4]">
                    <Lightbulb size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
                    <span className="font-semibold text-ink-700">{d.rekomendasi}</span>
                  </div>

                  <dl className="mt-2 grid grid-cols-3 gap-1.5 border-t border-white/70 pt-1.5 text-[8.5px]">
                    <div>
                      <dt className="font-bold text-ink-400">Talenta</dt>
                      <dd className="font-extrabold text-ink-900">{num(d.talenta)}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink-400">Anggaran</dt>
                      <dd className="font-extrabold text-ink-900">{d.anggaran}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink-400">Tenggat</dt>
                      <dd className="font-extrabold text-ink-900">{d.tenggat}</dd>
                    </div>
                  </dl>

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="truncate text-[9px] font-semibold text-ink-500">{d.pemilik}</span>
                    <Pill label={d.status} tone={STATUS_TONE[d.status]} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Register Keputusan Talenta"
                subtitle="Enam keputusan aktif yang diajukan ke BOD Decision Center"
                columns={[
                  { key: "kode", label: "Kode", cellClass: "font-extrabold text-ink-900" },
                  { key: "judul", label: "Keputusan", cellClass: "font-semibold text-ink-900" },
                  { key: "kategori", label: "Kategori" },
                  { key: "rekomendasi", label: "Rekomendasi" },
                  { key: "dampak", label: "Dampak Diharapkan" },
                  { key: "talenta", label: "Talenta", align: "right" },
                  { key: "anggaran", label: "Anggaran", align: "right" },
                  { key: "pemilik", label: "Pemilik" },
                  { key: "tenggat", label: "Tenggat", align: "right" },
                  { key: "status", label: "Status" },
                ]}
                rows={decisionRows.map((d) => ({
                  kode: d.kode,
                  judul: <span className="whitespace-normal">{d.judul}</span>,
                  kategori: d.kategori,
                  rekomendasi: <span className="whitespace-normal text-ink-500">{d.rekomendasi}</span>,
                  dampak: <span className="whitespace-normal">{d.dampak}</span>,
                  talenta: num(d.talenta),
                  anggaran: d.anggaran,
                  pemilik: d.pemilik,
                  tenggat: d.tenggat,
                  status: <Pill label={d.status} tone={STATUS_TONE[d.status]} />,
                }))}
                footerRow={{
                  kode: "Total",
                  judul: "6 keputusan aktif",
                  kategori: "5 kategori",
                  rekomendasi: "",
                  dampak: "",
                  talenta: "637",
                  anggaran: "Rp 8,6 M",
                  pemilik: "",
                  tenggat: "",
                  status: "3 menunggu BOD",
                }}
                note="Talenta terdampak pada baris total dihitung tanpa penggandaan lintas keputusan; angka KPI 767 mencakup keputusan yang telah selesai pada periode berjalan."
              />

              <BarListCard
                title="Talenta Terdampak per Kategori"
                subtitle="Cakupan keputusan berdasarkan kategori dampaknya"
                delay={40}
                rows={decisionByCategory.map((c) => ({
                  label: c.label,
                  value: c.value,
                  note: c.note,
                  color:
                    c.label === "Kontinuitas" ? "#ef4444" : c.label === "Efisiensi" ? "#1a9c5b" : "#f5a524",
                }))}
                footer="Kategori Alokasi menjangkau talenta terbanyak (312) lewat realokasi anggaran development antar entitas."
              />
            </div>
            <NotesPanel notes={decisionNotes} definitions={decisionDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
