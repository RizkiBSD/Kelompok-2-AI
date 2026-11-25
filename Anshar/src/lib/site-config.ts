// ============================================================
//  KONTAK & IDENTITAS STUDIO
//  Cukup ubah nilai di bawah ini kalau ada yang berubah.
//  Nomor WhatsApp: format 62... (tanpa +, tanpa spasi, tanpa 0 di depan)
// ============================================================

export const STUDIO = {
  nama: "Bantugambar",
  artist: "Heka",
  kota: "Tembalang, Kota Semarang",
  alamatSingkat: "Tembalang, Semarang",
  jamOperasional: "Senin–Sabtu · 09.00–18.00 WIB",
  whatsapp: "6281225544755",
  whatsappTampil: "+62 812-2554-4755",
  instagram: "https://instagram.com",
  email: "halo@bantugambar.co",

  // Kuota produksi — ubah angka ini kapan saja, lalu simpan.
  kuotaMingguan: 7,
  sisaSlot: 4, // sisa slot minggu ini; 0 = penuh (tampil "daftar tunggu")
} as const;

/** Link WhatsApp siap pakai, dengan pesan awal opsional. */
export function waLink(pesan?: string): string {
  const base = `https://wa.me/${STUDIO.whatsapp}`;
  return pesan ? `${base}?text=${encodeURIComponent(pesan)}` : base;
}
