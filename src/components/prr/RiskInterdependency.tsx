import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";

type NodeTone = "red" | "amber" | "navy";

const NODE_FILL: Record<NodeTone, { fill: string; text: string }> = {
  red: { fill: "#fdecec", text: "#ef4444" },
  amber: { fill: "#fdf3e0", text: "#d98b06" },
  navy: { fill: "#1b3a6b", text: "#ffffff" },
};

function Node({
  x,
  y,
  label,
  tone,
  w = 92,
}: {
  x: number;
  y: number;
  label: string;
  tone: NodeTone;
  w?: number;
}) {
  const { fill, text } = NODE_FILL[tone];
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={22} rx={7} fill={fill} />
      <text
        x={x}
        y={y + 14.5}
        textAnchor="middle"
        fontSize={9}
        fontWeight={800}
        fill={text}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * People Risk Interdependency: rantai risiko yang saling menguatkan
 * (amplification chain), bukan 10 risiko yang berdiri sendiri.
 */
export function RiskInterdependency({ showLink = true }: { showLink?: boolean } = {}) {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Interdependency" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rantai Risiko yang Saling Menguatkan (Amplification Chain)
      </p>

      <div className="mt-1 min-h-0 flex-1">
        <svg viewBox="0 0 320 204" className="h-full w-full" role="img">
          <defs>
            <marker
              id="prr-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#94a3b8" />
            </marker>
          </defs>

          <g stroke="#94a3b8" strokeWidth={1.3} markerEnd="url(#prr-arrow)">
            <line x1={160} y1={24} x2={160} y2={33} />
            <line x1={160} y1={58} x2={160} y2={67} />
            <line x1={134} y1={92} x2={82} y2={103} />
            <line x1={186} y1={92} x2={238} y2={103} />
            <line x1={82} y1={128} x2={134} y2={139} />
            <line x1={238} y1={128} x2={186} y2={139} />
            <line x1={160} y1={164} x2={160} y2={173} />
          </g>

          <Node x={160} y={2} label="Critical Skill Gap" tone="red" />
          <Node x={160} y={36} label="Produktivitas ↓" tone="amber" />
          <Node x={160} y={70} label="Beban Kerja ↑" tone="amber" />
          <Node x={78} y={106} label="Engagement ↓" tone="amber" />
          <Node x={242} y={106} label="Turnover ↑" tone="red" />
          <Node x={160} y={140} label="Succession Risk ↑" tone="red" />
          <Node x={160} y={174} label="Business Risk ↑" tone="navy" w={104} />
        </svg>
      </div>

      <div className="mt-1 flex items-center justify-between rounded-md bg-[#fdf7f7] px-2 py-[5px]">
        <span className="text-[9px] leading-[1.4] text-ink-700">
          Skill Gap → Produktivitas → Beban Kerja → Turnover → Succession
        </span>
        <span className="shrink-0 rounded-md bg-[#fdecec] px-1.5 py-[2px] text-[7.5px] font-extrabold text-[#ef4444]">
          Amplifikasi: HIGH
        </span>
      </div>

      {showLink && (
        <Link
          href="/people-risk-radar/interdependensi"
          className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
        >
          Lihat Rantai Risiko <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}
