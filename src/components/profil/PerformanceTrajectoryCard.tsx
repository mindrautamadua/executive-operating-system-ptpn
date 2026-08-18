import { TrendingUp } from "lucide-react";
import { performanceTrajectory } from "@/lib/profil-data";

function TrajectoryChart() {
  const { points } = performanceTrajectory;
  const W = 260;
  const H = 92;
  const padL = 26;
  const padR = 14;
  const padT = 12;
  const padB = 18;
  const min = 3.5;
  const max = 5;
  const x = (i: number) => padL + (i / (points.length - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.skor)}`).join(" ");
  const area = `${path} L${x(points.length - 1)},${H - padB} L${x(0)},${H - padB} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[4, 4.5, 5].map((g) => (
        <g key={g}>
          <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="#eef2f6" />
          <text x={padL - 4} y={y(g) + 2.5} fontSize={8} fill="#9ca3af" textAnchor="end">
            {g.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
          </text>
        </g>
      ))}
      <path d={area} fill="#1a9c5b" fillOpacity={0.1} />
      <path d={path} fill="none" stroke="#1a9c5b" strokeWidth={1.8} />
      {points.map((p, i) => (
        <g key={p.tahun}>
          <circle cx={x(i)} cy={y(p.skor)} r={2.8} fill="#fff" stroke="#1a9c5b" strokeWidth={1.6} />
          <text
            x={x(i)}
            y={y(p.skor) - 6}
            fontSize={8}
            fontWeight={800}
            fill="#0f7a44"
            textAnchor="middle"
          >
            {p.skor.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
          </text>
          <text x={x(i)} y={H - 5} fontSize={8} fill="#6b7280" textAnchor="middle">
            {p.tahun}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tren skor kinerja lima siklus — level vs arah (trajectory). */
export function PerformanceTrajectoryCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Performance Trajectory</h3>
      <div className="min-h-0 flex-1 pt-2">
        <TrajectoryChart />
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#f0f3f6] pt-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-ptpn-greenLight px-2 py-[3px] text-[8.5px] font-extrabold text-ptpn-greenDark">
          <TrendingUp size={10} strokeWidth={2.2} />
          Trajectory: {performanceTrajectory.label} ↑
        </span>
        <span className="text-[9px] font-bold text-ink-900">{performanceTrajectory.delta}</span>
        <span className="text-[8.5px] text-ink-500">{performanceTrajectory.rataRata3Thn}</span>
        <span className="text-[8.5px] text-ink-500">{performanceTrajectory.readiness}</span>
      </div>
    </div>
  );
}
