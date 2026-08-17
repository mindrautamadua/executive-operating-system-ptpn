import { XCircle } from "lucide-react";
import Link from "next/link";
import { GuideShell } from "@/components/guide/GuideShell";
import { FlowList, GuideCard, GuideTitle, QaRow } from "@/components/guide/GuideBlocks";
import {
  dailyRoutine,
  dontList,
  kpiQuestions,
  readingPattern,
  routinePhilosophy,
  sixtySecondRead,
} from "@/lib/guide-data";

export const metadata = { title: "Baca 60 Detik — Executive Guide" };

export default function Baca60DetikPage() {
  return (
    <GuideShell
      title="The 60-Second Executive Read"
      subtitle="Cara membaca Executive Operating System dalam 60 detik"
      active="/executive-guide/baca-60-detik"
    >
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
        {/* enam langkah */}
        <GuideCard>
          <GuideTitle kicker="Executive Scan · Start here">Enam Langkah, 60 Detik</GuideTitle>
          <p className="mb-3 text-[9.5px] leading-relaxed text-ink-500">
            Baca homepage selalu dengan urutan yang sama. Kalau ada yang menarik perhatian:
            drill down. Kalau tidak: selesai — 60 detik cukup. Ini <span className="font-bold text-ink-700">Executive
            Scan</span>: versi ringkas dari Executive Management Loop 9 langkah — scan berhenti
            di keputusan &amp; aksi, loop penuh berlanjut sampai outcome keputusan diukur.
          </p>
          <FlowList
            items={sixtySecondRead.map((s) => ({
              lead: s.num,
              title: `${s.title} — ${s.question}`,
              desc: `Di mana: ${s.where}`,
              href: s.href,
              hrefLabel: "Buka bagian ini",
            }))}
          />
        </GuideCard>

        <div className="flex flex-col gap-3">
          {/* pola baca universal */}
          <GuideCard>
            <GuideTitle kicker="Pola baca universal">
              Number → Delta → Driver → Impact → Action
            </GuideTitle>
            <p className="mb-3 text-[9.5px] leading-relaxed text-ink-500">
              Satu pola untuk semua angka di Operating System. Contoh dengan EBITDA (angka hidup
              dari data yang sama dengan dashboard):
            </p>
            <FlowList
              items={readingPattern.map((p) => ({
                lead: p.stage,
                title: p.value,
                desc: p.note,
              }))}
            />
          </GuideCard>

          {/* empat pertanyaan KPI */}
          <GuideCard>
            <GuideTitle kicker="KPI reading guide">Empat Pertanyaan untuk Setiap KPI</GuideTitle>
            <div>
              {kpiQuestions.map((k) => (
                <QaRow key={k.q} q={k.q} a={k.desc} />
              ))}
            </div>
          </GuideCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {/* ritual harian */}
        <GuideCard>
          <GuideTitle kicker="Executive practice">Ritual Harian 5 Menit</GuideTitle>
          <div>
            {dailyRoutine.map((m) => (
              <div
                key={m.minute}
                className="flex items-center justify-between gap-2 border-b border-[#f0f3f6] py-2 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="w-[52px] shrink-0 text-[9.5px] font-extrabold text-[#1b3a6b]">
                    {m.minute}
                  </span>
                  <span className="truncate text-[9.5px] text-ink-700">{m.focus}</span>
                </div>
                <Link
                  href={m.href}
                  className="shrink-0 text-[8.5px] font-bold text-ptpn-green hover:underline"
                >
                  Buka
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-2 text-[9px] leading-relaxed text-ink-700">
            Filosofi pemakaian:{" "}
            <span className="font-extrabold text-ptpn-green">{routinePhilosophy.do}</span> — bukan{" "}
            <span className="font-semibold text-ink-400 line-through">{routinePhilosophy.dont}</span>.
          </div>
        </GuideCard>

        {/* what not to do */}
        <GuideCard>
          <GuideTitle kicker="What not to do">Delapan Kebiasaan yang Harus Dihindari</GuideTitle>
          <ul className="flex flex-col gap-1.5">
            {dontList.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[9.5px] leading-relaxed text-ink-700">
                <XCircle size={11} className="mt-[2px] shrink-0 text-[#ef4444]" />
                {d}
              </li>
            ))}
          </ul>
        </GuideCard>
      </div>
    </GuideShell>
  );
}
