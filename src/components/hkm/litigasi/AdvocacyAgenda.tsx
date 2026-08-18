import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { advocacyAgenda, type HkmAdvocacyRow } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<HkmAdvocacyRow["status"], BadgeTone> = {
  Aktif: "info",
  "Menunggu Respons": "warn",
  Selesai: "good",
};

const RAIL: Record<HkmAdvocacyRow["tone"], string> = {
  red: "border-l-[#ef4444]",
  amber: "border-l-[#f5a524]",
  green: "border-l-[#1a9c5b]",
};

const aktif = advocacyAgenda.filter((a) => a.status === "Aktif").length;

/** Agenda advokasi kebijakan (EUDR, DMO, pertanahan) beserta dampak & kanalnya. */
export function AdvocacyAgenda() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Agenda Advokasi Kebijakan" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {advocacyAgenda.length} Isu Regulasi Prioritas · {aktif} Advokasi Aktif
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        {advocacyAgenda.map((a) => (
          <div
            key={a.isu}
            className={`mb-1.5 rounded-r-lg border-l-[3px] bg-[#f8fafc] px-2.5 py-[7px] last:mb-0 ${RAIL[a.tone]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[9.5px] font-bold text-ink-900" title={a.isu}>
                  {a.isu}
                </div>
                <div className="mt-[2px] text-[9px] text-ink-500">{a.regulasi}</div>
              </div>
              <ToneBadge label={a.status} tone={STATUS_TONE[a.status]} />
            </div>

            <p className="mt-[4px] text-[8.5px] leading-snug text-ink-500">{a.posisiPerusahaan}</p>

            <div className="mt-[4px] flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9px] font-semibold text-ink-700">
                Dampak: {a.dampak}
              </span>
              {a.href && a.hrefLabel && (
                <Link
                  href={a.href}
                  className="inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold text-ptpn-green hover:underline"
                >
                  {a.hrefLabel} <ArrowRight size={9} />
                </Link>
              )}
            </div>
            <div className="mt-[2px] truncate text-[9px] text-ink-500">Kanal: {a.kanal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
