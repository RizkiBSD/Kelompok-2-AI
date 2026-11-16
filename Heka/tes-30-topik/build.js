const fs = require('fs');
const path = require('path');

const sources = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json'), 'utf8'));

// ---- pick exactly 30 sources: proportional spread across categories ----
const byCat = {};
for (const s of sources) (byCat[s.kategori] ||= []).push(s);

// target distribution across the 8 categories -> 30 sources
const target = {
  'Tren & Laporan Industri': 5,
  'LLM & Arsitektur': 5,
  'RAG & Pengetahuan': 3,
  'Agen & Reasoning': 4,
  'Alignment & Keamanan': 3,
  'PEFT & Efisiensi': 3,
  'Generatif Visual': 3,
  'MLOps & Regulasi': 4,
};

let selected = [];
for (const [cat, n] of Object.entries(target)) {
  const pool = byCat[cat] || [];
  selected.push(...pool.slice(0, n));
}
// safety: if short, top up from leftovers not already chosen
if (selected.length < 30) {
  const chosen = new Set(selected.map(s => s.no));
  for (const s of sources) {
    if (selected.length >= 30) break;
    if (!chosen.has(s.no)) { selected.push(s); chosen.add(s.no); }
  }
}
selected = selected.slice(0, 30);
// order by category flow, keeping original numbering inside category
const catOrder = Object.keys(target);
selected.sort((a, b) => {
  const c = catOrder.indexOf(a.kategori) - catOrder.indexOf(b.kategori);
  return c !== 0 ? c : a.no - b.no;
});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toISOString().slice(0, 10);

// group for the category summary table
const countByCat = {};
for (const s of selected) countByCat[s.kategori] = (countByCat[s.kategori] || 0) + 1;

const rows = selected.map((s, i) => `
  <tr>
    <td class="num">${i + 1}</td>
    <td>
      <div class="src-title">${esc(s.judul)}</div>
      <div class="src-meta">${esc(s.penulis)} &middot; ${esc(s.tahun)} &middot; <span class="cat">${esc(s.kategori)}</span></div>
      <div class="src-point">${esc(s.poin)}</div>
      <div class="src-url">${esc(s.url)}</div>
    </td>
  </tr>`).join('');

const catRows = Object.entries(countByCat).map(([c, n]) =>
  `<tr><td>${esc(c)}</td><td class="num">${n}</td></tr>`).join('');

const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8">
<title>Tes 30 Topik - Ringkasan Riset</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Calibri, Arial, sans-serif; color: #1a1a1a; font-size: 10.5pt; line-height: 1.5; margin: 0; }
  h1 { font-size: 21pt; margin: 0 0 4px; color: #0b3d69; letter-spacing: -0.3px; }
  .sub { font-size: 11pt; color: #4a5b6b; margin-bottom: 18px; }
  h2 { font-size: 13pt; color: #0b3d69; margin: 22px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #d6e2ee; }
  h2:first-of-type { margin-top: 6px; }
  p { margin: 0 0 9px; text-align: justify; }
  .cover-meta { border: 1px solid #d6e2ee; border-left: 4px solid #0b3d69; background: #f7fafd; padding: 12px 16px; margin: 16px 0 6px; font-size: 9.5pt; }
  .cover-meta table { border: none; width: 100%; }
  .cover-meta td { border: none; padding: 2px 0; vertical-align: top; }
  .cover-meta td:first-child { width: 130px; color: #5a6b7b; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
  th, td { border: 1px solid #dde5ee; padding: 6px 8px; vertical-align: top; }
  th { background: #eef4fa; text-align: left; font-size: 9.5pt; color: #0b3d69; }
  td.num, th.num { text-align: center; width: 34px; font-variant-numeric: tabular-nums; }
  .src-title { font-weight: 600; color: #10263a; }
  .src-meta { font-size: 8.8pt; color: #6a7b8b; margin: 1px 0 3px; }
  .src-meta .cat { background: #eaf2fa; color: #1f5f96; padding: 1px 5px; border-radius: 3px; font-size: 8.4pt; }
  .src-point { font-size: 9.6pt; }
  .src-url { font-size: 8.2pt; color: #2e6da4; word-break: break-all; margin-top: 2px; }
  .kpi { display: flex; gap: 10px; margin: 12px 0 4px; }
  .kpi div { flex: 1; border: 1px solid #d6e2ee; border-top: 3px solid #0b3d69; background: #fafcfe; padding: 8px 10px; text-align: center; }
  .kpi .v { font-size: 15pt; font-weight: 700; color: #0b3d69; display: block; }
  .kpi .l { font-size: 8.4pt; color: #5a6b7b; }
  ul { margin: 4px 0 10px; padding-left: 20px; }
  li { margin-bottom: 4px; text-align: justify; }
  .note { background: #fffbf0; border: 1px solid #f0dfb0; border-left: 4px solid #d9a520; padding: 9px 13px; font-size: 9.5pt; margin: 12px 0; }
  .foot { margin-top: 18px; padding-top: 8px; border-top: 1px solid #d6e2ee; font-size: 8.5pt; color: #7a8b9b; text-align: center; }
  .pb { page-break-before: always; }
  .avoid { page-break-inside: avoid; }
</style></head><body>

<h1>Tes 30 Topik</h1>
<div class="sub">Ringkasan Riset dari 30 Sumber Terpilih &mdash; Kecerdasan Artifisial</div>

<div class="cover-meta">
  <table>
    <tr><td>Kelompok</td><td><strong>Kelompok 2 &mdash; Artificial Intelligence</strong></td></tr>
    <tr><td>Penanggung jawab</td><td>Heka</td></tr>
    <tr><td>Repositori</td><td>github.com/RizkiBSD/Kelompok-2-AI</td></tr>
    <tr><td>Lokasi berkas</td><td>Heka/tes-30-topik/</td></tr>
    <tr><td>Jumlah sumber</td><td>30 sumber (dari 50 kandidat yang disaring)</td></tr>
    <tr><td>Tanggal disusun</td><td>${today}</td></tr>
  </table>
</div>

<h2>1. Ringkasan Eksekutif</h2>
<p>Dokumen ini merangkum 30 sumber terpilih mengenai lanskap kecerdasan artifisial, mulai dari laporan industri berskala besar hingga tinjauan akademik (<em>survey</em>) yang paling banyak dikutip. Sumber disaring dari 50 kandidat dan dikelompokkan ke dalam delapan tema yang saling terkait: tren dan laporan industri, arsitektur LLM, <em>Retrieval-Augmented Generation</em> (RAG), agen dan penalaran, <em>alignment</em> dan keamanan, <em>Parameter-Efficient Fine-Tuning</em> (PEFT), model generatif visual, serta MLOps dan regulasi.</p>

<div class="kpi">
  <div><span class="v">30</span><span class="l">Sumber terpilih</span></div>
  <div><span class="v">8</span><span class="l">Tema utama</span></div>
  <div><span class="v">2022&ndash;2026</span><span class="l">Rentang publikasi</span></div>
  <div><span class="v">9.300+</span><span class="l">Sitasi sumber teratas</span></div>
</div>

<p>Temuan utamanya: bidang ini telah bergerak dari sekadar &ldquo;model bahasa yang besar&rdquo; menuju <strong>sistem yang bertindak</strong>. Tiga pergeseran mendominasi literatur terbaru. Pertama, fokus bergeser dari memperbesar model ke <strong>efisiensi</strong> &mdash; arsitektur hemat komputasi, <em>attention</em> efisien, dan PEFT. Kedua, <strong>RAG dan agen</strong> menjadi jembatan antara model yang tertutup dengan pengetahuan dunia nyata. Ketiga, <strong>keamanan dan regulasi</strong> berpindah dari diskusi etis abstrak menjadi kewajiban hukum konkret, dengan <em>EU AI Act</em> sebagai tonggak pertama.</p>

<h2>2. Distribusi Sumber per Tema</h2>
<table class="avoid">
  <tr><th>Tema</th><th class="num">Jumlah</th></tr>
  ${catRows}
  <tr><th>Total</th><th class="num">30</th></tr>
</table>

<h2 class="pb">3. Sintesis Temuan</h2>

<p><strong>3.1 Investasi melonjak, adopsi belum merata.</strong> Data Stanford HAI menunjukkan investasi privat AI di Amerika Serikat naik dari USD 109,1 miliar (2024) menjadi USD 285,9 miliar (2025) &mdash; selisih lebih dari 23 kali lipat dibanding Tiongkok. Namun survei McKinsey menegaskan bahwa hampir 90% organisasi sudah memakai AI, sementara survei sektor publik multi-negara menemukan dampak produktivitas nyata yang masih terbatas. Ada jurang antara <em>adopsi</em> dan <em>hasil</em>.</p>

<p><strong>3.2 Dari model besar ke sistem bertindak.</strong> Tinjauan agen (Wang et al.; arXiv:2503.23037) menunjukkan konsensus arsitektural: agen LLM dibangun dari <em>profil</em>, <em>memori</em>, <em>perencanaan</em>, dan <em>aksi</em>. Survei <em>Long Chain-of-Thought</em> menambahkan dimensi baru berupa <em>inference-time scaling</em> &mdash; menambah kemampuan dengan memberi model lebih banyak waktu berpikir, bukan lebih banyak parameter. Sumber FLAIRS mencatat realitas industri: sekitar dua pertiga enterprise bereksperimen dengan agen, tetapi hanya seperempat yang berhasil melakukan <em>scaling</em>.</p>

<p><strong>3.3 Grounding sebagai jawaban atas halusinasi.</strong> RAG menjadi tema paling produktif dalam literatur. Dari tiga paradigma dasar (Naive, Advanced, Modular RAG) yang dirumuskan Gao et al., bidang ini berkembang ke <em>Agentic RAG</em> &mdash; di mana agen memutuskan sendiri kapan dan bagaimana mengambil pengetahuan eksternal.</p>

<p><strong>3.4 Efisiensi sebagai keharusan ekonomi.</strong> Biaya inference turun lebih dari 280 kali lipat dalam sekitar 18 bulan. PEFT, terutama LoRA, memungkinkan adaptasi model dengan hanya sebagian kecil parameter yang dilatih &mdash; studi empiris pada 13 model mengonfirmasi bahwa LoRA dan adapter mampu mendekati kualitas <em>full fine-tuning</em>.</p>

<p><strong>3.5 Keamanan: jaminan yang rapuh.</strong> Tinjauan <em>alignment</em> menempatkan RLHF dan variannya (RLAIF, DPO, Constitutional AI) sebagai arus utama. Namun dua sumber memberikan peringatan penting: model yang telah di-<em>alignment</em> dapat <strong>kehilangan pengaman</strong> ketika di-<em>fine-tune</em> untuk domain tertentu, dan kritik sosiotehknis menyatakan bahwa RLHF tidak dengan sendirinya menjamin keamanan.</p>

<p><strong>3.6 Regulasi menjadi kenyataan operasional.</strong> <em>EU AI Act</em> berlaku bertahap: larangan sistem berisiko tak-<em>acceptable</em> sejak 2 Februari 2025, kewajiban model <em>general-purpose</em> sejak 2 Agustus 2025, dengan denda hingga EUR 35 juta atau 7% perputaran global. Kepatuhan bukan lagi opsi, melainkan bagian dari siklus MLOps.</p>

<h2>4. Implikasi Praktis</h2>
<ul>
  <li><strong>Mulai dari grounding, bukan dari model terbesar.</strong> RAG memberi perbaikan akurasi faktual dengan biaya jauh lebih rendah daripada pelatihan ulang.</li>
  <li><strong>Anggarkan evaluasi sejak awal.</strong> Tanpa evaluasi, agen sulit diskalakan &mdash; persis titik gagal yang dilaporkan literatur industri.</li>
  <li><strong>Perlakukan <em>alignment</em> sebagai proses berkelanjutan.</strong> Setiap <em>fine-tuning</em> berpotensi membatalkan pengaman sebelumnya; perlu uji ulang setelah adaptasi.</li>
  <li><strong>Petakan risiko regulasi sebelum rilis.</strong> Klasifikasikan sistem menurut tingkat risiko AI Act untuk menentukan kewajiban dokumentasi dan transparansi.</li>
</ul>

<div class="note">
  <strong>Catatan metodologis.</strong> Riset dilakukan melalui pencarian web dan verifikasi metadata tiap sumber (judul, penulis, tahun, URL). Angka sitasi bersifat indikatif dan berubah dari waktu ke waktu. Sumber berupa <em>preprint</em> arXiv belum tentu melewati <em>peer review</em>; sumber yang sudah terbit di jurnal (IEEE TNNLS, TMLR, Springer AI &amp; Society, MDPI Electronics) ditandai pada kolom keterangan.
</div>

<h2 class="pb">5. Daftar 30 Sumber Terpilih</h2>
<table>
  <tr><th class="num">#</th><th>Sumber &amp; Pokok Temuan</th></tr>
  ${rows}
</table>

<h2>6. Keterbatasan</h2>
<p>Ringkasan ini bersifat sekunder: seluruh temuan disarikan dari abstrak dan ringkasan publik, bukan dari pembacaan penuh setiap makalah. Sebagian sumber bertahun 2026 masih sangat baru sehingga dampaknya belum dapat dinilai secara retrospektif. Komposisi tema (delapan kategori) merupakan pilihan penyusun dan bukan pembagian baku dalam literatur.</p>

<div class="foot">
  Tes 30 Topik &mdash; Ringkasan Riset &middot; Kelompok 2 AI &middot; Heka &middot; ${today}<br>
  Dibuat otomatis dari sources.json &middot; github.com/RizkiBSD/Kelompok-2-AI
</div>

</body></html>`;

fs.writeFileSync(path.join(__dirname, 'laporan.html'), html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'selected.json'), JSON.stringify(selected, null, 2), 'utf8');
console.log('HTML written. Selected sources:', selected.length);
console.log(selected.map((s, i) => `${i + 1}. [${s.kategori}] ${s.judul.slice(0, 55)}`).join('\n'));
