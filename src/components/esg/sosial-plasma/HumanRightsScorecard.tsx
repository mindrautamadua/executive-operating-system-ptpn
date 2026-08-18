import { humanRights } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<string, BadgeTone> = {
  Terpenuhi: "good",
  "Dalam penguatan": "warn",
};

const HIGHLIGHTS = [
  { label: "Pekerja Anak", value: "0", sub: "kasus terverifikasi" },
  { label: "Kerja Paksa", value: "0", sub: "kasus terverifikasi" },
  { label: "Cakupan HRDD", value: "84,6%", sub: "unit terasesmen" },
];

/** Scorecard HAM: sorotan tiga indikator utama + status seluruh indikator. */
export function HumanRightsScorecard() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Human Rights Scorecard" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Indikator HAM Material bagi NDPE &amp; Rating ESG
      </p>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="rounded-lg bg-[#f8fafc] px-2.5 py-[7px]">
            <div className="text-[15px] font-extrabold leading-none text-ink-900">{h.value}</div>
            <div className="mt-[4px] truncate text-[8.5px] font-bold text-ink-700">{h.label}</div>
            <div className="truncate text-[9px] text-ink-500">{h.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        {humanRights.map((h) => (
          <div
            key={h.indikator}
            className="flex items-center justify-between gap-2 border-b border-[#f5f8fa] py-[6px] last:border-0"
          >
            <div className="min-w-0">
              <div className="truncate text-[9.5px] font-semibold text-ink-900">{h.indikator}</div>
              <div className="truncate text-[8.5px] text-ink-500">{h.nilai}</div>
            </div>
            <ToneBadge label={h.status} tone={STATUS_TONE[h.status]} />
          </div>
        ))}
      </div>
    </div>
  );
}
