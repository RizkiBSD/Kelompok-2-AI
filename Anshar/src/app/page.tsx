import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Hand,
  Package,
  PenTool,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import CapacityBadge from "@/components/CapacityBadge";
import { PROCESS_STEPS, SERVICES, formatIDR } from "@/lib/catalog";
import { STUDIO, waLink } from "@/lib/site-config";

const TICKER = [
  "Sketsa Pensil",
  "Lineart 0.1 · 0.3 · 0.5",
  "Marker Alkohol",
  "Pensil Warna",
  "Cross-hatching Manual",
  "Scan 300 DPI",
  "Packaging Aman",
];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#cbbba0]/25 blur-[90px]" />
        <div className="pointer-events-none absolute -left-32 top-64 h-[360px] w-[360px] rounded-full bg-[#b5651d]/10 blur-[90px]" />

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">Studio Komisi · {STUDIO.alamatSingkat}</span>
                <span className="h-px w-8 bg-[#cbbba0]" />
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[#8a8074]">
                  100% manual
                </span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#23201c] sm:text-[3.4rem] sm:leading-[1.04] lg:text-[3.9rem]">
                Garis yang
                <br />
                <span className="inline-block whitespace-nowrap">
                  <span className="sketch-underline">dikerjakan tangan</span>,
                </span>
                <br />
                bukan dihasilkan mesin.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-[#5a5348]">
                Bantugambar mengerjakan sketsa pensil, lineart tinta, dan pewarnaan marker
                secara manual di atas kertas. Untuk ilustrasi teknis, bagan, poster, dan
                koleksi personal — dengan harga pasti sejak awal.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/pesan" className="btn btn-primary">
                  Mulai Pesan <ArrowRight size={16} />
                </Link>
                <Link href="/portofolio" className="btn btn-ghost">
                  Lihat Portofolio
                </Link>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-7">
                <CapacityBadge />
              </div>
            </Reveal>

            <Reveal delay={420}>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-[rgba(35,32,28,0.14)] pt-6">
                {[
                  ["3–7", "slot / minggu"],
                  ["5", "tahap alur"],
                  ["2×", "revisi gratis"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-[1.6rem] font-bold leading-none text-[#23201c]">
                      {v}
                    </dt>
                    <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-[#8a8074]">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* hero visual */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="sketch-frame rotate-[-2.5deg] bg-[#fffdf9] p-3 shadow-[0_30px_60px_-35px_rgba(35,32,28,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/artwork/artwork-02.svg"
                  alt="Studi anatomi manual"
                  className="art-img is-color w-full"
                />
                <p className="mt-2 flex items-center justify-between px-1 pb-1 text-[0.62rem] uppercase tracking-[0.16em] text-[#8a8074]">
                  <span>Studi Anatomi</span>
                  <span>Grafit · A4</span>
                </p>
              </div>

              <div className="absolute -bottom-10 -left-6 w-[190px] rotate-[4deg] border border-[rgba(35,32,28,0.14)] bg-[#fffdf9] p-2 shadow-[0_20px_40px_-25px_rgba(35,32,28,0.5)] sm:-left-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/artwork/artwork-07.svg" alt="Studi warna marker" className="art-img is-color w-full" />
              </div>

              <div className="absolute -right-3 -top-8 hidden rotate-[6deg] border border-[rgba(35,32,28,0.14)] bg-[#23201c] px-3.5 py-2 text-[#faf8f5] sm:block">
                <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#cbbba0]">harga pasti</p>
                <p className="font-display text-[0.95rem] font-bold">{formatIDR(150000)} – {formatIDR(425000)}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ticker */}
        <div className="border-y border-[rgba(35,32,28,0.14)] bg-[#f2ede4] py-3">
          <div className="marquee-viewport flex">
            <div className="marquee-track items-center">
              {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
                <span
                  key={i}
                  className="mx-5 flex shrink-0 items-center gap-5 text-[0.72rem] uppercase tracking-[0.2em] text-[#8b7355]"
                >
                  {t}
                  <span className="h-1 w-1 rounded-full bg-[#cbbba0]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              icon: Hand,
              title: "Benar-benar manual",
              body: "Setiap garis dibuat dengan pensil dan drawing pen. Tidak ada filter AI, tidak ada upscaling.",
            },
            {
              icon: PenTool,
              title: "Presisi terukur",
              body: "Proporsi dan label dicek sebelum penintaan. Cocok untuk diagram teknis dan ilustrasi ilmiah.",
            },
            {
              icon: Package,
              title: "Sampai tanpa lecet",
              body: "Opp plastic, bubble wrap, dan karton sudut. Karya sampai dalam kondisi seperti keluar dari meja kerja.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="border-t border-[rgba(35,32,28,0.2)] pt-5">
                <v.icon size={20} className="text-[#8b7355]" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-[1.15rem] font-bold text-[#23201c]">
                  {v.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[#6b6257]">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="layanan" className="border-t border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Kategori jasa</p>
                <h2 className="mt-2 font-display text-[2.1rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.5rem]">
                  Empat tingkat pengerjaan
                </h2>
              </div>
              <Link
                href="/layanan"
                className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[#23201c]"
              >
                Bandingkan detail
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEFORE AFTER ================= */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Dari sketsa ke final</p>
            <h2 className="mt-2 font-display text-[2rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.4rem]">
              Anda menyetujui sketsanya dulu.
            </h2>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-[#5a5348]">
              Tidak ada kejutan di akhir. Sketsa pensil dikirim untuk ditinjau sebelum
              penintaan dimulai — Anda punya dua kesempatan revisi gratis di tahap ini.
              Setelah disetujui, barulah tinta dan warna masuk.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Foto sketsa dikirim via WhatsApp, bukan file mentah",
                "Revisi hanya di tahap sketsa — bukan setelah coloring",
                "Persetujuan tertulis menjadi dasar lanjut ke tahap berikutnya",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.85rem] text-[#4a443c]">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#8b7355]" />
                  {t}
                </li>
              ))}
            </ul>

            <Link href="/proses" className="btn btn-ghost mt-7">
              Lihat alur lengkap <ArrowRight size={15} />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <BeforeAfterSlider src="/artwork/artwork-03.svg" alt="Perbandingan sketsa dan hasil final" />
              <p className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.16em] text-[#8a8074]">
                geser untuk membandingkan
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="border-y border-[rgba(35,32,28,0.1)] bg-[#23201c] py-20 text-[#f2ede4]">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#cbbba0]">Alur pesanan</p>
              <h2 className="mt-2 font-display text-[2.1rem] font-bold leading-tight tracking-tight sm:text-[2.5rem]">
                Lima tahap, tanpa tebak-tebakan
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-[#c9c1b4]">
                Setiap tahap punya status yang bisa Anda pantau. Tidak ada pesanan yang
                “hilang di chat”.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-[rgba(242,237,228,0.16)] sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="h-full border-[rgba(242,237,228,0.16)] bg-[#23201c] p-5 transition-colors hover:bg-[#2b2723] sm:border-r">
                  <p className="font-display text-[1.6rem] font-bold text-[#cbbba0]">{s.n}</p>
                  <h3 className="mt-3 text-[0.95rem] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-[#b3aa9c]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO TEASER ================= */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Karya terbaru</p>
              <h2 className="mt-2 font-display text-[2.1rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.5rem]">
                Bukti, bukan klaim
              </h2>
            </div>
            <Link
              href="/portofolio"
              className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[#23201c]"
            >
              Semua karya
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 5, 8, 11].map((n, i) => (
            <Reveal key={n} delay={i * 80}>
              <Link
                href="/portofolio"
                className="group block overflow-hidden border border-[rgba(35,32,28,0.12)] bg-[#fffdf9]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/artwork/artwork-${String(n).padStart(2, "0")}.svg`}
                  alt={`Karya ${n}`}
                  className={`art-img w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/5]"
                  }`}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="border-t border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="eyebrow">Harga transparan</p>
            <h2 className="mt-2 font-display text-[2.1rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.5rem]">
              Harga pasti, bukan rentang
            </h2>
            <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-[#5a5348]">
              Kalkulator di halaman pemesanan menghitung total secara langsung — termasuk
              ukuran, tingkat kesulitan, dan tenggat.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 overflow-hidden border border-[rgba(35,32,28,0.14)] bg-[#fffdf9]">
              <table className="w-full text-left text-[0.85rem]">
                <thead>
                  <tr className="border-b border-[rgba(35,32,28,0.14)] bg-[#f2ede4]">
                    <th className="px-4 py-3 text-[0.68rem] uppercase tracking-[0.14em] text-[#8b7355]">
                      Kategori
                    </th>
                    <th className="px-4 py-3 text-[0.68rem] uppercase tracking-[0.14em] text-[#8b7355]">
                      Ukuran
                    </th>
                    <th className="px-4 py-3 text-[0.68rem] uppercase tracking-[0.14em] text-[#8b7355]">
                      Tenggat
                    </th>
                    <th className="px-4 py-3 text-right text-[0.68rem] uppercase tracking-[0.14em] text-[#8b7355]">
                      Harga dasar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((s) => (
                    <tr key={s.id} className="border-b border-[rgba(35,32,28,0.08)] last:border-0">
                      <td className="px-4 py-3.5 font-medium text-[#23201c]">{s.name}</td>
                      <td className="px-4 py-3.5 text-[#6b6257]">A4 / A3</td>
                      <td className="px-4 py-3.5 text-[#6b6257]">5–10 hari</td>
                      <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-[#23201c]">
                        {formatIDR(s.basePrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[0.72rem] text-[#8a8074]">
              Tambahan: A3 +{formatIDR(50000)} · kompleks +{formatIDR(75000)} · express +25% ·
              revisi ekstra {formatIDR(15000)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Kata pemesan</p>
                <h2 className="mt-2 font-display text-[2.1rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.5rem]">
                  Umpan balik nyata
                </h2>
              </div>
              <p className="max-w-xs text-[0.78rem] leading-relaxed text-[#8a8074]">
                Ulasan dikumpulkan dari pesanan yang sudah selesai, bukan akun anonim.
              </p>
            </div>
          </Reveal>
        </div>
        <TestimonialMarquee />
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-t border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Pertanyaan umum</p>
            <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight text-[#23201c]">
              Hal yang biasanya ditanya
            </h2>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-[#6b6257]">
              Belum terjawab? Kirim pesan WhatsApp — dibalas maksimal 1×24 jam.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="divide-y divide-[rgba(35,32,28,0.12)] border-y border-[rgba(35,32,28,0.12)]">
              {[
                {
                  q: "Apakah karya ini bisa dipakai untuk tugas sekolah/kuliah?",
                  a: "Karya Bantugambar diposisikan sebagai referensi visual dan bahan belajar. Penggunaan untuk penugasan akademik sepenuhnya menjadi tanggung jawab pemesan sesuai kebijakan institusinya masing-masing. Kami tidak menerima pesanan yang secara eksplisit meminta karya untuk diserahkan sebagai hasil kerja sendiri.",
                },
                {
                  q: "Berapa lama pengerjaannya?",
                  a: "Standar 5–7 hari kerja untuk sketsa dan lineart, 7–10 hari untuk full color. Jalur express 2–3 hari tersedia dengan biaya +25%, terbatas 2 slot per minggu.",
                },
                {
                  q: "Bagaimana kalau hasilnya tidak sesuai?",
                  a: "Ada dua revisi gratis di tahap sketsa. Revisi setelah sketsa disetujui dikenakan Rp15.000 per sesi karena harus mengulang penintaan.",
                },
                {
                  q: "Fanart apakah boleh dijual kembali?",
                  a: "Tidak. Semua fanart berlisensi personal use — non-komersial. Hak karakter tetap milik pemilik IP aslinya.",
                },
                {
                  q: "Ongkir dihitung bagaimana?",
                  a: "Ongkir dihitung saat pelunasan berdasarkan berat dan dimensi paket via RajaOngkir (JNE, J&T, SiCepat), sesuai kota tujuan.",
                },
              ].map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[0.9rem] font-medium text-[#23201c] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-[#8b7355] transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 pr-8 text-[0.82rem] leading-relaxed text-[#6b6257]">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="relative overflow-hidden border border-[rgba(35,32,28,0.16)] bg-[#fffdf9] px-6 py-14 text-center sm:px-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#cbbba0]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#b5651d]/10 blur-3xl" />
            <Sparkles size={20} className="mx-auto text-[#b5651d]" />
            <h2 className="mx-auto mt-4 max-w-xl font-display text-[2rem] font-bold leading-tight tracking-tight text-[#23201c] sm:text-[2.4rem]">
              Punya gambar yang perlu diwujudkan?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-[#5a5348]">
              Isi spesifikasi, lihat harga pasti, bayar DP 50%. Sisa prosesnya kami yang jaga.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/pesan" className="btn btn-primary">
                Buat Pesanan <ArrowRight size={16} />
              </Link>
              <a
                href={waLink(`Halo ${STUDIO.artist}, saya mau tanya soal komisi di Bantugambar.`)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Tanya dulu
              </a>
            </div>

            <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[rgba(35,32,28,0.12)] pt-6 text-[0.7rem] text-[#8a8074]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} /> Pembayaran aman
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={13} /> Kirim seluruh Indonesia
              </span>
              <span className="flex items-center gap-1.5">
                <Hand size={13} /> 100% dikerjakan tangan
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
