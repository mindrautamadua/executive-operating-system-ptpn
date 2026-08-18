import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  landConflictCompact,
  landConflictNote,
  landConflictSummary,
} from "@/lib/esg-data-detail";
import type { LandConflictRow } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<LandConflictRow["status"], BadgeTone> = {
  "Mediasi aktif": "warn",
  "Proses hukum": "bad",
  "Kesepakatan tercapai": "good",
};

/** Ringkas konflik lahan komunitas; detail penuh di dimensi Risiko & Kepatuhan. */
export function LandConflictCompact() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Konflik Lahan Komunitas
        </h3>
        <Link
          href="/risiko-kepatuhan/legal-portfolio"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Portofolio Legal <ArrowRight size={11} />
        </Link>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        {landConflictSummary.titik} titik ·{" "}
        {landConflictSummary.luasRbHa.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb ha ·{" "}
        {landConflictSummary.mediasiAktif} mediasi aktif · {landConflictSummary.selesaiYtd} selesai
        YTD
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        {landConflictCompact.map((c) => (
          <div
            key={c.lokasi}
            className="flex items-center justify-between gap-2 border-b border-[#f5f8fa] py-[6px] last:border-0"
          >
            <div className="min-w-0">
              <div className="truncate text-[9.5px] font-semibold text-ink-900">{c.lokasi}</div>
              <div className="text-[8.5px] tabular-nums text-ink-500">
                {c.luasHa.toLocaleString("id-ID")} ha
              </div>
            </div>
            <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        {landConflictNote}
      </p>
    </div>
  );
}
