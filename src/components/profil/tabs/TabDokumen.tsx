import {
  ArrowRight,
  Briefcase,
  ChartColumnIncreasing,
  CircleAlert,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Folder,
  FolderOpen,
  GraduationCap,
  Lock,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  KATEGORI_DOKUMEN_STYLE,
  dokumenTerbaru,
  kategoriDokumen,
  ketentuanDokumen,
} from "@/lib/profil-data";

const KATEGORI_ICON: Record<string, LucideIcon> = {
  "Dokumen Pribadi": UserRound,
  Kepegawaian: Briefcase,
  "Pendidikan & Sertifikasi": GraduationCap,
  Kinerja: ChartColumnIncreasing,
  Lainnya: Folder,
};

const totalDokumen = kategoriDokumen.reduce((acc, k) => acc + k.jumlah, 0);

/* ── Ringkasan Dokumen ──────────────────────────────────── */

function RingkasanDokumenCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Ringkasan Dokumen</h3>
      <div className="mt-3 flex flex-1 items-start gap-4">
        <div className="flex shrink-0 flex-col items-center">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e8f0fe]">
            <FolderOpen size={30} className="text-[#3b7ded]" strokeWidth={1.6} />
          </span>
          <div className="mt-2.5 text-center leading-tight">
            <div className="text-[20px] font-bold text-ink-900">{totalDokumen}</div>
            <div className="mt-[2px] text-[8.5px] font-semibold text-ink-500">Total Dokumen</div>
          </div>
        </div>
        <div className="min-w-0 flex-1 divide-y divide-[#f6f8fa]">
          {kategoriDokumen.map((k) => {
            const tone = KATEGORI_DOKUMEN_STYLE[k.nama];
            const Icon = KATEGORI_ICON[k.nama] ?? Folder;
            return (
              <div key={k.nama} className="flex items-center justify-between gap-3 py-[7px]">
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md ${tone}`}
                  >
                    <Icon size={11} strokeWidth={1.8} />
                  </span>
                  <span className="truncate text-[9.5px] text-ink-700">{k.nama}</span>
                </span>
                <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{k.jumlah}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button className="mt-3.5 w-full rounded-lg border border-[#e3e9ef] bg-white py-[8px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f7f9fb]">
        Lihat Semua Dokumen
      </button>
    </div>
  );
}

/* ── Dokumen Terbaru ────────────────────────────────────── */

function DokumenTerbaruCard() {
  return (
    <div className="card px-4 pb-3.5 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Dokumen Terbaru</h3>
        <button className="link-more inline-flex items-center gap-1">
          Lihat Semua <ArrowRight size={11} />
        </button>
      </div>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Nama Dokumen</th>
            <th className="pb-1.5 pr-2 font-semibold">Kategori</th>
            <th className="pb-1.5 pr-2 font-semibold">Tanggal Unggah</th>
            <th className="pb-1.5 pr-2 font-semibold">Diunggah Oleh</th>
            <th className="pb-1.5 text-right font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dokumenTerbaru.map((d) => {
            const tone = KATEGORI_DOKUMEN_STYLE[d.kategori];
            return (
              <tr key={d.nama} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-2 pr-2">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ${tone}`}
                    >
                      <FileText size={12} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-[9.5px] font-bold text-ink-900">
                        {d.nama}
                      </span>
                      <span className="mt-[2px] block text-[8.5px] text-ink-500">{d.jenis}</span>
                    </span>
                  </span>
                </td>
                <td className="py-2 pr-2">
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}
                  >
                    {d.kategori}
                  </span>
                </td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-500">{d.tanggal}</td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-700">{d.oleh}</td>
                <td className="py-2">
                  <span className="flex items-center justify-end gap-1">
                    <button
                      className="flex h-[24px] w-[24px] items-center justify-center rounded-md text-ink-400 transition-colors hover:bg-[#f5f8fa] hover:text-ink-700"
                      aria-label={`Pratinjau ${d.nama}`}
                    >
                      <Eye size={12} />
                    </button>
                    <button
                      className="flex h-[24px] w-[24px] items-center justify-center rounded-md text-ink-400 transition-colors hover:bg-[#f5f8fa] hover:text-ptpn-green"
                      aria-label={`Unduh ${d.nama}`}
                    >
                      <Download size={12} />
                    </button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

/* ── Kategori Dokumen ───────────────────────────────────── */

function KategoriDokumenCard() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Kategori Dokumen</h3>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
        {kategoriDokumen.map((k, i) => {
          const tone = KATEGORI_DOKUMEN_STYLE[k.nama];
          const Icon = KATEGORI_ICON[k.nama] ?? Folder;
          return (
            <div
              key={k.nama}
              className={`flex flex-col rounded-xl border border-black/5 p-3 ${tone} ${
                i < 3 ? "col-span-2" : "col-span-3"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon size={15} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="text-[10px] font-bold">{k.nama}</div>
                  <div className="mt-[2px] text-[8.5px] font-semibold text-ink-500">
                    {k.jumlah} Dokumen
                  </div>
                </div>
              </div>
              <p className="mt-2 flex-1 text-[8.5px] leading-relaxed text-ink-500">{k.deskripsi}</p>
              <button className="mt-2.5 inline-flex items-center gap-1 self-start text-[9px] font-semibold hover:underline">
                Lihat Dokumen <ArrowRight size={10} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Informasi & Ketentuan ──────────────────────────────── */

const KETENTUAN_ICONS: LucideIcon[] = [ShieldCheck, FileCheck2, Lock, CircleAlert];

function KetentuanDokumenCard() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Informasi &amp; Ketentuan Dokumen</h3>
      <div className="mt-3 flex items-center gap-4">
        <div className="min-w-0 flex-1 space-y-2.5">
          {ketentuanDokumen.map((k, i) => {
            const Icon = KETENTUAN_ICONS[i % KETENTUAN_ICONS.length];
            return (
              <div key={k} className="flex items-start gap-2.5">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#eef3f8] text-ink-500">
                  <Icon size={11} strokeWidth={1.8} />
                </span>
                <p className="pt-[3px] text-[9px] leading-relaxed text-ink-700">{k}</p>
              </div>
            );
          })}
        </div>
        <div className="hidden shrink-0 lg:block">
          <span className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#e8f0fe]">
            <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#3b7ded]">
              <FolderOpen size={26} className="text-white" strokeWidth={1.6} />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow-card">
                <Lock size={10} className="text-[#3b7ded]" />
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabDokumen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,480fr)_minmax(0,1040fr)] gap-3">
        <RingkasanDokumenCard />
        <DokumenTerbaruCard />
      </div>
      <div className="grid grid-cols-[minmax(0,790fr)_minmax(0,730fr)] gap-3">
        <KategoriDokumenCard />
        <KetentuanDokumenCard />
      </div>
    </div>
  );
}
