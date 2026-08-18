import { ArrowRight } from "lucide-react";
import { integrationLandscape } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<string, BadgeTone> = {
  Sehat: "good",
  "Perlu Perhatian": "warn",
  Kritis: "bad",
};

const METODE_TONE: Record<string, BadgeTone> = {
  "Real-time API": "good",
  "Batch Harian": "info",
  "Batch Mingguan": "warn",
  "Manual/Unggah": "bad",
};

const persen = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const totalInterface = integrationLandscape.reduce((s, r) => s + r.interfaceAktif, 0);
const realtime = integrationLandscape
  .filter((r) => r.metode === "Real-time API")
  .reduce((s, r) => s + r.interfaceAktif, 0);

export function IntegrationLandscape() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Lanskap Integrasi Data" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sistem Sumber → Platform Data · {totalInterface} Interface Aktif ({realtime} Real-time API)
      </p>

      <div className="mt-2 flex min-h-0 flex-1 items-stretch gap-2">
        <div className="scroll-thin flex min-h-0 min-w-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {integrationLandscape.map((r) => (
            <div key={r.sistemSumber} className="rounded-lg border border-[#eef2f6] px-2 py-[5px]">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[9px] font-bold text-ink-900">{r.sistemSumber}</span>
                <ToneBadge label={r.metode} tone={METODE_TONE[r.metode]} />
              </div>
              <div className="mt-[3px] flex items-center justify-between gap-2">
                <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                  {r.interfaceAktif} interface · kualitas {persen(r.kualitasPct)}%
                </span>
                <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center text-ink-400">
          <ArrowRight size={14} strokeWidth={2} />
        </div>

        <div className="flex w-[130px] shrink-0 flex-col justify-center rounded-xl border border-[#eef2f6] bg-[#eef2f6] px-2.5 py-2">
          <div className="text-[9.5px] font-extrabold leading-snug text-ink-900">
            Data Platform &amp; BI Eksekutif
          </div>
          <p className="mt-[3px] text-[9px] leading-snug text-ink-500">
            Single source of truth grup · cakupan data kritikal 78% · go-live Q1 2027.
          </p>
          <div className="mt-2 flex flex-col gap-[3px]">
            <span className="text-[9px] font-semibold text-ink-500">
              12 domain data terkelola
            </span>
            <span className="text-[9px] font-semibold text-ink-500">34 data steward</span>
            <span className="text-[9px] font-semibold text-[#ef4444]">
              17 interface masih manual
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
