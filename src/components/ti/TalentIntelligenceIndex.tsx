import Link from "next/link";
import { ArrowRight, Gauge } from "lucide-react";
import {
  tiIndexComponents,
  tiIndexNote,
  tiIndexScore,
  type IndexComponent,
} from "@/lib/ti-data";

const BAR_TONE: Record<IndexComponent["tone"], string> = {
  good: "#1a9c5b",
  warn: "#f2c53d",
  bad: "#ef4444",
};

/** Signature metric halaman: komposit 7 komponen kesehatan talenta grup. */
export function TalentIntelligenceIndex() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Talent Intelligence Index</h3>
        <span className="flex items-center gap-1 rounded-full bg-ptpn-greenLight px-2 py-[3px] text-[9px] font-extrabold text-ptpn-green">
          <Gauge size={11} />
          {tiIndexScore} / 100
        </span>
      </div>
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[9px] text-ink-500">
          Komposit 7 komponen — rata-rata sederhana, skala 0–100
        </p>
        <Link
          href="/talent-intelligence/index-talenta"
          className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-ptpn-green hover:underline"
        >
          Lihat Detail <ArrowRight size={10} />
        </Link>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
        {tiIndexComponents.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="w-[118px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700">
              {c.label}
            </span>
            <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.score}%`, background: BAR_TONE[c.tone] }}
              />
            </div>
            <span className="w-5 shrink-0 text-right text-[9px] font-extrabold tabular-nums text-ink-900">
              {c.score}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1.5 rounded-md bg-[#f7f9fb] px-2.5 py-[6px] text-[9px] leading-[1.4] text-ink-500">
        {tiIndexNote}
      </div>
    </div>
  );
}
