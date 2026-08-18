import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { levelOfScore, riskControls } from "@/lib/prr-data";
import { SectionHead } from "../hc/SectionHead";

const scoreCls = (score: number) => {
  const level = levelOfScore(score);
  return level === "High"
    ? "bg-[#fdecec] text-[#ef4444]"
    : level === "Medium"
      ? "bg-[#fdf3e0] text-[#d98b06]"
      : "bg-ptpn-greenLight text-ptpn-green";
};

const effColor = (pct: number) =>
  pct >= 60 ? "#1a9c5b" : pct >= 50 ? "#f5a524" : "#ef4444";

function ScorePill({ value }: { value: number }) {
  return (
    <span
      className={`mx-auto flex h-[19px] w-[30px] items-center justify-center rounded-md text-[9px] font-extrabold ${scoreCls(value)}`}
    >
      {value}
    </span>
  );
}

/**
 * Inherent vs Residual Risk: seberapa efektif kontrol mitigasi yang sudah
 * berjalan menurunkan tiap risiko utama.
 */
export function ControlEffectiveness() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Control Effectiveness" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Inherent → Residual Risk Setelah Kontrol Mitigasi Berjalan
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_34px_16px_34px_58px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Risiko</span>
        <span className="text-center">Inherent</span>
        <span />
        <span className="text-center">Residual</span>
        <span className="text-right">Efektivitas</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {riskControls.map((c) => (
          <li
            key={c.risk}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_34px_16px_34px_58px] items-center gap-x-1"
          >
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-bold leading-tight text-ink-900">
                {c.risk}
              </span>
              <span
                className="block truncate text-[7.5px] leading-tight text-ink-500"
                title={`Kontrol berjalan: ${c.controls}`}
              >
                {c.controls}
              </span>
            </span>
            <ScorePill value={c.inherent} />
            <MoveRight size={11} className="mx-auto text-ink-400" />
            <ScorePill value={c.residual} />
            <span className="flex items-center justify-end gap-1">
              <span className="h-[5px] w-[26px] overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${c.effectiveness}%`, background: effColor(c.effectiveness) }}
                />
              </span>
              <span className="w-[22px] text-right text-[8.5px] font-extrabold text-ink-700">
                {c.effectiveness}%
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Residual = skor register saat ini. Selisih inherent-residual menunjukkan penurunan risiko
        yang sudah dicapai kontrol eksisting.
      </p>
      <Link href="/people-risk-radar/efektivitas-kontrol" className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail Kontrol <ArrowRight size={11} />
      </Link>
    </div>
  );
}
