import { AlertCircle, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { vendorRiskWatch } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE = {
  red: { Icon: AlertCircle, iconCls: "text-[#ef4444]", wrap: "border-[#f6d5d5] bg-[#fdf5f5]" },
  amber: { Icon: AlertTriangle, iconCls: "text-[#f5a524]", wrap: "border-[#f3e3c3] bg-[#fdf9f0]" },
  green: { Icon: CheckCircle2, iconCls: "text-ptpn-green", wrap: "border-[#d6ecdf] bg-[#f4faf6]" },
} as const;

const BADGE_TONE: Record<string, BadgeTone> = {
  Peringatan: "warn",
  "Sanksi Administratif": "warn",
  "Daftar Hitam": "bad",
  "Dalam Investigasi": "bad",
};

export function VendorRiskWatch() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Vendor Risk Watchlist" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Lima Prioritas dari 26 Vendor Bersanksi/Diawasi · eksposur Rp 882 M
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {vendorRiskWatch.map((v) => {
          const t = TONE[v.tone];
          const Icon = t.Icon;
          return (
            <div key={v.vendor} className={`rounded-xl border px-3 pb-2 pt-2 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={12} className={`shrink-0 ${t.iconCls}`} />
                  <span className="truncate text-[9.5px] font-bold text-ink-900">{v.vendor}</span>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="text-[9px] font-bold text-ink-500">
                    Rp {v.eksposurRpM} M
                  </span>
                  <ToneBadge label={v.status} tone={BADGE_TONE[v.status] ?? "neutral"} />
                </div>
              </div>
              <p className="mt-1 text-[8.5px] leading-[1.45] text-ink-500">{v.isu}</p>
              <p className="mt-1 flex items-start gap-1 text-[8.5px] leading-[1.45] text-ink-700">
                <Sparkles size={9} className="mt-[2px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Tindakan: </span>
                  {v.tindakan}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
