-- Lowongan kurasi dari sumber publik. Aman dijalankan ulang: id tetap.
-- Status sengaja approved karena sudah ditinjau admin kurator.
INSERT INTO public.jobs (
  id, employer_id, title, description, category, location, employment_type,
  salary_min, salary_max, status, area, city, lat, lng, pay, unit, hours,
  work_days, start_time, end_time, slots, skills, rating, reviews, remote,
  views, boosted, company_name, source_url
)
VALUES
(
  '11111111-1111-4111-8111-111111111101',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Part Time Barista — PT Bawa Boga Balakosa',
  $sifela$Sumber: Indeed, 28 Nov 2026
https://id.indeed.com/q-part-time-l-bandung-lowongan.html

Perusahaan: PT Bawa Boga Balakosa (Coffee Bawa Kopo), Bandung.
Gaji: mulai Rp90.000/hari.

Syarat:
- Pria/wanita, maksimal 26 tahun.
- Pengalaman part-time minimal 6 bulan di industri kopi.
- Bisa bekerja shift dan akhir pekan; bersedia ditempatkan di store Coffee Bawa Kopo.
- Mampu berkomunikasi dengan baik, bekerja sama tim, tahan tekanan, dan bangun pagi.
- Berpenampilan menarik menjadi nilai plus.

Tugas: menyajikan kopi, melayani pelanggan, menjaga kebersihan area kerja, dan mendukung operasional toko.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui tombol "Easily apply" pada tautan Indeed di atas.$sifela$,
  'fnb', 'Bandung', 'shift', 90000, NULL, 'approved',
  'Bandung', 'bandung', -6.9175, 107.6191, 90000, 'hari', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'PT Bawa Boga Balakosa',
  'https://id.indeed.com/q-part-time-l-bandung-lowongan.html'
),
(
  '11111111-1111-4111-8111-111111111102',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Full Time Barista — PT Bawa Boga Balakosa',
  $sifela$Sumber: Indeed, 28 Nov 2026
https://id.indeed.com/q-part-time-l-bandung-lowongan.html

Perusahaan: PT Bawa Boga Balakosa (Coffee Bawa Kopo), Bandung.
Gaji: mulai Rp2.700.000/bulan.

Syarat:
- Pria/wanita, maksimal 26 tahun.
- Pengalaman minimal 1 tahun di industri kopi.
- Bisa bekerja shift dan akhir pekan; bersedia ditempatkan di store Coffee Bawa Kopo.
- Komunikatif, bisa bekerja sama tim, dan menyukai dunia kopi.

Tugas: menyiapkan dan menyajikan minuman kopi, melayani pelanggan, menjaga standar kualitas dan kebersihan, serta mendukung operasional store.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui tombol "Easily apply" pada tautan Indeed di atas.$sifela$,
  'fnb', 'Bandung', 'shift', 2700000, NULL, 'approved',
  'Bandung', 'bandung', -6.9175, 107.6191, 2700000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'PT Bawa Boga Balakosa',
  'https://id.indeed.com/q-part-time-l-bandung-lowongan.html'
),
(
  '11111111-1111-4111-8111-111111111103',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — Beda Cerita Coffee',
  $sifela$Sumber: Glints
https://glints.com/id/opportunities/jobs/barista-part-time/a8ef6bc1-9df4-45f3-b79d-d47a96d64b91

Perusahaan: Beda Cerita Coffee, Jl. Jatihandap No.138, Mandalamekar, Kec. Cimenyan, Kota Bandung 40193.
Gaji: Rp1.184.000–Rp1.776.000/bulan. Benefit: training/certification, sales commission, THR.

Syarat:
- Pendidikan minimal SMA/SMK.
- Pengalaman 1–3 tahun di bidang relevan.
- Usia 18–25 tahun.
- Skill: latte art, cashier, customer service, teamwork, analytical skills, public speaking, coffee shop.

Tugas: melayani pelanggan, menyiapkan minuman sesuai standar, mengelola transaksi, menjaga stok bahan baku, dan menjaga kebersihan area kerja.

Kontak/lamaran: tidak ada nomor publik. Lamar dan chat melalui Glints pada tautan sumber.$sifela$,
  'fnb', 'Mandalajati, Kota Bandung', 'shift', 1184000, 1776000, 'approved',
  'Mandalajati, Kota Bandung', 'bandung', -6.9175, 107.6191, 1184000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Kasir','Pelayanan Pelanggan','Komunikasi','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'Beda Cerita Coffee',
  'https://glints.com/id/opportunities/jobs/barista-part-time/a8ef6bc1-9df4-45f3-b79d-d47a96d64b91'
),
(
  '11111111-1111-4111-8111-111111111104',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Keliling — Your Partner',
  $sifela$Sumber: KitaLulus, 11 Nov 2026
https://www.kitalulus.com/lowongan/detail/barista-keliling-uvmz

Perusahaan: PT Titik Awal Sejahtera (merek Your Partner), Kota Bandung.
Gaji pokok Rp2.200.000/bulan + insentif penjualan bulanan tanpa batas.
Jadwal tetap, bukan shift: 6 hari kerja per minggu, libur setiap hari Sabtu.

Syarat:
- Usia 18–35 tahun, pria/wanita, berdomisili di Bandung.
- Memiliki pengalaman kerja.
- Bisa mengendarai sepeda motor dan memiliki smartphone Android yang kompatibel.
- Berpenampilan rapi, suka berinteraksi, memiliki mental sales dan siap target.
- Bersedia training dan mengikuti SOP. Mess karyawan tidak tersedia.

Tugas: buka/tutup operasional dengan kendaraan yang disediakan, menyiapkan peralatan, melayani dan menjual kopi, menghitung stok awal/akhir, serta mencatat penjualan.

Kontak/lamaran: tidak ada nomor publik di sumber. Masuk dan lamar melalui KitaLulus pada tautan sumber.$sifela$,
  'fnb', 'Kota Bandung (fieldwork)', 'shift', 2200000, NULL, 'approved',
  'Kota Bandung', 'bandung', -6.9175, 107.6191, 2200000, 'bulan', 0,
  ARRAY['min','sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'Your Partner',
  'https://www.kitalulus.com/lowongan/detail/barista-keliling-uvmz'
),
(
  '11111111-1111-4111-8111-111111111105',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista — KAYOMAN GROUP',
  $sifela$Sumber: Pintarnya
https://pintarnya.com/lowongan/barista-1026460?from=search-result

Perusahaan: KAYOMAN GROUP, Astana Anyar, Kota Bandung.
Gaji: Rp1.800.000–Rp2.200.000/bulan. Kontrak, onsite.

Syarat:
- Usia 17–60 tahun, pria/wanita.
- Tanpa minimal pendidikan dan tanpa pengalaman kerja.
- Wajib memiliki foto dan siap kerja akhir pekan.
- Keahlian: kerja tim, detail, komunikatif, melayani pelanggan, komunikasi interpersonal.

Tugas: menyapa pelanggan, menjelaskan menu, menerima pesanan, menyajikan minuman dan makanan ringan, menjaga kebersihan, memeriksa stok dan kualitas alat, serta menyampaikan umpan balik pelanggan.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui Pintarnya pada tautan sumber.$sifela$,
  'fnb', 'Astana Anyar, Kota Bandung', 'shift', 1800000, 2200000, 'approved',
  'Astana Anyar, Kota Bandung', 'bandung', -6.9175, 107.6191, 1800000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'KAYOMAN GROUP',
  'https://pintarnya.com/lowongan/barista-1026460?from=search-result'
),
(
  '11111111-1111-4111-8111-111111111106',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Part Time — Loee Coffee',
  $sifela$Sumber: LokerBandung.id
https://www.lokerbandung.id/lowongan/barista-part-time-di-loee-coffee

Lokasi: Bandung Timur, Kota Bandung.
Gaji: kompetitif, nominal tidak disebut di sumber. Benefit: bonus achievement target dan bonus kinerja.

Syarat:
- SMA/SMK, pengalaman 0–2 tahun.
- Laki-laki, usia 19–27 tahun.
- Pengalaman barista minimal 3 bulan.
- Menguasai latte art dan manual brew.
- Cepat beradaptasi, mengikuti SOP, dan bersedia kerja 5 hari per minggu.

Kontak/lamaran: alamat email di sumber disamarkan dan hanya tampil setelah login. Lamar melalui halaman sumber di atas; nomor telepon publik tidak tersedia.$sifela$,
  'fnb', 'Bandung Timur, Kota Bandung', 'shift', NULL, NULL, 'approved',
  'Bandung Timur', 'bandung', -6.9175, 107.6191, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Loee Coffee',
  'https://www.lokerbandung.id/lowongan/barista-part-time-di-loee-coffee'
),
(
  '11111111-1111-4111-8111-111111111107',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Barista Catalyst — Soreang',
  $sifela$Sumber: Instagram @lokermahasiswa_bdg, 6 Nov 2026
https://www.instagram.com/p/DfZTQ2IgYva

Lokasi: Soreang, Kabupaten Bandung.
Estimasi gaji: hingga Rp2.500.000/bulan (sesuai unggahan sumber).

Syarat:
- Wanita, usia minimal 23 tahun.
- Pengalaman barista minimal 6 bulan.
- Mampu bekerja tim dan berkomunikasi baik.
- Bersedia bekerja pada hari libur, tanggal merah, dan akhir pekan.
- Jujur, disiplin, dan ber-attitude baik.

Kontak/lamaran: kirim CV melalui WhatsApp 0882 1857 6120.$sifela$,
  'fnb', 'Soreang, Kabupaten Bandung', 'shift', 2500000, 2500000, 'approved',
  'Soreang, Kab. Bandung', 'bandung', -7.0260, 107.5230, 2500000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Catalyst',
  'https://www.instagram.com/p/DfZTQ2IgYva'
),
(
  '11111111-1111-4111-8111-111111111108',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Full Time Barista / Part Time Kitchen — Bandung',
  $sifela$Sumber: Instagram @paruhwaktu.co, 15 Nov 2026
https://www.instagram.com/p/DfycpJMnxZv

Lokasi: Bandung. Posisi: Full Time Barista dan Part Time Kitchen.
Gaji: tidak disebutkan di unggahan; tanyakan langsung ke kontak.
Syarat: tidak dirinci di unggahan; kualifikasi disampaikan saat kontak.

Kontak/lamaran: hubungi 082298551593 untuk informasi dan pendaftaran.$sifela$,
  'fnb', 'Bandung', 'shift', NULL, NULL, 'approved',
  'Bandung', 'bandung', -6.9175, 107.6191, 0, 'bulan', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Barista','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'paruhwaktu.co',
  'https://www.instagram.com/p/DfycpJMnxZv'
),
(
  '11111111-1111-4111-8111-111111111109',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Pengajar Robotic Part Time — Ruangguru (MTC Bandung)',
  $sifela$Sumber: Indeed, 28 Nov 2026
https://id.indeed.com/q-part-time-l-bandung-lowongan.html

Perusahaan: Ruangguru. Lokasi: Kota Bandung (MTC).
Gaji: tidak disebutkan di halaman sumber.
Syarat: tidak dirinci di halaman pencarian; lamar melalui Indeed untuk detail seleksi.

Tugas:
- Membimbing siswa dalam robot building, coding, sensor, dan autonomous movement.
- Mendampingi proses testing, calibration, debugging, dan troubleshooting.

Kontak/lamaran: tidak ada nomor publik di sumber. Lamar melalui tautan Indeed di atas.$sifela$,
  'tutor', 'Kota Bandung', 'shift', NULL, NULL, 'approved',
  'Kota Bandung (MTC)', 'bandung', -6.9175, 107.6191, 0, 'jam', 0,
  ARRAY[]::text[], '', '', 1,
  ARRAY['Mengajar','Public Speaking']::text[], 0, 0, false, 0, false,
  'Ruangguru',
  'https://id.indeed.com/q-part-time-l-bandung-lowongan.html'
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

SELECT count(*) AS curated_jobs FROM public.jobs WHERE employer_id = 'ad2c0561-696c-4f74-afb2-e232218e1390';

-- Deskripsi kurasi tidak menampilkan sumber kompetitor. Bagian ini memastikan
-- teks tetap bersih bila file seed historis ini dijalankan ulang.
UPDATE public.jobs
SET description =
  rtrim(regexp_replace(regexp_replace(description, '^Sumber:[^\n]*\n(?:https?://[^\n]*\n)?\n?', ''), '\nKontak/lamaran:[^\n]*$', ''))
  || E'\n\nCara melamar: ajukan lamaran langsung melalui Sifela.'
WHERE description LIKE 'Sumber:%';
