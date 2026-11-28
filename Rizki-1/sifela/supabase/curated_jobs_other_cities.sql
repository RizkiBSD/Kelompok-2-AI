-- Lowongan kurasi dari sumber publik untuk kota di luar Bandung.
-- Aman dijalankan ulang: id tetap dan ON CONFLICT (id) DO UPDATE.
-- Status approved karena sudah ditinjau admin kurator.
-- Kontak hanya dicantumkan bila tersedia di sumber; sisanya mengarah ke tautan sumber.
INSERT INTO public.jobs (
  id, employer_id, title, description, category, location, employment_type,
  salary_min, salary_max, status, area, city, lat, lng, pay, unit, hours,
  work_days, start_time, end_time, slots, skills, rating, reviews, remote,
  views, boosted, company_name, source_url
)
VALUES
(
  '22222222-2222-4222-8222-222222222201',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — PT Fore Kopi Indonesia Tbk',
  $sifela$Sumber: KitaLulus, 18 Nov 2026
https://www.kitalulus.com/lowongan/detail/barista-parttime-semarang-fnel

Perusahaan: PT Fore Kopi Indonesia Tbk, Kota Semarang, Jawa Tengah.
Gaji: dapat dinegosiasikan (nominal tidak disebut di sumber).

Syarat:
- Pendidikan minimal SMA/SMK sederajat.
- Pengalaman minimal 2 tahun di FnB sebagai barista.
- Berminat tinggi dan cepat belajar.
- Ramah, komunikatif, dan berorientasi pada pelayanan.
- Bisa Bahasa Inggris menjadi nilai tambah.
- Disiplin, bertanggung jawab, siap kerja tim.
- Bersedia bekerja shift dan pada hari libur.

Jadwal: Senin–Minggu, 07:00–20:00, 6 hari per minggu.
Tugas: menyiapkan dan menyajikan pesanan sesuai SOP, menjaga kebersihan area dan peralatan, mengoperasikan kasir dan transaksi, serta mengikuti arahan Leader/Supervisor.

Kontak/lamaran: tidak ada nomor publik di sumber. Masuk dan lamar melalui KitaLulus pada tautan sumber.$sifela$,
  'fnb', 'Kota Semarang, Jawa Tengah', 'shift', NULL, NULL, 'approved',
  'Kota Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '07:00', '20:00', 1,
  ARRAY['Barista','Kasir','Pelayanan Pelanggan','Kerja Tim','Bahasa Inggris']::text[], 0, 0, false, 0, false,
  'PT Fore Kopi Indonesia Tbk',
  'https://www.kitalulus.com/lowongan/detail/barista-parttime-semarang-fnel'
),
(
  '22222222-2222-4222-8222-222222222202',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — Mandiri Daya Andalan',
  $sifela$Sumber: Pintarnya
https://pintarnya.com/lowongan/barista-part-1160106

Perusahaan: Mandiri Daya Andalan (outsourcing), Gayamsari, Kota Semarang.
Gaji: Rp2.250.000–Rp2.500.000/bulan. Part-time, onsite.

Persyaratan umum:
- Usia 18–30 tahun, pria/wanita.
- Pendidikan SMA/SMK.
- Berpengalaman dan wajib memiliki foto.
- Berdomisili di Kota Semarang.

Tugas: menyiapkan dan menyajikan kopi, minuman sehat, dan menu lain sesuai standar; mengoperasikan mesin kopi; melayani pelanggan dengan ramah dan profesional; menjaga kebersihan area bar; mengelola persediaan bahan baku dan melaporkan kebutuhan ke atasan.

Keahlian: kerja tim, detail, komunikatif, siap shift malam, melayani pelanggan, siap kerja akhir pekan.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui Pintarnya pada tautan sumber.$sifela$,
  'fnb', 'Gayamsari, Kota Semarang', 'shift', 2250000, 2500000, 'approved',
  'Gayamsari, Semarang', 'semarang', -6.9666, 110.4167, 2250000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Kerja Tim','Komunikasi','Manajemen Stok','Melayani Pelanggan']::text[], 0, 0, false, 0, false,
  'Mandiri Daya Andalan',
  'https://pintarnya.com/lowongan/barista-part-1160106'
),
(
  '22222222-2222-4222-8222-222222222203',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Partime — Sedjenak Koffie',
  $sifela$Sumber: KitaLulus, 26 Nov 2026
https://www.kitalulus.com/lowongan/detail/barista-partime-xz04

Perusahaan: Sedjenak Koffie, penempatan di Kota Lama Semarang.
Gaji: dapat dinegosiasikan (nominal tidak disebut di sumber).

Syarat:
- Laki-laki atau perempuan, usia minimal 18 tahun.
- Pendidikan minimal SMA/SMK sederajat.
- Mampu bekerja sama dalam tim.
- Sehat jasmani dan rohani.
- Fleksibel dan bersedia bekerja shift pada hari biasa.
- Tanpa pengalaman kerja pun boleh melamar.

Jadwal: Senin–Sabtu, 08:00–17:00.

Kontak/lamaran: tidak ada nomor publik di sumber. Masuk dan lamar melalui KitaLulus pada tautan sumber.$sifela$,
  'fnb', 'Kota Lama Semarang', 'shift', NULL, NULL, 'approved',
  'Kota Lama, Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '08:00', '17:00', 1,
  ARRAY['Barista','Kerja Tim','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Sedjenak Koffie',
  'https://www.kitalulus.com/lowongan/detail/barista-partime-xz04'
),
(
  '22222222-2222-4222-8222-222222222204',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Junior Barista — Sibambo Studio',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/junior-barista/783c872c-5cd0-4dd7-b000-c02367f13026

Perusahaan: Sibambo Studio (PT Sibambo Karya Internasional), Semarang, Jawa Tengah.
Gaji: Rp1.500.000–Rp2.300.000/bulan. Penuh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun di bidang barista.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Semarang, Jawa Tengah', 'shift', 1500000, 2300000, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 1500000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Sibambo Studio (PT Sibambo Karya Internasional)',
  'https://glints.com/id/opportunities/jobs/junior-barista/783c872c-5cd0-4dd7-b000-c02367f13026'
),
(
  '22222222-2222-4222-8222-222222222205',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Asisten Bakery — CV Catur Bhakti Mandiri (ILENA Team)',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/asisten-bakery/24ffd40d-fbb6-45fb-bc8d-cfb02a814dcf

Perusahaan: CV CATUR BHAKTI MANDIRI (ILENA TEAM), Semarang, Jawa Tengah.
Gaji: Rp1.500.000–Rp2.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman kurang dari 1 tahun.
- Detail kualifikasi tersedia pada tautan sumber.

Tugas: membantu proses produksi roti dan menjaga standar higienitas dapur sesuai arahan tim.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Semarang, Jawa Tengah', 'shift', 1500000, 2000000, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 1500000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Baker','Produksi','Kerja Tim']::text[], 0, 0, false, 0, false,
  'CV Catur Bhakti Mandiri (ILENA Team)',
  'https://glints.com/id/opportunities/jobs/asisten-bakery/24ffd40d-fbb6-45fb-bc8d-cfb02a814dcf'
),
(
  '22222222-2222-4222-8222-222222222206',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time (Pitutur) — PT Andaf Mulia Korpora',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/barista-part-time-pitutur/ebfa7954-62dc-4da9-9995-593d9e008f34

Perusahaan: PT Andaf Mulia Korpora (Andaf Corp), Jakarta Selatan, DKI Jakarta.
Gaji: Rp95.000–Rp100.000/hari. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Jakarta Selatan, DKI Jakarta', 'shift', 95000, 100000, 'approved',
  'Jakarta Selatan', 'jakarta', -6.2088, 106.8456, 95000, 'hari', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'PT Andaf Mulia Korpora (Andaf Corp)',
  'https://glints.com/id/opportunities/jobs/barista-part-time-pitutur/ebfa7954-62dc-4da9-9995-593d9e008f34'
),
(
  '22222222-2222-4222-8222-222222222207',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Part Time Barista & Game Master — Alisted Boardgame Cafe',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/part-time-barista-and-game-master/11d0babb-955f-4c11-9aba-1f4bbc0d0380

Perusahaan: Alisted Boardgame Cafe, Jakarta Utara, DKI Jakarta.
Gaji: Rp1.000.000–Rp2.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Detail pengalaman dan kualifikasi tersedia pada tautan sumber.

Tugas: melayani pelanggan, menyiapkan minuman, dan mendampingi aktivitas game di kafe.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Jakarta Utara, DKI Jakarta', 'shift', 1000000, 2000000, 'approved',
  'Jakarta Utara', 'jakarta', -6.2088, 106.8456, 1000000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Game Master','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Alisted Boardgame Cafe',
  'https://glints.com/id/opportunities/jobs/part-time-barista-and-game-master/11d0babb-955f-4c11-9aba-1f4bbc0d0380'
),
(
  '22222222-2222-4222-8222-222222222208',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — Totoro Malaka',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/barista-part-time/9dfb5e18-ed07-4016-b57f-eab2a6e01c7f

Perusahaan: Totoro Malaka, Jakarta Timur, DKI Jakarta.
Gaji: Rp1.000.000–Rp1.500.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun sebagai barista.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Jakarta Timur, DKI Jakarta', 'shift', 1000000, 1500000, 'approved',
  'Jakarta Timur', 'jakarta', -6.2088, 106.8456, 1000000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Totoro Malaka',
  'https://glints.com/id/opportunities/jobs/barista-part-time/9dfb5e18-ed07-4016-b57f-eab2a6e01c7f'
),
(
  '22222222-2222-4222-8222-222222222209',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — Srasa Coffee & Space',
  $sifela$Sumber: LokerJogja.ID, 20 Nov 2026
https://www.lokerjogja.id/lowongan/barista-part-time-di-srasa-coffee-space

Perusahaan: Srasa Coffee & Space, Jl. Margo Utomo, Sosromenduran, Kec. Jetis, Kota Jogja, DIY.
Gaji: kompetitif, nominal tidak disebut di sumber. Tunjangan transportasi dan makan tidak termasuk gaji pokok.

Syarat:
- Pendidikan SMA/SMK.
- Pengalaman 0–2 tahun.
- Pria/wanita.
- Jujur dan bertanggung jawab.
- Mampu bekerja mandiri maupun dalam tim.
- Bersedia bekerja sesuai jadwal kafe.

Kontak/lamaran: kirim lamaran ke srasacoffeespace@gmail.com atau melalui halaman sumber.$sifela$,
  'fnb', 'Jetis, Kota Yogyakarta, DIY', 'shift', NULL, NULL, 'approved',
  'Jetis, Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Kerja Tim','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Srasa Coffee & Space',
  'https://www.lokerjogja.id/lowongan/barista-part-time-di-srasa-coffee-space'
),
(
  '22222222-2222-4222-8222-222222222210',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Cashier / Crew / Barista / Baker — Kville',
  $sifela$Sumber: LokerJogja.ID
https://www.lokerjogja.id/lowongan/cashier-crew-barista-baker-dan-beberapa-posisi-lainnya-di-kville/

Perusahaan: Kville, Sleman, DI Yogyakarta.
Posisi: Cashier, Crew, Barista, Baker, Admin Staff, dan Purchasing Staff.
Gaji: tidak disebutkan di sumber; tanyakan langsung saat kontak.

Syarat dan detail jadwal tersedia pada tautan sumber.

Kontak/lamaran: hubungi 081125113578 atau isi formulir https://bit.ly/formkville.$sifela$,
  'fnb', 'Sleman, DI Yogyakarta', 'shift', NULL, NULL, 'approved',
  'Sleman, Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Kasir','Baker','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Kville',
  'https://www.lokerjogja.id/lowongan/cashier-crew-barista-baker-dan-beberapa-posisi-lainnya-di-kville/'
),
(
  '22222222-2222-4222-8222-222222222211',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Wanita — Rasa Hari Ini Coffee',
  $sifela$Sumber: LokerJogja.ID
https://www.lokerjogja.id/lowongan/barista-wanita-di-rasa-hari-ini-coffee/

Perusahaan: Rasa Hari Ini Coffee, Sleman, DI Yogyakarta.
Gaji: tidak disebutkan di sumber; tanyakan langsung saat kontak.
Batas lamaran: 06 Des 2026.

Syarat:
- Pendidikan SMA/SMK.
- Pengalaman 0–2 tahun.
- Wanita.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: hubungi +62895365561188 untuk pendaftaran.$sifela$,
  'fnb', 'Sleman, DI Yogyakarta', 'shift', NULL, NULL, 'approved',
  'Sleman, Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Rasa Hari Ini Coffee',
  'https://www.lokerjogja.id/lowongan/barista-wanita-di-rasa-hari-ini-coffee/'
),
(
  '22222222-2222-4222-8222-222222222212',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part-Time — C+C&Co',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/barista-part-time/2df03c54-132b-4265-8662-2292ecd748f4

Perusahaan: C+C&Co, Surabaya, Jawa Timur.
Gaji: Rp900.000–Rp1.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun sebagai barista.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Surabaya, Jawa Timur', 'shift', 900000, 1000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 900000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'C+C&Co',
  'https://glints.com/id/opportunities/jobs/barista-part-time/2df03c54-132b-4265-8662-2292ecd748f4'
),
(
  '22222222-2222-4222-8222-222222222213',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part-time — Saat Seduh Coffee Surabaya',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/barista-part-time/839856d9-9338-4b36-9ef5-d53403023ff8

Perusahaan: Saat Seduh Coffee Surabaya, Surabaya, Jawa Timur.
Gaji: Rp1.000.000–Rp2.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman kurang dari 1 tahun.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Surabaya, Jawa Timur', 'shift', 1000000, 2000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 1000000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Saat Seduh Coffee Surabaya',
  'https://glints.com/id/opportunities/jobs/barista-part-time/839856d9-9338-4b36-9ef5-d53403023ff8'
),
(
  '22222222-2222-4222-8222-222222222214',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Cafe Crew Part Time — Fast Coffee and Bike Wash',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/cafe-crew-part-time/9378a2f4-cf80-4b33-a819-7411a4cbf1ae

Perusahaan: Fast Coffee and Bike Wash, Surabaya, Jawa Timur.
Gaji: Rp1.400.000–Rp2.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun.
- Detail kualifikasi tersedia pada tautan sumber.

Tugas: melayani pelanggan dan mendukung operasional kafe.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'retail', 'Surabaya, Jawa Timur', 'shift', 1400000, 2000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 1400000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Pelayanan Pelanggan','Kasir','Kerja Tim']::text[], 0, 0, false, 0, false,
  'Fast Coffee and Bike Wash',
  'https://glints.com/id/opportunities/jobs/cafe-crew-part-time/9378a2f4-cf80-4b33-a819-7411a4cbf1ae'
),
(
  '22222222-2222-4222-8222-222222222215',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista — KOPI NAKO',
  $sifela$Sumber: Pintarnya
https://pintarnya.com/lowongan/barista-1163162

Perusahaan: KOPI NAKO, Klojen, Kota Malang.
Gaji: Rp1.000.000–Rp1.100.000/bulan. Part-time, onsite.

Persyaratan umum:
- Usia 20–30 tahun, pria/wanita.
- Pendidikan SMA/SMK.
- Berpengalaman dan wajib memiliki foto.
- Berdomisili di Kota Malang.

Tugas: menyapa dan melayani pelanggan, menjelaskan menu, menerima pesanan, menyajikan minuman dan makanan ringan, menjaga kebersihan, memeriksa stok dan kualitas peralatan, serta menyampaikan umpan balik pelanggan ke manajer.

Keahlian: detail dalam bekerja, mengoperasikan mesin kopi, komunikatif, siap shift malam, melayani pelanggan, siap kerja akhir pekan.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui Pintarnya pada tautan sumber.$sifela$,
  'fnb', 'Klojen, Kota Malang', 'shift', 1000000, 1100000, 'approved',
  'Klojen, Malang', 'malang', -7.9666, 112.6326, 1000000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Komunikasi','Manajemen Stok','Pelayanan Pelanggan','Mesin Kopi']::text[], 0, 0, false, 0, false,
  'KOPI NAKO',
  'https://pintarnya.com/lowongan/barista-1163162'
),
(
  '22222222-2222-4222-8222-222222222216',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista — The Harvest',
  $sifela$Sumber: Pintarnya
https://pintarnya.com/lowongan/barista-276428

Perusahaan: The Harvest, Lowokwaru, Kota Malang.
Gaji: Rp3.309.000/bulan. Kontrak, onsite.

Persyaratan umum:
- Usia 17–60 tahun, pria/wanita.
- Tanpa minimal pendidikan.
- Tanpa pengalaman kerja.
- Berdomisili di Kota Malang.

Tugas: menyapa pelanggan, menjelaskan menu, menerima pesanan, menyajikan minuman dan makanan ringan, menjaga kebersihan, memeriksa stok dan kualitas alat, serta menyampaikan umpan balik pelanggan.

Keahlian: kerja tim, komunikatif, bekerja di bawah tekanan, melayani pelanggan, komunikasi interpersonal.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui Pintarnya pada tautan sumber.$sifela$,
  'fnb', 'Lowokwaru, Kota Malang', 'shift', 3309000, 3309000, 'approved',
  'Lowokwaru, Malang', 'malang', -7.9666, 112.6326, 3309000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Kerja Tim','Komunikasi','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'The Harvest',
  'https://pintarnya.com/lowongan/barista-276428'
),
(
  '22222222-2222-4222-8222-222222222217',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Part Time Baker — Kueku Bakery Supply',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/part-time-baker/fd2c1bcf-47a8-4f64-8394-a9dc7af5fd51

Perusahaan: Kueku Bakery Supply, Malang, Jawa Timur.
Gaji: Rp1.800.000–Rp2.000.000/bulan. Paruh waktu, kerja di lokasi.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun.
- Detail kualifikasi tersedia pada tautan sumber.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Malang, Jawa Timur', 'shift', 1800000, 2000000, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 1800000, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Baker','Produksi','Kerja Tim']::text[], 0, 0, false, 0, false,
  'Kueku Bakery Supply',
  'https://glints.com/id/opportunities/jobs/part-time-baker/fd2c1bcf-47a8-4f64-8394-a9dc7af5fd51'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  employment_type = EXCLUDED.employment_type,
  salary_min = EXCLUDED.salary_min,
  salary_max = EXCLUDED.salary_max,
  status = EXCLUDED.status,
  area = EXCLUDED.area,
  city = EXCLUDED.city,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  pay = EXCLUDED.pay,
  unit = EXCLUDED.unit,
  hours = EXCLUDED.hours,
  work_days = EXCLUDED.work_days,
  start_time = EXCLUDED.start_time,
  end_time = EXCLUDED.end_time,
  slots = EXCLUDED.slots,
  skills = EXCLUDED.skills,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  remote = EXCLUDED.remote,
  views = EXCLUDED.views,
  boosted = EXCLUDED.boosted,
  company_name = EXCLUDED.company_name,
  source_url = EXCLUDED.source_url,
  updated_at = now();

SELECT city, count(*) AS jobs
FROM public.jobs
WHERE employer_id = 'ad2c0561-696c-4f74-afb2-e232218e1390'
GROUP BY city
ORDER BY city;

-- Deskripsi kurasi tidak menampilkan sumber kompetitor. Bagian ini memastikan
-- teks tetap bersih bila file seed historis ini dijalankan ulang.
UPDATE public.jobs
SET description =
  rtrim(regexp_replace(regexp_replace(description, '^Sumber:[^\n]*\n(?:https?://[^\n]*\n)?\n?', ''), '\nKontak/lamaran:[^\n]*$', ''))
  || E'\n\nCara melamar: ajukan lamaran langsung melalui Sifela.'
WHERE description LIKE 'Sumber:%';
