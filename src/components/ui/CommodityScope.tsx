"use client";

import { toSubholdingId, type SubholdingId } from "@/lib/subholding";

/**
 * Pemetaan domain komoditas → subholding pemilik (PTPN Group).
 *
 * Sebagian besar kartu Produksi & Pemasaran tidak menyimpan kolom subholding
 * eksplisit, tetapi komoditasnya sudah menentukan pemiliknya:
 *  - Sawit/TBS/CPO/PK, kebun sawit, PKS, Regional 1–7  → PalmCo (PTPN IV)
 *  - Tebu/gula/tetes, PG (pabrik gula), musim giling    → SugarCo (SGN)
 *  - Karet dan teh, pabrik karet/teh                    → SupportingCo (PTPN I)
 *
 * Fungsi ini mengembalikan alias subholding yang dikenali `toSubholdingId`,
 * sehingga bisa dipakai langsung sebagai `getLabel` pada `filterBySubholding`.
 * Teks yang tidak menyebut komoditas mana pun mengembalikan `undefined` =
 * berlaku untuk semua cakupan (baris tetap tampil).
 */
export function commodityScope(text?: string | null): string | undefined {
  if (!text) return undefined;
  const t = text.toLowerCase();

  // Subholding eksplisit menang atas tebakan komoditas.
  const explicit = toSubholdingId(text);
  if (explicit === "palmco") return "PalmCo";
  if (explicit === "sugarco") return "SugarCo";
  if (explicit === "supportingco") return "SupportingCo";

  // Gula diperiksa lebih dulu: "PG" & "giling" tidak boleh tertangkap pola sawit.
  if (
    /(tebu|gula|gkp|gkr|tetes|molase|molasses|rafinasi|giling|\bpg\b|pg\s|bioetanol)/.test(t)
  ) {
    return "SugarCo";
  }

  if (/(karet|teh\b|lateks|latex|rubber|rss|sir\s?20|crumb|pucuk)/.test(t)) {
    return "SupportingCo";
  }

  if (
    /(sawit|palm|cpo|cpko|pko|\bpk\b|kernel|tbs|olein|stearin|\brbd\b|biodiesel|fame|minyak goreng|\bpks\b|tankos|brondolan|\boer\b|\bker\b|\bffa\b|regional\s?[1-7])/.test(
      t,
    )
  ) {
    return "PalmCo";
  }

  return undefined;
}

/** true bila teks (komoditas/unit) termasuk cakupan subholding aktif. */
export function inScope(active: SubholdingId, text?: string | null): boolean {
  if (active === "all") return true;
  const label = commodityScope(text);
  if (!label) return true;
  return toSubholdingId(label) === active;
}

/**
 * Placeholder untuk kartu yang seluruh isinya milik satu subholding lain,
 * sehingga tidak menyisakan baris pada cakupan yang sedang aktif.
 */
export function ScopeEmpty({ label = "subholding ini" }: { label?: string }) {
  return (
    <div className="mt-3 flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#e3e9ef] px-3 py-6 text-center text-[9px] leading-[1.5] text-ink-500">
      Tidak ada data pada cakupan {label}. Kembali ke tampilan konsolidasi untuk
      melihat angka grup.
    </div>
  );
}
