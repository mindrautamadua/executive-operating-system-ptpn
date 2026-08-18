import { speakUp } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

const pct = (n: number) => Math.round((n / speakUp.reports) * 100);

function Tile({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "bad";
}) {
  const cls =
    tone === "good" ? "text-ptpn-green" : tone === "bad" ? "text-[#ef4444]" : "text-ink-900";
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
      <span className={`text-[13px] font-extrabold leading-none ${cls}`}>{value}</span>
      <span className="mt-1 truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
        {label}
      </span>
    </div>
  );
}

/**
 * Speak-Up Intelligence: kualitas penanganan whistleblowing,
 * bukan sekadar jumlah laporan masuk.
 */
export function SpeakUpIntelligence() {
  const s = speakUp;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "420ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Speak-Up Intelligence" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Kualitas Penanganan {s.reports} Laporan Whistleblowing YTD
          </p>
        </div>
      </div>

      <div
        className="mt-2.5 flex h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]"
        title={`Substantiated ${s.substantiated} · Dalam investigasi ${s.investigating} · Unsubstantiated ${s.unsubstantiated}`}
      >
        <span className="h-full" style={{ width: `${pct(s.substantiated)}%`, background: "#ef4444" }} />
        <span className="h-full" style={{ width: `${pct(s.investigating)}%`, background: "#f5a524" }} />
        <span className="h-full" style={{ width: `${pct(s.unsubstantiated)}%`, background: "#94a3b8" }} />
      </div>
      <div className="mt-1.5 flex items-center gap-3 text-[9px] font-semibold text-ink-500">
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#ef4444]" />
          Substantiated {pct(s.substantiated)}%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#f5a524]" />
          Investigasi {pct(s.investigating)}%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#94a3b8]" />
          Tidak Terbukti {pct(s.unsubstantiated)}%
        </span>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 content-center gap-1.5">
        <Tile label="Avg Waktu Investigasi" value={`${s.avgInvestigationDays} hari`} />
        <Tile label="Kasus Overdue" value={`${s.overdueCases}`} tone="bad" />
        <Tile label="Kasus Retaliasi" value={`${s.retaliationCases}`} tone="good" />
        <Tile label="Repeat Offense" value={`${s.repeatOffense}`} tone="bad" />
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Kenaikan laporan (+4 vs Apr) diiringi substantiation rate stabil — indikasi naiknya
        trust terhadap kanal pelaporan, bukan naiknya misconduct.
      </p>
    </div>
  );
}
