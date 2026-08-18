import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { businessExposure, levelOfScore } from "@/lib/prr-data";
import { SectionHead } from "../hc/SectionHead";

const scoreCls = (score: number) => {
  const level = levelOfScore(score);
  return level === "High"
    ? "bg-[#fdecec] text-[#ef4444]"
    : level === "Medium"
      ? "bg-[#fdf3e0] text-[#d98b06]"
      : "bg-ptpn-greenLight text-ptpn-green";
};

/**
 * Risk Exposure by Business: di lini bisnis mana people risk paling
 * mengancam — bukan sekadar di mana skor HR tertinggi.
 */
export function ExposureByBusiness() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Exposure by Business" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Ancaman People Risk Terhadap Lini Bisnis · Total Rp 128,6 M
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_32px_58px_54px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Lini Bisnis</span>
        <span className="text-center">Skor</span>
        <span className="text-right">Exposure</span>
        <span className="text-right">Share</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {businessExposure.map((b) => (
          <li
            key={b.business}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_32px_58px_54px] items-center gap-x-1"
          >
            <span className="truncate text-[9.5px] font-bold text-ink-900">{b.business}</span>
            <span
              className={`mx-auto flex h-[19px] w-[28px] items-center justify-center rounded-md text-[9px] font-extrabold ${scoreCls(b.score)}`}
            >
              {b.score}
            </span>
            <span className="text-right text-[9px] font-extrabold text-ink-900">{b.exposure}</span>
            <span className="flex items-center justify-end gap-1">
              <span className="h-[5px] w-[24px] overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="block h-full rounded-full bg-[#3b7ded]"
                  style={{ width: `${b.share}%` }}
                />
              </span>
              <span className="w-[20px] text-right text-[8.5px] font-bold text-ink-700">
                {b.share}%
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Palm Oil menyerap 53% total exposure — prioritas mitigasi mengikuti bobot bisnis, bukan
        sekadar skor risiko tertinggi.
      </p>
      <Link href="/people-risk-radar/eksposur-bisnis" className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail Eksposur <ArrowRight size={11} />
      </Link>
    </div>
  );
}
