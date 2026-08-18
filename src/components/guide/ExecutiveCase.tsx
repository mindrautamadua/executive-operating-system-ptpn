"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { GuideCard, GuideTitle } from "@/components/guide/GuideBlocks";

const STORAGE_KEY = "ecc-executive-case-r4";

export interface CaseQuestion {
  q: string;
  /** Executive Analysis pembanding — dibuka setelah pengguna menjawab. */
  analysis: string;
}

/**
 * Executive Case (learning mode): sistem sengaja menahan jawaban. Pengguna
 * menulis reasoning-nya dulu per pertanyaan (tersimpan di localStorage),
 * baru membandingkannya dengan Executive Analysis. Dashboard menjawab;
 * simulator menantang.
 */
export function ExecutiveCase({
  questions,
}: {
  questions: CaseQuestion[];
}) {
  const [jawaban, setJawaban] = useState<string[]>(() => questions.map(() => ""));
  const [terbuka, setTerbuka] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as { jawaban?: string[]; terbuka?: boolean };
        if (Array.isArray(saved.jawaban)) {
          setJawaban(questions.map((_, i) => saved.jawaban?.[i] ?? ""));
        }
        if (saved.terbuka) setTerbuka(true);
      } catch {
        // abaikan payload korup
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simpan = (next: string[], buka: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ jawaban: next, terbuka: buka }));
  };

  const terisi = jawaban.filter((j) => j.trim().length > 0).length;

  return (
    <GuideCard>
      <div className="flex items-center justify-between gap-2">
        <GuideTitle kicker="Learning mode">Jawab Dulu, Baru Bandingkan</GuideTitle>
        <span className="shrink-0 rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-bold text-ink-500">
          {terisi}/{questions.length} dijawab
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((item, i) => (
          <div key={item.q}>
            <div className="flex gap-1.5 text-[9.5px] font-bold leading-[1.4] text-ink-900">
              <span className="shrink-0 text-ptpn-green">{i + 1}.</span>
              {item.q}
            </div>
            <textarea
              value={jawaban[i]}
              onChange={(e) => {
                const next = jawaban.map((j, ji) => (ji === i ? e.target.value : j));
                setJawaban(next);
                simpan(next, terbuka);
              }}
              placeholder="Tulis reasoning Anda di sini…"
              rows={2}
              className="mt-1 w-full resize-y rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-1.5 text-[9.5px] leading-[1.45] text-ink-900 placeholder:text-ink-300 focus:border-ptpn-green focus:outline-none"
            />
            {terbuka && (
              <p className="mt-1 flex items-start gap-1.5 rounded-lg bg-[#f2faf5] px-2.5 py-1.5 text-[9px] leading-[1.45] text-ink-700">
                <CheckCircle2 size={11} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Executive Analysis: </span>
                  {item.analysis}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const next = !terbuka;
          setTerbuka(next);
          simpan(jawaban, next);
        }}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#7ed957] to-[#1a9c5b] py-[7px] text-[10px] font-bold text-white shadow-pill transition-opacity hover:opacity-90"
      >
        {terbuka ? (
          <>
            <EyeOff size={12} /> Sembunyikan Executive Analysis
          </>
        ) : (
          <>
            <Eye size={12} /> Bandingkan dengan Executive Analysis
          </>
        )}
      </button>
      {!terbuka && terisi < questions.length && (
        <p className="mt-1.5 text-center text-[9px] text-ink-500">
          Disarankan menjawab semua pertanyaan dulu — membaca jawaban sebelum berpikir
          menggagalkan latihannya.
        </p>
      )}
    </GuideCard>
  );
}
