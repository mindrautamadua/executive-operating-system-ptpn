import { AlertCircle, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { tiDecisions, type TalentDecision } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";

const TONE: Record<
  TalentDecision["tone"],
  { icon: typeof AlertCircle; iconCls: string; pill: string; wrap: string; kicker: string }
> = {
  red: {
    icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    kicker: "text-[#ef4444]",
  },
  amber: {
    icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    kicker: "text-[#d98b06]",
  },
  green: {
    icon: CheckCircle2,
    iconCls: "text-ptpn-green",
    pill: "bg-ptpn-greenLight text-ptpn-green",
    wrap: "border-[#d6ecdf] bg-[#f4faf6]",
    kicker: "text-ptpn-green",
  },
};

/** Terjemahan insight talent menjadi keputusan/aksi untuk BOD Decision Center. */
export function TalentDecisions() {
  return (
    <section className="card anim-rise flex flex-col p-3.5">
      <SectionHead
        title="Talent Decisions"
        action="Kirim ke BOD Decision Center"
        href="/talent-intelligence/decisions"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Keputusan &amp; aksi prioritas dari insight talenta</p>

      <div className="mt-2.5 flex flex-1 flex-col gap-2">
        {tiDecisions.map((d) => {
          const t = TONE[d.tone];
          const Icon = t.icon;
          return (
            <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                  <span
                    className={`shrink-0 text-[9px] font-extrabold uppercase tracking-[0.05em] ${t.kicker}`}
                  >
                    {d.kicker}
                  </span>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                  {d.pill}
                </span>
              </div>
              <div className="mt-1 text-[10px] font-bold text-ink-900">{d.title}</div>
              <p className="mt-1 text-[9px] leading-[1.45] text-ink-500">{d.text}</p>
              <div className="mt-1.5 flex items-start gap-1.5 text-[8.5px] leading-[1.4]">
                <Lightbulb size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span className="font-semibold text-ink-700">{d.rekomendasi}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
