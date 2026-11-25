# Panduan Deploy — Bantugambar

Panduan ini untuk kamu yang **tidak mau berurusan dengan coding**. Ikuti urutannya,
jangan dilompati. Total waktu ± 20 menit.

Yang kamu butuhkan: email aktif, dan folder proyek `C:\Users\LENOVO\bantugambar-web`.

---

## Bagian 1 — Buat akun GitHub (tempat menyimpan file situs)

GitHub itu seperti "Google Drive untuk file kode". Gratis.

1. Buka **https://github.com/signup**
2. Isi email → password → username (contoh: `bantugambar`).
3. Verifikasi email yang dikirim GitHub.

---

## Bagian 2 — Kirim folder proyek ke GitHub (pakai GitHub Desktop)

Cara paling mudah untuk non-coder: aplikasi GitHub Desktop (bukan terminal).

1. Download **GitHub Desktop**: https://desktop.github.com → install → buka.
2. Klik **Sign in to GitHub.com** → login pakai akun tadi.
3. Menu **File → Add local repository…**
4. Pilih folder `C:\Users\LENOVO\bantugambar-web` → **Add Repository**.
   (Kalau muncul "This directory does not appear to be a Git repository", klik
   **create a repository** — jangan, folder ini sudah disiapkan. Abaikan dan pilih folder lagi.)
5. Klik tombol **Publish repository** di kanan atas.
6. Beri nama `bantugambar-web`. Hilangkan centang **Keep this code private**
   (biar gratis & mudah), lalu **Publish repository**.

✅ Sekarang file situs ada di `https://github.com/USERNAME/bantugambar-web`.

---

## Bagian 3 — Terbitkan ke internet lewat Vercel

Vercel itu yang mengubah kode jadi website yang bisa dibuka siapa saja. Gratis.

1. Buka **https://vercel.com/signup**
2. Pilih **Continue with GitHub** → **Authorize**.
3. Di dashboard: **Add New… → Project**.
4. Cari repo `bantugambar-web` → klik **Import**.
5. Di halaman konfigurasi:
   - Framework Preset: **Next.js** (otomatis terdeteksi)
   - Build Command, Output, Root: **biarkan default**
   - Environment Variables: **kosongkan dulu**
6. Klik **Deploy** → tunggu ± 2 menit.

✅ Selesai. Kamu dapat alamat seperti:
`https://bantugambar-web.vercel.app`

Buka di HP/laptop, kirim ke teman — sudah bisa diakses dari mana saja.

---

## Bagian 4 — Nyalakan pantauan traffic (analytics)

### A. Vercel Web Analytics — paling gampang, tanpa akun tambahan

1. Buka project di Vercel → tab **Analytics**.
2. Klik **Enable** (Web Analytics).
3. Tunggu beberapa jam sampai data terkumpul.

Yang bisa kamu lihat: jumlah pengunjung, halaman yang paling dibuka, asal
pengunjung (Google/Instagram/WhatsApp), perangkat (HP/komputer), dan negara.

### B. Google Analytics 4 — lebih detail (opsional)

Kalau nanti butuh tahu tombol mana yang diklik, dari mana pengunjung datang
sampai akhirnya pesan:

1. Buka **https://analytics.google.com** → **Admin** → **Create Property**.
2. Nama: `Bantugambar` → zona waktu Indonesia → mata uang IDR.
3. Pilih platform **Web** → isi URL `https://bantugambar-web.vercel.app`.
4. Salin **Measurement ID** yang berformat `G-XXXXXXXXXX`.
5. Di Vercel → **Settings → Environment Variables** → tambahkan:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (punya kamu)
6. **Deployments → … → Redeploy**.

Setelah itu buka `https://analytics.google.com` → **Reports → Realtime**
untuk melihat pengunjung yang sedang online.

> Catatan keamanan: ID ini memang publik (bukan rahasia), tapi tetap jangan
> pernah menaruh kunci rahasia (password, token pembayaran) di kode.

---

## Bagian 5 — Mengubah isi situs setelah online (tanpa coding)

Setiap kali kamu menyimpan perubahan di GitHub, Vercel **otomatis** memperbarui
situs dalam ± 1 menit. Tidak perlu buka laptop proyek.

### Menambah karya portofolio

1. Buka `https://github.com/USERNAME/bantugambar-web`
2. Masuk folder **src → data** → klik **portfolio.json**
3. Klik ikon **pensil ✏️** (kanan atas file).
4. Salin satu blok `{ ... }` yang sudah ada, tempel di bawahnya, lalu ubah isinya:

```json
{
  "title": "Judul Karya",
  "category": "Potret",
  "service": "sketsa",
  "medium": "Pensil grafit di kertas A4",
  "size": "A4",
  "src": "/artwork/artwork-13.jpg",
  "span": "normal"
}
```

5. Untuk gambarnya: kembali ke halaman utama repo → folder **public → artwork**
   → **Add file → Upload files** → tarik gambar kamu (beri nama `artwork-13.jpg`).
6. Klik **Commit changes** di bagian bawah.

Tunggu ± 1 menit, buka situs → karya baru sudah muncul.

### Mengubah nomor WhatsApp / jam buka / kuota

1. Buka **src → lib → site-config.ts**
2. Klik ✏️, ubah angka/nomor, **Commit changes**.

| Yang mau diubah | Baris |
|---|---|
| Nomor WhatsApp | `whatsapp: "6281225544755"` |
| Kota/alamat | `kota: "Tembalang, Kota Semarang"` |
| Jam buka | `jamOperasional: "Senin–Sabtu · 09.00–18.00 WIB"` |
| Kuota per minggu | `kuotaMingguan: 7` |
| Sisa slot minggu ini | `sisaSlot: 4` (isi `0` kalau penuh) |

---

## Kalau ada yang rusak

Buka Vercel → project → **Deployments**. Kalau ada tanda merah (Failed):

1. Klik deployment yang gagal → lihat bagian **Building** → cari baris `Error`.
2. Paling sering penyebabnya: salah ketik di `portfolio.json` (kurang tanda
   kutip `"` atau koma). Perbaiki di GitHub, commit lagi.
3. Masih bingung? Kembalikan file ke versi sebelumnya: di GitHub buka file →
   **History** → pilih versi lama → **Restore**.

---

## Ringkasan alur sehari-hari

| Kebutuhan | Yang dilakukan |
|---|---|
| Tambah karya | Edit `src/data/portfolio.json` + upload gambar di `public/artwork/` |
| Ubah harga/teks | Edit file terkait di GitHub, commit |
| Lihat traffic | Vercel → Analytics |
| Lihat pesanan masuk | WhatsApp (semua pesanan masuk ke chat) |
| Situs error | Vercel → Deployments → cek log |
