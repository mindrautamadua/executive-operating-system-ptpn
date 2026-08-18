import { ArrowRight, MoveRight } from "lucide-react";
import { caseCategories, caseSeverities, fraudIntel } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

function TrendArrow({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "flat") return <MoveRight size={11} className="text-ink-400" />;
  const up = trend === "up";
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      className={`${up ? "text-[#ef4444]" : "text-[#16a34a] rotate-180"}`}
      fill="currentColor"
    >
      <path d="M12 5 4 15h16Z" />
    </svg>
  );
}

const MAX_PCT = 40;

export function CaseBreakdown() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Breakdown Kasus Pelanggaran" />
      <p className="mt-[3px] text-[9px] text-ink-500">Komposisi &amp; Severity 24 Kasus Aktif</p>

      <div className="mt-2 grid grid-cols-4 gap-1">
        {caseSeverities.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-md border border-[#eef2f6] bg-[#fbfcfd] py-1"
          >
            <span className="text-[11px] font-extrabold leading-none" style={{ color: s.color }}>
              {s.count}
            </span>
            <span className="mt-[3px] text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Kategori</span>
        <span className="flex items-center gap-3">
          <span>Proporsi</span>
          <span>Trend</span>
        </span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {caseCategories.map((c) => (
          <li key={c.name} className="flex shrink-0 items-center gap-2">
            <span className="w-[108px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700">
              {c.name}
            </span>
            <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={{ width: `${(c.pct / MAX_PCT) * 100}%`, background: c.color }}
              />
            </span>
            <span className="w-[26px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
              {c.pct}%
            </span>
            <span className="flex w-[14px] shrink-0 justify-center">
              <TrendArrow trend={c.trend} />
            </span>
          </li>
        ))}
      </ul>

      <p
        className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[4px] text-[9px] leading-[1.4] text-ink-500"
        title={`Umur rata-rata kasus kritis ${fraudIntel.avgCriticalAgeDays} hari`}
      >
        Fraud: {fraudIntel.activeCases} kasus · potensi {fraudIntel.potentialLoss} · recovered{" "}
        <span className="font-bold text-ptpn-green">
          {fraudIntel.recovered} ({fraudIntel.recoveryRate}%)
        </span>
      </p>

      <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Semua Kasus <ArrowRight size={11} />
      </button>
    </div>
  );
}
