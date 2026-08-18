import Link from "next/link";
import { ArrowUpRight, Eye, ScanSearch } from "lucide-react";
import { dekIntelligence } from "@/lib/dek-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SIGNAL_TONE = {
  red: {
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    dot: "bg-[#ef4444]",
    accent: "text-[#ef4444]",
  },
  amber: {
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    dot: "bg-[#f5a524]",
    accent: "text-[#d98b06]",
  },
  blue: {
    wrap: "border-[#d3e3f6] bg-[#f1f7fd]",
    dot: "bg-[#2f6fe4]",
    accent: "text-[#2f6fe4]",
  },
} as const;

/** Lapisan sintesis pengawasan: 3 narasi bernada pemantauan, bukan eksekusi. */
export function DekIntelligence() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "30ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <ScanSearch size={13} className="text-ptpn-green" />
          Oversight Intelligence
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
          <ScopeNote />
        </h3>
        <div className="flex items-center gap-3">
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-[#ef4444]">2</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Perlu Eskalasi</span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-[#d98b06]">1</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Dipantau</span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[11px] font-extrabold leading-none text-ptpn-green">68</span>
            <span className="text-[8.5px] font-semibold text-ink-500">Rekomendasi YTD</span>
          </span>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {dekIntelligence.map((s, i) => {
          const t = SIGNAL_TONE[s.tone];
          return (
            <div key={s.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="text-[9px] font-bold text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[10px] font-bold text-ink-900" title={s.title}>
                  {s.title}
                </span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{s.narasi}</p>
              <p className="mt-1.5 flex items-start gap-1 text-[8.5px] leading-[1.45] text-ink-700">
                <Eye size={9} className={`mt-[2px] shrink-0 ${t.accent}`} />
                <span>
                  <span className={`font-bold ${t.accent}`}>Tindak Pengawasan:</span>{" "}
                  {s.tindakPengawasan}
                </span>
              </p>
              {s.href && (
                <Link
                  href={s.href}
                  className="mt-1.5 inline-flex items-center gap-1 text-[8.5px] font-semibold text-ptpn-green hover:underline"
                >
                  Buka sumber data <ArrowUpRight size={10} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <ScanSearch size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Fokus Pengawasan Triwulan Ini: </span>
          Dua simpul memerlukan penegasan Dewan Komisaris — 9 rekomendasi overdue dengan konsentrasi
          di Direktorat Operasi, dan empat permohonan persetujuan yang dua di antaranya telah
          melewati SLA tanggapan 14 hari di sisi Dekom sendiri.
        </p>
      </div>
    </div>
  );
}
