import {
  ArrowRight,
  BriefcaseBusiness,
  Factory,
  Fingerprint,
  HardHat,
  Leaf,
  Lock,
  Receipt,
  Scale,
} from "lucide-react";
import { complianceAreas, type ComplianceArea } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";
import { StatusBadge } from "./StatusBadge";

const ICONS: Record<ComplianceArea["icon"], { Icon: typeof Scale; cls: string }> = {
  labor: { Icon: BriefcaseBusiness, cls: "bg-ptpn-greenLight text-ptpn-green" },
  safety: { Icon: HardHat, cls: "bg-[#fdf3e0] text-[#d98b06]" },
  privacy: { Icon: Lock, cls: "bg-[#fdecec] text-[#ef4444]" },
  ethics: { Icon: Scale, cls: "bg-ptpn-greenLight text-ptpn-green" },
  fraud: { Icon: Fingerprint, cls: "bg-[#fdf3e0] text-[#d98b06]" },
  environment: { Icon: Leaf, cls: "bg-ptpn-greenLight text-ptpn-green" },
  tax: { Icon: Receipt, cls: "bg-ptpn-greenLight text-ptpn-green" },
  industry: { Icon: Factory, cls: "bg-ptpn-greenLight text-ptpn-green" },
};

function TrendArrow({ area }: { area: ComplianceArea }) {
  if (area.trend === "flat") {
    return <ArrowRight size={11} className="text-ink-400" />;
  }
  const good = area.trendTone === "good";
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      className={`${good ? "text-[#16a34a]" : "text-[#ef4444]"} ${
        area.trend === "down" ? "rotate-180" : ""
      }`}
      fill="currentColor"
    >
      <path d="M12 5 4 15h16Z" />
    </svg>
  );
}

/** Gap terhadap tolerance: negatif = outside tolerance. */
function GapChip({ score, tolerance }: { score: number; tolerance: number }) {
  const gap = score - tolerance;
  const cls =
    gap < 0
      ? "bg-[#fdecec] text-[#ef4444]"
      : gap <= 4
        ? "bg-[#fdf3e0] text-[#d98b06]"
        : "bg-ptpn-greenLight text-ptpn-green";
  return (
    <span
      className={`mx-auto flex h-[17px] w-[30px] items-center justify-center rounded text-[9px] font-extrabold ${cls}`}
      title={`Minimum acceptable ${tolerance} · gap ${gap > 0 ? "+" : ""}${gap} pts${gap < 0 ? " — outside tolerance" : ""}`}
    >
      {gap > 0 ? "+" : ""}
      {gap}
    </span>
  );
}

export function ComplianceSummary() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Ringkasan Kepatuhan" />

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_44px_30px_34px_30px_40px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Area Kepatuhan</span>
        <span className="text-center">Status</span>
        <span className="text-center">Skor</span>
        <span className="text-center" title="Gap terhadap minimum acceptable score (tolerance)">
          Gap
        </span>
        <span className="text-center">Trend</span>
        <span className="text-right">Temuan</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {complianceAreas.map((a) => {
          const { Icon, cls } = ICONS[a.icon];
          return (
            <li
              key={a.name}
              className="grid shrink-0 grid-cols-[minmax(0,1fr)_44px_30px_34px_30px_40px] items-center gap-x-1"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md ${cls}`}
                >
                  <Icon size={10.5} strokeWidth={2} />
                </span>
                <span className="truncate text-[9px] font-bold text-ink-900">{a.name}</span>
              </span>
              <span className="text-center">
                <StatusBadge status={a.status} />
              </span>
              <span className="text-center text-[9.5px] font-extrabold text-ink-900">
                {a.score}
              </span>
              <GapChip score={a.score} tolerance={a.tolerance} />
              <span className="flex justify-center">
                <TrendArrow area={a} />
              </span>
              <span className="text-right text-[9px] font-semibold text-ink-700">
                {a.openFindings}
              </span>
            </li>
          );
        })}
      </ul>

      <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Semua Area <ArrowRight size={11} />
      </button>
    </div>
  );
}
