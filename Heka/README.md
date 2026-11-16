# Heka — Kumpulan Berkas

Folder ini berisi hasil kerja anggota **Heka** untuk Kelompok 2 (Artificial Intelligence).

## Isi Folder

| Folder | Isi |
|---|---|
| `tes-30-topik/` | Ringkasan riset 30 sumber tentang tren kecerdasan artifisial (PDF 8 halaman). |
| `riset-30-masalah-mahasiswa/` | Riset 10 topik masalah mahasiswa, 30 sumber (PDF 8 halaman). |
| `lampiran-screenshot/` | Lampiran bukti screenshot: aktivasi Google AI Plus, ZCode, Antigravity, opencode (PDF 4 halaman). |

## Daftar Berkas PDF

1. **`tes-30-topik/Tes-30-Topik-Heka.pdf`** — 30 sumber, 8 tema (tren industri, arsitektur LLM, RAG, agen, alignment, PEFT, generatif visual, MLOps & regulasi).
2. **`riset-30-masalah-mahasiswa/30-Masalah-Mahasiswa-Heka.pdf`** — 10 topik masalah mahasiswa × 3 sumber = 30 sumber, 3 klaster (keuangan, waktu & kebiasaan, integritas & teknologi).
3. **`lampiran-screenshot/Lampiran-Screenshot-Kelompok2.pdf`** — 4 lampiran screenshot aplikasi dan paket langganan.

## Struktur Tiap Folder Riset

Setiap folder riset bersifat mandiri dan dapat dibangun ulang:

```
<folder>/
├── *.pdf                    # laporan final, siap baca
├── *.html                   # sumber HTML laporan
├── sources*.json            # data sumber + metadata
├── build*.js                # skrip penyusun HTML
└── README.md                # dokumentasi
```

## Cara Membangun Ulang PDF

Prasyarat: Node.js dan Microsoft Edge (atau Chrome).

```bash
node build.js

"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="output.pdf" "laporan.html"
```

## Catatan

- Seluruh laporan disusun dalam Bahasa Indonesia.
- Sumber mencakup jurnal nasional, repositori akademik, arXiv, dan laporan industri.
- Sumber berupa skripsi/preprint belum tentu melewati *peer review*.
