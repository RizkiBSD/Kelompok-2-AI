import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan pemesanan, kebijakan revisi, refund, hak cipta, penafian akademik, dan privasi data Bantugambar.",
};

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "umum",
    title: "1. Ruang Lingkup dan Penerimaan Pesanan",
    body: (
      <>
        <p>
          Pemesanan dianggap sah setelah spesifikasi lengkap, DP diterima, dan nomor pesanan
          (format BG-TAHUN-XXXX) telah diterbitkan oleh sistem. Bantugambar dapat menolak
          atau membatalkan pesanan bila request bertentangan dengan ketentuan di dokumen ini,
          termasuk permintaan karya yang dianggap melanggar hak cipta pihak
          ketiga.
        </p>
        <p className="mt-3">
          Permintaan yang memerlukan estimasi khusus di luar katalog standar (misalnya format
          besar non-A4/A3, jumlah subjek sangat banyak, atau penggabungan beberapa karya)
          akan ditinjau admin dan diberi harga manual sebelum DP dibayar.
        </p>
      </>
    ),
  },
  {
    id: "pembayaran",
    title: "2. Pembayaran dan DP",
    body: (
      <>
        <p>
          Pembayaran dibagi dua tahap: <strong>DP 50%</strong> dibayarkan sebelum
          pengerjaan dimulai, dan <strong>sisa 50% + ongkos kirim</strong> dilunasi sebelum
          karya diserahkan ke ekspedisi.
        </p>
        <p className="mt-3">
          Metode yang tersedia: QRIS, Virtual Account (BCA, Mandiri, BRI, BNI), e-wallet
          (GoPay, OVO, ShopeePay, DANA), serta transfer manual dengan unggah bukti bayar.
          Pembayaran manual diverifikasi maksimal 1×24 jam pada jam kerja.
        </p>
        <p className="mt-3">
          DP tidak dikembalikan jika proses sketsa telah dimulai, dengan pengecualian pada
          poin 4 (kegagalan layanan).
        </p>
      </>
    ),
  },
  {
    id: "revisi",
    title: "3. Kebijakan Revisi",
    body: (
      <>
        <p>
          Setiap pesanan termasuk <strong>maksimal 2 sesi revisi</strong> dan hanya berlaku
          pada tahap sketsa pensil. Revisi dihitung sebagai satu sesi per revisi_REQUEST yang
          dikirim.
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Revisi tahap sketsa: gratis, maksimal 2 kali.</li>
          <li>
            Revisi setelah tahap sketsa disetujui (lineart/pewarnaan): Rp15.000 per sesi.
          </li>
          <li>Perubahan brief setelah persetujuan sketsa dihitung sebagai revisi.</li>
          <li>Perubahan komposisi total di luar brief awal dihitung sebagai proyek baru.</li>
        </ul>
      </>
    ),
  },
  {
    id: "refund",
    title: "4. Kebijakan Pengembalian Dana (Refund)",
    body: (
      <>
        <p>Pengembalian dana diberikan dalam kondisi berikut:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Pembatalan oleh pemesan sebelum sketsa dimulai</strong> — DP
            dikembalikan 100%.
          </li>
          <li>
            <strong>Pembatalan setelah sketsa dimulai</strong> — biaya bahan yang sudah
            terpakai (kertas, tinta, marker) dipotong maksimal 30% dari nilai DP.
          </li>
          <li>
            <strong>Sketsa telah disetujui</strong> — DP tidak dapat dikembalikan; proses
            tetap dilanjutkan sampai karya selesai.
          </li>
          <li>
            <strong>Kegagalan Layanan</strong> (seniman sakit/berhalangan lebih dari 5 hari
            kerja tanpa penggantian seniman) — seluruh DP dikembalikan, atau pesanan dipindahkan ke
            slot seniman lain atas persetujuan pemesan.
          </li>
          <li>
            <strong>Karya rusak atau hilang di pengiriman</strong> — penggantian karya baru
            atau pengembalian penuh sesuai pilihan pemesan.
          </li>
        </ul>
        <p className="mt-3">
          Pengembalian diproses ke rekening/e-wallet asal maksimal 7 hari kerja setelah
          verifikasi.
        </p>
      </>
    ),
  },
  {
    id: "akademik",
    title: "5. Penafian dan Mitigasi Integritas Akademik",
    body: (
      <>
        <p>
          Seluruh karya Bantugambar berstatus sebagai <strong>Referensi Visual dan Bahan
          Belajar</strong>. Layanan ini tidak dimaksudkan untuk menggantikan pekerjaan
          akademik pemesan.
        </p>
        <p className="mt-3">
          Pemesan bertanggung jawab penuh atas penggunaan karya terhadap ketentuan
          akademik institusi masing-masing. Bantugambar tidak menerima, memproses, atau
          membantu permintaan yang secara eksplisit menyebutkan penggunaan karya ini
          sebagai hasil kerja sendiri yang diserahkan kepada pihak lain.
        </p>
        <p className="mt-3">
          Ketentuan ini dibuat agar layanan tetap berada dalam koridor etika: karya
          berfungsi sebagai referensi visual, bahan belajar anatomi/teknis, dan latihan
          observasi — bukan pengganti proses belajar pemesan.
        </p>
      </>
    ),
  },
  {
    id: "hakcipta",
    title: "6. Hak Cipta dan Penggunaan Karya",
    body: (
      <>
        <p>
          Setelah pelunasan penuh, pemesan memperoleh hak penggunaan atas karya yang dibuat
          <strong> khusus untuk pesanan tersebut</strong>, untuk keperluan pribadi dan
          non-komersial. Hak cipta moral tetap milik seniman.
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Penjual dapat memamerkan karya di media pribadi (sosial media, portofolio)
            dengan mencantumkan kredit pembuat.
          </li>
          <li>
            <strong>Kategori Fanart:</strong> lisensi personal use only. Tidak boleh
            dijual, dicetak untuk distribusi komersial, atau dipakai sebagai merchandise.
            Hak karakter tetap milik pemilik IP aslinya.
          </li>
          <li>
            Seniman berhak menampilkan karya di portofolio, media sosial, dan materi
            promosi.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "privasi",
    title: "7. Privasi Data Pribadi",
    body: (
      <>
        <p>
          Data yang dikumpulkan: nama, nomor WhatsApp, alamat pengiriman, kota, kode pos,
          email (opsional), serta berkas gambar referensi yang diunggah pemesan.
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Data hanya digunakan untuk memproses pesanan, komunikasi layanan, dan
            verifikasi pembayaran.
          </li>
          <li>
            Data tidak dijual atau dibagikan kepada pihak ketiga, kecuali kepada penyedia
            pembayaran dan ekspedisi yang membutuhkan data pengiriman.
          </li>
          <li>
            Berkas referensi disimpan selama masa pengerjaan dan maksimal 90 hari
            setelahnya untuk keperluan revisi, lalu dihapus.
          </li>
          <li>
            Pemesan dapat meminta akses, koreksi, atau penghapusan data kapan saja melalui
            WhatsApp.
          </li>
        </ul>
        <p className="mt-3">Seluruh pemrosesan data dilakukan sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi.</p>
      </>
    ),
  },
  {
    id: "pengiriman",
    title: "8. Pengiriman dan Kerusakan",
    body: (
      <>
        <p>
          Karya dikirim melalui ekspedisi (JNE, J&amp;T, SiCepat) dengan ongkos yang dihitung
          otomatis melalui API RajaOngkir. Lamanya pengiriman di luar estimasi kurir
          sepenuhnya di luar kendali Bantugambar.
        </p>
        <p className="mt-3">
          Paket standar dilindungi opp plastic dan karton. Paket premium (Rp8.000) memakai
          bubble wrap berlapis dan pelindung sudut. Untuk karya bernilai di atas
          Rp300.000, kami menyarankan pengemasan premium dan asuransi pengiriman.
        </p>
        <p className="mt-3">
          Kerusakan yang terjadi selama pengiriman ditanggung ekspedisi berdasarkan
          tracking number. Bantugambar akan membantu proses klaim.
        </p>
      </>
    ),
  },
  {
    id: "keterbatasan",
    title: "9. Keterbatasan Layanan dan Force Majeure",
    body: (
      <>
        <p>
          Bantugambar tidak menjamin karyanya memenuhi standar penilaian akademik tertentu,
          atau diterima sebagai tugas dengan nilai tertentu. Keakuratan ilustrasi teknis
          tetap bergantung pada referensi yang diberikan pemesan.
        </p>
        <p className="mt-3">
          Gangguan di luar kendali seperti bencana alam, sakit berat, gangguan logistik
          nasional, atau keputusan pemerintah yang membatasi kegiatan dapat menyebabkan
          penundaan. Dalam hal ini tenggat diperpanjang selama durasi gangguan.
        </p>
      </>
    ),
  },
  {
    id: "kontak",
    title: "10. Kontak dan Penyelesaian Sengketa",
    body: (
      <>
        <p>
          Seluruh komunikasi dan penyelesaian sengketa dilakukan melalui WhatsApp resmi
          Bantugambar pada jam kerja (Senin–Sabtu, 09.00–18.00 WIB).
        </p>
        <p className="mt-3">
          Dengan menyelesaikan pesanan, pemesan menyatakan telah membaca, memahami, dan
          menyetujui seluruh ketentuan di halaman ini beserta penafian akademik pada poin 5.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-[rgba(35,32,28,0.1)]">
        <div className="mx-auto max-w-4xl px-5 pb-8 pt-14">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2 font-display text-[2.3rem] font-bold leading-[1.08] tracking-tight text-[#23201c] sm:text-[2.9rem]">
            Syarat &amp; Ketentuan
          </h1>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-[#5a5348]">
            Berlaku untuk seluruh pesanan di platform Bantugambar. Terakhir diperbarui:
            11 November 2026.
          </p>

          <nav className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border border-[rgba(35,32,28,0.18)] px-3 py-1.5 text-[0.72rem] text-[#4a443c] transition hover:border-[#23201c] hover:bg-white"
              >
                {s.title.split(". ")[1] ?? s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-[1.35rem] font-bold text-[#23201c]">{s.title}</h2>
              <div className="mt-3 text-[0.88rem] leading-relaxed text-[#5a5348]">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-[rgba(35,32,28,0.16)] bg-[#fffdf9] px-7 py-9 text-center">
          <h2 className="font-display text-[1.6rem] font-bold text-[#23201c]">Siap membuat pesanan?</h2>
          <p className="mx-auto mt-2 max-w-sm text-[0.85rem] text-[#6b6257]">
            Formulir pemesanan menerapkan seluruh ketentuan di halaman ini secara langsung.
          </p>
          <Link href="/pesan" className="btn btn-primary mt-6">
            Buat Pesanan <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
