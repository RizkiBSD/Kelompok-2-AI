# Riski 1 — Riset Topik Proyek

Folder ini berisi riset topik untuk proyek **Platform Informasi Akademik Terpusat dengan Inovasi Pencarian Partner Lomba & Magang**.

## Isi Folder

| File | Deskripsi |
|---|---|
| [`riset-informasi-akademik-terpusat.md`](riset-informasi-akademik-terpusat.md) | Dokumen riset lengkap: latar belakang, bukti kebutuhan, gap analysis, usulan solusi, model matching, risiko, roadmap, metrik, dan daftar 30 sumber |
| [`sumber-30.csv`](sumber-30.csv) | 30 sumber dalam format tabel (kategori, judul, penerbit, URL, data kunci) |
| [`persempitan-scope-5-konsep-bisnis.md`](persempitan-scope-5-konsep-bisnis.md) | Penyaringan 5 konsep bisnis (skoring, kompetitor, model bisnis) → terpilih **Sifela** |
| [`sifela/`](sifela/) | **Prototipe web Sifela** — pusat info part-time berbasis shift, freelance kecil, dan gig harian; pencarian, rekomendasi, radius, paywall Plus |

## Prototipe Web Sifela

Folder [`sifela/`](sifela/) berisi prototipe statis (HTML/CSS/JS, tanpa build step) dari
konsep kerja paruh waktu fleksibel:

- Pencarian + filter (kategori, tipe kerja, hari, upah) dan 4 mode pengurutan
- Rekomendasi dengan skor 4 faktor (skill 40%, minat 20%, jadwal 20%, jarak 20%)
- Filter wilayah & radius (Gratis 10 km, Plus 50 km)
- Tema gelap navy konsisten di semua halaman (depan, aplikasi, autentikasi, pembayaran, modal, dan notifikasi)
- Homepage bergelap empat menu (Beranda, Akun & Profil, Untuk Perusahaan, Cari Lowongan) dengan paket dan harga tetap di halaman depan
- Navigasi aplikasi dapat kembali ke Beranda lewat logo Sifela atau item Beranda; tersedia Akun & Profil serta Untuk Perusahaan
- Profil kerja menyimpan CV, alamat, telepon, pendidikan, target upah, portofolio, ketersediaan, dan riwayat pengalaman kerja
- Pencarian dapat dibuka tanpa akun (akun tamu); fitur berbayar dibatasi (6 lowongan, 3 lamaran/bulan, skor detail, chat)
- Tombol Sifela Plus di homepage langsung menuju halaman pembayaran (simulasi QRIS / e-wallet / transfer)
- Sisi mitra: pasang lowongan gratis (2 aktif), upgrade Mitra Pro untuk penonjolan & statistik
- Filter kecocokan profil (skor minimal 70%) selain filter jadwal, wilayah, dan radius

Cara menjalankan: buka `sifela/index.html` di browser, atau
`python -m http.server 8099` di dalam folder tersebut. Untuk hosting statis, aplikasi
sudah siap di-deploy ke Vercel: gunakan **Root Directory** `Rizki-1/sifela`, atau
biarkan `Rizki-1` karena `vercel.json` di folder ini mengalihkan Output Directory ke
`sifela`. Detail lengkap ada di [`sifela/README.md`](sifela/README.md).

> Data lowongan pada prototipe adalah fiktif dan alur pembayaran hanya simulasi.

## Ringkasan Singkat

**Masalah:**
1. Informasi lomba, magang, dan beasiswa tersebar di banyak kanal (Instagram, grup WA, website fakultas, portal kementerian).
2. Mahasiswa tahu peluangnya, tetapi kesulitan menemukan partner/tim untuk mengikutinya.

**Bukti:**
- 80% dari 350 mahasiswa FILKOM UB pernah kebingungan mencari partner lomba.
- Riset ITB: pencarian rekan kolaborasi masih bergantung pada jaringan sosial pribadi.
- ~10 juta mahasiswa aktif, 229 juta pengguna internet di Indonesia.
- 3.520 tim PKM 2024 dan 3.385 pendaftar GEMASTIK 2024 — tetapi tidak ada infrastruktur untuk yang gagal mencari tim.

**Solusi yang diusulkan:**
Agregator peluang terkurasi + profil keahlian + posting kebutuhan tim + rekomendasi partner berbasis kecocokan skill (bukan sekadar pertemanan), dilengkapi reputasi dan portofolio otomatis.

Lihat dokumen utama untuk detail lengkap dan seluruh 30 sumber.
