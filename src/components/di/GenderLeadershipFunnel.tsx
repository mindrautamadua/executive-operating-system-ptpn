import { TrendingDown } from "lucide-react";
import {
  funnelLeakage,
  funnelMax,
  genderFunnel,
  promotionVelocity,
  targetLevelJabatan,
} from "@/lib/di-data";
import { PALETTE } from "@/lib/chart-palette";

/** Posisi marker target pada lintasan bar (%). */
const POSISI_TARGET = (targetLevelJabatan / funnelMax) * 100;

export function GenderLeadershipFunnel() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Gender Leadership Funnel</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            % Perempuan per level karier — Staff → Direksi (Per 30 Jun 2026)
          </p>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap text-[9px] text-ink-500">
          <span className="h-[10px] w-[2px] rounded" style={{ background: PALETTE.amber }} />
          Target {targetLevelJabatan}%
        </span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {genderFunnel.map((b, i) => (
          <div key={b.level} className="flex items-center gap-2">
            <span className="w-[92px] shrink-0 text-[9.5px] leading-[1.2] text-ink-700">
              {b.level}
            </span>
            <span className="relative block h-[9px] min-w-0 flex-1 rounded-full bg-[#f2f5f8]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={
                  {
                    width: `${Math.min(100, (b.pct / funnelMax) * 100)}%`,
                    background: PALETTE.purple,
                    opacity: 0.55 + (b.pct / funnelMax) * 0.45,
                    "--d": `${i * 50}ms`,
                  } as React.CSSProperties
                }
              />
              {/* marker target 30% per level */}
              <span
                className="absolute -bottom-[2px] -top-[2px] w-[2px] rounded"
                style={{ left: `${POSISI_TARGET}%`, background: PALETTE.amber }}
                title={`Target ${targetLevelJabatan}%`}
              />
            </span>
            <span className="w-[36px] shrink-0 text-right text-[10px] font-semibold tabular-nums text-ink-700">
              {b.label}
            </span>
            {/* delta vs level sebelumnya — memperlihatkan titik leakage */}
            <span
              className={`w-[34px] shrink-0 text-right text-[9px] font-bold tabular-nums ${
                b.step === null
                  ? "text-ink-300"
                  : b.stepTone === "good"
                    ? "text-ptpn-green"
                    : "text-[#ef4444]"
              }`}
              title="Selisih vs level sebelumnya (pts)"
            >
              {b.step ?? "—"}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 flex items-start gap-1.5 rounded-lg bg-[#fdf3f3] px-2 py-[5px] text-[8.5px] leading-[1.35] text-ink-700">
        <TrendingDown size={11} className="mt-[1px] shrink-0 text-[#ef4444]" />
        <span>{funnelLeakage}</span>
      </p>

      {/* promotion velocity: kecepatan karier, bukan sekadar representasi */}
      <div className="mt-1.5 grid grid-cols-2 md:grid-cols-3 gap-1.5 border-t border-[#eef2f6] pt-1.5">
        {promotionVelocity.map((v) => (
          <div key={v.label} className="leading-tight">
            <div className="text-[9px] text-ink-500">{v.label}</div>
            <div className="text-[11px] font-extrabold tabular-nums text-ink-900">{v.nilai}</div>
            <div className="text-[9px] text-ink-500">{v.catatan}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
