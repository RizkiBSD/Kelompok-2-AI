"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES, formatIDR } from "@/lib/catalog";
import { track } from "@/lib/analytics";

export default function TierShowcase() {
  const [active, setActive] = useState(SERVICES[0].id);
  const service = SERVICES.find((s) => s.id === active) ?? SERVICES[0];
  const advanced = service.tone === "advanced";

  return (
    <div className="relative overflow-hidden border border-[rgba(35,32,28,0.14)] bg-[#fffdf9]">
      {/* dynamic background layers */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          advanced ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="hatch-bg" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="#23201c" strokeWidth="0.6" opacity="0.09" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hatch-bg)" />
        </svg>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          advanced ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <div className="absolute -left-10 top-4 h-52 w-52 rounded-full bg-[#b5651d]/22 blur-2xl" />
        <div className="absolute right-6 top-16 h-40 w-40 rounded-full bg-[#8e5b7c]/22 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#c97b63]/20 blur-2xl" />
      </div>

      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  track("select_service", { service_tier: s.id, source: "pricing_tabs" });
                }}
                className={`border px-3.5 py-1.5 text-[0.76rem] font-medium transition-all ${
                  active === s.id
                    ? "border-[#23201c] bg-[#23201c] text-[#faf8f5]"
                    : "border-[rgba(35,32,28,0.2)] text-[#4a443c] hover:border-[#23201c]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <h3 className="mt-6 font-display text-[1.9rem] font-bold leading-tight text-[#23201c]">
            {service.name}
          </h3>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[#8b7355]">
            {service.tagline} · {service.turnaround}
          </p>
          <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-[#5a5348]">
            {service.description}
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {service.includes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-[0.82rem] text-[#4a443c]">
                <Check size={14} className="mt-0.5 shrink-0 text-[#8b7355]" />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col justify-between border border-[rgba(35,32,28,0.16)] bg-[#faf8f5]/85 p-5 backdrop-blur-sm">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#8a8074]">harga dasar</p>
            <p className="mt-1 font-display text-[2rem] font-bold leading-none tabular-nums text-[#23201c]">
              {formatIDR(service.basePrice)}
            </p>
            <p className="mt-2 text-[0.72rem] leading-relaxed text-[#6b6257]">
              Ukuran A4. A3 +{formatIDR(50000)}, kompleks +{formatIDR(75000)}, express +25%.
            </p>

            <div className="mt-4 space-y-1.5 border-t border-dashed border-[rgba(35,32,28,0.16)] pt-3 text-[0.72rem] text-[#6b6257]">
              <div className="flex justify-between">
                <span>DP 50%</span>
                <span className="font-semibold text-[#b5651d]">
                  {formatIDR(service.basePrice / 2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Revisi gratis</span>
                <span>2 sesi (tahap sketsa)</span>
              </div>
            </div>
          </div>

          <Link
            href={`/pesan?layanan=${service.id}`}
            className="btn btn-primary mt-5 w-full !py-2.5 !text-[0.82rem]"
          >
            Pesan kategori ini <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
