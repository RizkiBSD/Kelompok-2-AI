# Hasil Prompting Gabungan 30 Permasalahan per Anak (Heka, Firlana, Rizki *Athaya belum push)

**Kelompok 2 — Kelas AI**
**Branch:** `TUGAS BERSAMA` · **Folder:** `TUGAS BERSAMA/`
**Status:** Dokumen kerja kelompok (output prompting), siap dipakai untuk 3 tugas utama
**Tanggal disusun:** 2026

---

## 0. Ringkasan Satu Halaman

| Item | Isi |
|---|---|
| **Bahan mentah** | 30 permasalahan (10 Heka + 10 Firlana + 10 Rizki) — Athaya belum push |
| **Cara menyempit** | Satu saringan: *"Adakah solusi yang mudah dikerjakan untuk kami, dan apakah solusinya sudah ada di pasaran?"* |
| **Hasil saringan** | 30 → 20 layak → 10 sedang → **5 permasalahan inti** |
| **5 permasalahan inti** | (1) Literasi & kendali keuangan pribadi · (2) Kesulitan mencari pengalaman (magang/lomba) & partner tim · (3) Burnout & pola tidur · (4) Kesulitan bertemu dosen pembimbing saat skripsi · (5) Mahasiswa baru belum punya peta kampus |
| **Ide utama kelompok** | **Satu super-app mahasiswa** = 1 aplikasi, 5 modul, satu basis data yang saling memperkuat (bukan 5 aplikasi terpisah) |

**Kalimat kunci untuk presentasi:**

> "Kami tidak menambah aplikasi baru ke HP mahasiswa. Kami membuat **pintu masuk tunggal** ke lima hal yang paling sering membuat mahasiswa tersandung: uang, pengalaman, kesehatan, skripsi, dan orientasi kampus. Semua data saling terhubung, jadi setiap modul membuat modul lain makin berguna."

---

## 1. Konteks Tugas (agar dokumen ini bisa dipakai langsung)

Tugas kelas meminta tiga hal bertingkat:

1. **50 permasalahan** (5 orang × 10) → kelompok baru punya **30** (Athaya belum push), jadi 20 slot masih kosong.
2. **20 konsep bisnis** dipilih dari 50 dengan kriteria: *bisa menyelesaikan masalah?* dan *produknya bisa dijual?*
3. **5 produk prototype**, semua harus dijual, kontennya dibuat dengan AI.

Dokumen ini mengambil peran sebagai **mesin penyaring** di antara tahap 1 dan tahap 2: dari 30 permasalahan yang sudah ada, disaring jadi **5 permasalahan inti** yang paling feasible untuk kelompok. Jadi dokumen ini **tidak menggantikan** tugas 50/20/5 — dokumen ini **mengunci arah** supaya 20 konsep bisnis dan 5 prototype nanti tidak melebar.

**Cara pakai:**
- 20 slot permasalahan yang kosong (Athaya + tambahan) **diisi ke arah yang mendukung 5 inti ini**, bukan topik acak baru.
- 20 konsep bisnis = turunan/variasi dari 5 inti (lihat Bagian 8.1).
- 5 prototype = 5 modul inti (lihat Bagian 6.2).

---

## 2. Metodologi Penyempitan (dipakai secara konsisten)

### 2.1 Saringan utama — 2 pertanyaan

Setiap permasalahan diuji dengan dua pertanyaan persis seperti arahan tugas:

> **A. "Adakah solusinya yang mudah dikerjakan untuk kami?"**
> **B. "Apakah solusinya sudah ada di pasaran?"**

Hasil uji menghasilkan 3 status:

| Status | Arti | Keputusan |
|---|---|---|
| 🟢 **SOLUSI MUDAH + PESAING BELUM MATANG** | Bisa dikerjakan dengan web/app + AI, dan celahnya masih terbuka | **MASUK** |
| 🟡 **SOLUSI MUDAH TAPI SUDAH ADA PEMENANG** | Ada aplikasi gratis/raksasa yang sudah bagus | **TIDAK JADI IDE UTAMA** (jadi fitur tempelan / referensi) |
| 🔴 **BUTUH SUMBER DAYA BESAR** | Butuh modal, izin, tenaga ahli, kurikulum, atau kebijakan kampus | **TIDAK DIAMBIL** |

### 2.2 Contoh penerapan saringan (kasus "malas belajar")

Ini contoh yang diberikan di arahan tugas, dan **cara berpikirnya kita pakai untuk semua 30**:

| Langkah | Analisis |
|---|---|
| Masalah | Mahasiswa malas belajar / menunda tugas |
| Solusi mudah? | ✅ Ya — reminder, to-do list, kalender, gamifikasi |
| Sudah ada? | ✅ Ya, banyak: Google Calendar, Notion, Todoist, Forest, StudyDue, Studora, Rajin Kuliah, dll. (gratis & matang) |
| Kesimpulan | 🟡 **Bukan ide utama.** Tidak mungkin menang melawan aplikasi gratis yang sudah di HP semua orang. |
| Yang kita ambil | **Rasa sakitnya, bukan alatnya.** Mahasiswa tidak butuh *daftar tugas* (sudah ada), tapi butuh **tahu langkah berikutnya**: "tugas mana dulu", "kenapa aku menunda", "aku harus ketemu siapa". → diarahkan ke modul **Teman Skripsi** (inti #4) dan lapisan beban di **Detak** (inti #3). |

**Aturan yang lahir dari contoh ini:**

> Jangan pernah menjual "aplikasi pencatat", "aplikasi pengingat", atau "aplikasi to-do list". Itu kategori yang sudah selesai. Yang kita jual adalah **keputusan dan akses** yang belum diselesaikan siapa pun: *apa langkah berikutnya, dan siapa yang bisa membantu.*

### 2.3 Empat uji kelayakan (bobot penilaian)

Setiap permasalahan yang lolos saringan utama dinilai 4 kriteria:

| Kode | Uji | Pertanyaan |
|---|---|---|
| **U1** | **Feasible** | Bisa dikerjakan mahasiswa dengan web/app + AI, tanpa modal & tanpa izin? |
| **U2** | **Pesaing** | Sudah ada yang menang? Kalau ada, apakah menutup celah kita? |
| **U3** | **Bisa dijual** | Ada yang mau bayar? Kepada **siapa** (mahasiswa / kampus / perusahaan)? |
| **U4** | **Bukti & dampak** | Ada data bahwa masalahnya nyata dan menyakitkan? |

Skala 1–5 per kriteria (**maks 20 poin**). Semua uji di bawah menggunakan data yang sudah dikumpulkan anggota (bukan asumsi AI).

### 2.4 Prinsip desain yang muncul dari penyaringan

1. **Kalah di alat, menang di data.** Jangan saingi aplikasi gratis. Kalahkan mereka di kedalaman data khusus kampus Indonesia.
2. **Peserta tidak membayar; yang menanggung biaya adalah pihak yang diuntungkan.** Mahasiswa membayar = rumus gagal. Payung besar: mahasiswa gratis, kampus & perusahaan yang bayar.
3. **Tiap modul baru harus menambah nilai 1–2 modul lain.** Kalau tidak, jangan dibangun.
4. **AI sebagai pembeda, bukan sebagai tempelan.** AI dipakai di tempat yang butuh pemahaman konteks (profil skill, kecocokan tim, prediksi risiko keuangan), bukan di tempat yang bisa diselesaikan rumus sederhana.

---

## 3. Inventaris 30 Permasalahan (bahan mentah)

### 3.1 Heka — 10 topik × 3 sumber (30 sumber)
Sumber: `Heka/riset-30-masalah-mahasiswa/` (PDF + `sources-30-masalah.json`)

| # | Permasalahan | Klaster | Akar masalah menurut riset |
|---|---|---|---|
| H1 | Kesulitan mengatur arus kas pribadi | Keuangan | Literasi keuangan rendah |
| H2 | Ketergantungan pinjol / paylater | Keuangan | Konsumtif + tekanan sosial & hedonisme |
| H3 | Sulit membagi waktu kuliah & kerja paruh waktu | Waktu | Keseimbangan peran (bukan cuma manajemen waktu) |
| H4 | Prokrastinasi / kebiasaan menunda | Waktu | Fear of failure + ketidaksukaan tugas |
| H5 | Sulit konsisten belajar mandiri | Waktu | Self-regulated learning lemah (metakognisi) |
| H6 | Sulit memisahkan keuangan pribadi & usaha | Keuangan | Tidak ada pencatatan terpisah |
| H7 | Pendapatan pekerja lepas tidak stabil | Keuangan | Gig economy tanpa jaring aman |
| H8 | Praktik joki tugas & skripsi | Integritas | Hasil diutamakan di atas proses |
| H9 | Konsistensi belajar (penguatan H5) | Waktu | Sama dengan H5 |
| H10 | Ketergantungan berlebihan pada AI | Integritas/Teknologi | Cognitive offloading menurunkan berpikir kritis |

### 3.2 Firlana — 8 klaster permasalahan dari 44 sumber
Sumber: `Firlana/ringkasan_permasalahan_mahasiswa_sehari_hari.md` + `daftar_sumber_permasalahan_mahasiswa_sehari_hari.md`

| # | Permasalahan | Klaster | Catatan |
|---|---|---|---|
| F1 | Beban akademik & tuntutan nilai | Akademik | Stresor utama |
| F2 | Skripsi: sulit bagi waktu, **sulit bertemu pembimbing**, revisi berulang | Akademik | Sangat spesifik & menyakitkan |
| F3 | Manajemen waktu & prokrastinasi | Waktu | Tumpang tindih dengan H4 |
| F4 | Burnout akademik & "jam koma" | Kesehatan | Kelelahan kognitif |
| F5 | Stres, kecemasan, depresi; layanan kampus tidak terjangkau (stigma, biaya, jam) | Kesehatan mental | Butuh tenaga profesional |
| F6 | Kualitas tidur buruk & pola tidur tidak teratur | Gaya hidup | Sangat umum |
| F7 | Kurang aktivitas fisik & pola makan buruk | Gaya hidup | Butuh disiplin & biaya |
| F8 | Tekanan finansial (biaya hidup, KIP-K terlambat cair) | Keuangan | Tumpang tindih dengan H1 |
| F9 | Uang saku habis sebelum akhir bulan; teman sebaya memicu konsumtif | Keuangan | Tumpang tindih dengan H2 |
| F10 | Homesickness & adaptasi mahasiswa rantau/baru | Sosial | Tidak ada sistem informasi kampus |
| F11 | Kesepian, konflik relasi, kurang dukungan sosial | Sosial | Butuh intervensi psikologis |
| F12 | Diskriminasi & isu keberagaman | Sosial | Isu kebijakan, bukan produk |
| F13 | Joki skripsi (fenomena sosial) | Integritas | Tumpang tindih dengan H8 |

### 3.3 Rizki — 10 permasalahan seputar informasi akademik & peluang
Sumber: `Rizki-1/riset-informasi-akademik-terpusat.md` + `sumber-30.csv` + `Rizki-2/RISET_TOPIK.md` (60 sumber)

| # | Permasalahan | Klaster | Data kunci |
|---|---|---|---|
| R1 | Info lomba/magang/beasiswa **terfragmentasi** di IG, grup WA, website fakultas | Informasi | Harus pantau 5–10 kanal |
| R2 | **Tidak ada tempat mencari partner tim** | Kolaborasi | **80% dari 350 mahasiswa FILKOM UB** kebingungan cari partner lomba |
| R3 | Info tidak terkurasi: hoaks, kedaluwarsa, tautan mati | Informasi | — |
| R4 | Ketimpangan akses: yang punya jaringan dapat info lebih cepat | Keadilan | Information asymmetry |
| R5 | **48% mahasiswa sulit cari tempat magang relevan**; 32% terpaksa ambil yang tidak relevan | Karier | Jurnal IWIMA 2025 (68 responden) |
| R6 | 40% kesulitan menyusun *learning plan* magang | Karier | Jurnal IWIMA 2025 |
| R7 | SIAKAD/informasi kampus tersebar & tidak terintegrasi | Sistem kampus | Data & pembaruan terlambat |
| R8 | Peluang berbentuk tim (PKM, GEMASTIK, hackathon) menuntut komposisi skill, tapi tim dibentuk dari lingkaran pertemanan | Kolaborasi | 3.520 tim PKM 2024; 3.385 pendaftar GEMASTIK |
| R9 | Kurang pengalaman/portofolio → TPT lulusan PT tetap tinggi | Karier | ±1,01 juta penganggur lulusan PT (13,57%) |
| R10 | Minimnya kurasi & personalisasi: mahasiswa tidak tahu peluang mana yang cocok untuknya | Informasi | — |

### 3.4 Yang belum masuk hitungan
**Athaya belum push.** 10 permasalahan Athaya akan menambah bahan. Dokumen ini tetap valid: 10 permasalahan baru itu nanti **diuji dengan saringan Bagian 2** dan dipetakan ke Bagian 7. Kalau ada yang lebih kuat dari 5 inti di bawah, ganti, jangan tambah jadi 6.

---

## 4. Hasil Saringan: 30 → 20 → 10 → 5

### 4.1 Tahap 4A — 30 ke 20 (yang layak dipertimbangkan)

**10 yang langsung dibuang** (🔴 butuh sumber daya besar / bukan produk / tumpang tindih penuh):

| Dibuang | Alasan |
|---|---|
| F5 Stres, kecemasan, depresi | Butuh psikolog berlisensi; memprodukkan ini = risiko hukum & etika. **Bukan** karena tidak penting — ini di luar kemampuan prototype kami. |
| F7 Aktivitas fisik & pola makan | Butuh pendampingan gizi & biaya; pemain besar (app kebugaran) sudah mapan |
| F8 / F9 tekanan finansial & uang saku habis | Tumpang tindih penuh dengan H1 + H2, digabung ke sana |
| F11 Kesepian & konflik relasi | Butuh intervensi klinis; solusi produknya mudah jadi "aplikasi matchmaking" yang berisiko |
| F12 Diskriminasi & keberagaman | Isu kebijakan kampus, tidak bisa diselesaikan produk mahasiswa |
| F13 Joki skripsi | Sama dengan H8, digabung |
| F1 Beban akademik umum | Terlalu luas; turunannya sudah terwakili di F2/F3/F4 |
| H9 Konsistensi belajar (penguatan H5) | Duplikat H5 |
| H3 vs F3 (membagi waktu) | Digabung jadi satu: "regulasi diri" |
| H7 Pendapatan *gig* tidak stabil | Sempit & sudah ditangani platform *gig*; diserap ke inti #1 (anggaran berbasis pendapatan tidak tetap) |

Sisa **20 kandidat** (ini yang nanti jadi bahan 20 konsep bisnis):

`H1, H2, H4, H5+H3+F3, H6, H8, H10, F2, F4, F6, F10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10`

### 4.2 Tahap 4B — 20 ke 10 (yang masuk penilaian serius)

10 yang gugur di tahap ini karena **solusinya sudah ada pemenangnya** (🟡):

| Gugur | Sudah ada pemenang | Akibatnya |
|---|---|---|
| H4 Prokrastinasi | Google Calendar, Notion, Todoist, Forest, StudyDue, Studora, Rajin Kuliah | Masalah nyata, tapi **alatnya sudah selesai**. Tidak bisa dijual sebagai produk baru. |
| H5+H3+F3 Regulasi diri & manajemen waktu | Sama seperti di atas + kanal belajar YouTube, dll. | Idem. Yang masih terbuka hanya **lapisan "akibat"**, bukan alatnya. |
| H10 Ketergantungan AI | ChatGPT, Gemini, Claude, Perplexity (gratis & makin pintar) | Melawan raksasa AI = mustahil untuk prototype mahasiswa |
| H8 Joki tugas | Sudah jadi pasar gelap yang berjalan tanpa aplikasi | Tidak layak & tidak etis untuk diprodukkan |
| R3 Kurasi info | inforlomba.id, SejutaCita, FlashCampus | Masalah ini adalah **fitur**, bukan produk |
| R7 SIAKAD tidak terintegrasi | 4.416 kampus sudah punya SIAKAD masing-masing | Butuh akses sistem internal kampus = di luar jangkauan |
| R10 Personalisasi | Fitur rekomendasi sudah standar di semua platform | Fitur, bukan produk |
| H6 Pisah keuangan pribadi-usaha | BukuWarung, BukuKas, Accurate, spreadsheet | Sudah ada & gratis untuk UMKM |
| R9 Portofolio & pengalaman | LinkedIn, Handshake, Kalibrr, Glints | Pemenang global; kita kalah di data pengalaman kerja |
| R4 Ketimpangan akses | — | Bukan masalah yang bisa dijual; ini **konsekuensi** dari R1+R2 → digabung ke sana |

**Catatan penting (jangan dihapus dari laporan):** gugurnya 10 di atas **bukan** karena masalahnya tidak nyata. Semuanya nyata dan didukung riset. Yang membuat mereka gugur adalah **posisi pasar**: alatnya sudah ada, gratis, dan sudah di HP semua orang. Inilah yang diminta dosen dengan pertanyaan *"yang solusinya sudah ada, seperti malas belajar pakai aplikasi reminder yang mana sudah ada pesaingnya"*.

### 4.3 Tahap 4C — 10 ke 5 (intinya dipilih)

10 finalis dinilai dengan 4 uji (maks 20 poin):

| Rank | Permasalahan inti | Asal | U1 Feasible | U2 Celah pesaing | U3 Bisa dijual | U4 Bukti | **Total** | Keputusan |
|---|---|---|---|---|---|---|---|---|
| 1 | **Kesulitan mencari pengalaman (magang/lomba) & partner tim** | R1, R2, R5, R6, R8 | 4 | 5 | 5 | 5 | **19** | ✅ INTI #2 |
| 2 | **Literasi & kendali keuangan pribadi** | H1, H2 (+F8, F9, H7) | 5 | 4 | 3 | 5 | **17** | ✅ INTI #1 |
| 3 | **Burnout akademik & pola tidur** | F4, F6 | 4 | 4 | 3 | 5 | **16** | ✅ INTI #3 |
| 4 | **Skripsi: sulit bertemu pembimbing & deadline tidak terkendali** | F2 (+ "langkah berikutnya") | 5 | 3 | 2 | 5 | **15** | ✅ INTI #4 |
| 5 | **Mahasiswa baru/rantau belum punya peta kampus** | F10 | 5 | 4 | 2 | 4 | **15** | ✅ INTI #5 |
| — | Kesepian & dukungan sosial (versi ringan) | F11 | 3 | 3 | 2 | 4 | 12 | ❌ Buffer (butuh psikolog) |
| — | Cek plagiarisme / etika AI | H10+H8 | 3 | 2 | 2 | 4 | 11 | ❌ Buffer (raksasa AI + Turnitin) |
| — | Jual-beli barang bekas mahasiswa | baru | 4 | 1 | 3 | 3 | 11 | ❌ Buffer (Shopee, Carousell) |
| — | Catatan kuliah bersama | baru | 4 | 2 | 2 | 3 | 11 | ❌ Buffer (sudah banyak) |
| — | Transportasi & keamanan malam | baru | 2 | 2 | 2 | 3 | 9 | ❌ Buffer (Gojek/Grab) |

> Baris "baru" = usulan tambahan saat rapat, bukan dari riset anggota. Disertakan supaya terlihat bahwa saringan **juga dipakai untuk ide baru**, dan idenya gugur bukan karena "tidak terpikirkan".

**Kenapa skor #4 dan #5 tetap diambil padahal bukan tertinggi?** Karena keduanya **sangat mudah dikerjakan** (U1 = 5) dan **saling menyambung** dengan inti #2 (skor tertinggi). Dalam rencana satu-super-app, modul bernilai lebih kecil tetap dipakai karena jadi **pintu masuk** (mahasiswa baru = pengguna termudah dijangkau), bukan karena besar omzetnya. Keputusan ini **diambil sadar** dan alasannya ditulis.

### 4.4 5 PERMASALAHAN MAHASISWA UMUM — KEPUTUSAN FINAL

> Ini 5 permasalahan yang menjadi **ide utama kelompok**.

| # | Permasalahan (rumusan mahasiswa umum) | Bukan ini | Tapi ini |
|---|---|---|---|
| **1** | *"Uangku selalu habis sebelum akhir bulan, dan aku tidak tahu ke mana perginya. Kalau ada kebutuhan mendesak, aku tergoda pinjol/paylater."* | Aplikasi pencatat keuangan | **Sistem pertahanan keuangan**: prediksi tanggal "uang habis", peringatan sebelum tergoda, dan jalur darurat yang aman |
| **2** | *"Aku tahu ada lomba, magang, beasiswa — tapi aku tidak tahu mana yang cocok untukku, dan kalau butuh tim, aku tidak punya siapa-siapa."* | Agregator info (inforlomba, SejutaCita, FlashCampus sudah ada) | **Mesin kecocokan**: info terkurasi + skor kecocokan profil + **pencari partner tim berbasis skill** (celah yang belum ada di Indonesia) |
| **3** | *"Aku capek terus, tidurku kacau, dan aku tidak sadar sudah burnout sampai nilainya jatuh."* | Aplikasi kesehatan mental / terapi | **Detektor dini burnout** (pasif, berbasis data akademik + tidur) yang hasilnya bisa **dibawa ke konselor kampus** |
| **4** | *"Skripsiku mandek bukan karena aku malas, tapi karena aku tidak bisa ketemu dosen pembimbing dan tidak tahu langkah berikutnya."* | Aplikasi pengingat / to-do list | **Penjadwal & pelacak progres skripsi**: cari slot dosen, log bimbingan, prediksi risiko telat sidang + bantuan menyusun draf pertanyaan |
| **5** | *"Aku baru di kampus ini dan tidak tahu apa-apa — kos di mana, makan di mana, unit kegiatan apa, siapa yang bisa ditanya."* | Peta kampus / aplikasi orientasi biasa | **Peta kampus hidup**: direktori kos/warung/layanan + onboarding berbasis lokasi + pembagian checklist ospek yang tidak membosankan |

**Satu kalimat pemersatu (untuk judul konsep bisnis):**

> ### **Satu pintu untuk lima titik tersandung mahasiswa: uang, pengalaman, kesehatan, skripsi, dan orientasi.**

*Nama produk sementara sengaja belum dikunci — bebas diganti kelompok. Cek ketersediaan nama & domain sebelum dipakai di deck jualan.*

---

## 5. Analisis Pesaing per Inti (jawaban atas "yang solusinya sudah ada")

### 5.1 Peta pesaing menyeluruh

| Inti | Pesaing yang sudah ada & matang | Status pesaing | Celah yang masih terbuka untuk kami |
|---|---|---|---|
| **1. Keuangan** | Money Lover, Finansialku, Spendee, BukuWarung, buku kas + spreadsheet | **Kuat di pencatatan**, lemah di pencegahan | Tidak ada yang **memprediksi "kapan uangmu habis"** dari pola pengeluaran + tanggal kiriman uang saku/orang tua; tidak ada yang mendeteksi **pola menuju pinjol** lalu menawarkan jalur darurat |
| **2. Pengalaman & partner** | inforlomba.id, inforlombait.com, **SejutaCita** (2,5 jt pengguna, 17,5 rb event), **FlashCampus** (agregator magang/lomba/beasiswa + mentoring), Glints, Kalibrr, LinkedIn, Unstop, Devpost, Handshake | **Agregasi info sudah selesai** — jangan lawan di sini | **Tidak ada satu pun platform Indonesia yang punya pencarian partner tim berbasis AI/skill.** Di global hanya Devpost (manual) & Hackathon Buddy (hackathon saja). Celah riset **sekaligus** celah pasar (kesimpulan Rizki-2). |
| **3. Burnout & tidur** | Sleep Cycle, AutoSleep, Google Fit, Apple Health, Calm, Headspace, Riliv, KALM | **Pelacak tidur & meditasi sudah selesai** | Semua aplikasi itu **tidak tahu kamu sedang kuliah**. Tidak ada yang menggabungkan **deadline akademik + pola tidur + jam belajar** jadi satu peringatan burnout yang bisa dibawa ke konselor kampus. |
| **4. Skripsi** | Google Calendar, Notion, Todoist, WhatsApp, SIAKAD bimbingan, e-journal | **Pengingat & catatan sudah selesai** | Tidak ada yang menyelesaikan **penjadwalan bertemu dosen** (sumber rasa sakit terbesar menurut Firlana) dan **memprediksi risiko telat sidang** dari riwayat bimbingan |
| **5. Mahasiswa baru** | Google Maps, grup WA angkatan, Instagram BEM, akun info kampus | **Peta & grup chat sudah selesai** | Info kos, warung, jam layanan, dan "siapa yang bisa ditanya" **tidak ada di peta mana pun** — semuanya tersebar di story Instagram yang hilang dalam 24 jam |

### 5.2 Kesimpulan analisis pesaing

> Tiga dari lima inti (#1, #3, #4) punya **pemenang yang jelas di kategori alatnya**. Artinya kita **tidak boleh** menjual kelimanya sebagai "aplikasi pencatat / pelacak / pengingat". Yang kita jual adalah **pengambilan keputusan dan akses**:
> - #1 → *kapan uangmu akan habis, dan apa yang harus dilakukan minggu ini*
> - #3 → *apakah aku sedang menuju burnout, dan bawa ini ke siapa*
> - #4 → *langkah berikutnya skripsiku apa, dan kapan aku bisa ketemu dosen*
> - #2 dan #5 → **celah paling terbuka** (pesaing belum menyentuh partnering & data lokal kampus), sehingga keduanya jadi **wajah depan** produk.
>
> Inilah sebabnya strategi kelompok adalah **satu super-app dengan data bersama**, bukan lima aplikasi. Nilai jualnya bukan di tiap fitur (yang bisa ditiru), tapi di **keterhubungan datanya** (yang tidak bisa ditiru pesaing satu fitur).

### 5.3 Kalimat penolakan yang harus dihafal (antisipasi pertanyaan dosen)

| Pertanyaan dosen | Jawaban |
|---|---|
| "Ini kan sudah ada aplikasi keuangan, kenapa bikin lagi?" | "Betul, untuk **mencatat** sudah banyak. Kami tidak mencatat — kami **memprediksi kapan uang habis** dan **memberi peringatan sebelum pinjol**. Tidak ada aplikasi yang tahu jadwal kiriman uang saku dan deadline kuliahmu." |
| "Ini kan sudah ada SejutaCita / FlashCampus?" | "Mereka menyelesaikan **informasi**. Kami menyelesaikan **langkah setelahnya**: setelah kamu lihat lombanya, kamu butuh tim. Belum ada satu pun platform Indonesia yang mencocokkan partner berdasarkan skill." |
| "Reminder tidur kan sudah ada Sleep Cycle?" | "Sleep Cycle tidak tahu besok kamu ada UAS. Kami memakai data akademik untuk mengubah **pelacak tidur** menjadi **peringatan burnout yang bisa dibawa ke konselor kampus**." |
| "Kok 5 masalah dalam 1 aplikasi? Tidak fokus?" | "Yang difokuskan adalah **penggunanya**, bukan fiturnya: satu mahasiswa yang sama punya kelima masalah ini sekaligus. Satu super-app menghindari mereka memasang 5 aplikasi lalu berhenti di aplikasi ke-2." |

---

## 6. Arah Solusi Kelompok (5 masalah → 5 modul → 5 produk)

### 6.1 Arsitektur produk: satu basis data, lima modul

```
                        ┌──────────────────────────────┐
                        │   PROFIL MAHASISWA (inti)     │
                        │ jurusan · semester · jadwal   │
                        │ skill · domisili · target     │
                        └───────────────┬──────────────┘
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
  ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
  │ MODUL 1   │   │ MODUL 2   │   │ MODUL 3   │   │ MODUL 4   │   │ MODUL 5   │
  │ Dompet    │   │ Kompas    │   │ Detak     │   │ Teman     │   │ Peta      │
  │ Siaga     │   │ Peluang   │   │ (burnout) │   │ Skripsi   │   │ Kampus    │
  └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
        │               │               │               │               │
        └───────────────┴───── DATA SALING PAKAI ────────┴───────────────┘
             (jadwal kuliah dipakai 5 modul · skill dipakai 2 & 4 ·
              stressor dipakai 1, 3, 4 · lokasi dipakai 5 & 1)
```

**Kenapa data bersama penting (nilai jual yang tidak bisa ditiru pesaing satu-fitur):**

| Data | Dipakai oleh | Contoh manfaat silang |
|---|---|---|
| **Jadwal kuliah & deadline** | Modul 1, 3, 4 | Modul 1 tahu "UAS 3 hari lagi" → Modul 3 menyesuaikan target tidur minimum, Modul 1 menahan rekomendasi jajan |
| **Profil skill & portofolio** | Modul 2, 4 | Skill dari lomba di Modul 2 otomatis jadi lampiran CV & bagian "metode penelitian" di Modul 4 |
| **Stressor akademik** | Modul 1, 3, 4 | Deteksi burnout (Modul 3) jadi alasan sah untuk **minta perpanjangan deadline** (Modul 4) |
| **Domisili & kos** | Modul 5, 1 | Data kos & warung terdekat dipakai Modul 1 untuk estimasi biaya hidup realistis |
| **Status mahasiswa baru** | Modul 5, 2 | Mahasiswa baru diarahkan ke lomba tingkat pemula & mentor, bukan lomba nasional langsung |

### 6.2 Lima modul = lima produk prototype (Tugas 3)

| # | Nama modul | Permasalahan inti | Prototype yang dibangun | AI dipakai untuk | Yang **tidak** kami bangun (dan alasannya) |
|---|---|---|---|---|---|
| 1 | **Dompet Siaga** | #1 Keuangan | Dashboard arus kas + **prediksi "uang habis tanggal berapa"** + peringatan pola pinjol + jalur darurat aman | Klasifikasi pola pengeluaran → prediksi tanggal kritis; deteksi pola menuju pinjol | Buku kas manual (sudah ada BukuWarung/spreadsheet) |
| 2 | **Kompas Peluang** | #2 Pengalaman & partner | Feed peluang terkurasi + **skor kecocokan profil** + **pencari partner tim berbasis skill** + portofolio otomatis | Embedding profil↔peluang; *team formation* berbasis kompatibilitas skill (rujukan: algoritma *affinity* ITB 94,1% berhasil) | Agregasi info mentah (sudah ada SejutaCita/FlashCampus) |
| 3 | **Detak** | #3 Burnout & tidur | Check-in 30 detik + ringkasan pola burnout mingguan + laporan siap-bawa ke konselor kampus | Deteksi dini dari kombinasi tidur, jam belajar, deadline, check-in | Terapi & diagnosis (butuh psikolog berlisensi) |
| 4 | **Teman Skripsi** | #4 Skripsi | Papan progres bab + **penjadwalan slot dosen** + log bimbingan + prediksi risiko telat sidang + generator draf pertanyaan bimbingan | Prediksi risiko telat dari riwayat progres; LLM untuk draf pertanyaan/kerangka (bukan menulis isi skripsi) | Menulis skripsi / mengerjakan tugas (itu joki — dilarang & tidak etis) |
| 5 | **Peta Kampus** | #5 Mahasiswa baru | Peta interaktif kos/warung/layanan/UKM + onboarding berbasis lokasi + checklist "hari pertama" | Rekomendasi berbasis lokasi & jurusan; ringkasan ulasan dari senior | Peta navigasi umum (sudah ada Google Maps) |

### 6.3 Model bisnis: siapa yang membayar

Aturan: **mahasiswa gratis. Yang membayar adalah pihak yang diuntungkan.**

| Modul | Mahasiswa | Kampus | Perusahaan / pihak ketiga |
|---|---|---|---|
| 1 Dompet Siaga | Gratis | — | Edukasi bersponsor dari bank/lembaga keuangan resmi (afiliasi produk **aman**, bukan pinjol) |
| 2 Kompas Peluang | Gratis | **Paket karier kampus** (dashboard penempatan mahasiswa) | **Posting magang berbayar** + akses talenta terkurasi |
| 3 Detak | Gratis | **Paket layanan kampus sehat** (data agregat anonim ke konselor) | — |
| 4 Teman Skripsi | Gratis | **Paket akademik kampus** (monitoring progres skripsi prodi) | — |
| 5 Peta Kampus | Gratis | **Paket onboarding kampus** (data kos/warung/kegiatan) | Pemilik kos/warung terverifikasi (langganan listing) |

**Kunci penjualan:** kampus hanya perlu membeli **satu paket** yang mencakup kelima modul, karena semuanya memakai satu basis data mahasiswa yang sama — lebih murah dan lebih rapi daripada membeli 5 sistem terpisah. Ini kalimat yang membuat produk ini **bisa dijual** (kriteria tugas #2).

### 6.4 Urutan prioritas pengerjaan prototype (kalau waktu terbatas)

| Prioritas | Modul | Alasan |
|---|---|---|
| **1** | Kompas Peluang | Skor kelayakan tertinggi (19); celah pesaing paling lebar; wajah depan produk |
| **2** | Dompet Siaga | Bukti paling kuat & paling mudah di-*demo* (prediksi tanggal uang habis) |
| **3** | Detak | Paling mudah dibuat versi ringannya (check-in + grafik) |
| **4** | Peta Kampus | Prototype visual paling menarik untuk konten jualan (peta) |
| **5** | Teman Skripsi | Paling rumit teknis; ditampilkan sebagai *mockup* dulu |

---

## 7. Penempatan Ulang 30 Permasalahan (agar tidak ada yang hilang dari laporan)

| Permasalahan asal | Nasib | Jadi apa |
|---|---|---|
| H1, H2, F8, F9, H7 | ✅ **Masuk inti** | Modul 1 **Dompet Siaga** |
| R1, R2, R5, R6, R8, R4 | ✅ **Masuk inti** | Modul 2 **Kompas Peluang** |
| F4, F6 | ✅ **Masuk inti** | Modul 3 **Detak** |
| F2 | ✅ **Masuk inti** | Modul 4 **Teman Skripsi** |
| F10 | ✅ **Masuk inti** | Modul 5 **Peta Kampus** |
| H3, F3 | 🟡 Gugur sebagai produk, **diserap** | Jadi lapisan "deadline & beban" di Modul 3 & 4 (deteksi stressor) |
| H4 | 🟡 Gugur sebagai produk | Jadi **fitur di dalam** Modul 4 ("langkah berikutnya"), bukan produk sendiri |
| H5, H9 | 🟡 Gugur sebagai produk | Jadi logika *self-regulated learning* di Modul 2 (target belajar + rekomendasi peluang bertingkat) |
| H10, H8 | 🟡/🔴 Gugur | Hanya jadi **aturan etika** di Modul 4 (AI untuk draf pertanyaan, bukan menulis isi) |
| H6 | 🟡 Gugur | Bisa jadi fitur opsional Modul 1 untuk mahasiswa yang berwirausaha |
| F1 | 🟡 Diserap | Jadi konteks umum; tidak berdiri sendiri |
| F5, F11, F12 | 🔴 Di luar jangkauan | Dicatat sebagai **batas etika produk**: kami merujuk ke konselor, bukan menggantikannya (Modul 3) |
| F7, F13 | 🔴 Dibuang | Di luar jangkauan / duplikat |
| R3, R7, R9, R10 | 🟡 Gugur sebagai produk | R3, R10 jadi fitur Modul 2; R7 & R9 jadi alasan Model B2B (kampus & perusahaan yang bayar) |
| **Athaya (10)** | ⏳ **Belum ada** | Diuji dengan saringan Bagian 2 → dipetakan ke tabel ini |

---

## 8. Jembatan ke Tugas Berikutnya

### 8.1 Dari 5 inti → 20 konsep bisnis (Tugas 2)

Empat konsep bisnis untuk **setiap** inti (4 × 5 = 20). Semua lolos dua kriteria tugas: *bisa menyelesaikan masalah?* & *produknya bisa dijual?*

| Inti | Konsep bisnis turunan |
|---|---|
| **1. Keuangan** | 1) Dompet Siaga (prediksi uang habis) · 2) Kalkulator pinjol vs. jalur darurat aman · 3) Paket literasi keuangan untuk kampus (B2B) · 4) Modul khusus pekerja lepas/pendapatan tidak tetap |
| **2. Peluang & partner** | 5) Kompas Peluang (feed terkurasi + skor kecocokan) · 6) Partner Finder berbasis skill · 7) Portofolio otomatis dari lomba ke CV · 8) Paket karier kampus + posting magang berbayar untuk perusahaan |
| **3. Burnout & tidur** | 9) Detak (deteksi dini burnout) · 10) Laporan siap-bawa ke konselor kampus · 11) Paket layanan "kampus sehat" untuk kampus · 12) Lapisan "kesehatan" di dalam super-app |
| **4. Skripsi** | 13) Teman Skripsi (papan progres + prediksi risiko) · 14) Penjadwal slot bimbingan · 15) Generator draf pertanyaan bimbingan (etis, bukan joki) · 16) Paket akademik kampus untuk monitoring skripsi prodi |
| **5. Peta kampus** | 17) Peta Kampus (kos/warung/layanan/UKM) · 18) Listing kos terverifikasi (langganan pemilik) · 19) Checklist onboarding mahasiswa baru · 20) Paket onboarding kampus |

> Semua 20 ini **diturunkan dari masalah yang sudah ada bukti risetnya**, bukan dikarang. 20 slot permasalahan yang belum terisi (Athaya + tambahan) bisa dipakai untuk **memperdalam** turunan di atas (misal: 3 permasalahan tambahan seputar skripsi → 3 konsep bisnis baru di baris inti #4).

### 8.2 Dari 20 konsep → 5 prototype (Tugas 3) & rencana jualan pakai AI

Kelima prototype = kelima modul (Bagian 6.2). **Semua harus dijual**, dengan konten berbantuan AI:

| Modul | Sudut jualan | Bentuk konten (dibuat dengan AI) |
|---|---|---|
| Dompet Siaga | "Kapan uangmu habis? Cek 10 detik." | Video demo prediksi tanggal + carousel "3 tanda kamu menuju pinjol" |
| Kompas Peluang | "Lomba yang cocok buat kamu — dan timnya sekalian." | Carousel "tim impian 3 orang untuk PKM" + demo pencocokan partner |
| Detak | "Capekmu bukan malas. Ini datanya." | Video edukasi burnout + screenshot laporan untuk konselor |
| Teman Skripsi | "Bukan malas, tapi buntu. Ini langkah berikutnya." | Carousel alur bimbingan + demo jadwal dosen |
| Peta Kampus | "Kos, makan, UKM — semua dalam satu peta." | Video *walkthrough* peta + konten "hari pertama anak rantau" |

**Aturan kontrol AI (sesuai instruksi dosen: "boleh pakai AI, tapi harus dikontrol"):**
- AI dipakai untuk **kerangka & variasi konten**, bukan untuk mengarang masalah.
- Setiap angka di dokumen ini **wajib ada sumbernya** (lihat Bagian 9) — tidak boleh ada statistik tanpa nama jurnal/laporan.
- Setiap nama pesaing **wajib dicek keberadaannya** (lihat Bagian 5.1) — jangan menulis pesaing yang tidak ada.
- Keputusan **memilih 5 dari 30** diambil oleh kelompok, dan alasannya ditulis di Bagian 4 — bukan hasil serahkan ke AI.

---

## 9. Riset Pasar & Kompetitor Pendukung

### 9.1 Ukuran pasar (dari riset Rizki)

| Indikator | Angka | Sumber |
|---|---|---|
| Mahasiswa aktif Indonesia | **±10,75 juta** (S1 ±8,28 juta) | PDDikti Kemdiktisaintek, 2025 |
| Mahasiswa aktif (data lain) | 9.967.487; 4.416 perguruan tinggi | PDDikti |
| Pengguna internet Indonesia 2025 | 229,4 juta (penetrasi 80,66%) | APJII 2025 |
| TPT lulusan S1–S3 | 5,39% (Agustus 2025) | BPS |
| Penganggur lulusan pendidikan tinggi | ±1,01 juta (13,57%) | Satudata Kemnaker |
| Tim PKM 2024 didanai | 3.520 tim · 10.560 mahasiswa · Rp27,84 M | Simbelmawa |
| Pendaftar GEMASTIK 2024 | 3.385 (2023: 2.780) | BPTI |

### 9.2 Bukti masalah per inti

| Inti | Bukti kunci | Sumber |
|---|---|---|
| 1. Keuangan | Literasi keuangan menentukan kualitas pengelolaan arus kas; perilaku konsumtif berhubungan positif dengan minat pinjol; paylater bergeser jadi gaya hidup | 3 sumber Heka topik 1–2; beberapa jurnal Firlana #5, #26–#33 |
| 2. Peluang & partner | **80% dari 350 mahasiswa FILKOM UB** bingung cari partner lomba; **48%** sulit cari magang relevan; **40%** sulit menyusun *learning plan*; 32% terpaksa ambil magang tidak relevan | J-PTIIK UB; Jurnal IWIMA 2025 (68 responden) |
| 3. Burnout & tidur | Stres akademik ↔ kualitas tidur buruk; burnout & "jam koma"; work-study conflict → kelelahan emosional | JIPP UHAMKA 2023; Sosmaniora 2025; J-P3K 2025 |
| 4. Skripsi | Skripsi sebagai stressor besar; sulit bertemu pembimbing & revisi berulang; gangguan tidur | Yasminiah dkk. 2024; WOPH FKM UMI 2024; Jakasakti 2024 |
| 5. Mahasiswa baru | Kegagalan adaptasi memicu stres/kecemasan; tantangan mahasiswa rantau (kos, biaya, budaya, nutrisi) | ISC-BEAM 2025; BMC Psychology 2025; QSpace 2021 |

### 9.3 Pesaing yang sudah terverifikasi keberadaannya

| Pesaing | Kategori | Bukti traksi |
|---|---|---|
| **SejutaCita** | Info lomba/event/beasiswa/webinar | 2.548.852 pengguna terdaftar; 17.556 event |
| **FlashCampus** | Agregator magang/lomba/beasiswa + mentoring gratis | Platform pengembangan diri mahasiswa; memenangi Diana Award 2023; program mentoring gratis |
| **infolomba.id / inforlombait.com** | Agregator lomba (SMA & mahasiswa) | Kanal info lomba aktif |
| **Glints / Kalibrr / LinkedIn** | Magang & kerja | Pemain besar karier profesional |
| **Unstop / Devpost / Handshake** | Global: kompetisi, hackathon, karier kampus | Unstop 140K+ peluang; Handshake 7 juta+ mahasiswa |
| **Sleep Cycle / Google Fit / Riliv / KALM** | Tidur & kesehatan mental | Aplikasi matang |
| **Money Lover / BukuWarung / BukuKas** | Pencatatan keuangan | Aplikasi matang, gratis |
| **Todoist / Notion / Forest / StudyDue / Studora / Rajin Kuliah** | Tugas & pengingat | Banyak & gratis — **ini alasan prokrastinasi tidak jadi ide utama** |

> **Catatan kejujuran data:** angka traksi SejutaCita, Handshake, Unstop, dan PKM/GEMASTIK diambil dari dokumen riset anggota (November 2026) dan **perlu dicek ulang** sebelum dipakai di deck jualan final. Angka 80% (FILKOM UB), 48% & 40% (IWIMA) adalah hasil penelitian dengan sampel kecil di satu kampus/daerah — **sebutkan ukuran sampelnya** saat presentasi agar tidak dianggap mewakili nasional.

---

## 10. Risiko & Pertanyaan yang Harus Siap Dijawab

| Risiko | Tingkat | Jawaban kelompok |
|---|---|---|
| **Terlalu ambisius (5 modul)** | 🔴 Tinggi | Prototype hanya **1 modul penuh + 4 mockup**, dan tiap modul dibuat *thin slice* dulu. Deck menonjolkan **satu** (Kompas Peluang) |
| **Pesaing B2B kampus sudah ada** (platform kampus terintegrasi, SIAKAD, platform karier kampus) | 🟠 Sedang | Kampus tidak membeli "lima sistem", mereka membeli **satu dashboard** dengan data yang sudah saling terhubung |
| **Kekhawatiran privasi & etika** (deteksi burnout, data keuangan) | 🔴 Tinggi | Data **milik mahasiswa**; konselor hanya menerima **ringkasan yang diizinkan mahasiswa**; tidak ada diagnosis otomatis; patuhi UU PDP |
| **Kualitas data awal** | 🟠 Sedang | Mulai dari 1–2 kampus (pilot), data kos & warung diverifikasi manual senior/UKM |
| **Modul skripsi berisiko jadi "joki"** | 🟠 Sedang | AI hanya untuk **draf pertanyaan & kerangka**; isi skripsi 100% mahasiswa; ada aturan tertulis di dalam produk |
| **Tidak ada yang mau bayar** | 🟠 Sedang | Model B2B (kampus & perusahaan). Mahasiswa gratis. Kampus bayar karena dapat **data penempatan & kesehatan mahasiswa** yang selama ini tidak mereka punya |
| **Anggota belum lengkap** (Athaya) | 🟠 Sedang | 5 inti ini sudah *robust* terhadap 10 permasalahan tambahan; yang baru masuk lewat saringan, bukan menambah jadi 6 |

---

## 11. Checklist Sebelum Diserahkan

- [ ] Konfirmasi **nama produk** & cek domain/username media sosial
- [ ] Lengkapi **10 permasalahan Athaya** → uji saringan Bagian 2 → petakan ke Bagian 7
- [ ] Isi **20 slot permasalahan** (50 total) — arahkan ke turunan 5 inti
- [ ] Kunci **20 konsep bisnis** (tabel 8.1) + beri skor tiap konsep
- [ ] Bangun **5 prototype** (prioritas: Kompas Peluang dulu)
- [ ] Produksi **konten jualan pakai AI** (tabel 8.2) + catat **prompt yang dipakai** sebagai bukti kontrol
- [ ] Cek ulang semua angka traksi pesaing sebelum masuk deck
- [ ] Siapkan 1 slide "**Kenapa bukan aplikasi yang sudah ada**" (isi Bagian 5)

---

## 12. Sumber & Atribusi

**Dokumen riset asal (di repositori ini):**

| Anggota | Folder | Isi | Jumlah sumber |
|---|---|---|---|
| **Heka** | `Heka/riset-30-masalah-mahasiswa/` | 10 topik × 3 sumber, PDF 8 halaman | 30 sumber |
| **Firlana** | `Firlana/ringkasan_permasalahan_mahasiswa_sehari_hari.md` + `daftar_sumber_permasalahan_mahasiswa_sehari_hari.md` | 8 klaster permasalahan | 44 sumber |
| **Rizki** | `Rizki-1/` + `Rizki-2/` | Informasi akademik terpusat + partner lomba/magang | 30 + 30 sumber |
| **Athaya** | — | **belum push** | — |

**Catatan metodologis:**
- Penyaringan 30 → 5 dilakukan **manual oleh kelompok** menggunakan saringan 2 pertanyaan (Bagian 2.1) dan penilaian 4 uji (Bagian 2.3). AI dipakai untuk **menyusun, mengelompokkan, dan merapikan** bahan riset yang sudah dikumpulkan anggota — bukan untuk mengarang permasalahan, dan bukan untuk memilih 5 inti tanpa alasan.
- Semua permasalahan yang **gugur** tetap dicatat beserta alasannya (Bagian 7), karena alasan penolakan itulah yang membuktikan saringan tugas dijalankan (kriteria "solusinya sudah ada").
- Angka statistik dibawa dari dokumen anggota beserta nama sumbernya. Angka yang perlu verifikasi ulang sudah ditandai di Bagian 9.3.

**Lisensi:** mengikuti lisensi repositori induk (belum ditentukan).
