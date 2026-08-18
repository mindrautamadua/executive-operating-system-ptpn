import { covenants } from "@/lib/knl-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<string, BadgeTone> = {
  Aman: "good",
  Waspada: "warn",
  Breach: "bad",
};

/** Monitor 5 covenant utama: ambang, aktual, headroom, status. */
export function CovenantMonitor() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Covenant Monitor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Covenant Kredit Utama · seluruhnya berstatus Aman
      </p>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Covenant</th>
              <th className="pb-[6px] text-right font-semibold">Ambang</th>
              <th className="pb-[6px] text-right font-semibold">Aktual</th>
              <th className="pb-[6px] text-right font-semibold">Headroom</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {covenants.map((c) => (
              <tr
                key={c.name}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[7px] text-[9.5px] font-semibold text-ink-900">
                  {c.name}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {c.threshold}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                  {c.actual}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {c.headroom}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
