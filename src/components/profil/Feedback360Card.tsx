import { Lock, MessagesSquare } from "lucide-react";
import { feedback360 } from "@/lib/profil-data";

const TONE: Record<string, { border: string; chip: string }> = {
  green: { border: "border-l-ptpn-green", chip: "bg-ptpn-greenLight text-ptpn-greenDark" },
  blue: { border: "border-l-[#3b7ded]", chip: "bg-[#e8f1fd] text-[#2f6fe4]" },
  amber: { border: "border-l-[#f59e0b]", chip: "bg-[#fdf3e0] text-[#c07c05]" },
};

/** Tema umpan balik 360° — suara manusia yang melengkapi angka asesmen. */
export function Feedback360Card() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
          <MessagesSquare size={13} className="text-[#8b5cf6]" />
          Umpan Balik 360°
        </h3>
        <span className="text-[8.5px] text-ink-400">{feedback360.siklus}</span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-3">
        {feedback360.tema.map((t) => {
          const tone = TONE[t.tone];
          return (
            <div
              key={t.sumber}
              className={`rounded-xl border border-[#eef2f6] border-l-[3px] px-3 py-2.5 ${tone.border}`}
            >
              <span
                className={`inline-block rounded-full px-2 py-[2px] text-[9px] font-extrabold ${tone.chip}`}
              >
                {t.sumber}
              </span>
              <p className="mt-1.5 text-[9px] italic leading-[1.55] text-ink-700">
                &ldquo;{t.kutipan}&rdquo;
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-2 flex items-start gap-1.5 text-[9px] leading-snug text-ink-500">
        <Lock size={10} className="mt-[1px] shrink-0" />
        {feedback360.catatan}
      </p>
    </div>
  );
}
