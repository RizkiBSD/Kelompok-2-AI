-- Bersihkan deskripsi kurasi: hapus jejak sumber, ganti dengan cara melamar di Sifela.
-- Aman dijalankan ulang. source_url tetap tersimpan untuk keperluan internal.
UPDATE public.jobs
SET description =
  rtrim(
    regexp_replace(
      regexp_replace(description, '^Sumber:[^\n]*\n(?:https?://[^\n]*\n)?\n?', ''),
      '\nKontak/lamaran:[^\n]*$', ''
    )
  ) || E'\n\nCara melamar: ' ||
  CASE
    WHEN description LIKE '%0882 1857 6120%' THEN 'Kirim CV melalui WhatsApp 0882 1857 6120.'
    WHEN description LIKE '%082298551593%' THEN 'Hubungi 082298551593 untuk informasi dan pendaftaran.'
    WHEN description LIKE '%srasacoffeespace@gmail.com%' THEN 'Kirim lamaran ke srasacoffeespace@gmail.com.'
    WHEN description LIKE '%081125113578%' THEN 'Hubungi 081125113578 untuk informasi pendaftaran.'
    WHEN description LIKE '%62895365561188%' THEN 'Hubungi +62895365561188 untuk pendaftaran.'
    ELSE 'Ajukan lamaran langsung melalui Sifela.'
  END
WHERE description LIKE 'Sumber:%';

-- 34 lowongan tambahan: 1 Bandung, 5 Semarang, 7 Jakarta, 7 Yogyakarta,
-- 7 Surabaya, 7 Malang. UUID tetap sehingga aman dijalankan ulang.
INSERT INTO public.jobs (
  id, employer_id, title, description, category, location, employment_type,
  salary_min, salary_max, status, area, city, lat, lng, pay, unit, hours,
  work_days, start_time, end_time, slots, skills, rating, reviews, remote,
  views, boosted, company_name, source_url
)
VALUES
-- ============ BANDUNG (+1) ============
(
  '33333333-3333-4333-8333-333333333301',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Guru Matematika SMP — Yayasan Kreasi Edulab Indonesia',
  $sifela$Yayasan Kreasi Edulab Indonesia membuka lowongan Guru Matematika SMP di Kota Bandung (work from office, kontrak).

Gaji: dapat dinegosiasikan.

Syarat:
- S1 Pendidikan Matematika dengan IPK minimal 3,00 (S2 minimal 3,25) dari perguruan tinggi terakreditasi A.
- Menguasai Bahasa Inggris (TOEFL/IELTS) dan familiar dengan Cambridge Curriculum.
- Pengalaman mengajar minimal 1 tahun; usia maksimal 30 tahun.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'tutor', 'Kota Bandung', 'shift', NULL, NULL, 'approved',
  'Bandung', 'bandung', -6.9175, 107.6191, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Mengajar','Komunikasi','Public Speaking']::text[], 0, 0, false, 0, false,
  'Yayasan Kreasi Edulab Indonesia',
  'https://kitalulus.com/lowongan/detail/guru-matematika-smp-2yeg'
),

-- ============ SEMARANG (+5) ============
(
  '33333333-3333-4333-8333-333333333302',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Kasir — Embun Senja Cafe & Pool',
  $sifela$Embun Senja Cafe & Pool mencari Kasir di Kota Semarang. Jadwal Senin–Sabtu, 08.00–17.00.

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, perempuan, usia maksimal 25 tahun.
- Tanpa pengalaman kerja pun boleh melamar.
- Supel, tangguh, mudah bekerja sama, dan bersedia pulang malam.
- Menguasai sistem kasir.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'fnb', 'Kota Semarang', 'shift', NULL, NULL, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '08:00', '17:00', 1,
  ARRAY['Kasir','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Embun Senja Cafe & Pool',
  'https://kitalulus.com/lowongan/detail/kasir-ipkn'
),
(
  '33333333-3333-4333-8333-333333333303',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Admin Online — CV Mac Mohan Mode',
  $sifela$CV Mac Mohan Mode membuka lowongan Admin Online di Kota Semarang (work from office, penuh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia maksimal 30 tahun.
- Tanpa pengalaman diperbolehkan; pengalaman admin online menjadi nilai tambah.
- Komunikatif, teliti, dan menguasai TikTok Shop, Instagram, serta WhatsApp.
- Mampu mencapai target yang ditentukan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Semarang', 'shift', NULL, NULL, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Administrasi','Data Entry','TikTok','Instagram','Komunikasi']::text[], 0, 0, false, 0, false,
  'CV Mac Mohan Mode',
  'https://kitalulus.com/lowongan/detail/admin-online-99ai'
),
(
  '33333333-3333-4333-8333-333333333304',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Guru BK — SMP Islam Tunas Harapan Semarang',
  $sifela$SMP Islam Tunas Harapan Semarang membuka lowongan Guru Bimbingan dan Konseling.

Gaji: dapat dinegosiasikan.

Syarat:
- S1 Bimbingan dan Konseling.
- Mampu baca tulis Al-Qur'an; usia maksimal 35 tahun.
- Menguasai Microsoft Office.
- Lampirkan CV, KTP, KK, ijazah, transkrip, dan pas foto 4×6.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'tutor', 'Kota Semarang', 'shift', NULL, NULL, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Mengajar','Komunikasi','Administrasi']::text[], 0, 0, false, 0, false,
  'SMP Islam Tunas Harapan SMG',
  'https://kitalulus.com/lowongan/detail/guru-bk-kayx'
),
(
  '33333333-3333-4333-8333-333333333305',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Shopkeeper — PT IPS Sukses Group',
  $sifela$PT IPS Sukses Group mencari Shopkeeper di Kota Semarang (kontrak). Benefit: BPJS, THR, dan cuti tahunan.

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, usia maksimal 30 tahun.
- Pengalaman kerja minimal 1 tahun.
- Paham produk iPhone/Apple dan aksesoris.
- Komunikatif, mampu mencapai target penjualan, dan mengelola administrasi stok.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'retail', 'Kota Semarang', 'shift', NULL, NULL, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Pelayanan Pelanggan','Manajemen Stok','Komunikasi','Negosiasi']::text[], 0, 0, false, 0, false,
  'PT IPS Sukses Group',
  'https://kitalulus.com/lowongan/detail/shopkeeper-7wiy'
),
(
  '33333333-3333-4333-8333-333333333306',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Customer Service Advisor — CV Angkasa Mandiri Trading',
  $sifela$CV Angkasa Mandiri Trading (AMT) mencari Customer Service Advisor di Kota Semarang (penuh waktu).

Gaji: Rp2.600.000–Rp2.800.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, perempuan belum menikah, usia maksimal 25 tahun.
- Pengalaman kerja minimal 1 tahun, terbiasa menangani keluhan pelanggan.
- Kreatif, komunikatif, cekatan, dan tidak sedang kuliah.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Semarang', 'shift', 2600000, 2800000, 'approved',
  'Semarang', 'semarang', -6.9666, 110.4167, 2600000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Pelayanan Pelanggan','Komunikasi','Negosiasi']::text[], 0, 0, false, 0, false,
  'CV Angkasa Mandiri Trading',
  'https://kitalulus.com/lowongan/detail/customer-service-advisor-kopm'
),

-- ============ JAKARTA (+7) ============
(
  '33333333-3333-4333-8333-333333333307',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Staff Gudang — PT Satelit Komunika Nusantara',
  $sifela$PT Satelit Komunika Nusantara (Unistar Cellular) mencari Staff Gudang di Kalideres, Jakarta Barat. Benefit: BPJS, THR, dan lembur.

Gaji: Rp5.730.000–Rp5.900.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, laki-laki usia maksimal 27 tahun.
- Tanpa pengalaman diperbolehkan.
- SIM A aktif dan mampu mengendarai Grandmax/Luxio; memiliki motor dan SIM C aktif.
- Siap lembur dan tidak sedang kuliah.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'logistik', 'Kalideres, Jakarta Barat', 'shift', 5730000, 5900000, 'approved',
  'Jakarta Barat', 'jakarta', -6.2088, 106.8456, 5730000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 2,
  ARRAY['Manajemen Stok','Administrasi','Pengiriman']::text[], 0, 0, false, 0, false,
  'PT Satelit Komunika Nusantara',
  'https://kitalulus.com/lowongan/detail/staff-gudang-5wia'
),
(
  '33333333-3333-4333-8333-333333333308',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Host Live Streaming — PT Shania Fernando Commercial',
  $sifela$PT Shania Fernando Commercial (SNF Group) mencari Host Live Streaming di Jakarta Selatan. Fokus jualan fashion wanita melalui TikTok Shop. Benefit: THR dan bonus.

Gaji: Rp3.500.000–Rp6.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, usia maksimal 35 tahun.
- Tanpa pengalaman diperbolehkan; komitmen dan konsistensi menjadi nilai utama.
- Komunikatif dan fokus pada penjualan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'konten', 'Jakarta Selatan', 'shift', 3500000, 6000000, 'approved',
  'Jakarta Selatan', 'jakarta', -6.2088, 106.8456, 3500000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 2,
  ARRAY['TikTok','Komunikasi','Public Speaking','Negosiasi']::text[], 0, 0, false, 0, false,
  'PT Shania Fernando Commercial',
  'https://kitalulus.com/lowongan/detail/host-live-streaming-zfsl'
),
(
  '33333333-3333-4333-8333-333333333309',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Staf Penagihan / Collection — PT Future Komputer Indonesia',
  $sifela$PT Future Komputer Indonesia membuka lowongan Staf Penagihan (Collection) di Jakarta Barat dengan sistem kontrak. Benefit: BPJS.

Gaji: Rp4.200.000–Rp5.730.000 per bulan.

Syarat:
- Pendidikan S1, laki-laki.
- Pengalaman minimal 1 tahun di bidang collection.
- Berpengalaman menangani DPD 30+ dan negosiasi nasabah melalui telepon/WhatsApp.
- Pengalaman di industri finance lebih diutamakan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Jakarta Barat', 'shift', 4200000, 5730000, 'approved',
  'Jakarta Barat', 'jakarta', -6.2088, 106.8456, 4200000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Administrasi','Negosiasi','Komunikasi']::text[], 0, 0, false, 0, false,
  'PT Future Komputer Indonesia',
  'https://kitalulus.com/lowongan/detail/staf-penagihan-collection-20hr'
),
(
  '33333333-3333-4333-8333-333333333310',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Content Creator Specialist — WD Computer',
  $sifela$WD Computer mencari Content Creator Specialist di Jakarta Pusat (penuh waktu). Benefit: THR dan cuti.

Gaji: Rp2.500.000–Rp5.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, usia 18–28 tahun.
- Pengalaman minimum 1 tahun dan kreatif, nyaman di depan kamera.
- Paham tren TikTok, Instagram Reels, dan YouTube Shorts.
- Menguasai CapCut, VN, atau Adobe Premiere serta dasar foto dan videografi.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'konten', 'Jakarta Pusat', 'shift', 2500000, 5000000, 'approved',
  'Jakarta Pusat', 'jakarta', -6.2088, 106.8456, 2500000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Content Planning','Video Editing','TikTok','Instagram','Fotografi']::text[], 0, 0, false, 0, false,
  'WD Computer',
  'https://kitalulus.com/lowongan/detail/content-creator-ceub'
),
(
  '33333333-3333-4333-8333-333333333311',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Rider Sejuta JIWA — Jiwa Group',
  $sifela$Jiwa Group membuka lowongan Rider Sejuta JIWA untuk area Jakarta, Tangerang, dan Bekasi. Penempatan di Jakarta Pusat dengan sistem lapangan. Benefit: BPJS.

Gaji: Rp2.800.000–Rp10.000.000 per bulan.

Syarat:
- Pendidikan SMP/MTS, tanpa pengalaman kerja.
- Bersedia berjualan mobile Kopi Sejuta Jiwa menggunakan cart.
- Komunikatif dan mampu mencapai target harian/bulanan.
- Menjaga stok dan setoran dengan amanah.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'logistik', 'Jakarta Pusat (fieldwork)', 'shift', 2800000, 10000000, 'approved',
  'Jakarta Pusat', 'jakarta', -6.2088, 106.8456, 2800000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 5,
  ARRAY['Pengiriman','Komunikasi','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Jiwa Group',
  'https://kitalulus.com/lowongan/detail/rider-sejuta-jiwa-area-jakarta-tangerang-dan-beka-v0um'
),
(
  '33333333-3333-4333-8333-333333333312',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Junior Barista — Kopi Tetangga Sebelah',
  $sifela$Kopi Tetangga Sebelah mencari Junior Barista untuk penempatan di Pluit, Grogol, Jelambar, Teluk Gong, dan Kedoya (Jakarta Barat).

Gaji: Rp2.000.000–Rp2.700.000 per bulan.

Syarat:
- Pendidikan minimal SMA/SMK, usia maksimal 25 tahun, belum menikah.
- Tanpa pengalaman diperbolehkan; pengalaman sebelumnya menjadi nilai tambah.
- Tidak alergi kopi atau durian.
- Siap bekerja shift pada akhir pekan dan tanggal merah, 6 hari per minggu.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'fnb', 'Pluit, Jakarta Barat', 'shift', 2000000, 2700000, 'approved',
  'Jakarta Barat', 'jakarta', -6.2088, 106.8456, 2000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 2,
  ARRAY['Barista','Kasir','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'Kopi Tetangga Sebelah',
  'https://kitalulus.com/lowongan/detail/junior-barista-kopi-tetangga-sebelah-adho'
),
(
  '33333333-3333-4333-8333-333333333313',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Guru Bahasa Inggris — PT Cipta Anak Cerdas Indonesia',
  $sifela$PT Cipta Anak Cerdas Indonesia mencari Guru Bahasa Inggris di Cibubur dan Pulogebang, Jakarta Timur. Benefit: BPJS, THR, dan bonus.

Gaji: Rp2.000.000–Rp2.500.000 per bulan.

Syarat:
- S1 Pendidikan Bahasa Inggris, perempuan usia 23–35 tahun.
- Pengalaman mengajar minimal 1 tahun; fresh graduate diperbolehkan.
- Aktif berbahasa Inggris dan komunikatif.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'tutor', 'Cibubur, Jakarta Timur', 'shift', 2000000, 2500000, 'approved',
  'Jakarta Timur', 'jakarta', -6.2088, 106.8456, 2000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 2,
  ARRAY['Mengajar','Komunikasi','Public Speaking']::text[], 0, 0, false, 0, false,
  'PT Cipta Anak Cerdas Indonesia',
  'https://kitalulus.com/lowongan/detail/guru-bahasa-inggris-phm1'
),

-- ============ YOGYAKARTA (+7) ============
(
  '33333333-3333-4333-8333-333333333314',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Asisten Sales Ritel — CV Sumber Air',
  $sifela$CV Sumber Air membuka lowongan Asisten Sales Ritel di Kota Yogyakarta (penuh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK dengan pengalaman minimal 1 tahun.
- Mampu melayani pelanggan, menata stok, dan membuat laporan penjualan harian.
- Bersedia menangani keluhan pelanggan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'retail', 'Kota Yogyakarta', 'shift', NULL, NULL, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Pelayanan Pelanggan','Manajemen Stok','Komunikasi']::text[], 0, 0, false, 0, false,
  'CV SUMBER AIR',
  'https://kitalulus.com/lowongan/detail/asisten-sales-ritel-vl8i'
),
(
  '33333333-3333-4333-8333-333333333315',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Freelance Social Media & Graphic Designer — Pamella Supermarket',
  $sifela$Pamella Supermarket membuka proyek freelance Social Media & Graphic Designer di Kota Yogyakarta.

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK; D3/S1 bidang terkait lebih diutamakan.
- Tanpa pengalaman diperbolehkan; pengalaman menjadi nilai tambah.
- Komunikatif, teliti, tepat waktu, dan menguasai komputer serta aplikasi desain.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'kreatif', 'Kota Yogyakarta', 'freelance', NULL, NULL, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'proyek', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Desain Grafis','Canva','Instagram','Copywriting']::text[], 0, 0, false, 0, false,
  'Pamella Supermarket',
  'https://kitalulus.com/lowongan/detail/freelance-social-media-graphic-designer-faa5'
),
(
  '33333333-3333-4333-8333-333333333316',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Data Entry / Cost Control — PT Jogja Kulina Utama',
  $sifela$PT Jogja Kulina Utama mencari Data Entry / Cost Control di Kota Yogyakarta. Benefit: BPJS, THR, bonus, dan makan/snack.

Gaji: dapat dinegosiasikan.

Syarat:
- D3/S1 Ekonomi atau Akuntansi, usia maksimal 27 tahun.
- Pengalaman kerja minimal 1 tahun.
- Mampu input dan validasi data, backup data, serta membuat laporan inventory.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Yogyakarta', 'shift', NULL, NULL, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Data Entry','Microsoft Excel','Administrasi']::text[], 0, 0, false, 0, false,
  'PT Jogja Kulina Utama',
  'https://kitalulus.com/lowongan/detail/data-entry-cost-control-pagd'
),
(
  '33333333-3333-4333-8333-333333333317',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Retail Assistant — Arei Outdoorgear',
  $sifela$Arei Outdoorgear mencari Retail Assistant di Kota Yogyakarta dengan sistem shift dan tanggal merah. Benefit: bonus kinerja.

Gaji: Rp2.800.000–Rp3.300.000 per bulan.

Syarat:
- SMA/SMK semua jurusan, laki-laki.
- Tanpa pengalaman diperbolehkan; pengalaman SPG menjadi nilai tambah.
- Komunikatif, memiliki kemampuan sales/marketing, mampu menata display, dan mencapai target toko.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'retail', 'Kota Yogyakarta', 'shift', 2800000, 3300000, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 2800000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 2,
  ARRAY['Pelayanan Pelanggan','Komunikasi','Negosiasi','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'Arei Outdoorgear',
  'https://kitalulus.com/lowongan/detail/retail-assistant-ah7i'
),
(
  '33333333-3333-4333-8333-333333333318',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Kasir — Nasyi.id',
  $sifela$Nasyi.id mencari Kasir di Kota Yogyakarta (penuh waktu). Benefit: transport dan lembur.

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia 18–30 tahun.
- Tanpa pengalaman diperbolehkan.
- Komunikatif, disiplin, jujur, pekerja keras, dan tertarik di bidang F&B.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'fnb', 'Kota Yogyakarta', 'shift', NULL, NULL, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Kasir','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Nasyi.id',
  'https://kitalulus.com/lowongan/detail/kasir-bs6i'
),
(
  '33333333-3333-4333-8333-333333333319',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Junior Recruiter — KitaLulus Yogyakarta',
  $sifela$Tim rekrutmen KitaLulus di Yogyakarta membuka lowongan Junior Recruiter dengan sistem kontrak. Benefit: BPJS, transport, dan cuti.

Gaji: Rp3.000.000–Rp4.000.000 per bulan.

Syarat:
- Pendidikan S1 dengan pengalaman minimal 1 tahun.
- Bahasa Inggris aktif.
- Mampu sourcing kandidat melalui LinkedIn dan database, screening, interview awal, serta pipeline management.
- Bersedia melakukan riset industri.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Yogyakarta', 'shift', 3000000, 4000000, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 3000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Administrasi','Komunikasi','Riset','Negosiasi']::text[], 0, 0, false, 0, false,
  'KitaLulus',
  'https://kitalulus.com/lowongan/detail/junior-recruiter-jogja-nxl2'
),
(
  '33333333-3333-4333-8333-333333333320',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Telemarketing — PT Mitra Pelita Terangi Bangsa',
  $sifela$PT Mitra Pelita Terangi Bangsa Yogyakarta membuka lowongan Telemarketing. Benefit: BPJS dan bonus.

Gaji: Rp2.800.000–Rp2.827.593 per bulan.

Syarat:
- Pendidikan SMA/SMK dengan pengalaman minimal 1 tahun.
- Komunikatif dan persuasif melalui telepon.
- Mampu memperbarui data pelanggan di sistem CRM dan mencapai target harian, mingguan, dan bulanan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Yogyakarta', 'shift', 2800000, 2827593, 'approved',
  'Yogyakarta', 'yogyakarta', -7.7956, 110.3695, 2800000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 2,
  ARRAY['Komunikasi','Negosiasi','Pelayanan Pelanggan','Data Entry']::text[], 0, 0, false, 0, false,
  'PT Mitra Pelita Terangi Bangsa Yogyakarta',
  'https://kitalulus.com/lowongan/detail/telemarketing-mnqr'
),

-- ============ SURABAYA (+7) ============
(
  '33333333-3333-4333-8333-333333333321',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Staff Gudang — Bursa Kacamata',
  $sifela$Bursa Kacamata mencari Staff Gudang di Kota Surabaya (penuh waktu). Benefit: bonus kinerja.

Gaji: Rp1.800.000–Rp2.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia maksimal 24 tahun.
- Pengalaman kerja minimal 1 tahun.
- Mampu menata barang, stock opname, mengelola barang keluar-masuk, dan packing.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'logistik', 'Kota Surabaya', 'shift', 1800000, 2000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 1800000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Manajemen Stok','Administrasi']::text[], 0, 0, false, 0, false,
  'Bursa Kacamata',
  'https://kitalulus.com/lowongan/detail/staff-gudang-bursakacamata-2irf'
),
(
  '33333333-3333-4333-8333-333333333322',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Kurir J&T Express — PT Tatur Utama Sejati',
  $sifela$PT Tatur Utama Sejati membuka lowongan Kurir J&T Express di Kota Surabaya. Benefit: BPJS dan bonus.

Gaji: Rp2.000.000–Rp5.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, tanpa pengalaman kerja.
- Memiliki motor pribadi dan SIM C aktif.
- Memiliki Android dengan RAM minimal 3 GB.
- Jujur dan amanah dalam uang COD serta paham area penempatan di Jawa Timur.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'logistik', 'Kota Surabaya (fieldwork)', 'shift', 2000000, 5000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 2000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 3,
  ARRAY['Pengiriman','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'PT Tatur Utama Sejati',
  'https://kitalulus.com/lowongan/detail/kurir-jt-express-surabaya-w0ux'
),
(
  '33333333-3333-4333-8333-333333333323',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Administrasi Penjualan Butik — CV Mitra Mulia Texindo',
  $sifela$CV Mitra Mulia Texindo (Aramina, Jl. Raya Tenggilis 42) mencari Administrasi Penjualan Butik di Kota Surabaya. Benefit: bonus kinerja.

Gaji: Rp2.500.000–Rp3.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia maksimal 30 tahun.
- Pengalaman kerja minimal 1 tahun dan teliti.
- Mampu memproses data penjualan, faktur, dan surat jalan.
- Menguasai Microsoft Office serta mendukung penjualan live dan offline.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Tenggilis, Surabaya', 'shift', 2500000, 3000000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 2500000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Administrasi','Microsoft Excel','Data Entry']::text[], 0, 0, false, 0, false,
  'CV. Mitra Mulia Texindo',
  'https://kitalulus.com/lowongan/detail/administrasi-penjualan-butik-ev4i'
),
(
  '33333333-3333-4333-8333-333333333324',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Tutor Bahasa Indonesia — BRITS Indonesia Surabaya',
  $sifela$BRITS Indonesia Surabaya membuka lowongan Tutor Bahasa Indonesia.

Gaji: dapat dinegosiasikan.

Syarat:
- Semua jenjang pendidikan dan jurusan diperbolehkan, tanpa pengalaman kerja.
- Mampu mendesain dan mengedit video serta memahami social media specialist.
- Energik, kreatif, komunikatif, dan berdomisili di Surabaya.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'tutor', 'Kota Surabaya', 'shift', NULL, NULL, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 2,
  ARRAY['Mengajar','Video Editing','Komunikasi','TikTok']::text[], 0, 0, false, 0, false,
  'BRITS Indonesia Surabaya',
  'https://kitalulus.com/lowongan/detail/tutor-bahasa-indonesia-ywgj'
),
(
  '33333333-3333-4333-8333-333333333325',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Customer Care Sosial Media — YAMAHA YES',
  $sifela$YAMAHA YES mencari Customer Care Sosial Media di Kota Surabaya (penuh waktu).

Gaji: Rp3.000.000–Rp4.500.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia maksimal 35 tahun.
- Pengalaman kerja minimal 1 tahun.
- Paham pemasaran digital, TikTok Live Streaming, dan strategi konten.
- Cepat belajar dan fleksibel.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'konten', 'Kota Surabaya', 'shift', 3000000, 4500000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 3000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['TikTok','Content Planning','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'YAMAHA YES',
  'https://kitalulus.com/lowongan/detail/customer-care-sosial-media-oodh'
),
(
  '33333333-3333-4333-8333-333333333326',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Marketplace Specialist — PT Inti Medicom Retailindo',
  $sifela$PT Inti Medicom Retailindo mencari Marketplace Specialist di Kota Surabaya. Benefit: BPJS, THR, dan bonus.

Gaji: Rp3.000.000–Rp3.500.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, perempuan usia maksimal 30 tahun.
- Pengalaman minimal 1 tahun di marketplace dan paham regulasinya.
- Menguasai Excel dan Google Sheets.
- Mampu menangani keluhan pelanggan melalui WhatsApp.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Surabaya', 'shift', 3000000, 3500000, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 3000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Administrasi','Microsoft Excel','Data Entry','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'PT Inti Medicom Retailindo',
  'https://kitalulus.com/lowongan/detail/market-place-specialist-tsh3'
),
(
  '33333333-3333-4333-8333-333333333327',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Front Desk Agent — Hotel Santika Premiere Gubeng',
  $sifela$Hotel Santika Premiere Gubeng membuka lowongan Front Desk Agent di Kota Surabaya (penuh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan D3/S1 relevan.
- Pengalaman minimal 2 tahun pada posisi serupa.
- Penampilan profesional serta kemampuan interpersonal dan komunikasi dalam Bahasa Inggris.
- Sikap kerja positif.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Gubeng, Surabaya', 'shift', NULL, NULL, 'approved',
  'Surabaya', 'surabaya', -7.2575, 112.7521, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Pelayanan Pelanggan','Komunikasi','Administrasi']::text[], 0, 0, false, 0, false,
  'Hotel Santika Premiere Gubeng',
  'https://kitalulus.com/lowongan/detail/front-desk-agent-jf5s'
),

-- ============ MALANG (+7) ============
(
  '33333333-3333-4333-8333-333333333328',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Kasir — Komune Coffee & Space',
  $sifela$Komune Coffee & Space mencari Kasir di Kota Malang dengan sistem shift.

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMK/S1 pariwisata atau komunikasi.
- Tanpa pengalaman diperbolehkan; pengalaman kasir F&B menjadi nilai tambah.
- Rapi, ramah, komunikatif, dan mampu mengoperasikan POS.
- Siap bekerja akhir pekan dan hari libur serta bekerja sama dalam tim.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'fnb', 'Kota Malang', 'shift', NULL, NULL, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab','min']::text[], '', '', 1,
  ARRAY['Kasir','Pelayanan Pelanggan','Komunikasi']::text[], 0, 0, false, 0, false,
  'Komune Coffee & Space',
  'https://kitalulus.com/lowongan/detail/kasir-y3vm'
),
(
  '33333333-3333-4333-8333-333333333329',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Administrasi Kantor — Kulagoods Coffeeshop',
  $sifela$Kulagoods Coffeeshop membuka lowongan Administrasi Kantor di Kota Malang (paruh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, tanpa pengalaman kerja.
- Paham POS Majoo serta dasar Word, Excel, dan Canva.
- Teliti dalam laporan harian dan rekap stok gudang.
- Paham Instagram/TikTok dan mampu menyusun jadwal shift crew.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Malang', 'shift', NULL, NULL, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Administrasi','Data Entry','Canva','Microsoft Excel','Instagram']::text[], 0, 0, false, 0, false,
  'Kulagoods Coffeeshop',
  'https://kitalulus.com/lowongan/detail/administrasi-kantor-ntjn'
),
(
  '33333333-3333-4333-8333-333333333330',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Content Creator — Chikuma Id',
  $sifela$Chikuma Id mencari Content Creator di Kota Malang (hybrid, penuh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, usia maksimal 30 tahun, tanpa pengalaman kerja.
- Kreatif dengan ide segar; nyaman di depan kamera menjadi nilai tambah.
- Paham tren TikTok dan Instagram, storytelling/script, shooting, dan editing.
- Bersedia mengevaluasi performa konten.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'konten', 'Kota Malang (hybrid)', 'shift', NULL, NULL, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Content Planning','Video Editing','TikTok','Instagram','Copywriting']::text[], 0, 0, true, 0, false,
  'Chikuma Id',
  'https://kitalulus.com/lowongan/detail/content-creator-whfy'
),
(
  '33333333-3333-4333-8333-333333333331',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Teknisi Jaringan Internet — GriyaNet Indonesia',
  $sifela$GriyaNet Indonesia membuka lowongan Teknisi Jaringan Internet di Kota Malang (lapangan). Benefit: BPJS, THR, dan lembur.

Gaji: Rp2.600.000–Rp3.000.000 per bulan.

Syarat:
- SMK TKJ atau bidang relevan, laki-laki usia maksimal 30 tahun.
- Pengalaman 1–2 tahun di ISP dan paham FTTH.
- SIM C aktif serta memiliki motor.
- Rapi, tahan tekanan, dan menjaga hubungan baik dengan pelanggan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'teknologi', 'Kota Malang (fieldwork)', 'shift', 2600000, 3000000, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 2600000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 1,
  ARRAY['Coding','Komunikasi','Pelayanan Pelanggan']::text[], 0, 0, false, 0, false,
  'GriyaNet Indonesia',
  'https://kitalulus.com/lowongan/detail/teknisi-jaringan-internet-s8rq'
),
(
  '33333333-3333-4333-8333-333333333332',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Kurir J&T Express — PT Mahakam Kencana Intan Padi',
  $sifela$PT Mahakam Kencana Intan Padi membuka lowongan Kurir J&T Express di Kota Malang. Benefit: BPJS dan insentif.

Gaji: Rp2.500.000–Rp5.000.000 per bulan.

Syarat:
- Pendidikan SMP/MTS, laki-laki usia 19–45 tahun.
- Memiliki kendaraan sendiri dan Android dengan RAM minimal 3 GB.
- Jujur, ramah, dan amanah.
- Paham area pengiriman serta mampu menyusun rute.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'logistik', 'Kota Malang (hybrid)', 'shift', 2500000, 5000000, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 2500000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 3,
  ARRAY['Pengiriman','Manajemen Stok']::text[], 0, 0, true, 0, false,
  'PT Mahakam Kencana Intan Padi',
  'https://kitalulus.com/lowongan/detail/kurir-jt-express-malang-kpwc'
),
(
  '33333333-3333-4333-8333-333333333333',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'SPG Reguler Tentang Anak — PT Indolima Perkasa',
  $sifela$PT Indolima Perkasa (Indonesia5 Communication) mencari SPG Reguler Tentang Anak di Kota Malang dengan sistem kontrak. Benefit: BPJS dan bonus.

Gaji: Rp2.000.000–Rp5.000.000 per bulan.

Syarat:
- Pendidikan SMA/SMK, usia maksimal 28 tahun.
- Pengalaman kerja minimal 2 tahun.
- Mampu mempromosikan produk, memberi informasi, dan mendorong penjualan.
- Menjaga display dan stok serta membuat laporan.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'retail', 'Kota Malang (fieldwork)', 'shift', 2000000, 5000000, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 2000000, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum','sab']::text[], '', '', 2,
  ARRAY['Pelayanan Pelanggan','Komunikasi','Negosiasi','Manajemen Stok']::text[], 0, 0, false, 0, false,
  'PT Indolima Perkasa',
  'https://kitalulus.com/lowongan/detail/spg-reguler-tentang-anak-malang-0kwa'
),
(
  '33333333-3333-4333-8333-333333333334',
  'ad2c0561-696c-4f74-afb2-e232218e1390',
  'Office Boy / OB — Koinos Community',
  $sifela$Koinos Community membuka lowongan Office Boy/OB di Kota Malang (penuh waktu).

Gaji: dapat dinegosiasikan.

Syarat:
- Pendidikan SMA/SMK, perempuan, tanpa pengalaman kerja.
- Menjaga kebersihan dan kerapian area kerja.
- Membantu kebutuhan operasional dan mengarahkan pelanggan.
- Bersedia bekerja sama dalam tim.

Cara melamar: ajukan lamaran langsung melalui Sifela.$sifela$,
  'admin', 'Kota Malang', 'shift', NULL, NULL, 'approved',
  'Malang', 'malang', -7.9666, 112.6326, 0, 'bulan', 0,
  ARRAY['sen','sel','rab','kam','jum']::text[], '', '', 1,
  ARRAY['Administrasi','Komunikasi']::text[], 0, 0, false, 0, false,
  'Koinos Community',
  'https://kitalulus.com/lowongan/detail/office-boy-ob-iphs'
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
  source_url = EXCLUDED.source_url;

-- Verifikasi cepat: jumlah lowongan per kota.
SELECT city, count(*) AS total
FROM public.jobs
WHERE status = 'approved'
GROUP BY city
ORDER BY city;
