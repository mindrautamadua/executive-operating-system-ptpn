import { MapPinned } from "lucide-react";
import { hguPortfolio } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const CARDS = [
  {
    label: "Sertifikat HGU",
    value: String(hguPortfolio.sertifikat),
    sub: "Portofolio aktif grup",
    cls: "border-[#d3e2f8] bg-[#f5f8fd]",
    valueCls: "text-[#2f6fe4]",
  },
  {
    label: "Perpanjangan Proses",
    value: String(hguPortfolio.perpanjanganProses),
    sub: "Task force berjalan",
    cls: "border-[#f3e3c3] bg-[#fdf9f0]",
    valueCls: "text-[#d98b06]",
  },
  {
    label: "Sengketa Administratif",
    value: String(hguPortfolio.sengketaAdministratif),
    sub: "Keberatan tata batas & tumpang tindih izin",
    cls: "border-[#f6d5d5] bg-[#fdf5f5]",
    valueCls: "text-[#ef4444]",
  },
];

/** Portofolio HGU: sertifikat, perpanjangan berjalan, dan sengketa administratif. */
export function HguPortfolio() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio HGU" action="Lihat Aset" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Status Legalitas Lahan &amp; Jatuh Tempo Hak Guna Usaha
      </p>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
        {CARDS.map((c) => (
          <div key={c.label} className={`rounded-xl border px-2.5 py-2 ${c.cls}`}>
            <div className={`text-[18px] font-extrabold leading-none ${c.valueCls}`}>{c.value}</div>
            <div className="mt-1 text-[8.5px] font-bold text-ink-900">{c.label}</div>
            <div className="mt-[2px] text-[7.5px] leading-snug text-ink-500">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5">
        <span className="text-[8.5px] font-semibold text-ink-500">
          HGU jatuh tempo ≤ 5 tahun
        </span>
        <span className="text-[10px] font-extrabold text-ink-900">
          {hguPortfolio.habisLima5ThnRbHa} rb ha
        </span>
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-xl border border-[#f3e3c3] bg-[#fdf9f0] px-2.5 py-2">
        <MapPinned size={12} className="mt-[1px] shrink-0 text-[#d98b06]" />
        <p className="text-[8.5px] leading-snug text-ink-700">{hguPortfolio.note}</p>
      </div>
    </div>
  );
}
