# Riset Topik: Platform Informasi Akademik Terpusat dengan Inovasi Pencarian Partner Lomba, Magang, dan Lainnya

> Disusun untuk: Kelompok-2-AI · Tanggal: 16 November 2026
> Seluruh sumber dikumpulkan melalui penelusuran web langsung (November 2026). Sebagian tautan berupa PDF jurnal — jika satu tautan mati, cari judulnya di Google Scholar.

---

## 1. Rumusan Topik

**"Informasi akademik terpusat dengan inovasi pencarian partner lomba, magang, dan lain-lain"** — platform digital satu pintu (single gateway) yang mengagregasi informasi **lomba, magang, beasiswa, seminar/workshop** bagi mahasiswa dan siswa, dilengkapi fitur unggulan: **pencocokan partner/teammate berbasis AI** dan **rekomendasi peluang yang dipersonalisasi**.

---

## 2. Latar Belakang & Urgensi (Berbasis Data)

| Fakta Kunci | Angka | Sumber |
|---|---|---|
| Mahasiswa aktif Indonesia | **±10,75 juta** (S1: ±8,28 juta) | PDDikti Kemdiktisaintek, 2025 [#12] |
| Pengangguran nasional | **7,46 juta orang** (Agustus 2025) | BPS [#13] |
| TPT lulusan SMK (tertinggi) | **8,63%** | BPS via GoodStats [#14] |
| TPT lulusan S1–S3 | **5,39%** | BPS via Detik [#13] |
| Kuota satu batch MSIB | **>30.000 mahasiswa** (±10% mahasiswa nasional) | Itjen Kemendikdasmen [#15] |
| Mahasiswa kesulitan cari tempat magang relevan | **48%** responden | Jurnal IWIMA, 2025 [#9] |
| Mahasiswa kesulitan menyusun learning plan | **40%** responden | Jurnal IWIMA, 2025 [#9] |

**Inti masalah:**
1. **Informasi terfragmentasi** — info lomba tersebar di Instagram/Twitter/word of mouth; info magang tersebar di banyak portal (Glints, Kalibrr, LinkedIn, situs perusahaan); info beasiswa di tempat lain lagi. Mahasiswa harus memantau banyak kanal sekaligus.
2. **Tidak ada pencarian partner** — lomba tim (hackathon, business plan, PKM) butuh teammate, tapi mahasiswa hanya bisa mencari lewat grup WhatsApp/teman seangkatan — tidak menjangkau orang dengan skill yang cocok.
3. **Minat tinggi, akses sulit** — 48% mahasiswa kesulitan menemukan magang yang relevan dengan bidang studinya [#9], padahal program magang bersertifikat sangat diminati (13.002 pendaftar hanya di wilayah LLDIKTI I untuk satu batch [#16]).

---

## 3. Peta Solusi Existing (Analisis Kompetitor)

### 3.1 Indonesia

| Platform | Isi | Cari Partner? | AI? | Kekurangan |
|---|---|---|---|---|
| **MSIB/Kampus Merdeka** [#15] | Magang + studi independen bersertifikat | ❌ | ❌ | Hanya program pemerintah, seleksi ketat kuota terbatas |
| **infolomba.id** [#17] | Agregator info lomba (media partner) | ❌ | ❌ | Hanya lomba, tanpa magang/beasiswa |
| **infolombait.com** [#18] | Info lomba SMA & mahasiswa | ❌ | ❌ | Sekadar kanal berita lomba |
| **Glints** [#37] | Lowongan kerja + magang | ❌ | Sebagian (filter) | Fokus kerja, bukan lomba/beasiswa/siswa |
| **Kalibrr** [#38] | Lowongan + magang, dashboard AI | ❌ | ✔ (pencarian) | Fokus kerja profesional |
| **Siakad kampus** | Akademik internal (KRS, nilai) | ❌ | ❌ | Tidak memuat peluang eksternal |

### 3.2 Global (pembanding inovasi)

| Platform | Isi | Cari Partner? | AI? | Pelajaran untuk kita |
|---|---|---|---|---|
| **Unstop** (eks Dare2Compete, India) [#19] | Lomba + magang + hiring + beasiswa dalam SATU platform | ❌ | Sebagian | Bukti model "one-stop" itu hidup & skala besar (21.341+ kompetisi) |
| **Devpost** [#20] | Hackathon + **team formation page** ("looking for teammates") | ✔ (manual) | ❌ | Fitur cari teammate terbukti dibutuhkan di hackathon |
| **Hackathon Buddy** [#21] | Pencari teammate berbasis AI untuk Devpost | ✔ (AI) | ✔ | Validasi niche "AI teammate matcher" — belum ada versi Indonesia |
| **Internshala** (India) [#36] | Magang (120K+ lowongan) + pelatihan | ❌ | Sebagian | Model bisnis magang terpusat untuk pelajar/mahasiswa |

### 3.3 Kesimpulan Gap

> **Tidak ada satu pun platform di Indonesia yang menggabungkan: (a) info lomba + magang + beasiswa dalam satu tempat, DAN (b) pencarian partner/teammate berbasis AI, DAN (c) rekomendasi personal.** Literatur pun menunjukkan hal serupa: banyak penelitian "sistem informasi lomba" [#1–#5] dan "sistem informasi magang" [#6–#8] terpisah-pisah, dan tidak ditemukan jurnal yang menggabungkan beasiswa + lomba + magang + partner-matching sekaligus. Ini **celah riset sekaligus celah pasar**.

---

## 4. Peluang Inovasi (Kebaruan / Novelty)

1. **Terpusat** — agregasi lintas jenis peluang (lomba, magang, beasiswa, event) dari banyak sumber → satu dashboard.
2. **Partner Matching berbasis AI** — profil mahasiswa (skill, minat, rekam jejak lomba) dicocokkan dengan kebutuhan tim lomba; bisa memakai pendekatan *stable matching* (Gale-Shapley) [#22] dan *team formation algorithm* berbasis skill [#23–#25].
3. **Rekomendasi personal** — lomba/magang yang relevan dengan jurusan & skill (collaborative filtering sudah teruji untuk rekomendasi lomba dengan akurasi 70% [#26]; semantic matching untuk kecocokan CV–lowongan [#27]).
4. **Chatbot asisten** — tanya "ada lomba UI/UX deadline minggu ini buat tim 3 orang?" dalam bahasa natural (chatbot akademik berbasis RAG sudah umum diteliti di Indonesia [#28–#29]).
5. **Menjangkau siswa** (SMA/SMK) — kompetitor global fokus mahasiswa; SMK justru kelompok dengan TPT tertinggi (8,63% [#14]) yang paling butuh magang.

---

## 5. Usulan Fitur & Tumpuan Teknologi

| Fitur | Teknologi rujukan | Sumber |
|---|---|---|
| Pencarian semantik peluang | Sentence-embedding (BERT/MiniLM) untuk kecocokan profil–lowongan | #27, #35 |
| Rekomendasi lomba/magang | Hybrid filtering (content-based + collaborative) | #26, #30 |
| Pencocokan teammate | Stable matching (Gale-Shapley) + team formation berbasis skill | #22, #23, #24, #25 |
| Asisten tanya-jawab | Chatbot RAG (Retrieval-Augmented Generation) / LLM | #28, #29 |
| Dashboard terpusat | Arsitektur web modern (pattern dari jurnal-jurnal SI lomba/magang) | #1–#8 |

---

## 6. DAFTAR 30 SUMBER

### A. Jurnal — Sistem Informasi Lomba (5)

1. **Perancangan Sistem Informasi Kompetisi Mahasiswa Berbasis Website dengan Metode User-Centered Design (UCD)** — Moza, N.P.S.D.D., *JATI ITN* — https://ejournal.itn.ac.id/jati/article/view/17591 — Perancangan portal kompetisi mahasiswa dengan pendekatan UCD; paling dekat dengan konteks topik.
2. **Perancangan Sistem Informasi SiapKolaborasi Berbasis Web** — Ridha, M.R., *Jurnal Automata UII* — https://journal.uii.ac.id/AUTOMATA/article/download/24240/14055/73629 — Mengukur efektivitas sistem informasi lomba; banyak disitasi.
3. **Rancang Bangun Sistem Informasi Lomba Start-Up Berbasis Web** — Yudhanto, Y., *Indonesian Journal of Applied Informatics (UNS)*, 2023 — https://jurnal.uns.ac.id/ijai/article/view/59328 — Sistem e-proposal lomba dengan pendaftaran & unggah karya.
4. **Perancangan Sistem Informasi dan Registrasi Lomba Akademik Berbasis Web** — Rusdi, Z., *JIKSI Untar*, 2023 — https://journal.untar.ac.id/index.php/jiksi/article/view/24089 — Digitalisasi registrasi lomba akademik.
5. **Perancangan Sistem Informasi Manajemen Portal Berita Kompetisi Berbasis Web** — Miftah, M., *OJS UDB*, 2024 — https://ojs.udb.ac.id/Senatib/article/view/4667 — Portal berita kompetisi sebagai agregator info.

### B. Jurnal — Sistem Informasi Magang (3)

6. **Sistem Informasi Pengelolaan Magang Berbasis Web** — Perdana, M.F.C., 2024 — https://ojs.stmik-im.ac.id/index.php/INFORMASI/article/view/314 — Dikutip 15×; pengelolaan magang PHP/MySQL.
7. **Perancangan Sistem Informasi Peserta Magang Berbasis Web** — Ananda, F., *REMIK Polgan*, 2024 — https://jurnal.polgan.ac.id/index.php/remik/article/view/13653 — Dikutip 17×; pengolahan data peserta magang.
8. **Rancang Bangun Sistem Informasi Manajemen Layanan Magang** — Salim, A.Y., *JIPI*, 2024 — https://jurnal.stkippgritulungagung.ac.id/index.php/jipi/article/view/4434 — Dikutip 24×; studi kasus layanan magang instansi.

### C. Validasi Masalah & Data Statistik (6)

9. **Analisis Permasalahan Mata Kuliah Magang (Internship) Mahasiswa** — *Jurnal IWIMA*, 2025 — https://ejournal.iwima.ac.id/index.php/ictech/article/download/31-37/223/1250 — **Data kunci: 48% mahasiswa kesulitan mencari tempat magang relevan; 40% kesulitan learning plan.**
10. **Rasionalitas Mahasiswa Memilih Magang dalam Program Bersertifikat** — *Jurnal Paradigma UNESA*, 2024 — https://ejournal.unesa.ac.id/index.php/paradigma/article/download/63609/48236 — Mengkaji saluran informasi yang dipakai mahasiswa untuk keputusan magang.
11. **Kenapa Mahasiswa Sering Susah Dapat Tempat Magang yang Sesuai Jurusan** — Masoem University — https://masoemuniversity.ac.id/artikel/kenapa-mahasiswa-sering-susah-dapat-tempat-magang-yang-sesuai-jurusan — Analisis penyebab mahasiswa sulit menemukan magang sesuai bidang.
12. **(PDDikti) Dashboard Mahasiswa** — Kemdiktisaintek, 2025 — https://data.kemdiktisaintek.go.id/dashboard/mahasiswa — **±10,75 juta mahasiswa aktif terdaftar.**
13. **BPS: 7,46 Juta Orang Indonesia Jadi Penganggur (Agustus 2025)** — BPS via Detik — https://www.detik.com/edu/detikpedia/d-8268287/bps-7-46-juta-orang-indonesia-jadi-penganggur-paling-banyak-dari-lulusan-ini — TPT: SMK 8,63%, S1–S3 5,39%.
14. **Tingkat Pengangguran Lulusan SMK Tertinggi per Agustus 2025** — BPS via GoodStats — https://data.goodstats.id/statistic/tingkat-pengangguran-lulusan-smk-tertinggi-per-agustus-2025-llhi5 — Detail TPT per jenjang pendidikan.

### D. Platform Existing — Indonesia (4)

15. **Program MSIB Kampus Merdeka (kuota & statistik)** — Itjen Kemendikdasmen — https://itjen.kemendikdasmen.go.id/web/?p=5689 — Kuota >30.000 mahasiswa per batch (±10% mahasiswa nasional).
16. **Program Magang dan Studi Independen Bersertifikat** — LLDIKTI I Kemdiktisaintek — https://lldikti1.kemdiktisaintek.go.id/a/program-magang-dan-studi-independen-bersertifikat-kampus-merdeka — 13.002 pendaftar pada satu batch wilayah kerjanya.
17. **Info Lomba Indonesia (infolomba.id)** — Instagram resmi — https://www.instagram.com/infolomba/?hl=en — "All-in-One Competition Hub" Indonesia; bukti agregator lomba sudah ada tapi tanpa magang/partner-matching.
18. **Info Lomba IT** — https://www.infolombait.com — Agregator lomba untuk siswa SMA & mahasiswa.

### E. Platform Existing — Global (3)

19. **Unstop — Competitions** (eks Dare2Compete) — https://unstop.com/competitions — 21.341+ kompetisi online; juga magang/hiring/beasiswa → bukti model one-stop platform.
20. **Devpost — Participants Page / Forming a Team** — https://help.devpost.com/article/75-participants-page-forming-a-team — Fitur resmi pencarian teammate hackathon (manual, tanpa AI).
21. **Hackathon Buddy** — https://devpost.com/software/hackathon-buddy-1powq5 — Platform AI third-party untuk cari teammate hackathon → preseden inovasi "AI partner matcher".

### F. Teknologi AI — Matching & Team Formation (6)

22. **College Admissions and the Stability of Marriage** — Gale, D. & Shapley, L.S., *American Mathematical Monthly*, 1962 — https://sites.math.washington.edu/~billey/classes/562.winter.2018/articles/Gale.Shapley.pdf — Paper klasik stable matching (Nobel Ekonomi 2012); dasar teori pencocokan partner.
23. **HackMatch: Smart Hackathon Team Formation System** — *IJRPR* — https://ijrpr.com/uploads/V7ISSUE10/IJRPR70665.pdf — Sistem pembentukan tim hackathon otomatis dengan 8 fitur kompatibilitas.
24. **Skill-based Team Formation in Software Ecosystems** — Schall, D. et al. — https://ceur-ws.org/Vol-1711/paperDECOSYS2.pdf — Genetic algorithm untuk tim optimal berbasis skill.
25. **Crowdsourcing Team Formation With Worker-Centered Models** — Vinella et al., 2022 — https://pmc.ncbi.nlm.nih.gov/articles/PMC9184727 — Perbandingan model bottom-up/top-down/hybrid pembentukan tim.
26. **Integrasi Naive Bayes dan Item-Based Collaborative Filtering untuk Rekomendasi Lomba** — Nurmalasari, D., *Jurnal Komputasi Terapan PCR*, 2025 — http://jurnal.pcr.ac.id/index.php/jkt/article/download/6612/2263 — **Terbukti: rekomendasi lomba dengan akurasi 70%.**
27. **AI-Driven Semantic Similarity-Based Job Matching** — Brunel University, 2025 — https://bura.brunel.ac.uk/bitstream/2438/32657/1/FullText.pdf — Aplikasi pencocokan semantik real-time untuk rekrutmen (dikutip 35×).

### G. Chatbot & Asisten Informasi Akademik (3)

28. **Integrasi Chatbot Berbasis NLP pada Sistem Layanan Akademik** — Tarigan, H.P., 2024 — https://jurnal.geinrafflesia.com/index.php/JK/article/download/110/72 — Chatbot asisten virtual layanan akademik (dikutip 9×).
29. **Chatbot Informasi Akademik Berbasis RAG** — Hikam, W.A., Skripsi UIN Maulana Malik Ibrahim Malang, 2025 — http://etheses.uin-malang.ac.id/82601 — Penerapan Retrieval-Augmented Generation untuk tanya-jawab akademik.
30. **Implementasi Metode Hybrid Filtering (Content Based dan Collaborative Filtering) dalam Sistem Rekomendasi** — Septian, M., *JATI ITN*, 2026 — https://ejournal.itn-ac.id/jati/article/view/18591 — Metode hybrid untuk rekomendasi personal.

### Sumber Cadangan (8)

31. **Perancangan Sistem Informasi Perlombaan Berbasis Website** — Fajar, A., *Oktal*, 2022 — https://journal.mediapublikasi.id/index.php/oktal/article/view/51
32. **Sistem Informasi Lomba Kota Bekasi** — Syahputra, S.M., 2019 — https://jurnal.ikhafi.or.id/index.php/jusibi/article/view/96
33. **Sistem Informasi Magang Berbasis Website** — *Jurnal Sisfo Unimal* — https://ojs.unimal.ac.id/sisfo/article/view/18153/pdf
34. **The Stable Marriage Problem Solution Underpins Dating Apps and School Admissions** — *Scientific American*, 2024 — https://www.scientificamerican.com/article/the-stable-marriage-problem-solution-underpins-dating-apps-and-school
35. **Document Matching for Job Descriptions (Fine-tuned BERT/Sentence-BERT)** — Stanford CS224N — https://web.stanford.edu/class/cs224n/1214/reports/final_reports/report062.pdf
36. **Internshala — Platform Magang India** — https://internshala.com — 120K+ magang berbayar; bukti platform magang terpusat skala besar.
37. **Glints Indonesia** — https://glints.com/id — 100.000+ lowongan termasuk kategori magang/fresh graduate.
38. **Kalibrr Indonesia** — https://www.kalibrr.id/id-ID/home — Portal lamaran dengan fitur AI & dashboard pelamar.

---

## 7. Catatan Metodologi Riset

- Semua sumber ditemukan lewat penelusuran web langsung (Google/web search) pada 16 Nov 2026; judul dan tautan berasal dari hasil penelusuran nyata, bukan rekaan.
- Tautan jurnal Indonesia umumnya menuju halaman OJS (Open Journal Systems) — beberapa langsung ke PDF; jika tak terbuka, salin judul ke Google Scholar.
- Angka-angka statistik (PDDikti, BPS, MSIB) diverifikasi minimal dari satu liputan media/lembaga resmi.
