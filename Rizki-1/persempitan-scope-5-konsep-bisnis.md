# Persempitan Scope: 10 Ide → 5 Permasalahan → 5 Konsep Bisnis Web

**Tanggal:** 22 November 2026
**Konteks:** Seleksi ide proyek Kelompok 2 — dari 10 usulan menjadi 5 yang layak dieksekusi

---

## 1. Ringkasan Keputusan

Dari 10 ide, dipilih **5** berdasarkan lima kriteria berbobot. Lima ide lain **digugurkan** dengan alasan eksplisit — bukan karena kurang menarik, tetapi karena kalah pada satu atau lebih kriteria kritis (bukti masalah, kelayakan, atau diferensiasi).

| Peringkat | Ide Asli | Skor | Konsep Bisnis | Status |
|---|---|---|---|---|
| 1 | Part-time fleksibel terpusat (#5) | **4,40** | **ShiftKu** | ✅ Dipilih |
| 2 | Info akademik + partner lomba (#1) | **4,30** | **LombaLink** | ✅ Dipilih |
| 3 | Konseling terjangkau (#6) | **4,25** | **Teduh** | ✅ Dipilih |
| 4 | Preloved buku/barang kuliah (#2) | **3,80** | **BukuLoop** | ✅ Dipilih |
| 5 | Kantin anti-antri (#9) | **3,75** | **KantinKilat** | ✅ Dipilih |
| 6 | Jasa bersih kos (#8) | 3,50 | — | ❌ Gugur (runner-up) |
| 7 | Sharing tugas/skripsi (#4) | 3,50 | — | ❌ Gugur (risiko integritas akademik) |
| 8 | Prokrastinasi (#3) | 3,05 | — | ❌ Gugur |
| 9 | Transportasi terjangkau (#7) | 3,05 | — | ❌ Gugur |
| 10 | Kartu mahasiswa NFC (#10) | 3,00 | — | ❌ Gugur |

---

## 2. Metode Penyaringan

### 2.1 Kriteria dan Bobot

| Kode | Kriteria | Bobot | Yang dinilai |
|---|---|---|---|
| **K1** | Kekuatan bukti masalah | 25% | Ada data sekunder/riset? Atau hanya asumsi? |
| **K2** | Ukuran pasar & frekuensi | 20% | Berapa banyak pengguna? Seberapa sering masalahnya muncul? |
| **K3** | Kelayakan teknis | 20% | Bisa dibangun tim mahasiswa dengan web stack standar? |
| **K4** | Diferensiasi | 20% | Sudah banyak pemain? Ada celah yang jelas? |
| **K5** | Kejelasan monetisasi | 15% | Ada jalur pendapatan yang realistis? |

Skala 1–5. Skor akhir = Σ (skor × bobot).

### 2.2 Matriks Skor Lengkap

| # | Ide | K1 | K2 | K3 | K4 | K5 | **Skor** |
|---|---|---|---|---|---|---|---|
| 5 | Part-time fleksibel | 5 | 5 | 4 | 3 | 5 | **4,40** |
| 1 | Info akademik + partner lomba | 5 | 5 | 4 | 4 | 3 | **4,30** |
| 6 | Konseling terjangkau | 5 | 4 | 5 | 3 | 4 | **4,25** |
| 2 | Preloved buku/barang | 4 | 4 | 5 | 2 | 4 | **3,80** |
| 9 | Kantin anti-antri | 3 | 3 | 5 | 4 | 4 | **3,75** |
| 8 | Jasa bersih kos | 3 | 3 | 4 | 3 | 5 | 3,50 |
| 4 | Sharing tugas/skripsi | 4 | 4 | 4 | 3 | 2 | 3,50* |
| 3 | Prokrastinasi | 3 | 5 | 4 | 1 | 2 | 3,05 |
| 7 | Transportasi | 4 | 5 | 1 | 2 | 3 | 3,05 |
| 10 | Kartu NFC | 3 | 4 | 1 | 4 | 3 | 3,00 |

\* Ide #4 tidak lolos meski skornya setara #8, karena **penalti risiko**: model bisnisnya bertumpu pada berbagi tugas/skripsi yang berpotensi melanggar integritas akademik.

---

## 3. Lima Ide yang Gugur (dan Alasannya)

### ❌ #3 Prokrastinasi — "Web/app seperti Gentayu + reminder"

| Aspek | Penilaian |
|---|---|
| Masalah | Nyata dan universal |
| **Masalah utama** | **Pasar sangat padat** (Forest, TickTick, Notion, Google Calendar, Habitica) |
| Diferensiasi | Hampir nol — fitur pengingat adalah komoditas gratis |
| Monetisasi | Sangat sulit; pengguna enggan membayar aplikasi produktivitas |
| Skor | **3,05** |

**Kesimpulan:** masalahnya benar, tetapi tidak ada alasan bagi pengguna untuk berpindah dari aplikasi gratis yang sudah mereka pakai. Ini ide yang "aman" tetapi lemah sebagai bisnis.

---

### ❌ #4 Sharing Tugas/Skripsi — "Web seperti Brainly/Menfess"

| Aspek | Penilaian |
|---|---|
| Masalah | Nyata (mahasiswa butuh referensi) |
| **Masalah utama** | **Risiko integritas akademik** — berbagi tugas & skripsi membuka jalan plagiarisme |
| Risiko hukum | Tinggi; kampus dapat memblokir, bahkan ada potensi sanksi |
| Skor | **3,50 + penalti** |

**Kesimpulan:** secara teknis mudah, tetapi **tidak boleh** menjadi inti model bisnis. Jika tetap ingin menyentuh area ini, ubah menjadi **bank referensi & diskusi** (bukan berbagi jawaban) — tetapi itu sudah bukan ide awal lagi.

---

### ❌ #7 Transportasi Terjangkau — "Layanan transportasi mahasiswa"

| Aspek | Penilaian |
|---|---|
| Masalah | Nyata (biaya transport membebani) |
| **Masalah utama** | **Bukan bisnis web** — ini bisnis operasional berat (armada, pengemudi, izin, asuransi) |
| Kompetitor | Gojek, Grab, TransJakarta, shuttle kampus bersubsidi |
| Skor | **3,05** |

**Kesimpulan:** membutuhkan modal besar dan izin operasional. Tidak realistis untuk proyek kelompok, dan secara kompetitif sudah didominasi pemain raksasa.

---

### ❌ #10 Kartu Mahasiswa NFC

| Aspek | Penilaian |
|---|---|
| Masalah | Kartu mahasiswa memang kurang fungsional |
| **Masalah utama** | **Ketergantungan hardware + institusi** — butuh kerja sama wajib dengan kampus dan penerbitan kartu fisik |
| Skor | **3,00** |

**Kesimpulan:** ide bagus secara konsep, tetapi **tidak bisa berdiri sebagai bisnis web**. Bisa menjadi fitur tambahan (kartu digital berbasis QR di dalam aplikasi), bukan produk utama.

---

### ❌ #8 Jasa Bersih Kos — "Web jasa bersih"

| Aspek | Penilaian |
|---|---|
| Masalah | Nyata (mahasiswa sibuk, kos kotor) |
| Kekuatan | Monetisasi jelas, mudah dipahami |
| **Masalah utama** | **Operasional berat** — mengelola tenaga kerja, kualitas, kepercayaan, dan keamanan akses kamar |
| Skor | **3,50** (runner-up terdekat) |

**Kesimpulan:** bukan pilihan buruk, tetapi kalah tipis dari KantinKilat karena ongkos operasional dan risiko keamanan lebih tinggi. **Simpan sebagai cadangan** jika ide kantin tidak mendapat dukungan mitra kampus.

---

## 4. Lima Konsep Bisnis Web

---

### 🥇 Konsep 1 — **ShiftKu**
#### Platform kerja paruh waktu fleksibel berbasis shift untuk mahasiswa

**Masalah yang diselesaikan:**
Mahasiswa butuh penghasilan tambahan, tetapi jadwal kuliah tidak tetap. Lowongan part-time yang ada umumnya menuntut jam kerja kaku (6–8 jam/hari) dan proses rekrutmen panjang — tidak cocok dengan jadwal kuliah yang berubah tiap semester. Akibatnya banyak mahasiswa mengambil kerja informal tanpa perlindungan, atau mengalami konflik peran kuliah–kerja.

**Bukti masalah:**

- **44%** mahasiswa bekerja sambil kuliah pada studi 205 responden di FE UNY **[S5]**
- Sekitar **3–4 juta** mahasiswa aktif diperkirakan juga bekerja (BPS 2024) **[S6]**
- **74,5%** dari 145 mahasiswa pekerja berada pada kategori **konflik peran sedang**, 13,8% tinggi **[S9]**
- Pendapatan part-time mahasiswa berkisar **Rp2–3,5 juta/bulan** **[S10]**
- Kerja part-time terbukti **menurunkan waktu belajar dan prestasi akademik** — sehingga penjadwalan yang fleksibel bukan kemewahan, melainkan kebutuhan **[S5]**

**Solusi produk:**
Marketplace kerja berbasis **shift** (bukan lowongan penuh): pemilik usaha memposting slot 3–4 jam, mahasiswa memilih slot yang tidak bentrok dengan jadwal kuliahnya.

**Fitur MVP:**

1. Input jadwal kuliah → sistem **menyembunyikan shift yang bentrok** (ini pembeda utama)
2. Posting shift oleh UMKM/kafe/retail: durasi, upah per jam, lokasi, syarat
3. Apply satu klik + profil singkat + rating
4. Kalender shift & pengingat
5. Pembayaran/rekap upah per shift (fase 2)

**Model bisnis:**

| Aliran | Detail |
|---|---|
| Komisi per shift terisi | 5–10% dari nilai shift |
| Langganan UMKM | Rp99–199rb/bulan untuk posting tak terbatas |
| Featured listing | Promosi lowongan |

**Kompetitor & diferensiasi:**
Glints, Dealls, Jobstreet — semuanya berorientasi **lowongan penuh/rekrutmen**, bukan **slot shift fleksibel**. Diferensiasi ShiftKu: *scheduling-first*, bukan *CV-first*.

**Moat:** data jadwal kuliah + riwayat keandalan (reliability score) mahasiswa → makin lama makin akurat.

**Risiko utama:** cold start dua sisi (butuh UMKM dan mahasiswa sekaligus); perlu mulai dari 1 kawasan kampus.

**Metrik:** shift terisi/minggu, rasio shift terisi vs diposting, repeat rate UMKM.

---

### 🥈 Konsep 2 — **LombaLink**
#### Informasi akademik terpusat + pencarian partner lomba & magang

**Masalah yang diselesaikan:**
(1) Informasi lomba, magang, dan beasiswa tersebar di banyak kanal; (2) mahasiswa tahu peluangnya tetapi tidak punya tim untuk mengikutinya.

**Bukti masalah:**

- **80% dari 350 mahasiswa** FILKOM Universitas Brawijaya pernah kebingungan mencari partner lomba **[S1]**
- Riset ITB: pencarian rekan kolaborasi masih bergantung pada jaringan sosial pribadi, membuat partisipasi **tidak merata** **[S2]**
- Algoritma *affinity matching* pada riset ITB mencapai **94,1%** keberhasilan pengujian **[S2]**
- ~**10 juta** mahasiswa aktif **[S13]** dan **229 juta** pengguna internet **[S14]**

**Solusi produk:**
Agregator peluang terkurasi + sistem pencocokan partner berbasis **skill komplementer** (bukan pertemanan), lengkap dengan posting kebutuhan tim dan chat terbatas.

**Fitur MVP:**

1. Direktori peluang: lomba, magang, beasiswa (filter jenjang, bidang, deadline, status)
2. Profil keahlian + peran yang diminati
3. Posting "tim butuh 1 desainer, 1 analis"
4. Rekomendasi partner dengan skor kecocokan
5. Ajakan + chat in-app (kontak pribadi tersembunyi)

**Model bisnis:**

| Aliran | Detail |
|---|---|
| Freemium | Fitur dasar gratis; analitik tim & prioritas match berbayar |
| B2B kampus | Dasbor untuk kemahasiswaan/fakultas |
| Sponsor penyelenggara | Promosi lomba |

**Kompetitor & diferensiasi:**
SejutaCita, FlashCampus, Doro Kampus — kuat di **agregasi**, tidak punya **team matching**. Prototipe team finder yang ada tidak punya ekosistem informasi. LombaLink menyatukan keduanya.

**Moat:** jaringan dua sisi + data kompatibilitas kolaborasi (siapa cocok bekerja dengan siapa).

**Risiko utama:** kualitas & kesegaran data peluang; cold start tim.

**Metrik:** jumlah tim terbentuk, rasio ajakan diterima, retensi 14 hari, skor SUS ≥ 70.

> **Catatan:** konsep ini sudah punya dokumen riset lengkap di `Rizki-1/riset-informasi-akademik-terpusat.md` (30 sumber).

---

### 🥉 Konsep 3 — **Teduh**
#### Layanan konseling terjangkau khusus mahasiswa

**Masalah yang diselesaikan:**
Kebutuhan konseling psikologis tinggi, tetapi akses sangat rendah karena tiga hal: biaya, stigma, dan keterbatasan layanan kampus.

**Bukti masalah (paling kuat di antara semua ide):**

- **34,9%** remaja Indonesia (≈**15,5 juta**) mengalami masalah kesehatan mental dalam 12 bulan **[S3][S4]**
- **5,5%** (≈2,45 juta) memenuhi kriteria gangguan mental **[S4]**
- **Hanya 2,6%** dari remaja dengan masalah kesehatan mental pernah mengakses layanan konseling **[S4]**
- Hanya **2,0%** remaja pernah memakai layanan apa pun; **66,5%** di antaranya hanya sekali **[S4]**
- **43,8%** pengasuh yang merasa anaknya butuh bantuan **tidak mencari bantuan** karena memilih menangani sendiri **[S4]**

> Angka **2,6% akses** melawan **34,9% prevalensi** adalah celah terbesar dalam seluruh daftar 10 ide ini.

**Solusi produk:**
Platform konseling mahasiswa dengan tiga pilar: **harga terjangkau** (sesi singkat 30 menit, tarif bersubsidi/skala), **anonimitas** (nama samaran, sesi teks), dan **jadwal yang cocok dengan jam kuliah**.

**Fitur MVP:**

1. Direktori konselor terverifikasi (nomor STR/SIPP ditampilkan)
2. Booking sesi 30 menit + pembayaran terjangkau
3. Opsi sesi **chat/teks** untuk menurunkan hambatan bicara
4. Skrining awal mandiri (bukan diagnosis) + triase ke layanan darurat
5. Modul edukasi & peer support terkurasi

**Model bisnis:**

| Aliran | Detail |
|---|---|
| Komisi per sesi | 10–15% |
| Subsidi silang | Sesi korporat menutup sesi mahasiswa |
| B2B kampus | Paket layanan untuk unit layanan psikologi kampus |

**Kompetitor & diferensiasi:**
Halodoc, KlikDokter, Riliv. Diferensiasi: **fokus mahasiswa** — harga, jam, bahasa, dan konteks (akademik, kos, keluarga, finansial) yang spesifik.

**Moat:** kepercayaan + jaringan konselor + protokol krisis yang mapan.

**Risiko utama (harus ditangani serius):**
- **Legal & etika:** wajib konselor berlisensi, kerahasiaan, dan protokol penanganan krisis (ide bunuh diri) yang jelas
- **Stigma:** perlu desain yang membuat pengguna merasa aman
- **Bukan pengganti layanan darurat:** harus ada rujukan eksplisit

**Metrik:** sesi terisi, rasio pengguna ulang, waktu tunggu, kepuasan pasca-sesi.

---

### Konsep 4 — **BukuLoop**
#### Preloved khusus mahasiswa: buku & barang kebutuhan kuliah

**Masalah yang diselesaikan:**
Buku dan perlengkapan kuliah mahal dan hanya dipakai satu semester, tetapi pasar bekasnya tidak efisien — tersebar di grup WA, Facebook Marketplace, dan platform umum yang tidak mengenal konteks kampus.

**Bukti masalah:**

- Harga buku baru menjadi alasan utama orang mencari buku bekas **[S16]**
- Buku bekas kuliah dijual dengan **diskon 50–75%** dari harga baru **[S17]**
- Buku teks kedokteran/teknik dapat menembus **Rp1 juta+** per buku **[S17][S19]**
- Kebutuhan bersifat **musiman dan berulang**: jutaan mahasiswa membeli lalu menjual kembali buku yang hanya dipakai satu semester **[S18]**
- Di platform umum, buku kuliah dijual **Rp15–50 ribu** — menunjukkan volume transaksi nyata **[S20]**

**Solusi produk:**
Marketplace preloved **terbatas untuk mahasiswa terverifikasi**, diorganisir berdasarkan **kode mata kuliah**, bukan kategori umum. Fokus: cepat ketemu, COD di kampus, tanpa ongkir.

**Fitur MVP:**

1. Verifikasi email kampus → hanya mahasiswa yang bisa bertransaksi
2. Katalog berbasis **kode MK + kampus + semester**
3. COD point di kampus (titik temu aman)
4. Foto kondisi berstandar + label kondisi
5. Wishlist "buku ini dicari" (reverse marketplace)

**Model bisnis:**

| Aliran | Detail |
|---|---|
| Biaya layanan kecil | Rp2–5rb per transaksi (lebih murah dari ongkir) |
| Iklan toko buku kampus | Promosi |
| Freemium | Highlight listing |

**Kompetitor & diferensiasi:**
Shopee, Tokopedia, Carousell, Facebook Marketplace, grup WA. Diferensiasi: **verifikasi kampus + kurasi per mata kuliah + COD lokal** → menghilangkan masalah ongkir dan penipuan.

**Moat:** efek jaringan per kampus (semakin banyak mahasiswa satu kampus, semakin cepat barang ketemu).

**Risiko utama:** skala kecil per kampus; monetisasi tipis; perlu densitas pengguna sebelum berguna.

**Metrik:** waktu rata-rata barang terjual, % transaksi COD sukses, rasio listing terjual.

---

### Konsep 5 — **KantinKilat**
#### Kantin universitas dengan pre-order anti-antri

**Masalah yang diselesaikan:**
Jam istirahat kuliah sangat sempit (10–15 menit), tetapi antrean kantin panjang. Mahasiswa memilih melewatkan makan atau membeli di luar yang lebih mahal.

**Status bukti:** ⚠️ **Hipotesis — belum ada data sekunder yang kuat.**
Ide ini lolos terutama karena **kelayakan teknis dan diferensiasi**, bukan kekuatan data. Wajib divalidasi primer sebelum dikembangkan (lihat protokol di bawah).

**Solusi produk:**
Pre-order + jadwal pengambilan per slot waktu, sehingga mahasiswa datang tepat saat pesanan siap.

**Fitur MVP:**

1. Menu digital per kantin/tenant
2. Pre-order + pilih slot pengambilan (mis. 12:10)
3. Pembayaran digital / QRIS
4. Status pesanan real-time
5. Dasbor tenant: antrean pesanan masuk

**Model bisnis:**

| Aliran | Detail |
|---|---|
| Komisi per transaksi | 3–5% |
| Langganan tenant | Rp50–100rb/bulan |
| Bagi hasil QRIS | Dari penyedia pembayaran |

**Kompetitor & diferensiasi:**
GoFood, GrabFood, ShopeeFood — berorientasi **pengantaran** dengan ongkir dan komisi besar. Diferensiasi: **ambil sendiri di kantin kampus**, tanpa ongkir, slot waktu presisi, komisi kecil.

**Moat:** kemitraan eksklusif dengan pengelola kantin kampus (hambatan masuk bagi pesaing).

**Risiko utama:** butuh kerja sama pengelola kantin; nilai transaksi kecil (Rp15–25rb) sehingga komisi tipis; perilaku pesanan bisa menumpuk di jam yang sama.

**Protokol validasi wajib (1 minggu):**
1. Observasi antrean 3 kantin × 3 hari jam sibuk → catat waktu tunggu rata-rata
2. Survei 100 mahasiswa → berapa kali/minggu melewatkan makan karena antre
3. Wawancara 5 pengelola kantin → kesediaan ikut sistem
4. **Gate keputusan:** lanjut hanya jika ≥60% responden menyatakan pernah melewatkan makan karena antre **dan** ≥2 kantin bersedia jadi mitra

**Metrik:** pesanan/menit saat jam sibuk, waktu tunggu rata-rata, repeat rate, jumlah tenant aktif.

---

## 5. Perbandingan Lima Konsep

| Aspek | ShiftKu | LombaLink | Teduh | BukuLoop | KantinKilat |
|---|---|---|---|---|---|
| Kekuatan bukti | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Ukuran pasar | Sangat besar | Besar | Besar | Sedang | Kecil per kampus |
| Kemudahan MVP | Sedang | Sedang | Mudah–sedang | Mudah | Mudah |
| Diferensiasi | Tinggi | Tinggi | Sedang | Sedang | Tinggi |
| Monetisasi | Jelas | Sedang | Jelas | Tipis | Sedang |
| Risiko regulasi | Sedang | Rendah | **Tinggi** | Rendah | Rendah |
| Nilai akademik (AI) | Sedang | **Tinggi** | Sedang | Rendah | Rendah |
| Skalabilitas | Tinggi | Tinggi | Tinggi | Rendah (per kampus) | Rendah (per kampus) |

---

## 6. Rekomendasi

### Jika tujuan utama = **nilai akademik & kelayakan demo**
→ **Pilih LombaLink (Konsep 2).**
Alasan: satu-satunya ide dengan **bukti survei primer (80% dari 350 responden)**, **dua rujukan akademik Indonesia**, dan **komponen AI yang dapat diukur** (algoritma matching + evaluasi SUS/UAT). Paling kuat untuk laporan/skripsi, dan sudah punya dokumen riset 30 sumber.

### Jika tujuan utama = **potensi bisnis nyata**
→ **Pilih ShiftKu (Konsep 1).**
Alasan: pasar terbesar, monetisasi paling jelas (komisi transaksi), dan ada celah nyata vs Glints/Dealls (fleksibel berbasis shift, bukan rekrutmen penuh).

### Jika tujuan utama = **dampak sosial**
→ **Pilih Teduh (Konsep 3).**
Alasan: data paling menyentuh (hanya **2,6%** dari 34,9% yang bermasalah pernah mengakses layanan). Namun siapkan anggaran waktu untuk urusan **lisensi konselor dan protokol krisis** — jangan diremehkan.

### Jika butuh **MVP tercepat untuk demo**
→ **Pilih KantinKilat (Konsep 5)** — tetapi **hanya setelah** validasi primer berhasil. Tanpa data, ini ide paling rapuh di antara lima.

---

## 7. Sumber

### Partner lomba & kolaborasi akademik
**[S1]** Perancangan Pengalaman Pengguna Aplikasi Pencari Partner Lomba Bagi Mahasiswa Berbasis Mobile Menggunakan Metode Design Thinking. *J-PTIIK, Universitas Brawijaya.* — 80% dari 350 mahasiswa pernah kebingungan mencari partner lomba.
→ https://j-ptiik.ub.ac.id/index.php/j-ptiik/article/download/7777/3671/55261

**[S2]** Pengembangan Aplikasi Pencarian Peluang Kolaborasi Mahasiswa: Modul Team Formation dengan Role Compatibility Menggunakan Affinity Based Matching. *Repositori Tesis ITB.* — ketergantungan pada jaringan sosial pribadi; algoritma 94,1% berhasil.
→ https://scholar.itb.ac.id/thesis/pengembangan-aplikasi-pencarian-peluang-kolaborasi_108325

### Kesehatan mental & akses layanan
**[S3]** Hasil Survei I-NAMHS: Satu dari Tiga Remaja Indonesia Memiliki Masalah Kesehatan Mental. *Universitas Gadjah Mada.*
→ https://ugm.ac.id/id/berita/23086-hasil-survei-i-namhs-satu-dari-tiga-remaja-indonesia-memiliki-masalah-kesehatan-mental/

**[S4]** I-NAMHS: Indonesia – National Adolescent Mental Health Survey (Laporan Bahasa Indonesia). *Queensland Centre for Mental Health Research.* — 34,9% masalah kesehatan mental; 5,5% gangguan mental; **hanya 2,6% mengakses layanan konseling**.
→ https://qcmhr.org/outputs/reports/12-i-namhs-report-bahasa-indonesia/file

### Mahasiswa yang bekerja part-time
**[S5]** Mardelina, E. & Muhson, A. Mahasiswa Bekerja dan Dampaknya pada Aktivitas Belajar dan Prestasi Akademik. *Economia, Universitas Negeri Yogyakarta.* — 44% mahasiswa bekerja; prestasi cenderung lebih rendah.
→ https://journal.uny.ac.id/index.php/economia/article/download/13239/pdf

**[S6]** Analysis of Factors Influencing Academic Performance of Working Students. *IJMURHICA.* — estimasi 3–4 juta mahasiswa aktif juga bekerja (BPS 2024); ~30% mahasiswa berperan ganda.
→ https://ijmurhica.ppj.unp.ac.id/index.php/ijmurhica/article/download/431/259

**[S7]** Analisis Persentase dan Jenis Pekerjaan Mahasiswa yang Kuliah Sambil Bekerja. *JPTAM, Universitas Negeri Medan.* — sektor pekerjaan dominan: desain/konten digital, pelayan toko/restoran, pedagang daring.
→ https://jptam.org/index.php/jptam/article/view/33074

**[S8]** Hubungan Antara Time Management dan Work-Life Balance pada Mahasiswa yang Bekerja Part Time. *Repositori Universitas Sanata Dharma.* — 174 responden.
→ http://repository.usd.ac.id/55192/1/219114064_full.pdf

**[S9]** Gambaran Work-Study Conflict pada Mahasiswa yang Bekerja. — 145 responden; 74,5% konflik peran kategori sedang.
→ https://doi.org/10.63822/px2dxs89

**[S10]** Income Management Strategies of Part-Time Working Students in Samarinda City. *DJOSSE.* — jenis pekerjaan: barista, kasir, waitress; pendapatan Rp2–3,5 juta/bulan.
→ https://journal.discourseonline.id/index.php/djosse/article/download/306/90

**[S11]** Data pelajar usia 10–24 tahun yang menempuh pendidikan sambil bekerja (6,98%, BPS 2020). *Repositori Universitas Bina Insani.*
→ http://repository.unibi.ac.id/1189/3/Bab1.pdf

### Preloved buku & barang kuliah
**[S16]** 8 Tempat Beli Buku Bekas di Jabodetabek. *Kompas.com.* — harga buku baru yang mahal menjadi alasan utama mencari buku bekas.
→ https://megapolitan.kompas.com/read/2022/09/08/02150001/8-tempat-beli-buku-bekas-di-jabodetabek

**[S17]** Jual Buku Bekas Kuliah: Hemat dan Berkualitas untuk Mahasiswa. *Buku Solusi.* — diskon buku bekas 50–75% dari harga baru.
→ https://bukusolusi.com/jual-buku-bekas-kuliah/

**[S18]** Mengenal Dunia dengan Saku Mahasiswa; Ya Buku Bekas…! *Syakal, IAIN Kediri.* — pasar buku ajar bekas efisien karena jutaan mahasiswa membeli dan menjual kembali setiap semester.
→ https://syakal.iainkediri.ac.id/news/read/mengenal-dunia-dengan-saku-mahasiswa-ya-buku-bekas

**[S19]** Berkah Tahun Ajaran Baru di Pasar Buku Palasari Bandung. *detikJabar.* — buku bisa menembus Rp200rb–1,5 juta sehingga buku bekas makin dicari.
→ https://www.detik.com/jabar/bisnis/d-6189986/berkah-tahun-ajaran-baru-di-pasar-buku-palasari-bandung

**[S20]** Preloved Buku Kuliah Sospol (Rp15.000). *Carousell Indonesia.* — contoh transaksi nyata buku kuliah bekas.
→ https://id.carousell.com/p/buku-kuliah-sospol-1473393221/

**[S21]** Toko Buku Bekas: Destinasi Belanja Buku yang Ramah di Kantong Mahasiswa. *Milenialis.id.*
→ https://milenialis.id/toko-buku-bekas-destinasi-belanja-buku-yang-ramah-di-kantong-mahasiswa/

### Data pasar & benchmark platform
**[S13]** Pangkalan Data Pendidikan Tinggi (PDDikti) — 9,97 juta mahasiswa aktif, 4.416 perguruan tinggi.
→ https://pddikti.kemdiktisaintek.go.id

**[S14]** Profil Internet Indonesia 2025 — penetrasi 80,66%, 229,43 juta pengguna. *APJII.*
→ https://survei.apjii.or.id

**[S15]** Survei APJII: Pengguna Internet Indonesia 2025 Tembus 229 Juta Jiwa. *detikInet.*
→ https://inet.detik.com/telecommunication/d-8047759/survei-apjii-pengguna-internet-indonesia-2025-tembus-229-juta-jiwa

**[S22]** SejutaCita — 2,55 juta pengguna terdaftar, 17.556 event.
→ https://sejutacita.id

**[S23]** FlashCampus — agregator magang, lomba, beasiswa.
→ https://www.flashcampus.com

**[S24]** Glints — 5 juta+ talenta, 60.000+ organisasi.
→ https://glints.com/id

**[S25]** Dealls — portal kerja & magang, 7.000+ perusahaan.
→ https://dealls.com

---

## 8. Catatan Metodologi

1. **Keterbatasan data:** tidak semua ide punya data sekunder yang setara. Konsep **KantinKilat** secara eksplisit ditandai sebagai hipotesis dan wajib divalidasi primer. Menyembunyikan perbedaan ini akan membuat analisis terlihat rapi tetapi menyesatkan.

2. **Angka mahasiswa bekerja bervariasi** (6,98% pada populasi pelajar 10–24 tahun; 44% pada satu fakultas). Perbedaan ini berasal dari definisi dan populasi yang berbeda, bukan kontradiksi. Angka nasional ~30–40% hanya berlaku untuk populasi **mahasiswa**, bukan seluruh pelajar.

3. **I-NAMHS mengukur remaja 10–17 tahun**, bukan mahasiswa secara langsung. Relevansinya bersifat proksi: sebagian besar mahasiswa baru berusia 18–19 tahun dan berada satu fase setelah kelompok yang disurvei — sehingga angkanya cenderung **underestimate**, bukan overestimate.

4. **Skor bersifat judgmental**, bukan hasil pengukuran statistik. Bobot dapat diubah; yang penting adalah **transparansi kriteria** sehingga keputusan bisa diperdebatkan secara terbuka di dalam kelompok.
