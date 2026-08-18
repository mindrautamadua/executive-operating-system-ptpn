import { aiRiskGuardrails } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<string, BadgeTone> = {
  Berlaku: "good",
  Draf: "warn",
  "Belum Ada": "bad",
};

export function AiRiskGuardrails() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Guardrail Risiko AI" action="Lihat Kebijakan" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kebijakan AI, Review Etik &amp; Perlindungan Data Pribadi · 2 Berlaku · 2 Draf · 1 Belum Ada
      </p>

      <div className="scroll-thin mt-2 grid min-h-0 flex-1 grid-cols-5 gap-2 overflow-y-auto">
        {aiRiskGuardrails.map((g) => (
          <div
            key={g.guardrail}
            className="flex flex-col rounded-xl border border-[#eef2f6] px-2.5 py-2"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[9px] font-bold leading-snug text-ink-900">{g.guardrail}</span>
              <ToneBadge label={g.status} tone={STATUS_TONE[g.status]} />
            </div>
            <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
              <span className="font-semibold text-ink-700">Cakupan:</span> {g.cakupan}
            </p>
            <p className="mt-[3px] text-[9px] leading-snug text-ink-500">
              <span className="font-semibold text-ink-700">Pemilik:</span> {g.pemilik}
            </p>
            <p className="mt-auto pt-1.5 text-[9px] leading-snug text-ink-500">{g.catatan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
