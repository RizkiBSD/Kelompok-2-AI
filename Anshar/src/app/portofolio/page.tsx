import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioGrid from "@/components/PortfolioGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Kumpulan karya manual Bantugambar — sketsa pensil, lineart tinta, dan pewarnaan marker.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-[rgba(35,32,28,0.1)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-14">
          <Reveal>
            <p className="eyebrow">Galeri karya</p>
            <h1 className="mt-2 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight text-[#23201c] sm:text-[3.1rem]">
              Setiap goresan punya jejak tangan
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#5a5348]">
              Arsip karya yang sudah diserahkan ke pemesan — dengan izin tampil. Perhatikan
              tekstur kertas, ketebalan garis, dan ketidaksempurnaan yang justru jadi ciri
              karya manual.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <PortfolioGrid />
      </section>

      <section className="border-y border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Studi kasus</p>
            <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight text-[#23201c]">
              Satu karya, dua tahap
            </h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-[#5a5348]">
              Kiri adalah sketsa pensil yang dikirim untuk persetujuan. Kanan adalah hasil
              akhir setelah penintaan dan pewarnaan marker. Perbedaan inilah yang membuat
              karya manual tidak bisa disamakan dengan render digital.
            </p>
            <Link href="/pesan" className="btn btn-primary mt-6">
              Pesan karya serupa <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <BeforeAfterSlider src="/artwork/artwork-08.svg" alt="Studi kasus sketsa ke final" height="h-[380px]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
