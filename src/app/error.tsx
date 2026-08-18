"use client";

import Link from "next/link";

/** Error boundary global — pengganti layar putih default Next saat render gagal. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-[var(--bg-app)] px-6 text-center">
      <div className="text-[13px] font-bold text-ink-900">Terjadi kesalahan saat memuat halaman</div>
      <div className="max-w-md text-[10px] leading-[1.5] text-ink-500">
        Coba muat ulang. Bila masalah berlanjut, kembali ke Dashboard Utama.
        {error.digest && <span className="mt-1 block text-ink-500">Ref: {error.digest}</span>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-ptpn-green px-4 py-2 text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Muat Ulang
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[#e3e9ef] px-4 py-2 text-[10px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
        >
          Dashboard Utama
        </Link>
      </div>
    </div>
  );
}
