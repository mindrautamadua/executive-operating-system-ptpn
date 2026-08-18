"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { aiInsight } from "@/lib/data";
import { aiCopilot, aiInsightBridge, aiScenarios } from "@/lib/ceo-data";
import { questionSets } from "@/lib/question-engine-data";
import Link from "next/link";

/** Set pertanyaan konteks "Rekomendasi AI" dari Question Engine. */
const AI_CHALLENGE = questionSets.find((s) => s.context.startsWith("Rekomendasi AI"));

const SCENARIO_DOT = {
  green: "bg-[#22a45d]",
  amber: "bg-[#f5a524]",
  red: "bg-[#ef4444]",
} as const;

function RobotMascot() {
  return (
    <svg viewBox="0 0 120 130" className="h-full w-full animate-floaty">
      <defs>
        <linearGradient id="rb-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#dfeaf3" />
          <stop offset="100%" stopColor="#b9cbdb" />
        </linearGradient>
        <linearGradient id="rb-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3a4a" />
          <stop offset="100%" stopColor="#101c28" />
        </linearGradient>
        <linearGradient id="rb-eye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ef7e0" />
          <stop offset="100%" stopColor="#25c8b0" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <line x1="60" y1="8" x2="60" y2="20" stroke="#9db3c6" strokeWidth="3" />
      <circle cx="60" cy="7" r="5" fill="#5fd8ff" />
      {/* head */}
      <rect x="20" y="18" width="80" height="58" rx="22" fill="url(#rb-body)" />
      <rect x="29" y="28" width="62" height="38" rx="17" fill="url(#rb-face)" />
      <ellipse cx="47" cy="47" rx="8" ry="9" fill="url(#rb-eye)" />
      <ellipse cx="73" cy="47" rx="8" ry="9" fill="url(#rb-eye)" />
      <ellipse cx="45" cy="44" rx="2.6" ry="3" fill="#eafffb" />
      <ellipse cx="71" cy="44" rx="2.6" ry="3" fill="#eafffb" />
      {/* ears */}
      <rect x="12" y="38" width="9" height="18" rx="4" fill="#c3d4e2" />
      <rect x="99" y="38" width="9" height="18" rx="4" fill="#c3d4e2" />
      {/* body */}
      <rect x="30" y="76" width="60" height="40" rx="18" fill="url(#rb-body)" />
      <rect x="47" y="86" width="26" height="15" rx="7" fill="#dbe7f0" />
      <circle cx="60" cy="93.5" r="4" fill="#25c8b0" />
      {/* arms */}
      <rect x="14" y="80" width="14" height="26" rx="7" fill="#cdddea" />
      <rect x="92" y="80" width="14" height="26" rx="7" fill="#cdddea" />
      {/* shadow */}
      <ellipse cx="60" cy="122" rx="30" ry="5" fill="#8fb0c8" opacity="0.35" />
    </svg>
  );
}

export function AiInsight() {
  const [open, setOpen] = useState(true);
  /**
   * Dasar perhitungan disembunyikan di balik satu klik, bukan dibuang.
   * Rekomendasi bernilai rupiah yang tidak bisa dibongkar akan ditolak Direksi
   * pada pertanyaan pertama: "angka ini dari mana?".
   */
  const [buktiTerbuka, setBuktiTerbuka] = useState(false);

  if (!open) return <div />;

  if (buktiTerbuka) {
    return (
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[#dbeff0] bg-gradient-to-br from-[#eefaf7] via-[#f2fbf8] to-[#e6f4fb] px-3.5 pb-2 pt-2.5 shadow-card">
        <h3 className="card-title text-[#0e8f7e]">DASAR PERHITUNGAN</h3>

        <div className="scroll-thin mt-1 min-h-0 flex-1 overflow-y-auto pr-1">
          {/* Executive Challenge: sistem melatih bertanya sebelum menerima
              rekomendasi — Question Engine konteks "Rekomendasi AI". */}
          {AI_CHALLENGE && (
            <details className="mb-1.5 rounded-lg border border-[#d5ece7] bg-white/60 px-2 py-1.5">
              <summary className="cursor-pointer text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
                Executive Challenge — tanyakan dulu sebelum menerima
              </summary>
              <ol className="mt-1 space-y-[2px]">
                {AI_CHALLENGE.questions.map((q, i) => (
                  <li key={q} className="flex gap-1 text-[8.5px] leading-[1.35] text-ink-600">
                    <span className="shrink-0 font-bold text-[#0e8f7e]">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ol>
              <Link
                href="/executive-guide/pertanyaan-eksekutif"
                className="mt-1 inline-block text-[9px] font-bold text-[#0e8f7e] hover:underline"
              >
                Buka Question Engine lengkap →
              </Link>
            </details>
          )}
          <ol className="space-y-[3px]">
            {aiInsight.rantai.map((baris, i) => (
              <li key={baris} className="flex gap-1.5 text-[9px] leading-[1.35] text-ink-700">
                <span className="shrink-0 font-bold text-[#0e8f7e]">{i + 1}.</span>
                <span>{baris}</span>
              </li>
            ))}
          </ol>

          {/* Jembatan ekonomi: dari volume sampai laba bersih, baris per baris. */}
          <div className="mt-1.5 border-t border-[#d5ece7] pt-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
              Jembatan Ekonomi (Basis Disetahunkan)
            </div>
            <p className="mt-[2px] text-[9px] leading-[1.35] text-ink-500">
              Alert Regional 4 memakai basis YTD 5 bulan (Rp 374 M revenue · Rp 104 M EBITDA);
              jembatan ini menyetahunkan gap yang sama.
            </p>
            <div className="mt-[3px] space-y-[2px]">
              {aiInsightBridge.map((b) => (
                <div key={b.label} className="flex items-center justify-between gap-2">
                  <span className="truncate text-[8.5px] text-ink-500">{b.label}</span>
                  <span className="shrink-0 text-[8.5px] font-bold tabular-nums text-ink-900">
                    {b.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi tanpa asumsi & bukti akan ditolak pada pertanyaan kedua. */}
          <div className="mt-1.5 border-t border-[#d5ece7] pt-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
              Asumsi
            </div>
            <ul className="mt-[3px] space-y-[2px]">
              {aiCopilot.assumptions.map((a) => (
                <li key={a} className="flex gap-1 text-[8.5px] leading-[1.35] text-ink-500">
                  <span className="shrink-0 text-[#0e8f7e]">·</span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
              Bukti
            </div>
            <ul className="mt-[3px] space-y-[2px]">
              {aiCopilot.evidence.map((e) => (
                <li key={e} className="flex gap-1 text-[8.5px] leading-[1.35] text-ink-500">
                  <span className="shrink-0 text-[#0e8f7e]">·</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Skenario hasil: eksekusi penuh / sebagian / tanpa intervensi. */}
          <div className="mt-1.5 border-t border-[#d5ece7] pt-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
              Skenario
            </div>
            <div className="mt-[3px] space-y-[2px]">
              {aiScenarios.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${SCENARIO_DOT[s.tone]}`} />
                  <span className="min-w-0 flex-1 truncate text-[8.5px] text-ink-500" title={s.label}>
                    {s.label}
                  </span>
                  <span className="shrink-0 text-[8.5px] font-bold text-ink-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitivitas, alternatif, reversibility — rekomendasi harus bisa diadu. */}
          <div className="mt-1.5 border-t border-[#d5ece7] pt-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#0e8f7e]">
              Sensitivitas &amp; Alternatif
            </div>
            <p className="mt-[3px] text-[8.5px] leading-[1.35] text-ink-500">
              {aiCopilot.sensitivity}
            </p>
            <p className="mt-[3px] text-[8.5px] leading-[1.35] text-ink-500">
              {aiCopilot.alternative}
            </p>
            <p className="mt-[3px] text-[8.5px] leading-[1.35] text-ink-500">
              {aiCopilot.reversibility}
            </p>
          </div>

          {/* Rekomendasi masuk siklus aksi: pemilik, tenggat, status. */}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 border-t border-[#d5ece7] pt-1.5 text-[9px]">
            <span className="rounded bg-white/70 px-1.5 py-[2px] font-bold text-ink-700">
              Owner: {aiCopilot.owner}
            </span>
            <span className="rounded bg-white/70 px-1.5 py-[2px] font-bold text-ink-700">
              Tenggat: {aiCopilot.deadline}
            </span>
            <span className="rounded bg-white/70 px-1.5 py-[2px] font-bold text-ink-700">
              {aiCopilot.decisionRequired ? "Butuh keputusan BOD" : "Aksi manajemen"}
            </span>
            <span className="rounded bg-[#0e8f7e] px-1.5 py-[2px] font-bold text-white">
              {aiCopilot.status}
            </span>
            {/* Masa berlaku rekomendasi — lewat tanggal ini tanpa keputusan,
                status bergeser ke Needs Revalidation. */}
            <span className="rounded bg-white/70 px-1.5 py-[2px] font-semibold text-ink-500">
              Dibuat {aiCopilot.generated} · berlaku s.d. {aiCopilot.validThrough}
            </span>
            <span
              className={`rounded px-1.5 py-[2px] font-bold ${
                aiCopilot.validityStatus === "Active"
                  ? "bg-ptpn-greenLight text-ptpn-green"
                  : "bg-[#fdf3e0] text-[#d98b06]"
              }`}
            >
              {aiCopilot.validityStatus}
            </span>
          </div>
        </div>

        {/* Confidence dipecah: data ≠ model ≠ kausal ≠ rekomendasi — angka
            gabungan menyembunyikan mata rantai terlemah. */}
        <div className="mt-1 flex flex-wrap items-center gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
            Keyakinan
          </span>
          {aiCopilot.confidenceBreakdown.map((c) => (
            <span
              key={c.label}
              className={`rounded px-1 py-[1px] text-[7.5px] font-bold ${
                c.pct >= 85
                  ? "bg-ptpn-greenLight text-ptpn-green"
                  : c.pct >= 65
                    ? "bg-[#e8f1fd] text-[#2f6fe4]"
                    : "bg-[#fdf3e0] text-[#d98b06]"
              }`}
            >
              {c.label} {c.pct}%
            </span>
          ))}
        </div>
        <p className="mt-[3px] text-[9px] text-ink-500">
          Gabungan: {aiCopilot.confidencePct}% · {aiInsight.keyakinan}
        </p>

        <button
          onClick={() => setBuktiTerbuka(false)}
          className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#bfe4dd] py-[6px] text-[10px] font-bold text-[#0e8f7e] transition-colors hover:bg-white"
        >
          <ArrowLeft size={12} />
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[#dbeff0] bg-gradient-to-br from-[#eefaf7] via-[#f2fbf8] to-[#e6f4fb] px-3.5 pb-2.5 pt-2.5 shadow-card">
      <button
        onClick={() => setOpen(false)}
        className="absolute right-2.5 top-2.5 text-ink-400 hover:text-ink-700"
        aria-label="Tutup"
      >
        <X size={13} />
      </button>

      <h3 className="card-title text-[#0e8f7e]">AI INSIGHT</h3>

      <div className="mt-1 flex min-h-0 flex-1 items-center gap-2">
        <div className="h-[62px] w-[52px] shrink-0">
          <RobotMascot />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9.5px] font-medium text-[#0e8f7e]">Rekomendasi hari ini</p>
          <p className="mt-[2px] text-[10px] font-semibold leading-[1.3] text-ink-900">
            {aiInsight.judul}
          </p>
          <p className="mt-[3px] text-[9px] leading-[1.3] text-ink-500">
            {aiInsight.dampakLabel}:{" "}
            <span className="text-[10.5px] font-extrabold text-[#0e8f7e]">
              {aiInsight.dampak}
            </span>
          </p>
          {/*
            Prinsip governance guide (Evidence → Assumption → Confidence) tampil
            di muka card, bukan hanya di balik klik — rekomendasi tanpa badge
            keyakinan terbaca sebagai fakta.
          */}
          <div className="mt-[4px] flex flex-wrap items-center gap-1">
            <span className="rounded bg-[#0e8f7e]/10 px-1.5 py-[2px] text-[9px] font-bold text-[#0e8f7e]">
              Confidence {aiCopilot.confidencePct}%
            </span>
            <span className="rounded bg-white/70 px-1.5 py-[2px] text-[9px] font-bold text-ink-500">
              Bukti {aiCopilot.evidence.length}
            </span>
            <span className="rounded bg-white/70 px-1.5 py-[2px] text-[9px] font-bold text-ink-500">
              Asumsi {aiCopilot.assumptions.length}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setBuktiTerbuka(true)}
        className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#7ed957] to-[#1a9c5b] py-[7px] text-[10px] font-bold text-white shadow-pill transition-opacity hover:opacity-90"
      >
        Lihat dasar perhitungan
        <ArrowRight size={12} />
      </button>
    </div>
  );
}
