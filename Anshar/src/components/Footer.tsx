import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { STUDIO, waLink } from "@/lib/site-config";

function InstagramGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[rgba(35,32,28,0.12)] bg-[#f2ede4]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-xl font-bold text-[#23201c]">Bantugambar</p>
            <p className="mt-3 max-w-xs text-[0.85rem] leading-relaxed text-[#6b6257]">
              Studio komisi seni manual — sketsa pensil, lineart tinta, dan pewarnaan
              marker. Dikerjakan tangan, bukan render mesin.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(35,32,28,0.18)] text-[#4a443c] transition hover:border-[#23201c] hover:bg-white"
              >
                <InstagramGlyph size={15} />
              </a>
              <a
                href={waLink(`Halo ${STUDIO.artist}, saya mau tanya soal komisi di Bantugambar.`)}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(35,32,28,0.18)] text-[#4a443c] transition hover:border-[#23201c] hover:bg-white"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href={`mailto:${STUDIO.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(35,32,28,0.18)] text-[#4a443c] transition hover:border-[#23201c] hover:bg-white"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Jelajahi</p>
            <ul className="space-y-2.5 text-[0.85rem] text-[#6b6257]">
              <li><Link href="/portofolio" className="hover:text-[#23201c]">Portofolio</Link></li>
              <li><Link href="/layanan" className="hover:text-[#23201c]">Layanan &amp; Harga</Link></li>
              <li><Link href="/proses" className="hover:text-[#23201c]">Alur Pesanan</Link></li>
              <li><Link href="/pesan" className="hover:text-[#23201c]">Buat Pesanan</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-2.5 text-[0.85rem] text-[#6b6257]">
              <li><Link href="/syarat-ketentuan" className="hover:text-[#23201c]">Syarat &amp; Ketentuan</Link></li>
              <li><Link href="/syarat-ketentuan#privasi" className="hover:text-[#23201c]">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat-ketentuan#refund" className="hover:text-[#23201c]">Kebijakan Refund</Link></li>
              <li><Link href="/syarat-ketentuan#akademik" className="hover:text-[#23201c]">Penafian Akademik</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Studio</p>
            <p className="flex items-start gap-2 text-[0.85rem] leading-relaxed text-[#6b6257]">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#8b7355]" />
              <span>{STUDIO.kota}</span>
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-[#6b6257]">
              {STUDIO.jamOperasional}
              <br />
              Kuota produksi 3–7 karya / minggu
              <br />
              <span className="text-[#8b7355]">WA {STUDIO.whatsappTampil} ({STUDIO.artist})</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(35,32,28,0.12)] pt-6 text-[0.72rem] text-[#8a8074] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bantugambar.co — Seluruh karya adalah hak cipta seniman.</p>
          <p>Dibuat manual di Indonesia. Referensi visual, bukan jasa pengerjaan tugas.</p>
        </div>
      </div>
    </footer>
  );
}
