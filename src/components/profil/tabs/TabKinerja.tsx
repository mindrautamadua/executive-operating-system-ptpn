import {
  ArrowRight,
  BookOpen,
  Eye,
  MessageSquare,
  ShieldCheck,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";
import {
  feedbackPenilaian,
  kategoriPenilaian,
  kinerja,
  kinerjaTahunan,
  kpi2025,
  kpiTotal,
  penghargaan,
  perilakuKompetensi,
  riwayatPenilaian,
  skorKomponen,
} from "@/lib/profil-data";

const RATING_TONE: Record<string, string> = {
  "Sangat Baik": "tone-green",
  Baik: "tone-lime",
  Cukup: "tone-amber",
};

const PERILAKU_IKON: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  users: Users,
  target: Target,
  message: MessageSquare,
  book: BookOpen,
};

/* ── Ringkasan Kinerja 2025 ─────────────────────────────── */

function DonutSkor() {
  const size = 118;
  const stroke = 12;
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
          strokeDasharray={`${(c * kinerja.pct) / 100} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[26px] font-extrabold text-ink-900">{kinerja.skor}</span>
        <span className="mt-1 text-[9px] text-ink-500">{kinerja.maks}</span>
      </div>
    </div>
  );
}

function RingkasanKinerjaCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Ringkasan Kinerja 2025</h3>
      <div className="flex min-h-0 flex-1 items-center gap-4 py-3">
        <DonutSkor />
        <div className="leading-tight">
          <div className="text-[12px] font-bold text-[#16a34a]">{kinerja.label}</div>
          <div className="mt-1 text-[9.5px] text-ink-500">{kinerja.deskripsi}</div>
          <div className="mt-2 flex items-center gap-1 text-[9.5px] font-semibold text-[#16a34a]">
            <TrendingUp size={11} />
            {kinerja.delta}
          </div>
        </div>
      </div>
      <button className="w-full rounded-lg border border-[#e3e9ef] py-[7px] text-[10px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Detail Kinerja
      </button>
    </div>
  );
}

/* ── Skor Kinerja per Komponen ──────────────────────────── */

function SkorKomponenCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Skor Kinerja per Komponen</h3>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 py-3">
        {skorKomponen.map((k) => (
          <div key={k.label}>
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-semibold text-ink-700">{k.label}</span>
              <span className="text-[9.5px] font-bold text-ink-900">
                {k.skor.toFixed(1)} <span className="font-medium text-ink-400">/ 5.0</span>
              </span>
            </div>
            <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-ptpn-green"
                style={{ width: `${(k.skor / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg bg-ptpn-greenLight px-3 py-2">
        <span className="text-[10px] font-bold text-ptpn-green">Skor Akhir</span>
        <span className="text-[11px] font-extrabold text-ptpn-green">
          {kinerja.skor} {kinerja.maks}
        </span>
      </div>
    </div>
  );
}

/* ── Tren Kinerja 5 Tahun ───────────────────────────────── */

function TrenKinerjaCard() {
  const W = 340;
  const H = 150;
  const padL = 26;
  const padR = 14;
  const padT = 16;
  const padB = 20;
  const x = (i: number) => padL + (i / (kinerjaTahunan.length - 1)) * (W - padL - padR);
  const y = (skor: number) => padT + (1 - skor / 5) * (H - padT - padB);
  const pts = kinerjaTahunan.map((t, i) => ({ ...t, x: x(i), y: y(t.skor) }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padL},${H - padB} ${line} ${W - padR},${H - padB}`;
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Tren Kinerja 5 Tahun Terakhir</h3>
      <div className="flex min-h-0 flex-1 items-center gap-4 pt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-0 flex-1">
          <defs>
            <linearGradient id="trenKinerjaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a9c5b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1a9c5b" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[1, 2, 3, 4, 5].map((v) => (
            <g key={v}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#eef2f6" strokeWidth={1} />
              <text x={padL - 5} y={y(v) + 2.5} textAnchor="end" fontSize={8} fill="#9ca3af">
                {v.toFixed(1)}
              </text>
            </g>
          ))}
          <polygon points={area} fill="url(#trenKinerjaFill)" />
          <polyline points={line} fill="none" stroke="#1a9c5b" strokeWidth={1.8} strokeLinejoin="round" />
          {pts.map((p) => (
            <g key={p.tahun}>
              <circle cx={p.x} cy={p.y} r={3.2} fill="#fff" stroke="#1a9c5b" strokeWidth={1.8} />
              <text x={p.x} y={p.y - 7} textAnchor="middle" fontSize={8} fontWeight={700} fill="#374151">
                {p.skor.toFixed(1)}
              </text>
              <text x={p.x} y={H - 6} textAnchor="middle" fontSize={8} fill="#6b7280">
                {p.tahun}
              </text>
            </g>
          ))}
        </svg>
        <div className="shrink-0 pr-1">
          <div className="text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            Kategori Penilaian
          </div>
          <div className="mt-2 space-y-1.5">
            {kategoriPenilaian.map((k) => (
              <div key={k.label} className="flex items-center gap-1.5">
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: k.warna }} />
                <span className="w-[52px] text-[8.5px] tabular-nums text-ink-500">{k.rentang}</span>
                <span className="text-[8.5px] font-semibold text-ink-700">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pencapaian KPI 2025 ────────────────────────────────── */

function PencapaianKpiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Pencapaian KPI 2025</h3>
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">KPI</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Bobot</th>
            <th className="pb-1.5 pr-2 text-right font-semibold">Target</th>
            <th className="pb-1.5 pr-2 text-right font-semibold">Realisasi</th>
            <th className="pb-1.5 pr-2 text-right font-semibold">Pencapaian</th>
            <th className="pb-1.5 text-right font-semibold">Skor</th>
          </tr>
        </thead>
        <tbody>
          {kpi2025.map((k) => (
            <tr key={k.sasaran} className="border-b border-[#f6f8fa]">
              <td className="py-[7px] pr-2 text-[9.5px] font-semibold text-ink-900">{k.sasaran}</td>
              <td className="py-[7px] pr-2 text-center text-[9.5px] text-ink-500">{k.bobot}</td>
              <td className="py-[7px] pr-2 text-right text-[9.5px] text-ink-700">{k.target}</td>
              <td className="py-[7px] pr-2 text-right text-[9.5px] font-semibold text-ink-900">{k.realisasi}</td>
              <td className="py-[7px] pr-2 text-right text-[9.5px] font-bold text-[#16a34a]">{k.capaian}</td>
              <td className="py-[7px] text-right text-[10px] font-bold text-ink-900">{k.skor}</td>
            </tr>
          ))}
          <tr>
            <td className="pt-2 text-[10px] font-bold text-ink-900">Total</td>
            <td className="pt-2 text-center text-[10px] font-bold text-ink-900">{kpiTotal.bobot}</td>
            <td colSpan={3} />
            <td className="pt-2 text-right text-[10.5px] font-extrabold text-ptpn-green">{kpiTotal.skor}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-auto pt-2.5">
        <button className="link-more inline-flex items-center gap-1">
          Lihat detail KPI <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Perilaku & Kompetensi ──────────────────────────────── */

function PerilakuKompetensiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">
        Perilaku & Kompetensi <span className="font-semibold text-ink-400">(Behavioural)</span>
      </h3>
      <div className="mt-2 flex items-center justify-between border-b border-[#eef2f6] pb-1.5 text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
        <span>Kompetensi</span>
        <span>Rating (1-5)</span>
      </div>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa]">
        {perilakuKompetensi.map((p) => {
          const Ikon = PERILAKU_IKON[p.ikon] ?? ShieldCheck;
          return (
            <div key={p.label} className="flex items-center gap-2.5 py-[9px]">
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#3b7ded]">
                <Ikon size={13} />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[9.5px] font-bold text-ink-900">{p.label}</div>
                <div className="mt-[2px] text-[8.5px] text-ink-500">{p.deskripsi}</div>
              </div>
              <span className="text-[10.5px] font-bold text-ink-900">{p.rating}</span>
            </div>
          );
        })}
      </div>
      <button className="link-more inline-flex items-center gap-1 pt-1">
        Lihat semua kompetensi <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Feedback & Catatan Penilaian ───────────────────────── */

function FeedbackCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Feedback & Catatan Penilaian</h3>
      <div className="min-h-0 flex-1 space-y-3.5 pt-3">
        {feedbackPenilaian.map((f) => {
          const Ikon = f.ikon === "komite" ? Users : UserCheck;
          return (
            <div key={f.judul} className="flex gap-2.5">
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${
                  f.ikon === "komite" ? "bg-[#efeaff] text-[#7c5cf0]" : "bg-ptpn-greenLight text-ptpn-green"
                }`}
              >
                <Ikon size={14} />
              </span>
              <div className="min-w-0 flex-1 leading-snug">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[9.5px] font-bold text-ink-900">{f.judul}</span>
                  <span className="shrink-0 text-[8.5px] text-ink-400">{f.tanggal}</span>
                </div>
                <p className="mt-1 text-[9px] text-ink-700">{f.isi}</p>
                <div className="mt-1.5 text-[9px] font-bold text-ink-900">{f.nama}</div>
                <div className="text-[8.5px] text-ink-500">{f.jabatan}</div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="link-more inline-flex items-center gap-1 pt-2">
        Lihat semua feedback <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Riwayat Penilaian Kinerja ──────────────────────────── */

function RiwayatPenilaianCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Penilaian Kinerja</h3>
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Tahun</th>
            <th className="pb-1.5 pr-2 font-semibold">Periode</th>
            <th className="pb-1.5 pr-2 font-semibold">Skor Akhir</th>
            <th className="pb-1.5 pr-2 font-semibold">Rating</th>
            <th className="pb-1.5 pr-2 font-semibold">Atasan Penilai</th>
            <th className="pb-1.5 pr-2 font-semibold">Tanggal Penilaian</th>
            <th className="pb-1.5 text-right font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPenilaian.map((r) => {
            const tone = RATING_TONE[r.rating] ?? RATING_TONE.Cukup;
            return (
              <tr key={r.tahun} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{r.tahun}</td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.periode}</td>
                <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{r.skor}</td>
                <td className="py-2 pr-2">
                  <span className={`rounded-md px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}>
                    {r.rating}
                  </span>
                </td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.atasan}</td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.tanggal}</td>
                <td className="py-2 text-right">
                  <button className="inline-flex items-center gap-1 text-[9px] font-semibold text-ptpn-greenDark hover:underline">
                    <Eye size={11} /> Lihat Detail
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-auto pt-2.5">
        <button className="link-more inline-flex items-center gap-1">
          Lihat semua riwayat <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Penghargaan & Apresiasi ────────────────────────────── */

function PenghargaanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Penghargaan & Apresiasi</h3>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa] pt-1">
        {penghargaan.map((p) => (
          <div key={p.nama} className="flex items-center gap-2.5 py-[9px]">
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-lg bg-[#fef4e3] text-[#d97706]">
              <Trophy size={13} />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[9.5px] font-bold text-ink-900">{p.nama}</div>
              <div className="mt-[2px] text-[8.5px] text-ink-500">{p.unit}</div>
            </div>
            <span className="text-[9px] font-semibold text-ink-500">{p.tahun}</span>
          </div>
        ))}
      </div>
      <button className="link-more inline-flex items-center gap-1 pt-1.5">
        Lihat semua penghargaan <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabKinerja() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,430fr)_minmax(0,440fr)_minmax(0,660fr)] gap-3">
        <RingkasanKinerjaCard />
        <SkorKomponenCard />
        <TrenKinerjaCard />
      </div>
      <div className="grid grid-cols-[minmax(0,580fr)_minmax(0,440fr)_minmax(0,510fr)] gap-3">
        <PencapaianKpiCard />
        <PerilakuKompetensiCard />
        <FeedbackCard />
      </div>
      <div className="grid grid-cols-[minmax(0,1020fr)_minmax(0,510fr)] gap-3">
        <RiwayatPenilaianCard />
        <PenghargaanCard />
      </div>
    </div>
  );
}
