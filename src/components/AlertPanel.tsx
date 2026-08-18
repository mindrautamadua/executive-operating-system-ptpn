import { AlertTriangle, TriangleAlert, Lightbulb } from "lucide-react";
import { alerts } from "@/lib/data";
import { DetailLink } from "./DetailLink";

const TONE = {
  danger: { text: "#dc2626", bg: "#fee2e2", Icon: AlertTriangle },
  warning: { text: "#ea9a1a", bg: "#fef3c7", Icon: TriangleAlert },
  info: { text: "#2f7de1", bg: "#dbeafe", Icon: Lightbulb },
} as const;

export function AlertPanel() {
  return (
    <div className="card flex shrink-0 flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-center justify-between">
        <h3 className="card-title">ALERT &amp; NOTIFIKASI STRATEGIS</h3>
        <DetailLink href="/risiko-kepatuhan" />
      </div>

      <div className="mt-1.5 flex flex-col">
        {alerts.map((a, i) => {
          const t = TONE[a.tone];
          return (
            <div
              key={a.title}
              className={`flex gap-2.5 py-[8px] ${
                i !== 0 ? "border-t border-[#f2f5f8]" : ""
              }`}
            >
              <span
                className="mt-[1px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-md"
                style={{ background: t.bg }}
              >
                <t.Icon size={13} strokeWidth={2} style={{ color: t.text }} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-[9.5px] font-bold tracking-[0.04em]"
                    style={{ color: t.text }}
                  >
                    {a.level}
                  </span>
                  <span className="shrink-0 text-[9px] text-ink-500">{a.time}</span>
                </div>
                <p className="mt-[2px] text-[10.5px] font-semibold leading-[1.3] text-ink-900">
                  {a.title}
                </p>

                {/*
                  Dampak dulu, baru aksi. Alert tanpa angka tidak bisa
                  diprioritaskan terhadap alert lain, dan aksi tanpa pemilik
                  tidak pernah selesai — keduanya ditampilkan, bukan disimpan
                  di halaman detail.
                */}
                <div
                  className="mt-[3px] flex items-baseline gap-1.5 text-[9.5px] leading-[1.3]"
                  title={a.dampak.basis}
                >
                  <span className="shrink-0 text-ink-500">{a.dampak.label}:</span>
                  <span className="font-bold" style={{ color: t.text }}>
                    {a.dampak.value}
                  </span>
                </div>
                <p className="mt-[1px] truncate text-[9px] leading-[1.3] text-ink-500">
                  {a.dampak.basis}
                </p>

                <p className="mt-[3px] text-[9.5px] leading-[1.35] text-ink-700">
                  Aksi: {a.aksi}
                </p>
                <p className="mt-[1px] text-[9px] leading-[1.3] text-ink-500">
                  {a.owner} · tenggat {a.tenggat}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
