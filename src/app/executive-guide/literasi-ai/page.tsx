import { GuideShell } from "@/components/guide/GuideShell";
import { FlowList, GuideCard, GuideTitle, QaRow } from "@/components/guide/GuideBlocks";
import { AiMeta } from "@/components/shared/AiMeta";
import {
  aiMetaExamples,
  aiPrinciple,
  aiQuestions,
  aiRules,
  literacyLadder,
} from "@/lib/guide-data";

export const metadata = { title: "Literasi AI — Executive Guide" };

export default function LiterasiAiPage() {
  return (
    <GuideShell
      title="Decision Literacy & How to Read AI"
      subtitle="Membedakan informasi, sinyal, insight, risiko, rekomendasi, dan keputusan"
      active="/executive-guide/literasi-ai"
    >
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
        {/* tangga literasi */}
        <GuideCard>
          <GuideTitle kicker="Decision literacy">
            Tangga dari Informasi ke Keputusan
          </GuideTitle>
          <p className="mb-3 text-[9.5px] leading-relaxed text-ink-500">
            Inti filosofi Executive Operating System: enam tingkat yang tidak boleh saling menyamar.
            Contoh dengan harga CPO (angka dari data dashboard):
          </p>
          <FlowList
            items={literacyLadder.map((l) => ({
              lead: l.level,
              title: l.example,
              desc: l.desc,
            }))}
          />
        </GuideCard>

        <div className="flex flex-col gap-3">
          {/* prinsip + 4 pertanyaan */}
          <GuideCard>
            <GuideTitle kicker="How to read AI">{aiPrinciple}</GuideTitle>
            <p className="mb-2 text-[9.5px] leading-relaxed text-ink-500">
              Sebelum menerima rekomendasi AI, jawab empat pertanyaan:
            </p>
            <div>
              {aiQuestions.map((q) => (
                <QaRow key={q.q} q={q.q} a={q.desc} />
              ))}
            </div>
          </GuideCard>

          {/* 4 aturan */}
          <GuideCard>
            <GuideTitle kicker="Aturan dasar">Empat Ketidaksamaan</GuideTitle>
            <div>
              {aiRules.map((r) => (
                <QaRow key={r.rule} q={r.rule} a={r.desc} />
              ))}
            </div>
          </GuideCard>
        </div>
      </div>

      {/* badge AiMeta */}
      <GuideCard>
        <GuideTitle kicker="Kenali badge ini">Membaca Badge Klaim Analitik (AiMeta)</GuideTitle>
        <p className="mb-3 text-[9.5px] leading-relaxed text-ink-500">
          Setiap insight utama di aplikasi membawa badge jenis klaim, keyakinan, dan bukti —
          badge yang sama persis dengan contoh di bawah. Jenis klaim menentukan cara membacanya:
        </p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {aiMetaExamples.map((e) => (
            <div
              key={e.meta.jenis}
              className="rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-3 py-2"
            >
              <AiMeta {...e.meta} />
              <div className="mt-1.5 text-[9px] leading-relaxed text-ink-700">{e.reading}</div>
            </div>
          ))}
        </div>
      </GuideCard>
    </GuideShell>
  );
}
