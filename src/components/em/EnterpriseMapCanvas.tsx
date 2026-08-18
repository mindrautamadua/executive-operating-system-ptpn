import Link from "next/link";
import { ArrowDown, ArrowRight, Compass, ShieldCheck, Users, Lightbulb } from "lucide-react";
import {
  controls,
  enablers,
  externalForces,
  mapReadingNotes,
  valueChain,
  type MapNode,
} from "@/lib/enterprise-map-data";

function NodeCard({ node, accent }: { node: MapNode; accent?: boolean }) {
  return (
    <Link
      href={node.href}
      className={`group block rounded-xl border px-3 py-2 transition-shadow hover:shadow-cardHover ${
        accent ? "border-[#bfe0cd] bg-[#f2faf5]" : "border-[#e3e9ef] bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          {node.label}
        </span>
        <ArrowRight
          size={10}
          className="shrink-0 text-ink-300 transition-transform group-hover:translate-x-[2px] group-hover:text-ptpn-green"
        />
      </div>
      <div className="mt-[3px] text-[9.5px] font-bold tabular-nums text-ink-900">{node.metric}</div>
      <p className="mt-[2px] text-[9px] leading-[1.35] text-ink-500">{node.role}</p>
    </Link>
  );
}

function RailCard({
  title,
  icon: Icon,
  nodes,
  toneCls,
}: {
  title: string;
  icon: typeof Users;
  nodes: MapNode[];
  toneCls: string;
}) {
  return (
    <div className="card flex flex-col px-3.5 pb-3 pt-2.5">
      <div className={`flex items-center gap-1.5 ${toneCls}`}>
        <Icon size={12} strokeWidth={1.9} />
        <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em]">{title}</span>
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-2">
        {nodes.map((n) => (
          <NodeCard key={n.label} node={n} />
        ))}
      </div>
    </div>
  );
}

/**
 * Kanvas Enterprise Map: rantai nilai inti di tengah (Strategi → Value
 * Creation), lingkungan eksternal di atas, enabler & control layer sebagai
 * rail yang bekerja di sepanjang rantai. Setiap node menaut ke modulnya —
 * map sekaligus navigasi "how the enterprise works".
 */
export function EnterpriseMapCanvas() {
  return (
    <div className="flex flex-col gap-3">
      {/* lingkungan eksternal */}
      <div className="card px-4 pb-3 pt-2.5">
        <div className="flex items-center gap-1.5 text-[#1b3a6b]">
          <Compass size={12} strokeWidth={1.9} />
          <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em]">
            Lingkungan Eksternal
          </span>
          <span className="text-[9px] italic text-ink-500">
            — kekuatan yang tidak dikendalikan PTPN, tetapi menggerakkan seluruh rantai.
          </span>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {externalForces.map((f) => (
            <Link
              key={f.kategori}
              href={f.href}
              className="group rounded-lg border border-[#e3e9ef] bg-[#fafcfd] px-2.5 py-1.5 transition-shadow hover:shadow-cardHover"
            >
              <span className="rounded bg-[#eef2f6] px-1 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-ink-500">
                {f.kategori}
              </span>
              <p className="mt-1 text-[8.5px] leading-[1.35] text-ink-700">{f.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center text-ink-300">
        <ArrowDown size={14} />
      </div>

      {/* rantai nilai + rail enabler/control */}
      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[240px_minmax(0,1fr)_240px]">
        <RailCard title="Enabler — People & Teknologi" icon={Users} nodes={enablers} toneCls="text-ptpn-green" />

        <div className="card px-4 pb-3.5 pt-2.5">
          <div className="text-center text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-[#1b3a6b]">
            Rantai Nilai Inti
          </div>
          <div className="mx-auto mt-2 flex max-w-[460px] flex-col items-stretch">
            {valueChain.map((n, i) => (
              <div key={n.label}>
                {i > 0 && (
                  <div className="flex justify-center py-[3px] text-ink-300">
                    <ArrowDown size={12} />
                  </div>
                )}
                <NodeCard node={n} accent={i === valueChain.length - 1} />
              </div>
            ))}
          </div>
        </div>

        <RailCard
          title="Control — Menjaga Nilai"
          icon={ShieldCheck}
          nodes={controls}
          toneCls="text-[#d98b06]"
        />
      </div>

      {/* cara membaca map */}
      <div className="anim-rise rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
        <div className="flex items-center gap-1.5 text-[#2f6fe4]">
          <Lightbulb size={12} strokeWidth={1.9} />
          <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em]">
            Cara Membaca Map Ini
          </span>
        </div>
        <ul className="mt-1.5 space-y-1">
          {mapReadingNotes.map((n) => (
            <li key={n} className="flex gap-1.5 text-[9px] leading-[1.45] text-ink-700">
              <span className="shrink-0 text-[#2f6fe4]">·</span>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
