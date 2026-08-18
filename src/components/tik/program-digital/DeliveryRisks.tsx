import { deliveryRisks, type DeliveryRiskRow } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const SKALA_TONE: Record<DeliveryRiskRow["dampak"], BadgeTone> = {
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

const STATUS_TONE: Record<DeliveryRiskRow["status"], BadgeTone> = {
  Terbuka: "bad",
  "Dalam Mitigasi": "warn",
  Terkendali: "good",
};

/** Daftar risiko delivery program digital beserta mitigasi & owner. */
export function DeliveryRisks() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Risiko Delivery & Mitigasi" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Risiko Utama Program Digital · Dampak, Probabilitas &amp; Status Mitigasi
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {deliveryRisks.map((r) => (
          <div key={r.risiko} className="rounded-xl border border-[#eef2f6] px-3 pb-2.5 pt-2.5">
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[9.5px] font-bold text-ink-900">{r.risiko}</span>
              <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
            </div>

            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[9px] font-semibold text-ink-500">Dampak</span>
              <ToneBadge label={r.dampak} tone={SKALA_TONE[r.dampak]} />
              <span className="text-[9px] font-semibold text-ink-500">Probabilitas</span>
              <ToneBadge label={r.probabilitas} tone={SKALA_TONE[r.probabilitas]} />
            </div>

            <p className="mt-1.5 text-[8.5px] leading-snug text-ink-500">{r.mitigasi}</p>
            <div className="mt-1 text-[9px] font-semibold text-ink-500">Owner: {r.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
