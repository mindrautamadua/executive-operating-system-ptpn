import { ArrowLeftRight } from "lucide-react";
import { intersegmentNotes } from "@/lib/kps-data";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Kartu info transaksi & alokasi antar-segmen (eliminasi konsolidasi). */
export function IntersegmentFlow() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Catatan Antar-Segmen" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Eliminasi, alokasi holding &amp; pendanaan antar-perusahaan
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {intersegmentNotes.map((n) => (
          <div key={n.title} className="flex items-start gap-2.5 rounded-lg bg-[#f7f9fb] px-2.5 py-2">
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#e8f1fd] text-[#2f6fe4]">
              <ArrowLeftRight size={13} strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[9px] font-bold text-ink-900">{n.title}</span>
                <span className="shrink-0 text-[9.5px] font-extrabold tabular-nums text-[#1b3a6b]">
                  {n.value}
                </span>
              </div>
              <p className="mt-[2px] text-[9px] leading-snug text-ink-500">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
