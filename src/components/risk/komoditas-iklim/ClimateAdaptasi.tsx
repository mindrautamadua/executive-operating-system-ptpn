import { Sprout } from "lucide-react";
import { climateAdaptation, type ClimateAdaptationRow } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<ClimateAdaptationRow["status"], BadgeTone> = {
  Berjalan: "good",
  Pilot: "info",
  Perencanaan: "neutral",
};

/** Program adaptasi iklim: cakupan, status pelaksanaan, dan investasi. */
export function ClimateAdaptasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Program Adaptasi Iklim" action="Lihat Program" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Mitigasi Struktural Defisit Air &amp; Transfer Risiko Iklim
      </p>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
        {climateAdaptation.map((p) => (
          <li
            key={p.program}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <Sprout size={12} className="shrink-0 text-ptpn-green" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[9.5px] font-bold text-ink-900">{p.program}</span>
                <ToneBadge label={p.status} tone={STATUS_TONE[p.status]} />
              </span>
              <span className="block truncate text-[9px] text-ink-500">{p.cakupan}</span>
            </span>
            <span className="shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
              {p.investasi}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
