import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { GuideShell } from "@/components/guide/GuideShell";
import { FlowList, GuideCard, GuideTitle } from "@/components/guide/GuideBlocks";
import { GUIDE_INTRO, GUIDE_TAGLINE, guideLandingCards, readingJourney } from "@/lib/guide-data";

export const metadata = { title: "Executive Guide — PTPN Group" };

export default function ExecutiveGuidePage() {
  return (
    <GuideShell
      title="Executive Guide"
      subtitle="How to Read Signals, Understand Business Impact, and Make Better Executive Decisions"
      active="/executive-guide"
    >
      {/* hero */}
      <GuideCard className="bg-gradient-to-r from-[#1b3a6b] to-[#24518f] !border-transparent">
        <div className="text-[15px] font-extrabold tracking-tight text-white">{GUIDE_TAGLINE}</div>
        <p className="mt-1.5 max-w-[640px] text-[10px] leading-relaxed text-white/75">
          {GUIDE_INTRO}
        </p>
      </GuideCard>

      {/* pintu masuk per bab */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {guideLandingCards.map((c) => (
          <Link key={c.num} href={c.href} className="group">
            <GuideCard className="flex h-full flex-col transition-shadow group-hover:shadow-lg">
              <div className="flex items-baseline justify-between">
                <span className="text-[22px] font-extrabold tracking-tight text-[#dbe5f1]">
                  {c.num}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-ptpn-green">
                  {c.tag}
                </span>
              </div>
              <div className="mt-1 text-[12px] font-extrabold text-[#1b3a6b]">{c.title}</div>
              <p className="mt-1 flex-1 text-[9px] leading-relaxed text-ink-500">{c.desc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-ptpn-green">
                Mulai baca
                <ArrowRight size={10} className="transition-transform group-hover:translate-x-[2px]" />
              </span>
            </GuideCard>
          </Link>
        ))}
      </div>

      {/* executive reading journey */}
      <GuideCard>
        <GuideTitle kicker="Halaman terpenting">Executive Management Loop</GuideTitle>
        <p className="mb-3 text-[9.5px] leading-relaxed text-ink-500">
          Sembilan pertanyaan yang sama untuk membaca dashboard mana pun — dari perubahan sampai
          outcome keputusan. Setiap langkah membawa Anda ke bagian dashboard terkait. Versi
          ringkasnya adalah <span className="font-bold text-ink-700">Executive Scan</span> (Baca
          60 Detik): enam langkah pertama, berhenti di keputusan &amp; aksi — loop penuh ini
          melanjutkannya sampai <span className="font-bold text-ink-700">outcome</span>.
        </p>
        <div className="mx-auto max-w-[560px]">
          <FlowList
            items={readingJourney.map((s, i) => ({
              lead: String(i + 1),
              title: s.q,
              desc: s.desc,
              href: s.href,
              hrefLabel: s.hrefLabel,
            }))}
          />
        </div>
      </GuideCard>

      <div className="anim-rise flex items-center gap-2 rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
        <Info size={13} className="shrink-0 text-[#2f6fe4]" />
        <span className="text-[9px] text-ink-700">
          Definisi setiap metrik tidak diulang di guide ini — gunakan{" "}
          <Link href="/data-dictionary" className="font-bold text-[#2f6fe4] hover:underline">
            Data Dictionary
          </Link>{" "}
          sebagai satu-satunya sumber definisi.
        </span>
      </div>
    </GuideShell>
  );
}
