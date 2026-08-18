import { quickAccessItems } from "@/lib/aihr-data";

const TONE: Record<string, string> = {
  green: "bg-ptpn-greenLight text-ptpn-green",
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  amber: "bg-[#fdf3e0] text-[#d97706]",
  sky: "bg-[#e6f4fb] text-[#4a8ef0]",
};

export function QuickAccess() {
  return (
    <div className="card anim-rise px-3.5 pb-3 pt-3" style={{ "--d": "180ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-extrabold text-ink-900">Akses Cepat</span>
        <button className="text-[8.5px] font-bold text-[#2f6fe4] transition-opacity hover:opacity-80">
          Kelola
        </button>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {quickAccessItems.map(({ label, icon: Icon, tone }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-[#eef2f6] bg-white px-1.5 pb-2 pt-2.5 text-center shadow-card transition-colors hover:bg-[#f8fafc]"
          >
            <span
              className={`flex h-[26px] w-[26px] items-center justify-center rounded-lg ${TONE[tone]}`}
            >
              <Icon size={13} strokeWidth={1.9} />
            </span>
            <span className="text-[9px] font-bold leading-[1.3] text-ink-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
