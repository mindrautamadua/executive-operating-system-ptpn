"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { sumberNote, sumberPemenuhan } from "@/lib/wp-data";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { NotePill } from "./NotePill";

const RAD = Math.PI / 180;

/** Label persentase di dalam slice donut. */
function renderPctLabel(props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  index?: number;
}) {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    index = 0,
  } = props;
  const r = (innerRadius + outerRadius) / 2;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize={9}
      fontWeight={800}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {sumberPemenuhan[index].pct}
    </text>
  );
}

export function SumberPemenuhan() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Sumber Pemenuhan Kebutuhan Talenta (2026-2028)" />

      <div className="flex min-h-0 flex-1 items-center gap-4">
        <div className="relative shrink-0" style={{ width: 158, height: 158 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie isAnimationActive={false}
                data={sumberPemenuhan}
                dataKey="value"
                nameKey="name"
                innerRadius={42}
                outerRadius={73}
                paddingAngle={2}
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
                animationBegin={200}
                animationDuration={700}
                label={renderPctLabel}
                labelLine={false}
                activeIndex={active ?? undefined}
                activeShape={(props: { outerRadius?: number }) => (
                  <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 4} />
                )}
                onMouseEnter={(_, i) => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {sumberPemenuhan.map((d, i) => (
                  <Cell
                    key={d.name}
                    fill={d.color}
                    opacity={active === null || active === i ? 1 : 0.35}
                    style={{ transition: "opacity .2s" }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [
                  `${v.toLocaleString("id-ID")} orang`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0 flex-1">
          {sumberPemenuhan.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[4px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{d.orang}</span>
            </div>
          ))}
        </div>
      </div>

      <NotePill icon={ShieldCheck} text={sumberNote} />
    </div>
  );
}
