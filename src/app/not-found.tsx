import Link from "next/link";

/** Halaman 404 — tautan kembali ke Dashboard Utama, gaya konsisten aplikasi. */
export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-[var(--bg-app)] px-6 text-center">
      <div className="text-[22px] font-extrabold text-ink-900">404</div>
      <div className="text-[13px] font-bold text-ink-900">Halaman tidak ditemukan</div>
      <div className="max-w-md text-[10px] leading-[1.5] text-ink-500">
        Alamat yang dituju tidak ada atau sudah dipindahkan.
      </div>
      <Link
        href="/"
        className="rounded-lg bg-ptpn-green px-4 py-2 text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        Kembali ke Dashboard Utama
      </Link>
    </div>
  );
}
