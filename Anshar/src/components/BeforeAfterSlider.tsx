"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider({
  src,
  alt,
  height = "h-[420px]",
}: {
  src: string;
  alt: string;
  height?: string;
}) {
  const [pos, setPos] = useState(48);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full select-none overflow-hidden border border-[rgba(35,32,28,0.14)] bg-[#f2ede4] ${height}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        update(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* full color (base) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />

      {/* sketch (clipped left) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${alt} — tahap sketsa`}
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.15) brightness(1.04)" }}
        />
        <div className="absolute inset-0 bg-[#faf8f5]/10" />
      </div>

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-[#faf8f5] shadow-[0_0_0_1px_rgba(35,32,28,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-[rgba(35,32,28,0.2)] bg-[#faf8f5] text-[#23201c] shadow-md">
          <MoveHorizontal size={16} />
        </div>
      </div>

      <span className="absolute left-3 top-3 bg-[#23201c]/80 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-[#faf8f5]">
        sketsa
      </span>
      <span className="absolute right-3 top-3 bg-[#b5651d]/90 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-white">
        final
      </span>
    </div>
  );
}
