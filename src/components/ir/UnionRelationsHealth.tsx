import { Handshake, Users } from "lucide-react";
import { RISK_STYLE } from "@/lib/ir-data";
import { unionHealth, unionIntelTotals, unionSentimentNote } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

/**
 * Union Relations Health: dari komposisi deskriptif menjadi kesehatan relasi —
 * sentimen, beban kasus, dan risiko per serikat + Bipartite Relationship Index.
 */
export function UnionRelationsHealth() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Union Relations Health" />

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfe] px-2.5 py-1.5">
          <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg bg-[#e8f1fd] text-[#2f6fe4]">
            <Users size={13} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[13px] font-extrabold text-ink-900">
              {unionIntelTotals.members}
            </span>
            <span className="block truncate text-[7.5px] text-ink-500">
              {unionIntelTotals.membersCaption} · {unionIntelTotals.unions} SP aktif
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#cde8da] bg-[#f2faf6] px-2.5 py-1.5">
          <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg bg-ptpn-greenLight text-ptpn-green">
            <Handshake size={13} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[13px] font-extrabold text-ink-900">
              {unionIntelTotals.bipartiteIndex}
              <span className="text-[9px] font-bold text-ink-500">/100</span>
            </span>
            <span className="block truncate text-[7.5px] text-ink-500">
              {unionIntelTotals.bipartiteCaption} · {unionIntelTotals.bipartiteNote}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_46px_36px_44px_52px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Serikat</span>
        <span className="text-right">Anggota</span>
        <span className="text-center">Kasus</span>
        <span className="text-center">Sentimen</span>
        <span className="text-center">Risiko</span>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col justify-around">
        {unionHealth.map((u) => (
          <li
            key={u.name}
            className="grid grid-cols-[minmax(0,1fr)_46px_36px_44px_52px] items-center gap-x-1.5 border-b border-[#f4f7fa] py-1 last:border-0"
          >
            <span className="truncate text-[9px] font-bold text-ink-800">{u.name}</span>
            <span className="text-right text-[8.5px] font-semibold tabular-nums text-ink-700">
              {u.members}
            </span>
            <span className="text-center text-[9px] font-extrabold text-ink-900">{u.cases}</span>
            <span className="text-center text-[9px] font-extrabold text-ink-900">
              {u.sentiment}
              <span
                className={`ml-[3px] text-[7.5px] font-bold ${
                  u.sentimentDelta.startsWith("-")
                    ? "text-[#ef4444]"
                    : u.sentimentDelta === "0"
                      ? "text-ink-400"
                      : "text-[#16a34a]"
                }`}
              >
                {u.sentimentDelta}
              </span>
            </span>
            <span className="text-center">
              <span
                className={`inline-block rounded-md px-1.5 py-[2px] text-[9px] font-bold ${RISK_STYLE[u.risk]}`}
              >
                {u.risk}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1 text-[7.5px] leading-[1.35] text-ink-500">{unionSentimentNote}</p>

      <PanelFooterLink label="Lihat Detail Serikat" />
    </div>
  );
}
