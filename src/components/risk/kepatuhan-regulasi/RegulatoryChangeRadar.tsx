import Link from "next/link";
import { ArrowUpRight, Radar } from "lucide-react";
import { regChangeRadar, type RegChangePipeline } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<RegChangePipeline["status"], BadgeTone> = {
  "RUU/RPP": "neutral",
  Harmonisasi: "info",
  "Berlaku Bertahap": "warn",
};

const barCls = (pct: number) =>
  pct >= 75 ? "bg-ptpn-green" : pct >= 60 ? "bg-[#f5a524]" : "bg-[#ef4444]";

/** Regulasi baru dalam pipeline beserta tingkat kesiapan grup. */
export function RegulatoryChangeRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Regulatory Change Radar" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Regulasi Baru &amp; Perubahan Aturan — Dampak dan Kesiapan Grup
      </p>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
        {regChangeRadar.map((r) => {
          const body = (
            <>
              <div className="flex items-center gap-1.5">
                <Radar size={11} className="shrink-0 text-[#2f6fe4]" />
                <span className="min-w-0 flex-1 truncate text-[9.5px] font-extrabold text-ink-900">
                  {r.name}
                </span>
                {r.href && <ArrowUpRight size={10} className="shrink-0 text-ink-400" />}
                <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
              </div>
              <p className="mt-1 text-[8.5px] leading-snug text-ink-500">{r.impact}</p>
              <div className="mt-1 grid grid-cols-[64px_minmax(0,1fr)_28px] items-center gap-1.5">
                <span className="text-[9px] font-semibold text-ink-500">Kesiapan</span>
                <span className="h-[6px] overflow-hidden rounded-full bg-[#eef2f6]">
                  <span
                    className={`block h-full rounded-full ${barCls(r.readiness)}`}
                    style={{ width: `${r.readiness}%` }}
                  />
                </span>
                <span className="text-right text-[8.5px] font-extrabold text-ink-900">
                  {r.readiness}%
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[9px] text-ink-700">{r.action}</span>
                <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                  Efektif {r.effective}
                </span>
              </div>
            </>
          );
          return (
            <li
              key={r.name}
              className="shrink-0 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
            >
              {r.href ? (
                <Link href={r.href} className="block">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
