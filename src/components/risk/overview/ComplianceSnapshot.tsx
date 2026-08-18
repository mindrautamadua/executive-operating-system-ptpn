import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { complianceBySubholding, obligationByDomain } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

const KEPATUHAN_HREF = "/risiko-kepatuhan/kepatuhan-regulasi";

const barCls = (pct: number) =>
  pct >= 92 ? "bg-ptpn-green" : pct >= 88 ? "bg-[#f5a524]" : "bg-[#ef4444]";

/** Ringkasan kepatuhan regulasi enterprise (compact) — tautan ke halaman detail. */
export function ComplianceSnapshot() {
  const total = obligationByDomain.reduce((a, d) => a + d.total, 0);
  const nonCompliant = obligationByDomain.reduce((a, d) => a + d.non, 0);
  const parsial = obligationByDomain.reduce((a, d) => a + d.parsial, 0);

  return (
    <div
      className="card anim-rise px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Compliance Snapshot" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kepatuhan Regulasi Enterprise — {total} Kewajiban, 6 Domain
      </p>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-[#d6ecdf] bg-[#f4faf6] px-2 py-1.5">
          <div className="text-[13px] font-extrabold leading-none text-ptpn-green">91,2%</div>
          <div className="mt-[3px] text-[9px] font-semibold text-ink-500">Patuh</div>
        </div>
        <div className="rounded-lg border border-[#f3e3c3] bg-[#fdf9f0] px-2 py-1.5">
          <div className="text-[13px] font-extrabold leading-none text-[#d98b06]">{parsial}</div>
          <div className="mt-[3px] text-[9px] font-semibold text-ink-500">Parsial</div>
        </div>
        <div className="rounded-lg border border-[#f6d5d5] bg-[#fdf5f5] px-2 py-1.5">
          <div className="text-[13px] font-extrabold leading-none text-[#ef4444]">
            {nonCompliant}
          </div>
          <div className="mt-[3px] text-[9px] font-semibold text-ink-500">Non-Compliant</div>
        </div>
      </div>

      <ul className="mt-2 flex flex-col gap-1.5">
        {complianceBySubholding.map((s) => (
          <li key={s.name} className="grid grid-cols-[minmax(0,1fr)_54px_34px] items-center gap-1.5">
            <span className="truncate text-[9px] font-semibold text-ink-900">{s.name}</span>
            <span className="h-[6px] overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className={`block h-full rounded-full ${barCls(s.patuhPct)}`}
                style={{ width: `${s.patuhPct}%` }}
              />
            </span>
            <span className="text-right text-[9px] font-extrabold text-ink-900">
              {s.skor}
              <span className="text-[7.5px] font-bold text-ink-400">/100</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 py-1.5">
        <ToneBadge label="Sanksi" tone="bad" />
        <span className="min-w-0 flex-1 truncate text-[8.5px] text-ink-700">
          1 sanksi administratif lingkungan berjalan (IPAL 72%)
        </span>
      </div>

      <Link
        href={KEPATUHAN_HREF}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
      >
        Lihat Kepatuhan Regulasi <ArrowRight size={11} />
      </Link>
    </div>
  );
}
