import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { orgRiskHeatmap } from "@/lib/prr-data";
import { SectionHead } from "../hc/SectionHead";

/** Sel jumlah risiko dengan latar sesuai band; nol tetap hijau (tidak ada risiko). */
function CountCell({ value, cls }: { value: number; cls: string }) {
  return (
    <span
      className={`mx-auto flex h-[19px] w-[26px] items-center justify-center rounded-md text-[9px] font-extrabold ${cls}`}
    >
      {value}
    </span>
  );
}

const scoreCls = (score: number) =>
  score >= 70
    ? "bg-[#fdecec] text-[#ef4444]"
    : score >= 40
      ? "bg-[#fdf3e0] text-[#d98b06]"
      : "bg-ptpn-greenLight text-ptpn-green";

/** Risk trajectory: perubahan skor 3 bulan terakhir. Naik = memburuk (merah). */
function Trajectory({ value }: { value: number }) {
  if (value === 0) {
    return <span className="text-center text-[8.5px] font-bold text-ink-400">0</span>;
  }
  const worsening = value > 0;
  return (
    <span
      className={`flex items-center justify-center gap-[2px] ${
        worsening ? "text-[#ef4444]" : "text-[#16a34a]"
      }`}
      title={worsening ? "Skor naik 3 bulan terakhir" : "Skor turun 3 bulan terakhir"}
    >
      <svg
        width={9}
        height={9}
        viewBox="0 0 24 24"
        className={worsening ? "" : "rotate-180"}
        fill="currentColor"
      >
        <path d="M12 5 4 15h16Z" />
      </svg>
      <span className="text-[8.5px] font-bold">{worsening ? `+${value}` : value}</span>
    </span>
  );
}

export function RiskHeatmapOrg() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Heatmap by Organization" />
      <p className="mt-[3px] text-[9px] text-ink-500">Peta Risiko per Sub Holding / Regional</p>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_30px_40px_28px_32px_36px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Organisasi</span>
        <span className="text-center">High</span>
        <span className="text-center">Medium</span>
        <span className="text-center">Low</span>
        <span className="text-center">Skor</span>
        <span className="text-center">Δ 3 Bln</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {orgRiskHeatmap.map((o) => (
          <li
            key={o.name}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_30px_40px_28px_32px_36px] items-center gap-x-1"
          >
            <span className="min-w-0">
              <span className="block truncate text-[9.5px] font-bold leading-tight text-ink-900">
                {o.name}
              </span>
              <span
                className="block truncate text-[7.5px] leading-tight text-ink-500"
                title={`Driver utama: ${o.drivers}`}
              >
                {o.drivers}
              </span>
            </span>
            <CountCell value={o.high} cls="bg-[#fdecec] text-[#ef4444]" />
            <CountCell value={o.medium} cls="bg-[#fdf3e0] text-[#d98b06]" />
            <CountCell value={o.low} cls="bg-ptpn-greenLight text-ptpn-green" />
            <CountCell value={o.score} cls={scoreCls(o.score)} />
            <Trajectory value={o.trajectory} />
          </li>
        ))}
      </ul>

      <Link href="/people-risk-radar/heatmap-organisasi" className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail per Organisasi <ArrowRight size={11} />
      </Link>
    </div>
  );
}
