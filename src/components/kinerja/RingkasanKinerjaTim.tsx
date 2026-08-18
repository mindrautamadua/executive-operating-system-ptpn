"use client";

import { BarChart3, UserRound } from "lucide-react";
import { kinerjaTim } from "@/lib/kinerja-data";
import { SEMANTIC } from "@/lib/chart-palette";
import { Delta } from "../ui/Delta";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

const HEAD = [
  "Tim / Departemen",
  "Unit Organisasi",
  "Rata-rata Score",
  "On Target & Above",
  "High Performer",
  "Below Target",
  "Distribusi",
  "Trend vs Q1 2026",
  "Aksi",
];

/** micro-bar distribusi: High / On Target (non-high) / Below / sisanya */
function DistribusiBar({
  onTarget,
  high,
  below,
  delay,
}: {
  onTarget: string;
  high: string;
  below: string;
  delay: number;
}) {
  const on = parseInt(onTarget, 10);
  const hi = parseInt(high, 10);
  const bl = parseInt(below, 10);
  const segs = [
    { w: hi, color: SEMANTIC.good, label: `High Performer ${high}` },
    { w: Math.max(on - hi, 0), color: SEMANTIC.goodSoft, label: `On Target ${onTarget}` },
    { w: bl, color: SEMANTIC.bad, label: `Below Target ${below}` },
  ];
  const rest = Math.max(100 - segs.reduce((s, x) => s + x.w, 0), 0);
  return (
    <span
      className="anim-grow-x mx-auto flex h-[6px] w-[86px] overflow-hidden rounded-full bg-[#eef2f6]"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      title={`High ${high} · On Target ${onTarget} · Below ${below}`}
    >
      {segs.map(
        (s) =>
          s.w > 0 && (
            <span key={s.label} className="h-full" style={{ width: `${s.w}%`, background: s.color }} />
          ),
      )}
      {rest > 0 && <span className="h-full" style={{ width: `${rest}%` }} />}
    </span>
  );
}

export function RingkasanKinerjaTim() {
  const { active, isFiltered, def } = useSubholding();
  // Tiap tim melekat pada unit organisasinya; tim di luar subholding aktif
  // diredupkan agar sebaran score antar tim tetap punya konteks pembanding.

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">RINGKASAN KINERJA TIM</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        {isFiltered
          ? `Performa Tim berdasarkan Rata-rata Score — tim ${def.label} disorot`
          : "Performa Tim berdasarkan Rata-rata Score"}
      </p>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6]">
            {HEAD.map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap px-2 pb-2 text-[9px] font-semibold text-ink-500 ${
                  i < 2 ? "text-left" : "text-center"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {kinerjaTim.map((r, i) => (
            <tr
              key={r.tim}
              className="border-b border-[#f4f7fa] transition-[background-color,opacity] last:border-0 hover:bg-[#f7f9fb]"
              style={{ opacity: orgDim(active, r.unit) }}
            >
              <td className="whitespace-nowrap px-2 py-[6px] text-[10px] text-ink-900">
                {r.tim}
              </td>
              <td className="whitespace-nowrap px-2 text-[10px] text-ink-700">{r.unit}</td>
              <td className="px-2 text-center text-[10px] font-bold tabular-nums text-ink-900">
                {r.score}
              </td>
              <td className="px-2 text-center text-[10px] tabular-nums text-ink-700">
                {r.onTarget}
              </td>
              <td className="px-2 text-center text-[10px] tabular-nums text-ink-700">
                {r.high}
              </td>
              <td className="px-2 text-center text-[10px] tabular-nums text-ink-700">
                {r.below}
              </td>
              <td className="px-2">
                <DistribusiBar
                  onTarget={r.onTarget}
                  high={r.high}
                  below={r.below}
                  delay={i * 60}
                />
              </td>
              <td className="px-2">
                <Delta value={r.trend} trend="up" size={9.5} className="justify-center" />
              </td>
              <td className="px-2">
                <span className="flex items-center justify-center gap-2">
                  <button
                    className="flex h-[24px] w-[24px] items-center justify-center rounded-md border border-[#e3e9ef] text-ink-500 transition-colors hover:bg-[#f5f8fa] hover:text-ptpn-green"
                    aria-label="Lihat detail"
                  >
                    <BarChart3 size={11} />
                  </button>
                  <button
                    className="flex h-[24px] w-[24px] items-center justify-center rounded-md border border-[#e3e9ef] text-ink-500 transition-colors hover:bg-[#f5f8fa] hover:text-ptpn-green"
                    aria-label="Lihat anggota"
                  >
                    <UserRound size={11} />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
