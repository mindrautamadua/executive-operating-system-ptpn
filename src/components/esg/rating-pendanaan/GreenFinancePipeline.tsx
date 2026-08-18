import { Leaf } from "lucide-react";
import { greenPipeline } from "@/lib/esg-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Pipeline instrumen pendanaan hijau: green bond, KUR plasma, refinancing SLL. */
export function GreenFinancePipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Green Finance Pipeline" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Instrumen Pendanaan Berkelanjutan dalam Persiapan
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2">
        {greenPipeline.map((g) => (
          <div
            key={g.instrumen}
            className="rounded-xl border border-[#d6ecdf] bg-[#f4faf6] px-3 pb-2.5 pt-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <Leaf size={13} className="shrink-0 text-ptpn-green" />
                <span className="truncate text-[10px] font-bold text-ink-900">{g.instrumen}</span>
              </div>
              <span className="shrink-0 rounded bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-bold text-ptpn-green">
                {g.nilai}
              </span>
            </div>
            <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{g.status}</p>
            <div className="mt-1.5 text-[8.5px] font-semibold text-ink-400">
              Timeline: {g.timeline}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
