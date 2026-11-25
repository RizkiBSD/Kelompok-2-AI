"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/layanan", label: "Layanan" },
  { href: "/proses", label: "Proses" },
  { href: "/syarat-ketentuan", label: "Ketentuan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(35,32,28,0.12)] bg-[#faf8f5]/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-[1.35rem] font-bold tracking-tight text-[#23201c]">
            Bantugambar
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.28em] text-[#8b7355] sm:inline">
            studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[0.82rem] font-medium transition-colors ${
                  active ? "text-[#23201c]" : "text-[#6b6257] hover:text-[#23201c]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#b5651d]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/pesan" className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.82rem] sm:inline-flex">
            Pesan Sekarang
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded p-2 text-[#23201c] md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[rgba(35,32,28,0.12)] bg-[#faf8f5] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded px-2 py-2.5 text-sm text-[#4a443c] hover:bg-[rgba(35,32,28,0.05)]"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/pesan" className="btn btn-primary mt-2 w-full">
              Pesan Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
