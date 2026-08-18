import { MessageCircleQuestion } from "lucide-react";
import { boardChallenges } from "@/lib/ceo-data";

/**
 * Board Challenge Questions — inti Mode Komisaris: dashboard yang sama
 * dibaca sebagai daftar pertanyaan pengawasan, bukan daftar tugas. Tiap isu
 * material menyandingkan klaim manajemen dengan pertanyaan yang mengujinya.
 */
export function BoardChallengeCard() {
  return (
    <div className="card anim-rise px-4 pb-3 pt-2.5">
      <div className="flex items-center gap-1.5">
        <MessageCircleQuestion size={13} className="text-[#1b3a6b]" />
        <h3 className="card-title">BOARD CHALLENGE QUESTIONS</h3>
        <span className="text-[8.5px] italic text-ink-400">
          Tugas Dekom bukan mengeksekusi — tetapi menguji.
        </span>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {boardChallenges.map((c) => (
          <div key={c.issue} className="rounded-xl border border-[#eef2f6] px-2.5 py-2">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
              {c.issue}
            </div>
            <p className="mt-1 rounded-lg bg-[#f5f8fa] px-2 py-1 text-[8.5px] leading-[1.4] text-ink-700">
              <span className="font-bold text-ink-900">Manajemen: </span>
              {c.managementSays}
            </p>
            <ul className="mt-1.5 space-y-[3px]">
              {c.questions.map((q) => (
                <li key={q} className="flex gap-1.5 text-[8.5px] leading-[1.4] text-ink-700">
                  <span className="shrink-0 font-bold text-[#1b3a6b]">?</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
