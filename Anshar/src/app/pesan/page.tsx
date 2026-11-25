import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import OrderWizard from "@/components/OrderWizard";
import CapacityBadge from "@/components/CapacityBadge";

export const metadata: Metadata = {
  title: "Buat Pesanan",
  description:
    "Formulir pemesanan komisi seni manual Bantugambar. Isi spesifikasi, lihat harga pasti, dan bayar DP.",
};

function WizardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-3 w-40 rounded bg-[#e0d8c8]" />
      <div className="h-[3px] w-full rounded bg-[#e0d8c8]" />
      <div className="h-8 w-64 rounded bg-[#e0d8c8]" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded border border-[rgba(35,32,28,0.08)] bg-[#f2ede4]/60" />
        ))}
      </div>
    </div>
  );
}

export default function PesanPage() {
  return (
    <>
      <section className="border-b border-[rgba(35,32,28,0.1)]">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-14">
          <Reveal>
            <p className="eyebrow">Formulir pemesanan</p>
            <h1 className="mt-2 max-w-2xl font-display text-[2.3rem] font-bold leading-[1.08] tracking-tight text-[#23201c] sm:text-[2.9rem]">
              Satu pertanyaan per langkah
            </h1>
            <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-[#5a5348]">
              Kami pisah tiap keputusan supaya Anda fokus. Panel di sebelah kanan menghitung
              harga secara real-time.
            </p>
            <div className="mt-5">
              <CapacityBadge />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Suspense fallback={<WizardSkeleton />}>
          <OrderWizard />
        </Suspense>
      </section>
    </>
  );
}
