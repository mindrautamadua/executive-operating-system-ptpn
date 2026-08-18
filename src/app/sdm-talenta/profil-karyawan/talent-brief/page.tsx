import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { PtpnLogo } from "@/components/PtpnLogo";
import { PrintBriefButton } from "@/components/profil/PrintBriefButton";
import {
  capabilityProfile,
  executiveAssessment,
  hcActions,
  heroRingkas,
  peopleIntelligence,
  profil,
  talentRisk,
  talentSignal,
} from "@/lib/profil-data";

export const metadata = {
  title: "Executive Talent Brief — Rizky Putra — PTPN Group",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-ink-500">
      {children}
    </h2>
  );
}

/**
 * Executive Talent Brief — ringkasan 1 halaman untuk Talent Committee,
 * dirakit dari data profil yang sama (bukan dokumen terpisah).
 */
export default function TalentBriefPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] print:bg-white">
      <div className="mx-auto max-w-[820px] px-5 py-4">
        <div className="mb-3 flex items-center justify-between print:hidden">
          <Link
            href="/sdm-talenta/profil-karyawan"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-500 transition-colors hover:text-ptpn-green"
          >
            <ArrowLeft size={14} />
            Kembali ke Profil Karyawan
          </Link>
          <PrintBriefButton />
        </div>

        <div className="card px-6 py-5 print:border-0 print:shadow-none">
          {/* kop */}
          <div className="flex items-center justify-between border-b border-[#eef2f6] pb-3">
            <div className="flex items-center gap-2">
              <PtpnLogo size={20} />
              <div className="leading-none">
                <div className="text-[11px] font-extrabold text-[#1b3a6b]">
                  PTPN GROUP — Executive Operating System
                </div>
                <div className="mt-[3px] text-[9px] font-semibold text-ink-500">
                  EXECUTIVE TALENT BRIEF · Rahasia — untuk Talent Committee
                </div>
              </div>
            </div>
            <span className="text-[9px] text-ink-500">Data per 31 Mei 2026</span>
          </div>

          {/* identitas */}
          <div className="mt-4 flex items-center gap-4">
            <PersonAvatar seed={profil.seed} name={profil.nama} size={64} className="ring-2 ring-[#eef5f0]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[16px] font-extrabold tracking-tight text-ink-900">
                  {profil.nama}
                </h1>
                <span className="rounded-full bg-ptpn-green px-2 py-[2px] text-[7.5px] font-extrabold uppercase tracking-[0.06em] text-white">
                  High-Potential Talent
                </span>
              </div>
              <div className="mt-[3px] text-[10px] text-ink-700">
                {profil.jabatan} · {profil.unit} — {profil.lokasi}
              </div>
              <div className="mt-[2px] text-[9px] font-bold text-ink-900">{heroRingkas}</div>
            </div>
          </div>

          {/* assessment */}
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border-l-[3px] border-ptpn-green bg-ptpn-greenLight/60 px-3.5 py-2.5">
            <Quote size={12} className="mt-[1px] shrink-0 text-ptpn-green" />
            <p className="text-[9.5px] font-semibold leading-[1.55] text-ink-900">
              {executiveAssessment}
            </p>
          </div>

          {/* talent signal */}
          <div className="mt-4">
            <SectionTitle>Talent Signal</SectionTitle>
            <div className="mt-1.5 grid grid-cols-4 gap-2">
              {talentSignal.map((s) => (
                <div key={s.label} className="rounded-lg border border-[#eef2f6] px-2.5 py-1.5">
                  <div className="text-[7.5px] text-ink-500">{s.label}</div>
                  <div className="mt-[2px] text-[10px] font-extrabold text-ink-900">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* kekuatan & pengembangan */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <SectionTitle>Key Strengths</SectionTitle>
              <ul className="mt-1.5 space-y-1">
                {capabilityProfile.strengths.map((s) => (
                  <li key={s.label} className="flex justify-between text-[9px] text-ink-700">
                    <span>• {s.label}</span>
                    <span className="font-extrabold text-ink-900">{s.skor}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle>Development Priorities</SectionTitle>
              <ul className="mt-1.5 space-y-1">
                {capabilityProfile.gaps.map((g) => (
                  <li key={g.label} className="flex justify-between text-[9px] text-ink-700">
                    <span>• {g.label}</span>
                    <span className="font-extrabold text-ink-900">{g.skor}</span>
                  </li>
                ))}
                <li className="text-[8.5px] italic text-ink-500">
                  Critical: {capabilityProfile.criticalGap}
                </li>
              </ul>
            </div>
          </div>

          {/* people intelligence + risk */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <SectionTitle>People Intelligence</SectionTitle>
              <p className="mt-1.5 text-[9px] leading-[1.55] text-ink-700">
                {peopleIntelligence.interpretation}
              </p>
            </div>
            <div>
              <SectionTitle>Talent Risk</SectionTitle>
              <div className="mt-1.5 space-y-1">
                {talentRisk.items.map((r) => (
                  <div key={r.label} className="flex justify-between text-[9px]">
                    <span className="text-ink-500">{r.label}</span>
                    <span
                      className={`font-extrabold ${
                        r.level === "Low" ? "text-ptpn-greenDark" : "text-[#c07c05]"
                      }`}
                    >
                      {r.level}
                    </span>
                  </div>
                ))}
                <p className="pt-1 text-[8.5px] italic text-ink-500">
                  Primary: {talentRisk.primary}
                </p>
              </div>
            </div>
          </div>

          {/* rekomendasi suksesi + aksi */}
          <div className="mt-4">
            <SectionTitle>Succession Recommendation</SectionTitle>
            <p className="mt-1.5 rounded-lg bg-ptpn-greenLight/60 px-3 py-2 text-[9.5px] font-bold text-ink-900">
              {peopleIntelligence.recommendation}
            </p>
          </div>

          <div className="mt-4">
            <SectionTitle>Recommended HC Actions</SectionTitle>
            <div className="mt-1.5 grid grid-cols-1 gap-1">
              {hcActions.map((a, i) => (
                <div key={a.kategori} className="flex items-baseline gap-2 text-[9px]">
                  <span className="w-[14px] shrink-0 font-extrabold text-[#2f6fe4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-[76px] shrink-0 font-bold uppercase tracking-[0.04em] text-ink-500">
                    {a.kategori}
                  </span>
                  <span className="min-w-0 text-ink-900">{a.aksi}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#eef2f6] pt-2.5 text-[7.5px] text-ink-400">
            <span>
              Dihasilkan otomatis dari Executive Operating System · Sumber: HRIS, SMK, People Math,
              HPI BEM
            </span>
            <span>Dokumen rahasia — jangan disebarluaskan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
