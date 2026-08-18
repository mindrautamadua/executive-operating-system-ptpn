import { controlEffectiveness } from "@/lib/pgd-data-detail";
import type { PgdStatus } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<PgdStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

const BAR_COLOR: Record<PgdStatus, string> = {
  "On Track": "bg-ptpn-green",
  "At Risk": "bg-[#f5a524]",
  "Off Track": "bg-[#ef4444]",
};

const TOTAL_TEMUAN = controlEffectiveness.reduce((s, r) => s + r.temuan, 0);

/** Efektivitas empat kontrol kunci pengadaan. */
export function ControlEffectiveness() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Efektivitas Kontrol Pengadaan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        4 Kontrol Kunci · {TOTAL_TEMUAN} Temuan Audit Kategori Pengadaan YTD
      </p>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {controlEffectiveness.map((c) => (
          <li
            key={c.kontrol}
            className="shrink-0 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[6px]"
          >
            <div className="flex items-center gap-1.5">
              <span className="min-w-0 flex-1 truncate text-[9px] font-bold text-ink-900">
                {c.kontrol}
              </span>
              <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
            </div>

            <div className="mt-[4px] flex items-center gap-2">
              <span className="w-[52px] shrink-0 text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
                Efektivitas
              </span>
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`anim-grow-x block h-full rounded-full ${BAR_COLOR[c.status]}`}
                  style={{ width: `${c.efektivitas}%` }}
                />
              </span>
              <span className="w-[46px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
                {c.efektivitas}/100
              </span>
            </div>

            <div className="mt-[3px] flex items-center gap-2 text-[9px] text-ink-500">
              <span>
                Cakupan{" "}
                <span className="font-bold text-ink-700">
                  {c.cakupanPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
                </span>
              </span>
              <span>
                Temuan <span className="font-bold text-[#ef4444]">{c.temuan}</span>
              </span>
              <span className="min-w-0 flex-1 truncate" title={c.catatan}>
                {c.catatan}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
