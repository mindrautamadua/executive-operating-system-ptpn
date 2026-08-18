"use client";

import type { ReactNode } from "react";
import { useNavMode, type NavMode } from "@/components/shared/useNavMode";

const MODE_BAND: Record<NavMode, { label: string; question: string } | null> = {
  fungsional: null,
  ceo: {
    label: "MODE CEO — ACT & DECIDE",
    question:
      "What should I know? Hanya sinyal terkompresi: perubahan, risiko, keputusan, outcome. Analisis mendalam ada di mode Fungsional.",
  },
  komisaris: {
    label: "MODE KOMISARIS — OVERSIGHT & CHALLENGE",
    question:
      "Did management deliver? Dashboard yang sama dibaca sebagai pertanyaan pengawasan: strategi tercapai, nilai terjaga, keputusan tepat waktu, janji terealisasi.",
  },
};

/**
 * Tiga arsitektur informasi untuk homepage — bukan tiga filter dari layout
 * yang sama. CEO = kompresi sinyal (Act & Decide); Fungsional = dekomposisi
 * analitik lengkap; Komisaris = pengawasan & tantangan. Mode mengikuti toggle
 * sidebar (useNavMode, persist localStorage); ketiga tree dirender server-side
 * dan dipilih di client.
 */
export function HomeViewSwitch({
  ceo,
  fungsional,
  komisaris,
}: {
  ceo: ReactNode;
  fungsional: ReactNode;
  komisaris: ReactNode;
}) {
  const { mode } = useNavMode();
  const band = MODE_BAND[mode];

  return (
    <>
      {band && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-3.5 py-2">
          <span className="shrink-0 rounded bg-white/15 px-1.5 py-[2px] text-[9px] font-extrabold tracking-[0.06em] text-white">
            {band.label}
          </span>
          <span className="min-w-0 text-[9px] leading-[1.35] text-white/75">{band.question}</span>
        </div>
      )}
      {mode === "ceo" ? ceo : mode === "komisaris" ? komisaris : fungsional}
    </>
  );
}
