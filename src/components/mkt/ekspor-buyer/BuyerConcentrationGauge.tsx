import { hhi } from "@/lib/kontrak-buyer-data";
import { PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";

/* Geometri gauge setengah lingkaran: skala HHI 0 – 3.000. */
const MAX = 3000;
const CX = 70;
const CY = 68;
const R = 52;
const ARC = Math.PI * R;
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/** Segmen ambang: rendah < 1.500, moderat 1.500–2.500, tinggi > 2.500. */
const ZONES = [
  { from: 0, to: 1500, color: PALETTE.green },
  { from: 1500, to: 2500, color: PALETTE.amber },
  { from: 2500, to: MAX, color: PALETTE.red },
];

/** Titik pada busur untuk nilai HHI tertentu, pada radius tertentu. */
function point(value: number, radius: number) {
  const rad = Math.PI * (1 - Math.min(value, MAX) / MAX);
  return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) };
}

const TARGET_VALUE = 1700;
const needle = point(hhi.value, 40);
const targetOuter = point(TARGET_VALUE, 58);
const targetInner = point(TARGET_VALUE, 45);

/** Gauge konsentrasi buyer (HHI) terhadap ambang kebijakan. */
export function BuyerConcentrationGauge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      {/* HHI dihitung atas seluruh portofolio buyer grup — indeks tingkat enterprise. */}
      <SectionHead title="Konsentrasi Buyer (HHI)" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Herfindahl–Hirschman Index atas share nilai per buyer
      </p>

      <div className="mt-1 grid min-h-0 flex-1 grid-cols-[minmax(0,52fr)_minmax(0,48fr)] gap-3">
        {/* Kiri: gauge */}
        <div className="flex min-w-0 flex-col items-center justify-center">
          <svg viewBox="0 0 140 82" className="w-full max-w-[150px]" role="img">
            <path d={ARC_PATH} fill="none" stroke="#eef2f6" strokeWidth={11} strokeLinecap="butt" />
            {ZONES.map((z) => (
              <path
                key={z.from}
                d={ARC_PATH}
                fill="none"
                stroke={z.color}
                strokeWidth={11}
                strokeLinecap="butt"
                strokeDasharray={`${((z.to - z.from) / MAX) * ARC} ${ARC}`}
                strokeDashoffset={-((z.from / MAX) * ARC)}
                opacity={0.85}
              />
            ))}
            {/* Penanda target < 1.700 */}
            <line
              x1={targetInner.x}
              y1={targetInner.y}
              x2={targetOuter.x}
              y2={targetOuter.y}
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              strokeDasharray="3 2"
            />
            {/* Jarum nilai aktual */}
            <line
              x1={CX}
              y1={CY}
              x2={needle.x}
              y2={needle.y}
              stroke={PALETTE.navy}
              strokeWidth={2.6}
              strokeLinecap="round"
            />
            <circle cx={CX} cy={CY} r={4} fill={PALETTE.navy} />
            <text x={CX - R} y={80} textAnchor="middle" style={{ fontSize: 8.5, fill: "#94a3b8" }}>
              0
            </text>
            <text x={CX + R} y={80} textAnchor="middle" style={{ fontSize: 8.5, fill: "#94a3b8" }}>
              3.000
            </text>
          </svg>

          <div className="-mt-1 flex flex-col items-center">
            <span className="text-[24px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {hhi.value.toLocaleString("id-ID")}
            </span>
            <span className="mt-1">
              <ToneBadge label={hhi.status} tone="warn" />
            </span>
          </div>
        </div>

        {/* Kanan: ambang kebijakan */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            Ambang Kebijakan
          </span>
          <ul className="mt-1.5 flex flex-col gap-1">
            {hhi.ambang.map((a, i) => (
              <li
                key={a.label}
                className="flex items-center justify-between gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-[4px]"
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <span
                    className="h-[6px] w-[6px] shrink-0 rounded-full"
                    style={{ background: ZONES[i]?.color ?? PALETTE.slate }}
                  />
                  <span className="truncate text-[8.5px] font-extrabold text-ink-900">
                    {a.label}
                  </span>
                </span>
                <span className="shrink-0 text-[9px] font-semibold text-ink-500">{a.batas}</span>
              </li>
            ))}
          </ul>

          <div className="mt-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2 py-[4px]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
              Target
            </span>
            <div className="text-[9px] font-extrabold text-ink-900">{hhi.target}</div>
          </div>

          <p className="mt-1.5 line-clamp-3 text-[9px] leading-snug text-ink-500" title={hhi.catatan}>
            {hhi.catatan}
          </p>
        </div>
      </div>
    </div>
  );
}
