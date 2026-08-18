import { ClipboardList, FileCheck2, Megaphone } from "lucide-react";
import { nextActions } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

const ICONS = {
  approve: { Icon: FileCheck2, cls: "bg-ptpn-greenLight text-ptpn-green" },
  plan: { Icon: ClipboardList, cls: "bg-[#e8f1fd] text-[#2f6fe4]" },
  communication: { Icon: Megaphone, cls: "bg-[#f1ecfd] text-[#8b5cf6]" },
};

export function NextBestAction() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Next Best Action" />
      <p className="mt-[3px] text-[9px] text-ink-500">Langkah selanjutnya yang direkomendasikan</p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 gap-2.5">
        {nextActions.map((a) => {
          const { Icon, cls } = ICONS[a.icon];
          return (
            <div
              key={a.title}
              className="flex flex-col rounded-xl border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2.5"
            >
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg ${cls}`}
              >
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <div className="mt-2 text-[9.5px] font-extrabold leading-snug text-ink-900">
                {a.title}
              </div>
              <p className="mt-1 flex-1 text-[8.5px] leading-snug text-ink-500">{a.desc}</p>
              <button
                className={`mt-2 w-full rounded-lg py-[6px] text-[9px] font-bold transition-colors ${
                  a.primary
                    ? "bg-ptpn-green text-white hover:opacity-90"
                    : "border border-[#cfe0f7] bg-white text-[#2f6fe4] hover:border-[#2f6fe4]"
                }`}
              >
                {a.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
