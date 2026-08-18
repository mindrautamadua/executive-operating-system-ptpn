import Link from "next/link";
import {
  ArrowRight,
  Book,
  BookOpen,
  Bot,
  Check,
  Crosshair,
  Flame,
  Heart,
  Info,
  Leaf,
  MoreHorizontal,
  Quote,
  Star,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import {
  peopleMathCore,
  peopleMathDimensi,
  peopleMathInsight,
  peopleMathOverall,
  peopleMathPosisi,
  peopleMathRadar,
  peopleMathTalent,
} from "@/lib/profil-data";

const DIMENSI_IKON: Record<string, typeof Users> = {
  users: Users,
  heart: Heart,
  flame: Flame,
  wrench: Wrench,
  book: Book,
  bookOpen: BookOpen,
  userCheck: UserCheck,
  leaf: Leaf,
  circle: MoreHorizontal,
};

/* Kelas kartu/chip/teks per tone dimensi (pasangan gelap di globals.css). */
const DIMENSI_TONE: Record<string, { card: string; chip: string; text: string }> = {
  green: { card: "career-green", chip: "tone-green", text: "text-[#16a34a]" },
  rose: { card: "career-rose", chip: "tone-rose", text: "text-[#be3450]" },
  amber: { card: "career-amber", chip: "tone-amber", text: "text-[#d97706]" },
  blue: { card: "career-blue", chip: "tone-blue", text: "text-[#3b7ded]" },
  purple: { card: "career-purple", chip: "tone-purple", text: "text-[#8b5cf6]" },
  slate: { card: "career-slate", chip: "tone-slate", text: "text-[#64748b]" },
};

/* ── People Math Score (Overall) ────────────────────────── */

function DonutOverall() {
  const size = 128;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f6" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a9c5b"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(c * peopleMathOverall.skor) / 100} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[30px] font-extrabold text-ink-900">{peopleMathOverall.skor}</span>
        <span className="mt-1 text-[9px] text-ink-500">{peopleMathOverall.maks}</span>
      </div>
    </div>
  );
}

function ScoreOverallCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        People Math Score (Overall) <Info size={11} className="text-ink-400" />
      </h3>
      <div className="flex min-h-0 flex-1 items-center gap-4 py-3">
        <DonutOverall />
        <div className="min-w-0 flex-1 space-y-1.5">
          {peopleMathOverall.ringkasan.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px]"
            >
              <span className="text-[9px] font-medium text-ink-500">{r.label}</span>
              <span
                className={`text-[9px] font-bold ${r.badge ? "text-ptpn-greenDark" : "text-ink-900"}`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="rounded-lg bg-[#f5f8fa] px-3 py-2 text-[8.5px] leading-relaxed text-ink-500">
        {peopleMathOverall.catatan}
      </p>
    </div>
  );
}

/* ── 1. CORE ────────────────────────────────────────────── */

function PositioningChart() {
  const W = 250;
  const H = 190;
  const padL = 34;
  const padR = 8;
  const padT = 20;
  const padB = 26;
  const x = (v: number) => padL + (v / 100) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / 100) * (H - padT - padB);
  const midX = x(50);
  const midY = y(50);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="min-w-0 flex-1">
      <rect
        x={padL}
        y={padT}
        width={W - padL - padR}
        height={H - padT - padB}
        fill="none"
        stroke="#eef2f6"
      />
      <line x1={midX} y1={padT} x2={midX} y2={H - padB} stroke="#d7dee6" strokeDasharray="3 3" />
      <line x1={padL} y1={midY} x2={W - padR} y2={midY} stroke="#d7dee6" strokeDasharray="3 3" />
      <text x={padL + 6} y={padT + 12} fontSize={8} fill="#6b7280">
        <tspan x={padL + 6}>High Performer</tspan>
        <tspan x={padL + 6} dy={8}>Low Capability</tspan>
      </text>
      <text x={W - padR - 6} y={padT + 12} fontSize={8} fontWeight={700} fill="#16a34a" textAnchor="end">
        <tspan x={W - padR - 6}>High Performer</tspan>
        <tspan x={W - padR - 6} dy={8}>High Capability</tspan>
      </text>
      <text x={padL + 6} y={H - padB - 14} fontSize={8} fontWeight={700} fill="#dc2626">
        <tspan x={padL + 6}>Low Performer</tspan>
        <tspan x={padL + 6} dy={8}>Low Capability</tspan>
      </text>
      <text x={W - padR - 6} y={H - padB - 14} fontSize={8} fill="#6b7280" textAnchor="end">
        <tspan x={W - padR - 6}>Low Performer</tspan>
        <tspan x={W - padR - 6} dy={8}>High Capability</tspan>
      </text>
      {/* Titik posisi karyawan */}
      <g transform={`translate(${x(peopleMathPosisi.capability)}, ${y(peopleMathPosisi.performance)})`}>
        <path
          d="M0,-6 L1.8,-1.8 L6,-1.4 L2.8,1.4 L3.7,6 L0,3.4 L-3.7,6 L-2.8,1.4 L-6,-1.4 L-1.8,-1.8 Z"
          fill="#1a9c5b"
        />
        {/* Titik dekat sudut kanan-atas — label ditaruh di kiri agar tidak terpotong. */}
        <text x={-4} y={16} fontSize={8} fontWeight={700} fill="#1a9c5b" textAnchor="end">
          {peopleMathPosisi.nama}
        </text>
      </g>
      <text
        x={12}
        y={(padT + H - padB) / 2}
        fontSize={8}
        fill="#9ca3af"
        textAnchor="middle"
        transform={`rotate(-90 12 ${(padT + H - padB) / 2})`}
        letterSpacing="0.08em"
      >
        PERFORMANCE
      </text>
      <text x={(padL + W - padR) / 2} y={H - 4} fontSize={8} fill="#9ca3af" textAnchor="middle" letterSpacing="0.08em">
        CAPABILITY
      </text>
      <text x={padL - 4} y={padT + 4} fontSize={8} fill="#6b7280" textAnchor="end">High</text>
      <text x={padL - 4} y={H - padB + 2} fontSize={8} fill="#6b7280" textAnchor="end">Low</text>
      <text x={padL} y={H - padB + 10} fontSize={8} fill="#6b7280">Low</text>
      <text x={W - padR} y={H - padB + 10} fontSize={8} fill="#6b7280" textAnchor="end">High</text>
    </svg>
  );
}

function CoreCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">1. CORE (2 Score Utama)</h3>
      <div className="flex min-h-0 flex-1 flex-col gap-4 pt-2 md:flex-row md:items-center">
        <div className="grid w-full shrink-0 grid-cols-2 gap-3 md:w-[290px]">
          {peopleMathCore.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center rounded-xl border border-[#eef2f6] px-3 py-4 text-center"
            >
              <div className="text-[9.5px] font-bold text-ink-900">{c.label}</div>
              <div className="mt-2 text-[30px] font-extrabold leading-none text-[#3b7ded]">
                {c.skor}
              </div>
              <div className="mt-1 text-[8.5px] text-ink-400">/ 100</div>
              <p className="mt-2.5 text-[8.5px] leading-snug text-ink-500">{c.deskripsi}</p>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="text-center text-[9.5px] font-bold text-ink-900">
            People Math Positioning
          </div>
          <PositioningChart />
        </div>
      </div>
    </div>
  );
}

/* ── 2. PEOPLE FACTORS ──────────────────────────────────── */

function RadarChart() {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const rMax = 92;
  const n = peopleMathRadar.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });
  const poly = peopleMathRadar
    .map((d, i) => {
      const p = pt(i, (d.skor / 100) * rMax);
      return `${p.x},${p.y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[330px]">
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
      {peopleMathRadar.map((_, i) => {
        const p = pt(i, rMax);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#eef2f6" strokeDasharray="2 3" />;
      })}
      <polygon points={poly} fill="#1a9c5b" fillOpacity={0.14} stroke="#1a9c5b" strokeWidth={1.6} />
      {peopleMathRadar.map((d, i) => {
        const p = pt(i, (d.skor / 100) * rMax);
        return <circle key={d.label} cx={p.x} cy={p.y} r={3} fill="#fff" stroke="#1a9c5b" strokeWidth={1.6} />;
      })}
      {peopleMathRadar.map((d, i) => {
        const p = pt(i, rMax + 20);
        return (
          <g key={d.label}>
            <text x={p.x} y={p.y} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#374151">
              {d.label}
            </text>
            <text x={p.x} y={p.y + 10} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#1a9c5b">
              {d.skor}
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy - 1} textAnchor="middle" fontSize={22} fontWeight={800} fill="#0f7a44">
        {peopleMathOverall.skor}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={8} fill="#6b7280">
        /100
      </text>
    </svg>
  );
}

function DimensiCard({ d }: { d: (typeof peopleMathDimensi)[number] }) {
  const Ikon = DIMENSI_IKON[d.ikon] ?? MoreHorizontal;
  const tone = DIMENSI_TONE[d.tone] ?? DIMENSI_TONE.slate;
  return (
    <div className={`rounded-xl border p-2.5 ${tone.card}`}>
      <div className="flex items-center gap-2">
        <span
          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg ${tone.chip}`}
        >
          <Ikon size={12} />
        </span>
        <div className="leading-tight">
          <div className="text-[9px] font-bold text-ink-900">{d.label}</div>
          <div className={`text-[8.5px] font-bold ${tone.text}`}>
            {d.skorLabel ?? `${d.skor}/100`}
          </div>
        </div>
      </div>
      {d.rincian.length > 0 ? (
        <div className="mt-2 space-y-1">
          {d.rincian.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-2">
              <span className="truncate text-[8.5px] text-ink-500">{r.label}</span>
              <span className="text-[8.5px] font-bold text-ink-900">{r.skor}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[8.5px] leading-snug text-ink-500">{d.deskripsi}</p>
      )}
    </div>
  );
}

function PeopleFactorsCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">
        2. PEOPLE FACTORS (19 Derivative Scores)
      </h3>
      <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-4 pt-2 lg:grid-cols-[minmax(0,380fr)_minmax(0,560fr)]">
        <RadarChart />
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-ink-900">Detail per Dimensi</span>
            <Link
              href="/sdm-talenta/profil-karyawan/people-factors"
              className="link-more inline-flex items-center gap-1"
            >
              Lihat Semua <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {peopleMathDimensi.map((d) => (
              <DimensiCard key={d.label} d={d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. PEOPLE MATH INSIGHT ─────────────────────────────── */

function InsightCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">3. PEOPLE MATH INSIGHT</h3>
      <div className="mt-2.5 rounded-xl bg-ptpn-greenLight p-3">
        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-ptpn-greenDark">
          <Bot size={13} /> AI Insight
        </div>
        <p className="mt-1.5 text-[9px] leading-relaxed text-ink-700">
          {peopleMathInsight.aiInsight}
        </p>
      </div>
      <div className="mt-2.5 rounded-xl bg-[#eef4ff] p-3">
        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#3b7ded]">
          <Crosshair size={13} /> Development Focus
        </div>
        <p className="mt-1.5 text-[9px] leading-relaxed text-ink-700">
          {peopleMathInsight.developmentFocus}
        </p>
      </div>
      <div className="mt-3">
        <div className="text-[9.5px] font-bold text-ink-900">Strength</div>
        <div className="mt-1.5 space-y-1.5">
          {peopleMathInsight.strength.map((s) => (
            <div key={s} className="flex items-start gap-1.5">
              <Check size={11} className="mt-[1px] shrink-0 text-[#16a34a]" />
              <span className="text-[9px] leading-snug text-ink-700">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[9.5px] font-bold text-ink-900">Opportunity</div>
        <div className="mt-1.5 space-y-1.5">
          {peopleMathInsight.opportunity.map((o) => (
            <div key={o} className="flex items-start gap-1.5">
              <span className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#f59e0b]" />
              <span className="text-[9px] leading-snug text-ink-700">{o}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[9.5px] font-bold text-ink-900">Rekomendasi Aksi</div>
        <div className="mt-1.5 space-y-1.5">
          {peopleMathInsight.rekomendasi.map((r, i) => (
            <div
              key={r}
              className="flex items-start gap-2 rounded-lg border border-[#eef2f6] px-2.5 py-2"
            >
              <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[8.5px] font-bold text-[#3b7ded]">
                {i + 1}
              </span>
              <span className="text-[8.5px] leading-snug text-ink-700">{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-start gap-2 rounded-lg bg-ptpn-greenLight px-3 py-2.5 pt-2.5">
        <Quote size={12} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[8.5px] font-medium leading-snug text-ink-700">
          {peopleMathInsight.kutipan}
        </p>
      </div>
    </div>
  );
}

/* ── 4. PEOPLE MATH × TALENT DECISION ───────────────────── */

function TrendChart() {
  const W = 300;
  const H = 128;
  const padL = 26;
  const padR = 14;
  const padT = 18;
  const padB = 18;
  const tren = peopleMathTalent.tren;
  const x = (i: number) => padL + (i / (tren.length - 1)) * (W - padL - padR);
  const y = (skor: number) => padT + (1 - skor / 100) * (H - padT - padB);
  const pts = tren.map((t, i) => ({ ...t, x: x(i), y: y(t.skor) }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padL},${H - padB} ${line} ${W - padR},${H - padB}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="peopleMathTrenFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a9c5b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a9c5b" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#eef2f6" strokeWidth={1} />
          <text x={padL - 5} y={y(v) + 2.5} textAnchor="end" fontSize={8} fill="#9ca3af">
            {v}
          </text>
        </g>
      ))}
      <polygon points={area} fill="url(#peopleMathTrenFill)" />
      <polyline points={line} fill="none" stroke="#1a9c5b" strokeWidth={1.8} strokeLinejoin="round" />
      {pts.map((p) => (
        <g key={p.tahun}>
          <circle cx={p.x} cy={p.y} r={3} fill="#fff" stroke="#1a9c5b" strokeWidth={1.8} />
          <text x={p.x} y={p.y - 7} textAnchor="middle" fontSize={8} fontWeight={700} fill="#374151">
            {p.skor}
          </text>
          <text x={p.x} y={H - 4} textAnchor="middle" fontSize={8} fill="#6b7280">
            {p.tahun}
          </text>
        </g>
      ))}
    </svg>
  );
}

function TalentDecisionCard() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">4. PEOPLE MATH × TALENT DECISION</h3>
      <div className="grid grid-cols-1 gap-5 pt-3 md:grid-cols-2 xl:grid-cols-[minmax(0,300fr)_minmax(0,620fr)_minmax(0,300fr)_minmax(0,380fr)]">
        {/* Talent Summary */}
        <div>
          <div className="text-[10px] font-bold text-ink-900">Talent Summary</div>
          <div className="mt-2 divide-y divide-[#f6f8fa]">
            {peopleMathTalent.ringkasan.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-[7px]">
                <span className="text-[9px] text-ink-500">{r.label}</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-ink-900">
                  {r.value}
                  {r.dot && <span className="h-[7px] w-[7px] rounded-full" style={{ background: r.dot }} />}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Career Path */}
        <div>
          <div className="text-[10px] font-bold text-ink-900">Career Path Recommendation</div>
          <div className="mt-3 flex items-center gap-1.5">
            {peopleMathTalent.jalurKarier.map((j, i) => (
              <div key={j.jabatan} className="flex min-w-0 flex-1 items-center gap-1.5">
                <div
                  className={`relative min-w-0 flex-1 rounded-xl border px-2 py-2.5 text-center leading-tight ${
                    j.highlight
                      ? "border-[#e6ddfc] bg-[#f2ecfe]"
                      : j.aktif
                        ? "border-[#cdeeda] bg-ptpn-greenLight"
                        : "border-[#eef2f6] bg-white"
                  }`}
                >
                  <div
                    className={`text-[8.5px] font-bold ${
                      j.highlight ? "text-[#8b5cf6]" : j.aktif ? "text-ptpn-greenDark" : "text-ink-900"
                    }`}
                  >
                    {j.jabatan}
                  </div>
                  {j.peran && <div className="mt-[3px] text-[7.5px] text-ink-500">{j.peran}</div>}
                  <div className="mt-[2px] text-[7.5px] text-ink-400">{j.periode}</div>
                  {j.aktif && (
                    <span className="absolute -bottom-1.5 left-1/2 flex h-[13px] w-[13px] -translate-x-1/2 items-center justify-center rounded-full bg-ptpn-green text-white">
                      <Check size={8} />
                    </span>
                  )}
                </div>
                {i < peopleMathTalent.jalurKarier.length - 1 && (
                  <ArrowRight size={12} className="shrink-0 text-ink-400" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#f5f8fa] px-3 py-2.5">
            <Star size={12} className="mt-[1px] shrink-0 text-[#d97706]" />
            <p className="text-[8.5px] leading-snug text-ink-700">{peopleMathTalent.catatan}</p>
          </div>
        </div>
        {/* Why Recommended */}
        <div>
          <div className="text-[10px] font-bold text-ink-900">Why Recommended?</div>
          <div className="mt-2 space-y-2">
            {peopleMathTalent.alasan.map((a) => (
              <div key={a.label} className="flex items-center gap-2">
                <span className="w-[108px] shrink-0 text-[8.5px] text-ink-500">{a.label}</span>
                <div className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                  <div className="h-full rounded-full bg-ptpn-green" style={{ width: `${a.pct}%` }} />
                </div>
                <span className="w-[46px] shrink-0 text-right text-[8.5px] font-bold text-ink-900">
                  {a.value}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="w-[108px] shrink-0 text-[8.5px] text-ink-500">Critical Gap</span>
              <span className="text-[8.5px] font-bold text-[#d97706]">
                {peopleMathTalent.criticalGap}
              </span>
            </div>
          </div>
        </div>
        {/* Trend */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-ink-900">People Math Trend</span>
            <span className="rounded-lg border border-[#e3e9ef] px-2 py-[3px] text-[9px] font-semibold text-ink-500">
              5 Tahun Terakhir
            </span>
          </div>
          <div className="mt-1 min-h-0 flex-1">
            <TrendChart />
          </div>
          <p className="mt-1 text-[9px] leading-snug text-ink-500">
            {peopleMathTalent.trenCatatan}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabPeopleMath() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1130fr)_minmax(0,400fr)]">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,430fr)_minmax(0,700fr)]">
            <ScoreOverallCard />
            <CoreCard />
          </div>
          <PeopleFactorsCard />
        </div>
        <InsightCard />
      </div>
      <TalentDecisionCard />
    </div>
  );
}
