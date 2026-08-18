import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Kepala seksi + tautan aksi di kanan, dipakai semua kartu HC ECC. */
export function SectionHead({
  title,
  action,
  href,
  badge,
  className = "",
}: {
  title: string;
  /** Label tautan kanan; kosongkan untuk tanpa tautan. */
  action?: string;
  /** Tujuan tautan aksi. Tanpa ini, aksi tetap tombol tanpa navigasi. */
  href?: string;
  /** Penanda kecil di samping judul, mis. <ScopeNote /> untuk kartu konsolidasi. */
  badge?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
        <span className="truncate">{title}</span>
        {badge}
      </h3>
      {action && href && (
        <Link
          href={href}
          className="flex shrink-0 cursor-pointer items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          {action} <ArrowRight size={11} />
        </Link>
      )}
      {action && !href && (
        /* Tanpa href = belum ada tujuan; jangan tampil sebagai kontrol interaktif. */
        <span className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ink-400">
          {action}
        </span>
      )}
    </div>
  );
}
