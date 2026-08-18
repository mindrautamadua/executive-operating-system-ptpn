import { ShieldCheck } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";
import { hpiBemOverview } from "@/lib/pm-data";

function GaugeRing() {
  const size = 152;
  const stroke = 15;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = 82.1;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f6" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a9c5b"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(c * pct) / 100} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[26px] font-extrabold text-ink-900">{hpiBemOverview.total}</span>
        <span className="mt-1 text-[8.5px] text-ink-400">/100</span>
        <span className="mt-[3px] text-[8.5px] font-bold text-ptpn-greenDark">
          ({hpiBemOverview.kategori})
        </span>
      </div>
    </div>
  );
}

export function HpiBemOverviewCard() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <SectionHead title="PTPN HPI-BEM Score Overview" />

      <div className="flex min-h-0 flex-1 items-center gap-5 px-1">
        <GaugeRing />
        <div className="min-w-0 flex-1">
          <div className="border-b border-[#f0f3f6] pb-1.5 text-[9.5px] font-bold text-ink-900">
            Behavior Engineering Model — 6 Sel
          </div>
          <div className="mt-2 space-y-2">
            {hpiBemOverview.kelompok.map((g) => (
              <div key={g.judul}>
                <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                  {g.judul}
                </div>
                <div className="mt-1 space-y-[7px]">
                  {g.sel.map((d) => (
                    <div key={d.label}>
                      <div className="flex items-center justify-between">
                        <span className="truncate text-[9px] font-semibold text-ink-700">
                          {d.label}
                        </span>
                        <span className="shrink-0 text-[9px] font-bold text-ink-900">
                          {d.skor} <span className="font-medium text-ink-400">/100</span>
                        </span>
                      </div>
                      <div className="mt-1 h-[6px] overflow-hidden rounded-full bg-[#eef2f6]">
                        <div
                          className="anim-grow-x h-full rounded-full"
                          style={{ width: `${d.skor}%`, background: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafb] px-3 py-2">
        <ShieldCheck size={13} className="shrink-0 text-ink-500" />
        <span className="text-[9px] font-medium text-ink-700">{hpiBemOverview.catatan}</span>
      </div>
    </div>
  );
}
