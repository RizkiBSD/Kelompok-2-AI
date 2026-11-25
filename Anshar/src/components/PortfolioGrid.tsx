"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { PORTFOLIO, type Artwork } from "@/lib/catalog";
import { track } from "@/lib/analytics";

const CATEGORIES = ["Semua", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];

function Tile({
  art,
  onOpen,
  depth,
}: {
  art: Artwork;
  onOpen: (a: Artwork) => void;
  depth: number;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(-center * 0.035 * depth);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [depth]);

  return (
    <button
      ref={ref}
      onClick={() => onOpen(art)}
      className="group relative mb-5 block w-full overflow-hidden border border-[rgba(35,32,28,0.12)] bg-[#fffdf9] text-left"
      style={{ transform: `translate3d(0, ${offset.toFixed(1)}px, 0)` }}
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.src}
          alt={art.title}
          loading="lazy"
          className="art-img w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[#23201c]/0 transition-colors duration-500 group-hover:bg-[#23201c]/18" />
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#faf8f5]/90 text-[#23201c] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ZoomIn size={14} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 px-3.5 py-3">
        <div>
          <p className="text-[0.82rem] font-semibold leading-tight text-[#23201c]">{art.title}</p>
          <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-[#8b7355]">
            {art.category}
          </p>
        </div>
        <p className="shrink-0 text-[0.65rem] text-[#8a8074]">{art.medium}</p>
      </div>
    </button>
  );
}

export default function PortfolioGrid({ initialFilter = "Semua" }: { initialFilter?: string }) {
  const [filter, setFilter] = useState(initialFilter);
  const [active, setActive] = useState<Artwork | null>(null);

  const items = useMemo(
    () => (filter === "Semua" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter]
  );

  const columns = useMemo(() => {
    const cols: Artwork[][] = [[], [], []];
    items.forEach((item, i) => cols[i % 3].push(item));
    return cols;
  }, [items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const open = (a: Artwork) => {
    setActive(a);
    track("view_portfolio", { artwork_category: a.category, artwork_title: a.title });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`border px-3.5 py-1.5 text-[0.75rem] font-medium transition-all ${
              filter === c
                ? "border-[#23201c] bg-[#23201c] text-[#faf8f5]"
                : "border-[rgba(35,32,28,0.18)] text-[#4a443c] hover:border-[#23201c]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {columns.map((col, ci) => (
          <div key={ci} className={ci === 1 ? "md:mt-10" : ci === 2 ? "md:mt-4" : ""}>
            {col.map((art) => (
              <Tile key={art.id} art={art} onOpen={open} depth={ci === 1 ? 1.4 : 0.8} />
            ))}
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#23201c]/80 p-5 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf8f5] text-[#23201c]"
            onClick={() => setActive(null)}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-hidden bg-[#faf8f5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.title} className="max-h-[70vh] w-full object-contain" />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(35,32,28,0.12)] px-5 py-4">
              <div>
                <p className="font-display text-lg font-bold text-[#23201c]">{active.title}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[#8b7355]">
                  {active.category} · {active.medium} · {active.size}
                </p>
              </div>
              <p className="text-[0.72rem] text-[#8a8074]">Karya manual — bukan render digital</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
