# Bantugambar — Website Komisi Seni Manual

Situs komisi seni tradisional (sketsa pensil, lineart tinta, marker) untuk studio
**Bantugambar** di Tembalang, Kota Semarang. Alur pemesanan 8 langkah, kalkulator
harga real-time, dan pengiriman ringkasan pesanan langsung ke WhatsApp seniman.

**Panduan online & mengedit: lihat [DEPLOY.md](./DEPLOY.md).**

## Menjalankan

**Cara termudah (Windows):** klik dua kali `jalankan-web.bat`. Skrip itu membangun
ulang situs, menyalakan server, lalu membuka `http://localhost:3100`. Biarkan
jendela hitamnya terbuka — menutup jendela berarti mematikan server.

**Cara manual:**

```bash
npm install
npm run build
npx next start -p 3100   # http://localhost:3100
```

Mode pengembangan (auto-refresh):

```bash
npm run dev -- --port 3100
```

## Peta halaman

| Rute | Isi |
| --- | --- |
| `/` | Hero, ticker, katalog kategori, before/after slider, marquee testimoni, badge kuota, 5 tahap proses |
| `/portofolio` | Grid karya dengan filter kategori, parallax, lightbox |
| `/layanan` | Tab per kategori, tabel perbandingan, add-on, penjelasan DP |
| `/proses` | Timeline tahapan + penjelasan kuota produksi |
| `/pesan` | Wizard 8 langkah → ringkasan dikirim ke WhatsApp |
| `/syarat-ketentuan` | 10 bagian legal: pembayaran, revisi, refund, penafian akademik, hak cipta, privasi (UU PDP), pengiriman, force majeure |

## Cara kerja pesanan

Tidak ada database dan tidak ada pembayaran online otomatis — ini disengaja agar
sederhana dan murah.

1. Pengunjung mengisi wizard, melihat total & DP secara real-time.
2. Klik **Kirim via WhatsApp** → pesan berisi seluruh detail pesanan (nama, alamat,
   spesifikasi, total, DP, metode bayar) terbuka di WhatsApp seniman.
3. Seniman membalas, mengirim nomor rekening, dan mengurus DP secara manual.

Semua data pesanan masuk ke chat WhatsApp, jadi tidak ada data pelanggan yang
disimpan di server.

## Struktur

```
src/
  app/
    page.tsx                 # beranda
    layanan/ portofolio/ proses/ pesan/ syarat-ketentuan/
  components/                # Navbar, Footer, OrderWizard, PortfolioGrid, CapacityBadge, ...
  data/
    portfolio.json           # daftar karya portofolio (edit di sini)
  lib/
    catalog.ts               # layanan, ukuran, kompleksitas, tenggat, add-on, calculateQuote
    site-config.ts           # nomor WhatsApp, kota, jam buka, kuota
    analytics.ts             # event GA4 + UTM
```

## Menambah portofolio (karya asli)

Semua isi portofolio dibaca dari satu berkas: `src/data/portfolio.json`.

**Langkah 1 — simpan fotonya.** Taruh gambar di `public/artwork/`, misalnya
`public/artwork/sketsa-anatomi.jpg`. Saran: sisi terpanjang ±1600 px, ukuran
di bawah 500 KB.

**Langkah 2 — tambah satu objek di JSON:**

```json
{
  "title": "Studi Anatomi Tangan",
  "category": "Ilustrasi Teknis",
  "service": "lineart",
  "medium": "Tinta 0.3 · A3",
  "size": "2026",
  "src": "/artwork/sketsa-anatomi.jpg",
  "span": "tall"
}
```

| Field | Isi | Catatan |
| --- | --- | --- |
| `title` | Judul karya | tampil di bawah gambar |
| `category` | Kategori | jadi tombol filter otomatis |
| `service` | `sketsa` / `lineart` / `fullcolor` / `fanart` | harus salah satu |
| `medium` | Media & ukuran | mis. `Marker · A4` |
| `size` | Tahun / keterangan | teks pendek |
| `src` | Path gambar | diawali `/artwork/` |
| `span` | `tall` / `normal` / `short` | tinggi relatif kartu |

**Langkah 3 — lihat hasilnya.** `npm run dev` langsung ter-refresh. Untuk build
produksi, jalankan ulang `npm run build` lalu start lagi (atau cukup klik dua kali
`jalankan-web.bat`).

## Mengubah kontak & kuota

Semua ada di `src/lib/site-config.ts`:

| Field | Arti |
| --- | --- |
| `whatsapp` | nomor tujuan pesanan (format `62…`) |
| `kota`, `alamatSingkat` | lokasi studio |
| `jamOperasional` | teks jam buka |
| `kuotaMingguan`, `sisaSlot` | angka badge kuota (`sisaSlot: 0` → "penuh") |

## Rumus harga (`calculateQuote`)

```
dasar   = basePrice(service) + size.modifier + complexity.modifier
express = deadline === "express" ? 25% × dasar : 0
total   = dasar + express + Σ addon.price
dp      = 50% × total        sisa = total − dp
```

## Analitik

- **Vercel Web Analytics** — aktif otomatis setelah deploy (`<Analytics />` di layout).
  Nyalakan di dashboard Vercel → tab Analytics.
- **Google Analytics 4** — opsional. Isi env var `NEXT_PUBLIC_GA_ID` (format
  `G-XXXXXXXXXX`) di Vercel, lalu redeploy. Event yang dikirim: `begin_checkout`,
  `form_submit`, `select_service`, `view_portfolio`, plus UTM.

## Catatan etika

Situs memosisikan karya sebagai **referensi visual**, bukan jasa pengerjaan tugas.
Penafian muncul di wizard (checkbox wajib), footer, dan §5 Syarat & Ketentuan.
