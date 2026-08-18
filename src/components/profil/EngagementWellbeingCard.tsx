import { HeartPulse, Lock } from "lucide-react";
import { engagementWellbeing } from "@/lib/profil-data";

const TONE: Record<string, string> = {
  green: "bg-ptpn-greenLight text-ptpn-greenDark",
  amber: "bg-[#fdf3e0] text-[#c07c05]",
  red: "bg-[#fdecec] text-[#dc2626]",
};

/**
 * Engagement & wellbeing sebagai level agregat — bukti untuk Flight Risk,
 * tanpa membuka jawaban survey individual.
 */
export function EngagementWellbeingCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <HeartPulse size={13} className="text-[#e35d6a]" />
        Engagement &amp; Wellbeing
      </h3>

      <div className="mt-2.5 min-h-0 flex-1 space-y-2">
        {engagementWellbeing.indikator.map((it) => (
          <div key={it.label} className="flex items-center justify-between gap-3">
            <span className="shrink-0 text-[9px] text-ink-500">{it.label}</span>
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[9px] font-semibold text-ink-700">{it.value}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-[2px] text-[9px] font-extrabold ${TONE[it.tone]}`}
              >
                {it.level}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-ink-500">Sumber: {engagementWellbeing.sumber}</p>
      <p className="mt-1 flex items-start gap-1.5 rounded-lg bg-[#f5f8fa] px-2.5 py-[6px] text-[9px] leading-snug text-ink-500">
        <Lock size={10} className="mt-[1px] shrink-0" />
        {engagementWellbeing.privasi}
      </p>
    </div>
  );
}
