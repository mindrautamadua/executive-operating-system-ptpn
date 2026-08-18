import { ArrowRight, Clock } from "lucide-react";
import { chatHistory, type HistoryStatusTone } from "@/lib/aihr-data";

const STATUS_TONE: Record<HistoryStatusTone, string> = {
  green: "bg-ptpn-greenLight text-ptpn-green",
  amber: "bg-[#fdf3e0] text-[#b45309]",
  blue: "bg-[#e8f1fd] text-[#1d5bc4]",
};

export function ChatHistory() {
  return (
    <div className="card anim-rise px-3.5 pb-3 pt-3" style={{ "--d": "240ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-extrabold text-ink-900">Riwayat & Decision Memory</span>
        <button className="flex items-center gap-1 text-[8.5px] font-bold text-[#2f6fe4] transition-opacity hover:opacity-80">
          Lihat Semua <ArrowRight size={10} />
        </button>
      </div>

      <div className="mt-2.5 flex flex-col gap-2">
        {chatHistory.map(({ title, desc, when, status }) => (
          <button
            key={title}
            className="flex items-start gap-2.5 rounded-lg border border-[#eef2f6] bg-white px-2.5 py-2 text-left shadow-card transition-colors hover:bg-[#f8fafc]"
          >
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-ink-500">
              <Clock size={12} strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[9px] font-extrabold text-ink-900">{title}</span>
              <span className="mt-[2px] block truncate text-[8.5px] text-ink-500">{desc}</span>
              {status && (
                <span
                  className={`mt-1 inline-block rounded px-1.5 py-[1px] text-[7.5px] font-extrabold ${STATUS_TONE[status.tone]}`}
                >
                  {status.label}
                </span>
              )}
            </span>
            <span className="shrink-0 text-[9px] font-semibold text-ink-500">{when}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
