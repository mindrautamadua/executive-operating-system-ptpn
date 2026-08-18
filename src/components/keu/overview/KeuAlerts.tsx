import { AlertCircle, AlertTriangle, CheckCircle2, Wallet } from "lucide-react";
import { keuAlerts } from "@/lib/keu-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE = {
  red: {
    Icon: AlertCircle,
    wrap: "border-[#f6d5d5] bg-[#fdf1f1]",
    icon: "bg-[#ef4444] text-white",
  },
  amber: {
    Icon: AlertTriangle,
    wrap: "border-[#f3e3c3] bg-[#fdf8ec]",
    icon: "bg-[#f5a524] text-white",
  },
  green: {
    Icon: CheckCircle2,
    wrap: "border-[#d6ecdf] bg-[#f2faf5]",
    icon: "bg-ptpn-green text-white",
  },
  blue: {
    Icon: Wallet,
    wrap: "border-[#d3e3f6] bg-[#f1f7fd]",
    icon: "bg-[#2f6fe4] text-white",
  },
} as const;

export function KeuAlerts() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "200ms" } as React.CSSProperties}>
      <SectionHead title="Alerts & Notifications" action="Lihat Semua" badge={<ScopeNote />} />

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {keuAlerts.map((a) => {
          const t = TONE[a.tone];
          const Icon = t.Icon;
          return (
            <div key={a.title} className={`flex flex-col rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span
                  className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${t.icon}`}
                >
                  <Icon size={10} strokeWidth={2.2} />
                </span>
                <span className="truncate text-[9.5px] font-bold text-ink-900" title={a.title}>
                  {a.title}
                </span>
              </div>
              <p className="mt-1.5 flex-1 text-[8.5px] leading-[1.45] text-ink-500">{a.text}</p>
              <div className="mt-1.5 text-[9px] text-ink-500">{a.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
