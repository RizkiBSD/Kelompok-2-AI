# 30 Masalah Mahasiswa — Ringkasan Riset (Heka)

Ringkasan riset **10 topik masalah mahasiswa**, masing-masing ditopang **3 sumber**, total **30 sumber**. Tersedia sebagai PDF siap baca.

## Isi Folder

| Berkas | Keterangan |
|---|---|
| `30-Masalah-Mahasiswa-Heka.pdf` | Laporan final, siap baca (A4, 8 halaman). |
| `laporan-30-masalah.html` | Sumber HTML yang dirender menjadi PDF. |
| `sources-30-masalah.json` | 30 sumber lengkap dengan metadata dan pokok temuan. |
| `build-30-masalah.js` | Skrip Node.js yang menyusun HTML dari data sumber. |
| `README.md` | Dokumen ini. |

## 10 Topik

| No | Topik | Klaster |
|---|---|---|
| 1 | Kesulitan mengatur arus kas pribadi | Keuangan |
| 2 | Ketergantungan pada pinjaman online / paylater | Keuangan |
| 3 | Kesulitan membagi waktu kuliah dan kerja paruh waktu | Waktu & kebiasaan |
| 4 | Prokrastinasi atau kebiasaan menunda | Waktu & kebiasaan |
| 5 | Sulit menjaga konsistensi belajar mandiri | Waktu & kebiasaan |
| 6 | Kesulitan memisahkan keuangan pribadi dan usaha | Keuangan |
| 7 | Ketidakstabilan pendapatan sebagai pekerja lepas | Keuangan |
| 8 | Praktik joki tugas dan skripsi | Integritas |
| 9 | Konsistensi belajar mandiri (penguatan) | Waktu & kebiasaan |
| 10 | Ketergantungan berlebihan pada kecerdasan artifisial | Integritas & teknologi |

## Temuan Utama

1. **Akar masalah sering berupa literasi**, bukan kekurangan sumber daya — literasi keuangan untuk topik 1, 2, 6, 7; literasi AI untuk topik 10.
2. **Prokrastinasi, konsistensi belajar, dan work-study conflict berbagi akar yang sama**: lemahnya regulasi diri (*self-regulated learning*).
3. **Teknologi mempercepat masalah**: paylater mempermudah konsumsi impulsif, AI generatif mempermudah *cognitive offloading* yang melemahkan berpikir kritis.
4. **Joki akademik dan ketergantungan AI adalah dua wajah masalah yang sama**: hasil diutamakan di atas proses belajar.

## Cara Membangun Ulang PDF

Prasyarat: Node.js dan Microsoft Edge (atau Chrome).

```bash
# 1. Susun HTML dari data sumber
node build-30-masalah.js

# 2. Render ke PDF
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="30-Masalah-Mahasiswa-Heka.pdf" "laporan-30-masalah.html"
```

## Cara Menambah atau Mengganti Sumber

Semua data berada di `sources-30-masalah.json`. Bentuk tiap entri:

```json
{
  "topik": 1,
  "judul": "...",
  "penulis": "...",
  "tahun": "2025",
  "terbit": "...",
  "url": "https://...",
  "temuan": "Pokok temuan dalam satu sampai dua kalimat."
}
```

Field `topik` menentukan pengelompokan pada tabel sumber. Setelah diubah, jalankan ulang `node build-30-masalah.js`.

## Catatan Metodologis

Riset dilakukan melalui pencarian web dan verifikasi metadata tiap sumber (judul, penulis, tahun, penerbit, URL). Sebagian besar sumber adalah publikasi jurnal dan repositori akademik Indonesia; topik 10 dilengkapi literatur internasional karena kajian ketergantungan AI masih didominasi publikasi luar negeri. Sumber berupa skripsi/preprint belum tentu melewati *peer review*.

Topik 8 (*joki tugas dan skripsi*) dikaji sebagai **fenomena sosial dan pelanggaran integritas akademik**, bukan sebagai panduan praktik.

## Lisensi

Mengikuti lisensi repositori induk (belum ditentukan).
