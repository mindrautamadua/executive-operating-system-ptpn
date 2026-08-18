import { Flag } from "lucide-react";
import { repeatFindings } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

export function RepeatFindings() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Temuan Berulang" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {repeatFindings.length} Temuan Muncul Kembali — Indikasi Akar Masalah Belum Tuntas
      </p>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {repeatFindings.map((r) => (
          <li
            key={r.temuan}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[6px]"
          >
            <Flag
              size={11}
              strokeWidth={2.2}
              className={`shrink-0 ${r.kali >= 3 ? "text-[#ef4444]" : "text-[#f5a524]"}`}
            />
            <span className="min-w-0 flex-1 leading-[1.3]">
              <span className="block truncate text-[9px] font-bold text-ink-900">{r.temuan}</span>
              <span className="block truncate text-[9px] text-ink-500">
                {r.unit} · Sumber {r.sumber}
              </span>
            </span>
            <ToneBadge label={`${r.kali}×`} tone={r.kali >= 3 ? "bad" : "warn"} />
          </li>
        ))}
      </ul>
    </div>
  );
}
