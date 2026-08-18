import { ArrowRight } from "lucide-react";
import { orgComplianceHeatmap } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

/** Sel angka dengan latar sesuai band; makin merah = makin perlu perhatian. */
function CountCell({ value, cls }: { value: number | string; cls: string }) {
  return (
    <span
      className={`mx-auto flex h-[19px] w-[30px] items-center justify-center rounded-md text-[9px] font-extrabold ${cls}`}
    >
      {value}
    </span>
  );
}

const scoreCls = (score: number) =>
  score >= 85
    ? "bg-ptpn-greenLight text-ptpn-green"
    : score >= 70
      ? "bg-[#fdf3e0] text-[#d98b06]"
      : "bg-[#fdecec] text-[#ef4444]";

const findingsCls = (n: number) =>
  n >= 4 ? "bg-[#fdecec] text-[#ef4444]" : n >= 2 ? "bg-[#fdf3e0] text-[#d98b06]" : "bg-ptpn-greenLight text-ptpn-green";

const casesCls = (n: number) =>
  n >= 5 ? "bg-[#fdecec] text-[#ef4444]" : n >= 3 ? "bg-[#fdf3e0] text-[#d98b06]" : "bg-ptpn-greenLight text-ptpn-green";

const trainingCls = (pct: number) =>
  pct >= 85 ? "bg-ptpn-greenLight text-ptpn-green" : pct >= 80 ? "bg-[#fdf3e0] text-[#d98b06]" : "bg-[#fdecec] text-[#ef4444]";

const PRIORITY_DOT: Record<string, string> = {
  Tinggi: "#ef4444",
  Sedang: "#f5a524",
  Rendah: "#1a9c5b",
};

function TrendArrow({ trend, tone }: { trend: "up" | "down" | "flat"; tone: string }) {
  if (trend === "flat") {
    return (
      <svg width={9} height={9} viewBox="0 0 24 24" className="text-ink-400" fill="currentColor">
        <path d="M4 11h16v2H4Z" />
      </svg>
    );
  }
  const good = tone === "good";
  return (
    <svg
      width={9}
      height={9}
      viewBox="0 0 24 24"
      className={`${good ? "text-[#16a34a]" : "text-[#ef4444]"} ${trend === "down" ? "rotate-180" : ""}`}
      fill="currentColor"
    >
      <path d="M12 5 4 15h16Z" />
    </svg>
  );
}

export function ComplianceHeatmapOrg() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Compliance Exposure Map" />
      <p className="mt-[3px] text-[9px] text-ink-500">Skor + Eksposur Finansial per Sub Holding</p>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_30px_30px_38px_30px_40px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Organisasi</span>
        <span className="text-center">Tmn</span>
        <span className="text-center">Kss</span>
        <span className="text-center">Trng</span>
        <span className="text-center">Skor</span>
        <span className="text-right">Rp M</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {orgComplianceHeatmap.map((o) => (
          <li
            key={o.name}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_30px_30px_38px_30px_40px] items-center gap-x-1"
            title={`${o.name}: eksposur Rp ${o.exposure} M · prioritas ${o.priority}`}
          >
            <span className="flex min-w-0 items-center gap-1">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ background: PRIORITY_DOT[o.priority] }}
              />
              <span className="truncate text-[9.5px] font-bold text-ink-900">{o.name}</span>
              <TrendArrow trend={o.trend} tone={o.trendTone} />
            </span>
            <CountCell value={o.findings} cls={findingsCls(o.findings)} />
            <CountCell value={o.cases} cls={casesCls(o.cases)} />
            <CountCell value={`${o.training}%`} cls={trainingCls(o.training)} />
            <CountCell value={o.score} cls={scoreCls(o.score)} />
            <span className="text-right text-[9.5px] font-extrabold text-[#ef4444]">
              {o.exposure}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[4px] text-[9px] leading-[1.4] text-ink-500">
        ● prioritas · total eksposur Rp 12,4 M — PTPN IV &amp; V menyumbang 60%.
      </p>

      <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail per Organisasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
