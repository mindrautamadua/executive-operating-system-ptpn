export type BadgeTone = "good" | "warn" | "bad" | "neutral" | "info";

const STYLES: Record<BadgeTone, string> = {
  good: "bg-ptpn-greenLight text-ptpn-green",
  warn: "bg-[#fdf3e0] text-[#d98b06]",
  bad: "bg-[#fdecec] text-[#ef4444]",
  neutral: "bg-[#eef2f6] text-ink-500",
  info: "bg-[#e8f1fd] text-[#3b7ded]",
};

/**
 * Badge status generik dimensi non-SDM (generalisasi LevelBadge prr/ dan
 * StatusBadge rc/): label bebas, warna lewat tone.
 */
export function ToneBadge({ label, tone }: { label: string; tone: BadgeTone }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${STYLES[tone]}`}
    >
      {label}
    </span>
  );
}
