# Tes 30 Topik — Heka

Ringkasan riset dari **30 sumber terpilih** tentang kecerdasan artifisial, dalam format PDF siap baca.

## Isi Folder

| Berkas | Keterangan |
|---|---|
| `Tes-30-Topik-Heka.pdf` | Laporan final, siap baca (A4, ~6 halaman). |
| `laporan.html` | Sumber HTML yang dirender menjadi PDF. |
| `sources.json` | 50 kandidat sumber lengkap dengan metadata dan pokok temuan. |
| `build.js` | Skrip Node.js yang memilih 30 sumber dan merender HTML. |
| `README.md` | Dokumen ini. |

## Ringkasan

Dokumen merangkum 30 sumber ke dalam 8 tema:

1. **Tren & Laporan Industri** — 5 sumber
2. **LLM & Arsitektur** — 5 sumber
3. **RAG & Pengetahuan** — 3 sumber
4. **Agen & Reasoning** — 4 sumber
5. **Alignment & Keamanan** — 3 sumber
6. **PEFT & Efisiensi** — 3 sumber
7. **Generatif Visual** — 3 sumber
8. **MLOps & Regulasi** — 4 sumber

Tiga temuan utama:

- Investasi privat AI melonjak (USD 109,1 M → 285,9 M), tetapi dampak produktivitas masih belum merata.
- Fokus riset bergeser dari "model lebih besar" ke **efisiensi**, **agen**, dan **grounding via RAG**.
- *Alignment* bersifat rapuh terhadap *fine-tuning* lanjutan, dan *EU AI Act* menjadikan kepatuhan sebagai kewajiban hukum.

## Cara Membangun Ulang PDF

Prasyarat: Node.js dan Microsoft Edge (atau Chrome).

```bash
# 1. Hasilkan HTML dari data sumber
node build.js

# 2. Render ke PDF
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="Tes-30-Topik-Heka.pdf" "laporan.html"
```

Mengubah komposisi tema cukup dilakukan pada objek `target` di dalam `build.js`.

## Cara Menambah atau Mengganti Sumber

Semua data sumber berada di `sources.json`. Setiap entri memiliki bentuk:

```json
{
  "no": 1,
  "kategori": "Tren & Laporan Industri",
  "judul": "...",
  "penulis": "...",
  "tahun": "2025",
  "url": "https://...",
  "poin": "Pokok temuan dalam satu sampai dua kalimat."
}
```

Setelah diubah, jalankan ulang `node build.js` lalu render PDF.

## Catatan Metodologis

Riset dilakukan melalui pencarian web dan verifikasi metadata tiap sumber (judul, penulis, tahun, URL). Angka sitasi bersifat indikatif. Sumber berupa *preprint* arXiv belum tentu melewati *peer review*; sumber yang sudah terbit di jurnal (IEEE TNNLS, TMLR, Springer AI & Society, MDPI Electronics) ditandai pada keterangannya.

## Lisensi

Mengikuti lisensi repositori induk (belum ditentukan).
