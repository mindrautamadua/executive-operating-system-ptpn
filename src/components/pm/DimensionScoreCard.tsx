import { SectionHead } from "../hc/SectionHead";
import { pmDimensiLegend, pmDimensiRadar, pmDimensiTotal } from "@/lib/pm-data";

function RadarChart() {
  const W = 330;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2 + 2;
  const rMax = 84;
  const n = pmDimensiRadar.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });
  const poly = pmDimensiRadar
    .map((d, i) => {
      const p = pt(i, (d.skor / 100) * rMax);
      return `${p.x},${p.y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[360px]">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={Array.from({ length: n }, (_, i) => {
            const p = pt(i, rMax * f);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#eef2f6"
        />
      ))}
      {pmDimensiRadar.map((_, i) => {
        const p = pt(i, rMax);
        return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#eef2f6" strokeDasharray="2 3" />
        );
      })}
      <polygon points={poly} fill="#1a9c5b" fillOpacity={0.12} stroke="#1a9c5b" strokeWidth={1.6} />
      {pmDimensiRadar.map((d, i) => {
        const p = pt(i, (d.skor / 100) * rMax);
        return (
          <circle key={d.label} cx={p.x} cy={p.y} r={3} fill="#fff" stroke="#1a9c5b" strokeWidth={1.6} />
        );
      })}
      {pmDimensiRadar.map((d, i) => {
        const p = pt(i, rMax + 22);
        return (
          <g key={d.label}>
            <text x={p.x} y={p.y} textAnchor="middle" fontSize={9} fontWeight={700} fill="#374151">
              {d.label}
            </text>
            <text
              x={p.x}
              y={p.y + 11}
              textAnchor="middle"
              fontSize={9.5}
              fontWeight={800}
              fill="#1a9c5b"
            >
              {d.skor}
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={21} fontWeight={800} fill="#0f7a44">
        {pmDimensiTotal.skor}
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize={8} fill="#6b7280">
        Total Score
      </text>
      <text x={cx} y={cy + 19} textAnchor="middle" fontSize={8} fontWeight={700} fill="#0f7a44">
        ({pmDimensiTotal.kategori})
      </text>
    </svg>
  );
}

export function DimensionScoreCard() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3">
      <SectionHead title="People Math Dimension Score" />
      <div className="flex min-h-0 flex-1 items-center">
        <RadarChart />
      </div>
      <div className="flex items-center justify-center gap-4 border-t border-[#f0f3f6] pt-2.5">
        {pmDimensiLegend.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[8.5px] font-medium text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
