import { CircleCheck, CircleAlert, TriangleAlert, GraduationCap, HelpCircle } from "lucide-react";
import { decisionOutcomes, outcomeCoverage, type DecisionOutcome } from "@/lib/stg-data";
import { SectionHead } from "@/components/hc/SectionHead";

const TONE: Record<
  DecisionOutcome["tone"],
  { icon: typeof CircleCheck; iconCls: string; pill: string }
> = {
  good: { icon: CircleCheck, iconCls: "text-ptpn-green", pill: "bg-ptpn-greenLight text-ptpn-green" },
  warn: { icon: CircleAlert, iconCls: "text-[#d98b06]", pill: "bg-[#fdf3e0] text-[#d98b06]" },
  bad: { icon: TriangleAlert, iconCls: "text-[#ef4444]", pill: "bg-[#fdecec] text-[#ef4444]" },
};

/**
 * Closed loop keputusan: janji dampak vs realisasinya, plus pelajaran.
 * Tanpa kartu ini, decision center hanya mengukur "keputusan diambil" —
 * tidak pernah "keputusan terbukti benar".
 */
export function DecisionOutcomeCard() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3" style={{ "--d": "180ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Decision Outcome" />
        {/* Cakupan diukur eksplisit: gap pengukuran adalah kerja governance. */}
        <span className="shrink-0 rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-bold text-ink-500">
          {outcomeCoverage.measured} dari {outcomeCoverage.totalDone} keputusan selesai terukur
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Executive Decision Journal — Asumsi → Expected → Actual → Variance → Why → Lesson per
        keputusan ber-ID: memori institusional cara Direksi memutus
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {decisionOutcomes.map((d) => {
          const t = TONE[d.tone];
          const Icon = t.icon;
          return (
            <div key={d.title} className="rounded-xl border border-[#eef2f6] px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                  {/* ID ledger: keputusan sebagai objek permanen ber-ID. */}
                  <span className="shrink-0 rounded bg-[#eef2f6] px-1 py-[1px] text-[9px] font-bold text-ink-500">
                    {d.id}
                  </span>
                  <span className="truncate text-[10px] font-bold text-ink-900" title={d.title}>
                    {d.title}
                  </span>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                  {d.variance}
                </span>
              </div>
              <div className="mt-1 grid grid-cols-[52px_minmax(0,1fr)] gap-x-2 gap-y-[2px] text-[8.5px]">
                <span className="text-ink-400">Diputus</span>
                <span className="font-semibold text-ink-700">{d.decided}</span>
                <span className="text-ink-400">Owner</span>
                <span className="font-semibold text-ink-700">{d.owner}</span>
                <span className="text-ink-400">Asumsi</span>
                <span className="font-semibold text-ink-700">{d.assumption}</span>
                <span className="text-ink-400">Expected</span>
                <span className="font-semibold text-ink-700">{d.expected}</span>
                <span className="text-ink-400">Actual</span>
                <span className="font-semibold text-ink-900">{d.actual}</span>
              </div>
              <p className="mt-1 flex items-start gap-1 text-[9px] leading-[1.4] text-ink-500">
                <HelpCircle size={10} className="mt-[1px] shrink-0 text-[#2f7de1]" />
                <span>
                  <span className="font-bold text-ink-700">Why: </span>
                  {d.why}
                </span>
              </p>
              <p className="mt-[3px] flex items-start gap-1 text-[9px] leading-[1.4] text-ink-500">
                <GraduationCap size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ink-700">Lesson: </span>
                  {d.lesson}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
