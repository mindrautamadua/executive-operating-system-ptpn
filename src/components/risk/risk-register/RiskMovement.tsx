import { ArrowDownRight, ArrowUpRight, CircleCheck, Plus } from "lucide-react";
import { riskMovement, riskMovers, type RiskMover } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const ARAH: Record<
  RiskMover["arah"],
  { icon: typeof ArrowUpRight; cls: string; label: string; tone: BadgeTone }
> = {
  naik: { icon: ArrowUpRight, cls: "text-[#ef4444]", label: "Naik", tone: "bad" },
  turun: { icon: ArrowDownRight, cls: "text-ptpn-green", label: "Turun", tone: "good" },
  baru: { icon: Plus, cls: "text-[#d98b06]", label: "Baru", tone: "warn" },
  ditutup: { icon: CircleCheck, cls: "text-ink-400", label: "Ditutup", tone: "neutral" },
};

const SUMMARY = [
  { key: "naik", value: riskMovement.naik, label: "Naik Level", cls: "text-[#ef4444]" },
  { key: "turun", value: riskMovement.turun, label: "Turun Level", cls: "text-ptpn-green" },
  { key: "baru", value: riskMovement.baru, label: "Risiko Baru", cls: "text-[#d98b06]" },
  { key: "ditutup", value: riskMovement.ditutup, label: "Ditutup", cls: "text-ink-500" },
];

/** Pergerakan register QoQ: naik, turun, baru, dan ditutup. */
export function RiskMovement() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Pergerakan Risiko QoQ" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">{riskMovement.periode}</p>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {SUMMARY.map((s) => (
          <div key={s.key} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
            <div className={`text-[14px] font-extrabold leading-none ${s.cls}`}>{s.value}</div>
            <div className="mt-[3px] truncate text-[9px] font-semibold text-ink-500">{s.label}</div>
          </div>
        ))}
      </div>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto">
        {riskMovers.map((m) => {
          const a = ARAH[m.arah];
          const Icon = a.icon;
          return (
            <li
              key={m.name}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
            >
              <Icon size={12} className={`shrink-0 ${a.cls}`} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[9.5px] font-bold text-ink-900">{m.name}</span>
                  <ToneBadge label={a.label} tone={a.tone} />
                </span>
                <span className="block truncate text-[9px] text-ink-500">{m.catatan}</span>
              </span>
              <span className="shrink-0 text-right text-[8.5px] font-semibold text-ink-500">
                {m.dari ? `${m.dari} → ` : "→ "}
                <span className="font-extrabold text-ink-900">{m.ke}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
