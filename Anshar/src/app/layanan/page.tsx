import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import TierShowcase from "@/components/TierShowcase";
import { ADDONS, formatIDR, SERVICES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Layanan & Harga",
  description:
    "Daftar lengkap kategori jasa Bantugambar dengan harga pasti: sketsa pensil, lineart tinta, full color marker, dan redraw fanart.",
};

export default function LayananPage() {
  return (
    <>
      <section className="border-b border-[rgba(35,32,28,0.1)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-14">
          <Reveal>
            <p className="eyebrow">Katalog layanan</p>
            <h1 className="mt-2 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight text-[#23201c] sm:text-[3.1rem]">
              Harga pasti sejak awal
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#5a5348]">
              Tidak ada negosiasi di chat, tidak ada harga yang berubah setelah pesanan dibuat.
              Kalkulator otomatis menghitung total berdasarkan spesifikasi Anda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* interactive tier */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <TierShowcase />
        </Reveal>
      </section>

      {/* detailed comparison table */}
      <section className="border-y border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow">Perbandingan</p>
            <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight text-[#23201c]">
              Semua kategori dalam satu tabel
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 overflow-x-auto border border-[rgba(35,32,28,0.14)] bg-[#fffdf9]">
              <table className="w-full min-w-[700px] text-left text-[0.82rem]">
                <thead>
                  <tr className="border-b border-[rgba(35,32,28,0.14)] bg-[#f2ede4]">
                    {["Kategori", "Media", "Ukuran", "Tenggat", "Harga dasar"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[0.64rem] uppercase tracking-[0.18em] text-[#8b7355]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((s) => (
                    <tr key={s.id} className="border-b border-[rgba(35,32,28,0.08)] last:border-0">
                      <td className="px-4 py-3.5 font-medium text-[#23201c]">{s.name}</td>
                      <td className="px-4 py-3.5 text-[#6b6257]">{s.tagline}</td>
                      <td className="px-4 py-3.5 text-[#6b6257]">A4 / A3</td>
                      <td className="px-4 py-3.5 text-[#6b6257]">{s.turnaround}</td>
                      <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-[#23201c]">
                        {formatIDR(s.basePrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* addons */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <p className="eyebrow">Layanan tambahan</p>
          <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight text-[#23201c]">
            Tambah sesuai kebutuhan
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {ADDONS.map((a) => (
              <div
                key={a.id}
                className="border border-[rgba(35,32,28,0.12)] bg-[#fffdf9] p-5"
              >
                <p className="text-[0.92rem] font-semibold text-[#23201c]">{a.label}</p>
                <p className="mt-1 text-[0.76rem] text-[#6b6257]">{a.detail}</p>
                <p className="mt-3 font-display text-[1.15rem] font-bold text-[#23201c]">
                  +{formatIDR(a.price)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* DP explanation */}
      <section className="border-y border-[rgba(35,32,28,0.1)] bg-[#23201c] py-16 text-[#f2ede4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#cbbba0]">Pembayaran bertahap</p>
            <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight sm:text-[2.2rem]">
              50% untuk mulai, 50% + ongkir untuk kirim
            </h2>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-[#c9c1b4]">
              Model ini melindungi kedua pihak: Anda membayar hanya setelah spesifikasi
              jelas dan disetujui; kami memulai pengerjaan dengan jaminan komitmen dari
              pemesan.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ol className="space-y-4">
              {[
                ["DP 50%", "Dibayarkan via QRIS/VA/e-wallet/transfer manual. Pesanan masuk antrian."],
                [
                  "Sketsa dikirim",
                  "Anda tinjau, revisi maks 2× gratis. Setelah disetujui → lanjut lineart.",
                ],
                [
                  "Pelunasan 50% + ongkir",
                  "Ongkir dihitung real-time via RajaOngkir. Setelah lunas → packing & kirim.",
                ],
                ["Selesai", "Nomor resi diberikan. Karya fisik sampai ke alamat Anda."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#cbbba0]/20 text-[0.65rem] font-bold text-[#cbbba0]">
                    ✓
                  </span>
                  <div>
                    <p className="text-[0.88rem] font-semibold">{t}</p>
                    <p className="text-[0.78rem] leading-relaxed text-[#b3aa9c]">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="border border-[rgba(35,32,28,0.16)] bg-[#fffdf9] px-8 py-11 text-center sm:px-16">
            <h2 className="font-display text-[1.85rem] font-bold text-[#23201c]">Siap memesan?</h2>
            <p className="mx-auto mt-2 max-w-md text-[0.86rem] text-[#6b6257]">
              Kalkulator akan menampilkan total pasti sebelum Anda membayar apa pun.
            </p>
            <Link href="/pesan" className="btn btn-primary mt-6">
              Mulai Pemesanan <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
