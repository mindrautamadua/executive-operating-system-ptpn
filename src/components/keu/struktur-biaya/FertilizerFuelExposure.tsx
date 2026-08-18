import { Fuel, Sprout } from "lucide-react";
import { fertilizerFuel } from "@/lib/ksb-data";
import { fmtId } from "@/lib/keu-core";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Eksposur harga pupuk & BBM vs asumsi RKAP + estimasi dampak FY. */
export function FertilizerFuelExposure() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Eksposur Pupuk & BBM" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Harga Aktual YTD vs Asumsi RKAP · Dampak FY</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {fertilizerFuel.map((f) => {
          const Icon = f.item.startsWith("BBM") ? Fuel : Sprout;
          return (
            <div key={f.item} className="flex items-center gap-2.5 rounded-lg bg-[#f7f9fb] px-2.5 py-[7px]">
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg bg-[#e6f6f5] text-[#0d9488]">
                <Icon size={13} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9px] font-bold text-ink-900">{f.item}</div>
                <div className="mt-[1px] text-[9px] text-ink-500">
                  Asumsi {f.asumsiRkap} → Aktual{" "}
                  <span className="font-semibold text-ink-700">{f.aktual}</span>
                </div>
              </div>
              <ToneBadge
                label={`${f.deviasiPct > 0 ? "+" : ""}${fmtId(f.deviasiPct, 1)}%`}
                tone={f.tone}
              />
              <span className="w-[58px] shrink-0 text-right text-[9px] font-extrabold tabular-nums text-ink-900">
                {f.dampakFy}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
