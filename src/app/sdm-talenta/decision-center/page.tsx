import { AlertCircle, AlertTriangle, CheckCircle2, Gavel, Lightbulb } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill, riskTone } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { bodDecisions } from "@/lib/hc-data";
import {
  decByCategory,
  decDefinitions,
  decKpi,
  decNotes,
  decRows,
} from "@/lib/sdm-detail";

export const metadata = {
  title: "BOD Decision Center — SDM & Talenta — PTPN Group",
};

const TONE = {
  red: { icon: AlertCircle, iconCls: "text-[#ef4444]", wrap: "border-[#f6d5d5] bg-[#fdf5f5]", kicker: "text-[#ef4444]" },
  amber: { icon: AlertTriangle, iconCls: "text-[#d98b06]", wrap: "border-[#f3e3c3] bg-[#fdf9f0]", kicker: "text-[#d98b06]" },
  green: { icon: CheckCircle2, iconCls: "text-ptpn-green", wrap: "border-[#d6ecdf] bg-[#f4faf6]", kicker: "text-ptpn-green" },
} as const;

const STATUS_TONE = {
  "Menunggu BOD": "red",
  Overdue: "red",
  Disetujui: "amber",
  Berjalan: "green",
  Selesai: "slate",
} as const;

export default function DecisionCenterPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Gavel size={19} strokeWidth={1.9} />}
          title="BOD Decision Center"
          subtitle="Register lengkap item keputusan people & talent yang menunggu, berjalan, dan selesai — beserta nilai dampak dan tenggatnya"
          stat="9 item aktif · 3 menunggu BOD · eksposur Rp 98,6 M"
          breadcrumb="BOD Decision Center"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={decKpi} />

          {/* Tiga item prioritas — versi besar kartu ringkas di dashboard HC. */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bodDecisions.slice(0, 3).map((d, i) => {
              const t = TONE[d.tone];
              const Icon = t.icon;
              return (
                <div
                  key={d.title}
                  className={`anim-rise flex flex-col rounded-xl border px-3.5 pb-3 pt-3 ${t.wrap}`}
                  style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                    <span className={`text-[9px] font-extrabold uppercase tracking-[0.05em] ${t.kicker}`}>
                      {d.impact}
                    </span>
                    {d.overdue && (
                      <span className="ml-auto rounded bg-[#ef4444] px-1.5 py-[1px] text-[9px] font-bold text-white">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10.5px] font-bold text-ink-900">{d.title}</div>
                  <p className="mt-1 flex-1 text-[9px] leading-[1.45] text-ink-600">{d.text}</p>
                  <div className="mt-2 flex items-center justify-between border-t border-white/70 pt-1.5">
                    <span className="flex items-center gap-1 text-[8.5px] font-semibold text-ink-500">
                      <Lightbulb size={10} className="text-ptpn-green" />
                      Tenggat {d.due}
                    </span>
                    <button className="rounded-lg bg-ptpn-green px-2.5 py-[4px] text-[8.5px] font-bold text-white transition-opacity hover:opacity-90">
                      Jadwalkan di Rapat BOD
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Register Keputusan"
              subtitle="Seluruh item aktif dan yang selesai bulan berjalan — 9 item"
              columns={[
                { key: "kode", label: "Kode" },
                { key: "judul", label: "Item", cellClass: "font-bold" },
                { key: "kategori", label: "Kategori" },
                { key: "dampakPill", label: "Dampak", align: "center" },
                { key: "nilai", label: "Nilai", align: "right", cellClass: "font-bold" },
                { key: "rekomendasi", label: "Rekomendasi" },
                { key: "pemilik", label: "Pemilik" },
                { key: "tenggat", label: "Tenggat", align: "right" },
                { key: "statusPill", label: "Status", align: "center" },
              ]}
              rows={decRows.map((r) => ({
                ...r,
                dampakPill: <Pill label={r.dampak} tone={riskTone(r.dampak)} />,
                statusPill: <Pill label={r.status} tone={STATUS_TONE[r.status]} />,
              }))}
              note="Nilai = dampak rupiah bila item tidak diputuskan sampai tenggat, diturunkan dari baseline grup. Item Information tidak membawa nilai karena tidak menunggu keputusan."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Komposisi Item"
                subtitle="Per kategori register"
                rows={decByCategory}
                delay={80}
                footer="Kategori mengikuti tab kartu BOD Decision Center di dashboard HC: Decision Required / Opportunity / Information."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "120ms" } as React.CSSProperties}>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
                Pembacaan Eksekutif
              </h3>
              <p className="mt-2 text-[9.5px] leading-[1.6] text-ink-700">
                Dari sembilan item aktif, hanya tiga yang benar-benar menunggu keputusan —
                dan dua di antaranya (succession risk dan labor cost) saling terkait,
                sehingga layak diputuskan sebagai satu paket di rapat BOD terdekat.
                Item tertua, <span className="font-bold text-[#ef4444]">Internal Talent
                Mobility, sudah 47 hari melewati tenggat</span> dan menahan potensi saving
                Rp 12,6 M; menyetujuinya sekaligus mengurangi 12 posisi kritikal tanpa
                suksesor yang memicu alert kritikal di register alert.
              </p>
            </div>
            <NotesPanel notes={decNotes} definitions={decDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
