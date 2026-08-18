import { Gavel, ShieldAlert, Timer } from "lucide-react";
import { sanksiSummary } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ITEMS = [
  {
    icon: ShieldAlert,
    label: "Sanksi Disiplin",
    value: sanksiSummary.disiplin,
    caption: "SP-1 hingga PHK",
    cls: "bg-[#fdf3e0] text-[#d98b06]",
  },
  {
    icon: Gavel,
    label: "Diserahkan ke APH",
    value: sanksiSummary.aph,
    caption: "Proses pidana berjalan",
    cls: "bg-[#fdecec] text-[#ef4444]",
  },
  {
    icon: Timer,
    label: "Menunggu Penetapan",
    value: sanksiSummary.prosesSanksi,
    caption: "Terbukti, sanksi belum final",
    cls: "bg-[#e8f1fd] text-[#2f6fe4]",
  },
];

export function SanksiSummary() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Penegakan Sanksi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tindak Lanjut 18 Kasus Terbukti (Substantiated) YTD
      </p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-3 content-center gap-2">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2"
            >
              <span
                className={`flex h-[24px] w-[24px] items-center justify-center rounded-lg ${it.cls}`}
              >
                <Icon size={13} strokeWidth={1.9} />
              </span>
              <span className="mt-2 text-[20px] font-extrabold leading-none text-ink-900">
                {it.value}
              </span>
              <span className="mt-1 text-[8.5px] font-bold text-ink-700">{it.label}</span>
              <span className="mt-[2px] text-[9px] leading-[1.35] text-ink-500">{it.caption}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {sanksiSummary.note}
      </p>
    </div>
  );
}
