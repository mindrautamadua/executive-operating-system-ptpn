import Link from "next/link";
import { ArrowUpRight, CircleAlert, Info, TriangleAlert } from "lucide-react";
import { committeeFindings, type DekCommitteeFinding } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE: Record<
  DekCommitteeFinding["tone"],
  { icon: typeof CircleAlert; iconCls: string; wrap: string; pill: string }
> = {
  red: {
    icon: CircleAlert,
    iconCls: "text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    pill: "bg-[#fdecec] text-[#ef4444]",
  },
  amber: {
    icon: TriangleAlert,
    iconCls: "text-[#f5a524]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
  },
  blue: {
    icon: Info,
    iconCls: "text-[#3b7ded]",
    wrap: "border-[#d9e6fb] bg-[#f6f9fe]",
    pill: "bg-[#e8f1fd] text-[#2f6fe4]",
  },
};

/** Temuan & permintaan penjelasan utama tiap komite kepada Direksi. */
export function CommitteeFindings() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Temuan & Permintaan Komite" action="Lihat Kertas Kerja" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Enam Butir Pemantauan Utama YTD · Tertaut ke Dimensi Sumber Datanya
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {committeeFindings.map((f) => {
          const t = TONE[f.tone];
          const Icon = t.icon;
          return (
            <div key={f.judul} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-1.5">
                  <Icon size={13} className={`mt-[1px] shrink-0 ${t.iconCls}`} />
                  <span className="min-w-0 text-[10px] font-bold leading-snug text-ink-900">
                    {f.judul}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}
                >
                  {f.komite.replace("Komite ", "")}
                </span>
              </div>

              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{f.uraian}</p>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-700">
                <span className="font-bold">Permintaan komite:</span> {f.permintaan}
              </p>

              <Link
                href={f.href}
                className="mt-1.5 inline-flex items-center gap-1 text-[8.5px] font-bold text-ptpn-green hover:underline"
              >
                {f.hrefLabel}
                <ArrowUpRight size={10} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
