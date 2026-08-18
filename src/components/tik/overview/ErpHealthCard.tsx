import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { benefitWaterfall, erpModuleStatus, TIK_RAG_COLOR } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

const subModulTotal = erpModuleStatus.reduce((a, m) => a + m.subModul, 0);
const subModulLive = erpModuleStatus.reduce((a, m) => a + m.subModulLive, 0);
const realisasiRpT = benefitWaterfall.reduce((a, b) => a + b.realisasiRpT, 0);
const potensiRpT = benefitWaterfall.reduce((a, b) => a + b.potensiRpT, 0);

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

/** Kartu ringkas kesehatan program ERP untuk rail kanan overview. */
export function ErpHealthCard() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead title="Health Program ERP" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Digitalisasi &amp; ERP Terpadu Grup</p>

      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div>
          <div className="whitespace-nowrap text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            71
            <span className="text-[10px] font-bold text-ink-500">/100</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <ToneBadge label="Amber" tone="warn" />
            <span className="text-[8.5px] font-semibold text-ink-500">progres 57%</span>
          </div>
        </div>
        <p className="max-w-[130px] text-right text-[9px] leading-snug text-ink-500">
          Turun 2 poin dari Q1 2026 sepenuhnya karena dimensi jadwal.
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-ink-900">Sub-Modul Go-Live</span>
            <span className="text-[8.5px] font-semibold text-ink-500">
              {subModulLive}/{subModulTotal}
            </span>
          </div>
          <div className="mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
            <div
              className="h-full rounded-full bg-ptpn-green"
              style={{ width: `${(subModulLive / subModulTotal) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-ink-900">Benefit Terealisasi</span>
            <span className="text-[8.5px] font-semibold text-ink-500">
              {rp(realisasiRpT)} dari {rp(potensiRpT)}
            </span>
          </div>
          <div className="mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
            <div
              className="h-full rounded-full bg-[#3b7ded]"
              style={{ width: `${(realisasiRpT / potensiRpT) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {erpModuleStatus
          .filter((m) => m.rag !== "Hijau")
          .map((m) => (
            <div key={m.modul} className="flex items-center gap-1.5">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: TIK_RAG_COLOR[m.rag] }}
              />
              <span className="min-w-0 flex-1 truncate text-[8.5px] font-semibold text-ink-700">
                {m.modul}
              </span>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">{m.goLive}</span>
            </div>
          ))}
      </div>

      <Link
        href="/teknologi-informasi/program-digital"
        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green"
      >
        Buka Program &amp; Delivery Digital <ArrowRight size={11} />
      </Link>
    </div>
  );
}
