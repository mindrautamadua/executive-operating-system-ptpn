"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { pendingDetail, type DekPendingRow } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const TONE: Record<
  DekPendingRow["tone"],
  { icon: typeof AlertCircle; iconCls: string; pill: string; wrap: string }
> = {
  red: {
    icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
  },
  amber: {
    icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
  },
  blue: {
    icon: Info,
    iconCls: "text-[#3b7ded]",
    pill: "bg-[#e8f1fd] text-[#2f6fe4]",
    wrap: "border-[#d9e6fb] bg-[#f6f9fe]",
  },
};

/** Empat permohonan yang menunggu tanggapan tertulis Dewan Komisaris. */
export function PendingDetail() {
  const { active, isFiltered, def } = useSubholding();
  // Sebagian perihal menyebut subholding objek permohonan (mis. "Divestasi aset
  // non-produktif PTPN I"); permohonan tingkat grup tetap tampil.
  const rows = filterBySubholding(pendingDetail, active, (p) => p.perihal);
  const lewatSla = rows.filter((p) => p.selisihSla > 0).length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Menunggu Tanggapan Dewan Komisaris" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Permohonan Tertahan (cakupan ${def.label}) · ${lewatSla} Melewati SLA 14 Hari`
          : "4 Permohonan Tertahan · 2 Telah Melewati SLA 14 Hari"}
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {rows.map((p) => {
          const t = TONE[p.tone];
          const Icon = t.icon;
          const lewat = p.selisihSla > 0;
          return (
            <div key={p.id} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-1.5">
                  <Icon size={13} className={`mt-[1px] shrink-0 ${t.iconCls}`} />
                  <span className="min-w-0 text-[10px] font-bold leading-snug text-ink-900">
                    {p.perihal}
                  </span>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                  {p.nilai}
                </span>
              </div>

              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">
                <span className="font-bold text-ink-700">Penyebab tertahan:</span> {p.penyebab}
              </p>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">
                <span className="font-bold text-ink-700">Risiko bila tertunda:</span>{" "}
                {p.risikoKeterlambatan}
              </p>

              <div className="mt-1.5 flex items-center gap-1.5 text-[8.5px] font-semibold text-ink-400">
                {p.id} · {p.hariBerjalan} hari berjalan
                {lewat ? (
                  <span className="rounded bg-[#ef4444] px-1.5 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-white">
                    Lewat SLA {p.selisihSla} hari
                  </span>
                ) : (
                  <span className="rounded bg-[#eef2f6] px-1.5 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-ink-500">
                    Sisa {Math.abs(p.selisihSla)} hari
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
