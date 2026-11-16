const fs = require('fs');
const path = require('path');

const sources = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources-30-masalah.json'), 'utf8'));

const TOPICS = {
  1: { nama: 'Kesulitan Mengatur Arus Kas Pribadi', singkat: 'Arus kas pribadi' },
  2: { nama: 'Ketergantungan pada Pinjaman Online / Paylater', singkat: 'Pinjol & paylater' },
  3: { nama: 'Kesulitan Membagi Waktu Kuliah dan Kerja Paruh Waktu', singkat: 'Work-study conflict' },
  4: { nama: 'Prokrastinasi atau Kebiasaan Menunda', singkat: 'Prokrastinasi' },
  5: { nama: 'Sulit Menjaga Konsistensi Belajar Mandiri', singkat: 'Konsistensi belajar' },
  6: { nama: 'Kesulitan Memisahkan Keuangan Pribadi dan Usaha', singkat: 'Pemisahan keuangan' },
  7: { nama: 'Ketidakstabilan Pendapatan Pekerja Lepas (Freelancer)', singkat: 'Pendapatan freelancer' },
  8: { nama: 'Praktik Joki Tugas dan Skripsi', singkat: 'Joki akademik' },
  9: { nama: 'Konsistensi Belajar Mandiri (Penguatan)', singkat: 'Konsistensi (lanjutan)' },
  10: { nama: 'Ketergantungan Berlebihan pada Kecerdasan Artifisial', singkat: 'Ketergantungan AI' }
};

const ANALISIS = {
  1: 'Literatur Indonesia konsisten menempatkan literasi keuangan sebagai akar masalah. Ketika kemampuan mencatat dan merencanakan lemah, arus kas pribadi menjadi tidak terpantau. Persoalannya bukan semata kekurangan uang, melainkan ketiadaan sistem pencatatan dan anggaran.',
  2: 'Pinjaman online dan paylater bergeser fungsi: dari alat bantu likuiditas menjadi pendorong konsumsi. Pemicunya adalah perilaku konsumtif, tekanan sosial, dan FoMO, dengan literasi finansial rendah sebagai faktor yang memperparah. Kemudahan akses mempercepat siklus utang.',
  3: 'Konsep kuncinya adalah work-study conflict: tuntutan satu peran menghambat peran lainnya. Dampaknya meliputi turunnya academic engagement dan naiknya stres akademik. Menariknya, keseimbangan peran terbukti lebih menentukan daripada manajemen waktu semata.',
  4: 'Prokrastinasi bukan kemalasan, melainkan mekanisme penghindaran. Faktor internal (85%) dan eksternal (89,5%) sama-sama kuat. Pemicu paling sering: takut gagal, tugas yang dirasa tidak menyenangkan, dan manajemen waktu yang buruk (8 dari 13 studi).',
  5: 'Konsistensi belajar mandiri bertumpu pada self-regulated learning (SRL): metakognisi, motivasi, dan strategi belajar. Studi menunjukkan SRL dan manajemen waktu berpengaruh signifikan terhadap motivasi belajar, namun aspek pemahaman/metakognitif justru paling lemah.',
  6: 'Pemisahan keuangan pribadi dan usaha adalah masalah umum UMKM, termasuk usaha mahasiswa. Tanpa pemisahan, laba usaha tidak terukur dan modal tertutup kebutuhan konsumsi. Pencatatan transaksi menjadi prasyarat, dan edukasi terbukti meningkatkan kemampuan ini.',
  7: 'Pekerja lepas menghadapi pendapatan yang tidak stabil, kontrol algoritmik, dan ketidakpastian psikologis. Studi fenomenologis menemukan lima tema pengalaman: pendapatan tidak stabil, kontrol algoritmik, fleksibilitas, strategi bertahan, dan ketidakpastian. Persepsi ketidakstabilan berkorelasi dengan rasa tidak aman finansial.',
  8: 'Joki tugas dan skripsi adalah bentuk contract cheating — pelanggaran serius integritas akademik. Motifnya beragam: tenggat mendesak, kesulitan akademik, dan orientasi pada hasil akhir. Dampaknya, hasil akademik tidak lagi mencerminkan kompetensi, dan kesempatan belajar mendalam hilang.',
  9: 'Topik ini memperkuat topik 5 dari sudut berbeda: konsistensi belajar juga rapuh karena kebiasaan belajar yang tidak terstruktur dan tidak adanya mekanisme evaluasi diri. Diperlukan sistem belajar berulang, target kecil, dan refleksi berkala agar konsistensi tidak bergantung pada motivasi sesaat.',
  10: 'Ketergantungan AI bekerja lewat cognitive offloading: beban kognitif mendorong mahasiswa menyerahkan proses berpikir ke sistem. Konsekuensinya keterampilan berpikir kritis menurun. Namun literasi AI berfungsi sebagai penyangga — dampak tidak seragam dan masih dapat dimitigasi.'
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toISOString().slice(0, 10);

const countByTopic = {};
for (const s of sources) countByTopic[s.topik] = (countByTopic[s.topik] || 0) + 1;

// ---- source rows grouped by topic ----
let rows = '';
for (let t = 1; t <= 10; t++) {
  const group = sources.filter(s => s.topik === t);
  if (!group.length) continue;
  rows += `<tr class="grp"><td colspan="2">Topik ${t} &mdash; ${esc(TOPICS[t].nama)}</td></tr>`;
  group.forEach((s, gi) => {
    rows += `
  <tr>
    <td class="num">${t}.${gi + 1}</td>
    <td>
      <div class="src-title">${esc(s.judul)}</div>
      <div class="src-meta">${esc(s.penulis)} &middot; ${esc(s.tahun)} &middot; ${esc(s.terbit)}</div>
      <div class="src-point">${esc(s.temuan)}</div>
      <div class="src-url">${esc(s.url)}</div>
    </td>
  </tr>`;
  });
}

const topicTable = Object.keys(TOPICS).map(t => {
  const n = countByTopic[t] || 0;
  return `<tr><td class="num">${t}</td><td>${esc(TOPICS[t].nama)}</td><td class="num">${n}</td></tr>`;
}).join('');

const analisisBlocks = Object.keys(TOPICS).map(t => `
  <div class="blk">
    <div class="blk-h"><span class="blk-n">${t}</span> ${esc(TOPICS[t].nama)}</div>
    <p>${esc(ANALISIS[t])}</p>
  </div>`).join('');

const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8">
<title>30 Masalah Mahasiswa - Ringkasan Riset</title>
<style>
  @page { size: A4; margin: 17mm 15mm 16mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Calibri, Arial, sans-serif; color: #1a1a1a; font-size: 10.2pt; line-height: 1.5; margin: 0; }
  h1 { font-size: 20pt; margin: 0 0 4px; color: #0b3d69; letter-spacing: -.3px; }
  .sub { font-size: 10.8pt; color: #4a5b6b; margin-bottom: 16px; }
  h2 { font-size: 13pt; color: #0b3d69; margin: 20px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #d6e2ee; }
  p { margin: 0 0 9px; text-align: justify; }
  .cover-meta { border: 1px solid #d6e2ee; border-left: 4px solid #0b3d69; background: #f7fafd; padding: 11px 15px; margin: 14px 0 6px; font-size: 9.3pt; }
  .cover-meta table { border: none; width: 100%; }
  .cover-meta td { border: none; padding: 2px 0; vertical-align: top; }
  .cover-meta td:first-child { width: 132px; color: #5a6b7b; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
  th, td { border: 1px solid #dde5ee; padding: 6px 8px; vertical-align: top; }
  th { background: #eef4fa; text-align: left; font-size: 9.4pt; color: #0b3d69; }
  td.num, th.num { text-align: center; font-variant-numeric: tabular-nums; }
  td.num { width: 38px; }
  tr.grp td { background: #f2f7fc; font-weight: 600; color: #0b3d69; font-size: 9.4pt; border-top: 2px solid #cfe0ef; }
  .src-title { font-weight: 600; color: #10263a; font-size: 9.9pt; }
  .src-meta { font-size: 8.6pt; color: #6a7b8b; margin: 1px 0 3px; }
  .src-point { font-size: 9.4pt; }
  .src-url { font-size: 8pt; color: #2e6da4; word-break: break-all; margin-top: 2px; }
  .kpi { display: flex; gap: 9px; margin: 11px 0 4px; }
  .kpi div { flex: 1; border: 1px solid #d6e2ee; border-top: 3px solid #0b3d69; background: #fafcfe; padding: 7px 9px; text-align: center; }
  .kpi .v { font-size: 15pt; font-weight: 700; color: #0b3d69; display: block; }
  .kpi .l { font-size: 8.2pt; color: #5a6b7b; }
  .blk { margin: 0 0 10px; page-break-inside: avoid; border-left: 3px solid #cfe0ef; padding-left: 10px; }
  .blk-h { font-weight: 600; color: #0b3d69; font-size: 10.2pt; margin-bottom: 2px; }
  .blk-n { display: inline-block; background: #0b3d69; color: #fff; width: 17px; height: 17px; line-height: 17px; text-align: center; border-radius: 50%; font-size: 8.6pt; margin-right: 4px; }
  .blk p { margin: 0 0 4px; font-size: 9.7pt; }
  ul { margin: 4px 0 10px; padding-left: 20px; }
  li { margin-bottom: 4px; text-align: justify; }
  .note { background: #fffbf0; border: 1px solid #f0dfb0; border-left: 4px solid #d9a520; padding: 9px 13px; font-size: 9.4pt; margin: 12px 0; }
  .foot { margin-top: 16px; padding-top: 8px; border-top: 1px solid #d6e2ee; font-size: 8.4pt; color: #7a8b9b; text-align: center; }
  .pb { page-break-before: always; }
</style></head><body>

<h1>30 Masalah Mahasiswa</h1>
<div class="sub">Ringkasan Riset dari 30 Sumber &mdash; Keuangan, Waktu, dan Integritas Akademik</div>

<div class="cover-meta">
  <table>
    <tr><td>Kelompok</td><td><strong>Kelompok 2 &mdash; Artificial Intelligence</strong></td></tr>
    <tr><td>Penanggung jawab</td><td>Heka</td></tr>
    <tr><td>Repositori</td><td>github.com/RizkiBSD/Kelompok-2-AI</td></tr>
    <tr><td>Jumlah topik</td><td>10 topik masalah</td></tr>
    <tr><td>Jumlah sumber</td><td>30 sumber (3 sumber per topik)</td></tr>
    <tr><td>Tanggal disusun</td><td>${today}</td></tr>
  </table>
</div>

<h2>1. Ringkasan Eksekutif</h2>
<p>Dokumen ini merangkum <strong>10 topik masalah</strong> yang lazim dihadapi mahasiswa, masing-masing ditopang oleh <strong>3 sumber terpilih</strong> sehingga totalnya <strong>30 sumber</strong>. Topik dikelompokkan ke dalam tiga klaster besar: <em>keuangan</em> (topik 1, 2, 6, 7), <em>manajemen waktu dan kebiasaan belajar</em> (topik 3, 4, 5, 9), serta <em>integritas dan ketergantungan teknologi</em> (topik 8, 10).</p>

<div class="kpi">
  <div><span class="v">10</span><span class="l">Topik masalah</span></div>
  <div><span class="v">30</span><span class="l">Sumber (3 per topik)</span></div>
  <div><span class="v">3</span><span class="l">Klaster tema</span></div>
  <div><span class="v">2020&ndash;2026</span><span class="l">Rentang publikasi</span></div>
</div>

<p>Tiga pola lintas topik muncul dari literatur. <strong>Pertama</strong>, sebagian besar masalah berakar pada <em>literasi</em> — literasi keuangan untuk topik keuangan, literasi AI untuk topik ketergantungan. <strong>Kedua</strong>, masalah yang tampak berbeda sering berbagi akar yang sama: prokrastinasi, konsistensi belajar, dan work-study conflict semuanya berujung pada lemahnya regulasi diri (<em>self-regulated learning</em>). <strong>Ketiga</strong>, teknologi mempercepat masalahnya: paylater mempermudah konsumsi impulsif, sementara AI generatif mempermudah <em>cognitive offloading</em> yang melemahkan berpikir kritis.</p>

<h2>2. Peta 10 Topik dan Sebaran Sumber</h2>
<table>
  <tr><th class="num">No</th><th>Topik Masalah</th><th class="num">Sumber</th></tr>
  ${topicTable}
  <tr><th colspan="2">Total</th><th class="num">30</th></tr>
</table>

<h2 class="pb">3. Analisis per Topik</h2>
${analisisBlocks}

<h2 class="pb">4. Sintesis dan Implikasi</h2>
<p><strong>4.1 Klaster keuangan.</strong> Empat topik keuangan (arus kas, pinjol/paylater, pemisahan keuangan usaha, ketidakstabilan pendapatan freelancer) membentuk satu rantai. Pendapatan tidak stabil memperbesar celah arus kas; celah itu ditutup dengan paylater; tanpa pemisahan keuangan usaha, utang menutupi kerugian yang tidak terlihat. Intervensi paling berdampak bukan menambah penghasilan, melainkan <strong>pencatatan dan pemisahan dana</strong>.</p>

<p><strong>4.2 Klaster waktu dan kebiasaan.</strong> Work-study conflict, prokrastinasi, dan lemahnya konsistensi belajar berbagi akar pada regulasi diri. Bukti menarik: efektivitas manajemen waktu saja tidak cukup — <em>keseimbangan peran</em> justru faktor dominan. Artinya, solusi teknis (jadwal, aplikasi) perlu disertai penataan ulang ekspektasi peran.</p>

<p><strong>4.3 Klaster integritas dan teknologi.</strong> Joki akademik dan ketergantungan AI adalah dua wajah dari masalah yang sama: <em>hasil</em> diutamakan di atas <em>proses</em> belajar. Ketika tenggat dan nilai menjadi satu-satunya ukuran, menyerahkan pekerjaan kepada jasa joki atau AI menjadi rasional secara jangka pendek, namun merusak kapasitas jangka panjang.</p>

<h2>5. Rekomendasi Praktis</h2>
<ul>
  <li><strong>Mulai dari pencatatan, bukan dari menambah penghasilan.</strong> Pisahkan rekening/dompet pribadi dan usaha; catat transaksi harian minimal 30 hari untuk melihat pola kebocoran.</li>
  <li><strong>Batasi akses kredit konsumtif secara sadar.</strong> Tetapkan plafon paylater dan aturan tunggal: tidak ada cicilan untuk barang non-esensial.</li>
  <li><strong>Petakan peran, bukan hanya waktu.</strong> Karena keseimbangan peran lebih menentukan, negosiasikan jam kerja dengan beban mata kuliah per semester, bukan sekadar menyusun jadwal.</li>
  <li><strong>Pecah tugas menjadi unit kecil dan lawan penghindaran.</strong> Prokrastinasi berakar pada takut gagal dan aversi tugas; mulai dari langkah 10 menit menurunkan ambang hambatan.</li>
  <li><strong>Gunakan AI sebagai lawan bicara, bukan pengganti berpikir.</strong> Terapkan aturan: tulis jawaban sendiri lebih dulu, baru bandingkan dengan AI — ini melatih metakognisi dan menahan <em>cognitive offloading</em>.</li>
  <li><strong>Bangun integritas lewat proses yang terlihat.</strong> Dokumentasikan tahapan tugas (draf, revisi, catatan bimbingan) sehingga hasil akhir dapat dipertanggungjawabkan.</li>
</ul>

<div class="note">
  <strong>Catatan metodologis.</strong> Riset dilakukan melalui pencarian web dan verifikasi metadata tiap sumber (judul, penulis, tahun, penerbit, URL). Sebagian besar sumber adalah publikasi jurnal dan repositori akademik Indonesia; topik 10 dilengkapi literatur internasional karena kajian ketergantungan AI masih didominasi publikasi luar negeri. Angka sitasi bersifat indikatif dan berubah dari waktu ke waktu. Sumber berupa skripsi/preprint belum tentu melewati <em>peer review</em>.
</div>

<h2 class="pb">6. Daftar 30 Sumber</h2>
<table>
  <tr><th class="num">#</th><th>Sumber &amp; Pokok Temuan</th></tr>
  ${rows}
</table>

<h2>7. Keterbatasan</h2>
<p>Ringkasan ini bersifat sekunder: temuan disarikan dari abstrak dan ringkasan publik, bukan pembacaan penuh setiap makalah. Komposisi tiga sumber per topik adalah pilihan penyusun agar sebaran merata, bukan hasil sistematisasi <em>systematic review</em>. Beberapa sumber berasal dari jurnal nasional dengan cakupan sampel terbatas, sehingga generalisasi perlu hati-hati. Topik 5 dan 9 bertumpang tindih (konsistensi belajar mandiri); keduanya dipertahankan karena berasal dari daftar topik asli, namun dianalisis dengan sudut berbeda.</p>

<div class="foot">
  30 Masalah Mahasiswa &mdash; Ringkasan Riset &middot; Kelompok 2 AI &middot; Heka &middot; ${today}<br>
  Dibuat otomatis dari sources-30-masalah.json &middot; github.com/RizkiBSD/Kelompok-2-AI
</div>

</body></html>`;

fs.writeFileSync(path.join(__dirname, 'laporan-30-masalah.html'), html, 'utf8');
console.log('HTML written. Sources:', sources.length);
