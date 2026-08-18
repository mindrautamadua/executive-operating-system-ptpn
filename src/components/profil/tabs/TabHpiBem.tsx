import {
  Database,
  Info,
  Lightbulb,
  Recycle,
  Sprout,
  Target,
} from "lucide-react";
import {
  HPI_BEM_KATEGORI_STYLE,
  hpiBemDiagnostic,
  hpiBemFooter,
  hpiBemGap,
  hpiBemIntervensi,
  hpiBemProyeksi,
  hpiBemRootCause,
} from "@/lib/profil-data";

/* Kelas chip/teks per tone sel BEM Gilbert (pasangan gelap di globals.css). */
const DIMENSI_TONE: Record<string, { chip: string; text: string }> = {
  green: { chip: "tone-green", text: "text-[#16a34a]" },
  blue: { chip: "tone-blue", text: "text-[#3b7ded]" },
  purple: { chip: "tone-purple", text: "text-[#7c3aed]" },
  red: { chip: "tone-red", text: "text-[#dc2626]" },
  amber: { chip: "tone-amber", text: "text-[#b45309]" },
  teal: { chip: "tone-teal", text: "text-[#0d9488]" },
};

/* ── Ringkasan Performance Gap ──────────────────────────── */

function BarSkor({
  label,
  skor,
  maks,
  pct,
}: {
  label: string;
  skor: string;
  maks: string;
  pct: number;
}) {
  return (
    <div>
      <div className="text-[9px] text-ink-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[22px] font-extrabold leading-none text-ink-900">
          {skor}
        </span>
        <span className="text-[9px] text-ink-500">{maks}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
          <div
            className="h-full rounded-full bg-ptpn-green"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[8.5px] font-bold text-ink-900">{pct}%</span>
      </div>
    </div>
  );
}

function RingkasanGapCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        Ringkasan Performance Gap <Info size={11} className="text-ink-400" />
      </h3>
      <div className="mt-3 space-y-4">
        <BarSkor {...hpiBemGap.aktual} />
        <BarSkor {...hpiBemGap.potensial} />
      </div>
      <div className="mt-4 rounded-xl border border-[#fde9d2] bg-[#fef8f0] px-3 py-3">
        <div className="text-[9px] font-semibold text-[#b45309]">
          Performance Gap
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-[22px] font-extrabold leading-none text-[#d97706]">
            {hpiBemGap.gap.pct}
          </span>
          <span className="text-[9px] font-semibold text-[#b45309]">
            {hpiBemGap.gap.level}
          </span>
        </div>
        <p className="mt-1.5 text-[8.5px] leading-snug text-ink-500">
          {hpiBemGap.gap.catatan}
        </p>
      </div>
    </div>
  );
}

/* ── 1. HPI BEM Diagnostic ──────────────────────────────── */

function DonutSkor() {
  const size = 132;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#eef2f6"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a9c5b"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(c * hpiBemDiagnostic.skor) / 100} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[9px] font-semibold tracking-wide text-ink-500">
          HPI BEM SCORE
        </span>
        <span className="mt-1 text-[30px] font-extrabold text-ptpn-green">
          {hpiBemDiagnostic.skor}
        </span>
        <span className="mt-1 text-[9px] text-ink-500">/100</span>
      </div>
    </div>
  );
}

function DimensiKolom({ d }: { d: (typeof hpiBemDiagnostic.dimensi)[number] }) {
  const tone = DIMENSI_TONE[d.tone] ?? DIMENSI_TONE.green;
  return (
    <div className="min-w-0 rounded-lg border border-[#f1f4f8] p-2.5">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-[26px] shrink-0 items-center justify-center rounded-lg px-1.5 text-[9px] font-extrabold ${tone.chip}`}
        >
          {d.inisial}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[10px] font-bold text-ink-900">
            {d.label}
          </div>
          <div className="truncate text-[9px] text-ink-500">{d.sub}</div>
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className={`text-[22px] font-extrabold leading-none ${tone.text}`}
        >
          {d.skor}
        </span>
        <span className="text-[9px] text-ink-500">/100</span>
      </div>
      <span
        className={`mt-1.5 inline-block rounded-md px-2 py-[3px] text-[9px] font-bold ${
          d.status === "Good"
            ? "bg-ptpn-greenLight text-ptpn-greenDark"
            : "bg-[#fef4e3] text-[#b45309]"
        }`}
      >
        {d.status}
      </span>
      <div className="mt-2.5 space-y-1.5">
        {d.rincian.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between">
              <span className="truncate text-[8.5px] text-ink-500">
                {r.label}
              </span>
              <span className="text-[8.5px] font-bold text-ink-900">
                {r.skor}
              </span>
            </div>
            <div className="mt-[3px] h-[3px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${r.skor}%`, background: d.warna }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterpretasiPanel() {
  return (
    <div className="w-full min-w-0 rounded-xl bg-[#fdf9f1] p-3 md:flex-1 xl:w-[240px] xl:flex-none xl:shrink-0 xl:order-3">
      <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-900">
        <Lightbulb size={12} className="text-[#d97706]" /> Interpretasi Utama
      </div>
      <p className="mt-1.5 text-[8.5px] leading-relaxed text-ink-700">
        {hpiBemDiagnostic.interpretasi}
      </p>
      <div className="mt-3 rounded-lg border border-[#fde9d2] bg-white/60 p-2.5">
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-ink-900">
          <Target size={11} className="text-[#d97706]" /> Fokus Perbaikan Utama
        </div>
        <div className="mt-1.5 space-y-1.5">
          {hpiBemDiagnostic.fokus.map((f, i) => (
            <div key={f} className="flex items-center gap-2">
              <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#fef4e3] text-[9px] font-bold text-[#b45309]">
                {i + 1}
              </span>
              <span className="text-[8.5px] font-medium text-ink-700">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Urutan kelompok sel Behavior Engineering Model (Gilbert). */
const KELOMPOK = ["Environmental Supports", "Person's Repertory"];

function DiagnosticCard() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        1. HPI BEM DIAGNOSTIC — BEHAVIOR ENGINEERING MODEL (6 SEL){" "}
        <Info size={11} className="text-ink-400" />
      </h3>
      <div className="flex flex-col gap-4 pt-3 xl:flex-row xl:items-start">
        {/* Di tablet: donut dan interpretasi berdampingan; di xl wrapper melebur
            (contents) dan urutan asli donut-sel-interpretasi dipulihkan via order. */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start xl:contents">
          <div className="flex shrink-0 flex-col items-center xl:order-1 xl:self-start">
            <DonutSkor />
            <span className="mt-2 rounded-md bg-ptpn-greenLight px-2.5 py-[3px] text-[8.5px] font-bold text-ptpn-greenDark">
              {hpiBemDiagnostic.status}
            </span>
            <div className="mt-3 text-center leading-tight">
              <div className="text-[9px] text-ink-500">Tanggal Assessment</div>
              <div className="mt-[2px] text-[8.5px] font-bold text-ink-900">
                {hpiBemDiagnostic.tanggal}
              </div>
              <div className="mt-1.5 text-[9px] text-ink-500">Assessed By</div>
              <div className="mt-[2px] text-[8.5px] font-bold text-ink-900">
                {hpiBemDiagnostic.assessor}
              </div>
            </div>
          </div>
          <InterpretasiPanel />
        </div>
        <div className="min-w-0 flex-1 space-y-2.5 rounded-xl border border-[#f1f4f8] p-3.5 xl:order-2">
          {KELOMPOK.map((k) => (
            <div key={k}>
              <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-ink-500">
                {k}
              </div>
              <div className="mt-1.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {hpiBemDiagnostic.dimensi
                  .filter((d) => d.kelompok === k)
                  .map((d) => (
                    <DimensiKolom key={d.label} d={d} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 2. Root Cause Analysis ─────────────────────────────── */

const ROOT_CAUSE_IKON = [Database, Recycle, Sprout];

function RootCauseCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5 lg:order-1">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        2. ROOT CAUSE ANALYSIS <Info size={11} className="text-ink-400" />
      </h3>
      <div className="mt-2.5 min-h-0 flex-1 rounded-xl border border-[#f1f4f8] p-3">
        <div className="text-[9.5px] font-bold text-ink-900">
          Akar Masalah Utama (Top 3)
        </div>
        <div className="mt-2 space-y-2.5">
          {hpiBemRootCause.items.map((item, i) => {
            const Ikon = ROOT_CAUSE_IKON[i] ?? Database;
            return (
              <div
                key={item.judul}
                className="flex items-start gap-2.5 border-b border-[#f6f8fa] pb-2.5 last:border-b-0 last:pb-0"
              >
                <span className="mt-[1px] flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe] text-[#3b7ded]">
                  <Ikon size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-bold text-ink-900">
                    {item.judul}
                  </div>
                  <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">
                    {item.deskripsi}
                  </p>
                </div>
                <div className="w-[52px] shrink-0 text-right leading-tight">
                  <div className="text-[9px] text-ink-500">Dampak</div>
                  <div
                    className={`mt-[2px] text-[8.5px] font-bold ${
                      item.dampak === "High"
                        ? "text-[#dc2626]"
                        : "text-[#b45309]"
                    }`}
                  >
                    {item.dampak}
                  </div>
                  <div className="mt-1 text-[9px] text-ink-500">
                    Est. Impact
                  </div>
                  <div className="mt-[2px] text-[8.5px] font-bold text-ink-900">
                    {item.impact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-xl border border-[#fde9d2] bg-[#fef8f0] px-3 py-2.5">
        <span className="text-[9px] font-bold text-[#b45309]">
          Total Estimated Performance Opportunity
        </span>
        <span className="text-[12px] font-extrabold text-[#b45309]">
          {hpiBemRootCause.total}
        </span>
      </div>
      <p className="mt-2.5 rounded-lg bg-[#f5f8fa] px-3 py-2 text-[8.5px] leading-snug text-ink-500">
        {hpiBemRootCause.catatan}
      </p>
    </div>
  );
}

/* ── 3. Intervensi & Action Plan ────────────────────────── */

function IntervensiCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5 lg:order-3 lg:col-span-2 xl:order-2 xl:col-span-1">
      <h3 className="text-[11px] font-bold text-ink-900">
        3. INTERVENSI &amp; ACTION PLAN
      </h3>
      <div className="scroll-thin -mx-1 min-w-0 overflow-x-auto px-1">
        <div className="mt-2.5 grid min-w-[560px] grid-cols-[minmax(0,1fr)_86px_86px_58px_78px] gap-2 border-b border-[#f1f4f8] pb-1.5 text-[9px] font-semibold text-ink-500">
          <span>Intervensi yang Direkomendasikan</span>
          <span>Kategori BEM</span>
          <span>Owner</span>
          <span>Target</span>
          <span className="text-right">Est. Impact</span>
        </div>
        <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa] min-w-[560px]">
          {hpiBemIntervensi.items.map((item) => {
            const tone = HPI_BEM_KATEGORI_STYLE[item.kategori];
            return (
              <div
                key={item.judul}
                className="grid grid-cols-[minmax(0,1fr)_86px_86px_58px_78px] items-center gap-2 py-2"
              >
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-ink-900">
                    {item.judul}
                  </div>
                  <p className="mt-[2px] text-[9px] leading-snug text-ink-500">
                    {item.deskripsi}
                  </p>
                </div>
                <span
                  className={`justify-self-start rounded-md px-2 py-[3px] text-[9px] font-bold ${tone ?? "tone-slate"}`}
                >
                  {item.kategori}
                </span>
                <span className="text-[8.5px] text-ink-700">{item.owner}</span>
                <span className="text-[8.5px] text-ink-700">{item.target}</span>
                <span className="text-right text-[8.5px] font-bold text-ptpn-greenDark">
                  {item.impact}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-[#f1f4f8] pt-2">
        <span className="text-[9px] font-bold text-ink-900">
          Total Est. Impact
        </span>
        <span className="text-[12px] font-extrabold text-ptpn-greenDark">
          {hpiBemIntervensi.total}
        </span>
      </div>
      <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-[#eef4ff] px-3 py-2">
        <Info size={11} className="mt-[1px] shrink-0 text-[#3b7ded]" />
        <p className="text-[8.5px] leading-snug text-ink-700">
          {hpiBemIntervensi.catatan}
        </p>
      </div>
    </div>
  );
}

/* ── 4. Performance Projection ──────────────────────────── */

function ProyeksiChart() {
  const W = 300;
  const H = 120;
  const padL = 30;
  const padR = 16;
  const padT = 20;
  const padB = 24;
  const data = hpiBemProyeksi.performance;
  const min = 3.5;
  const max = 5.0;
  const x = (i: number) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const y = (v: number) =>
    padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const pts = data.map((d, i) => ({ ...d, x: x(i), y: y(d.nilai) }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[3.5, 4.0, 4.5, 5.0].map((v) => (
        <g key={v}>
          <line
            x1={padL}
            y1={y(v)}
            x2={W - padR}
            y2={y(v)}
            stroke="#eef2f6"
            strokeWidth={1}
          />
          <text
            x={padL - 5}
            y={y(v) + 2.5}
            textAnchor="end"
            fontSize={8}
            fill="#9ca3af"
          >
            {v.toFixed(1)}
          </text>
        </g>
      ))}
      {pts.slice(1).map((p, i) => (
        <line
          key={p.label}
          x1={pts[i].x}
          y1={pts[i].y}
          x2={p.x}
          y2={p.y}
          stroke="#1a9c5b"
          strokeWidth={1.8}
          strokeDasharray={p.target ? "4 3" : undefined}
        />
      ))}
      {pts.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={3.2}
            fill={p.target ? "#fff" : "#1a9c5b"}
            stroke="#1a9c5b"
            strokeWidth={1.8}
          />
          <text
            x={p.x}
            y={p.y - 8}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={800}
            fill="#111827"
          >
            {p.nilai.toFixed(1)}
          </text>
          <text
            x={p.x}
            y={H - 4}
            textAnchor="middle"
            fontSize={8}
            fill="#6b7280"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function TrenChart() {
  const W = 300;
  const H = 110;
  const padL = 26;
  const padR = 16;
  const padT = 16;
  const padB = 20;
  const data = hpiBemProyeksi.tren;
  const x = (i: number) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / 100) * (H - padT - padB);
  const pts = data.map((d, i) => ({ ...d, x: x(i), y: y(d.skor) }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padL},${H - padB} ${line} ${W - padR},${H - padB}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="hpiBemTrenFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a9c5b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a9c5b" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line
            x1={padL}
            y1={y(v)}
            x2={W - padR}
            y2={y(v)}
            stroke="#eef2f6"
            strokeWidth={1}
          />
          <text
            x={padL - 5}
            y={y(v) + 2.5}
            textAnchor="end"
            fontSize={8}
            fill="#9ca3af"
          >
            {v}
          </text>
        </g>
      ))}
      <polygon points={area} fill="url(#hpiBemTrenFill)" />
      <polyline
        points={line}
        fill="none"
        stroke="#1a9c5b"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      {pts.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#fff"
            stroke="#1a9c5b"
            strokeWidth={1.8}
          />
          <text
            x={p.x}
            y={p.y - 7}
            textAnchor="middle"
            fontSize={8}
            fontWeight={700}
            fill="#374151"
          >
            {p.skor}
          </text>
          <text
            x={p.x}
            y={H - 4}
            textAnchor="middle"
            fontSize={8}
            fill="#6b7280"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ProyeksiCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5 lg:order-2 xl:order-3">
      <h3 className="text-[11px] font-bold text-ink-900">
        4. PERFORMANCE PROJECTION
      </h3>
      <div className="mt-2 text-[9px] font-semibold text-ink-500">
        Proyeksi Peningkatan Performance
      </div>
      <ProyeksiChart />
      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        {hpiBemProyeksi.performanceCatatan}
      </p>
      <div className="mt-3 text-[9px] font-semibold text-ink-500">
        Trend HPI BEM Score
      </div>
      <div className="min-h-0 flex-1">
        <TrenChart />
      </div>
      <div className="mt-2 flex items-start gap-2 rounded-lg bg-ptpn-greenLight px-3 py-2">
        <Sprout size={11} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[8.5px] leading-snug text-ink-700">
          {hpiBemProyeksi.trenCatatan}
        </p>
      </div>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabHpiBem() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,260fr)_minmax(0,1280fr)]">
        <RingkasanGapCard />
        <DiagnosticCard />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,420fr)_minmax(0,600fr)_minmax(0,380fr)]">
        <RootCauseCard />
        <IntervensiCard />
        <ProyeksiCard />
      </div>
      <div className="card flex items-center gap-2 px-4 py-2.5">
        <Recycle size={13} className="shrink-0 text-ptpn-green" />
        <p className="text-[8.5px] text-ink-700">
          <span className="font-bold text-ptpn-greenDark">HPI BEM</span>{" "}
          {hpiBemFooter}
        </p>
      </div>
    </div>
  );
}
