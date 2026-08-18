import { ShieldCheck } from "lucide-react";
import {
  controlRows,
  overallControlEffectiveness,
  type ResidualLevel,
} from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

const RESIDUAL_CLS: Record<ResidualLevel, string> = {
  Tinggi: "bg-[#fdecec] text-[#ef4444]",
  Sedang: "bg-[#fdf3e0] text-[#d98b06]",
  Rendah: "bg-ptpn-greenLight text-ptpn-green",
};

const effColor = (pct: number) =>
  pct >= 80 ? "#1a9c5b" : pct >= 65 ? "#f5a524" : "#ef4444";

/**
 * Control Effectiveness: jembatan compliance → residual risk.
 * Berapa kontrol terpasang per area, berapa yang benar-benar efektif.
 */
export function ControlEffectiveness() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Control Effectiveness" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Efektif / Parsial / Gagal per Area Kepatuhan
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-md bg-ptpn-greenLight px-2 py-[3px] text-[9px] font-extrabold text-ptpn-green">
          <ShieldCheck size={11} strokeWidth={2.2} />
          {overallControlEffectiveness}% Overall
        </span>
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_36px_64px_54px_44px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Area</span>
        <span className="text-center">Kontrol</span>
        <span className="text-center">E / P / G</span>
        <span className="text-right">Efektivitas</span>
        <span className="text-center">Residual</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {controlRows.map((c) => (
          <li
            key={c.area}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_36px_64px_54px_44px] items-center gap-x-1.5"
          >
            <span className="truncate text-[9px] font-bold text-ink-900">{c.area}</span>
            <span className="text-center text-[9.5px] font-extrabold text-ink-900">
              {c.controls}
            </span>
            <span
              className="flex h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]"
              title={`Efektif ${c.effective} · Parsial ${c.partial} · Gagal ${c.failed}`}
            >
              <span
                className="h-full"
                style={{ width: `${(c.effective / c.controls) * 100}%`, background: "#1a9c5b" }}
              />
              <span
                className="h-full"
                style={{ width: `${(c.partial / c.controls) * 100}%`, background: "#f5a524" }}
              />
              <span
                className="h-full"
                style={{ width: `${(c.failed / c.controls) * 100}%`, background: "#ef4444" }}
              />
            </span>
            <span
              className="text-right text-[9.5px] font-extrabold"
              style={{ color: effColor(c.effectiveness) }}
            >
              {c.effectiveness}%
            </span>
            <span
              className={`mx-auto flex h-[17px] w-full items-center justify-center rounded px-1 text-[9px] font-bold ${RESIDUAL_CLS[c.residual]}`}
            >
              {c.residual}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Efektivitas = (efektif + 0,5×parsial) / total kontrol. Kontrol gagal pada PDP &amp;
        K3 adalah sumber utama residual risk tinggi.
      </p>
    </div>
  );
}
