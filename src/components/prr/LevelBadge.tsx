import type { RiskLevel } from "@/lib/prr-data";

const STYLES: Record<RiskLevel, string> = {
  High: "bg-[#fdecec] text-[#ef4444]",
  Medium: "bg-[#fdf3e0] text-[#d98b06]",
  Low: "bg-ptpn-greenLight text-ptpn-green",
};

/** Badge level risiko (High / Medium / Low), dipakai lintas kartu PRR. */
export function LevelBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${STYLES[level]}`}
    >
      {level}
    </span>
  );
}
