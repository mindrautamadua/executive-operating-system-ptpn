import { SectionHead } from "@/components/hc/SectionHead";
import { openActionTotal, priorityRisks, slaAging } from "@/lib/prr-priority";

const MAX = Math.max(...slaAging.map((s) => s.count));

const ESC_ROWS = [
  { label: "BOD", tone: "bg-[#ef4444]" },
  { label: "Komite Risiko", tone: "bg-[#f5a524]" },
  { label: "Direktorat", tone: "bg-[#3b7ded]" },
];

/** Sebaran tenggat aksi terhadap SLA + komposisi jalur eskalasi. */
export function SlaAging() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <SectionHead title="SLA & Eskalasi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        <span className="font-bold text-ink-900">{openActionTotal} aksi</span> terbuka lintas{" "}
        {priorityRisks.length} risiko
      </p>

      <div className="mt-2 flex flex-col gap-1.5">
        {slaAging.map((s) => (
          <div key={s.bucket}>
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9px] text-ink-700">{s.bucket}</span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-900">{s.count}</span>
            </div>
            <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(s.count / MAX) * 100}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-[#eef2f6] pt-2">
        <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-ink-500">
          Jalur Eskalasi
        </div>
        <div className="mt-1.5 flex flex-col gap-1">
          {ESC_ROWS.map((e) => {
            const count = priorityRisks.filter((r) => r.escalation === e.label).length;
            return (
              <div key={e.label} className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${e.tone}`} />
                <span className="min-w-0 flex-1 truncate text-[9px] text-ink-700">{e.label}</span>
                <span className="shrink-0 text-[9px] font-bold text-ink-900">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
