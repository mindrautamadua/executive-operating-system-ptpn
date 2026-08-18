"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { hargaPupukTrend, pemupukan } from "@/lib/agro-data";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

function barTone(capaian: number | null) {
  if (capaian == null) return "bg-[#cbd5e1]";
  if (capaian >= 95) return "bg-ptpn-green";
  if (capaian >= 88) return "bg-[#f5a524]";
  return "bg-[#ef4444]";
}

export function PemupukanCard() {
  // Domain: program pemupukan NPK kebun sawit → milik PalmCo (bukan tebu/karet).
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "kebun sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Pemupukan: Realisasi vs Rencana" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">Aplikasi NPK per Semester (Rb Ton)</p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-2 flex flex-col gap-[7px]">
        {pemupukan.map((s) => {
          const pct = s.capaianPct;
          return (
            <div key={s.periode}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[8.5px] font-bold text-ink-700">{s.periode}</span>
                <span className="text-[8.5px] text-ink-500">
                  {s.realisasiRbTon != null ? (
                    <>
                      <span className="font-bold text-ink-900">{s.realisasiRbTon}</span>
                      {" / "}
                      {s.rencanaRbTon} rb ton ·{" "}
                      <span className="font-bold text-ink-900">
                        {pct?.toLocaleString("id-ID")}%
                      </span>
                    </>
                  ) : (
                    <>Rencana {s.rencanaRbTon} rb ton</>
                  )}
                </span>
              </div>
              <div className="mt-[3px] h-[6px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className={`h-full rounded-full ${barTone(pct)}`}
                  style={{ width: `${pct ?? 4}%` }}
                />
              </div>
              {s.note && (
                <p className="mt-[2px] truncate text-[7.5px] text-ink-400" title={s.note}>
                  {s.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[8.5px] font-bold text-ink-700">Tren Harga NPK</span>
        <span className="text-[8.5px] font-bold text-[#ef4444]">+25% YoY · Rp 9.820/kg</span>
      </div>
      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hargaPupukTrend} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
            <defs>
              <linearGradient id="agro-npk-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.red} stopOpacity="0.16" />
                <stop offset="100%" stopColor={PALETTE.red} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <XAxis dataKey="periode" hide />
            <YAxis domain={[7500, 10200]} hide />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}/kg`, "Harga NPK"]}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="hargaRpKg"
              stroke={PALETTE.red}
              strokeWidth={1.6}
              fill="url(#agro-npk-fill)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </>
      )}
    </div>
  );
}
