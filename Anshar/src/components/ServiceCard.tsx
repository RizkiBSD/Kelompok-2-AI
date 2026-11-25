"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatIDR, type Service } from "@/lib/catalog";
import { track } from "@/lib/analytics";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/pesan?layanan=${service.id}`}
      onClick={() =>
        track("select_service", { service_tier: service.id, base_price: service.basePrice })
      }
      className="group relative block overflow-hidden border border-[rgba(35,32,28,0.14)] bg-[#fffdf9] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(35,32,28,0.55)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f2ede4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.art}
          alt={service.name}
          className="art-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute left-0 top-0 bg-[#23201c] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#faf8f5]">
          {String(index + 1).padStart(2, "0")} · {service.tone === "advanced" ? "advanced" : "basic"}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#23201c]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-3 left-3 translate-y-3 text-[0.72rem] uppercase tracking-[0.16em] text-[#faf8f5] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          lihat detail →
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[1.15rem] font-bold text-[#23201c]">{service.name}</h3>
            <p className="mt-0.5 text-[0.72rem] uppercase tracking-[0.14em] text-[#8b7355]">
              {service.tagline}
            </p>
          </div>
          <ArrowUpRight
            size={17}
            className="mt-1 shrink-0 text-[#8b7355] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <p className="mt-3 line-clamp-2 text-[0.82rem] leading-relaxed text-[#6b6257]">
          {service.description}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-dashed border-[rgba(35,32,28,0.14)] pt-3">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#8a8074]">mulai dari</p>
            <p className="font-display text-[1.05rem] font-bold text-[#23201c]">
              {formatIDR(service.basePrice)}
            </p>
          </div>
          <p className="text-[0.7rem] text-[#8b7355]">{service.turnaround}</p>
        </div>
      </div>
    </Link>
  );
}
