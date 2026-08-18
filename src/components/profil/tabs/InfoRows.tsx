/** Daftar label–nilai dua kolom, dipakai lintas tab profil. */
export function InfoRows({
  items,
}: {
  items: { label: string; value: string; status?: string }[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-around gap-2">
      {items.map((it) => (
        <div key={it.label} className="flex items-start justify-between gap-4">
          <span className="w-[130px] shrink-0 text-[9.5px] text-ink-500">{it.label}</span>
          <span className="min-w-0 flex-1 text-right text-[10px] font-bold leading-[1.4] text-ink-900">
            {it.value}
            {it.status && (
              <span className="ml-2 inline-block rounded-md bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-semibold text-ptpn-greenDark">
                {it.status}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
