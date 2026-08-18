import { strategySourcingPlan, type PgdStatus } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<PgdStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

const totalHemat = strategySourcingPlan.reduce((a, r) => a + r.targetHematRpM, 0);

export function StrategySourcingPlan() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Rencana Strategi Sourcing" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Delapan Kategori Strategis · total target hemat Rp {totalHemat.toLocaleString("id-ID")} M/thn
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {strategySourcingPlan.map((r) => (
          <div
            key={r.kategori}
            className="rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-2.5 py-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{r.kategori}</span>
              <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
            </div>
            <div className="mt-[3px] flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-semibold text-ink-500">
                {r.strategi} · cakupan Rp{" "}
                {r.cakupanRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
              </span>
              <span className="shrink-0 text-[9px] font-bold text-ptpn-green">
                Hemat Rp {r.targetHematRpM} M · {r.timeline}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Dua inisiatif bernilai terbesar — pupuk NPK/urea (Rp 2,1 T) dan konstruksi capex (Rp 1,64 T)
        — berstatus At Risk/Off Track.
      </p>
    </div>
  );
}
