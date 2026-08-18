import type { ComplianceStatus } from "@/lib/rc-data";

const STYLES: Record<ComplianceStatus, string> = {
  Patuh: "bg-ptpn-greenLight text-ptpn-green",
  Parsial: "bg-[#fdf3e0] text-[#d98b06]",
  Kritis: "bg-[#fdecec] text-[#ef4444]",
};

/** Badge status kepatuhan (Patuh / Parsial / Kritis), dipakai lintas kartu RC. */
export function StatusBadge({ status }: { status: ComplianceStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
