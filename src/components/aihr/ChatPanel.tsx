import Link from "next/link";
import {
  Bot,
  ChevronDown,
  Copy,
  Database,
  FileText,
  FlaskConical,
  Paperclip,
  Send,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Upload,
} from "lucide-react";
import {
  activeReasoningMode,
  aihrDisclaimer,
  followUpPrompts,
  headcountAnswer,
  headcountEvidence,
  reasoningModes,
  turnoverAnswer,
  turnoverQuestion,
  userQuestion,
  welcomePrompts,
  type ReasoningBlockKind,
} from "@/lib/aihr-data";

/* ── Elemen pendukung ─────────────────────────────────────────────── */

/** Badge governance per jawaban: klasifikasi risiko + kebutuhan approval. */
function GovernanceChip({ level }: { level: "info" | "decision" }) {
  const cfg =
    level === "info"
      ? { dot: "#2f6fe4", bg: "#e8f1fd", text: "#1d5bc4", label: "Informational — tanpa approval" }
      : {
          dot: "#d97706",
          bg: "#fdf3e0",
          text: "#b45309",
          label: "Decision support — perlu review manusia",
        };
  return (
    <span
      className="flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[7.5px] font-bold"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

function AnswerActions() {
  return (
    <div className="flex items-center gap-2.5 text-ink-400">
      {[ThumbsUp, ThumbsDown, Share2, Copy, Upload].map((Icon, i) => (
        <button key={i} className="transition-colors hover:text-ink-700" aria-label="Aksi">
          <Icon size={12} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  );
}

/* ── Jawaban 1 — headcount + evidence ─────────────────────────────── */

function HeadcountDonut() {
  const { segments } = headcountAnswer;
  let offset = 0;
  return (
    <svg viewBox="0 0 42 42" className="h-[84px] w-[84px] -rotate-90">
      {segments.map((s) => {
        const el = (
          <circle
            key={s.label}
            cx="21"
            cy="21"
            r="15.9155"
            fill="none"
            stroke={s.color}
            strokeWidth="7"
            strokeDasharray={`${s.pct} ${100 - s.pct}`}
            strokeDashoffset={-offset}
          />
        );
        offset += s.pct;
        return el;
      })}
    </svg>
  );
}

/** Evidence card: sumber, tanggal data, refresh, kualitas, confidence, formula. */
function EvidenceStrip() {
  const e = headcountEvidence;
  const cells = [
    { label: "Sumber", value: e.source },
    { label: "Data per", value: e.asOf },
    { label: "Refresh terakhir", value: e.refreshed },
    { label: "Kualitas data", value: e.quality },
    { label: "Confidence", value: e.confidence },
  ];
  return (
    <div className="mt-2.5 rounded-lg border border-[#e3ecf8] bg-[#f7faff] px-2.5 pb-2 pt-2">
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-[#1d5bc4]">
        <Database size={9} /> Evidence
      </div>
      <div className="mt-1.5 grid grid-cols-5 gap-2">
        {cells.map((c) => (
          <div key={c.label} className="min-w-0">
            <div className="text-[7.5px] font-semibold text-ink-400">{c.label}</div>
            <div className="mt-[1px] truncate text-[8.5px] font-bold text-ink-900" title={c.value}>
              {c.value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 border-t border-[#e3ecf8] pt-1.5 text-[9px] text-ink-500">
        Kalkulasi: <span className="font-mono font-bold text-ink-700">{e.formula}</span>
      </div>
    </div>
  );
}

function HeadcountCard() {
  const a = headcountAnswer;
  return (
    <div className="mt-2 rounded-xl border border-[#e6ecf2] bg-white px-3.5 pb-3 pt-3 shadow-card">
      <div className="text-[10.5px] font-extrabold text-ink-900">{a.cardTitle}</div>
      <div className="mt-[2px] text-[8.5px] font-semibold text-ink-400">{a.period}</div>

      <div className="mt-2.5 flex items-center gap-4">
        <div className="shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {a.total}
            </span>
            <span className="text-[10px] font-semibold text-ink-500">{a.unit}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-[8.5px] font-bold text-ptpn-green">
            <TrendingUp size={10} /> {a.delta}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <HeadcountDonut />
          <ul className="flex flex-col gap-1.5">
            {a.segments.map((s) => (
              <li key={s.label} className="flex items-center gap-1.5 text-[8.5px]">
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                  style={{ background: s.color }}
                />
                <span className="font-semibold text-ink-700">{s.label}</span>
                <span className="ml-auto pl-3 font-bold tabular-nums text-ink-900">
                  {s.value} ({s.pct.toFixed(1).replace(".", ",")}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EvidenceStrip />

      <div className="mt-2.5 flex items-center justify-between border-t border-[#eef2f6] pt-2">
        <AnswerActions />
        <button className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[5px] text-[8.5px] font-bold text-ink-700 transition-colors hover:bg-[#eef2f6]">
          <Database size={10} /> Sumber Data
        </button>
      </div>
    </div>
  );
}

/* ── Jawaban 2 — diagnosis turnover (lintas modul) ────────────────── */

const BLOCK_STYLE: Record<ReasoningBlockKind, { label: string; bg: string; text: string }> = {
  FACT: { label: "Fact", bg: "#e8f1fd", text: "#1d5bc4" },
  INSIGHT: { label: "Insight", bg: "#eaf7f0", text: "#15794a" },
  HYPOTHESIS: { label: "Hypothesis", bg: "#fdf3e0", text: "#b45309" },
  RECOMMENDATION: { label: "Recommendation", bg: "#f3e8ff", text: "#7c3aed" },
};

function TurnoverCard() {
  const a = turnoverAnswer;
  return (
    <div className="mt-2 rounded-xl border border-[#e6ecf2] bg-white px-3.5 pb-3 pt-3 shadow-card">
      <div className="flex items-center justify-between">
        <div className="text-[10.5px] font-extrabold text-ink-900">
          Diagnosis Turnover — Regional 3
        </div>
        <span className="rounded-full bg-ink-900 px-2 py-[2px] text-[7.5px] font-bold text-white">
          Mode: {a.mode}
        </span>
      </div>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {a.blocks.map((b) => {
          const s = BLOCK_STYLE[b.kind];
          return (
            <div key={b.kind} className="flex items-start gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2">
              <span
                className="mt-[1px] shrink-0 rounded px-1.5 py-[2px] text-[7.5px] font-extrabold uppercase tracking-[0.05em]"
                style={{ background: s.bg, color: s.text }}
              >
                {s.label}
              </span>
              <p className="text-[9px] leading-[1.5] text-ink-700">{b.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <div>
          <div className="text-[9px] font-extrabold uppercase tracking-[0.06em] text-ink-500">
            Likely drivers
          </div>
          <ol className="mt-1 flex flex-col gap-[3px]">
            {a.drivers.map((d, i) => (
              <li key={d} className="flex items-center gap-1.5 text-[8.5px] font-semibold text-ink-700">
                <span className="flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[7.5px] font-extrabold text-ink-500">
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ol>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.06em] text-ink-500">
            Confidence
          </div>
          <div className="mt-[2px] text-[18px] font-extrabold leading-none text-ink-900">
            {a.confidence}
          </div>
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-[#e3ecf8] bg-[#f7faff] px-2.5 py-1.5">
        <span className="text-[9px] font-bold text-[#1d5bc4]">
          Modul dikonsultasikan: {a.modulesConsulted.join(" · ")}
        </span>
        <span className="ml-2 text-[9px] text-ink-500">({a.searchMeta})</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-[#eef2f6] pt-2">
        <AnswerActions />
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[5px] text-[8.5px] font-bold text-ink-700 transition-colors hover:bg-[#eef2f6]">
            <FileText size={10} /> Buat Executive Brief
          </button>
          <Link
            href="/scenario-simulation"
            className="flex items-center gap-1.5 rounded-lg bg-ptpn-green px-2.5 py-[5px] text-[8.5px] font-bold text-white shadow-pill transition-opacity hover:opacity-90"
          >
            <FlaskConical size={10} /> Simulasikan Realokasi
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Panel utama ──────────────────────────────────────────────────── */

export function ChatPanel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="scroll-thin flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-4">
        {/* Banner sambutan */}
        <div className="rounded-xl border border-[#e3ecf8] bg-gradient-to-b from-[#f2f7ff] to-[#edf4fd] px-4 pb-4 pt-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2f6fe4] text-white shadow-pill">
              <Sparkles size={18} strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-extrabold text-ink-900">
                Selamat datang, saya AI HR Assistant 👋
              </div>
              <p className="mt-1 text-[9.5px] leading-[1.5] text-ink-600">
                Saya siap membantu Anda menemukan jawaban, insight, dan rekomendasi terkait Human
                Capital dengan cepat dan akurat.
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {welcomePrompts.map(({ icon: Icon, text }) => (
              <button
                key={text}
                className="flex items-center gap-2 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-2 text-left shadow-card transition-colors hover:bg-[#f8fafc]"
              >
                <Icon size={14} strokeWidth={1.8} className="shrink-0 text-[#2f6fe4]" />
                <span className="text-[8.5px] font-semibold leading-[1.35] text-ink-700">
                  {text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pertanyaan 1 */}
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[70%] rounded-xl rounded-tr-sm border border-[#d9efe3] bg-[#eaf7f0] px-3 py-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[9px] font-extrabold text-ink-900">Anda</span>
              <span className="text-[9px] text-ink-500">{userQuestion.time}</span>
            </div>
            <p className="mt-1 text-[9.5px] font-semibold leading-[1.45] text-ink-900">
              {userQuestion.text}
            </p>
          </div>
          <div className="h-[26px] w-[26px] shrink-0 overflow-hidden rounded-full ring-1 ring-[#e6ecf2]">
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <rect width="40" height="40" fill="#dfe7ee" />
              <circle cx="20" cy="15" r="7" fill="#8a6a52" />
              <path d="M6 40c1.5-9 7.5-13 14-13s12.5 4 14 13Z" fill="#2a3b52" />
            </svg>
          </div>
        </div>

        {/* Jawaban 1 — factual + evidence */}
        <div className="flex items-start gap-2.5">
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-ink-900 text-white ring-1 ring-[#eef2f6]">
            <Bot size={14} strokeWidth={1.9} />
          </span>
          <div className="min-w-0 max-w-[88%]">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-extrabold text-ink-900">AI HR Assistant</span>
              <span className="text-[9px] text-ink-500">{headcountAnswer.time}</span>
              <GovernanceChip level="info" />
            </div>
            <div className="mt-1 rounded-xl rounded-tl-sm border border-[#eef2f6] bg-[#fbfcfd] px-3 pb-3 pt-2.5">
              <p className="text-[9.5px] leading-[1.5] text-ink-700">{headcountAnswer.intro}</p>
              <HeadcountCard />
            </div>
          </div>
        </div>

        {/* Pertanyaan 2 */}
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[70%] rounded-xl rounded-tr-sm border border-[#d9efe3] bg-[#eaf7f0] px-3 py-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[9px] font-extrabold text-ink-900">Anda</span>
              <span className="text-[9px] text-ink-500">{turnoverQuestion.time}</span>
            </div>
            <p className="mt-1 text-[9.5px] font-semibold leading-[1.45] text-ink-900">
              {turnoverQuestion.text}
            </p>
          </div>
          <div className="h-[26px] w-[26px] shrink-0 overflow-hidden rounded-full ring-1 ring-[#e6ecf2]">
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <rect width="40" height="40" fill="#dfe7ee" />
              <circle cx="20" cy="15" r="7" fill="#8a6a52" />
              <path d="M6 40c1.5-9 7.5-13 14-13s12.5 4 14 13Z" fill="#2a3b52" />
            </svg>
          </div>
        </div>

        {/* Jawaban 2 — diagnosis lintas modul */}
        <div className="flex items-start gap-2.5">
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-ink-900 text-white ring-1 ring-[#eef2f6]">
            <Bot size={14} strokeWidth={1.9} />
          </span>
          <div className="min-w-0 max-w-[88%]">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-extrabold text-ink-900">AI HR Assistant</span>
              <span className="text-[9px] text-ink-500">{turnoverAnswer.time}</span>
              <GovernanceChip level="decision" />
            </div>
            <div className="mt-1 rounded-xl rounded-tl-sm border border-[#eef2f6] bg-[#fbfcfd] px-3 pb-3 pt-2.5">
              <p className="text-[9.5px] leading-[1.5] text-ink-700">{turnoverAnswer.intro}</p>
              <TurnoverCard />
            </div>
          </div>
        </div>

        {/* Saran lanjutan */}
        <div className="pb-1">
          <div className="text-[8.5px] font-semibold text-ink-500">
            Anda mungkin ingin bertanya:
          </div>
          <div className="no-scrollbar mt-1.5 flex gap-1.5 overflow-x-auto">
            {followUpPrompts.map((p) => (
              <button
                key={p}
                className="shrink-0 rounded-full border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[5px] text-[8.5px] font-semibold text-ink-700 transition-colors hover:bg-[#eef4f0]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-3 pt-2.5">
        <div className="rounded-xl border border-[#e3e9ef] bg-white px-3 pb-2 pt-2.5 shadow-card">
          <div className="text-[9.5px] text-ink-400">Tanyakan apa saja seputar Human Capital...</div>

          {/* Mode penalaran */}
          <div className="no-scrollbar mt-2 flex items-center gap-1 overflow-x-auto">
            {reasoningModes.map((m) => (
              <button
                key={m}
                className={
                  m === activeReasoningMode
                    ? "shrink-0 rounded-full bg-ink-900 px-2.5 py-[4px] text-[9px] font-bold text-white"
                    : "shrink-0 rounded-full border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[4px] text-[9px] font-semibold text-ink-600 transition-colors hover:bg-[#eef2f6]"
                }
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button className="text-ink-400 transition-colors hover:text-ink-700" aria-label="Lampiran">
              <Paperclip size={14} />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[5px] text-[8.5px] font-bold text-ink-700 transition-colors hover:bg-[#eef2f6]">
              <Sparkles size={10} className="text-[#2f6fe4]" /> Deep Search{" "}
              <ChevronDown size={10} className="text-ink-400" />
            </button>
            <button
              className="ml-auto flex h-[28px] w-[34px] items-center justify-center rounded-lg bg-ptpn-green text-white shadow-pill transition-opacity hover:opacity-90"
              aria-label="Kirim"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[9px] text-ink-500">{aihrDisclaimer}</p>
      </div>
    </div>
  );
}
