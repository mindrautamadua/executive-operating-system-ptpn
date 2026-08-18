import { salesVsTarget } from "@/lib/pemasaran-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { CountUp } from "@/components/ui/CountUp";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Skala gauge 0–120% RKAP. */
const SCALE_MAX = 120;
const CX = 75;
const CY = 75;
const R = 60;

/** Titik pada busur setengah lingkaran; a = 0° (kiri) … 180° (kanan). */
const pt = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180;
  return { x: CX - r * Math.cos(rad), y: CY - r * Math.sin(rad) };
};

const arcPath = (fromA: number, toA: number, r: number) => {
  const p1 = pt(fromA, r);
  const p2 = pt(toA, r);
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
};

const fmtPct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/** Gauge capaian penjualan YTD vs RKAP + outlook FY. */
export function SalesVsTargetGauge() {
  const sweep = (Math.min(salesVsTarget.ytdPct, SCALE_MAX) / SCALE_MAX) * 180;
  const markerA = (100 / SCALE_MAX) * 180;
  const m1 = pt(markerA, R - 8);
  const m2 = pt(markerA, R + 8);
  const onTarget = salesVsTarget.ytdPct >= 100;

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      {/* Capaian vs RKAP hanya tersedia pada level konsolidasi grup. */}
      <SectionHead title="Sales vs Target RKAP" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Capaian Nilai Penjualan YTD vs RKAP</p>

      <div className="relative mx-auto mt-2 w-[190px]">
        <svg viewBox="0 0 150 84" className="w-full">
          <path
            d={arcPath(0, 180, R)}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={arcPath(0, sweep, R)}
            fill="none"
            stroke={onTarget ? PALETTE.green : PALETTE.amber}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* penanda 100% RKAP */}
          <line
            x1={m1.x}
            y1={m1.y}
            x2={m2.x}
            y2={m2.y}
            stroke="var(--chart-axis)"
            strokeWidth="1.6"
            strokeDasharray="2 2"
          />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-[21px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            <CountUp value={fmtPct(salesVsTarget.ytdPct)} />
          </span>
          <span className="mt-[3px] text-[8.5px] font-medium text-ink-400">dari RKAP YTD</span>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between px-2 text-[9px] font-semibold text-ink-500">
        <span>0%</span>
        <span>100% RKAP</span>
        <span>120%</span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[#f5f8fa] px-2.5 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.05em] text-ink-500">
            Realisasi YTD
          </div>
          <div className="mt-[3px] text-[12px] font-extrabold text-ink-900">
            {salesVsTarget.ytdNilai}
          </div>
          <div className="mt-[2px] text-[8.5px] text-ink-500">RKAP YTD {salesVsTarget.rkapYtd}</div>
        </div>
        <div className="rounded-lg bg-[#f5f8fa] px-2.5 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.05em] text-ink-500">
            Outlook FY 2026
          </div>
          <div className="mt-[3px] text-[12px] font-extrabold text-ink-900">
            {salesVsTarget.fyOutlookNilai}{" "}
            <span className="text-[9px] font-bold text-ptpn-green">
              ({fmtPct(salesVsTarget.fyOutlookPct)})
            </span>
          </div>
          <div className="mt-[2px] text-[8.5px] text-ink-500">RKAP FY {salesVsTarget.rkapFy}</div>
        </div>
      </div>

      <p className="mt-2 rounded-lg bg-ptpn-greenLight px-2.5 py-2 text-[8.5px] leading-[1.45] text-ink-700">
        {salesVsTarget.catatan}
      </p>
    </div>
  );
}
