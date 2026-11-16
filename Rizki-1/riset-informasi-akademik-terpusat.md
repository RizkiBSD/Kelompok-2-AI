# Riset Topik: Platform Informasi Akademik Terpusat dengan Inovasi Pencarian Partner Lomba & Magang

**Disusun untuk:** Kelompok 2 — Proyek AI
**Tanggal:** 16 November 2026
**Status:** Dokumen riset & validasi kebutuhan (pra-pengembangan)

---

## 1. Ringkasan Eksekutif

Mahasiswa dan siswa Indonesia hari ini hidup di tengah **kelimpahan informasi, tetapi kelangkaan akses**. Informasi lomba, magang, beasiswa, dan kegiatan pengembangan diri tersedia sangat banyak — namun tersebar di ratusan kanal: Instagram, grup WhatsApp/Line, website fakultas, portal kementerian, grup Telegram, hingga poster di koridor kampus. Akibatnya, peluang yang sebenarnya terbuka lebar sering **tidak pernah sampai** ke mahasiswa yang paling membutuhkannya.

Masalah menjadi berlipat ketika peluang tersebut **bersifat beregu**. Lomba, hackathon, PKM, GEMASTIK, dan program magang berbasis proyek menuntut tim dengan komposisi keahlian yang saling melengkapi. Padahal, mahasiswa umumnya hanya bisa mencari partner dari lingkaran pertemanan terdekat.

Dokumen ini mengusulkan satu topik proyek:

> **Sebuah platform informasi akademik terpusat yang tidak berhenti pada "menampilkan informasi", tetapi juga menyelesaikan langkah berikutnya: menemukan partner/tim yang tepat untuk mengeksekusi peluang tersebut.**

Dua masalah yang disatukan dalam satu produk:

1. **Fragmentasi informasi** — peluang tersebar, tidak terkurasi, dan cepat kedaluwarsa.
2. **Kesenjangan kolaborasi** — mahasiswa tahu peluangnya, tetapi tidak punya tim untuk mengambilnya.

**Kesimpulan kelayakan:** topik ini **sangat dibutuhkan** (bukti kuantitatif di Bagian 3), **layak secara teknis** (stack web modern + algoritma matching sederhana), dan **masih memiliki celah pasar** di Indonesia karena solusi yang ada umumnya hanya menyelesaikan salah satu dari dua masalah tersebut.

---

## 2. Latar Belakang Masalah

### 2.1 Ketimpangan Informasi (Information Asymmetry)

Informasi akademik dan peluang mahasiswa di Indonesia mengalir melalui **kanal informal yang bersifat tertutup**:

- Grup WhatsApp angkatan dan organisasi
- Akun Instagram BEM/HMJ dan akun info-lomba
- Website fakultas yang diperbarui tidak berkala
- Grup Telegram program kementerian

Kanal-kanal ini punya tiga kelemahan struktural:

| Kelemahan | Dampak |
|---|---|
| **Tersebar (fragmented)** | Mahasiswa harus memantau 5–10 kanal sekaligus |
| **Berbasis kedekatan sosial** | Yang punya jaringan bagus dapat info lebih cepat |
| **Tidak terkurasi** | Hoaks, info kedaluwarsa, dan tautan mati bercampur |

Dampaknya adalah **ketimpangan kesempatan**: mahasiswa dari kampus besar, organisasi aktif, atau lingkaran pertemanan "prestatif" mendapat akses informasi jauh lebih baik daripada mahasiswa di kampus kecil atau mahasiswa tahun pertama yang belum punya jaringan. Ini bukan masalah malas, melainkan masalah **arsitektur informasi**.

### 2.2 Mahasiswa Tahu Peluangnya, Tapi Tidak Punya Tim

Sebagian besar kompetisi mahasiswa bersifat **beregu** dengan komposisi peran yang ditentukan penyelenggara (programmer, desainer, analis, penulis, presenter). Ini memunculkan masalah kedua yang jarang dibahas: **pembentukan tim (team formation)**.

Temuan riset yang paling relevan:

> Survei terhadap **350 mahasiswa FILKOM Universitas Brawijaya** menemukan bahwa **80% responden pernah merasa kebingungan saat mencari partner atau anggota tim** untuk mengikuti lomba. Penyebab utamanya: lingkaran pertemanan terbatas, teman dekat tidak tertarik ikut lomba, dan tidak ada tempat terpusat untuk mencari anggota tim baru.
> — *Perancangan Pengalaman Pengguna Aplikasi Pencari Partner Lomba Bagi Mahasiswa Berbasis Mobile* (J-PTIIK UB) **[S1]**

> "Pencarian rekan kolaborasi untuk mengikuti kegiatan atau lomba eksternal masih sangat bergantung pada jaringan sosial pribadi mahasiswa sehingga proses pembentukan tim menjadi tidak merata dan sulit dilakukan di luar jaringan pertemanan yang sudah ada."
> — *Modul Team Formation dengan Role Compatibility*, Tesis ITB **[S2]**

Artinya, masalah ini bukan asumsi — sudah **divalidasi secara akademik di dua kampus besar Indonesia**, dan keduanya menyimpulkan hal yang sama: **dibutuhkan platform**, bukan sekadar grup chat.

### 2.3 Ketika Keduanya Bertemu

Kombinasi dua masalah di atas menghasilkan siklus yang merugikan:

```
Info peluang tersebar  →  yang tahu sedikit orang
        ↓                        ↓
   banyak yang tidak ikut   tim terbentuk dari lingkaran yang sama
        ↓                        ↓
   potensi mahasiswa tidak optimal  →  tim tidak seimbang, hasil kurang maksimal
```

Selain itu, ketika mahasiswa akhirnya menyerah mencari tim, mereka **membatalkan niat ikut lomba** — kerugian yang tidak terlihat dalam statistik, tetapi nyata.

---

## 3. Bukti Kebutuhan (Data Kuantitatif)

### 3.1 Skala Pasar: Besar dan Terdigitalisasi

| Indikator | Angka | Sumber |
|---|---|---|
| Mahasiswa aktif Indonesia | **9.967.487** (dashboard PDDikti) | **[S15]** |
| Mahasiswa aktif (Data & Statistik Diktiristek) | **10.754.154** | **[S16]** |
| Perguruan tinggi | **4.416** | **[S15]** |
| Pengguna internet Indonesia 2025 | **229,43 juta** (penetrasi **80,66%**) | **[S17][S18]** |
| Pertumbuhan pengguna internet | 221,56 juta (2024) → 229,43 juta (2025) | **[S18]** |

**Implikasi:** pasar sasaran berada di kisaran **10 juta mahasiswa** ditambah siswa SMA/SMK, dan hampir seluruhnya sudah terhubung internet. Ini adalah pasar yang cukup besar untuk sebuah produk, sekaligus cukup spesifik untuk digarap secara fokus.

### 3.2 Skala Masalah: Peluangnya Ada, Pesertanya Terbatas

| Program | Partisipasi | Sumber |
|---|---|---|
| PKM 2024 (8 bidang) | **3.520 tim**, **10.560 mahasiswa**, dari **459 PT**; dana **Rp27,84 miliar** | **[S21][S22]** |
| GEMASTIK 2024 | **3.385 pendaftar** (naik dari 2.780 pada 2023); final: 220 tim / 649 mahasiswa / 64 PT | **[S23]** |
| MSIB (Kampus Merdeka) | Angkatan 1: 12.837 mahasiswa / 543 PT; LLDIKTI I saja: 13.002 mahasiswa | **[S24][S25]** |

**Cara membaca data ini:** ambil PKM 2024. Ada **3.520 tim** yang didanai — artinya minimal 3.520 proses pembentukan tim berhasil. Tetapi jumlah proposal yang diajukan jauh lebih besar daripada yang didanai, dan tidak ada data resmi berapa mahasiswa yang **gagal** karena tidak menemukan tim. Dengan temuan 80% mahasiswa kebingungan mencari partner **[S1]**, dapat disimpulkan ada **populasi besar mahasiswa yang tertahan di tahap "cari tim"**, bukan di tahap "punya ide".

### 3.3 Konsekuensi Ekonomi: Pengangguran Lulusan Perguruan Tinggi

| Indikator | Angka | Sumber |
|---|---|---|
| TPT lulusan universitas (Feb 2024) | **5,83%** — lebih tinggi dari beberapa jenjang lain | **[S19]** |
| Pengangguran lulusan pendidikan tinggi | sekitar **1,01 juta orang** (13,57%) | **[S20]** |
| TPT lulusan universitas (data lain) | **6,23%** | **[S19]** |

> **Catatan kehati-hatian:** angka TPT lulusan pendidikan tinggi berbeda antar sumber karena perbedaan definisi (D4–S3 vs seluruh pendidikan tinggi) dan periode survei. Yang penting bukan angka tunggalnya, melainkan **arahnya**: lulusan perguruan tinggi tetap menyumbang pengangguran terbuka dalam jumlah besar, dan penyebab utamanya sering diidentifikasi sebagai **skill mismatch** serta **kurangnya pengalaman/potofolio**, bukan kekurangan gelar.

**Kaitan dengan topik:** magang dan lomba adalah dua jalur paling efektif untuk membangun pengalaman dan portofolio sebelum lulus. Jika akses ke keduanya dipersulit oleh fragmentasi informasi dan sulitnya mencari tim, maka **platform ini bukan sekadar alat bantu, melainkan intervensi pada akar masalah ketenagakerjaan lulusan**.

### 3.4 Validasi Kebutuhan di Tingkat Produk

Solusi serupa sudah lahir secara organik dan mendapat respons positif pasar — bukti bahwa masalahnya nyata dan orang mau memakainya:

| Platform | Bukti traksi | Sumber |
|---|---|---|
| SejutaCita | **2.548.852** mahasiswa & pelajar terdaftar, **17.556** event | **[S26]** |
| FlashCampus | agregator magang, lomba, beasiswa, volunteer + mentor | **[S27]** |
| Doro Kampus | mengakui eksplisit: *"Informasi akademik, pengumuman, beasiswa, dan komunitas kampus tersebar di banyak tempat"* | **[S28]** |
| Handshake (AS) | **7 juta+** mahasiswa, 1.000+ kampus; valuasi **$1,5 miliar** | **[S30]** |
| Unstop (India) | **140K+** peluang, **42K+** organisasi, 22,3 juta asesmen | **[S29]** |

Dua nama terakhir penting: **model bisnis ini terbukti bernilai miliaran dolar di pasar lain**, dan belum ada pemain di Indonesia yang menggabungkan secara serius *agregasi peluang* + *pencarian partner berbasis kecocokan*.

---

## 4. Analisis Solusi yang Sudah Ada (Gap Analysis)

| Platform | Agregasi info | Cari partner/tim | Fokus Indonesia | Catatan |
|---|---|---|---|---|
| SejutaCita | ✅ | ❌ | ✅ | Kuat di event & sertifikat; tidak ada team finder |
| FlashCampus | ✅ | ❌ | ✅ | Kurasi + mentor; tidak ada matching tim |
| Doro Kampus | ✅ | ⚠️ (fitur "segera hadir") | ✅ | Sudah merumuskan masalah yang sama, fitur teman belum rilis |
| LombaHub / LuarKampus / Talentika | ✅ | ❌ | ✅ | Direktori lomba/beasiswa murni |
| Unstop (India) | ✅ | ⚠️ (terbatas) | ❌ | Fokus pasar India |
| Handshake (AS) | ⚠️ (karier) | ❌ | ❌ | Fokus magang/kerja, bukan lomba |
| Discord/WA grup | ❌ | ⚠️ manual | ✅ | Tidak terstruktur, tidak terkurasi, tidak bisa dicari |
| GitHub: `invite-app`, `Pixel` | ❌ | ✅ (prototipe) | ⚠️ | Prototipe skala kecil, tanpa ekosistem informasi |

### Celah yang Bisa Diisi

1. **Tidak ada pemain yang menyatukan dua sisi:** sumber informasi peluang **dan** mekanisme pembentukan tim, dalam satu alur.
2. **Matching masih manual dan berbasis tebakan:** platform yang ada mengandalkan "ajak teman", bukan rekomendasi berbasis kompetensi.
3. **Tidak ada lapisan kepercayaan (trust layer):** tidak ada profil keahlian terverifikasi, riwayat kolaborasi, atau rating partner.
4. **Kurasi informasi lemah:** banyak direktori hanya menampilkan tautan tanpa validasi status (masih buka/tutup), tanpa personalisasi.

---

## 5. Usulan Solusi

### 5.1 Posisi Produk

> **"Satu tempat untuk menemukan peluang akademik, dan orang yang tepat untuk mengejarnya bersama."**

Bukan sekadar papan pengumuman, melainkan **mesin pencocokan peluang ↔ orang ↔ tim**.

### 5.2 Arsitektur Konsep

```
┌──────────────────────────────────────────────────────────┐
│                    LAPISAN INFORMASI                     │
│  Lomba · Magang · Beasiswa · Volunteer · Workshop        │
│  Sumber: kementerian, penyelenggara, kampus, komunitas   │
└───────────────────────┬──────────────────────────────────┘
                        │  kurasi + validasi + personalisasi
┌───────────────────────▼──────────────────────────────────┐
│                  LAPISAN PENCARIAN PARTNER               │
│  Profil keahlian · Role yang dibutuhkan · Kompatibilitas │
│  Ajakan · Chat · Manajemen tim · Reputasi                │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│                   LAPISAN EKSEKUSI                       │
│  Timeline deadline · Checklist berkas · Log kolaborasi   │
│  Portofolio otomatis (sertifikat, riwayat tim)           │
└──────────────────────────────────────────────────────────┘
```

### 5.3 Fitur MVP (Minimum Viable Product)

**Prioritas 1 — wajib ada:**

1. **Agregator peluang terkurasi** — lomba, magang, beasiswa dengan filter: jenjang, bidang, deadline, tingkat (kampus/nasional/internasional), mode (online/offline), dan status buka/tutup.
2. **Profil keahlian** — skill tagging, peran yang diminati (programmer/desainer/penulis/analis/presenter), ketersediaan waktu, portofolio singkat.
3. **Lowongan tim (team posting)** — ketua tim memposting kebutuhan: "butuh 1 desainer UI, 1 analis data, deadline 3 hari".
4. **Rekomendasi partner** — skor kecocokan berdasarkan skill komplementer, bukan skill yang sama.
5. **Ajakan & chat terbatas** — komunikasi di dalam platform, kontak pribadi disembunyikan sampai kedua pihak setuju.

**Prioritas 2 — pembeda:**

6. **Skor keseimbangan tim** — mendeteksi tim yang "5 programmer tanpa desainer".
7. **Reputasi & rating** — riwayat kolaborasi untuk mengurangi risiko partner pasif.
8. **Notifikasi deadline personal** — berdasarkan peluang yang disimpan dan tim yang diikuti.
9. **Portofolio otomatis** — riwayat lomba, peran, dan pencapaian dalam satu halaman.

### 5.4 Model Pencocokan Partner (Inti Inovasi)

Ini bagian yang membuat topik layak disebut **proyek AI**, bukan sekadar CRUD.

**Input per pengguna:**

- `S` = himpunan skill dengan tingkat penguasaan (0–5)
- `R` = peran yang diminati
- `A` = ketersediaan waktu (jam/minggu)
- `E` = pengalaman sebelumnya (jumlah & jenis proyek)
- `P` = preferensi kerja (individu/tim, kompetitif/kolaboratif)

**Skor kecocokan (contoh formula yang dapat dikembangkan):**

```
Match(u, t) = w1 · SkillGap(u, t)
            + w2 · RoleFit(u, t)
            + w3 · AvailabilityOverlap(u, t)
            + w4 · ReputationScore(u)
            + w5 · PreferenceSimilarity(u, t)
```

dengan `SkillGap` memberi nilai **tinggi ketika skill pelamar mengisi kekosongan tim** — bukan ketika skill-nya sama dengan anggota lain. Pendekatan *affinity-based matching* ini sudah divalidasi dalam tesis ITB dengan tingkat keberhasilan pengujian algoritma **94,1%** dan penerimaan pengguna **92,3%** **[S2]**.

Pendekatan alternatif yang bisa dibandingkan: TF-IDF/similarity untuk mencocokkan deskripsi kebutuhan dengan profil **[S4]**, dan model NLP untuk merekomendasikan kandidat dari posting peluang **[S3]**.

**Yang bisa dieksperimenkan (nilai akademik proyek):**

- Bandingkan **rule-based affinity** vs **embedding-based similarity**
- Ukur dampak matching terhadap **keseimbangan komposisi tim** (metrik: cakupan peran)
- Evaluasi dengan **SUS (System Usability Scale)** dan **UAT**, seperti pada riset pembanding **[S1][S2]**

### 5.5 Alur Pengguna Utama

```
Mahasiswa baru
   │
   ├─► lihat peluang (terfilter sesuai minat & jenjang)
   │        │
   │        └─► "Saya tertarik"  ──►  sistem cek: punya tim?
   │                                        │
   │                          ┌─────────────┴─────────────┐
   │                        belum                        sudah
   │                          │                            │
   │                  rekomendasi tim yang                daftar
   │                  butuh peranmu  ◄──┐                 bersama
   │                          │        │
   │                    ajakan/chat    │
   │                          │        │
   │                    tim terbentuk ─┘
   │                          │
   └──────────────────►  timeline + checklist + portofolio
```

---

## 6. Mengapa Topik Ini Sangat Dibutuhkan

**Enam alasan berbasis bukti:**

1. **Masalahnya terdokumentasi, bukan diasumsikan.** 80% dari 350 mahasiswa mengalami kebingungan mencari partner lomba **[S1]**; riset ITB menyebut ketergantungan pada jaringan pribadi sebagai akar ketidakmerataan **[S2]**.

2. **Skalanya besar dan sudah digital.** ~10 juta mahasiswa aktif **[S15][S16]** dan 229 juta pengguna internet **[S17]** — kanal digital adalah kanal utama, sehingga solusi digital tepat sasaran.

3. **Ada jarak antara minat dan eksekusi.** Ribuan tim berhasil terbentuk di PKM dan GEMASTIK setiap tahun **[S22][S23]**, tetapi tidak ada infrastruktur untuk membantu yang **gagal** di tahap mencari tim.

4. **Solusi yang ada menyelesaikan separuh masalah.** Semua agregator Indonesia menyediakan informasi; hampir tidak ada yang menyediakan mekanisme pencarian tim **[S26][S27][S28]**.

5. **Dampaknya berantai ke lapangan kerja.** Magang dan lomba adalah jalur utama membangun portofolio; pengangguran lulusan pendidikan tinggi masih sekitar 1 juta orang **[S20]** dan TPT lulusan universitas masih di atas rata-rata beberapa jenjang **[S19]**.

6. **Modelnya terbukti di pasar lain.** Handshake (**7 juta+ mahasiswa**, valuasi **$1,5 miliar**) **[S30]** dan Unstop (**140K+ peluang**, **42K+ organisasi**) **[S29]** menunjukkan bahwa platform penghubung mahasiswa–peluang adalah bisnis yang berkelanjutan, bukan eksperimen.

---

## 7. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| **Data peluang cepat kedaluwarsa** | Pengguna kehilangan kepercayaan | Status otomatis (buka/tutup), pelaporan komunitas, crawling terjadwal |
| **Cold start** (sedikit pengguna, sedikit tim) | Fitur matching tidak berguna | Mulai dari satu kampus/fakultas, integrasikan info kampus dulu |
| **Privasi & keamanan** (kontak pribadi, mahasiswa rentan) | Risiko keselamatan & hukum | Chat in-app, kontak disembunyikan, verifikasi email kampus, moderasi, pelaporan |
| **Kualitas partner** (anggota pasif/ghosting) | Pengalaman buruk, churn | Reputasi, rating pasca-kolaborasi, komitmen eksplisit saat join |
| **Kecurangan/plagiarisme** dalam lomba | Reputasi platform | Panduan integritas, larangan jual-beli karya |
| **Ketergantungan pada sumber pihak ketiga** | Data terputus | Kombinasi crawling + input komunitas + kemitraan resmi |
| **Cakupan hukum data pribadi (UU PDP)** | Sanksi | Dasar hukum pemrosesan jelas, persetujuan, hak hapus data |

---

## 8. Ruang Lingkup & Rencana Pengembangan

| Fase | Fokus | Keluaran |
|---|---|---|
| **Fase 1 — Validasi** (2–3 minggu) | Wawancara 15–20 mahasiswa, survei 100+ responden, audit 5 platform pesaing | Laporan kebutuhan & prioritas fitur |
| **Fase 2 — Prototipe** (3–4 minggu) | Wireframe, desain UI, uji usability (SUS) | Prototipe Figma + hasil uji |
| **Fase 3 — MVP** (5–6 minggu) | Agregator + profil + posting tim + matching dasar | Aplikasi web berjalan |
| **Fase 4 — Evaluasi** (2 minggu) | UAT, pengukuran akurasi rekomendasi | Laporan evaluasi + artikel |

**Stack yang disarankan:** Next.js/React + PostgreSQL + Supabase/Firebase untuk auth & realtime chat; Python (scikit-learn) untuk layanan matching; crawling berbasis RSS/API resmi untuk agregasi.

---

## 9. Metrik Keberhasilan

| Kategori | Metrik | Target awal |
|---|---|---|
| **Akuisisi** | Pengguna terdaftar dari 1 kampus | 200 dalam 8 minggu |
| **Keterlibatan** | % pengguna yang membuka ≥3 peluang/minggu | ≥ 40% |
| **Inti (North Star)** | **Jumlah tim terbentuk melalui platform** | 30 tim |
| **Kualitas matching** | % ajakan partner yang diterima | ≥ 50% |
| **Retensi** | Pengguna aktif kembali dalam 14 hari | ≥ 30% |
| **Kepuasan** | Skor SUS | ≥ 70 (kategori *good*) |
| **Dampak** | % tim yang benar-benar mendaftar lomba | ≥ 60% |

---

## 10. Kesimpulan

Topik **"Informasi Akademik Terpusat dengan Inovasi Pencarian Partner Lomba, Magang, dan Lainnya"** layak diangkat karena memenuhi tiga syarat topik yang kuat:

1. **Masalah nyata dan terukur** — bukan opini, melainkan temuan survei 350 mahasiswa (80% bingung mencari partner) dan analisis akademik bahwa ketergantungan pada jaringan pribadi membuat partisipasi tim tidak merata.
2. **Celah solusi jelas** — agregator info ada tanpa fitur tim; prototipe fitur tim ada tanpa ekosistem informasi. Belum ada yang menyatukan keduanya secara serius di Indonesia.
3. **Nilai dampak tinggi** — menyentuh langsung partisipasi lomba, akses magang, pembentukan portofolio, dan pada akhirnya kesiapan kerja lulusan.

Nilai tambah akademiknya pun kuat: proyek ini dapat diuji secara ilmiah melalui **algoritma pencocokan (affinity/TF-IDF/embedding)**, **pengukuran keseimbangan tim**, serta **evaluasi usability (SUS/UAT)** — sehingga bukan hanya produk, tetapi juga kontribusi riset yang terukur.

---

## Daftar 30 Sumber

### A. Riset Akademik tentang Pencarian Partner & Pembentukan Tim (1–8)

**[S1]** Perancangan Pengalaman Pengguna Aplikasi Pencari Partner Lomba Bagi Mahasiswa Berbasis Mobile Menggunakan Metode Design Thinking. *Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer (J-PTIIK), Universitas Brawijaya.*
→ https://j-ptiik.ub.ac.id/index.php/j-ptiik/article/download/7777/3671/55261

**[S2]** Pengembangan Aplikasi Pencarian Peluang Kolaborasi Mahasiswa: Modul Team Formation dengan Role Compatibility Menggunakan Affinity Based Matching. *Repositori Tesis, Institut Teknologi Bandung.*
→ https://scholar.itb.ac.id/thesis/pengembangan-aplikasi-pencarian-peluang-kolaborasi_108325

**[S3]** UnitEd: An ML-Assisted Platform for Academic Team Formation. *International Research Journal of Engineering and Technology (IRJET), Vol. 13, Issue 6.*
→ https://www.irjet.net/archives/V13/i6/IRJET-V13I06117.pdf

**[S4]** HackMate: Find Your Perfect Hackathon Team. *International Journal of New Technology and Innovations (IJNTI).*
→ https://rjpn.org/ijnti/papers/IJNTI2604192.pdf

**[S5]** Smart Team Builder for College Hackathons: A Comprehensive Survey. *International Journal of Advanced Computational Engineering and Technology (IJACECT), 2025.*
→ https://doi.org/10.65521/ijacect.v14i1.817

**[S6]** SyncUp — platform pencarian rekan tim berbasis skill, minat, dan kompatibilitas. *Devpost.*
→ https://devpost.com/software/syncup-thg1iy

**[S7]** invite-app — prototipe platform pencari regu lomba untuk mahasiswa. *GitHub.*
→ https://github.com/daffafaizan/invite-app

**[S8]** Pixel — platform penemuan kegiatan kampus dengan fitur teammate finder. *GitHub.*
→ https://github.com/Peehu1308/Pixel

### B. Sistem Informasi Akademik & Portal Terpadu (9–14)

**[S9]** Penerapan Metode User-Centered Design dalam Pengembangan Fitur Layanan Informasi Akademik. *Journal of User-Centered Design and Information Technology (JUPTI).*
→ https://journalcenter.org/index.php/jupti/article/download/8078/5959/37569

**[S10]** Kajian Pemanfaatan Sistem Informasi Akademik: Integrasi Sistem, Pembaruan Data, dan Kompetensi Pengguna. *Publikasi Pendidikan, Universitas Negeri Makassar.*
→ https://ojs.unm.ac.id/pubpend/article/download/84585/pdf

**[S11]** Pengaruh Persepsi Kemudahan dan Persepsi Kegunaan terhadap Penerimaan Pengguna Sistem Informasi Akademik Terpadu (SIKADU). *Jurnal Riset Akuntansi dan Keuangan, Universitas Islam 45 Bekasi.*
→ http://jurnal.unismabekasi.ac.id/index.php/jrak/article/view/744

**[S12]** Analisis Tingkat Kepuasan Pengguna Sistem Informasi Akademik (SIAKAD) Menggunakan Metode System Usability Scale. *Jurnal Komteks, Universitas Pasundan.*
→ https://ejournal.unipas.ac.id/index.php/Komteks/article/download/2844/1488/8274

**[S13]** Analisis Faktor-Faktor yang Mempengaruhi Kepuasan Pengguna SIAKAD Universitas Negeri Jakarta dengan Model DeLone & McLean. *Repositori Universitas Negeri Jakarta.*
→ http://repository.unj.ac.id/73014

**[S14]** Sistem Informasi Terpadu Berbasis Web untuk Pengelolaan Beasiswa, Magang, dan Layanan Kemahasiswaan. *Jurnal ATASI, Universitas Mulawarman.*
→ https://e-journals2.unmul.ac.id/index.php/atasi/article/view/4646

### C. Data & Statistik Pendukung (15–20)

**[S15]** Pangkalan Data Pendidikan Tinggi (PDDikti) — 9.967.487 mahasiswa, 33.741 program studi, 4.416 perguruan tinggi. *Kementerian Pendidikan Tinggi, Sains, dan Teknologi.*
→ https://pddikti.kemdiktisaintek.go.id

**[S16]** Data & Statistik Pendidikan Tinggi — total populasi 10.754.154 mahasiswa. *Direktorat Jenderal Pendidikan Tinggi.*
→ https://dikti.kemdiktisaintek.go.id/data-statistik

**[S17]** Profil Internet Indonesia 2025 — penetrasi internet 80,66%. *Asosiasi Penyelenggara Jasa Internet Indonesia (APJII).*
→ https://survei.apjii.or.id

**[S18]** Survei APJII: Pengguna Internet Indonesia 2025 Tembus 229 Juta Jiwa (229.428.417 jiwa; naik dari 221,56 juta pada 2024). *detikInet.*
→ https://inet.detik.com/telecommunication/d-8047759/survei-apjii-pengguna-internet-indonesia-2025-tembus-229-juta-jiwa

**[S19]** Data Jumlah Pengangguran Terbuka di Indonesia Berdasarkan Pendidikan Terakhir Tahun 2024 (TPT lulusan universitas 5,83%; kelompok lain 6,23%). *GoodStats, diolah dari BPS.*
→ https://data.goodstats.id/statistic/data-jumlah-pengangguran-terbuka-di-indonesia-berdasarkan-pendidikan-terakhir-tahun-2024-zYgTu

**[S20]** Pengangguran Lulusan Pendidikan Tinggi (sekitar 1,01 juta orang / 13,57%). *Satudata Kementerian Ketenagakerjaan.*
→ https://satudata.kemnaker.go.id/infografik/94

### D. Program Pemerintah & Skala Partisipasi (21–25)

**[S21]** Simbelmawa — portal Program Kreativitas Mahasiswa (PKM). *Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.*
→ https://simbelmawa.kemdikbud.go.id/portal/index.php

**[S22]** Pendanaan Program Kreativitas Mahasiswa (PKM) 8 Bidang Tahun 2024 — 3.520 tim, 10.560 mahasiswa, 459 perguruan tinggi, dana Rp27,84 miliar. *Simbelmawa, Diktiristek.*
→ https://simbelmawa.kemdikbud.go.id/portal/wp-content/uploads/2024/04/Pendanaan-PKM-2024-Skema-Pendanaan-Diktiristek.pdf

**[S23]** Digandrungi Ribuan Pendaftar, GEMASTIK 2024 Hasilkan Talenta Muda Berbakat di Bidang TIK — 3.385 pendaftar (2023: 2.780). *Balai Pengembangan Talenta Indonesia.*
→ https://bpti.kemendikdasmen.go.id/2024/10/08/digandrungi-ribuan-pendaftar-gemastik-2024-hasilkan-talenta-muda-berbakat-di-bidang-tik/

**[S24]** Program Magang dan Studi Independen Bersertifikat (MSIB) Kampus Merdeka — 13.002 mahasiswa lolos seleksi. *LLDIKTI Wilayah I.*
→ https://lldikti1.kemdiktisaintek.go.id/a/program-magang-dan-studi-independen-bersertifikat-kampus-merdeka

**[S25]** MSIB Angkatan 7 Resmi Dimulai. *Kementerian Pendidikan Tinggi, Sains, dan Teknologi.*
→ https://kemdiktisaintek.go.id/news/article/msib-angkatan-7-resmi-dimulai

### E. Benchmark Platform & Validasi Pasar (26–30)

**[S26]** SejutaCita — 2.548.852 mahasiswa & pelajar terdaftar, 17.556 event terdaftar. *SejutaCita.*
→ https://sejutacita.id

**[S27]** FlashCampus — platform terkurasi untuk magang, lomba, beasiswa, event, dan volunteer mahasiswa. *FlashCampus.*
→ https://www.flashcampus.com

**[S28]** Doro Kampus — aplikasi kampus terintegrasi; secara eksplisit menyatakan masalah fragmentasi informasi akademik. *Doro Kampus.*
→ https://dorokampus.com

**[S29]** Unstop — 140K+ peluang, 42K+ organisasi, 22,3 juta asesmen. *Unstop.*
→ https://unstop.com

**[S30]** Handshake — 7 juta+ pengguna mahasiswa, 1.000+ kampus, valuasi $1,5 miliar. *Handshake.*
→ https://joinhandshake.com

---

## Bacaan Tambahan (di luar 30 sumber utama)

- Major League Hacking — 300+ hackathon mahasiswa per tahun, 125.000+ developer: https://mlh.com
- Glints — 5 juta+ talenta, 60.000+ organisasi: https://glints.com/id
- Dealls — portal kerja & magang, 7.000+ perusahaan: https://dealls.com
- Talentika — 209 peluang aktif terkurasi: https://talentika.id/peluang
- LombaHub — pusat informasi kompetisi: https://lombahub.com
- LuarKampus — direktori beasiswa, lomba, dan event: https://luarkampus.id

---

*Catatan metodologi: angka partisipasi program diambil dari publikasi resmi penyelenggara atau pemberitaan yang mengutipnya. Angka TPT dan pengangguran bervariasi antarsumber karena perbedaan definisi dan periode survei; dokumen ini menandainya secara eksplisit dan tidak menggunakan satu angka sebagai dasar tunggal.*
