import { ArrowRight } from "lucide-react";
import { complianceIssues, type ResidualLevel } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";
import { StatusBadge } from "./StatusBadge";

const RANK_BG = ["#ef4444", "#f0662d", "#f5a524", "#f5a524", "#f5c518"];

const RESIDUAL_CLS: Record<ResidualLevel, string> = {
  Tinggi: "bg-[#fdecec] text-[#ef4444]",
  Sedang: "bg-[#fdf3e0] text-[#d98b06]",
  Rendah: "bg-ptpn-greenLight text-ptpn-green",
};

const remColor = (pct: number) =>
  pct >= 70 ? "#1a9c5b" : pct >= 50 ? "#f5a524" : "#ef4444";

export function TopComplianceIssues() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Top 5 Compliance Issues" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Isu Kepatuhan Prioritas yang Memerlukan Tindakan
          </p>
        </div>
        <span className="mt-[2px] shrink-0 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
          Potensi Eksposur
        </span>
      </div>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
        {complianceIssues.map((c, i) => (
          <li
            key={c.name}
            className="flex shrink-0 items-center gap-2.5 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span
              className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
              style={{ background: RANK_BG[i] }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 leading-[1.3]">
              <span className="flex items-center gap-2">
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">{c.name}</span>
                <StatusBadge status={c.status} />
              </span>
              <span className="mt-[1px] block truncate text-[8.5px] text-ink-500">{c.desc}</span>
              <span className="block truncate text-[9px] text-ink-500">
                {c.units} · Owner: {c.owner} · Umur {c.ageDays} hr
              </span>
              <span
                className="mt-[3px] flex items-center gap-1.5"
                title={`Remediasi ${c.remediation}% · Efektivitas kontrol ${c.controlEff}%`}
              >
                <span className="h-[5px] w-[64px] overflow-hidden rounded-full bg-[#eef2f6]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${c.remediation}%`, background: remColor(c.remediation) }}
                  />
                </span>
                <span className="text-[7.5px] font-bold text-ink-500">
                  Remediasi {c.remediation}% · Kontrol {c.controlEff}%
                </span>
              </span>
            </span>
            <span className="shrink-0 text-right leading-[1.35]">
              <span className="block text-[10px] font-extrabold text-[#ef4444]">{c.exposure}</span>
              <span className="block text-[8.5px] text-ink-500">{c.due}</span>
              <span
                className={`mt-[2px] inline-flex rounded px-1 py-[1px] text-[7.5px] font-bold ${RESIDUAL_CLS[c.residual]}`}
              >
                Residual {c.residual}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Semua Isu Kepatuhan <ArrowRight size={11} />
      </button>
    </div>
  );
}
