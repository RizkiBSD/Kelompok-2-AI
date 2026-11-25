import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, CreditCard, FileUp, PackageCheck, PencilRuler } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROCESS_STEPS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Alur Pesanan",
  description:
    "Lima tahap alur pesanan Bantugambar: intake, quoting, DP, approval & revisi, pelunasan & pengiriman.",
};

const ICONS = [FileUp, ClipboardCheck, CreditCard, PencilRuler, PackageCheck];

export default function ProsesPage() {
  return (
    <>
      <section className="border-b border-[rgba(35,32,28,0.1)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-14">
          <Reveal>
            <p className="eyebrow">Alur pesanan</p>
            <h1 className="mt-2 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight text-[#23201c] sm:text-[3.1rem]">
              Dari form sampai di tangan Anda
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#5a5348]">
              Kami memakai mekanisme komisi sekuensial — setiap tahap menunggu persetujuan
              Anda sebelum lanjut ke tahap berikutnya.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <ol className="relative space-y-6 border-l border-dashed border-[rgba(35,32,28,0.2)] pl-8">
          {PROCESS_STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.n} as="li" delay={i * 60}>
                <span className="absolute -left-[41px] flex h-[52px] w-[52px] items-center justify-center border border-[rgba(35,32,28,0.16)] bg-[#fffdf9]">
                  <Icon size={18} className="text-[#8b7355]" strokeWidth={1.7} />
                </span>
                <div className="border border-[rgba(35,32,28,0.12)] bg-[#fffdf9] p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-[1.25rem] font-bold text-[#23201c]">{s.title}</h2>
                    <span className="font-display text-[1.4rem] font-bold text-[#e0d8c8]">{s.n}</span>
                  </div>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[#5a5348]">{s.desc}</p>

                  <div className="mt-4 flex items-center gap-2 border-t border-dashed border-[rgba(35,32,28,0.14)] pt-3.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4a6b5d]" />
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-[#6b6257]">
                      status:{" "}
                      {[
                        "menunggu intake",
                        "menunggu DP",
                        "sketsa diproses",
                        "menunggu persetujuan",
                        "dikemas & dikirim",
                      ][i]}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className="border-y border-[rgba(35,32,28,0.1)] bg-[#f7f3ec] py-14">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="eyebrow">Kontrol kapasitas</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-[#23201c]">
              Kenapa kuota dibatasi 3–7 karya per minggu?
            </h2>
            <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-[#5a5348]">
              Setiap karya melewati satu tangan yang sama. Menerima lebih dari kapasitas
              berarti tenggat meleset dan kualitas turun. Kalau kuota minggu ini penuh,
              sistem otomatis memindahkan pesanan baru ke slot minggu berikutnya — tanpa
              persaingan, tanpa kejar-kejaran.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ["Slot aman", "Kuota dikunci per Senin pagi."],
                ["Waitlist otomatis", "Penuh? Anda dapat slot minggu depan."],
                ["Express terbatas", "Maks 2 proyek cepat per minggu."],
              ].map(([t, b]) => (
                <div key={t} className="border border-[rgba(35,32,28,0.12)] bg-[#fffdf9] p-4">
                  <p className="text-[0.85rem] font-semibold text-[#23201c]">{t}</p>
                  <p className="mt-1 text-[0.74rem] text-[#6b6257]">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <div className="border border-[rgba(35,32,28,0.16)] bg-[#fffdf9] px-8 py-10 text-center">
            <h2 className="font-display text-[1.8rem] font-bold text-[#23201c]">Mulai dari langkah pertama</h2>
            <p className="mx-auto mt-2 max-w-sm text-[0.86rem] text-[#6b6257]">
              Butuh waktu kurang dari 3 menit untuk mengisi spesifikasi awal.
            </p>
            <Link href="/pesan" className="btn btn-primary mt-6">
              Buka Form Pemesanan <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
