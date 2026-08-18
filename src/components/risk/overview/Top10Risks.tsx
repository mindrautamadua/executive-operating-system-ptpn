import { ArrowRight, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { levelOfScore, RISK_LEVEL_BAND, top10Risks, type TopRisk } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const LEVEL_TONE: Record<string, BadgeTone> = {
  Ekstrem: "bad",
  Tinggi: "warn",
  Menengah: "warn",
  Rendah: "good",
};

function TrendMark({ trend }: { trend: TopRisk["trend"] }) {
  if (trend === "flat") {
    return <Minus size={11} className="text-ink-400" />;
  }
  const up = trend === "up";
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <Icon
      size={11}
      className={up ? "text-[#ef4444]" : "text-ptpn-green"}
      aria-label={up ? "Memburuk" : "Membaik"}
    />
  );
}

function ScorePill({ score }: { score: number }) {
  return (
    <span
      className="mx-auto flex h-[18px] w-[24px] items-center justify-center rounded-md text-[9px] font-extrabold text-white"
      style={{ background: RISK_LEVEL_BAND[levelOfScore(score)] }}
    >
      {score}
    </span>
  );
}

/** Top 10 risiko korporat: skor inherent → residual, arah tren, dan pemilik risiko. */
export function Top10Risks() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Top 10 Risiko Korporat" action="Lihat Register" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Inherent → Residual, Arah Tren QoQ, dan Pemilik Risiko
      </p>

      <div className="mt-2 grid grid-cols-[16px_minmax(0,1fr)_24px_14px_24px_18px_150px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>#</span>
        <span>Risiko</span>
        <span className="text-center">Inh</span>
        <span />
        <span className="text-center">Res</span>
        <span className="text-center">Tren</span>
        <span>Owner</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {top10Risks.map((r, i) => (
          <li
            key={r.name}
            className="grid shrink-0 grid-cols-[16px_minmax(0,1fr)_24px_14px_24px_18px_150px] items-center gap-x-1.5"
          >
            <span className="text-[8.5px] font-extrabold text-ink-400">{i + 1}</span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[9.5px] font-bold leading-tight text-ink-900">
                  {r.name}
                </span>
                <ToneBadge
                  label={levelOfScore(r.residual)}
                  tone={LEVEL_TONE[levelOfScore(r.residual)]}
                />
              </span>
              <span className="block truncate text-[7.5px] leading-tight text-ink-500">
                {r.category}
              </span>
            </span>
            <ScorePill score={r.inherent} />
            <ArrowRight size={10} className="mx-auto text-ink-400" />
            <ScorePill score={r.residual} />
            <span className="flex justify-center">
              <TrendMark trend={r.trend} />
            </span>
            <span className="truncate text-[8.5px] text-ink-500" title={r.owner}>
              {r.owner}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
