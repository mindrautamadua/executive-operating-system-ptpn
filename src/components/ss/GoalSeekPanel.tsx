import { ArrowDown, Crosshair, Sparkles } from "lucide-react";
import { goalSeek } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

function ChipList({ items, tone }: { items: { label: string; value: string }[]; tone: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((t) => (
        <span
          key={t.label}
          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[9px] font-bold leading-none ${tone}`}
        >
          <span className="opacity-70">{t.label}</span>
          {t.value}
        </span>
      ))}
    </div>
  );
}

/**
 * Goal Seek / Reverse Scenario: BOD menetapkan target, engine mencari
 * konfigurasi asumsi — arah kebalikan dari simulasi biasa.
 */
export function GoalSeekPanel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <SectionHead title="Goal Seek — Reverse Scenario" />
      <p className="mt-[3px] text-[9px] text-ink-500">{goalSeek.desc}</p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        <div className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5">
          <p className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wide text-ink-500">
            <Crosshair size={10} className="text-[#2f6fe4]" /> Target BOD
          </p>
          <div className="mt-1">
            <ChipList items={goalSeek.targets} tone="bg-[#e8f1fd] text-[#1d4ed8]" />
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown size={11} className="text-ink-400" />
        </div>

        <div className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5">
          <p className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wide text-ink-500">
            <Sparkles size={10} className="text-[#8b5cf6]" /> Konfigurasi Rekomendasi
          </p>
          <div className="mt-1">
            <ChipList items={goalSeek.config} tone="bg-[#f1ecfd] text-[#6d3fd8]" />
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown size={11} className="text-ink-400" />
        </div>

        <div className="rounded-lg border border-[#d7ecdf] bg-[#f2faf5] px-2.5 py-1.5">
          <p className="text-[9px] font-extrabold uppercase tracking-wide text-ptpn-greenDark">
            Expected Outcome
          </p>
          <div className="mt-1">
            <ChipList items={goalSeek.expected} tone="bg-[#dcf1e6] text-[#0f7a44]" />
          </div>
        </div>
      </div>
    </div>
  );
}
